# DEMO-POLISH — builder brief (2026-07-24)

STATUS: READY. Sean's cut, verbatim: these two items and nothing else ("just those"). Branch off `main`, one PR, plan-first commit. **First pass under the evidence-branch convention: all captures + audit JSON push to `evidence/demo-polish` (never merged), linked from the PR body. Nothing lands on the PR branch but code, the change note, and tools changes.** Handback stops at the PR; Sean checks between classes; orchestrator merges on his go. Merge = publish.

## Item 1 — Reviewer-mode citation floats to center on image slides (diagnosed)

**Symptom (Sean's device):** with Reviewer mode on, the citation chip on image-background slides renders mid-slide instead of pinned bottom-right like everywhere else.

**Root cause (verified against `chrome.css` on `main` — confirm in plan):** line 65's scrim-lifting rule `.slide.has-image > * { position: relative; z-index: 2; }` has specificity (0,2,0) and beats `.citation-chip`'s (0,1,0) `position: absolute` — so on image slides only, the chip drops into normal flow and lands wherever the centered content ends. The color special-case at line 779 (`.slide.has-image .citation-chip`) already exists; the positioning override just went unnoticed.

**Fix:** minimal scalpel — add `position: absolute;` to the existing `.slide.has-image .citation-chip` block (same (0,2,0) specificity, later in the file, wins the tie). Verify in the plan that the chip is a direct child of `.slide` in the rendered DOM on both plain and image slides; if it isn't, say so and adjust.

**Check:** chip pinned bottom-right on an image slide and a plain slide, Reviewer mode, both modes, desktop + 390px.

## Item 2 — Scene-text legibility over background art (ship a default, capture alternates)

**Sean's note:** text set directly over art is hard to read; the panel treatment (as on the "THE PROBLEM" reveal) reads well. Promoted from the polish backlog — this supersedes item 4 of `CHROME-CSS-CLEANUP-QUEUED.md`.

**Approach — recommended default plus one-glance alternates,** so Sean approves or swaps from captures between classes instead of a design round-trip:
- **Default (build this):** extend a panel/scrim treatment to scene-slide text blocks, consistent with the Slide-Type Standard's scrim and composite-contrast rules — the direction Sean pointed at. Tokens only.
- **Alternates (capture, don't ship):** (a) strengthened scrim gradient localized to the text zone, (b) tuned text-shadow. Same scene slide, same viewports, labeled captures in the evidence branch.
- Whichever treatment Sean selects gets noted in the change note as a pending Slide-Type Standard amendment (standard update trails; do not edit the standard in this pass).

**Check:** the busiest scene slide (M1 slide with the maintenance-scene art) legible in both modes at 1440 and 390; no change to non-scene slide types (overflow audit as regression gate; desktop pixel-diff limited to intended changes).

## Scope

`chrome/chrome.css` (+ `player.js` only if the chip's DOM parent needs correcting). Nothing else — the rest of the polish backlog stays in `CHROME-CSS-CLEANUP-QUEUED.md`.

## Audit checklist (cold, post-merge)

- **P1** — diff confined to scope; `main` gains no capture artifacts (evidence branch only).
- **P2** — citation chip bottom-right on image + plain slides, Reviewer mode, both modes, both widths; the `> *` override no longer applies to the chip.
- **P3** — shipped scene treatment matches Sean's selection (recorded in change note); alternates present in the evidence branch.
- **P4** — overflow audit: zero regressions vs the #84 baseline; no unintended visual change outside scene text + chip.
