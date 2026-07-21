# LOTO Content Pass — Proposal Response

**Date:** 2026-07-21
**Mode:** PROPOSAL ONLY. Nothing in `courses/loto/builds/` has been touched. No content, label, or field has changed in any module JSON or player. Everything below is grounded in the frozen source and the current shipped state, then handed to Sean to decide.
**Governing docs:** Durability Standard §1 (atom schema), §8 (additions ledger); course-audit-SPEC; Slide-Type Standard v0.2 §S3/§S4.
**Frozen sources read:** `courses/loto/sources/29-CFR-1910.147.md`, `courses/loto/sources/29-CFR-1910.399-qualified-person.md`, both per their `PROVENANCE.md` entries.

For each item: the issue, what the frozen source actually says, the proposed fix (options where there's a real fork), what changes versus what's preserved, and a recommendation. Source-derived fixes are marked as such; voice/framing calls are marked as Sean's, explicitly.

---

## Gate — the structural-consistency check (BUILD-LESSONS L1)

**Rule:** ordinal labels (`Step N`, `Part N`, `Phase N`) must form a unique, gapless sequence within their group, within each module.

**Re-run independently for this proposal** (not just trusted from the prior run) — a script scanning every slide's `label` and `kicker` field in all three `module-0N.json` files for the `Step|Part|Phase` vocabulary named in L1, checking each group's number sequence for duplicates and gaps:

| Module | Structural ordinal labels found | Result |
|---|---|---|
| 1 | none (`Step`/`Part`/`Phase` not used as a label/kicker anywhere in M1) | — |
| 2 | `Step One`×2, `Step Two`, `Step Three`, `Step Four`, `Step Five`, `Step Six` | **1 duplicate: "Step One" (slides 4 and 5). No gaps — 1–6 otherwise complete.** |
| 3 | none | — |

**Confirmed: exactly one problem, nothing else.** This matches the prior run's result precisely — Item A below, and no other module has an ordinal-label defect. Recommend this check be formalized as a standing structural-consistency pass in `course-audit-SPEC.md` (candidate: fold into Pass 3, Structural Coherence, or a new Pass) — proposing the formalization, not making it; the spec itself is a governing doc and out of scope for a content pass to edit unilaterally.

---

## Item A — M2 duplicate "Step One" (Prepare / Notify)

**The issue.** `module-02.json` slide[4] (`label: "Step One — Prepare"`) and slide[5] (`kicker: "Step One — Notify"`) both read as Step One. The course teaches six steps (Prepare, Shutdown, Isolate, Lock, Stored Energy, Verify); Notify was folded in as a second beat of Step One, but the label reads as an accidental duplicate rather than a deliberate pairing.

**Source grounding.**
- The six-step spine maps directly to **29 CFR 1910.147(d)(1)–(6)**, "Application of control" — a *mandatory* sequence. (d)(1) "Preparation for shutdown" is about the authorized employee's own knowledge (energy type, magnitude, hazards, methods) — it says nothing about notifying others.
- **Notification is a separate general duty, 1910.147(c)(9)**: "Affected employees shall be notified... before the controls are applied, and after they are removed." It is not one of the six (d)-sequence steps in the regulation's own text.
- **Appendix A** (non-mandatory model procedure) sequences its own numbered list with notify *first* — item (1) "Notify all affected employees..." precedes item (2) "identify the type and magnitude of the energy..." (the Prepare content). So where the source gestures at an order at all, its informal model puts notify *before* Prepare, not inside it.
- **The module's own script** (`scripts/module-02-the-six-steps.md`, "STEP ONE: PREPARE FOR SHUTDOWN") settles the authorial intent directly — one heading, two narrated beats: *"Step one is homework. Find the machine-specific lockout procedure..."* followed by *"The other part of preparation: notify. Every person whose work is affected by the lockout needs to know."* **"The other part of preparation" is the script's own words for what slide 5 is** — this is a deliberate two-beat structure for one step, not an accident, and not something Appendix A's ordering should override, since the script is this course's own design decision, not a restatement of Appendix A's sequence.

**Net:** the *content* placement (Notify as part of Step One, second beat) is authorial intent, confirmed at the script level, and doesn't contradict the mandatory (d) sequence (which simply doesn't address notification at all). Appendix A ordering it earlier is real but non-mandatory, and not what this course chose to do. The only actual defect is the **label text**, which reads as a duplicate instead of a continuation.

**Proposed fix — options:**

1. **`"Step One, cont'd — Notify"`** (recommended). Most directly matches the script's own "the other part of preparation" framing — signals to the learner "still step one, second half," which is exactly the intended structure.
2. **`"Notify"`** (no step-number claim). Cleaner, sidesteps the Appendix-A-ordering nuance above entirely by not asserting a position. Slightly under-communicates the deliberate pairing the script establishes.
3. Fold the two slides into one (drop from 24 to 23 slides in M2). Goes beyond a label fix — a bigger structural change than what's asked here, and it would blend a `definition` container (boxed) with a `teaching-caption` container (hero treatment), a presentation-layer decision that belongs in a shape pass, not this content pass. Not recommended for this pass; naming it only because it exists.

**What changes vs. preserved:** only the `label`/`kicker` field text on two slides (a 2–4 word label edit). Zero words in any `heading`, `body`, or `boxText` change. Slide count, order, and every claim are untouched.

**Recommendation:** Option 1. **Flagged for Sean:** which of options 1/2 reads better to you — both are defensible; I'm not confident one is strictly more correct than the other, since both keep six steps and both are source-consistent.

---

## Item B — Misconception slide carrying its own correction

**The issue.** Per Slide-Type Standard v0.2 §S3/§S4, a `misconception-held-up` container should hold *only* the belief being examined; the correction belongs in the adjacent `reveal` or `teaching-caption`. A full scan of all three modules' `misconception-held-up` slides found **exactly one instance of this container across the entire course** — `module-01.json` slide[5] — and its body carries a correction:

> `"Lockout/tagout isn't just a procedure — it's a barrier. And when people picture the hazard, they usually picture one thing: electricity, the one that gets all the safety posters."`

The first sentence *refutes* the held-up belief ("LOTO is just putting a padlock on a breaker") rather than elaborating it — that's the leak. The second sentence stays inside the belief (still describing the narrow, electrical-only mental picture) and is fine where it is.

**Source grounding.** This is a structural/register fix, not a fidelity fix — no claim's meaning changes. The two adjacent slides in M1:
- **slide[4]** (`reveal`, immediately before): *"He stopped the machine. He didn't secure it. There's a difference. And the difference is everything."*
- **slide[6]** (`definition`, immediately after): the sourced six-energy-sources definition, 29 CFR 1910.147(b).

**Proposed fix.** Relocate the sentence *"Lockout/tagout isn't just a procedure — it's a barrier."* **verbatim** to slide[4]'s body, appended after its existing text:

> New slide[4] body: `"There's a difference. And the difference is everything. Lockout/tagout isn't just a procedure — it's a barrier."`
> New slide[5] body: `"And when people picture the hazard, they usually picture one thing: electricity, the one that gets all the safety posters."`

I chose slide[4] over slide[6] because the sentence is about the *procedure-vs-barrier* framing, the same register-III turn slide[4] is already making (stop ≠ secure); slide[6]'s body is about the *breadth of the source list*, a different point — appending there would read as a non sequitur.

**Flagged micro-detail:** after relocation, slide[5]'s remaining body opens with "And" — a connective that assumed the now-moved sentence came right before it. It still reads fine as a sentence-opener (and matches this course's conversational voice elsewhere), but trimming it would technically be a one-word edit beyond pure relocation. Flagging rather than deciding: leave "And," or trim it?

**What changes vs. preserved:** two `body` fields, one sentence moved between them, zero words invented or cut. Every other field (heading, kicker, image, label) on both slides is untouched. Confirmed by re-reading both slides in full before and after: nothing is lost, nothing is new.

**Recommendation:** make the relocation as specified; your call on the trailing "And."

---

## Item C — The "fourth-role" belief has no held-up slide

**The issue.** `module-03.json` teaches three roles (Authorized, Affected, Other — slides 17–19), then pivots at slide[20] (`reveal`, kicker "A Different Standard") to correct a belief that "qualified person" is a fourth LOTO role — without ever stating that belief on-screen first. The correction lands with nothing visibly being corrected.

**Source grounding for the correction itself (already shipped, not part of this proposal):** confirmed accurate. `29 CFR 1910.147(b)` defines only *authorized employee* and *affected employee*; "other employees" is the residual category from `(c)(7)(i)(C)`'s training clause. `29 CFR 1910.399` (Subpart S, electrical safety) separately defines *qualified person* — trained to work on/near exposed energized electrical parts — an entirely different standard answering a different question. `PROVENANCE.md` confirms 1910.399 was frozen specifically **"to gate Module 3's NEW-1 reframe (LOTO teaches three employee roles, not four...)"** — i.e., this correction was already validated when the source was accepted.

**Is the belief itself real, or a strawman?** This is the load-bearing question for whether new scaffolding is warranted. Two independent pieces of evidence say it's real:
1. **`course-audit-SPEC.md` names "four roles" for three as one of *this project's own founding errors*** — a memory-blend error the course itself once contained ("recognizes five types," "four roles" are the spec's own canonical examples of the failure class the whole audit discipline exists to catch).
2. **The M3 script's own narration** (`scripts/module-03-when-simple-gets-complicated.md`) pre-empts the belief without ever quoting it as a belief: *"That's three roles, not four."* ... *"'Qualified person' isn't a fourth lockout/tagout role."* The script clearly anticipates a learner who'd think "four" — it just never states that thought as its own line before knocking it down.

So this isn't inventing a confusion to justify a container; it's naming, explicitly, a confusion the source-acceptance record and the script both already treat as real.

**Proposed fix — two real options, per the brief:**

**Option 1 (recommended) — add a `misconception-held-up` slide** between slide[19] ("Other Employees") and slide[20] ("A Different Standard"), stating the belief before its correction. This is **new scaffolding** — Durability Standard §8 requires it be validated like a claim (consistent with all in-scope atoms, contradicts none — confirmed above) and logged in an additions ledger.

Illustrative draft only — wording is Sean's to set, not proposed as final copy:

> `kicker: "Where People Miscount"` (or similar Register-II framing label, matching M1's "Where People Start")
> `heading: "Authorized. Affected. Other.\nAnd... qualified person?"` *(a belief, not a claim — deliberately uncertain in tone, matching how the held-up container should read)*
> `body:` optional; could stay a bare heading like M1's misconception, or add one line naming *why* the mix-up happens (electrical work uses the term constantly on the same job sites).

**Related, pre-existing gap worth naming (not part of this proposal's scope):** `AUDIT-2026-07-15.md` already noted the course has **no additions-ledger artifact at all**. If Option 1 is approved, it would be the ledger's first entry — which also means the ledger itself needs to exist. Flagging so the dependency is visible, not fixing it here.

**Option 2 — leave as-is.** Costs: a correction with nothing visibly corrected; a slightly weaker "aha" than M1's misconception→reveal pattern achieves elsewhere. Benefits: zero new content, zero validation burden, no ledger dependency.

**What changes vs. preserved (Option 1):** one new slide inserted; zero existing slides, fields, or claims altered. Every existing sourced claim on slides 17–21 stays exactly as shipped.

**Recommendation:** Option 1, on the strength of the founding-error and script evidence above — but this is explicitly flagged, not decided, since it's new content, not a source-derived fix.

---

## Item D — Presumptive audience line

**The issue.** `module-01.json` slide[6] body: *"You've worked around most of these for years without needing a list. The list matters because the one you're not thinking about is the one that gets you."* The first sentence presumes an experienced audience — a new hire on their first week has "worked around" nothing "for years."

**Source grounding.** None — and none is claimed. This is the course's own pedagogical framing (Durability Standard §8, pure narrative/voice), not a source claim. It is entirely Sean's call: a voice and audience decision, not something the regulation speaks to at all.

**Proposed reword options** (preserving the point — the list matters because familiarity breeds a blind spot — without asserting years of experience):

1. *"These energy sources are all around this kind of work, but the one you're not thinking about is the one that gets you."*
2. *"It's easy to assume you already know these — but the list matters because the one you're not thinking about is the one that gets you."*

Both keep the second sentence verbatim (the actual point); only the first sentence's framing changes.

**What changes vs. preserved:** one sentence's wording, in one slide's body. The regulatory content of the slide (the six-source definition and its citation, in `boxText`) is untouched either way — this sentence is the elaboration line only.

**Recommendation:** no recommendation between 1/2 — this is squarely a voice call, and I'd rather hand you two real options than guess at which reads better in your voice. **Flagged as Sean's decision, not source-derived**, per the brief's own framing.

---

## Summary for sign-off

| Item | Type | Recommendation | Needs |
|---|---|---|---|
| Gate | Mechanical check | Confirmed: 1 issue (Item A), nothing else | Formalize as standing pass? (proposed, not done) |
| A — M2 duplicate "Step One" | Source-groundable label fix | Option 1: `"Step One, cont'd — Notify"` | Sean: pick option 1 or 2 |
| B — Misconception carries correction | Source-preserving restructure | Relocate one sentence, M1 slide[5]→slide[4] | Sean: approve; rule on trailing "And" |
| C — Fourth-role belief, no held-up slide | New scaffolding (validated) | Option 1: add held-up slide | Sean: approve new content + eventual wording; note ledger dependency |
| D — Presumptive audience line | Voice/framing, unsourced | Two reword options offered, no pick made | Sean: choose or supply his own wording |

**No content has changed.** This document is the record of what's proposed; implementation is a separate step, after Sean's decisions below.

**Decision:**

- [ ] Item A — approve option ⟨ ⟩
- [ ] Item B — approve relocation; trailing "And" ⟨ keep / trim ⟩
- [ ] Item C — approve ⟨ Option 1 / Option 2 ⟩
- [ ] Item D — approve wording ⟨ 1 / 2 / other: ______ ⟩

Approved — Sean, __________
