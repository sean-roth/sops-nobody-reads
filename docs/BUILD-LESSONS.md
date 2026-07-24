# Build Lessons

Real errors caught while building the LOTO demo, and what each one teaches the system.

**Why this exists.** Every blatant error we catch by hand is a specification for a check the eventual app should run automatically. It is cheaper and more honest to derive the app's validation layer from errors we have actually hit than to guess at it up front. So each entry records three things: the error, how it got past our checks, and the safeguard the error implies — for the course-audit now, and for the self-service app we have not built yet.

**Format.** One entry per error: *what it was · how it got through · the safeguard it implies.* Keep the safeguard concrete enough to become a real check.

---

## L1 · Duplicate step number, Module 2 · 2026-07-20

**What it was.** Two consecutive Module 2 slides are both labeled "Step One" — slide 4 "Step One — Prepare" and slide 5 "Step One — Notify." The course keeps six steps (Prepare, Shutdown, Isolate, Lock, Stored Energy, Verify) and folds Notify in as a second beat of Step One, but the label reads as a duplicate. Blatant on sight, and live on the demo before anyone caught it.

**How it got through.** Pre-existing content, verified — the M2 shape pass changed zero words (content-frozen diff, 1311/1311 leaf strings), so the label predates all three rebuilds. Every review in the shape-pass arc checked content *preservation* (did a pass alter anything), never content *correctness*. Content was frozen and treated as already-audited. And the content audit that first produced it had no structural-consistency check — so the class "duplicate or non-sequential ordinal label" was never something any gate looked for. The frozen-content boundary held perfectly; the gap is in the content audit's scope, not the presentation work.

**The safeguard it implies.** A structural-consistency validator on the content itself — mechanical, deterministic, cheap to run. The rule this case seeds: *ordinal labels (Step N, Part N, Phase N) must form a unique, gapless sequence within their group.* A second "Step One" fails it in one line of code, no judgment required.

- *Audit, now:* add a structural-consistency pass to the course-audit — label sequences, citation format, orphaned references — the classes a machine can catch, so human and model review spend their attention on the errors that actually need judgment.
- *App, later:* this is first-line validation — automated structural checks that run *before* any model or human review and block blatant inconsistencies at the door. This log is where those checks get specified from real cases. L1 is the first: **label-sequence integrity.**

**What it is not:** a presentation fix. The relabel is a content decision — does Notify stay under Step One with a clearer label, or move — made against the source, through the content pass.

---

## L2 · Housekeeping runbook named the wrong directory · 2026-07-24

**What it was.** `HOUSEKEEPING-2026-07-24.md` step 1 was drafted to remediate `AUDIT-2026-07-24-sitting.md`'s V1/B1/R1 evidence-on-`main` FAILs — three directories, one per FAIL. The drafted `git rm` command listed `screenshots/chrome-consolidation` (132 files, PR #80, cold-audited PASS 2026-07-22, not part of this sitting) instead of `screenshots/demo-cut-menu` (4 files, the actual V1 target). Run as written, it would have left V1 unremediated while deleting an unrelated, 33x-larger directory — and step 4's own verify-by-read would only have caught it after the commit, if read against the audit rather than against the doc's own claim.

**How it got through.** `chrome-consolidation` was a real, named pending-cleanup item — logged in `WORKFLOW-TRACE.md`'s open items on 2026-07-22, predating this sitting and PR #82 (demo-cut-menu) entirely. Drafting the runbook from memory of "what's known to be stale" pulled in the older, more familiar name instead of the newer one the current audit actually named. Nothing checked the runbook's path list against the audit report's own evidence inventory (which states exact file counts per directory) before the runbook was committed.

**The safeguard it implies.** A remediation runbook that names specific paths should be cross-checked — mechanically, by diffing its path list against the source audit's own enumerated evidence paths/counts — before it's pasted into a builder session, not hand-verified by re-reading prose. 4+24+26=54 was checkable in one line against T24's "prune the 54 evidence files."

- *Audit, now:* when a runbook is generated from an audit report, diff its file/path list against the audit's own "as of `<sha>`, main carries N files under X/" accounting before execution.
- *App, later:* remediation steps should be derived programmatically from the audit report's structured findings (a path + count per FAIL), not re-typed by a drafting pass.

---

*Started 2026-07-20. Add an entry whenever a real error is caught, especially one that got past a review — the ones that slip through are the ones worth a check.*