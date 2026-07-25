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
