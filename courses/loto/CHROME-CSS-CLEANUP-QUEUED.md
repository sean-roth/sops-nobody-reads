# CHROME-CSS-CLEANUP — builder brief (queued: post-demo, now the polish pass)

STATUS: QUEUED — run after the first call block and the audit sitting. Branch off `main`, one PR. Cold audit: same-day, post-merge. Merge = publish. **Evidence-branch convention applies (see WORKFLOW-TRACE addendum C, T21): gate artifacts push to `evidence/chrome-css-cleanup`, never to the PR branch — there is nothing to strip and the merge button is always safe.**

## Objective

Original scope plus the polish backlog accumulated during the 07-23 demo push. Still one pass, still `chrome.css`-centered.

### 1. Remove the redundant stark-cut workaround

Remove the `white-space: pre-line` rule scoped to stark-cut headings and its "flagged, not fixed deck-wide" comment block. With `nl2br()` fixed (NL2BR-PASS, 2026-07-23), headings carry `<br>` and the rule acts on nothing — documented in `CHANGE-NOTE-nl2br.md` §Key finding. If any comment residue elsewhere still repeats the disproven "invisible at teaching-caption/reveal scale" claim, retire it in the same pass.

### 2. Dark-mode popover elevation (eyes-on note, T19)

The ⋯ options popover's border is subtle against dark-mode slide backdrops. Add a touch more elevation (shadow, tokens only). Taste-level; before/after both modes.

### 3. `restartQuiz()` progress gap (pre-existing, flagged in CHANGE-NOTE-mobile-readability)

`restartQuiz()` doesn't call `updateProgress()` — progress text/fill and the mobile scroll-reset don't run on quiz restart. One call fixes both. (This is the pass's only `player.js` touch.)

### 4. Scene-slide text legibility — DESIGN DECISION, needs Sean's eyeball before build

Sean's device note (2026-07-23): text set directly over background art (scene slides) is hard to read; slides using the panel treatment (e.g. the "THE PROBLEM" reveal) read fine. **Do not just pick a fix.** Prepare 2–3 treatment options against the same scene slide — e.g. (a) stronger scrim gradient behind the text zone, (b) the existing panel/block treatment extended to scene text, (c) text-shadow tuning — as captures for Sean to choose from, consistent with the Slide-Type Standard's scrim/composite-contrast rules. This is an aesthetic-standard decision, not a CSS detail; the chosen treatment likely lands in the standard, not just the stylesheet.

## Scope

`builds/chrome/chrome.css` + the one `restartQuiz()` line in `player.js`. Item 4 ships only after Sean picks a treatment.

## Hard constraints

- Item 1: rendering identical — capture the six stark-cut newline headings (M1/16, M1/23, M2/2, M2/20, M3/3, M3/28) × both modes, before/after — identical expected.
- Items 2–4: intended visual changes — before/after captures per item, both modes; run the overflow audit (`tools/capture/overflow-audit.js`) as a regression gate.
- Desktop pixel-diff vs `main` for everything except the intended changes.
- All captures + audit JSON → `evidence/chrome-css-cleanup` branch, linked from the PR body.

## Handback

`courses/loto/CHANGE-NOTE-chrome-css-cleanup.md` — plan first (standing convention), removed block verbatim, option captures for item 4, evidence-branch link.

## Audit checklist (cold, post-merge)

- **C1** — diff confined to `chrome.css` + the one `restartQuiz()` line + change note; nothing in `screenshots/` on `main`.
- **C2** — six stark-cut pairs identical, both modes; `grep -r "pre-line" builds/chrome/` returns nothing.
- **C3** — overflow audit: zero regressions vs the #84 baseline.
- **C4** — item 4's shipped treatment matches the option Sean selected (recorded in the change note).
- **C5** — quiz restart updates progress and resets scroll.
