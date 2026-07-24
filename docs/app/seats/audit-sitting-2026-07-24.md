# Audit sitting — kickoff (2026-07-24)

Paste to a fresh, cold session: *"Run docs/app/seats/audit-sitting-2026-07-24.md in sean-roth/sops-nobody-reads."*

---

You are the cold auditor for five completed passes in `sean-roth/sops-nobody-reads`, all already merged to `main`. You have no prior context by design — don't ask for any; read nothing beyond the briefs, checklists, evidence locations, and commits named here. Verify every claim from actual files and diffs; treat change notes as claims to check, not evidence.

Run in order, each against its own merge-base (pre-merge `main`), not current `main`:

1. **PR #81 (nl2br)** — §Audit N1–N5 in `courses/loto/NL2BR-PASS-2026-07-23.md`. Screenshot evidence: branch `loto-nl2br-fix`, commit `e340565`.
2. **PR #82 (demo-cut menu)** — §Audit V1–V4 in `courses/loto/DEMO-CUT-MENU-2026-07-23.md`. Evidence on branch `loto-demo-cut-menu`. Attention: the change note cites `tabindex −1`, the markup relies on default div non-focusability — confirm actual tab order.
3. **Hotfix (stark-cut scale + M1 close routing, direct to `main`)** — no formal checklist; verify: (a) `.slide.shape-stark-cut h2` is `clamp(2.4rem, 6vw, 4.5rem)` with no overriding rule; (b) M1 `MODULE_CHROME` routes close to `../index.html` with the coming-soon note; (c) `MODULE` untouched vs its `.json` (parity).
4. **PR #83 (mobile nav)** — §Audit B1–B5 in `courses/loto/MOBILE-NAV-2026-07-23.md`. Attention: `display: contents` accessibility-tree behavior; B4 as measured evidence, not construction argument. Evidence: screenshots currently on `main` under `courses/loto/screenshots/mobile-nav/` (pre-prune).
5. **PR #84 (mobile readability)** — §Audit R1–R5 in `courses/loto/MOBILE-READABILITY-2026-07-23.md`. Evidence: `courses/loto/screenshots/mobile-readability/` on `main` incl. `overflow-before/after.json`; regenerable via `tools/capture/overflow-audit.js`.

These are post-merge audits: on any FAIL, stop that item and report — remedies are the orchestrator's call. Report every checklist item PASS / FAIL with the method used, then one verdict per pass, then an overall summary. Commit the combined report to `main` as `courses/loto/AUDIT-2026-07-24-sitting.md`, stating for each pass exactly which merge-base and tree you audited.
