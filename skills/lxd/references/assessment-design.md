# Assessment Design for SOPs Nobody Reads

Guidelines for writing quiz questions that test comprehension, not recall.

## Core Philosophy

The quiz is a learning event, not a test. Its purpose is to strengthen retention through retrieval practice, not to gatekeep. Design questions that make the learner THINK, not search their memory for exact phrases.

## Question Format

- 4 options per question (A/B/C/D)
- Single correct answer
- `correct` field is 0-indexed in the MODULE data
- Questions are presented after ALL content slides, never mid-content

## Question Types

### Comprehension Questions
Test whether the learner understood the concept, not whether they remember the exact wording.

**Good:** "When an AI gives a very confident-sounding answer, this means:"  
**Bad:** "According to Module 1, what did the narrator say about AI confidence?"

The good version requires understanding the concept. The bad version rewards memorization.

### Application Questions (Scenario)
Present a new situation and ask the learner to apply what they've learned.

**Good:** "Sarah needs AI help writing a project update. Which approach will produce the best result?" [followed by four approaches of varying quality]  
**Bad:** "What is the correct order of the Sixty-Second Check questions?"

At least one scenario question per module. These are the highest-value questions because they test transfer — can the learner use the concept in a situation they haven't seen before?

### Misconception Questions
Present a common misunderstanding as an option and test whether the learner can identify the correct principle.

**Good:** "AI is best understood as:" [with "fancy autocomplete" and "thinking machine" as wrong answers]  
This works because both wrong answers are things the learner has probably heard. Choosing the right answer requires understanding WHY those are inadequate.

## Distractor Quality

Wrong answers (distractors) must be plausible. They should represent:

1. **Common misconceptions** — things people actually believe about AI ("The AI verified the information," "Claude only remembers important conversations")
2. **Reasonable-sounding partial truths** — answers that contain a grain of truth but miss the key point
3. **Things the learner might have believed BEFORE taking the module** — the quiz measures transformation

Distracters that are obviously wrong insult the learner and provide no learning value. If a distractor makes someone laugh, it's too obviously wrong.

**Bad distractors:**
- "The AI was having a bad day" — joke answer, no one would believe this
- "Joe needs a better computer" — irrelevant, obviously wrong
- "None of the above" — lazy, tests nothing

**Good distractors:**
- "Claude is programmed to deny previous interactions" — plausible misconception (sounds like a privacy feature)
- "The AI has high confidence scores from its verification system" — sounds technical and legitimate
- "Joe didn't pay for the premium version" — reflects a real assumption people make

## Question Sequencing

Questions should follow the content order of the module:
- Q1 tests early concepts
- Q2 tests mid-module concepts
- Q3 tests later concepts
- Q4 tests application/synthesis (scenario question)

This provides a natural review arc — the learner mentally walks back through the module.

## Passing Score

- Standard: 75% (3 of 4 correct)
- This threshold is intentionally accessible. The goal is reinforcement, not filtering.
- For compliance-critical client modules, the score can be raised to 80% or higher per client requirements.

## Feedback

The player provides immediate feedback:
- Correct: "Correct." (green, minimal — don't over-celebrate)
- Incorrect: "Not quite. The correct answer is highlighted above." (warm rust, non-punitive)

The player does NOT explain why the answer is wrong. The highlighted correct answer and the learner's own review of the content serve this purpose. Over-explaining wrong answers in the quiz flow breaks pacing.

## Anti-Patterns

- **"All of the above"** — lazy question design, tests nothing
- **"Which of the following was NOT mentioned"** — tests recall of what wasn't said, not understanding
- **Double negatives** — "Which is NOT an incorrect description" — confusing, not educational
- **Trick questions** — questions designed to catch the learner rather than test understanding
- **Verbatim recall** — "What term did the narrator use for..." — rewards memorization over comprehension
- **Questions about metadata** — "How many types of AI were described?" — tests attention to incidental detail
