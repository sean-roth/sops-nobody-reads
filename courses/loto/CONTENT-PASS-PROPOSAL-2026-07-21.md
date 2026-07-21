# LOTO Content Pass — Proposal Phase

**Date:** 2026-07-21
**For:** a Sonnet instance with repo access (GitHub MCP).
**Governing docs:** the **Durability Standard** (§1 atoms, §8 additions ledger) and **course-audit-SPEC** — this is a *content / audit* pass, not a presentation one — plus **Slide-Type Standard v0.2** (§S3/§S4) for the structural items.
**Mode: PROPOSE, do not implement.** Produce a proposal document. Make **no content changes** and commit nothing to the course until Sean has signed off on each item. This mirrors how the eventual app is meant to work: the AI grounds a change in the frozen source and proposes it; the human — who holds the domain knowledge — decides.

---

## The premise (why propose, don't implement)

The AI can guarantee source **fidelity** — mechanical, verifiable. It cannot judge domain **appropriateness** — that needs the expert. So for every fix: ground it in the frozen source, propose it, show what changes and what's preserved, recommend, and hand the decision to Sean. Change nothing until he approves. Where a fix is *not* source-derived (voice, framing, audience), say so plainly — those are his calls, not the source's.

---

## 1. Read first

1. **The frozen source: `courses/loto/sources/`** — the OSHA-based source documents. Every proposed fix is validated against these. This is the authority; the course renders it, never overrides it.
2. `docs/standards/DURABILITY-STANDARD.md` (§1 atom schema, §8 additions ledger) and `docs/standards/course-audit-SPEC.md` — the audit discipline.
3. `docs/standards/SLIDE-TYPE-STANDARD.md` v0.2 — §S3/§S4, for the structural items (B).
4. The builds: `courses/loto/builds/module-0{1,2,3}.json`.

---

## 2. Gate — the structural-consistency check (from BUILD-LESSONS L1)

Run the ordinal-label check across all three modules: labels like *Step N / Part N / Phase N* must form a **unique, gapless sequence** within their group. It has already been run once — it flags exactly one problem (the M2 "Step One" duplicate, item A below) and nothing else. Confirm that, and treat this check as a standing gate for the audit going forward.

---

## 3. Items to propose fixes for

For **each** item: state the issue, quote or cite the relevant frozen source (or say if it's unsourced scaffolding), propose a fix — two options where there's a real fork — show what changes versus what's preserved, recommend, and **flag the decision for Sean.** Change nothing.

**Item A — M2 duplicate "Step One" (L1).** Slides 4 ("Step One — Prepare") and 5 ("Step One — Notify") both read as Step One; the course keeps six steps and folds Notify in as a second beat of step one. Check the source: does it group notification under the first/prepare step? Propose a relabel that keeps six steps and stops reading as a duplicate — e.g., "Step One, cont'd — Notify," just "Notify," or folding Notify into the Prepare slide. Recommend based on what the source supports.

**Item B — misconception slides carrying their own corrections.** Per §S3, the `misconception-held-up` container should hold *only* the belief; the correction belongs in a `reveal` or `teaching-caption`. Find the misconception slides whose body includes the correction (e.g., the "padlock on a breaker" slide, whose body already says "isn't just a procedure — it's a barrier"). Propose moving the correction sentence **verbatim** to the adjacent beat, leaving the held-up container clean. This is source-preserving restructuring — confirm every claim is preserved, nothing reworded or lost, only relocated.

**Item C — fourth-role belief with no held-up slide.** The deck corrects a "fourth-role" belief but never holds it up first, though the container now exists for it. Two real options — propose both and recommend: (1) add a `misconception-held-up` slide stating the belief *before* its correction — this is **new scaffolding**, so validate against the source that it's a genuine misconception the material addresses, and log it under §8; or (2) leave it as is, and name the cost (a correction with nothing visibly being corrected).

**Item D — presumptive audience line.** "You've worked around most of these for years without needing a list" presumes an experienced audience. This is the course's own scaffolding, **not** sourced — so it's a voice / audience decision, Sean's to make. Propose a reword that keeps the point without presuming experience, and flag it explicitly as his call, not a source-derived one.

---

## 4. Deliverable — the proposal (not the fix)

A **proposal document** committed as markdown (so it's a durable, reviewable record — `courses/loto/CONTENT-PASS-PROPOSAL-2026-07-21-RESPONSE.md` or similar), one section per item: the issue, the source grounding, the proposed fix or options, what changes vs. what's preserved, and the recommendation — with each decision clearly framed for Sean to approve or redirect. Optionally also render it as a review artifact for easier reading, but the markdown is the record.

**No content changes. Nothing to the course. Implementation is a separate step, after Sean's decisions.**

---

## 5. Discipline

- Change nothing until Sean approves each item.
- Every fix is validated against the frozen source; a sourced claim's meaning is never altered — fixes relabel, relocate, or reword *scaffolding*, not claims.
- Name which fixes are source-derived and which are Sean's judgment (voice, framing) — don't blur the two.
- Flag anything ambiguous; propose, don't guess. When in doubt, that doubt is a question for Sean.