# WORKFLOW-TRACE — record → spec for app v0 — T23–T24 addendum D (2026-07-24)

Fold into the master trace with addendums A–C at the reflection session.

- **T23 — PR #85 (demo-polish) merged mid-sitting (14:16), unaudited; evidence-branch
  convention's first live run.** Human + builder · DEMO-POLISH brief · Sean's
  between-classes check · citation-chip pinning fix + scene-text treatment live;
  captures on `evidence/demo-polish` (never merged) — confirmed from *outside* by the
  sitting auditor, who flagged both the missing audit and the convention now in
  practice · gate: post-merge audit commissioned
  (`docs/app/seats/audit-pr85-2026-07-24.md`).
  *App note: an auditor scoped to five passes correctly reported a sixth thing it
  noticed without expanding its own scope — observe-and-flag-without-acting is the
  right boundary behavior for every seat, and the runner should make "out-of-scope
  observations" a standard report section.*

- **T24 — Audit sitting closed: zero functional defects; three FAILs, one class;
  remediation ruled.** Auditor (cold) → orchestrator ·
  `courses/loto/AUDIT-2026-07-24-sitting.md` (`fb813c8`) · sitting kickoff · verdicts:
  #81 PASS 5/5 · #82 FAIL (V1 evidence unstripped; V4 live-device conjunct
  unevidenced, layout clean) · hotfix PASS 3/3 · #83 FAIL (B1 only; B2–B5 pass incl.
  the `display: contents` a11y concern) · #84 FAIL (R1 only; R2–R5 pass on
  independent measurement). Every runtime claim in five change notes held under
  independent verification. All three FAILs are the strip-before-merge step not
  executing — the same systemic diagnosis the trace reached at T21 (n=3 → procedure,
  not people), now confirmed by a second, independent instrument.
  **Orchestrator remediation ruling:** (1) prune the 54 evidence files from `main`'s
  tree (`HOUSEKEEPING-2026-07-24.md`, step 1) → V1/B1/R1 remediated; (2) the
  procedural fix predates the verdict — evidence-branch convention, live since #85;
  (3) audited branches deletable, evidence reachable via `refs/pull/*/head`; (4)
  V4's unevidenced live-device conjunct is accepted on Sean's contemporaneous device
  checks, noted as evidence-capture debt the visual-gate lane will absorb.
  *App notes: (1) two independent instruments — the running trace and a cold audit —
  converged on the same systemic finding; that convergence is what a healthy control
  system looks like, and the runner should treat trace-vs-audit agreement/divergence
  as a first-class health metric. (2) Verdict-level FAILs with zero functional
  defects means the checklists correctly encode *process* discipline, not just code
  truth — keep that property. (3) The auditor pinned exact trees per pass and
  reported concurrent-merge contamination risk unprompted — encode tree-pinning in
  the auditor template.*

- **T25 — Housekeeping executed; runbook bug caught before it ran
  (2026-07-24).** Human + Claude (ad hoc session, cross-repo entry via a
  pasted GitHub URL) · `HOUSEKEEPING-2026-07-24.md` · cross-check against
  `AUDIT-2026-07-24-sitting.md`'s own evidence counts + T24's "54 evidence
  files" ruling before executing · step 1 corrected (drafted command pruned
  `chrome-consolidation` instead of `demo-cut-menu` — the real V1 target;
  both pruned as separate commits, since chrome-consolidation is a genuine
  but unrelated 2026-07-22 open item) + steps 2–3 executed as drafted +
  `BUILD-LESSONS.md` L2 + doc correction · gate: none (mechanical,
  verified by read per the runbook's own step 4).
  *App note: the runbook was drafted by an orchestrator session and
  executed cold by a different session with no shared context beyond the
  committed files — the same seat-separation property as an audit — and
  that separation is what surfaced the bug: the executing session checked
  the runbook's claims against the audit's own numbers instead of
  trusting the prose. Runbooks-as-committed-files get the same benefit
  audits do, for free, if whoever executes them reads skeptically.*
