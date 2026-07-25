# CHANGE NOTE — auditor workflow v2 (2026-07-24)

Branch: `auditor-workflow-v2`, off `main`. Docs only — no course content, no
chrome, no tools.

Commissioned by Sean in conversation after the PR #85 cold audit: *"I want to be
able to point any Claude to be able to audit a course."* Written from the
auditor seat, so everything here is a **proposal for Sean's and the
orchestrator's ruling**, not doctrine. Stops at the PR.

Status: plan committed before writing (standing convention). Deviations and
discoveries called out in Results.

---

## Plan

### The finding that shapes the work

The repo has **two audit traditions that don't reference each other**:

| | `docs/standards/course-audit-SPEC.md` | `docs/app/seats/auditor.md` |
|---|---|---|
| dated | v1.0, 2026-07-16 | 2026-07-22 |
| object | the deliverable — what the course *says* | a change — what a pass *did* |
| anchor | frozen sources + the standards | the brief's embedded §Audit checklist |
| verdicts | BLOCKER / FRICTION / NOTE | PASS / FAIL / BLOCKED |
| deliverable | `courses/<n>/AUDIT-YYYY-MM-DD.md` | `courses/<n>/AUDIT-YYYY-MM-DD-pr<N>.md` |

Sean's request reads as "make the course-audit lane pointable," but the course
lane already exists and is mature. The actual gaps are narrower and different
from the ask:

1. **course-audit-SPEC has no render-conformance pass.** It predates the
   Slide-Type Standard v0.2, the chrome consolidation (#80), and every
   instrument in `tools/capture`. Its Pass 5 checks that citation chips verify
   against frozen sources — the *content* of the citation. Nothing in the spec
   would have caught PR #85's actual defect, a chip rendering mid-slide on top
   of body text. **A course can pass all six passes, both guards, and every
   named tell while shipping visually broken.** Render conformance is currently
   tested only per-pass, ad hoc, when a brief happens to ask.
2. **The two lanes collide in one filename namespace.** `AUDIT-YYYY-MM-DD.md`
   and `AUDIT-YYYY-MM-DD-pr<N>.md` both live in `courses/<n>/`. That namespace
   has already produced one hallucinated-file incident (the 2026-07-13 file
   Sean caught).
3. **The seat template's coldness rule is unenforceable and is the wrong
   invariant.** "Read nothing beyond the brief, the branch, and `main`" is
   honour-system in chat and contradicted by the platform in Claude Code, where
   `./CLAUDE.md` and accumulated auto memory load before the operator types
   anything. More importantly: nothing in the #85 audit came from *not knowing*
   things. Every finding came from recomputation against a primary artifact.
   course-audit-SPEC already carries the better formulation — *"Work only from
   the frozen sources. Never audit from memory"* — which is a **sourcing** rule
   and survives an auditor that has read everything.
4. **The seat template lacks three things the #85 audit needed and had to
   improvise:** tree-pinning (hand-written into that kickoff; it is what kept
   the audit from comparing post-housekeeping CSS against a pruned baseline), a
   verdict grade between PASS and FAIL, and a tool-path rule.
5. **Findings reach BUILD-LESSONS and the trace by hand.** course-audit-SPEC has
   a META close that hardens the spec; the pass lane has no equivalent, so #85's
   findings only reached `snr-app/docs/FINDINGS.md` because the orchestrator
   metabolised them manually.

### What gets written

**A. `docs/standards/course-audit-SPEC.md` → v1.1**
- Routing preamble: which audit is this, which anchor, which filename.
- **Pass 6 — Render Conformance**, six checks (R1–R6) derived from Slide-Type
  Standard §S5 and the `tools/capture` fleet, in the spec's existing grammar.
- Four named tells earned in the #85 audit.
- Deliverable renamed `COURSE-AUDIT-YYYY-MM-DD.md` to end the namespace
  collision. **Flagged as a breaking rename** — Sean's call.
- Explicit statement that Pass 6 is a diff/measurement gate and does not
  substitute for the human device check.

**B. `docs/app/seats/auditor.md` → v2**
- Sourcing rule replaces the coldness rule.
- Required **context-provenance header** on every report: model, seat, what
  auto-loaded, what was read, what could not be executed. Disclosure instead of
  unenforceable ignorance — the same move the system already makes with
  tree-pinning, version stamps, and run provenance.
- Tree-pinning promoted from per-kickoff improvisation to standing text.
- Tool-path rule (authenticated MCP for the API; raw for file bodies; never
  unauthenticated `api.github.com`).
- BLOCKER / FRICTION / NOTE adopted from course-audit-SPEC for findings that do
  not fail a check.
- META close routing findings to BUILD-LESSONS and the trace.
- Template stays short and **points at** the standing rules rather than
  restating them — the doc's own warning is that duplication drifts.

**C. `snr-app/docs/FINDINGS.md`** — separate PR, separate repo. Requirement 1's
"enforced context isolation" gets its specific Claude Code enemy named.

### Judgment calls made in the plan

- **Not creating a third router file.** The routing section goes at the top of
  both documents. A separate router is one more thing to keep in sync.
- **Keeping the pass-audit filename, changing the course-audit one.** The
  pass-audit convention is load-bearing in three committed reports and the trace;
  the course-audit filename appears in the spec only.
- **Not editing the Durability Standard or Build Methodology.** Pass 6 is a new
  execution surface, not a new law. If §S5 needs amending, that is a separate
  ruling.
- **Not restating the six existing passes.** v1.0's content is preserved
  verbatim except where noted.

### Not in scope

The seat template's `{{ATTENTION_POINTS}}` mechanism (works as designed). The
orchestrator and builder seat prompts. Anything in `tools/capture` — Pass 6
describes what to measure, not new instruments. The v0.2 Slide-Type Standard
itself.

---

## Results

Both documents written as planned. Three additions beyond the plan, each called
out below; nothing planned was dropped.

### A. `course-audit-SPEC.md` v1.1

Shipped the lane router, Pass 6 (R1–R6), the four render tells, and the
deliverable rename. v1.0's Preamble, Passes 0–5, both Guards, and all eight
original named tells are preserved verbatim.

**Addition 1 (beyond plan) — Pass 4 gains an explicit BLOCKER rule.** While
placing Pass 6 it became clear the #85 P3 failure had no home in v1.0. Pass 4
already covers "does every decision record match the shipped state," but a
change note recording a decision as *unmade* while the artifact embodying it has
shipped is a sharper case than a record reading "pending," and it is the exact
failure the week produced. Added as one sentence with its provenance, rather
than left to be re-derived by the next auditor.

**Addition 2 (beyond plan) — Scope extended.** v1.0's scope list names scripts,
build JSON, players including their JavaScript, and docs. It predates chrome
consolidation, so the shared stylesheet — the single file now governing what a
learner sees across all three modules — was not in scope for a course audit.
Added.

**Addition 3 (beyond plan) — Pass 5 now hands off to Pass 6 explicitly.** One
line, because "citation integrity" reads as covering the chip's rendering and
does not.

**Judgment call inside Pass 6.** R1–R6 are written as *what must be true*, not
as commands to run specific tools. `tools/capture` will change; the conformance
requirement should not have to change with it. The trade is that Pass 6 is not
directly executable by a fresh auditor without reading the tools directory —
accepted, because the alternative is a spec that goes stale on the next tooling
pass, and because "the model's own verification plan usually beats a scripted
one" is the stated rationale for the sibling document's brevity.

### B. `auditor.md` v2

Shipped S1–S6 and the revised template. The lane router is one paragraph rather
than a duplicate of the course spec's table — the table lives in one place.

**Judgment call — the template got two lines longer, not shorter.** v1's stated
design is four elements and no more. v2 adds a pointer to §Standing rules and a
`{{TREE}}` slot. Both were things the #85 kickoff hand-wrote; carrying them in
the template is what makes the seat non-bespoke, which is the commission. The
duplication warning is respected: the rules are pointed at, never restated.

**Documented, not fixed:** the standing rules are only load-bearing if the
kickoff actually points at them. A pasted template whose pointer the operator
strips silently loses S1–S6. The structural fix is the runner launching seats
from committed prompts (snr-app FINDINGS §6 requirement 1), not a doc change.

### C. Not in this PR

`snr-app/docs/FINDINGS.md` is a separate repo and ships as its own PR.

### Self-check

| # | Plan commitment | Result |
|---|---|---|
| 1 | v1.0 content preserved except where noted | **PASS** — Preamble, Passes 0–5, Guards G1/G2, 8 original tells verbatim; the three additions are itemised above |
| 2 | Pass 6 derived from §S5 + the instrument fleet, not invented | **PASS** — R1 restates §S5's composite rule; R2/R4/R5/R6 restate detection classes the tools already implement; R3 is the survey the #85 kickoff asked for |
| 3 | Render tells earned in real findings | **PASS** — all four cite the #85 audit, matching the doc's standing rule that a named tell is earned, not theorised |
| 4 | Coldness rule replaced, not merely softened | **PASS** — S1 is a sourcing rule; enforcement moved to launch config + disclosure |
| 5 | No new law: Durability Standard, Build Methodology, Slide-Type Standard untouched | **PASS** — no files outside `docs/standards/course-audit-SPEC.md` and `docs/app/seats/auditor.md` changed |
| 6 | Breaking rename flagged for Sean, not assumed | **PASS** — flagged inline in the spec and in the PR body; no existing file renamed by this PR |
| 7 | Proposal status, stops at the PR | **PASS** — not merged; both documents state they are proposals pending ruling |

### Open for the reviewers

- **The rename is the only breaking item.** If it is rejected, the router table
  and the Deliverable section both need the old filename; nothing else changes.
- **Pass 6 has no worked example yet.** The first course audit that runs it will
  produce META feedback, which is how v1.0 got good. Worth running it against
  LOTO before treating it as settled.
- **The auditor seat wrote its own seat prompt.** That is a conflict worth
  naming: the seat proposing the rules it will be judged by. The orchestrator
  reviewing this is the check, and it is the reason this stops at the PR.
