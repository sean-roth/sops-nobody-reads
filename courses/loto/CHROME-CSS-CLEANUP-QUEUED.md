# CHROME-CSS-CLEANUP — builder brief (queued: post-demo)

STATUS: QUEUED — **not morning work.** Run after DEMO-CUT-MENU ships and the first call block is done. Branch off `main`, one PR. Cold audit: same-day, post-merge. Merge = publish.

## Objective

Remove the now-redundant stark-cut workaround from `builds/chrome/chrome.css`: the `white-space: pre-line` rule scoped to stark-cut headings (~lines 493–507) and its "flagged, not fixed deck-wide" comment block. With `nl2br()` fixed (NL2BR-PASS, 2026-07-23), headings carry `<br>` and the rule acts on nothing — documented in `CHANGE-NOTE-nl2br.md` §Key finding.

## Scope

`courses/loto/builds/chrome/chrome.css` only — the rule + its comment block, nothing else.

## Hard constraints

- Rendering identical: screenshot the six stark-cut newline headings (M1/16, M1/23, M2/2, M2/20, M3/3, M3/28) × both modes, before/after — byte-identical expected.
- If any comment residue elsewhere still repeats the disproven "invisible at teaching-caption/reveal scale" claim, retire it in the same pass (it's part of the same comment block's story).
- Screenshots: **separate commit, branch-only** — revert/strip before squash-merge (commit-split convention, per T12).

## Handback

`courses/loto/CHANGE-NOTE-chrome-css-cleanup.md` — the removed block verbatim, before/after screenshots.

## Audit checklist (cold, post-merge)

- **C1** — diff confined to `chrome.css`; removal only (rule + comment), no other rule touched.
- **C2** — six stark-cut screenshot pairs byte-identical, both modes.
- **C3** — `grep -r "pre-line" builds/chrome/` returns nothing.
