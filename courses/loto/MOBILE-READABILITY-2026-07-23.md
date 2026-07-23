# MOBILE-READABILITY — builder brief (2026-07-23, HOT #2)

STATUS: HOT — demo-blocking readability on the prospect surface. Branch off `main`, one PR. Plan-first commit before any code (standing convention). Screenshots in a separate branch-only commit. Handback stops at the PR: Sean's device check + orchestrator eyes-on, then builder strips the screenshot commit on the go, orchestrator squash-merges. Merge = publish.

## Defects (Sean's device check, diagnosed against the live files)

Both are the same defect class: the 768px collapse of consolidation sequences to one column (`.seq-row { grid-template-columns: 1fr !important }`) trades width for height inside a frame that has no height to give (the player never scrolls).

- **Slide 20 — `consolidation`, "The Six Steps."** Six `.seq-step`s stack in one column at phone width; step 6 clips below the fold.
- **Slide 25 — `consolidation`, "Module 1 — Key Concepts."** Same family, same stack, same clipping.

## Required

1. **Slide 20 layout is Sean's explicit design:** at ≤640px, the six steps read as a **two-column grid, left-to-right by rows — 1·2 / 3·4 / 5·6.** Desktop rows are grouped with inline column counts, so achieve the reading order structurally (e.g., flatten `.seq-row` via `display: contents` and make the sequence itself the 2-col grid) rather than hoping per-row wrapping lands right — mechanism is builder's judgment, reading order is not. Adapt the row connectors and step text width for the narrow cells; suppress what doesn't translate.
2. **Apply the same phone treatment to consolidation sequences generally** (slide 25 included) where the content is step/card-like — one rule fixing the family beats two point fixes. Builder verifies slide 25's actual structure in the plan.
3. **Systemic backstop:** at ≤640px the slide content area scrolls vertically when content exceeds the frame (`overflow-y: auto` on the appropriate container). Dense slides become scrollable instead of clipped — this covers every future dense slide, including M2/M3's heavier material. `player.js` resets scroll to top on every slide change (the only JS touch in this pass).

## Scope

`chrome/chrome.css` + the scroll-reset line in `chrome/player.js`. No shells, no data, no menu.

## Verification — the upgrade this pass ships

Extend `tools/capture` with a **programmatic overflow audit**: for every M1 slide × {360×800, 390×844} × both modes, measure clipping (with the backstop disabled: `scrollHeight > clientHeight` per slide; with it enabled: scroll to bottom and assert the last content node is fully visible). Deliver the **before/after overflow table for all 29 M1 slides** — readability stops being whack-a-mole and becomes a measured check. Run the same audit read-only across M2/M3 and attach the report (no fixes there this pass; they're behind coming-soon).

Plus captures for the eyes-on gate: slides 20 and 25 at both widths, both modes, before/after.

## Audit checklist (cold, post-merge)

- **R1** — diff confined to `chrome/` + change note + `tools/capture` extension (screenshots stripped before merge).
- **R2** — slide 20 at 360/390: two columns, reading order 1·2 / 3·4 / 5·6 verified in DOM order and capture; all six visible.
- **R3** — overflow table: zero clipped-and-unscrollable slides across all 29 M1 slides at both widths, both modes; M2/M3 report attached.
- **R4** — desktop (>640px): pixel-identical to `main`.
- **R5** — scroll position resets on slide change; quiz and close slides unaffected above the backstop threshold.
