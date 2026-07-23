# CHANGE NOTE — LOTO mobile nav (2026-07-23)

Branch: `loto-mobile-nav`, off `origin/main`.

Status: **plan committed, build in progress.** Per standing convention (Sean,
2026-07-23): the plan lands as its own first commit before any code changes,
so a dead session resumes from brief + committed plan instead of from zero.
The sections below the Plan (bar anatomy, popover semantics, screenshot
inventory, self-check) get filled in at handback.

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
