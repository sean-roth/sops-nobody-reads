# WORKFLOW-TRACE — record → spec for app v0 — T26 addendum E (2026-07-24)

Fold into the master trace with addendums A–D (and Sonnet's T25) at the reflection
session. Note for the consolidator: as of today the trace has three authors —
orchestrator, builder (T25), and the audits it cites — which is itself a finding.

- **T26 — #85 audit closed (Opus, first tri-model day); remediation ruled; the
  orchestrator got error-logged.** Auditor (Opus, cold) → orchestrator ·
  `courses/loto/AUDIT-2026-07-24-pr85.md` (`c2ac3de`) · audit kickoff · P1/P2/P4
  PASS, **P3 FAIL — a merge-gate failure, not a build failure**: PR opened 14:15,
  merged 14:16; the change note's own P3 row said Sean's selection was "not yet
  made," and what shipped included a measurement-driven deviation (the scene label
  got the panel too — well-documented, likely correct, but unselected). The builder
  flagged the gap honestly instead of marking it green; the auditor named the gate.
  Also from the audit: the specificity survey caught a stacking fact invisible to
  every rect-based check (`.slide.has-image > *` still wins `z-index` on the chip);
  the change-note contrast table disagreed with its own cited artifact on 6 of 8
  rows (transcription, artifact correct, verdicts unchanged); the overflow gate was
  structurally blind to this change class and its JSON carries no run provenance;
  and tree-pinning saved the audit from comparing post-housekeeping CSS against a
  pruned baseline.
  **Remediation ruling:** (1) P3 closes on Sean's retroactive selection — the live
  demo is the review surface, alternates on `evidence/demo-polish`; change-note P3
  row records the choice; (2) clerical truth-fixes staged in
  `AUDIT-REMEDIATION-2026-07-24.md` (contrast table to match artifact; `z-index: 3`
  on the image-slide chip + honest note + stamp bump); (3) instrument upgrades
  queued: Reviewer-mode sweep axis, run-provenance fields. Separately, **T25 (authored
  by the builder)** stands: the orchestrator's housekeeping runbook named the wrong
  prune set (included `chrome-consolidation`, omitted `demo-cut-menu` — the actual V1
  remediation); the builder pruned the correct sets, corrected the doc in place, and
  logged it as BUILD-LESSONS L2 per the repo's own convention.
  *App notes: (1) accountability now runs in every direction — builder error-logs
  orchestrator, auditor fails a merge the human pressed, orchestrator rules remedies
  on itself; no seat is above the conventions, and the runner should enforce that
  structurally. (2) Surveys and screenshots are complementary instrument classes:
  stacking contexts are invisible to geometry checks — keep both. (3) The merge gate
  is still the weakest link even after evidence branches removed the strip ritual:
  the residual failure is *pending-human-choice at merge time*. Runner requirement:
  an open decision recorded in a change note must mechanically block the merge
  button — decisions gate merges, not rituals. (4) Seats are model-pluggable in
  practice as of today: Fable orchestrating, Sonnet building, Opus auditing — the
  QUALIFY_MODEL-style config assumption validated at the workflow level.*
