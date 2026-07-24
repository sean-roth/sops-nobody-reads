# Cold audit — 2026-07-24 sitting

Auditor: Claude (cold context per `docs/app/seats/audit-sitting-2026-07-24.md`). Five merged
passes audited in order, each against its own merge-base (pre-merge main), not current main.
Every claim verified from actual files, diffs, and committed evidence; change notes treated as
claims, not evidence. Current `main` HEAD at audit time: `30e94b3`.

**Environment limitation (applies throughout):** this audit environment has no browser —
Playwright's browser download is blocked by the network allowlist — so no capture, selfcheck,
or overflow harness could be re-executed. Where a checklist item rested on harness output, the
committed raw evidence (PNGs, JSON) was analyzed directly and independently (pixel-diffing via
PIL, JSON parsing, DOM/data extraction from the committed trees), and the method is disclosed
per item. Nothing was scored PASS on a change note's say-so alone.

---

## Pass 1 — PR #81 (nl2br fix)

**Tree audited:** squash commit `91505ea` vs pre-merge main `52a3760` (branch forked at
`3f547d9`; the `3f547d9..52a3760` gap is docs-only, so the merge-base comparison is clean).
Screenshot evidence lives on branch `loto-nl2br-fix` at commit `e340565`, reverted by
`b4e1418` before squash — the strip convention was honored here.

| Item | Verdict | Method |
|---|---|---|
| N1 — diff confined to `player.js` + change note | **PASS** | `git diff --name-only 52a3760 91505ea` = `chrome/player.js` + `CHANGE-NOTE-nl2br.md` only. The fix is one character: `/\\n/g` → `/\n/g`. |
| N2 — change-note table matches data | **PASS** | Extracted the inline `MODULE` from all three module shells at the tree. 43 heading-bearing slides == 43 table rows; zero missing/extra rows; zero newline-count mismatches. All six named spot-checks match (M1/0=1, M1/7=2, M2/10=2, M2/3=2, M3/5=2, M3/27=2). Verified every row, which is stronger than the required six spot-checks. |
| N3 — no content change beyond line breaks | **PASS** | Word-multiset of old-nl2br vs new-nl2br output identical across M1/M2/M3; no literal backslash-n sequences in data (confirming the old code was truly a no-op). Totals match the note: br-after 15/11/20, newline-bearing headings 12/8/14, slides 25/22/30. Method: direct invariant computation, not a reproduction of the note's SHA pipeline. |
| N4 — screenshots show the breaks (measured) | **PASS** | 172 PNGs at `e340565` → 86 before/after pairs. 30 byte-identical + 56 changed, with **zero** classification mismatches against the data-derived prediction (changed ⇔ newline-bearing non-stark-cut heading; identical ⇔ stark-cut or zero-newline). Diff bboxes confined to the mid-screen text band (y≈180–655), 0.7–6% of pixels. Eyes-on m01-idx07: heading breaks Electrical./Mechanical./Hydraulic. Pneumatic. correctly. |
| N5 — call sites scoped correctly | **PASS** | Five `nl2br` call sites (player.js lines 127, 152, 158, 167, 175), all on `slide.heading` (title h1, figure-caption, teaching-caption h2, misconception-quote, reveal h2). Consolidation (204) and quiz options (217) bypass with raw `${slide.heading}` as claimed. `renderClose`'s hardcoded `<br>` (300) untouched. |

**Pass 1 verdict: PASS** (5/5).

---

## Pass 2 — PR #82 (demo-cut menu)

**Tree audited:** merge commit `90664ec` vs merge-base / pre-merge main `2741eda`. Branch head
`d4f54b2` (includes the screenshot commit).

| Item | Verdict | Method |
|---|---|---|
| V1 — evidence stripped before merge | **FAIL** | `git diff --name-only 2741eda 90664ec` includes four PNGs (`screenshots/demo-cut-menu/menu-{desktop,phone}-{before,after}.png`). The merge was a true merge of the branch including its screenshot commit; the brief required branch-only evidence stripped before squash-merge. The change note's own V1 "PASS" presumed a strip that never happened at merge time. Severity: process / evidence hygiene — no runtime effect. |
| V2 — no product-terms leakage | **PASS** | Word-boundary, case-insensitive grep for training / compliance / platform / solution / LMS / SCORM / AI = 0 hits in the raw file, visible text, `<title>`, and meta. Title: "Lockout/Tagout: Control of Hazardous Energy \| SOPs Nobody Reads". |
| V3 — M2/M3 rows inert, tab order correct | **PASS**, with finding | No `<script>`, no `onclick`, no `tabindex` anywhere in the file. M2/M3 are `<div class="module-row coming-soon" aria-disabled="true">` (lines 388, 401), no href. `.coming-soon { opacity:.45; pointer-events:none }`, `.row-arrow { visibility:hidden }` present. M1 anchor (375) → `module-01/index.html`, target exists at the tree. Tab order: M1 → Calendly (420) → mailto (422) → brand (426), as claimed. **Finding (kickoff attention item resolved):** the change note attributes inertness to `tabIndex −1`; the markup contains no tabindex — the actual mechanism is default div non-focusability. Functional outcome holds; severity is documentation accuracy. |
| V4 — layout verified; live /demo spot-check | **FAIL as written** | The layout conjunct PASSES on measurement: all four committed PNGs viewed — desktop 1440 rows pixel-aligned, greyed M2/M3 with "Coming soon", label "INDUSTRIAL SAFETY", meta "3 modules · Module 1 open now · …"; phone 390 clean, +13px height from a wrapped meta line, no layout break; desktop before/after diff bbox (234,76,1206,904) sits in the expected content regions. The live `/demo` device spot-check conjunct is unevidenced within the audit's named scope — the change note explicitly defers it to Sean post-merge. Scored FAIL on the letter of the checklist as an **evidentiary gap, not a detected defect**; a record may exist in trace docs outside the named scope. |

**Pass 2 verdict: FAIL** (V1 evidence hygiene; V4 evidentiary gap). Runtime state of the menu
verified correct on every measurable point.

---

## Pass 3 — Hotfix (direct-to-main)

**Tree audited:** `c4024da` vs parent `90664ec`. No checklist exists for this change (direct-to-main);
the three kickoff-specified checks were run instead.

| Item | Verdict | Method |
|---|---|---|
| (a) stark-cut h2 clamp | **PASS** | `chrome.css:503` — `.slide.shape-stark-cut h2 { font-size: clamp(2.4rem, 6vw, 4.5rem); }` (previously `clamp(2.6rem, 7vw, 5.5rem)`). No overriding rule: per-type h2 rules are (0,1,1) specificity vs this rule's (0,2,1); no h2/stark rules inside any `@media` block; nothing in `tokens.css`; zero `<style>` blocks in module shells; no `!important` on any font-size. |
| (b) M1 close routing | **PASS** | `MODULE_CHROME.nextHref = "../index.html"` (resolves to `builds/index.html`, the menu), `nextLabel` "Back to the module list", `closeNote` "Module 1 of 3 — Modules 2 and 3 are coming soon." `player.js` close screen consumes `MODULE_CHROME.nextHref` (line 305); the bar's Menu link is separately hardcoded `../index.html` (line 25). |
| (c) MODULE parity | **PASS** | Inline `MODULE` deep-equals `builds/module-01.json` at `c4024da` (key-order-sensitive stringify identical, 25 slides each). The commit diff touches only the `MODULE_CHROME` lines and `chrome.css`. |

**Pass 3 verdict: PASS** (3/3). **Observation:** as a direct-to-main change, this hotfix has no
checklist and no visual evidence anywhere — acceptable for its size, noted for the record.

---

## Pass 4 — PR #83 (mobile nav)

**Tree audited:** merge commit `9981f5f` vs pre-merge main `a9877ff` (merge-base `c4024da`; the
`c4024da..a9877ff` gap is docs-only — brief + trace). Branch head `06682f4`.

| Item | Verdict | Method |
|---|---|---|
| B1 — evidence stripped before merge | **FAIL** | Merged diff includes **24 PNGs** under `courses/loto/screenshots/mobile-nav/` (true merge including screenshot commit `06682f4`; brief said squash + strip). The `tools/capture/*` addition is explicitly allowed and in scope. All 24 files remain on current main `30e94b3`, matching the kickoff's own "pre-prune" language. Same failure mode as V1. |
| B2 — 44px targets, progress track fits | **PASS** | CSS at ≤640px: `.nav-btn { min-height:44px }` (moreBtn carries `.nav-btn` plus `min-width:44px`, inline-flex → 44×44); `.progress-track { flex:1 1 auto; width:auto; max-width:180px; min-width:60px }`. Visual at 360×800 closed state: [⋯][progress][← Prev][Next →] all fully visible, nothing clipped. Corroborated by the committed `selfcheck.js` claims (harness not executable here — method disclosed above). |
| B3 — popover mechanism + a11y | **PASS** | **Kickoff attention item resolved:** shipped `chrome.css` contains **zero** `display:contents` and zero `order:` properties — the planned construction was abandoned mid-build (documented in the change note's Deviation section) because CSS order doesn't affect tab order. Shipped mechanism: `arrangeBarControls()` physically relocates DOM nodes via `matchMedia('(max-width:640px)')` at init + breakpoint change: phone → popover order Learner Mode / Dark / Menu (the brief's order); desktop → original order; popover closes on crossing. `#moreBtn` has `aria-haspopup`, `aria-expanded` (toggled), `aria-controls="moreMenu"`, `aria-label="View options"`. `closeMoreMenu({returnFocus})` early-returns when closed and restores focus to the button when asked; Esc → close + returnFocus (449); outside-click closes without a focus yank (guards `menu.contains`/`btn.contains`); both toggles keep their ids, set `aria-pressed`, then close with returnFocus. Open capture at 390 confirms the popover contents and order exactly. |
| B4 — desktop pixel parity (measured) | **PASS** | Independent PIL comparison of all four committed 1440×900 before/after pairs (light/dark × mid-teaching/close): diff bbox `None` — zero differing pixels — independent of the change note's 0.0000% pixelmatch claim. |
| B5 — capture matrix | **PASS**, with note | Inventory is exactly 12 closed (2 widths × 2 modes × mid/quiz/close) + 4 open (2 widths × 2 modes × **mid-teaching only**); open×{quiz, close} cells absent. The builder disclosed the sampling and rationale (popover is independent of slide content) prominently in the change note, which the orchestrator read. Scored PASS with the matrix documented here so a stricter reading can be enforced if desired. |

**Pass 4 verdict: FAIL** (B1 only). Runtime behavior verified correct on every measurable point.

---

## Pass 5 — PR #84 (mobile readability)

**Tree audited:** merge commit `4f53b52` vs merge-base / pre-merge main `37cdad6`. Branch head
`66c36ac`.

| Item | Verdict | Method |
|---|---|---|
| R1 — diff confined to chrome/ + note + tools/capture | **FAIL** | Merged diff (`37cdad6..4f53b52`, 34 files): `chrome.css`, `player.js`, `CHANGE-NOTE-mobile-readability.md`, `OVERFLOW-AUDIT-mobile-readability.md` (the R3-mandated M2/M3 report — in scope), 4 `tools/capture/` files (allowed), **plus 26 evidence files** (24 PNGs + `overflow-before.json` + `overflow-after.json`) under `screenshots/mobile-readability/` — not stripped. The change note's own inventory section says "branch-only, strips before squash-merge." Third instance of the V1/B1 failure mode. |
| R2 — slide 20 two-column, 1·2/3·4/5·6, all visible | **PASS** | Data/DOM: M1 idx19 items carry sequential nums "1."–"6."; at ≤640px `.seq-row` → `display:contents` flattens the row wrappers and `.consolidation-sequence` → 2-col grid, so auto-placement over unchanged DOM order guarantees row-major 1·2 / 3·4 / 5·6. Eyes-on the committed after-captures at **360** and **390** (light): two columns, Notify·Shut down / Isolate·Lock & tag / Release stored energy·Verify, all six fully visible above the bar. Dark differs only in palette (layout CSS is mode-independent); the overflow JSON covers all width/mode cells. Corroboration of the note's discovery claim: the slide-25 before-capture shows the described **horizontal** both-edge spill (three 260px auto-fit columns inside a ~330px slide); the after-capture shows a clean 2-col grid, all seven items visible. |
| R3 — zero clipped-and-unscrollable, M1; M2/M3 report attached | **PASS** | Independent parse of both committed JSONs: 736 entries each (M1 240 / M2 216 / M3 280 = 92 waypoints × 4 viewports × 2 modes). **After:** zero clipped-and-unscrollable anywhere; zero horizontal clips; M1 has zero clipped entries at all. Only residuals: 2 × module-03 slide-7 at 360×660-chrome (both modes), `scrollWorks: true` — 11px overflow fully reachable via the backstop, the report's own "fine" category. **Before:** 36 clipped, including M1 slide-20/25 (slide-20 clipping only at the disclosed chrome-height viewports — matching the note's methodology discovery) and the M2/22 + M3/30 horizontal clips, all resolved. Coverage is a superset of the checklist: it adds chrome-height viewports (390×704, 360×660) and the close waypoint (checklist's "29" = 25 slides + 4 quiz; the JSONs add close = 30). The M2/M3 report (`OVERFLOW-AUDIT-mobile-readability.md`) is attached and consistent with the raw JSONs. |
| R4 — desktop pixel-identical (measured) | **PASS** | Independent PIL comparison of all four committed 1440×900 before/after pairs (slide20/25 × light/dark): diff bbox `None` — zero differing pixels. Supplemented by CSS scoping: every CSS addition sits inside a single `@media (max-width:640px)` block. |
| R5 — scroll resets on slide change; quiz/close unaffected above threshold | **PASS** | `player.js:424` — `scrollTop = 0` inside `updateProgress()`. Callers: `initPlayer` (164), `nextSlide` (398), `prevSlide` (415), which cover every navigation path: slide→slide, slide→quiz, quiz→quiz, quiz→close, and all three prev paths. `selectAnswer` correctly does *not* reset (same question, feedback shown in place). One mechanism gap, disclosed in the note as pre-existing and out of scope: `restartQuiz()` skips `updateProgress()` — no observable effect, since the close screen never overflows on any tested viewport (all `close` waypoints `ok` in the after JSON), so `scrollTop` is always already 0 there. Above 640px: CSS untouched by scoping (confirmed by R4's zero-pixel result); the JSON shows every quiz/close waypoint clean at all viewports. Note on the kickoff's display:contents sensitivity from Pass 4: the `display:contents` used here applies to non-interactive layout divs (`.seq-row`), so the accessibility-tree concern that applied to interactive controls is not implicated. |

**Pass 5 verdict: FAIL** (R1 only). Runtime behavior verified correct on every measurable point,
including two genuine methodology discoveries in the change note (slide-25's defect was
horizontal; nominal viewport heights don't reproduce slide-20's clipping) that the raw JSON
evidence independently corroborates.

---

## Overall summary

| Pass | Change | Verdict | Failing items |
|---|---|---|---|
| 1 | PR #81 nl2br | **PASS** | — |
| 2 | PR #82 demo-cut menu | **FAIL** | V1 (evidence not stripped), V4 (live-check conjunct unevidenced) |
| 3 | Hotfix `c4024da` | **PASS** | — |
| 4 | PR #83 mobile nav | **FAIL** | B1 (evidence not stripped) |
| 5 | PR #84 mobile readability | **FAIL** | R1 (evidence not stripped) |

**Zero functional defects found across the sitting.** Every runtime-behavior claim in all five
change notes checked out under independent verification — including one-character fix scoping
(Pass 1), inert-row mechanics and tab order (Pass 2), CSS specificity survey (Pass 3), the
abandoned-and-replaced popover construction (Pass 4), and full overflow-matrix and pixel-parity
analysis (Pass 5).

**The systemic finding: the strip-before-merge convention failed three times out of the four
times it applied** (V1, B1, R1 — only Pass 1 executed it, via revert `b4e1418` before squash).
In each case the change note *states* the convention while the merge was performed as a true
merge that carried the evidence commit to main. This is an evidence-hygiene / merge-procedure
failure, not a code failure — but it is the same failure three times, which points at the merge
step, not the builders. As of `30e94b3`, main carries 24 PNGs under `screenshots/mobile-nav/`,
4 under `screenshots/demo-cut-menu/`, and 26 files under `screenshots/mobile-readability/`.
The kickoff's "pre-prune" phrasing suggests a prune is already anticipated; remedies are the
orchestrator's call.

**Secondary notes for the orchestrator:** (1) V4's live `/demo` device check remains open per
the Pass 2 change note's own deferral. (2) Pass 3's hotfix has no visual evidence by nature of
direct-to-main. (3) The Pass 2 change note's `tabIndex −1` mechanism description should be
corrected to default div non-focusability if that note is ever treated as reference. (4) B5's
open-popover captures sample mid-teaching only; matrix documented above if stricter coverage is
wanted. (5) `restartQuiz()`'s missing `updateProgress()` call is a pre-existing gap, currently
unobservable, cheap to close in any future player.js pass.

**Evidence regeneration:** the overflow JSONs are regenerable via `tools/capture/overflow-audit.js`
against any checkout, per the kickoff — but not in this audit environment (no browser, as noted
above). All conclusions here rest on the committed evidence plus independent static analysis.
