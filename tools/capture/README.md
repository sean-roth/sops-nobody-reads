# Capture harness

Deterministic screenshot capture + pixel-diff for LOTO player passes.
Committed infrastructure — a prior version of this lived in a scratchpad
during the chrome-consolidation pass and didn't survive the session
(MOBILE-NAV-2026-07-23, trace T16).

## Setup

```bash
cd tools/capture
npm install
npx playwright install chromium   # once per machine
```

## Files

| File | What it does |
|------|---------------|
| `lib.js` | Generic primitives: static file server, deterministic-render settle (fonts/images/frames), screenshot. No LOTO-specific knowledge. |
| `loto-player.js` | Navigation helpers for *this* player: jump to a slide/quiz/close state, toggle dark mode via the real button wherever it currently lives, open the bar's popover. Reusable across M1/M2/M3 and future passes over `chrome/player.js`. |
| `diff.js` | Pixel-diff two PNGs (pixelmatch). `node diff.js before.png after.png [diff-out.png]` |
| `*.recipe.js` | Per-pass capture scripts — the matrix (viewports × modes × waypoints) for one specific brief. Add a new recipe file per pass rather than growing a generic config format prematurely. |

## Running a recipe

```bash
node mobile-nav.recipe.js before   # pre-fix desktop 1440 baseline
node mobile-nav.recipe.js after    # post-fix desktop 1440
node mobile-nav.recipe.js phone    # post-fix phone matrix
```

Output goes to `courses/loto/screenshots/<pass-name>/`. Screenshots are
gate artifacts (branch-only, stripped before squash-merge) — this harness
itself is not; it ships in the mergeable payload.
