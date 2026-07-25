# The Course-Audit Skill

Specification for the adversarial audit that gates every course.
Version 1.1 — 2026-07-24 (supersedes v1.0, 2026-07-16). Companion to the Durability Standard (§9) and the Build Methodology (§M4).

## Which audit is this?

Two audits exist in this repo. They have different objects, different anchors, and different deliverables. Establish which one you are running before you start; running the wrong one against the wrong anchor produces a confident, useless report.

| | **Course audit** (this document) | **Pass audit** (`docs/app/seats/auditor.md`) |
|---|---|---|
| object | the whole deliverable — what the course *says* and *shows* | one change — what a pass *did* |
| anchor | frozen sources + the standards | the brief's embedded §Audit checklist |
| cadence | before a course faces a buyer; after material change | every PR |
| verdicts | BLOCKER / FRICTION / NOTE + a defensibility verdict | PASS / FAIL / BLOCKED per item + findings |
| deliverable | `courses/<n>/COURSE-AUDIT-YYYY-MM-DD.md` | `courses/<n>/AUDIT-YYYY-MM-DD-pr<N>.md` |

They compose: a course audit assumes the passes that built the course were each audited, and does not re-litigate them. A pass audit assumes the standards are settled, and does not re-derive them.

> **v1.1 rename, pending Sean's ruling.** v1.0 specified `AUDIT-YYYY-MM-DD.md`, which collides with the pass-audit convention in the same directory — a namespace that has already produced one hallucinated-file incident. `COURSE-AUDIT-` disambiguates. Existing pass-audit filenames are unchanged.

## Preamble

This is the executable form of the Durability Standard's acceptance test (§9) and the audit invoked by the Build Methodology's loop (§M4). Where the Standard says a course must survive an adversarial audit and the Methodology says the loop runs `self-check → independent audit → fix → re-audit`, this document is *what the audit actually does*.

Two rules govern its use, and both are non-negotiable:

- **The auditor's job is to find what is wrong, not to confirm it is right.** Approach every course adversarially. A reviewer who sets out to confirm a course is clean will confirm it; a reviewer who sets out to break it finds the breaks. "Zero findings" is a legitimate outcome — but only after looking hard. An auditor who finds nothing has usually not looked far enough.
- **Auditor ≠ fixer.** The auditor is a fresh instance that did not write the course or its fixes, working with no memory of the build. The fixer never self-certifies. (The Methodology's pre-audit self-check runs the *same* passes before handoff — but that is the fixer clearing the surface, not the acceptance test. The acceptance test is always independent.)

Work only from the frozen sources. Never audit from memory, prior knowledge of the regulation, or the open internet — those are the very failure modes the audit exists to catch.

**Precondition — audit live `main`, not a stale premise.** Before auditing, confirm the content is actually on `main` (ancestor check plus reading live `main`, per Methodology §M5). An audit run against a stale or unmerged premise is worse than no audit. **State the exact tree you audited in the report.** A dated branch name is not a pin; a commit SHA is.

## Scope

The audit covers the **entire deliverable** — every file a buyer or a learner could open:

- the scripts, the build JSON, and the players *including their JavaScript* (hardcoded feedback strings are a content layer);
- the shared chrome and any stylesheet that governs what a learner sees;
- the README, decision records, provenance, image manifests, and any prompt files.

Do **not** scope sweeps to `scripts/` + `builds/`. A path-scoped sweep is exactly how a phantom source line survived in a README through three audits. Records *of* the errors — audit documents, session logs, anything under `_quarantine/` — are excluded from findings.

## The Six Passes

### Pass 0 — Source Readiness
Both frozen sources exist; their checksums recompute and match the provenance record; every authority the course cites is frozen — including cross-referenced standards (a term borrowed from another regulation requires *that* regulation frozen too). Any claim citing something unfrozen is a finding, and if a source is missing the audit halts here: the only finding is "freeze first."

### Pass 1 — Source Fidelity, Claim by Claim
Every safety or regulatory claim must grep-match a phrase in a frozen file. Every `source_ref` anchor must verify **verbatim** against the file it names — one exact span per anchor; a paraphrase inside an anchor is a finding, and a paraphrase wearing quotation marks is a worse one. Where a claim rests on two provisions, the anchor must hold two separately-marked spans, never one false continuous quote.

High-yield tells (this course's history — check each explicitly):
- **Count claims** — "recognizes N types," "N roles." (This course's founding errors were "five types" for six sources and "four roles" for three.)
- **Authority phrasing** — "OSHA requires/defines…"; verify the exact count or list behind the attribution.
- **Prohibition language** — a stated ban the source does not contain (the source has no master-key prohibition; that claim must read as program-design principle, not regulation).
- **Trigger language** — the condition attached to an exception (an exception conditioned on *unavailability*, not "emergency").
- **Numbers** — every figure is guilty until grep-proven against the source, or it is removed.

### Pass 2 — Layer Consistency (both directions, and order)
Script ↔ JSON ↔ player must tell the same story. Check all three of:
- **Fabrication** — content in a build or player that is absent from the script.
- **Loss** — content in the script absent from the build. (This project's regressions were losses, and they passed naive parity checks because JSON and player agreed on the lossy version.)
- **Order** — where the source mandates a sequence, a step that is present but mis-ordered is still a violation. Verify the mandated order in *every* layer. (The final blocker was a correct, sourced notification placed one step too late.)

Confirm slide-count parity **and** claim-level completeness across layers, and remember the non-obvious layers: any string a learner can read, including feedback strings in the player's JavaScript.

### Pass 3 — Structural Coherence
Separate from fidelity: content can be perfectly source-accurate and still be broken. Read *across* modules, not just within them. Check for redundancy, competing "most important" claims, sequencing problems, and contradictions between modules (e.g. a lock-removal rule stated absolutely in one module and excepted in another). Check **emphasis versus normative weight**: does the course's formatting emphasis track the source's "shall"? A mandatory requirement rendered as an aside, or an optional practice rendered as a rule, is a structural finding.

### Pass 4 — Scope and Decisions
Are folded-in exceptions taught with **all** their conditions? The most-abused exception is the canonical trap — an exception taught loosely reads as permission to skip the rule; taught with its full conditions and its misuse warned, it reads as expertise. Does every decision record match the shipped state? A record that reads "pending" while the package is represented as complete is a finding. Surface any new decision that belongs to the accountable signer — record it, route it, but do **not** resolve it inside the audit.

**An open decision is a BLOCKER, not a NOTE.** If a change note records a choice as unmade and the artifact embodying that choice has shipped, the course is representing an unratified decision as final. (Earned: PR #85 shipped a scene treatment whose selection the change note recorded as "not yet made.")

### Pass 5 — Citation Feature Integrity
In the player's reviewer mode, every rendered citation chip must verify against a frozen file — a rendered citation that cannot be verified is worse than none, because it invites a buyer to check and find it wrong. Confirm the toggle is fail-safe (renders nothing when the source data is incomplete) and delivery-safe (no browser-storage calls that break inside an LMS frame; a comment naming the constraint is fine).

This pass covers the citation's *content*. Whether the chip renders where it should is Pass 6.

### Pass 6 — Render Conformance *(new in v1.1)*

Content can be perfectly sourced, perfectly consistent, and perfectly structured, and still be unreadable or broken on the screen the learner actually looks at. v1.0 had no pass for this because it predates the Slide-Type Standard v0.2, the chrome consolidation, and the `tools/capture` fleet. In that window the render layer was gated only per-pass, ad hoc, whenever a brief happened to ask.

Pass 6 is a **diff-and-measurement gate**. Per the three gate classes, it does not substitute for the human device check, which remains the canonical quality gate. It catches what instruments catch.

- **R1 — Composite contrast, every text-over-image container.** Per Slide-Type Standard §S5, contrast is verified on the *rendered composite* — the worst-case sampled pixel actually behind the glyphs — never on token pairs in isolation. Every slide type that can carry `has-image`, at every viewport and mode. Apply the AA threshold derived from the **computed** font size at that specific viewport: a `clamp()`ed paragraph can be large-text at desktop and small-text at phone, with different floors. A treatment that passes at one size and was never measured at the other is a finding.
- **R2 — Matrix completeness.** Sweep axes are spec, not configuration: slide type × light/dark × desktop/phone × Learner/Reviewer. Single-axis sweeps have missed a real defect class twice in this project's history. **Any axis not swept is declared in the report, never silently omitted.** A sweep run in the mode where a feature does not render provides zero coverage of that feature — Learner-mode sweeps say nothing about citation chips.
- **R3 — Cascade survey for state-class rules.** Any chrome rule keyed on a state class (`.has-image`, `.active`, mode classes) has its cascade resolved *from source*, not inferred from a capture. Enumerate every rule declaring the contested property that can match the target; compute specificity; name the winner; check for `!important` and for media-query overrides that change the answer at some width. Screenshots and geometry checks cannot see stacking order, inherited declarations, or which of several rules actually won.
- **R4 — Overflow and clipping.** Every waypoint, at nominal *and* browser-chrome-adjusted viewports. Distinguish clipped-but-scrollable from clipped-and-unscrollable. State what the metric can and cannot attest: a container-box measurement is blind to content-height changes that never overflow, so an unchanged result is not evidence that nothing moved.
- **R5 — Instrument provenance.** Every measurement artifact carries the tree it was produced from, the tool version, the axes swept, and a timestamp. Without provenance, a stale copy and a clean re-run are indistinguishable, and a byte-identical result proves far less than it appears to.
- **R6 — Shared-chrome reach.** Where chrome is shared across modules, every change reaches every module for free — and so does every regression. Verify the reach rather than assuming it, and capture the modules a change *reaches*, not only the module it *targeted*.

## The Two Guards

These run alongside the passes. They exist because their absence let real defects through, one round at a time.

### Guard G1 — Regression
Diff the content that *prior* audits verified as present against the current layers. Report anything previously verified that is now missing. A fix can silently delete or displace correct content; two of this project's blockers were fixes going wrong on the same step.

### Guard G2 — Completeness at Claim Level
Confirm every taught claim — cited **or uncited** — survives into each build. Completeness checked at section-header granularity self-reports clean while individual claims are dropped below it. Go to claim level. (An uncited claim — "the roles aren't castes" — was dropped from a build and passed every section-level and parity check until claim-level completeness caught it.)

## Named Tells

Recurring signatures. Each earned its name in a real finding.

- **Memory-blend error** — the founding failure class: a true-sounding claim given false authority ("recognizes five types," "four roles," "master keys are prohibited"). The idea may be reasonable; the *attribution to the source* is invented. This is the tell most worth internalizing — nearly every blocker was one.
- **Reframe-is-a-finding** — if you catch yourself mentally rewording a claim to make it defensible, stop: that rewording is a finding, not a fix.
- **Mis-attribution** — a claim can describe a real thing while filing it under the wrong standard ("qualified person" described accurately but attributed to lockout instead of the electrical standards).
- **Partial-check miss** — verifying one claim in a section does not clear the section. The four-roles error hid beside a sibling claim that had "checked out."
- **Build-guilty-until-proven** — never assume a build matches its script; verify it.
- **Numbers guilty until grep-proven** — every figure is verified against the source or removed.
- **Shared-typo proof** — an identical typo across two independently-fetched renderings is positive evidence they carry the same underlying text.
- **Emphasis drift** — formatting weight that does not track the source's "shall" (a mandatory step buried, an optional one elevated).

Render tells *(new in v1.1; all four earned in the PR #85 audit)*:

- **Geometry-blind-to-stacking** — a rect-identity check says nothing about z-index, paint order, or any non-geometric declaration. `getBoundingClientRect()` reported two chips as pixel-identical while one sat two stacking levels lower than the other.
- **Insensitive gate** — a metric that *cannot move* in response to the change under test is not evidence about that change. An overflow audit reporting container boxes was structurally unable to register a padding change that never caused overflow.
- **Identical-is-not-verified** — a byte-identical measurement artifact is equally consistent with a clean re-run and with no run at all. Without provenance you cannot tell which you are holding.
- **Swept-mode myopia** — a full-deck sweep run in the mode where the changed feature does not render provides zero coverage of it, however many waypoints it contains.

## Deliverable

Write a dated finding list — `courses/<n>/COURSE-AUDIT-YYYY-MM-DD.md`. Open with the tree you audited and a context-provenance header (see `docs/app/seats/auditor.md` §Standing rules). For each finding:

- a classification: **BLOCKER** (ships wrong; must fix before a prospect sees it), **FRICTION** (real but non-blocking), or **NOTE** (observation, no action required);
- the exact file and locator;
- the frozen-source paragraph, or the standard's clause, it fails against.

End with a plain verdict: **is this course defensible in front of a compliance-literate buyer — yes or no** — and, if no, exactly what blocks it. Close with a META section noting where the passes or guards felt incomplete, any finding that fit no pass, and any check you had to invent — that feedback hardens this spec. Route anything in META that names a new safeguard to `docs/BUILD-LESSONS.md` and the trace.

## Relationship to the Other Documents

- **The Durability Standard §9** defines the audit *as an acceptance test* — the constitutional requirement. This spec is its executable form.
- **The Build Methodology §M4** places the audit in the build loop and adds the pre-audit self-check. The fixer runs these passes to clear the surface; the acceptance test runs them independently.
- **The Slide-Type Standard §S5** supplies Pass 6's contrast law. Pass 6 executes it; it does not amend it.
- **`docs/app/seats/auditor.md`** is the sibling lane (pass audits) and holds the standing rules both lanes share: sourcing, tree-pinning, context provenance, tool paths.
- The anchor schema referenced in Pass 1 belongs in the Durability Standard's atom schema; per-artifact flagging has not converged it, so it is being absorbed there.

---

*Version 1.1 — 2026-07-24. Adds Pass 6 (render conformance), four render tells, the lane router, the open-decision-is-a-BLOCKER rule in Pass 4, and the deliverable rename. Written from the auditor seat as a proposal; doctrine is Sean's and the orchestrator's ruling.*

*Version 1.0 — 2026-07-16. Hardened from three re-audit rounds on the LOTO build, folding in each round's META feedback: whole-surface scope, claim-level completeness, both-direction and order-aware layer checks, and the JavaScript content layer. Provisional in the sense every living document is — the next build that surprises it revises it.*
