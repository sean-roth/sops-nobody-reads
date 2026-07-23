# CHANGE NOTE — LOTO mobile readability (2026-07-23, HOT #2)

Branch: `loto-mobile-readability`, off `main` (post-#83, includes the
mobile-nav popover work — unrelated file regions, no overlap expected).

Status: plan committed, build in progress. Results filled in at handback.

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
