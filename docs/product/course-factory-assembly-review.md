# Assembly & Joint Review — "the black box"

*Thread doc. The problem: a course is invisible until assembled, and image and text are meaningless apart — so both a human and the AI need to see them **together**, **earlier**. The catch is cost: ~10 images per module makes AI review of the assembled thing a real token problem. This is the aspect I have the most front-line signal on, because we lived every failure mode below.*

---

## The problem, stated precisely

Two things we learned the hard way on the mold course:

1. **The course was a black box until GitHub.** Reading the script didn't land. Looking at loose images didn't land. Only assembly — image + on-screen text + pacing, in sequence — told us what we actually had. Everything before that was schematic.

2. **Image and text are incomplete without each other**, and the failures live *in the pairing*, not in either half:
   - The **script read hollow on the page** — because it was written dual-track, deliberately leaving gaps the images fill. Text-only review couldn't judge it.
   - The **image priors only showed once rendered** — the "faucet" that wasn't a faucet, the crossbones, the spider-web. A prompt reads fine; the image betrays it. This is your "silent fail at prompt creation."
   - The **anchor/narration redundancy** (slide 7 saying the same thing twice) was invisible until image + anchor + caption sat together on one slide.
   - **Grade drift** across cutaways only shows when the whole set is seen at once — one warm insert in a cold sequence is invisible per-image, obvious in sequence.

So review has to be **joint** (image+text together) and **sequential** (the set seen as a set). That's the requirement. The cost is the problem.

## When the frontier layer still needs to see the image (proven on the mold set)

Passing a full module's shadow text to the frontier reviewer works — on a real 9-frame set, text cleared ~8 of 9; only one needed the eye. But the shadow text is **faithful yet lossy in exactly one dimension: feeling.** It reports *what is there*, never *whether it lands* — because the describer is intent-blind by design. So the frontier layer requests the actual image on three triggers, and clears everything else from text:

1. **The describer flags an anomaly** (e.g. s06's warm/cool grade split) — the escalation path.
2. **The slide is load-bearing for feeling, not just fact** — signature shots, reveals, the ending (NS-2, s06, s09, the NS-3 payoff). Looked at regardless of what the text says, because the text can't grade tone.
3. **The text is thin or the stakes are high** — hero frames, client-approval slides, anywhere a miss is expensive.

Everything else — type cards, establishing wides, clean inserts — clears from shadow text alone. That's most of a course, which is where the vision-token collapse comes from.

**Worked example (s06):** shadow text said "dark growth, green-tinted, warm one side / cool the other" — correct, complete, and useless for the actual judgment. The thing that made s06 the best frame (the blade of light, dread of growth-in-the-dark) is not in the text and *cannot* be. Text told us *what*; only the eye could tell us *whether it lands*.

**The non-negotiable caution:** the describer's silence is not safety. If a frame quietly rendered a readable face and the describer missed it, the text would look clean and a broken slide would pass. So text-only is safe for *catching flagged problems*; for load-bearing slides the eye stays mandatory, precisely because that's where a silent miss is most costly. The ladder saves looks — it does not remove the looks that matter.

## The reframe: "render earlier" and "review jointly" are the same solution

These feel like two asks. They're one. **The rendered slide — image composited with its on-screen text — is the correct unit of review.** It's what the learner sees, it carries both halves by construction, and it's exactly what "render earlier" produces.

We've already prototyped the hard part: the player renders from `module-0N.json` + `img/` at any time, and it tolerates missing images (labeled placeholders). So assembly isn't a final step — it's a **live artifact available from the moment the JSON exists.** The app should treat "assemble" as a continuous background action, not stage 6. The review AI then consumes *screenshots of the rendered module*, not loose images plus separate text.

Concretely: a headless browser (Playwright/Puppeteer) drives the player and screenshots each slide — or the whole module as one strip. That screenshot pipeline is a small, buildable piece, and it's the bridge from "black box" to "reviewable at every step."

## The token-burn reality — and your assumption, examined

Your instinct is right: **text review is cheaper than image review, and should go first.** Text is a handful of tokens; a vision pass on an image runs ~1–1.5k tokens each depending on resolution and detail. Ten images reviewed individually, every cycle, is 10–15k vision tokens *per pass* on top of the text — and you re-run review many times across a course.

But here's the front-line caveat that matters: **text-first is necessary but not sufficient, and we proved why.** Every failure in the list above is one that a text-only pass *cannot* see. So the design isn't "review text instead of images." It's "**use cheap text to do everything it can, then spend vision surgically on only what text can't judge.**" Text triages; vision adjudicates the residue.

## The cost levers (in the order I'd reach for them)

1. **Text-first triage — free wins first.** Script coherence, dual-track redundancy (anchor vs. narration saying the same thing), pacing on paper, source fidelity — all judgeable in text, zero vision cost. This alone removes a whole class of issues before any image is looked at.

2. **The contact-sheet gestalt pass — the big lever.** Most of the *sequence-level* problems (grade drift, the mythology dead-spot, pacing, redundancy across slides) require seeing the whole set at once — which is exactly what a **single contact sheet** (a 3×4 grid of slide thumbnails) gives you in **one vision call**. One image, ~1–2k tokens, catches the gestalt problems that would otherwise need ten separate looks. This is probably a 5–10× reduction versus naively feeding every image full-res every cycle.

3. **Targeted full-res only on flagged slides.** After the contact sheet flags "slide 6 grade looks warm" or "slide 9 feels empty," spend a full-detail vision pass on *just those slides*. Most slides never get an expensive look.

4. **Cheap multimodal pre-screen at generation time.** The silent-fail catch. Right after a generation, a cheap vision model checks the image against its prompt's intent ("is there an open pipe end / a visible face / standing water?") before it ever reaches the expensive Claude gate. This is where your Board 3 "open source multimodal?" earns its place — not as the quality reviewer, but as a cheap tripwire on the failure mode that doesn't announce itself.

5. **Resolution/detail tiering.** Review downscaled/low-detail by default; go full-res only when checking fine detail (text-in-image artifacts, face detail, mold texture matching NS-2). Vision cost scales with pixels.

## A review flow that falls out of this

```
text pass (cheap)      → catches script/redundancy/source issues
   ↓ (assemble + screenshot)
contact-sheet pass (1 vision call) → catches grade/pacing/sequence issues
   ↓ (only flagged slides)
per-slide full-res pass → adjudicates the residue
   ↓
human gate            → you look at the assembled module, decide
```

Cheap→expensive escalation, with the human at the end looking at the same rendered artifact the AI reviewed. Most cycles never leave the first two rows.

## What's already de-risked

- **The renderer exists.** The player is the early-render tool; it already tolerates partial state. Screenshotting it is the only new piece for AI review.
- **The unit of review is settled.** It's the composited slide / the assembled module — not loose assets. That single decision resolves the "examine both together" requirement.
- **We know the failure taxonomy** from the mold build: prompt-priors (per-image), grade drift (sequence), dual-track redundancy (pairing), dead-spots (pacing). Each maps to a specific pass above, which is how you keep vision spend targeted.

## Open questions for this thread

- **What is the review AI actually optimizing for** — per-image fidelity, sequence-level coherence, or both? (Determines contact-sheet vs. per-slide weighting.)
- **How much stays human?** *(Answered — it's phased.)* In the local prototype the AI review is a **pre-filter that saves you looks**; you're still the gate. In self-service it flips to **gate-like**, because users can't judge a course the way you can — bounded by cost. See `course-factory-roadmap.md`. This is why the tiering below matters more the further you go: in self-service the review's cost *is* your margin.
- **Screenshot granularity** — per-slide images, one long strip, or a grid? (Grid is cheapest for gestalt; per-slide needed for detail. Likely both, at different stages.)
- **Where does the pre-screen model live** *(Answered)* — Tier 1 of the local-model ladder: a free local small model writes a **shadow text** description at generation time, and everything downstream reasons over that text. See `course-factory-local-model-ladder.md`. Proven on Sean's hardware (a 4B correctly read the Maple Court reference image).
- **Token budget per course** — worth measuring on mold: how many vision tokens would a full review actually cost with the contact-sheet approach vs. the naive one? That number decides how aggressive the tiering needs to be.

---

*Bottom line: "render earlier" and "let the AI see image+text together" collapse into one move — assemble continuously, review the rendered slide, and spend vision cheap-to-expensive (text → contact sheet → targeted). The renderer's already built; the missing piece is the screenshot-to-vision bridge. Your "text is easier than images" instinct is the right default — as the triage layer, not a replacement for the joint look we learned we can't skip.*
