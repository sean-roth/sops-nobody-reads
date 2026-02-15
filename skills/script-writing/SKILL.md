---
name: script-writing
description: "Script writing skill for SOPs Nobody Reads training modules. Use when drafting or revising narrative training scripts. Encodes the SOPs house voice, structural architecture, rhetorical devices, and dual-track writing approach. Works from a training brief (from the sop-analyzer skill) or a creative direction from Sean. Produces scripts in the SOPs format: narration, stage directions, visual notes, and production notes. Sean provides inspiration, domain knowledge, and editorial feedback; Claude generates the prose."
---

# Script Writing

Write narrative training scripts in the SOPs Nobody Reads house voice.

## When to Use This Skill

You have either:
- A training brief (from the `sop-analyzer` skill) that needs to become a narrative script
- Creative direction from Sean (thesis, key concepts, emotional arc) that needs to be drafted
- An existing script that needs revision based on Sean's feedback

This skill produces the script. The `lxd` skill later decomposes it into slides.

## The SOPs House Voice

See `references/voice-guide.md` for the complete specification.

### In Brief

The narrator is warm but never soft. Direct but never condescending. The voice names uncomfortable truths plainly, then immediately gives the reader permission to feel weird about them.

The single most important quality: **it never hedges on the truth to protect feelings, but it also never makes the reader feel stupid for not knowing.** That's a razor-thin line. Every sentence either stays on it or fails.

### What the Voice Is
- A wise friend sharing something they've figured out
- A great teacher who respects your intelligence
- An essayist who happens to know about business operations
- David Attenborough narrating office life (curious, specific, never mocking)

### What the Voice Is Not
- A professor lecturing (too distant)
- A coach motivating (too peppy)
- A consultant selling (too polished)
- A comedian riffing (too detached)
- A corporate trainer reading slides (the thing we're replacing)

## Script Structure

Every module follows a three-act architecture:

### Act 1: The Problem (Cold Open → Question)

**Cold open:** A scene showing someone (usually Joe) doing the reasonable-but-wrong thing. Never a strawman — the mistake must be one the audience has made or will make. The audience should wince with recognition, not laugh at incompetence.

**The question:** The cold open raises a question that the module will answer. Sometimes explicit ("What is this thing?"), sometimes implicit (the audience feels the question without it being stated).

**Duration:** ~15–20% of the module.

### Act 2: The Exploration (Reframing → Deep Teaching)

**Reframing:** Dismantle what the audience thought they knew. Present the obvious explanation, then show why it's incomplete. This is where reveals live.

**Deep teaching:** Explore the real answer with increasing depth. Layer concepts one at a time. Use analogies, callbacks, and permission beats to manage cognitive load.

**Duration:** ~60–70% of the module.

### Act 3: The Resolution (Practical Application → Return)

**Practical takeaways:** What does this mean for the learner's actual work? Concrete, actionable, brief.

**Return to opening:** The cold open scene returns, but now the character (and the audience) understands what went wrong and how to do it differently.

**Duration:** ~15–20% of the module.

## Script Format

See `references/script-template.md` for the complete template.

```markdown
# Module [N]: [Title]

**Duration:** [estimated minutes]
**Part:** [Part One/Two] — [Part Subtitle]

---

## COLD OPEN

*[SCENE: Description of setting and character.]*

**JOE:** *(typing)* [Dialogue]

*[Stage direction describing what happens.]*

**NARRATOR (V.O.):**
[Narration text. This is what will be spoken.]

*[VISUAL: Description of what appears on screen.]*

*[Beat.]*

<!-- Editorial comment from Sean -->

---

## SECTION TITLE

**NARRATOR (V.O.):**
[Narration continues...]
```

### Format Elements

- `**NARRATOR (V.O.):**` — Voiceover narration. The primary content channel.
- `*[SCENE: ...]*` — Scene setting. Describes the visual context.
- `*[VISUAL: ...]*` — Specific visual direction. What appears on screen.
- `*[Beat.]*` — Pause. Emotional or rhetorical space.
- `**JOE:**` — Character dialogue.
- `<!-- ... -->` — Sean's editorial comments. Preserved in drafts, removed in final.
- `---` — Section break.
- `## SECTION TITLE` — Major structural section.

## Rhetorical Devices

See `references/rhetorical-devices.md` for the complete catalog with examples.

The scripts use specific devices repeatedly, each doing specific psychological work:

### The Reframe
Present the obvious explanation, then dismantle it.
> "You've probably heard two explanations. Both are wrong."

Psychological function: Creates an information gap the learner wants filled. They were wrong — now they need to know what's right.

### The Callback
Return to an earlier image, scene, or phrase with new understanding.
> Cold open: Joe asks about yesterday's conversation. Later: "Something in Joe's brain filed this under 'person I worked with.'"

Psychological function: Rewards attention. Creates the feeling of a story being woven, not a lecture being delivered.

### The Permission Beat
Explicitly name an emotion the reader is probably feeling and validate it.
> "If you're feeling slightly strange, that's appropriate."

Psychological function: Defuses resistance. The learner who feels unsettled is told "yes, that's right, keep going" instead of being left alone with discomfort.

### The Mythology Move
Connect a technical concept to something ancient and human.
> "For thousands of years, humans have told stories about entities that speak our language but don't share our nature. We thought these were fantasies. Turns out they were practice."

Psychological function: Makes the unfamiliar feel familiar. Roots the alien (AI) in the deeply known (mythology).

### The Contrast Pair
Place two things side by side to make the difference vivid.
> Joe writing to Dave (fluid, effortless) vs. Joe prompting AI (stiff, lost). Same person, same brain, wildly different outcomes.

Psychological function: The contrast IS the argument. Seeing both makes the point without needing to state it.

### The Quiet Thesis
State the most important idea simply, without fanfare.
> "Clear thinking precedes clear prompting."

Psychological function: After complex exploration, the simple statement lands with weight. The buildup earns the simplicity.

## Dual-Track Writing

The script serves two channels simultaneously:

**Narration track** (audio): Where emotions live. Where stories are told. Where analogies develop. The narrator can elaborate, digress, be warm and human. This is the primary content channel.

**Visual track** (screen): Where concepts are anchored. Key phrases, definitions, structural frameworks. The screen crystallizes — it doesn't duplicate. If the narrator spends 60 seconds exploring the fluency trap, the screen shows "Language means another human mind" and nothing else.

### Writing for Both Tracks

When drafting, write the narration first. Then go back and identify what the SCREEN should show for each beat. Mark it with `*[VISUAL: ...]*` directions.

Rules:
- Screen text never duplicates narration verbatim
- Screen shows the anchor phrase, narration provides the context
- Visual directions describe what appears, not how it looks (the aesthetic skill handles that)
- One visual per narration beat. Don't stack multiple visuals against one narration section.

## Pacing

### Within Sections
- One concept per section. If a section introduces idea A and explains idea B, split it.
- Sections breathe. There's always a callback, analogy, or permission beat between consecutive heavy concepts.
- `*[Beat.]*` markers are not decorative — they indicate genuine pauses where the learner needs a moment.

### Across the Module
- The emotional register should oscillate: heavy → light → heavy → light. Never three heavy sections in a row without relief.
- The middle third of the module is the danger zone for attention. Place your most vivid analogy or your strongest contrast pair here.
- End on action, not on abstraction. The last content section should be practical or show the resolution scene.

## The Thesis Thread

Every module in the SOPs catalog connects back to the core argument:

**The real problem isn't the technology. It's the gap between what you think you're communicating and what you're actually communicating. AI just made that gap visible.**

For the AI onboarding course specifically:
- Module 1: The gap is "you thought this was a person"
- Module 2: The gap is "you thought it sees what you see"
- Module 3: The gap is "you thought thinking and typing were the same"
- Module 4: The gap is "you thought saying what you mean was easy"
- Module 5: The gap is "you thought you could wing it every time"
- Module 6: The gap is "you thought the rules were obvious"

New scripts for client SOPs will have their own thesis threads, but the meta-pattern holds: the training makes invisible gaps visible.

## Production Notes Section

Every script ends with detailed production notes. These are instructions for whoever produces the module (often another Claude instance reading the LXD skill). They cover:

- Cold open timing and tone
- Key visual moments and how they should land
- Emotional calibration (where the tone shifts, what register each section needs)
- Pacing targets per section (approximate minutes)
- Music/sound direction (emotional quality, not specific tracks)
- Visual continuity notes (callbacks to other modules, recurring motifs)

Production notes are Sean's creative direction preserved in the script file. They don't appear in the final module but inform every downstream decision.

## References

- `references/voice-guide.md` — Complete voice specification with examples and anti-patterns
- `references/rhetorical-devices.md` — Full device catalog with annotated examples from existing scripts
- `references/script-template.md` — Blank script template with all format elements
- `references/annotated-examples.md` — Excerpts from Modules 1 and 3 with annotations explaining structural and voice choices
