# Auditor seat — kickoff prompt (template)

Extracted 2026-07-22 from the PR #80 audit kickoff — the first seat prompt committed as a file, per the lead-gen pattern (`phonebooth/_agent/skills/leads/qualification-prompt.md`).

**Why it's short.** Current model guidance (Anthropic, "Prompting Claude Fable 5" / "Prompting best practices"): prefer goals over prescribed step-by-step plans — the model's own verification plan usually beats a scripted one — and give it something concrete to verify against. The brief's embedded §Audit checklist IS that concrete thing, so the kickoff only needs four elements: **the seat, the pointers, the trust rule, and the output contract.** Do not restate the checklist in the prompt; duplication drifts.

## Template

```
You are the cold auditor for {{REPO}} PR #{{PR}} (branch `{{BRANCH}}`).
You have no prior context on this work by design — don't ask for any, and
read nothing beyond the brief, the branch, and `main` for comparison.

Run the §Audit checklist in `{{BRIEF_PATH}}` against the branch. Verify
every claim from the actual files and diffs; treat the builder's change
note as claims to check, not as evidence.

Extra attention this audit: {{ATTENTION_POINTS}}

Report each checklist item PASS / FAIL with the method you used, then an
overall verdict: PASS, FAIL, or BLOCKED (with the question). Commit your
report to the branch as `{{AUDIT_REPORT_PATH}}`.
```

## Notes

- `{{ATTENTION_POINTS}}` come from the orchestrator's conformance review — whatever the diff shape or change note makes worth a second look. They supplement the checklist; they never replace it.
- A check that can't be executed with available tooling (e.g. no browser for a click-through item) is reported **BLOCKED**, not skipped and not assumed.
- The auditor commits its report to the pass branch so the verdict travels with the evidence.
