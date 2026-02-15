---
name: lxd
description: "Learning Experience Design skill for SOPs Nobody Reads. Use when decomposing a finished script into a slide-based module structure. Takes a narrative training script and produces a MODULE data object (JSON) with typed slides, quiz questions, and pacing decisions. Encodes the SOPs instructional methodology: one idea per screen, emotional pacing through slide type variation, adult learning principles, and assessment design. Does NOT write content — takes existing scripts and makes structural decisions about presentation."
---

# Learning Experience Design (LXD)

Decompose finished scripts into slide-based module structures for the SOPs Nobody Reads HTML player.

## When to Use This Skill

You have a completed script (written using the `script-writing` skill or provided by Sean) and need to produce the MODULE JSON data object that drives the HTML player. This skill handles all structural decisions: what becomes a slide, which slide type to use, how to pace content, where to place quiz questions, and how to manage cognitive load.

## Core Principle

**Give them only the critical information at a pace they'll remember.**

This is the SOPs Nobody Reads instructional philosophy. Every decision flows from it. When in doubt, less per screen. When in doubt, another breathing moment. When in doubt, trust the learner to absorb one idea fully before encountering the next.

## The Decomposition Process

### Step 1: Read the Full Script

Read the entire script before making any structural decisions. You need to understand:
- The emotional arc (where are the heavy moments? where does it breathe?)
- The conceptual density (which sections pack multiple ideas? which develop one idea slowly?)
- The callback structure (which later moments reference earlier ones?)
- The cold open/resolution pairing (how does the opening scene return?)

### Step 2: Identify Natural Breakpoints

Scripts have section headers, scene transitions, and beat markers (`[Beat.]`). These are hints, not slide boundaries. A single script section may become 1–5 slides depending on density.

Breakpoint triggers:
- A new concept is introduced (new slide)
- An emotional register shifts (new slide)
- A visual change is described (new slide)
- A beat/pause is marked (often signals a new slide, sometimes just emphasis within one)
- A scene opens or closes (always a new slide)
- A question is posed to the learner (new slide — let it land)

### Step 3: Assign Slide Types

See `references/slide-decomposition-guide.md` for the complete taxonomy. The core types:

| Type | Purpose | When to Use |
|------|---------|-------------|
| `title` | Module branding, opening frame | First slide only |
| `scene` | Narrative moments, character beats | Cold opens, callbacks, resolutions. Emotional content. |
| `keypoint` | Major concept that needs to land | Core teaching content. The ideas learners must retain. |
| `reveal` | Reframing statement, dramatic turn | When the script dismantles an assumption or delivers a thesis. |
| `concept` | Technical definition with context | Boxed definitions, named frameworks, formal terms. |
| `options` | Multiple choice cards (non-quiz) | Presenting alternatives, comparisons, competing ideas. |
| `list` | Numbered practical takeaways | Actionable items. Use sparingly — max once per module. |
| `summary` | Grid of key concepts | Second-to-last content slide. Review before quiz. |
| `quiz` | Assessment question | After all content. Never mid-content. |
| `results` | Score + CTA | Final slide. |

### Step 4: Apply Pacing Rules

**The Two-in-a-Row Rule:** Never use the same slide type more than twice consecutively. If you have three keypoints in a row, the middle one probably wants to be a reveal or concept instead. Variety in type creates variety in visual rhythm, which sustains attention.

**The Breathing Rule:** After any slide that introduces a heavy concept (existential wobble, uncomfortable truth, paradigm shift), insert a lighter moment — a scene callback, a brief analogy, a permission beat. The script usually provides these; your job is to make sure they get their own slide rather than being crammed onto the heavy slide.

**The Density Rule:** No slide body text should exceed 50 words. If it does, the idea needs to be split across two slides or the text needs to be compressed. Headings should be under 10 words. The screen is not the script — it's the anchor point for what the narration explores.

**The Landing Rule:** Any concept that appears in the quiz must have had its own dedicated slide (keypoint, reveal, or concept type). If it was buried in body text on another slide, it wasn't given enough weight to be fairly assessed.

### Step 5: Build Quiz Questions

See `references/assessment-design.md` for detailed guidelines.

Core rules:
- 4 questions per module (standard), 3 minimum, 6 maximum
- Questions test comprehension and application, not recall of exact wording
- Wrong answers must be plausible — they should represent common misconceptions, not obvious jokes
- At least one scenario question per module ("Sarah needs to..." format)
- Questions follow content order — Q1 maps to early concepts, Q4 to late concepts
- 75% passing score (3 of 4 correct)

### Step 6: Produce the MODULE Object

See `references/slide-decomposition-guide.md` for the complete JSON schema.

The output is a JavaScript object matching the MODULE format used by the HTML player. It contains:
- Module metadata (title, number, part label, passing score)
- Slides array (typed slide objects with content)
- Quiz array (question objects with options and correct index)

## Cognitive Load Guidelines

See `references/adult-learning-principles.md` for the theoretical foundation.

Practical rules for SOPs modules:

- **One idea per screen.** This is absolute. If a slide introduces concept A and then explains concept B, split it.
- **Concrete before abstract.** Scene slides (showing Joe's experience) should precede keypoint slides (explaining why that happened). The learner's brain needs the example before the principle.
- **Name it, then explain it.** When introducing a term ("tacit knowledge," "context window," "fluency trap"), give it its own concept slide with a clean definition, THEN follow with a keypoint exploring implications.
- **Emotional reset after cognitive load.** Heavy teaching sections (3+ keypoints) need a scene callback or a permission beat before continuing. The script usually provides these — protect them as their own slides.
- **End with action.** The last content slides before the summary should be practical takeaways (list type) or a resolution scene. The learner should feel equipped, not just informed.

## Module Length Targets

| Module Duration | Content Slides | Quiz Questions | Total Screens |
|----------------|---------------|----------------|---------------|
| 15–20 min | 16–20 | 3–4 | 20–25 |
| 20–25 min | 20–26 | 4 | 25–31 |
| 25–30 min | 26–32 | 4–6 | 31–39 |

These are guidelines, not limits. Module 1 landed at 24 content slides + 4 quiz + 1 results = 29 total for a ~20 min script. That's the right density.

## Dual-Track Awareness

The script contains both narration (what will be spoken) and visual direction (what appears on screen). When decomposing:

- **Screen text** = the crystallized phrase, not the full narration. Extract the key sentence or heading from each script beat.
- **Body text** = supporting context that appears below the heading. This is shorter than the narration — the narration can elaborate, the screen anchors.
- **Stage directions** = visual descriptions in the script that suggest slide type and layout, not content that appears on screen.
- **Beat markers** = pacing instructions for narration. On screen, they translate to slide transitions (a new slide creates a natural pause).

## References

- `references/slide-decomposition-guide.md` — Complete slide type taxonomy, JSON schema, decomposition examples
- `references/adult-learning-principles.md` — Cognitive load theory, retention research, adult learning principles applied to SOPs methodology
- `references/assessment-design.md` — Quiz question design, distractor quality, scenario question format
