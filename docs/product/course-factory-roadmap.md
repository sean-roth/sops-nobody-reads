# Course Factory — Roadmap & Phasing

> **Reconciliation note — 2026-07-06.** Phasing and sequencing are now governed by [`course-factory-architecture-direction.md`](course-factory-architecture-direction.md) (v0.2), and all production work is governed by the [Durability Standard](../standards/DURABILITY-STANDARD.md). Phase mapping: this document's Phase 1 (finish mold by hand) ≈ the direction's **Phase 0**; this document's Phase 2 (local prototype) ≈ **Phase 1**, now redefined as a founder-facing operator console; this document's Phase 3 (alpha self-service) ≈ **Phase 2**. Where numbering or sequencing conflicts, the architecture direction wins.
>
> **Decision record (founder, 2026-07-06):** the first app slice is the **operator console**, not the image-prompt loop recommended below. Rationale, in the founder's words: the image loop was chosen when it was where the most money would leak; the console — and how source material is processed — is the real focus. **Images are an enrichment layer, not the foundation.** The economics sections below (the objective-function flip, text-cheaper-than-generation, cost instrumentation in the prototype phase) remain fully in force and apply to the enrichment layer wherever it runs.

*Sequencing that governs every thread. The aspects (see `course-factory-threads-index.md`) are **what** to build; this is **when**, and — more importantly — **what each phase is optimizing for.** The objective function changes across phases, and that changes the right answer to almost every design question.*

---

## The three phases

### Phase 1 — Finish mold the old way *(now)*
**Purpose:** prove the whole pipeline by hand, end to end. Harden the skills. Collect the raw material for everything downstream.
**Output:** a complete, shipped course — *and* a hand-run process that is literally the app's spec.
**The habit that matters:** log every manual decision as a "button candidate," and every Seedream/prompt lesson in a consistent shape. The work writes the requirements.

### Phase 2 — Local prototype *(you, using it)*
**Purpose:** you run it yourself and learn what actually works vs. what sounded good on a whiteboard.
**Build the highest-leverage slice first** — almost certainly the image-prompt loop (most iteration-heavy, clearest cost lever, carries the silent-fail risk). One working slice beats a half-built pipeline.
**Instrument cost from day one** — measure real tokens/dollars per course so Phase 3 pricing isn't a guess.
**Design security in even though it's local** — the untrusted-user future is easier to build toward than to retrofit.
**AI review role here:** a **pre-filter that saves you looks.** You are still the gate. Review exists to burn down the cheap failures before you spend attention.

### Phase 3 — Alpha users *(self-service)*
**Purpose:** real users self-serve courses.
**AI review role flips to gate-like** — users can't judge a course the way you can, so the review has to carry quality on its own, bounded by cost.
**Security becomes load-bearing** — untrusted uploads, cost-abuse exposure, tenant isolation (see the security thread).
**The product promise:** the best possible image/course options for the user, at the lowest cost to you.

---

## The objective function shifts — and that's the key

| | Phase 2 (local) | Phase 3 (self-service) |
|---|---|---|
| **Optimizing for** | saving *your* time / learning cost | quality-per-dollar at scale |
| **Who's the gate** | you | the AI review, bounded by cost |
| **AI review is a** | pre-filter | gate |
| **Cost matters because** | you're learning the structure | every generation is *your* cost |

## The unit economics (the thing to internalize early)

In self-service, **every generation is your cost, not the user's problem.** So the whole business leans on one lever we already found by hand: **text is cheaper than generation.** Cheap prompt-iteration that raises the *hit-rate per generation* is the profit engine — the better the prompt-first loop, the more good options a user sees per dollar you spend. Everything in the generation-loops thread and the assembly-review thread (contact-sheet triage, text-first review, cheap multimodal pre-screen) is, ultimately, margin.

This is why measuring real cost/course in Phase 2 isn't bookkeeping — it's discovering whether the Phase 3 business closes.

## What this means for the other threads

- **Assembly & Review:** in Phase 2, tier for *your* convenience; in Phase 3, tier because the margin depends on it. The contact-sheet approach matters more the further you go.
- **Model routing:** cheap-models-for-volume isn't just tidy in Phase 3 — it's survival. The Claude-at-the-gate spend has to be justified per course.
- **Pipeline & gates:** the gates you keep human in Phase 2 are the ones the AI has to *earn* in Phase 3.
- **Security:** effectively doesn't exist in Phase 1, is designed-for in Phase 2, is load-bearing in Phase 3.

---

*Don't skip phases. Phase 1 de-risks the pipeline, Phase 2 de-risks the economics and the security model, Phase 3 tests the market. Each phase answers a question the next one depends on.*
