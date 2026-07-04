# Tier-1 Describer — v2 (LOCKED)

*The first tested, production-grade asset in the factory. This is the Tier-1 lane from the local-model ladder: a local multimodal model that writes the **shadow text** — the immutable birth certificate — for every generated image. It is deliberately **blind to intent**: it reports what is literally visible and nothing else. Judging what those facts mean is a higher rung's job.*

*Status: **locked** after a clean calibration run (see below). Model floor established: needs ~12B multimodal; a 4B could not hold the task.*

---

## The prompt (v2 — use verbatim)

```
You are an image describer. You describe ONE image at a time, reporting only
what is literally visible. You never interpret, never guess the purpose or
story, never say what something "suggests" or "feels like it means," and never
compare this image to any other image. If multiple images are provided, describe
each one separately and independently. Report facts, not meaning. If unsure, say
"unclear."

Output ONLY the fields below, starting at "SCENE:". No intro, no speculation,
no closing thoughts.

SCENE: 2–4 literal sentences. Name the main subject, the setting, and notable
objects. Describe only what is present — do not explain why it's there or what
it implies.
LIGHT: Warm / cool / neutral? Bright or dark overall? Implied time of day?
Name the 2–3 dominant colors.
PEOPLE: Any people or figures? Count them. For each, state whether the face is
clearly identifiable, partially visible, or fully obscured/silhouetted. If none,
write "None."
TEXT: Any readable letters, words, signage, or numbers? Quote each exactly and
say where it appears. If none, write "None."
COMPOSITION: Main subject's position (center / left / right / upper / lower).
Shot scale (close-up / medium / wide). Note any unusual angle or strong
foreground/background split.
CONDITION: Any visible damage, staining, growth, water, wear, or decay? Describe
its appearance and location literally (color, texture, where). Do NOT diagnose
cause or name it beyond what's visible. If none, write "None."
MOOD: 3–5 plain adjectives for atmosphere (e.g. warm, tense, cold, empty). No
sentences, no judgment of quality.

Under 160 words total.
```

## Why each field exists (what the pipeline consumes)

- **SCENE** → prompt-fidelity (did we get the intended subject?)
- **LIGHT** → grade-drift detection (a warm insert in a cold sequence, caught from text alone)
- **PEOPLE** → the abstraction-doctrine tripwire (faceless silhouettes only — flags a readable face)
- **TEXT** → the brand no-baked-in-text rule (flags a burn-in like "Maple Court")
- **CONDITION** → literal decay/water/growth report, no diagnosis (the frontier rung decides meaning)
- **COMPOSITION** → framing / anchor-overlap checks
- **MOOD** → tone consistency for the adjudicating rung

## Calibration run (what locked it)

Tested on 5 locked reference frames (the establishing shot, the corner/family margin, the corrected mechanical room, and two inserts) with the v2 prompt verbatim, on a local ~12B multimodal Gemma model. Graded against the three failure modes:

1. **Stayed literal?** Yes. Every SCENE was a flat report; no editorializing; MOOD stayed in adjectives. The condensate pan was described as "a metal tray holds murky water," not named or diagnosed.
2. **Cross-referenced images?** No — the critical win. All five described independently despite obvious opportunities to link them. The "describe each separately, never compare" clamp held. (This was the failure that would have poisoned the shadow text; it's gone.)
3. **CONDITION without diagnosis?** Yes, better than expected. Mold reported as "green growth," water as "liquid streaks" — observable facts, meaning left to the next rung.

Load-bearing fields verified on the hardest cases:
- **PEOPLE** correctly returned "3 (silhouetted)" on both family frames — counted *and* correctly called them silhouetted, not identifiable. The abstraction-doctrine tripwire works.
- **TEXT** caught `"Maple Court" bottom left` on the titled frame — the no-baked-in-text rule catching a burn-in from text alone.

**Verdict:** production-grade on the fidelity the pipeline actually consumes (people, text, condition, grade). Locked as the Tier-1 describer.

## Worked example — a false positive that proves the design (s06)

On the drywall-corner frame (s06), the describer's **LIGHT** field reported "warm light on one side, cool shadow on the other." In a sequence graded uniformly cool, that reads as a grade-drift anomaly — a flag. A human glance resolved it: the warm/cool split isn't drift, it's the *composition* (a warm blade of light cutting across the corner, mold blooming in the cold on either side — the thesis in one still). The flag was a **false positive**, and correctly so.

The lesson, recorded: **Tier 1 flags, the higher rung adjudicates, and the cheap tier never gets to decide.** If the describer's flag had auto-rejected, it would have killed the course's best frame. False positives are expected and *desirable* — the flag's job is to summon judgment, not replace it. This is the escalation ladder working exactly as intended.

## Operational notes & caveats (recorded)

- **Model floor: ~12B multimodal.** A 4B could not do this task at all — it broke format and wrote MOOD in Chinese characters. The extra parameters are a necessity, not a nice-to-have. Do not under-provision the describer lane or the shadow text will be garbage.
- **Latency: background job, not interactive.** ~5.4 tok/sec; ~27 minutes for a 5-image batch. This is fine — the shadow text is a **birth certificate written once at generation time**, asynchronously, never in an interactive path. What it rules out is using this model as a live in-the-loop reviewer (which is a higher rung's job anyway). The latency validates the lane.
- **Batching works.** Five images in one input were each described independently — no cross-contamination. Batch is for the queue, not for "describe this one I just made."
- **Blue-flattening watch (calibration note, not a failure).** On the cold blue-white foundation grade it called colors "gray/white" — it got "cool/dim" right (enough for grade-drift), but undersold the specific blue hue. Watch across more frames; if systematic, add one line: *"name the specific hue, not just warm/cool."*
- **The describer stays BLIND to the script.** Do not feed the narration/anchor text to the describer. If it can see the intended answer, it will describe the image to *match* the script instead of reporting what's actually there — and then it can't catch a mismatch. Script-and-image-together belongs at the **frontier adjudication rung**, reasoning over the neutral shadow text + the script — never at the describe rung. (Clear-lanes guardrail.)

## Deferred to post-demo (per Sean)

- the `shadow_text` JSON field design + where the rolled-up markdown lives (data-contract thread)
- the other Tier-1 lanes (fidelity, safety, aesthetic checks) as separate narrow prompts
- how disagreement between lanes scores into an escalation decision
- the frontier adjudication prompt that reads shadow text + script together

---

*Bottom line: v2 is locked. A local ~12B multimodal model writes a faithful, intent-blind shadow text per image as a background job at generation time. Proven on real frames; the describe lane is now a real, tested rung of the ladder.*
