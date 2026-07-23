# CHANGE NOTE — LOTO mobile nav (2026-07-23)

Branch: `loto-mobile-nav`, off `origin/main`.

Status: **built, self-checked, handback below.** Per standing convention
(Sean, 2026-07-23): the plan landed as its own first commit before any code
changes, so a dead session would have resumed from brief + committed plan
instead of from zero. The Plan section below is left as originally
committed (including a since-corrected slide-count assumption) rather than
retouched after the fact — deviations from it are called out explicitly in
Results, not silently folded in.

---

## Plan

**Defect.** `PLAYER_MARKUP` in `chrome/player.js` packs three left-cluster
controls (Menu link, Dark toggle, Learner Mode toggle) plus a fixed-width
progress track and Prev/Next into one `space-between` row with no wrap.
At phone widths (~390px and below) that's ~600px of content in a ~390px
row — Prev/Next get shoved off-comfortable and the course isn't navigable
on a phone.

**Approach — single source of truth, no duplicated markup.**
Rather than maintaining two separate copies of the three controls (one
inline for desktop, one inside a mobile popover), `#darkToggleBtn` /
`#modeToggleBtn` / the Menu link move into one wrapper (`#moreMenu`,
class `bar-more-menu`) that lives once in the DOM, immediately after a new
`⋯` trigger button (`#moreBtn`, aria-label "View options") inside
`.bottom-bar-left`. Which layout renders is pure CSS:

- **Above the breakpoint (default / no media query — today's behavior):**
  `.bar-more-btn { display: none; }` and `.bar-more-menu { display: contents; }`
  — the wrapper disappears from the box model and its three children become
  direct flex items of `.bottom-bar-left`, exactly as they are today. `order`
  is set per child (Menu=1, Dark=2, Learner=3) to reproduce today's left-to-
  right sequence, since the DOM source order has to be the popover's order
  (see below), not the desktop visual order.
  → Desktop is pixel-identical **by construction**, not by a parallel
  desktop-only code path that could drift from the mobile one.

- **At the phone breakpoint (`@media (max-width: 640px)`, chosen per the
  brief's suggestion, verified down to 360px):** `.bar-more-btn` becomes
  visible, `.bar-more-menu` switches from `display: contents` to an actual
  popover — `display: none` by default, `position: absolute; bottom: 100%`
  anchored above the bar, and `.open` toggles it to `display: flex;
  flex-direction: column`. `order` is overridden inside this query to
  Learner=1, Dark=2, Menu=3, matching the brief's required popover order.
  `.nav-btn` gets `min-height: 44px` in this query (existing ≤768px sizing
  alone doesn't clear the 44px target-size bar); progress track goes
  `flex: 1 1 auto; max-width: 180px; min-width: 60px` in place of the fixed
  180px/100px widths.

Because `#darkToggleBtn`/`#modeToggleBtn` are never duplicated, `toggleDarkMode()`
/`toggleReviewerMode()` need zero changes to keep finding their button by id
regardless of which layout is active — they just also close the popover on
selection (a small addition, since "wherever the buttons live" now includes
a popover that has a closing contract).

**Popover chrome.** No existing popover/dropdown precedent in this codebase
to match — the closest is `.citation-chip` (the only floating panel in
`chrome.css`): `background: var(--bg-panel)`, `border: 1px solid
var(--rule-strong)`, `border-radius: 3px`. Reusing that combination for
`.bar-more-menu` rather than inventing new surface treatment — existing
tokens only, per the brief.

**Behavior.** Trigger toggles `.open` + `aria-expanded`. Closes on: selecting
an item (Dark/Learner toggle handlers call a shared `closeMoreMenu()` after
their existing logic runs; the Menu link also closes it, moot since it
navigates away), outside click/tap (document-level listener, ignores clicks
inside `#moreMenu`/`#moreBtn`), and Escape (extends the existing
`keydown` listener that already handles arrow-key slide nav). Focus returns
to `#moreBtn` on Escape-close and selection-close, not on outside-click
close (outside click should let focus follow whatever was actually clicked).

**Capture harness.** Previous screenshot matrix (chrome-consolidation,
2026-07-21) was real but lived in a scratchpad and didn't survive the
session. Building a small Playwright-based harness under `tools/capture/`
this time, committed as part of the mergeable payload (infrastructure, not
a gate artifact — only the screenshots themselves strip before squash-merge).
Serves the module over a local static server (not `file://`, for reliable
automation), forces `prefers-reduced-motion: reduce` to trigger the
existing transition-kill rule in `chrome.css` rather than injecting new
override CSS, waits on `fonts.ready` + all `<img>`/background-image
decode, and settles two animation frames before capture — same determinism
recipe the prior matrix used, just persisted this time.

**Verification plan.**
- Desktop 1440: capture BEFORE (this commit, pre-fix) and AFTER (post-fix)
  and diff them — B4 runs as an actual pixel comparison, not just the
  architecture argument for why it should be identical.
- Phone 390×844 and 360×800, both modes: closed-bar state across all three
  required slide types (mid teaching slide, quiz slide, close slide) to
  confirm nav is reachable everywhere; popover open state sampled on one
  representative slide across both viewports/modes to confirm legibility
  (not crossed against all three slide types — the popover's own appearance
  doesn't depend on slide content, so full cross-product would be redundant
  captures, not additional evidence; disclosing the sampling rather than
  silently narrowing it).
- Added per Sean's redirect: a desktop keyboard tab-through confirming all
  three relocated controls stay focusable and expose an accessible name/role
  under `display: contents` (the old browsers-used-to-drop-contents-children-
  from-the-a11y-tree bug is fixed in current engines, but verified rather
  than assumed here).

**Not in scope.** Module shells, `MODULE`/`MODULE_CHROME`, the menu file —
this pass touches `chrome/player.js` and `chrome/chrome.css` only (plus the
new `tools/capture/` addition and this change note, both explicitly allowed
outside that scope line).

---

## Results

### Deviation from plan: `order` doesn't fix Tab order, so it's DOM relocation instead

The plan's `display: contents` + CSS `order` construction was built and
confirmed pixel-identical at desktop — but the a11y tab-through Sean's
redirect asked for caught something the visual check couldn't: `order`
(and `flex-direction: *-reverse`) only changes **paint** position. Sequential
keyboard focus always follows **DOM order**, never `order`. Since the DOM
had to hold the popover's sequence (Learner, Dark, Menu) for phone widths to
work, focusing the desktop-visible "Menu" link and pressing Tab skipped
straight to the Prev/Next cluster — Dark and Learner Mode were unreachable
in visual sequence from Menu, because both precede it in the DOM.

Fix: `player.js` now **physically relocates** the three control nodes
between `.bottom-bar-left` (desktop) and `#moreMenu` (phone popover) via a
`matchMedia('(max-width: 640px)')` listener (`arrangeBarControls()`), run
once at init and again on every breakpoint crossing (covers live resize and
phone rotation, not just initial load). Real DOM order now matches whichever
context is visible, so natural Tab order is correct in both with zero
explicit `tabindex`. This also simplified the CSS — no `order` properties
needed anywhere, and `.bar-more-menu`'s desktop state is plain `display: none`
(not `contents`) since JS leaves it empty there.

Re-verified after the fix: desktop diff still 0.0000% (the visual contract
didn't change, only the mechanism), and the a11y tab-through now passes
(below).

### Bar anatomy

**Above 640px (unchanged from `main`):** `.bottom-bar-left` renders Menu,
Dark, Learner Mode as direct children, in that order — identical DOM
position and CSS to before reparenting runs, confirmed via pixel diff.
`#moreBtn` (the ⋯ trigger) and `#moreMenu` (now empty) are both
`display: none` and contribute nothing to layout.

**At ≤640px:** the bar is `[⋯] [progress] [← Prev] [Next →]`. `#moreBtn`
(`aria-label="View options"`) is a 44×44 icon button. The progress track is
`flex: 1 1 auto; width: auto; max-width: 180px; min-width: 60px` (was a
fixed 100px at this range before) so it fills whatever room the ⋯ trigger
and Prev/Next leave rather than holding a width regardless of available
space. All `.nav-btn` targets in this range are `min-height: 44px`.

### Popover semantics

`#moreMenu` holds exactly the three relocated controls, in the brief's
order (Learner/Reviewer toggle, Dark toggle, Menu), moved there by
`arrangeBarControls()`. Anchored `position: absolute; bottom: 100%; left: 0`
relative to `.bottom-bar-left` (now `position: relative`). Styled from the
only existing floating-panel precedent in this codebase (`.citation-chip`):
`var(--bg-panel)` background, `1px solid var(--rule-strong)` border, 3px
radius — no new colors, no new visual language.

Behavior contract (all verified programmatically, see self-check):
- Opens on trigger click; `aria-expanded` true/false tracks state.
- Closes on: selecting Learner Mode or Dark (their existing toggle
  functions now also call `closeMoreMenu()` — zero changes to their actual
  mode-toggling logic or `#darkToggleBtn`/`#modeToggleBtn` ids/aria-pressed
  behavior, which keep working unchanged regardless of which container
  currently holds them); selecting Menu (moot in practice, it navigates
  away); outside click/tap; Escape.
- Focus returns to `#moreBtn` on Escape-close and selection-close. Outside-
  click close does **not** force focus back — it lets focus follow whatever
  was actually clicked, which is what a user tapping something else on the
  bar or slide would expect.
- Tab order inside the open popover: Learner Mode → Dark → Menu (DOM order,
  matches visual order, matches the brief).

### Screenshot inventory

`courses/loto/screenshots/mobile-nav/` (24 PNGs; branch-only commit, strips
before squash-merge):

- **Desktop 1440×900** (B4 evidence) — `{light,dark} × {mid-teaching,close} × {before,after}`,
  8 files. `before` = this branch's first commit (pre-fix); `after` = post-fix.
  Diffed with `tools/capture/diff.js` (pixelmatch): **all four pairs
  0/1296000 px, 0.0000%.** Quiz omitted from the desktop set — the shared
  chrome doesn't vary with slide content, and mid-teaching + close already
  cover the bar's two distinct bottom-row contexts (nav row vs. the close
  screen's action row).
- **Phone 390×844 and 360×800** — `{light,dark} × {mid-teaching,quiz,close} × closed`,
  12 files, confirming the bar is usable on every required slide type; plus
  `{light,dark} × mid-teaching × open`, 4 files, confirming popover
  legibility in both modes at both widths. Open state sampled on
  mid-teaching only, not crossed against all three slide types — the
  popover's own appearance doesn't depend on slide content underneath it,
  so the full cross-product would be redundant captures, not additional
  evidence. Disclosed here rather than silently narrowed.
- Slide waypoint "mid-teaching" = module-01 slide index 12 (0-indexed),
  the "Off vs. Safe" reveal — near-centered in the 26-slide deck (corrected
  from the Plan section's miscounted 19; the original grep used during
  planning missed hyphenated slide-type values like `teaching-caption`,
  undercounting by 7) and the module's central teaching point. Quiz
  waypoint = question 1 of 4 (the Plan section's "3 questions" was the same
  miscount — module-01 has 4). Close waypoint mirrors the real end-state
  (`currentQuizQuestion` left at `length - 1`, matching what `nextSlide()`
  actually leaves it at before calling `renderClose()` — the harness had
  this off by one initially, caught by reading its own screenshot output
  ("30/29") before it ever reached this file).

### Self-check (cold auditor still runs §Audit; this is the builder's own pass)

| ID | Check | Result |
|---|---|---|
| B1 | Diff confined to `chrome/` + change note (+ `tools/` addition, screenshots separate) | **PASS** — `git diff --stat main`: `CHANGE-NOTE-mobile-nav.md`, `chrome.css`, `player.js` only; `tools/capture/` and `courses/loto/screenshots/mobile-nav/` untracked, committed separately per the gate-artifact convention |
| B2 | 360/390: every control visible + tappable, no horizontal scroll, targets ≥44px | **PASS** — `tools/capture/selfcheck.js`: `noHorizontalScroll` true and `#moreBtn`/`#prevBtn`/`#nextBtn` all ≥44×44 at both widths (measured, not eyeballed) |
| B3 | Popover = exactly the three relocated controls; open/close + focus per brief; `aria-pressed` tracks both toggles | **PASS** — `selfcheck.js`: popover children are exactly `[modeToggleBtn, darkToggleBtn, bar-menu-link]` in that order; `aria-expanded` true on open/false on close; closes + returns focus on Escape; closes without yanking focus on outside click; closes + `aria-pressed` flips on selecting either toggle, at both widths |
| B4 | Desktop vs `main`: pixel-identical | **PASS** — actual pixel diff (not just the construction argument), 0.0000% across all 4 before/after pairs |
| B5 | Both modes × mid/quiz/close, popover open + closed | **PASS** — 16 phone screenshots, see inventory above |
| — (Sean's rider) | Desktop tab-through: all three controls stay focusable, exposed to the accessibility tree, in visual order | **PASS** (after the deviation above) — `tools/capture/a11y-tabcheck.js`: `getByRole` finds and confirms visible all three (rules out the old contents-drops-children-from-a11y-tree engine bug); focusing Menu then tabbing twice lands on `darkToggleBtn` then `modeToggleBtn`; `#moreBtn` confirmed `display: none` at desktop |

No console/page errors observed across any capture (checked programmatically
in every harness run, not just visually).

### Harness note

`tools/capture/` ships in this PR as part of the mergeable payload (only
the screenshots strip before squash-merge). `package.json`/`node_modules`
scoped inside `tools/capture/` with its own `.gitignore` — repo root
untouched. Includes `lib.js` (generic: server, deterministic settle,
screenshot), `loto-player.js` (this player's nav helpers, reusable for
M2/M3 and future passes), `diff.js` (pixelmatch), `mobile-nav.recipe.js`
(this pass's matrix), `a11y-tabcheck.js` and `selfcheck.js` (the
programmatic checks above — also reusable if a future pass touches this bar
again).
