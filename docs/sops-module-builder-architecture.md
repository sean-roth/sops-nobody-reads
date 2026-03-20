# SOPs Module Builder — Pi Agent Architecture

**Project:** Purpose-built Pi coding agent that turns client SOPs into training people actually want.
**Timeline:** 7 days (including evals)
**Case study title:** "How I Built a Purpose-Built AI Agent for Training Module Production"

---

## The Problem This Solves

Small businesses can't afford $15K+ per training module from traditional L&D vendors. They end up with PowerPoints nobody reads, built by the one person who "knows how to use the template." Compliance suffers. Institutional knowledge walks out the door when people quit.

This agent takes client SOPs, handbooks, and procedure docs as input — and produces narrative-driven, quiz-enabled training modules as output. The cost drops by an order of magnitude. The quality goes up because the agent encodes proven instructional design methodology, not just slide formatting.

The human loop isn't decoration. The agent asks the client clarifying questions. L&D professionals review instructional design decisions. Retired industry managers validate domain accuracy. The agent learns from all of it.

---

## Architecture Overview

```
CLIENT DOCUMENTS
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                    Pi Agent Harness                       │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐ │
│  │   ANALYZE    │───▶│   SCRIPT    │───▶│   DESIGN     │ │
│  │  sop-analyzer│    │script-writer│    │  lxd + theme │ │
│  └──────┬──────┘    └──────┬──────┘    └──────┬───────┘ │
│         │                  │                   │         │
│         ▼                  ▼                   ▼         │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐ │
│  │   CLIENT     │    │  L&D REVIEW │    │   SME/MGR    │ │
│  │  Q&A LOOP    │    │    LOOP     │    │   REVIEW     │ │
│  └─────────────┘    └─────────────┘    └──────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              EXPERTISE FILE (per client)             │ │
│  │  Terminology · Compliance reqs · Review feedback     │ │
│  │  Domain patterns · Preferred styles · Known gaps     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│         ┌──────────────┐                                 │
│         │   PACKAGE     │                                │
│         │ scorm-builder │                                │
│         └──────┬───────┘                                 │
│                │                                         │
└────────────────┼─────────────────────────────────────────┘
                 ▼
          SCORM PACKAGE + HTML PLAYER
          (ready for LMS or standalone)
```

---

## The Pipeline (5 Stages + 3 Feedback Loops)

### Stage 1: ANALYZE — SOP Ingestion & Training Brief

**Skill:** `sop-analyzer`
**Input:** Client SOPs, handbooks, procedure docs (PDF, DOCX, plain text)
**Output:** Structured training brief (markdown)

The analyzer reads client documents and produces:
- Must-know content with compliance criticality flags
- Recommended module structure with estimated durations
- Learning objectives (behavioral, testable)
- Knowledge gaps (acronyms undefined, procedures that skip steps, tribal knowledge)
- Contradictions between documents
- Questions for the client
- Narrative opportunities

**Feedback Loop 1: Client Q&A**

The training brief always generates questions. These aren't optional — they're the most valuable part. The agent formats them as a structured questionnaire:

```markdown
## Questions for [Client Name]

### Must-Answer (blocks module development)
1. Your lockout/tagout procedure references "the red tag system" but
   doesn't describe it. What does an employee physically do?
2. Documents A and B disagree on reporting timeline. Which is correct:
   24 hours (safety manual) or 48 hours (HR handbook)?

### Recommended (improves training quality)
3. Are there common mistakes new employees make in the first 30 days
   that aren't covered in these documents?
4. What does "standard practice" mean in Section 4.2? This phrase
   appears 6 times with no definition.

### Nice-to-Have (enriches narrative)
5. Is there a real incident (anonymized) that illustrates why this
   procedure exists? Stories make compliance stick.
```

Client answers feed back into the brief, filling gaps and resolving contradictions. The expertise file captures terminology preferences and domain patterns discovered during Q&A.


### Stage 2: SCRIPT — Narrative Training Script

**Skill:** `script-writing`
**Input:** Completed training brief (with client Q&A resolved)
**Output:** Narrative script in SOPs house voice

The script follows three-act structure:
- **Act 1 (15-20%):** Cold open showing the reasonable-but-wrong thing, raising the question
- **Act 2 (60-70%):** Reframing + deep teaching with layered concepts
- **Act 3 (15-20%):** Resolution + practical application + "now what"

Voice: warm but direct, names uncomfortable truths, never makes the reader feel stupid. David Attenborough narrating office life.

**Feedback Loop 2: L&D Professional Review**

Before the script moves to design, an L&D reviewer evaluates:
- Learning objective alignment (does the script teach what the brief says it should?)
- Cognitive load (too much per section? concepts properly scaffolded?)
- Assessment readiness (can you write quiz questions from this content?)
- Engagement (would a real employee keep reading or click away?)
- Accessibility (reading level appropriate for audience?)

The agent formats a structured review request:

```markdown
## L&D Review Request

### Module: [Title]
### Target audience: [Description]
### Estimated completion time: [Duration]

Please evaluate the attached script on these dimensions:

| Dimension | Rating (1-5) | Notes |
|-----------|-------------|-------|
| Objective alignment | | |
| Cognitive load management | | |
| Assessment readiness | | |
| Engagement / motivation | | |
| Reading level / accessibility | | |

### Specific questions:
1. The cold open uses [scenario]. Does this feel realistic for this audience?
2. Section 3 covers [complex topic]. Should we split this into two modules?
3. The quiz has [N] questions. Too many? Too few? Wrong mix?

### Free response:
What would you change if you could change one thing?
```

Feedback integrates into the script. The expertise file captures L&D patterns: "Modules over 20 minutes get split. Quiz questions need at least one distractor from common misconceptions, not random wrong answers."


### Stage 3: DESIGN — Slide Decomposition & Visual Theme

**Skill:** `lxd` (decomposition) → `aesthetic-design` (theme)
**Input:** Reviewed script
**Output:** MODULE JSON + themed HTML player

LXD decomposes the script into typed slides:
- `title`, `scene`, `keypoint`, `reveal`, `concept`, `options`, `list`, `summary`, `quiz`, `results`
- One idea per screen
- Emotional pacing through slide type variation
- Quiz questions only after all content (never mid-content)

Theme selection based on content register:
- **Editorial** (dark, prestige) for serious compliance, paradigm shifts
- **Retro** (bright, textured) for lighter content, onboarding
- **Corporate** (clean, minimal) for client-branded deliverables

**Feedback Loop 3: Subject Matter Expert / Retired Manager Review**

Domain accuracy check. An SME or retired manager who lived this job reviews:
- Technical accuracy (are the procedures described correctly?)
- Realism (would this actually happen on the floor/in the office?)
- Missing context (what does a 20-year veteran know that isn't in the SOP?)
- Language (do we use the words they actually use, or corporate jargon?)

```markdown
## SME Review Request

### Module: [Title]
### Your role: Check that we got the real job right, not just the paperwork.

Please flag anything that:
- ❌ Is technically wrong or dangerously oversimplified
- ⚠️ Is technically correct but nobody actually does it that way
- 💡 Is missing something every experienced person knows
- 🗣️ Uses the wrong words (what do YOU call this?)

### Specific questions:
1. In Slide 7, we describe [procedure]. Is this how it actually happens?
2. The quiz asks [question]. Is this a fair test of competence?
3. What's the one thing a new hire gets wrong that these documents don't cover?
```

SME feedback is gold for the expertise file. This is tribal knowledge capture — the stuff that's never in the SOP but determines whether training actually works.


### Stage 3.5: ILLUSTRATE — Image Generation Pipeline

**Tools:** Replicate (Seedream 4.5) via Pi extension
**Input:** Script visual notes + slide decomposition + style manifest
**Output:** One custom illustration per slide (~20-25 images per module)

This is the production bottleneck. Every slide gets a custom illustration — not stock photography, not clip art. The AI Onboarding course averaged 22 images per module across 6 modules (130+ total). Each image is generated via Replicate's Seedream 4.5 at 16:9, with a consistent art style enforced by a shared prompt suffix.

**The image pipeline is where the Pi agent saves the most time.**

**How it works today (manual):**
1. Sean reads the script and writes a visual note for each slide
2. Each note becomes a Replicate prompt (appended with style suffix)
3. Generate, evaluate, regenerate if it missed, repeat ~130 times
4. Maintain character consistency (Joe is always from behind)
5. Maintain visual through-lines (Module 2's theater palette vs Module 1's office palette)

**How it works with the Pi agent:**

The `image-pipeline` extension registers:
- `/generate-manifest` — Reads the script's visual notes and LXD slide decomposition, produces an IMAGE-PROMPTS.md manifest with one prompt per slide, pre-appended with the style suffix and any module-specific visual through-line
- `/generate-images` — Batch-generates all images from the manifest via Replicate API, saves to `clients/<name>/modules/<module>/img/`, names files by slide number (s01-slug.jpg, s02-slug.jpg...)
- `/review-images` — Opens a grid view (HTML file) of all generated images alongside their slide text, for rapid visual QA
- `/regenerate <slide-numbers>` — Re-runs only flagged images with optional prompt tweaks
- `/match-style <path-to-existing>` — Analyzes an existing module's images and extracts a style manifest (palette, composition patterns, character descriptions) for new modules to match

**Style manifests** are stored per-client and per-course:
```markdown
# Style Manifest: Thatcher Company — Safety Series

## Core Style
Warm digital illustration, animated film concept art style.
Soft painterly brushstrokes, rounded stylized forms.
Industrial color palette: steel blue, safety orange, concrete gray.

## Characters
- New Hire (audience proxy): Young worker in PPE, shown from behind
- Veteran (mentor figure): Older worker, weathered hands, confident posture

## Module Visual Through-Lines
- Module 1 (LOTO): Industrial floor, heavy machinery, red lockout tags
- Module 2 (Chemical Safety): Lab/storage, yellow diamond signs, blue gloves
- Module 3 (Emergency): Exit signs, assembly points, alarm lighting

## Consistency Rules
- Audience proxy character never faces camera
- All scenes use the same facility interior (consistent background elements)
- Safety equipment always depicted accurately (no artistic license on PPE)
```

**Style matching for existing clients:** When a client already has modules (their own or ones you've built), `/match-style` reads their existing images and generates a style manifest so new modules feel like a visual continuation, not a jarring shift. This is key for the module-pricing model — a client buys one course, then comes back for individual modules later, and the new ones look like they belong.

**Time savings estimate:** The manual image workflow takes 5-6 days for a 6-module course. The batch generation + grid review + selective regeneration workflow should cut that to 2-3 days — still the longest single phase, but no longer the majority of production time.


### Stage 4: PACKAGE — SCORM Assembly

**Skill:** `scorm-builder`
**Input:** MODULE JSON + slide images + audio files (if narrated) + quiz data
**Output:** SCORM 1.2 or 2004 zip package

Packages for LMS delivery or standalone HTML player. Handles:
- Slide display with transitions
- Audio sync (if narrated version)
- Quiz interaction with scoring
- Completion tracking (SCORM API)
- Responsive design for desktop + mobile


### Stage 5: LEARN — Expertise File Update

After every completed module, the agent updates its expertise file for this client/industry:

```markdown
# Expertise: [Client Name / Industry]

## Terminology
- They say "PSM" not "process safety management"
- "The floor" means the production area, not the literal floor
- "Tag out" is one word internally: "tagout"

## Compliance Landscape
- Primary: OSHA PSM (29 CFR 1910.119)
- Secondary: EPA RMP, DOT HazMat
- State-specific: Colorado COGCC rules for oil/gas

## Training Patterns
- Modules over 18 minutes get abandoned (from LMS completion data)
- Their employees respond better to scenario-based than lecture-style
- Quiz pass rate target: 80% (their HR policy)

## Review Feedback History
- L&D reviewer consistently flags cognitive load in Act 2 — split earlier
- SME always adds safety anecdotes — prompt for these upfront next time
- Client prefers questions tiered by priority (must/should/could)

## Known Gaps
- No documentation exists for the night shift handoff procedure
- Emergency evacuation routes differ by building but only one is documented
- The "buddy system" is policy but not in any SOP
```

The self-improve prompt that runs after each module:

```
Review the module you just completed. Update the expertise file with:
1. New terminology discovered during client Q&A
2. Patterns from L&D reviewer feedback (what did they flag? what pattern?)
3. Domain knowledge from SME review (tribal knowledge captured)
4. What worked well (reuse next time)
5. What you'd do differently (avoid next time)
Do NOT duplicate existing entries. Merge with or refine existing knowledge.
Cross-reference against the source documents to ensure accuracy.
```

---

## Reporting & Audit Trail — The Anti-Black-Box

This is the feature that sells to regulated industries. When an NCUA examiner asks a credit union "how was this training developed?", the answer isn't "we used AI." The answer is a 10-section audit report that traces every slide to a source document, every decision to a rationale, and every review to a named human with a date.

### The Problem With AI Training Today

Every compliance officer's nightmare: "AI generated our training" with no way to prove what went in, what decisions were made, or who validated the output. Black box AI in regulated environments isn't just risky — it's a liability. Examiners don't accept "the AI said so" as documentation.

### The Solution: Radical Traceability

Every artifact the agent produces carries its provenance. Every decision is logged with reasoning. Every human touchpoint is recorded. The audit report isn't generated after the fact — it's built incrementally as the pipeline runs.

### Audit Infrastructure

**Source Document Hashing:**
When documents enter the pipeline (`/analyze`), every source file gets a SHA-256 hash recorded in the audit log. If the client updates their SOP after training is built, the hash mismatch triggers a warning. This catches regulatory drift — the training says one thing, the current SOP says another.

**Traceability Chain:**
Every slide in the final module links back through four layers:
```
Slide 14 (keypoint)
  ← Script §2.3 (the teaching passage that became this slide)
    ← Brief §4 (the training requirement this passage addresses)
      ← Source: safety-manual-v3.pdf, p.12, ¶3 (the actual SOP text)
```
The `/trace` command walks this chain for any slide. `/trace --all` produces the full traceability matrix. Nothing in the training is unsourced.

**Compliance Coverage Map:**
The analyzer identifies every regulatory requirement referenced in the source docs. The coverage map tracks each requirement through to:
- Which slide(s) teach it
- Which quiz question(s) test it
- Whether an SME validated it

The `/coverage` command renders this as a table. Gaps (requirements with no coverage) are flagged as critical — these are either content to add or documented exclusions signed off by the client.

**Decision Log:**
Every non-trivial choice the agent makes is recorded with reasoning:
- "Slide 14 assigned type `keypoint` because this is a core compliance requirement (OSHA 1910.147) that learners must retain, not just encounter."
- "Theme `editorial` selected because the content register is serious compliance affecting worker safety."
- "Quiz Q6 tests the periodic inspection requirement because brief §4 flags this as MUST-KNOW with specific frequency intervals that are testable."
- "Section 3.2 of the source SOP was excluded from training because it describes administrative filing procedures, not employee-facing behavior."

This is the anti-black-box. An examiner can ask "why does slide 14 exist?" and get a complete answer without a human having to reconstruct it from memory.

**Review Audit Trail:**
Every human review is recorded:
- Who reviewed (name, role, qualifications if provided)
- When they reviewed (timestamp)
- What they were asked (the review request document)
- What they said (their feedback, verbatim)
- What changed as a result (diff of the artifact before/after revision)

**Gate Log:**
Every pipeline gate records:
- Pass: timestamp, which review satisfied it
- Override: timestamp, who overridden by, mandatory reason field
- Override reasons are permanent and visible in the audit report

### The Audit Report

Generated by `/audit`, this is the single deliverable that answers: "How was this training built, by whom, from what sources, and can you prove it?"

Ten sections:
1. Module Summary (metadata, audience, dates)
2. Source Document Inventory (files, versions, hashes)
3. Traceability Matrix (every slide → source chain)
4. Compliance Coverage Map (every regulation → slides + quiz + SME review)
5. Review History (client Q&A + L&D feedback + SME validation)
6. Decision Log (every agent choice with reasoning)
7. Quality Metrics (reading level, duration, slide distribution)
8. Gate Log (every gate pass or override)
9. Expertise Delta (what the agent learned from this build)
10. Revision History (post-delivery changes, if any)

Exportable as markdown or Word document (`/audit --format docx`).

### Why This Matters for Sales

For your Tier 1 ICPs (credit unions, senior living):
- **Credit unions:** NCUA examiners audit training programs. The audit report is exam-ready documentation.
- **Senior living:** CMS surveys check staff training records. The coverage map proves regulatory requirements are addressed.
- **Manufacturing:** OSHA compliance requires documented training. The traceability matrix proves content derives from actual procedures.

The pitch: "Our AI-assisted process produces better training AND better documentation than your current manual process. Here's the audit report that proves it."

### What Competitors Can't Do

Generic AI tools (ChatGPT, Gemini, etc.) produce training content with zero provenance. No traceability, no coverage mapping, no decision logging, no review audit trail. Even other e-learning platforms that use AI don't expose the reasoning chain.

Your audit trail is a structural advantage because it's built into the pipeline, not bolted on after. The agent can't produce a module without producing the audit trail — they're the same process.

---

## Pi Agent Configuration

### Directory Structure

```
sops-module-builder/
├── .pi/
│   ├── AGENTS.md                    # Agent identity + pipeline instructions
│   ├── SYSTEM.md                    # System prompt overrides (optional)
│   ├── skills/
│   │   ├── sop-analyzer/            # Symlink or copy of existing skill
│   │   ├── script-writing/          # Symlink or copy
│   │   ├── lxd/                     # Symlink or copy
│   │   ├── aesthetic-design/        # Symlink or copy
│   │   └── scorm-builder/           # Symlink or copy
│   ├── extensions/
│   │   ├── module-pipeline/
│   │   │   └── index.ts             # Pipeline orchestration extension
│   │   ├── feedback-loops/
│   │   │   └── index.ts             # Client Q&A, L&D review, SME review
│   │   ├── image-pipeline/
│   │   │   └── index.ts             # Batch image generation, review grid, style matching
│   │   ├── expertise-manager/
│   │   │   └── index.ts             # Expertise file CRUD + self-improve
│   │   ├── audit-trail/
│   │   │   └── index.ts             # Traceability, coverage, decisions, reporting
│   │   └── quality-gate/
│   │       └── index.ts             # Blocks progression without required reviews
│   └── prompt-templates/
│       ├── client-questionnaire.md
│       ├── ld-review-request.md
│       ├── sme-review-request.md
│       └── self-improve.md
├── clients/
│   ├── _template/                   # New client scaffold
│   │   ├── expertise.md
│   │   ├── style-manifest.md        # Visual identity (palette, characters, through-lines)
│   │   ├── intake/                  # Raw client documents go here
│   │   ├── briefs/                  # Training briefs (Stage 1 output)
│   │   ├── scripts/                 # Narrative scripts (Stage 2 output)
│   │   ├── modules/                 # MODULE JSON + HTML (Stage 3 output)
│   │   ├── packages/                # SCORM packages (Stage 4 output)
│   │   ├── reviews/                 # Feedback from L&D, SME, client
│   │   └── audit/                   # Audit reports, traceability, coverage maps
│   └── [client-name]/               # Per-client working directory
├── expertise/
│   ├── industries/
│   │   ├── credit-unions.md
│   │   ├── senior-living.md
│   │   └── manufacturing.md
│   └── methodology/
│       ├── instructional-design.md  # Cross-client L&D patterns
│       └── common-gaps.md           # Recurring SOP problems
└── evals/
    ├── brief-quality/               # Does the brief catch real gaps?
    ├── script-voice/                # Does the script sound like SOPs?
    ├── slide-decomposition/         # Are slide types assigned correctly?
    ├── quiz-alignment/              # Do quiz questions test objectives?
    └── end-to-end/                  # Full pipeline from SOP to SCORM
```


### AGENTS.md (Core Agent Identity)

```markdown
# SOPs Module Builder

You are a training module production agent for SOPs Nobody Reads.
Your job: turn client SOPs into training people actually want to complete.

## Your Pipeline

You follow a 5-stage pipeline. Each stage has a skill. Never skip stages.
Never proceed past a feedback gate without the required review.

1. ANALYZE → `sop-analyzer` skill → produces training brief
   - GATE: Client Q&A must be answered before proceeding
2. SCRIPT → `script-writing` skill → produces narrative script
   - GATE: L&D review must approve before proceeding
3. DESIGN → `lxd` + `aesthetic-design` skills → produces MODULE JSON + HTML
   - GATE: SME review must validate domain accuracy
4. PACKAGE → `scorm-builder` skill → produces SCORM zip
5. LEARN → update expertise file with everything you learned

## Quality Principles

- The source SOP is the source of truth. Never invent compliance requirements.
- Flag gaps and contradictions. Never silently resolve them.
- One idea per screen. If you're cramming, you're failing.
- Quiz questions test behavior, not recall. "What would you DO" not "What is the definition of."
- Every module tells a story. If it reads like a manual, rewrite it.

## Expertise Files

Before starting work on any client, read their expertise file (if it exists).
After completing any module, update the expertise file using the self-improve
prompt template. Your expertise file is your mental model — not a second source
of truth. Always cross-reference against the actual documents.

## Working With Reviewers

Format all review requests using the prompt templates in .pi/prompt-templates/.
When feedback comes back, integrate it AND update the expertise file with the
pattern (not just the specific fix).
```


### Key Extensions

#### 1. module-pipeline (orchestration)

Registers commands:
- `/new-client [name]` — scaffolds a new client directory from template
- `/analyze [path-to-docs]` — runs Stage 1, produces brief, generates client questionnaire
- `/script` — runs Stage 2 on the current client's approved brief
- `/design [theme]` — runs Stage 3, produces MODULE JSON + themed HTML
- `/package [scorm-version]` — runs Stage 4, produces SCORM zip
- `/learn` — runs Stage 5, updates expertise file
- `/status` — shows pipeline progress for current client

#### 2. feedback-loops (human-in-the-loop)

Registers commands:
- `/ask-client` — formats and outputs client questionnaire from current brief
- `/client-answers [path]` — ingests client responses, updates brief
- `/request-ld-review` — formats L&D review request from current script
- `/ld-feedback [path]` — ingests L&D feedback, flags revision needs
- `/request-sme-review` — formats SME review request from current design
- `/sme-feedback [path]` — ingests SME feedback, flags accuracy issues

Hooks into `tool_call` events to block stage progression if the required
review hasn't been completed. Configurable strictness levels:
- `strict` — hard block, cannot proceed without review
- `warn` — allows override with confirmation
- `open` — no gates (for rapid prototyping/demos)

#### 3. image-pipeline (art direction + batch generation)

Registers commands:
- `/generate-manifest` — reads script visual notes + LXD decomposition, produces IMAGE-PROMPTS.md with one prompt per slide, style suffix and visual through-line pre-applied
- `/generate-images` — batch-generates all images via Replicate API, names by slide number
- `/review-images` — generates an HTML grid of all images alongside slide text for rapid QA
- `/regenerate <slide-numbers>` — re-runs only flagged images with optional prompt tweaks
- `/match-style <path>` — analyzes existing module images, extracts a style manifest for consistency
- `/set-style <manifest>` — applies a style manifest to the current module's generation

Hooks into module-pipeline to auto-generate the manifest after LXD
decomposition completes. Stores style manifests per-client and per-course
in `clients/<n>/style-manifest.md`.

#### 4. expertise-manager (agent learning)

Registers commands:
- `/expertise [client]` — display current expertise file
- `/expertise-sync` — run self-improve prompt against source documents
- `/expertise-diff` — show what changed since last sync
- `/industry [name]` — display industry-level expertise

Hooks into `session_end` to prompt for expertise update if any client
work was done during the session.

#### 5. audit-trail (reporting & provenance)

Hooks into every stage transition, review event, and agent decision to build
the audit log incrementally. The audit report isn't generated after the fact —
it's assembled as the pipeline runs.

Registers commands:
- `/audit` — generate full audit report (markdown or `--format docx`)
- `/trace <slide>` — trace one slide back to source document
- `/trace --all` — full traceability matrix
- `/coverage` — compliance coverage map (all regulations)
- `/coverage --regulation <id>` — filter to one regulation
- `/decisions` — decision log with reasoning
- `/changelog` — diffs after each review cycle
- `/timeline` — chronological build history

Hooks into events:
- `tool_call` — logs every file read/write with timestamp
- `session_start` — records source document hashes
- Stage transitions — records gate pass/override with reason
- Review ingestion — records reviewer, timestamp, feedback, resulting changes

Data stored as JSONL in `clients/<name>/audit/events.jsonl` for
machine-readable access. Report commands render from this event stream.

#### 6. quality-gate (damage control)

Hooks into `tool_call` events:
- Blocks writing quiz questions that don't trace to a learning objective
- Blocks generating more than 25 slides per module (forces splitting)
- Blocks compliance content that can't be sourced to a specific document
- Warns when reading level exceeds target audience
- Warns when estimated module duration exceeds 20 minutes

---

## Eval Strategy (Days 5-7)

### Brief Quality Eval
- Input: 3-5 real SOPs (varied industries, varied quality)
- Expected: Brief catches known gaps, flags contradictions, generates useful questions
- Rubric: Gap detection rate, question quality, compliance criticality accuracy

### Script Voice Eval
- Input: Completed briefs
- Expected: Script matches SOPs house voice spec
- Rubric: Voice checklist (warm not soft, direct not condescending, etc.), three-act structure present, cold open is recognition-not-mockery

### Slide Decomposition Eval
- Input: Completed scripts (varied lengths, varied density)
- Expected: Correct slide type assignment, proper pacing, one idea per screen
- Rubric: Slide type accuracy, cognitive load distribution, quiz placement

### Quiz Alignment Eval
- Input: Learning objectives + generated quiz questions
- Expected: Every question tests a stated objective, distractors are plausible
- Rubric: Objective coverage, distractor quality, question stem clarity

### End-to-End Eval
- Input: Raw SOP document (never seen before)
- Expected: Complete pipeline produces a working SCORM package
- Rubric: Pipeline completes without manual intervention (except feedback gates), output is a valid SCORM package, HTML player renders correctly

---

## 7-Day Build Plan

### Day 1: Foundation
- [ ] Install Pi, verify Anthropic API connectivity
- [ ] Create project directory structure
- [ ] Write AGENTS.md
- [ ] Symlink/adapt existing skills into .pi/skills/
- [ ] Test: Pi can read skills and produce a training brief from a sample SOP

### Day 2: Pipeline Orchestration
- [ ] Build module-pipeline extension (commands + stage tracking)
- [ ] Build quality-gate extension (basic blocks and warnings)
- [ ] Test: `/new-client` scaffolds correctly, `/analyze` produces brief

### Day 3: Feedback Loops
- [ ] Build feedback-loops extension (all 3 reviewer workflows)
- [ ] Create prompt templates for client Q&A, L&D review, SME review
- [ ] Test: Full Stage 1-2 cycle with simulated client answers + L&D feedback

### Day 4: Design + Package
- [ ] Wire up LXD + aesthetic-design as Stage 3
- [ ] Wire up scorm-builder as Stage 4
- [ ] Build expertise-manager extension
- [ ] Test: Full pipeline from SOP → SCORM with all feedback loops

### Day 5: First Full Run
- [ ] Run the entire pipeline against a real SOP (pick one from Thatcher or another prospect)
- [ ] Document every friction point, manual intervention, and failure
- [ ] Fix critical blockers

### Day 6: Evals
- [ ] Build eval suite (brief quality, script voice, slide decomposition, quiz alignment)
- [ ] Run evals against 3-5 varied inputs
- [ ] Score and document results

### Day 7: Polish + Case Study
- [ ] Fix issues found in evals
- [ ] Run end-to-end eval on a fresh SOP
- [ ] Write the case study: "How I Built a Purpose-Built AI Agent for Training Module Production"
- [ ] Record a demo walkthrough (optional but high-value)

---

## Pricing Model

### Market Context

Custom e-learning development averages $42,660 per finished hour of content in 2026. A basic SCORM conversion of a PowerPoint runs $2,000-$3,000. A 20-minute interactive module with voiceover and quizzes costs $6,000+. Off-the-shelf compliance training subscriptions run $5-$50/user/month but are generic, checkbox-quality content that nobody remembers.

Small companies (100+ employees) have average total training budgets of $333,305 and spend $1,091 per learner. 13% of that goes to mandatory compliance training. Credit unions, senior living facilities, and manufacturers are legally required to train annually on specific regulations — this isn't discretionary spending.

SOPs Nobody Reads sits in the gap between "expensive custom" and "cheap generic" — custom quality at a price small businesses can justify.

### Production Economics

**What goes into a 6-module course:**
- Script writing + revision: 3-4 days (collaborative with Claude)
- LXD decomposition + HTML player build: 2 days (skill-driven)
- Image generation + art direction: 2-3 days with Pi agent (5-6 days manual)
- Review cycles (client Q&A + L&D + SME): 2-3 days of elapsed time
- Packaging + QA + audit report: 1 day
- **Total: ~2 weeks production, including review wait time**

**Direct costs per course:**
- Anthropic API: $20-50 (generous estimate, Opus for scripts + Sonnet for mechanical steps)
- Replicate image generation: $10-30 (130+ images at ~$0.05-0.20 each)
- L&D reviewer: $300-600 (freelance, reviewing 6 module scripts)
- SME reviewer: $200-400 (if paid; free if client provides)
- **Total direct cost: ~$530-$1,080 per course**

Sean's time: ~50-60 hours per course (creative direction, art direction, review management, client communication, final QA). This is the main cost.

### Pricing Tiers

**Lead with courses. Quote modules only if asked. Price from the buyer's alternative, not your cost.**

The product is a complete learning experience — a narrative arc across multiple modules that builds understanding progressively. Individual modules work, but the course is where the methodology shines. Tiered by company size because the same course is worth more to a 500-person credit union than a 30-person shop.

**Target market: mid-market (100-500 employees).** Multi-branch credit unions, regional senior living chains, mid-size manufacturers. Budget large enough for real engagement, company small enough to lack internal L&D, regulated enough that training is non-discretionary.

#### COURSE PRICING BY COMPANY SIZE

| | Small (25-100) | Mid-Market (100-500) | Enterprise-Adjacent (500+) |
|---|---|---|---|
| Pilot course (5-6 modules) | $8,000-$12,000 | $15,000-$25,000 | $25,000-$40,000 |
| Additional modules | $1,500-$2,000 | $2,500-$3,500 | $3,500-$5,000 |
| Style-matched modules | $1,200-$1,500 | $2,000-$2,500 | $2,500-$3,500 |
| Annual program | $12,000-$18,000 | $25,000-$40,000 | $50,000-$80,000 |
| Their alternative | Off-the-shelf ($2K-$5K/yr) | Agency ($40K-$80K) | Agency + LMS ($65K-$160K) |

Each pilot course includes: full SOP analysis, client Q&A cycle, 5-6 narrative modules with 20+ custom illustrations per module, HTML player + optional SCORM, quizzes, full audit report, one revision round, and an expertise file.

#### ASSESSMENT (entry point at every tier) — $2,500 - $3,500

- Full SOP analysis and training brief
- Knowledge gap identification and client questionnaire
- One demo module (abbreviated, 8-10 slides) showing the quality level
- If they proceed to a full course, the assessment fee applies as credit

This is the discovery call deliverable. The demo module sells the course.

#### EFFECTIVE RATE CHECK

| Scenario | Price | ~Hours | Rate |
|----------|-------|--------|------|
| Small biz pilot @ $10K | $10,000 | 60 | $167/hr |
| Mid-market pilot @ $20K | $20,000 | 60 | $333/hr |
| Enterprise pilot @ $35K | $35,000 | 60 | $583/hr |
| Traditional agency | — | — | $400-$800/hr |
| **Floor (never go below)** | — | — | **$150/hr** |

Production gets faster per client over time (expertise file + style manifest compound). Effective rate goes UP, not down.

Full pricing details, discount guidelines, rush pricing, payment terms, and objection handling: see `docs/pricing.md` in the repo.

### Competitive Positioning

| | Off-the-Shelf | SOPs Nobody Reads | Traditional Custom |
|---|---|---|---|
| Price per course | $500-$5,000/yr | $15,000-$25,000 | $40,000-$80,000+ |
| Content | Generic | Custom to their SOPs | Custom |
| Images | Stock/none | 20+ custom per module | Custom illustration |
| Engagement | Checkbox | Narrative-driven | Varies |
| Audit trail | Completion records | Full provenance chain | Varies |
| Time to deliver | Immediate | 2-3 weeks | 8-16 weeks |
| Improves over time | No | Yes (expertise file) | No |
| Examiner-ready docs | Basic | Traceability + coverage map | Sometimes |

Premium quality. Agency speed. Mid-market price. Audit trail nobody else offers.

---

## What This Becomes

### Immediate (Week 1-2 deliverable)
A working agent that takes client SOP documents and produces a complete training course through a structured pipeline with human review gates, plus the AI Onboarding course as a live portfolio piece.

### Near-term (Month 1)
- First paying client through assessment → pilot course conversion
- Industry expertise files for credit unions and senior living (Tier 1 ICPs)
- Refined quality gates based on real client feedback
- Image pipeline automation cutting production time by 40%

### Medium-term (Month 2-3)
- Agent handles multiple concurrent clients (separate expertise files, shared methodology)
- L&D reviewer pool providing ongoing calibration data
- Style-matching capability enabling faster module additions for existing clients
- Video narration pipeline (FFmpeg + ElevenLabs/Hume) as a premium add-on
- Client self-service intake form feeding directly into Stage 1

### Long-term
- The agent IS the product. Small businesses subscribe to the annual training program, and the agent (with human review infrastructure) produces their compliance training each year
- Expertise files become the moat — accumulated domain knowledge per client and per industry that generic tools can't replicate
- Style manifests enable a "franchise" model: new modules visually match existing ones without starting from scratch
- The case study becomes sales collateral: "Here's how the agent built this course for [client]. Here's what it learned. Here's how the next course was better because of it."

---

## Notes for Sean

**Why Pi and not Claude Code for this:**
Pi lets you encode the entire pipeline methodology as an agent harness — the commands, the gates, the expertise file system, the feedback loop formatting, the image pipeline. Claude Code could do the individual skills, but it can't enforce the pipeline. You need the extension system to make progression through stages a structural property of the agent, not a vibes-based prompt instruction.

**The feedback loops are the differentiator:**
Any LLM can summarize an SOP into slides. The reason your training is better is the three-person review: client fills gaps, L&D validates pedagogy, SME validates reality. The agent orchestrates that. Without the loops, this is a summarizer. With them, it's a training production system.

**Expertise files compound:**
The first module for a new client takes the most work. The fifth module for the same client takes half the time because the agent already knows their terminology, their compliance landscape, their training patterns, and what their reviewers care about. This is the Agent Expert pattern — and it's directly visible to the client as improving quality over time.

**Lead with courses, not modules:**
The product is a complete learning experience — a narrative arc across 5-6 modules that builds understanding progressively. "The Real Problem Is You (And That's Good News)" only lands because Modules 1-3 set it up. Individual modules work as additions to an existing library, but the first engagement should always be a course. The pilot course at $12K-$15K positions you in the gap between off-the-shelf ($500-$2K) and traditional custom ($40K-$80K). That gap exists because nobody has figured out how to produce custom-quality training at that speed and price point until now.

**The images are the moat inside the moat:**
130+ custom illustrations across 6 modules isn't a nice-to-have — it's what makes the training feel like a prestige product instead of an e-learning module. The visual through-lines (Joe always from behind, Module 2's theater palette) are creative decisions that generic AI tools can't make. The image pipeline extension automates the mechanical parts (batch generation, naming, grid review) but the art direction — choosing WHAT each slide should show — is where your creative writing background earns its keep.

**Style matching is the upsell engine:**
When a client buys a course, you generate a style manifest. When they come back for additional modules, the new modules match their existing visual identity at a lower price point ($2K-$2.5K instead of $2.5K-$3.5K). The expertise file makes the content faster; the style manifest makes the visuals faster. Both compound. The client sees consistency and improving speed, which builds trust for the annual program conversion.

**The AI Onboarding course is your live portfolio:**
Point every prospect at https://sean-roth.github.io/sops-nobody-reads/courses/ai-onboarding/builds/index.html. Let them click through Module 1. They'll see the quality — narrative voice, custom illustrations, quizzes, the whole thing. Then say: "We built this for AI onboarding. We'll build the same thing for your BSA/AML program, your safety procedures, your employee handbook — using YOUR documents as the source material." That's not a pitch. That's a demo.

**The honest case study number:**
Two weeks for six modules, with images as the bottleneck. With the Pi agent and image pipeline automation, the target is 8-10 business days for a 5-6 module course. Don't promise "3 days" — promise "delivered in 2-3 weeks including your review time." Underpromise on timeline, overdeliver on quality. The audit report is the proof.
