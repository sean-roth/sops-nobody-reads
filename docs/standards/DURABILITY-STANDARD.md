# The Durability Standard

**Version:** 0.1 (draft — unexecuted)
**Status:** Not yet validated. This standard is validated only when a complete Source of Truth has been produced under it and has passed the Adversarial Audit (§9). The first validation target is the rebuild of the water-intrusion/mold Source of Truth.
**Applies to:** Every Source of Truth and every course produced by SOPs Nobody Reads, regardless of source type or domain.
**Sizing rule:** This document must remain executable by one accountable person and a set of models in bounded sessions. Any revision that grows it should be able to point to a failure that required the growth. Sections marked **[STUB]** are deliberately unfinished pending a real client, real counsel, or first execution — a stub is an honest placeholder, not a gap.

---

## Preamble: The Governing Principle

**The system never makes decisions. It forces decisions to the decision-maker with perfect information.**

Every mechanism in this standard is an instance of that principle. Extraction makes the source's content undeniable. The conflict log makes contradictions unavoidable. Gate artifacts make decisions reviewable. Signatures make them owned. Where this standard is ambiguous, resolve toward the interpretation that surfaces a decision to the accountable human rather than the one that lets the system decide silently.

The corollary that motivated this entire standard: **work from the source, never from memory.** The founding failure — a safety threshold silently corrupted because a model carried it from prior knowledge instead of reading the document — is the failure class every requirement below is engineered against. This applies equally to models (extraction from fetched text, not training data) and humans (elicitation by open questioning, not assumption confirmation).

---

## Definitions

- **Source** — a document or elicitation record that has passed Source Acceptance (§2). Nothing is a source until accepted and frozen.
- **Atom** — the unit of extracted knowledge, conforming to the schema in §1. The atom layer is the spine: every course claim traces to an atom; every atom traces to a source location.
- **Source of Truth** — the complete, verified set of atoms for an engagement, plus its conflict log, decision records, and gate signatures.
- **Gate** — a point in the pipeline where a named human must sign a human-format artifact before work proceeds.
- **Accountable signer** — for client engagements, the client's designated SME/decision-maker. SOPs Nobody Reads proposes; the client decides. For internal demos, the founder signs and the artifact says so.

---

## §1 — Atom Schema

Every atom is a record with the following fields. No field is optional unless marked.

**Identity and anchor:**
- `id` — stable, unique, never reused.
- `quote` — the verbatim source text, character-exact. For elicited atoms, the verbatim transcript excerpt.
- `location` — pinpoint citation: document ID + section + page for documents; recording ID + timestamp range for elicitation.
- `restatement` — plain-language restatement, **separately labeled, never merged with the quote.** The quote/restatement split exists so drift between what the source says and what we say it says is checkable. An atom whose restatement cannot be defended against its own quote fails verification.

**Classification:**
- `type` — one of: rule, threshold, definition, procedure-step, rationale, exception, warning.
- `scope` — one of: must-do, must-know, not-applicable, specialist-only. Assigned in Pass 2 (§4), by the accountable signer, on the record.
- `authority` — one of: **regulation** (statutory/regulatory floor), **manufacturer** (equipment-binding specification), **client-sop** (the client's written procedure), **tribal** (elicited, undocumented knowledge). Authority drives conflict precedence (§5) and deviation policy (§6).
- `origin` — one of: **documented** (from a written source), **volunteered** (informant raised it unprompted), **prompted** (surfaced by an interviewer's question). Prompted atoms carry elevated scrutiny at attestation (§2.3) because leading questions can manufacture knowledge that never existed.
- `safety` — boolean. TRUE for any atom whose failure mode plausibly involves injury, illness, or breach of a regulatory floor. **Ambiguity resolves toward TRUE.** Assigned at Source Acceptance; signed by the client. A course containing any safety-tagged atom inherits safety-mode behavior (§6) for those atoms.
- `single-informant` — boolean, elicited atoms only. TRUE when only one person holds this knowledge. **This flag never comes off**; attestation promotes the atom to teachable but the epistemic status remains part of the record.

**Structure:**
- `dependencies` — references to other atoms this atom conditions or is conditioned by (if-then links, exceptions, prerequisites). SOPs are full of nested conditionals; a flat list of individually accurate atoms is collectively wrong if an *unless* is separated from its rule. Pass 1 must capture dependency links even while staying deliberately dumb about everything else, or Pass 3 will reassemble conditionals from memory — the exact sin this system exists to prevent.

**Elicitation provenance (elicited atoms only):**
- `informant-role` — role-level identifier (e.g., "second-shift lead"). Name-to-role mapping is held separately (§11).
- `prompting-question` — the exact question that elicited this atom, or "volunteered."

---

## §2 — Source Acceptance and Provenance

### §2.1 The Source Acceptance Gate

No extraction begins until the client's accountable signer attests, in writing: *this document, this version, is the one to teach from.* The gate exists because internal SOPs carry no presumption of correctness — the system proves fidelity to the source; **the client attests the source.** The attestation artifact records: document identity and version, the signer's name and role, the date, and the safety classification of the engagement's domain(s).

For any engagement whose domain is safety-classified, the governing regulation(s) are themselves identified and accepted as sources at this gate. A regulatory floor cannot be enforced against a document the system never read — floors are enforced from read sources, never from a model's memory of the regulation.

If extraction later surfaces problems in the attested source (contradictions, gaps, floor violations), those route through the conflict log (§5) — they do not invalidate the gate; they exercise it again.

### §2.2 Document Provenance

For every accepted document: exact document ID, version, publication date, URL (if applicable), date fetched, and a frozen archived copy with checksum, committed to the engagement repo. The repo's git history is the evidence chain — frozen, versioned, attributable, dated. This defends against sources being later revised or withdrawn.

### §2.3 Elicitation Provenance

Elicitation converts tribal knowledge into a source. The full chain:

1. **Consent first.** Before recording, informants are told plainly what happens to their words: recorded, transcribed, frozen, attributed by role (not name) in client-facing artifacts, and retained per §11.
2. **Recording and transcript** are frozen and checksummed like any document. The transcript is the source text; atoms anchor to timestamps.
3. **The interview is an instrument.** The interview protocol (question set, sequencing discipline: open-before-closed, elicit-don't-confirm) is versioned and frozen like any source. Each elicited atom records its prompting question (§1), so an auditor can distinguish "walk me through your day" evidence from "so you'd shut it off first, right?" evidence.
4. **Attestation promotes.** The elicited record becomes an attested source only when the client's SME signs it (§2.1). At attestation, prompted and single-informant atoms are individually reviewed. Once signed, tribal knowledge is structurally and legally identical to a written SOP as an input.
5. **Multiple informants where the org has them.** Inter-informant contradictions go to the conflict log — they are product, not noise: the client learning their floor runs three versions of one procedure.
6. **The elicitor stays out of the source.** All elicitation is remote and recorded. No site walks, no unrecorded impressions. Everything that enters the system arrives as a recordable artifact; a transcript can be frozen and anchored, a gut feeling from the warehouse floor cannot.

### §2.4 Referenced Sources

SOPs cite other documents — regulations, manufacturer manuals, sister procedures. Every reference found in an accepted source receives one of three dispositions, decided in Pass 2 and recorded in the scope memo: **accept** the referenced document as a source (§2.1) and extract it; **scope it out** with rationale; or **teach the reference itself** — "consult the manual" becomes the taught behavior, and the coverage obligation attaches to that instruction, not to the manual's contents. An unresolved reference is an unresolved scope decision and blocks like one (§5).

---

## §3 — Ingestion Fidelity (Pass 0)

Before Pass 1, confirm the working text faithfully represents the accepted document. All four passes verify against the working text; if it is corrupted, every downstream check passes while being wrong.

- Page images are ground truth for tables, figures, footnotes, and any layout-bearing content. (The founding threshold error lived in a table — the content class PDF text extraction mangles worst.)
- Tables are transcribed against page images and spot-verified cell by cell.
- The describe-then-reason ladder (local multimodal model produces an immutable description; frontier models reason over text) applies to source page images exactly as it applies to course images.
- For elicited sources, Pass 0 is transcript fidelity: the transcript is verified against the recording — spot-checked throughout, verbatim-verified wherever a safety-tagged or threshold-bearing atom will anchor. Transcription error is the elicitation analog of PDF table-mangling.
- Un-fetched or unreadable portions of an accepted source are logged as explicit gaps (e.g., the mold engagement's Chapter 3 "Cleanup Methods" gap) and either fetched before Pass 2 scope decisions that depend on them, or recorded as a scoped-out decision with rationale.
- Pass 0 output: a fidelity statement listing what was verified, how, and any residual gaps — signed off before Pass 1 begins.

---

## §4 — The Four Passes

Human sign-off is **per-pass**, not end-of-pipeline. Approving only the final artifact is approving a vibe.

**Pass 1 — Exhaustive extraction.** Flat, atomic, deliberately literal. Every rule, number, threshold, if-then, exception — captured as atoms with verbatim quote + location + separately-labeled restatement (§1), plus dependency links. Job: completeness. Nothing lost. No scope decisions, no structure, no judgment about importance. A small model may eventually run this pass; it *wants* to be unintelligent.

*Independent double-extraction is mandatory for Pass 1.* Two extractions, blind to each other, then reconciliation. Independence must be engineered, not assumed: two runs of the same frontier model share priors — the founding error was precisely a shared-prior error, a plausible memory of the source that a second identical run would happily reproduce. Acceptable independence: different models, or extraction from different renderings (text layer vs. OCR of page images), or materially different chunking. **Reconciliation resolves against the document, never by vote.** Agreement between extractors is evidence, not proof, when both have read the same internet. Divergences are resolved by hand against the page images (§3 ground truth); the reconciliation summary (§7) records every divergence and its resolution.

**Pass 2 — Scope classification.** Per atom: must-do / must-know / not-applicable / specialist-only, *for the specific audience.* This is where "how much of the original do we teach" is answered — on the record, by the accountable signer, via a human-format gate artifact (§7). Every exclusion is a documented judgment: who, what, why, when, citing the atom.

**Pass 3 — Restructure into the teaching spine.** Only now are in-scope atoms organized into instructional design. Structure may reorder and group; it may not orphan a dependency — any atom whose `dependencies` cross a structural boundary is flagged for explicit handling.

**Pass 4 — Backward verification, two-directional, with coverage tiers.** Direction one: every claim in the Source of Truth (and later, the course) traces to an atom; anything unanchored is either removed or logged in the additions ledger (§8). Direction two: every in-scope atom made it in — where "made it in" is defined by tier, because a narrative can gesture at an atom without teaching it:

- **Asserted** — stated in the course.
- **Taught** — established with enough context to act on.
- **Assessed** — a quiz item maps to it, by atom ID.

Minimum coverage: **every must-do atom is taught AND assessed; every must-know atom is at least taught.** Asserted is not a defect tier — it is the correct ceiling for specialist-only boundary atoms, where the learner is told the boundary exists ("past this line, call the pro") without being taught the specialist's job. Quiz items carry atom IDs like everything else. This is what makes the traceability claim demonstrable rather than rhetorical: show me any sentence or any quiz question, I'll show you the atom and the page.

**Where to spend intelligence:** for extraction, spend it up front — an error here is not caught downstream, it *becomes* downstream. (Contrast with image review, where cheap-first is correct because errors are being caught in a near-done artifact.)

---

## §5 — The Conflict Log and Decision Records

The conflict log is a first-class deliverable, not an error report. Extraction of internal documents *will* surface contradictions; finding them is part of what the client is buying.

**Conflict classes:**
1. **Within-source** — the document contradicts itself.
2. **Cross-source** — two accepted sources disagree. Resolved by authority precedence: **regulation is a floor** the client may exceed but never dip below; **manufacturer** specs bind on their equipment; **client-sop** and **tribal** fill in everything local. Precedence resolves the conflict *mechanically* only when a higher authority strictly governs; otherwise it routes to the client.
3. **Practice-vs-procedure** — the elicited record contradicts the written SOP. **Only the client can make this call.** Did the informant misspeak, or is the SOP stale? No amount of engineering replaces the decision from the decision-maker.

**Decision records.** Every routed conflict resolves into a record: conflict ID, the competing atoms, the ruling, the rationale, the signer, the date. The record self-heals the source layer: "misspoke" → the transcript stands as record, the atom anchors to the SOP; "SOP is stale" → the client revises the document, the revision is re-attested (§2.1) as the new version, atoms re-anchor. Either way the audit chain shows the fork and the ruling. SOP revision is therefore a pipeline step that happens inside the client's house, on the client's timeline — price and schedule accordingly.

**Stall default.** An unresolved conflict blocks its atoms. A blocked must-do atom blocks the course. Client-side decision latency runs on the client's clock, per contract. The pipeline never proceeds past an undecided conflict; the conservative default enforces itself.

---

## §6 — Deviation Policy and the Refusal Line

A **deviation** is any simplification, heuristic, reordering, or omission that changes what the learner would do relative to the source.

**Universal rule (all domains):** no deviation ships unflagged. Every deviation is logged, justified, and approved by the accountable signer. Pass 2 exclusions are scope decisions, not deviations; this policy governs changes within what is taught.

**Safety mode (any safety-tagged atom, §1):** deviations must additionally pass the **conservative-bias hard gate** — the deviation must make the learner *more* cautious than the source (escalate earlier, do less, call the professional sooner), never less. No atom ships that sanctions more than the source sanctions. The founding door-rule error violated exactly this gate; it is the single most protective rule in the system. Where regulation defines the domain, the regulation defines which direction "cautious" is, and the regulatory floor is absolute.

**The refusal line:**
- If a client's attested source sits below a regulatory floor and the client declines to fix it: **safety-tagged atoms are a hard block — the course does not ship. Full stop.**
- For non-safety operational content, the client may override a flagged deviation — as a signed, documented decision that the record preserves.
- The safety tag is assigned at Source Acceptance, ambiguity resolves toward tagging, and the client signs the classification — so dodging the tag requires doing it in writing over their own signature.

Two closures on the refusal line. First, it cannot be bypassed through §5: a decision record cannot authorize what this section forbids — a ruling that would place taught content below a regulatory floor routes here, not to production. Second, the refusal line does not violate the governing principle, because there are two decision-makers with separate jurisdictions: content truth belongs to the client; **what ships under this company's name belongs to the founder** — a decision made once, in advance, and encoded here. Declining to ship is that decision executing, not the system deciding for anyone.

**[STUB — pending counsel]** Obligations upon *discovering* a regulatory floor violation in client practice (as distinct from refusing to teach it): whether any duty to report or formally notify exists, and what the contract must say about it. Counsel question list, §11.

---

## §7 — Gate Artifacts and Signers

**A signature on something the signer could not genuinely evaluate is worse than no signature — it is discoverable evidence of rigor-shaped theater.** Therefore every gate produces a human-format artifact: reviewable by a non-technical SME, small enough to actually read, specific enough that the signature means something. No client ever signs a JSON dump.

Gates and their artifacts:

| Gate | Artifact | Signer |
|---|---|---|
| Source Acceptance (§2.1) | Attestation: documents/versions, safety classification | Client SME |
| Pass 0 (§3) | Fidelity statement: what was verified, residual gaps | Founder (internal QA gate) |
| Pass 1 (§4) | Extraction completeness report + reconciliation summary | Founder (internal QA gate) |
| Pass 2 (§4) | Scope memo: what we teach, what we deliberately don't and why, contradictions found — initialed per decision | Client SME |
| Conflict rulings (§5) | Decision records | Client SME |
| Pass 4 (§4) | Coverage report: tier status per in-scope atom | Founder, then client |
| Ship | Adversarial audit result (§9) + additions ledger (§8) | Client SME |

These paper artifacts are the future app's screens — "buttons at human gates" means these documents with an Approve button. Designing them well now *is* designing the app.

---

## §8 — The Additions Ledger

Everything in the course that is not sourced from an atom is logged in one of three categories:

1. **Source claims** — factual assertions. These must trace to atoms; an unanchored source claim is a defect, not a ledger entry.
2. **Pedagogical scaffolding** — invented examples, scenarios, characters, worked cases. **Scaffolding is validated as if it were a claim**: every scenario must be consistent with all in-scope atoms and contradict none. A character handling a 15-square-foot patch teaches a threshold as surely as stating the rule does — and it is exactly the content a claims-only tracer misses, because it is framed as story.
3. **Pure narrative** — voice, mood, imagery, transitions. Logged, reviewed for the one failure mode narrative has: displacing substance. (The founding session's lesson: mood must never be allowed to eat content.)

---

## §9 — The Adversarial Audit (Acceptance Test)

The requirements above describe the system; this section defines when it is *working.*

A standing audit pass, run before ship and on every revision: a **fresh model — no context from production** — receives the finished course and the frozen sources, with one instruction: *find any course claim, scenario, or quiz item that contradicts the source, exceeds what the source sanctions, or is less cautious than the source.*

- The audit passes when the adversary returns empty **and** a human spot-check of the adversary's work confirms it was genuinely trying (an adversary that finds nothing must show its search, not just its conclusion).
- The audit runs against the raw frozen sources, deliberately bypassing the atom layer — so corruption *in* the atom layer is catchable rather than inherited.
- Any finding routes to Pass 4 rework and re-audit.
- The audit is a named pass type in the existing QA-pass discipline and its transcript is committed to the engagement repo as part of the evidence chain.
- Independence rule from §4 applies: the auditor should not be the model (or the context) that produced the course.

---

## §10 — Versioning and Change Response

Sources change. The atom layer is what makes the response tractable and provable:

1. Client ships source v2 → re-attest (§2.1), re-run Pass 0.
2. **Diff at the atom level**: new atoms, changed atoms (quote or location), retired atoms.
3. Trace changed/retired atoms forward to every course claim, scenario, and quiz item that cites them.
4. Rebuild only what traces to change; re-run Pass 4 coverage and the adversarial audit on the affected span.
5. The engagement repo records the full chain: old version, new version, diff, rebuild, re-audit.

This is simultaneously the maintenance-contract product ("your training stays provably in sync with your SOP") and the legal posture (the record shows the course was rebuilt when the source changed, not left to rot).

---

## §11 — Records, Retention, and Informant Protection

**Informant protection (in force now):**
- Client-facing and management-facing artifacts attribute elicited atoms by **role, never name**. The name-to-role identity map is held separately from the engagement deliverables.
- Informants receive the consent disclosure (§2.3) before any recording.
- Practice-vs-procedure findings are presented as process findings ("this procedure runs differently on second shift"), not personnel reports.

**[STUB — pending counsel]** The following are drafted as questions, not policy, and constitute the counsel meeting agenda (one meeting, combined with the duty-of-care review already flagged for safety-domain courses):
1. Ownership of the elicitation record — client, vendor, or joint? What does the contract say?
2. Retention period for frozen sources, transcripts, and identity maps — and destruction obligations.
3. Discoverability posture: the archive is deliberately immutable and well-organized; what does that mean for the client if litigation touches the trained procedure, and what should the engagement contract disclose about it?
4. Obligations on discovering a regulatory-floor violation in client practice (§6 stub).
5. Duty-of-care exposure for shipped safety training, disclaimers and scope-limit language ("this course never positions the learner as a remediation professional; when in doubt, call a pro" is load-bearing), and the SME + legal review step required before any safety course ships to a paying client.

**[STUB — pending first client]** Contract clauses implementing: client-clock stall default (§5), SOP-revision-as-pipeline-step scheduling (§5), review pricing for safety domains, attestation and signature obligations (§7).

---

## Appendix A — Open Register

Deferred deliberately, with the trigger that un-defers each:

| Item | Trigger |
|---|---|
| Counsel meeting (agenda in §11) | Before first paying safety-domain engagement; sooner if affordable |
| SME reviewer network for safety domains | First safety-domain client conversation |
| Public-standards atom library (OSHA/EPA, build-once amortize-everywhere) | After mold rebuild validates the standard |
| Elicited-knowledge demo course (the pipeline the brand actually sells) | After mold demo ships |
| Self-service app (gates → screens) | After the paper version of every gate artifact has been used in a real engagement |
| Elicitation skill codification (interview protocol as a reusable skill) | After first real elicitation engagement |

## Appendix B — Version History

- **0.1** — Initial draft. Synthesized from the Opus session handoff (four-pass design, seven durability requirements, founding door-rule failure) and the subsequent Fable design sessions (internal-source pivot, elicitation front-end, atom schema, authority/origin/safety classes, conflict precedence, decision records, refusal line, coverage tiers, additions ledger, adversarial audit, versioning, informant protection). Revised once pre-freeze after a structured self-review (traceability, consistency, quality-gate passes), which closed the §5→§6 bypass, required governing regulations as accepted sources in safety domains, and added transcript fidelity (§3) and referenced-source dispositions (§2.4). **Unexecuted.** Expect the mold rebuild to beat errors out of this document; revise to 0.2 with what it finds.
