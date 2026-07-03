# The Local-Model Ladder — describe-then-reason

*Thread doc. The cost architecture for the whole factory, and — as of a proof-of-concept on Sean's own hardware — no longer speculative. A free local 4B vision model correctly read a reference image (building, dusk grade, One WTC skyline, the "Maple Court" text on the facade) and returned a structured description. That single result closes the "cheap multimodal pre-screen" open question from the assembly-review doc: it works, it's local, it's free.*

---

## The core move: get everything into text

The image problem was never really an image problem — it was a *"we're stuck in the expensive medium"* problem. Vision tokens are costly; text is cheap; the skills already dominate text. So the unlock is:

**A free local model turns every image into text once. From then on, the whole pipeline reasons in text.**

The small model is a **describer, not a judge.** It doesn't decide if the image is good — it converts the image into a faithful natural-language description. Then grade-consistency, prompt-fidelity, pacing, and the abstraction-doctrine check all happen in text, where they're cheap and where the skills live. Once everything is text, *it's just a matter of prompts and skills* — which is the medium we already own.

## The escalation ladder

Four tiers. Each is only touched when the tier below flags or when tiers disagree. Intelligence — and cost — climb only as needed.

```
Tier 1  Local small models (free)   describe · pre-screen · narrow checks
          ↓ flag / disagreement
Tier 2  Frontier model (paid)       reason over the text, adjudicate
          ↓ escalate
Tier 3  Human (Sean)                spot-check the residue and close calls
          ↓
Tier 4  Feedback                    Sean's judgment trains the whole system
```

- **Tier 1 — local, free, narrow.** One model per lane: describe the image; check prompt-fidelity ("does it contain what the prompt asked for?"); safety; aesthetic/grade; abstraction-doctrine ("is there a readable face?"). Runs dozens of times for less than one frontier vision call. Trivially serverless later.
- **Tier 2 — frontier, paid, rare.** Reasons over the *text* the local tier produced. Adjudicates disagreements, judges sequence-level coherence, catches what narrow local models can't. Spends few or zero vision tokens because the description already exists.
- **Tier 3 — human, rarest.** The frontier model escalates only the residue: flags, close calls, genuine ambiguity. Sean moves from reviewing all ten images to spot-checking.
- **Tier 4 — feedback.** Sean's decisions flow back as lessons (Loop B), improving the prompts and skills the lower tiers run on.

**Clear lanes for small models is the load-bearing design principle.** A 4B doing one narrow, well-scoped job is reliable. The same model asked to judge, compare, and remember across a sequence is not. The ladder keeps each small model narrow — describe, don't judge — and narrow is where small models are trustworthy.

## Shadow text — the immutable birth certificate

Every generated image gets a **shadow text**: a natural-language description written **once, at generation time**, by the local describer. It is permanent, immutable data that travels with the asset.

**The rule: regenerate the image → regenerate its shadow. Otherwise it never changes.** The asset and its description are one unit.

Why once-at-birth and not re-derived per review:
- **Cost** — describe once, read forever. No repeated vision spend.
- **Consistency** — a fixed asset re-described each pass would drift (the same image narrated three slightly different ways), and the pipeline would react to model jitter instead of to the image. With a fixed certificate, any disagreement between downstream tiers is a *real signal*, not noise. Determinism where you can get it.
- **Clear lanes** — re-deriving text from a fixed asset is exactly the kind of open-ended task small models are bad at. Writing it once, faithfully, is the kind they're good at.

## Two surfaces, one source

The shadow text is written once and consumed two ways:

1. **In the module JSON** — structured per-slide metadata (a `shadow_text` field, design deferred to the post-demo data-contract thread). The pipeline's text-reasoning tiers read this.
2. **In a human-readable markdown file** — the shadow texts rolled up for Sean's eventual review UI. Natural language, not tags, so reviewing means *reading what the slide is*, not parsing a schema.

Same source, two consumers: the machine reads the JSON, Sean reads the markdown. Every image carries its own text shadow, and everything downstream reads from it instead of re-spending vision.

## Why this is the whole architecture, not a trick

The principle to carve in stone: **use the level of intelligence the task needs, and no more.** Describing and cleaning is 4B work. Judgment and taste is frontier work. Brute-forcing everything through a big model is precisely what makes the self-service economics never close — in Phase 3 every vision token is Sean's cost. A ladder of cheap local models doing the describing and filtering, with the frontier model as the rare adjudicator and Sean as the rarest, is what makes the margin exist at all.

This connects three threads:
- **Assembly & Review** — answers "where does the pre-screen model live": Tier 1, local, writing the shadow text at generation time.
- **Model Routing & Cost** — this ladder *is* the routing map, now grounded in a working proof of concept.
- **The moat** — once everything is text, the differentiation is entirely prompts and skills. The ladder clears the one obstacle that forced paying vision prices to reach them.

## Use it now, on mold

This isn't only future architecture — it changes how Sean and Claude work on the demo today. Right now Claude is the vision layer for every image (the expensive brute-force pattern). The better pattern, startable immediately and for free:

**The local model does the first read on every generation; Claude only gets involved on a flag or a disagreement.** Claude moves from reviewing all ten images to spot-checking the residue. Practicing this on mold *is* the Phase 2 experiment, started early — real learnings, zero cost.

## Deferred to the post-demo thread (per Sean)

This doc is capture, not build. Held for later, after the demo ships and new learnings land:
- the actual `shadow_text` JSON field design (data-contract thread)
- the narrow prompts/skills for each Tier 1 lane (describe, fidelity, safety, aesthetic, abstraction-doctrine)
- which local models fill which lanes; the serverless deployment shape
- how disagreement between Tier 1 lanes is scored into an escalation decision

---

*Bottom line: describe once with a free local model, reason in text forever, and climb the intelligence ladder only when a tier flags. The shadow text is an immutable birth certificate — regenerate the image, regenerate the shadow. Two surfaces (JSON + markdown), one source. Proven on Sean's hardware; the rest is prompts and skills, which we own.*
