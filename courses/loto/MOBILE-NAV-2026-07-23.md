# MOBILE-NAV — builder brief (2026-07-23, HOT)

STATUS: HOT — demo-blocking on phones, the prospect surface. Fresh builder session: boot cold from this repo; no prior context exists or is needed. Branch off `main`, one PR, squash-merge. Screenshots in a separate branch-only commit, strip before merge. Merge = publish.

## Defect (verified from the live files)

The injected bottom bar (`PLAYER_MARKUP`, `chrome/player.js`) carries **three controls in the left cluster** — `Menu` (link) + `Dark` (#darkToggleBtn) + `Learner Mode` (#modeToggleBtn) — plus a **fixed-width progress track** (180px; 100px ≤768px) and **← Prev / Next →**. That's roughly 600px of content in a 390px vertical-phone row (`.bottom-bar` is `space-between`, no wrap), so the nav buttons get shoved right and the course is not navigable on a phone. Found by Sean's device check; invisible to the pixel-diff matrix (it's an absolute-quality defect, and the matrix only detects change).

## Required behavior

**At phone widths (pick the breakpoint — likely ≤640px — and verify the bar is comfortable down to 360px):**
- Bar reduces to: **[⋯] [progress] [← Prev] [Next →]** — nav always fully visible, all targets ≥44px.
- The **⋯ button** (aria-label "View options") opens a small popover anchored above the bar containing, in this order: **Learner/Reviewer toggle · Dark toggle · Menu**. Sean's design call: the three left-cluster controls combine into one.
- Popover closes on selection, outside tap, and Esc; `aria-expanded`/`aria-controls` on the trigger; focus returns to the trigger on close. Popover styles use existing tokens only — no new colors.
- Let the progress track flex instead of staying fixed (e.g. `flex: 1 1 auto; max-width: 180px; min-width: 60px`) — builder's judgment on exact values.
- `toggleDarkMode()` / `toggleReviewerMode()` reference the button ids — keep `#darkToggleBtn` / `#modeToggleBtn` (and their `aria-pressed` behavior) working wherever the buttons live.

**Above the breakpoint: unchanged, pixel-identical to `main`.** The Learner/Reviewer toggle stays visible on desktop deliberately — it's the trust feature (outreach constraint: discoverable without narration) — so it only collapses where space forces it.

## Scope

`chrome/player.js` (bar DOM + popover behavior) and `chrome/chrome.css` only. No shells, no `MODULE`/`MODULE_CHROME`, no menu file.

## Verification

- Phone 390×844 **and** 360×800, both modes, on three slide types: a mid teaching slide, a quiz slide, the close slide. Popover open + closed states.
- Desktop 1440: pixel-compare vs `main` — identical.
- **Commit the capture harness under `tools/`** — harnesses are infrastructure now (trace T16); the previous one died with a scratchpad.

## Handback + gate

- `courses/loto/CHANGE-NOTE-mobile-nav.md` — final bar anatomy at both widths, popover semantics, screenshot inventory.
- **Visual gate before merge:** Sean device-checks on his phone, and the phone screenshots go to the orchestrator for an eyes-on review (absolute criteria: nothing clipped, nav reachable, popover legible in both modes). This is the manual form of the runner's future vision lane.

## Audit checklist (cold, post-merge)

- **B1** — diff confined to `chrome/` + change note (+ `tools/` addition allowed; screenshots stripped).
- **B2** — at 360 and 390: every bar control visible and tappable, no horizontal scroll, targets ≥44px.
- **B3** — popover contains exactly the three relocated controls; open/close and focus behavior per brief; `aria-pressed` still tracks both toggles.
- **B4** — desktop vs `main`: pixel-identical.
- **B5** — both modes across mid/quiz/close slides, popover open and closed.
