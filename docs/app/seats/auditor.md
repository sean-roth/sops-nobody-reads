# Auditor seat — kickoff prompt (template)

Version 2 — 2026-07-24. v1 was extracted 2026-07-22 from the PR #80 audit kickoff — the first seat prompt committed as a file, per the lead-gen pattern (`phonebooth/_agent/skills/leads/qualification-prompt.md`). v2 folds in what the PR #85 audit had to improvise.

**Why the template is short.** Current model guidance prefers goals over prescribed step-by-step plans — the model's own verification plan usually beats a scripted one — and calls for giving it something concrete to verify against. The brief's embedded §Audit checklist IS that concrete thing, so the kickoff only needs **the seat, the pointers, the trust rule, and the output contract.** Do not restate the checklist in the prompt; duplication drifts. For the same reason the template *points at* the standing rules below rather than reproducing them.

## Which lane

This seat runs **pass audits**: one change, anchored to the brief's §Audit checklist, one PR. For auditing a whole deliverable against the standards and frozen sources, use `docs/standards/course-audit-SPEC.md` instead — different object, different anchor, different filename. The two compose and neither re-litigates the other.

## Standing rules

These apply to every audit in both lanes. They live here once so a kickoff can point at them.

### S1 — Sourcing, not ignorance

**Verify every asserted value against the primary artifact. Never audit from a narrative.** Recompute stated numbers from the data they claim to summarise; resolve stated mechanisms from the source that implements them; diff stated equivalences yourself. A change note is a set of claims to check, never evidence.

This replaces v1's "read nothing beyond the brief, the branch, and `main`." That rule aimed at the right thing and specified the wrong invariant. It is honour-system in a chat surface and actively contradicted in Claude Code, where the `CLAUDE.md` hierarchy and accumulated auto memory load before the operator types anything. More to the point, ignorance is not what generates findings: every finding in the #85 audit came from recomputation against a primary artifact, not from anything the auditor didn't know. The course spec has carried the correct formulation since v1.0 — *"Work only from the frozen sources. Never audit from memory."*

Context separation between seats still matters and is still doctrine. It is now enforced by **launch configuration and disclosure** rather than by asking a model to un-know things:

- Launch auditor sessions with auto memory disabled (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) so an auditor cannot inherit a builder's accumulated notes from a previous session in the same repo.
- Keep any project `CLAUDE.md` free of pass-specific state — conventions only.
- Run `/memory` before starting and report what was loaded.

### S2 — Context provenance header

Every report opens with what the auditor actually had. Unenforceable rules become checkable facts — the same move this system already makes with tree-pinning, version stamps, and run provenance.

```
Model / seat:      {{MODEL}}, auditor
Surface:           {{chat | Claude Code | …}}
Auto-loaded:       {{/memory output, CLAUDE.md files, injected context — or "none"}}
Read this audit:   {{the actual list}}
Not executable:    {{checks blocked by tooling, and why}}
```

An audit that overstates its own independence is worse than one that discloses a qualified independence, because the first is unfalsifiable.

### S3 — Tree-pinning

State the exact tree audited: commit SHA, merge-base, and evidence ref. A branch name is not a pin — branches move, and housekeeping lands concurrently. Where the audit compares against a baseline, read the baseline **at the pinned tree**, not at current `main`; baselines get pruned. (Earned: the #85 audit would otherwise have compared post-housekeeping CSS against a baseline file that had been deleted from `main` three hours earlier.)

### S4 — Tool paths

Use the authenticated GitHub MCP tools for API reads. Use `raw.githubusercontent.com` for file bodies and large artifacts. **Never the unauthenticated `api.github.com`** — it rate-limits fast and has crashed sessions. (Earned the hard way in the #85 audit, which took a 403 mid-run.)

### S5 — Verdict grammar

Per checklist item: **PASS**, **FAIL**, or **BLOCKED** (a check that available tooling cannot execute — reported, never skipped and never assumed).

Separately, any observation that does not fail its item is a **finding**, classified as in the course spec: **BLOCKER** (ships wrong), **FRICTION** (real but non-blocking), **NOTE** (observation). An item can be PASS and still carry a BLOCKER-class finding about something the item does not cover — that combination is common and must not be flattened. Forcing binary PASS/FAIL either loses real findings or inflates failures; both corrupt the record.

When an item fails, stop that item and report. Remedies are the orchestrator's call, not the auditor's.

### S6 — META close

End every report with a META section: where the checklist felt incomplete, any finding that fit no item, any check you had to invent, and any gate you found structurally unable to detect what it was gating. Route anything naming a new safeguard to `docs/BUILD-LESSONS.md` and the trace. The course spec has had this loop since v1.0 and it is why that document is good; the pass lane lacked it, so #85's findings reached the app spec only because the orchestrator carried them across by hand.

## Template

```
You are the cold auditor for {{REPO}} PR #{{PR}} (branch `{{BRANCH}}`).
You did not build this and hold no stake in the verdict.

Read `docs/app/seats/auditor.md` §Standing rules first and follow them —
sourcing, provenance header, tree-pinning, tool paths, verdict grammar,
META close.

Run the §Audit checklist in `{{BRIEF_PATH}}` against {{TREE}}. Verify every
asserted value from the primary artifact; treat the builder's change note
as claims to check, not as evidence.

Extra attention this audit: {{ATTENTION_POINTS}}

Report each checklist item PASS / FAIL / BLOCKED with the method you used,
findings classified BLOCKER / FRICTION / NOTE, then an overall verdict.
Commit your report as `{{AUDIT_REPORT_PATH}}`.
```

## Notes

- `{{ATTENTION_POINTS}}` come from the orchestrator's conformance review — whatever the diff shape or change note makes worth a second look. They supplement the checklist; they never replace it. The #85 kickoff's "verify by specificity survey, not just by screenshot" is the model here: it named an *instrument*, not a conclusion, and it was the one instruction that paid for itself.
- `{{TREE}}` is a SHA for a post-merge audit, a branch head plus its merge-base for a pre-merge one. If the orchestrator leaves it blank, the auditor pins it and says so.
- Pre-merge is the design; post-merge is a supported degraded mode. A post-merge audit still reports FAIL on a gate that was crossed — a merged change is not a ratified one.
- Where a check needs an instrument the auditor cannot run (no browser, no capture harness), it is **BLOCKED**, and the report says what would execute it. Blocked checks are the seed list for the instrument fleet.
- The auditor commits its report where the verdict travels with the evidence: the pass branch pre-merge, `main` post-merge.
