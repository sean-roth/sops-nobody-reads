# CHANGE NOTE — LOTO mobile readability (2026-07-23, HOT #2)

Branch: `loto-mobile-readability`, off `main` (post-#83, includes the
mobile-nav popover work — unrelated file regions, no overlap expected).

Status: built, self-checked, handback below. Plan section left as originally
committed; deviations and discoveries are called out explicitly in Results.

---

## Plan

**Defects.** Two consolidation slides clip below the fold at phone width:
slide 20 ("The Six Steps") and slide 25 ("Module 1 — Key Concepts"). Root
cause: the existing `@media (max-width: 768px) { .seq-row { grid-template-
columns: 1fr !important } }` rule trades width for height inside a frame
that has no height to give — `.slide-container` is `overflow: hidden`, the
player never scrolls, so anything that doesn't fit is just gone.

**Verified slide 25's actual structure (brief asked for this explicitly) —
it does not match the brief's framing.** Read `module-01.json` directly
rather than assuming from the visual similarity to slide 20:

| | Slide 20 | Slide 25 |
|---|---|---|
| `shape` | `"sequence"` | *(none)* |
| `items` | 6 objects `{num, text}` | 7 plain strings |
| Render path (`player.js` `renderSlide`, `case 'consolidation'`) | `consolidation-sequence` / `.seq-row` / `.seq-step` (numbered, connector line) | `consolidation-grid` / `.c-item` (unordered cards, no numbers) |

So "same family, same stack, same clipping" is true at the *symptom* level
(both are dense multi-item consolidation content overflowing a fixed-height
frame) but the two slides render through genuinely different CSS paths.
`.consolidation-grid` already uses `grid-template-columns: repeat(auto-fit,
minmax(260px, 1fr))` — at phone content-widths (~300-330px) that already
degrades to 1 column today, just as an *emergent* side effect of the
260px floor, not a deliberate collapse rule like `.seq-row`'s.

**Checked M2/M3 too (needed for the read-only audit and to scope the
"family" correctly):**

| | Slide | shape | kind | items |
|---|---|---|---|---|
| M2 | 16 | *(none)* | list-objects (`{num,text}`, no `shape:sequence`) | 5 |
| M2 | 22 | *(none)* | plain-strings | 8 |
| M3 | 7 | `sequence` | sequence | 7 |
| M3 | 30 | *(none)* | plain-strings | 8 |

M2 slide 16 is a **third** consolidation shape — `.consolidation-list`
(object items, but no `shape:sequence`): a numbered, full-width, left-
aligned paragraph list, not a card/step grid. Since `chrome.css` is shared
verbatim across all three modules, whatever I fix for `.consolidation-
sequence`/`.consolidation-grid` reaches M2/M3's instances of those same two
shapes for free, with zero changes to their data.

**Scope decision: the "family" fix covers `sequence` + `grid`, not `list`.**
The brief's own qualifier — "where the content is step/card-like" — already
draws this line; `.consolidation-list` is a paragraph list, not cards, and
forcing it into 2 columns would narrow each column and could easily make
long list text *wrap more*, not less, working against the goal. It's left
alone and covered only by the systemic scroll backstop, same as any other
slide type nobody's specifically restructured.

**Mechanism — slide 20 / `.consolidation-sequence`:** per the brief's
suggested approach. At ≤640px, `.seq-row` becomes `display: contents`
(flattening the desktop row-of-3 grouping divs), and `.consolidation-
sequence` itself becomes `display: grid; grid-template-columns: 1fr 1fr`.
The six `.seq-step`s become direct grid children in DOM order, so grid
auto-placement alone produces 1·2 / 3·4 / 5·6 — guaranteed by structure,
not by hoping two independently-sized rows-of-3 happen to reflow evenly.
The connector (`.seq-step::after`, a horizontal line to the next step) is
**already suppressed at ≤768px** by the existing rule — ≤640 is a subset of
that range, so there's nothing new to suppress there; a row-major 2-col
wrap has no clean way to draw it anyway (it would need to skip every other
step to avoid drawing a "horizontal" line into the next row down).
`.seq-text`'s `max-width: 17ch` (sized for the desktop horizontal layout)
loosens at this breakpoint so text uses the actual ~140-160px column width
instead of wrapping narrower than it needs to.

**Mechanism — grid family (slide 25, M2/22, M3/30):** force exactly 2
columns at ≤640px (`grid-template-columns: repeat(2, 1fr)`), overriding the
260px auto-fit floor that today degrades to 1 column as a side effect
rather than a decision. Odd item counts (7, 8, 8) leave the last row
half-empty — acceptable, same tradeoff `seqRows()` already accepts for
desktop sequence orphans, and not worth replicating that fold-back logic
for a plain review grid that never had it.

**Systemic backstop — the part that needs verifying, not assuming.**
`.slide` is `position: absolute; inset: 0` inside `.slide-container`
(`position: relative; overflow: hidden`), with `justify-content: center`
vertically centering its content. A flex box that centers overflowing
content pushes the overflow equally in *both* directions — including
*above* its own top edge. If `.slide-container` simply becomes `overflow-y:
auto`, that upward overflow lands in negative-scroll territory, which
scroll containers can't reach (`scrollTop` can't go below 0): the classic
"centered content you can never scroll to the top of" bug. Plan: use
`justify-content: safe center` (falls back to start-alignment exactly when
content overflows, leaving short slides centered as today) with a plain
`justify-content: center` declared immediately before it as the fallback
for any engine that doesn't parse the `safe` keyword — but **verify this
empirically** against the actual Chromium in `tools/capture` (inject
oversized content, confirm both the first and last content nodes are
reachable by scrolling) before trusting it, rather than shipping on
spec-reading alone. If it doesn't hold up, fall back to `justify-content:
flex-start` scoped to this same breakpoint — a real visual tradeoff (short
phone slides go top-aligned instead of centered) but a defensible one
against "half the content is permanently unreachable."

`.slide-container`'s `overflow-y: auto` is scoped to `@media (max-width:
640px)` only — desktop stays `overflow: hidden`, unchanged.

**`player.js` — the one line.** `updateProgress()` is the one function
already called after every transition (`initPlayer`, `nextSlide`,
`prevSlide`, regardless of which of `renderSlide`/`renderQuiz`/`renderClose`
just ran) — adding `slideContainer.scrollTop = 0` there covers every slide
change from one insertion point, matching the brief's "the only JS touch in
this pass." (Noted, not fixed: `restartQuiz()` doesn't call `updateProgress()`
today, a pre-existing gap outside this brief's scope.)

**Verification plan.** Extend `tools/capture` with an overflow-audit script:
for every M1 slide + quiz question (29 waypoints) × {360×800, 390×844} ×
{light, dark}, measure `scrollHeight > clientHeight` on `.slide-container`
with the backstop's CSS disabled (before), then with it enabled, scroll to
bottom and assert the last content node's bounding box is inside the
viewport (after). Same measurement, read-only, across all M2 (22+4) and M3
(30+4) waypoints — no fixes there, report attached. Plus targeted before/
after captures of slides 20 and 25 at both widths/modes for the eyes-on
gate, and the usual desktop 1440 pixel-diff for R4.

**Not in scope.** Module shells, `MODULE`/`MODULE_CHROME`/`seqRows()`, the
menu file, `restartQuiz()`'s pre-existing progress-update gap — this pass
touches `chrome/chrome.css` and one line of `chrome/player.js` only (plus
the `tools/capture` extension and this change note).

---

## Results

### Discovery: slide 25's real defect was horizontal, not vertical

Built the overflow-audit harness first and ran it against the unmodified
branch before writing any fix. It reported slide 20 clipping vertically
(as the brief describes) but slide 25 as **not** clipping at all — at the
brief's exact nominal dimensions, `#slideContainer`'s `scrollHeight` was
*exactly* equal to `clientHeight` for slide 25, at every viewport tested.
Two different slides landing on a suspiciously exact tie is a methodology
signal, not a coincidence, so I checked the actual rendered geometry
(`getBoundingClientRect`) rather than trusting the aggregate scroll numbers.

`.consolidation-grid` (slide 25's actual shape — see Plan) uses
`grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`. `.slide` is
`align-items: center` (not the flex default `stretch`), so nothing
constrains `.consolidation-grid`'s width to the available space — `auto-fit`
computed track count against the grid's own `max-width: 52rem` instead,
producing **three** 260px columns (780px) inside a ~330px-wide slide. The
oversized grid then got centered, spilling items 1/4/7 off the left edge and
part of 3/6 off the right — confirmed by measuring: those items' `left`
values were negative or beyond the viewport width. This reads to a real
user as fragmented, cut-off text on both edges (see the before/after
screenshots below), not "scroll down for more" — arguably worse than
slide 20's defect, and a pure vertical-scroll backstop does nothing for it;
it has to be fixed at the source.

The planned fix (`grid-template-columns: repeat(2, 1fr)`, no `auto-fit`,
no `minmax` floor) turned out to resolve this too, verified before writing
it into `chrome.css`: injected the rule live via `page.evaluate` against
the running page and re-measured — `scrollWidth` dropped to match
`clientWidth` exactly, items landed at the two expected x-positions. Added
an `overflow-audit.js` check for horizontal overflow specifically (`scrollWidth
> clientWidth`) alongside the vertical one — the original audit design only
looked for vertical clipping and would have missed this class of bug
entirely, the same way eyeballing did before this pass.

### Discovery: the brief's nominal test dimensions don't reproduce slide 20's reported clipping

At the brief's exact 390×844 / 360×800, slide 20 measured 30-60px of
*headroom* before this pass's fix — not clipped. Sean's device check is the
ground truth (the defect is real), so this is a test-methodology gap, not a
reason to doubt the brief. Root-caused by testing at a reduced height
(390×704, 360×660 — roughly nominal device height minus typical mobile
browser chrome: address bar, toolbar) and confirming slide 20 clips there
in headless Chromium too, with a comparable margin to what the reduced
height implies is realistic. Added these as a second, disclosed viewport
pair (`390x704-chrome`, `360x660-chrome`) in `overflow-audit.js` and this
pass's capture recipe — genuinely stress-testing the fix's margins rather
than testing at dimensions where the original bug is already borderline
gone. Module-03's equivalent slide (7 items, one more than M1's 6) clips
even at the *nominal* heights — see the audit report; a real, denser
example of the same underlying issue, not a hypothetical.

### `justify-content: safe center` — verified, not assumed

Per the Plan's stated risk: tested a minimal repro (a centered flex column
inside a fixed-height `overflow-y: auto` container, deliberately taller
than the container) against both Chromium and WebKit via Playwright before
writing this into `chrome.css`. Plain `justify-content: center` left the
first item's top edge 9px above the container's own top edge — confirmed
unreachable by scrolling to `scrollTop: 0` (can't go negative). `justify-
content: safe center` (with plain `center` declared first as the fallback
for any engine that doesn't parse `safe`) put the first item's top edge at
+7px in both engines — fully reachable at `scrollTop: 0`, and the last item
still fully reachable at max scroll. Both engines identical; shipped as
plain `center` immediately followed by `safe center` in the same
declaration block.

### Bar/slide anatomy at ≤640px (unchanged from the mobile-nav pass above 640px — this pass doesn't touch the bar)

- **Slide 20 (`.consolidation-sequence`):** `.seq-row` becomes `display:
  contents`; the container becomes a 2-column grid. The six `.seq-step`s
  are direct grid items in unchanged DOM order (1-6), so grid auto-
  placement alone produces 1·2 / 3·4 / 5·6 — verified both in the DOM
  (`querySelectorAll('.seq-step')` order) and by measured position (items
  0/1 share a row with 0 left of 1; 2/3 the next row down; 4/5 the last).
  Connector line stays suppressed via the pre-existing ≤768px rule (640 is
  a subset of that range — nothing new needed). `.seq-text`'s `max-width`
  loosens from `17ch` (sized for the old single-row layout) to `none`.
- **Grid family (slide 25, plus M2 slide 22 and M3 slide 30 for free, same
  shared CSS):** forced to exactly 2 columns, no `auto-fit`/`minmax` floor.
  `.consolidation-list` (M2 slide 16 — a numbered paragraph list, not
  card-like) is deliberately untouched; relies on the backstop like any
  other slide type nobody's specifically restructured.
- **Systemic backstop:** `.slide-container` is `overflow-y: auto;
  overflow-x: hidden` at ≤640px only (desktop unchanged, `overflow: hidden`).
  `.slide`'s `justify-content` gets the `safe center` fallback described
  above, same breakpoint.
- **`player.js`:** one line in `updateProgress()` — the single function
  already called after every transition regardless of which render path ran
  — resets `#slideContainer.scrollTop` to 0.

### Overflow audit — the measured check

Full before/after table for all three modules: `courses/loto/OVERFLOW-AUDIT-
mobile-readability.md` (raw data: `overflow-before.json`/`overflow-after.json`
alongside the screenshots — regenerable via `tools/capture/overflow-audit.js`
against any checkout). 736 checks (3 modules × ~92 waypoints incl. quiz/close
× 4 viewports × 2 modes).

| | Before | After |
|---|---|---|
| Clipped (any) | 36 | 2 |
| Clipped-and-unscrollable | n/a\* | **0** |

\* `overflow: hidden` still allows JS to set `scrollTop` — it just gives no
user-facing scroll affordance — so "before" clipped rows aren't meaningfully
separable into stuck/not-stuck; every clipped row before this pass was
inaccessible to a real user by construction. Only "after" has a real
scrolls-vs-stuck distinction.

**M1 (this pass's actual scope): 240 checks, 0 clipped, 0 stuck** — the
2-column reflow alone eliminated overflow entirely, even at the stress
dimensions. **M2/M3 (read-only, no fixes applied): 2 residual clipped
rows**, both module-03/slide-7 at the most aggressive stress dimension
(360×660-chrome) — both `scrolls` (backstop reaches the bottom), zero stuck.

### Screenshot inventory

`courses/loto/screenshots/mobile-readability/` (branch-only, strips before
squash-merge): desktop 1440×900 × `{light,dark}` × `{slide20,slide25}` ×
`{before,after}` (8 files, R4 evidence — 0.0000% diff, all 4 pairs) + phone
390×844/360×800 × `{light,dark}` × `{slide20,slide25}` × `{before,after}`
(16 files, eyes-on gate) + the raw overflow-audit JSON.

### Self-check

| ID | Check | Result |
|---|---|---|
| R1 | Diff confined to `chrome/` + change note + `tools/capture` extension | **PASS** — `git diff --stat main`: `chrome.css` (+54), `player.js` (+1) only |
| R2 | Slide 20 at 360/390: two columns, 1·2/3·4/5·6, all six visible | **PASS** — `readability-selfcheck.js`: DOM order `1.`-`6.` unchanged; measured positions confirm row-major pairing (0/1 same row, 2/3 next, 4/5 last); screenshots confirm visually at both widths/modes |
| R3 | Zero clipped-and-unscrollable across all 29 M1 waypoints, both widths/modes; M2/M3 report attached | **PASS** — 0/240 M1 checks clipped (see audit); M2/M3 report attached, 2 residual (both `scrolls`, 0 stuck) |
| R4 | Desktop (>640px) pixel-identical to `main` | **PASS** — 0.0000% across all 4 before/after pairs |
| R5 | Scroll resets on slide change; quiz/close unaffected above threshold | **PASS** — `readability-selfcheck.js`: scrollTop set to 20 on a genuinely-overflowing waypoint, confirmed reset to 0 after `nextSlide()`; quiz and close screens confirmed not clipped (no spurious scroll behavior introduced) |

No console/page errors observed across any capture or audit run.
