# Claude Workflow Prompts

This document contains the prompts for converting SOPs into training modules.

---

## Step 1: Document Analysis

Use this prompt when you receive a new document from a customer.

```
I'm going to share a document that needs to be converted into an interactive training module. Please analyze it and provide:

1. **Document Summary** (2-3 sentences)
   - What is this document about?
   - Who is the intended audience?

2. **Key Topics** (bulleted list)
   - Main subjects covered
   - Estimated time to cover each

3. **Learning Objectives** (3-7 objectives)
   - What should someone know/do after completing training?
   - Write as "After this training, learners will be able to..."

4. **Content Gaps** (if any)
   - Information that seems missing or unclear
   - Questions I should ask the customer

5. **Recommended Structure**
   - Suggested number of modules/sections
   - Estimated total training time
   - Recommended quiz placement

6. **Compliance/Safety Flags** (if applicable)
   - Any regulatory requirements mentioned
   - Critical procedures that need emphasis

---

Document to analyze:

[PASTE DOCUMENT TEXT HERE]
```

---

## Step 2: Module Outline Creation

After analysis is approved, create the detailed outline.

```
Based on the document analysis, create a detailed training module outline.

**Project Details:**
- Module length target: [30/60] minutes
- Format: Interactive SCORM module with quizzes
- Audience: [specific audience from analysis]
- Tone: Professional but accessible

**Create an outline with:**

1. **Module Title** - Clear, benefit-oriented

2. **Introduction Section** (2-3 minutes)
   - Hook/relevance statement
   - Learning objectives (displayed to learner)
   - What's in it for them

3. **Content Sections** (break into 5-7 minute chunks)
   For each section:
   - Section title
   - Key points to cover (3-5 per section)
   - Scenario or example to include
   - Knowledge check question (formative)

4. **Summary Section** (2-3 minutes)
   - Key takeaways recap
   - Action items / next steps
   - Resources or references

5. **Final Assessment** (5-10 questions)
   - Mix of question types
   - Cover all learning objectives
   - Include scenario-based questions

---

Learning objectives from analysis:
[PASTE LEARNING OBJECTIVES]

Key topics to cover:
[PASTE KEY TOPICS]
```

---

## Step 3: Content Generation

Generate the actual training content section by section.

```
Write the content for [SECTION NAME] of the training module.

**Section Details:**
- Section number: [X] of [Y]
- Time allocation: [X] minutes
- Key points to cover:
  [PASTE KEY POINTS FROM OUTLINE]

**Writing Guidelines:**
- Write in second person ("you will learn...")
- Use short paragraphs (2-3 sentences max)
- Include a real-world scenario or example
- Define any jargon or technical terms
- Keep language at 8th-grade reading level
- Be direct and practical, not academic

**Format the output as:**

### [Section Title]

[Opening hook - why this matters]

[Main content - key point 1]

[Main content - key point 2]

[Main content - key point 3]

**Example/Scenario:**
[Practical scenario illustrating the concepts]

**Key Takeaway:**
[One sentence summary of this section]

---

**Knowledge Check Question:**
[Multiple choice question testing this section]
A) [Option]
B) [Option]
C) [Option]
D) [Option]
Correct: [Letter]
Feedback for correct: [Brief positive reinforcement]
Feedback for incorrect: [Redirect to correct understanding]
```

---

## Step 4: Quiz Generation

Generate the final assessment.

```
Create the final assessment for this training module.

**Assessment Requirements:**
- 10 questions total
- Must cover all learning objectives
- Mix of question types:
  - 5-6 multiple choice
  - 2-3 scenario-based
  - 1-2 true/false
- Passing score: 80%

**Learning Objectives to Assess:**
[PASTE LEARNING OBJECTIVES]

**Format each question as:**

**Question [#]:** [Question text]
Learning Objective: [Which objective this tests]
Type: [Multiple Choice / Scenario / True-False]

A) [Option]
B) [Option]
C) [Option]
D) [Option]

Correct Answer: [Letter]
Feedback (Correct): [Why this is right - reinforce learning]
Feedback (Incorrect): [Common misconception addressed, point to correct answer]

---

Also create:
- Assessment introduction text (what to expect, passing score)
- Completion message (congratulations, next steps)
- Certificate text (if applicable)
```

---

## Step 5: Review & Polish

Final review prompt before packaging.

```
Review this training module content for:

1. **Consistency**
   - Terminology used consistently throughout
   - Tone matches throughout
   - Learning objectives align with content and assessment

2. **Clarity**
   - No jargon without definition
   - Instructions are unambiguous
   - Examples are relevant and clear

3. **Engagement**
   - Opening hooks attention
   - Scenarios are realistic
   - Content flows logically

4. **Accuracy**
   - Facts match source document
   - No contradictions
   - Procedures are complete

5. **Completeness**
   - All learning objectives covered
   - All key points from source addressed
   - Assessment covers all objectives

**Flag any issues found and suggest fixes.**

---

Module content to review:
[PASTE FULL MODULE CONTENT]

Original source document summary:
[PASTE SUMMARY FROM STEP 1]
```

---

## Quick Reference: Time Estimates

| Task | Time Estimate |
|------|---------------|
| Document analysis | 15-30 min |
| Outline creation | 30-45 min |
| Content generation (per section) | 20-30 min |
| Quiz generation | 30-45 min |
| Review & polish | 30-45 min |
| SCORM packaging | 30-60 min |
| **Total for 30-min module** | **4-6 hours** |
| **Total for 60-min module** | **6-10 hours** |

---

## Tips for Best Results

1. **Always start with analysis** - Don't skip to content generation
2. **Work section by section** - Don't try to generate entire module at once
3. **Include source quotes** - Reference specific language from customer docs
4. **Ask clarifying questions** - Better to ask than assume
5. **Save prompts and outputs** - Build your library of examples
6. **Iterate on feedback** - Customer revisions improve future prompts