# Slide Decomposition Guide

Complete reference for decomposing scripts into the MODULE data structure.

## Slide Type Taxonomy

### `title`
**Purpose:** Module branding and opening frame.  
**Visual:** Large serif heading, module label, subtitle, brand watermark.  
**Data fields:**
```json
{
  "type": "title",
  "moduleLabel": "Module 1",
  "heading": "What Is This Thing,\nAnyway?",
  "subtitle": "Part One — Know Thy Machine",
  "brand": "SOPs Nobody Reads"
}
```
**Usage:** First slide only. One per module. The heading supports `\n` for line breaks — use them to control where long titles wrap for visual balance.

### `scene`
**Purpose:** Narrative moments. Character beats. Emotional content.  
**Visual:** Italic display font, centered. Scene label above.  
**Data fields:**
```json
{
  "type": "scene",
  "label": "Scene",
  "text": "Joe has been working with Claude for twenty minutes. Good progress. Then a thought occurs to him."
}
```
**Usage:** Cold opens, callbacks to earlier scenes, character resolution moments. The `label` field can be customized ("Scene", "Back to Joe", "Back to Joe — A Few Days Later"). Supports `<em>` tags for emphasis within text — use for words or phrases that shift emotional register.

**When to use scene vs keypoint:** If the content is happening TO a character (Joe discovers, Joe feels, Joe realizes), it's a scene. If the content is being explained TO the learner ("This is called...", "The reason is..."), it's a keypoint.

### `keypoint`
**Purpose:** Major concepts that need to land. Core teaching content.  
**Visual:** Large bold heading, supporting body text below, optional kicker label above.  
**Data fields:**
```json
{
  "type": "keypoint",
  "kicker": "The Fluency Trap",
  "heading": "Language means\nanother human mind.",
  "body": "We are deeply wired for language. For hundreds of thousands of years, language meant a mind with experiences, memories, feelings. A persistent identity that would remember you tomorrow."
}
```
**Usage:** The workhorse slide type. Most teaching content lives here. The `kicker` is optional (can be empty string) — use it to label concepts with a memorable name. Heading should be the distilled thesis — what the learner takes away. Body text should be under 50 words — it supports, it doesn't replace the heading.

**Heading line breaks:** Use `\n` to control visual rhythm. Short lines create dramatic pacing ("It sounds the same\nwhether it's right\nor wrong."). Don't break mid-phrase.

### `reveal`
**Purpose:** Reframing statements. Dramatic turns. Thesis delivery.  
**Visual:** Similar to keypoint but with gold kicker and italic body. Slightly different background gradient. Signals "this changes what you thought."  
**Data fields:**
```json
{
  "type": "reveal",
  "kicker": "The Correct Answer",
  "heading": "The alien intelligence\nisn't coming.\nIt's already here.",
  "body": "You're using it to write emails."
}
```
**Usage:** When the script dismantles an assumption, delivers a thesis, or reframes everything that came before. The emotional weight is higher than a keypoint. Use when the narrator says something like "Here's the twist" or "Here's the part that stings" or "Turns out..."

**Reveal vs keypoint distinction:** A keypoint teaches. A reveal transforms. If the slide could start with "Actually..." or "But here's what's really happening...", it's a reveal.

### `concept`
**Purpose:** Technical definitions. Named frameworks. Formal terms.  
**Visual:** Boxed definition with border, supporting body text below.  
**Data fields:**
```json
{
  "type": "concept",
  "label": "The Context Window",
  "boxText": "Every time you start a conversation with an AI, you're starting from zero.",
  "body": "The system can only \"see\" what's in the current conversation. Imagine someone with perfect language abilities but absolutely no memory beyond this conversation."
}
```
**Usage:** When the script introduces a specific term or framework that the learner needs to remember by name. The boxed treatment signals "this is a definition — anchor this." The label names the concept. The boxText is the definition. The body provides context or analogy.

**When to use concept vs keypoint:** If the idea has a NAME the learner should remember ("context window", "tacit knowledge", "the sixty-second check"), use concept. If it's an insight without a formal label, use keypoint.

### `options`
**Purpose:** Presenting alternatives, comparisons, or competing ideas.  
**Visual:** Card grid with letter labels. One card can be highlighted.  
**Data fields:**
```json
{
  "type": "options",
  "heading": "Picture the future of AI. Which comes to mind?",
  "options": [
    { "letter": "A", "title": "Judgment Day", "desc": "The machines wake up. Military drones. Nuclear codes." },
    { "letter": "B", "title": "The Quiet Fading", "desc": "Perfect digital companions. We stop connecting." },
    { "letter": "C", "title": "Alien Intelligence", "desc": "Something fundamentally not like us." }
  ],
  "highlighted": "C"
}
```
**Usage:** Non-interactive presentation of choices. NOT a quiz — the learner doesn't click. This is the narrator presenting alternatives before revealing the answer. The `highlighted` field marks the "correct" or featured option. Use 2–4 options. More than 4 becomes visually crowded.

### `list`
**Purpose:** Numbered practical takeaways.  
**Visual:** Left-aligned numbered list with bold lead-ins.  
**Data fields:**
```json
{
  "type": "list",
  "label": "Practical Takeaways",
  "heading": "What this means for you.",
  "items": [
    { "num": "1.", "text": "<strong>Don't expect memory.</strong> Each conversation starts fresh." },
    { "num": "2.", "text": "<strong>Don't trust confidence.</strong> Fluent text is not accurate text." }
  ]
}
```
**Usage:** Sparingly. Maximum once per module. Lists are for genuinely discrete, actionable items — not for breaking up paragraphs. If the content is "here are four things to do differently starting tomorrow," it's a list. If it's "here are four aspects of one concept," it's probably 2–4 keypoint slides instead.

### `summary`
**Purpose:** Review grid of key concepts before quiz.  
**Visual:** Two-column grid with dash-prefixed items.  
**Data fields:**
```json
{
  "type": "summary",
  "heading": "Module 1 — Key Concepts",
  "items": [
    "AI is alien intelligence — fluent in language, not like us",
    "Pattern completion at massive scale, not \"thinking\"",
    "No memory between conversations"
  ]
}
```
**Usage:** Second-to-last content slide (before quiz begins). One per module. Items should be short phrases, not sentences — these are memory anchors. 6–10 items is the sweet spot. Each item should map to at least one earlier slide.

### `quiz`
**Purpose:** Assessment question.  
**Data fields:**
```json
{
  "question": "When an AI gives a very confident-sounding answer, this means:",
  "options": [
    "The AI is certain the information is correct",
    "The AI has verified the information against reliable sources",
    "Nothing about accuracy — fluent text sounds confident regardless of correctness",
    "The AI has high \"confidence scores\" from its verification system"
  ],
  "correct": 2
}
```
**Usage:** Quiz questions live in the separate `quiz` array, not in `slides`. The player appends them after all content slides. Always 4 options (A/B/C/D). `correct` is 0-indexed.

### `results`
**Purpose:** Score display and call to action.  
**Usage:** Generated automatically by the player. Not defined in the MODULE data.

## MODULE JSON Schema

```json
{
  "title": "string — module title",
  "moduleNumber": "number — 1-6",
  "partLabel": "string — e.g. 'Part One — Know Thy Machine'",
  "passingScore": "number — percentage, typically 75",
  "slides": [
    { "type": "title", ... },
    { "type": "scene", ... },
    ...
  ],
  "quiz": [
    { "question": "...", "options": [...], "correct": 0 },
    ...
  ]
}
```

## Decomposition Example

Script beat:
```
**NARRATOR (V.O.):**
Here's the part that stings a little.

*[VISUAL: A mirror. Joe's reflection looking back at him.]*

**NARRATOR (V.O.):**
The problem isn't the AI.

*[Beat.]*

**NARRATOR (V.O.):**
The AI did exactly what it was designed to do...
You asked for average. You got average.
```

Decomposition:
- "Here's the part that stings" + mirror visual + "The problem isn't the AI" → **reveal** slide (reframing moment)
- "The AI did exactly what it was designed to do... You asked for average" → **keypoint** slide (explaining why)

The beat between the two is the slide transition itself — no need for an extra slide.

## Pacing Visualization

Ideal type sequence for a ~25 slide module:
```
title → scene → scene → concept → keypoint → options → reveal →
keypoint → keypoint → reveal → concept → keypoint → reveal →
keypoint → scene → keypoint → reveal → concept → keypoint →
keypoint → list → scene → reveal → summary
```

Notice: never more than two of the same type in a row. Scenes break up heavy teaching sections. Reveals punctuate conceptual builds.
