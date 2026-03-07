# Module Production Process

## Overview
Each module goes through five phases: Script → Player Shell → Images → Review → Polish. This document captures the workflow and lessons learned.

## Phase 1: Script Review
- Click through the module player shell (no images) reading slide text
- Flag logic issues, pacing problems, redundant slides
- Key question: "Would a learner ask 'wait, why?' at any point?"
- Example: Module 3 — caught that Joe writing an email to Margaret while also writing a perfect email to Dave made AI look useless. Changed Margaret task to "proposal" to create genuine complexity contrast.

## Phase 2: Image Generation
- **Model:** bytedance/seedream-4.5 on Replicate
- **Aspect ratio:** 16:9
- **Style suffix:** "Warm digital illustration in animated film concept art style. Soft painterly brushstrokes, rounded stylized forms, warm golden brown amber color palette, rich saturated warm tones, cinematic composition."
- **Batch size:** Full module at once (not half-batches). Generate all images, upload all at once, review in context.
- **Download links expire** — download promptly after generation.

### Prompting Philosophy: Conceptual > Literal
- Ask: "What is this slide ABOUT?" not "What is literally happening?"
- A restaurant metaphor slide isn't about a restaurant — it's about the absurdity of vague requests
- A mirror slide isn't about a mirror — it's about self-recognition
- Environment tells the story: the frustration triptych (tidy desk → cracking → chaos) uses desk state, not facial expressions

### Character Consistency
- Same character across scenes: specify "young man with dark tousled hair, stylized animated character with rounded features" for Joe
- When a character appears across multiple slides, lock visual traits in the prompt
- Different characters (Joe, Priya, Marcus) should have distinct environments and visual identities

### Common Regen Triggers
- Hard visual splits (split-screen compositions feel like two images glued together)
- Text/words appearing in images (AI-generated text is always gibberish)
- Characters looking at camera instead of engaging with the scene
- Same composition as an adjacent slide (creates "double beat" feeling)
- Literal interpretation when conceptual was needed

## Phase 3: In-Context Review
- Upload all images to module-XX/img/ directory
- Click through the module as a learner would
- Flag issues in one consolidated list: image regens AND text fixes together
- This is where you catch problems invisible in isolation (e.g., two adjacent slides that look too similar, script logic that only breaks when you experience the flow)

## Phase 4: Refinement
- Regen flagged images with revised conceptual prompts
- Submit text fixes as GitHub issues for Engineer Claude
- Repeat Phase 3 until clean

## Phase 5: Deploy
- Un-grey the module on the landing page (GitHub issue for Engineer Claude)
- Update CLAUDE.md status table
- Hard refresh and test all navigation (MENU button, Next Module button)

## Workflow Tools
- **Image generation:** Replicate API via Claude (Analyst role)
- **Player changes:** GitHub Issues → Claude Code (Engineer role)
- **Script/content decisions:** Sean (Creative Director) + Claude (Analyst)
- **Process:** Issues describe exact changes with OLD/NEW text for precision

## Key Lessons
1. Generate all images at once, not in batches — review in context catches more issues faster
2. Conceptual prompts produce better training imagery than literal scene descriptions
3. Character consistency requires explicit visual trait locking in every prompt
4. The slide text IS the product — images support it, not the other way around
5. Adjacent slides must be visually distinct or they create "double beats"
6. Always ask "would the learner question this?" — if Joe can write emails fine, why does he need AI?
7. Clear thinking precedes clear prompting — applies to us making this course, not just the learners taking it