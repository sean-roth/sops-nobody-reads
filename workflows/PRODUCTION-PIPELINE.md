# SOPs Nobody Reads — Production Pipeline

End-to-end technical workflow from client SOPs to delivered SCORM packages.

---

## Pipeline Overview

```
Client SOPs → Analysis → Script → Visuals → Audio → SCORM Assembly → Testing → Delivery
```

| Stage | Tool | Output |
|-------|------|--------|
| 1. Intake & Analysis | Claude + SOP Analyzer Skill | Structured training brief |
| 2. Script Development | Claude + Sean (collaborative) | Module scripts in markdown |
| 3. Visual Production | Gamma API + Replicate (custom images) | PPTX slides / image assets |
| 4. Audio Production | Hume AI (Octave TTS) | MP3 narration per slide |
| 5. SCORM Assembly | Claude + SCORM Builder Skill | SCORM .zip packages |
| 6. Testing | SCORM Cloud + Moodle | Validated, bug-free packages |
| 7. Delivery | Google Drive + Stripe | Final files + invoice |

---

## Stage 1: Intake & Analysis

### What Comes In

Client sends their source documentation. Expected volume:

| Client Size | Typical Doc Count | Approach |
|------------|-------------------|----------|
| Small (single process) | 1-5 docs | Load directly into Claude context |
| Medium (onboarding package) | 5-20 docs | Claude Project with all docs uploaded |
| Large (full compliance suite) | 20-50+ docs | Claude Project, process in batches |
| Enterprise (knowledge base) | 100+ docs | RAG system — separate scoping conversation |

Most engagements will be 5-20 documents. No RAG needed for typical projects.

### SOP Analyzer Skill

Claude reads the source documents using the SOP Analyzer Skill (`skills/sop-analyzer/`) and produces:

- **Document inventory** — what was provided, what each doc covers
- **Key knowledge extraction** — policies, procedures, compliance requirements, safety protocols
- **Audience analysis** — who needs to know this, what's their context
- **Knowledge gaps** — what's implied but never stated, tribal knowledge assumptions
- **Recommended module structure** — how to break the content into training units
- **Questions for client** — anything unclear or contradictory

The Skill teaches Claude what to look for in corporate documentation and what to ignore (boilerplate headers, revision histories, formatting artifacts, legal disclaimers that don't affect training content).

### Output

A structured brief in markdown saved to the project folder. This is reviewed by Sean before proceeding to scripting.

---

## Stage 2: Script Development

### Process

This is collaborative work between Sean and Claude. The analysis brief becomes module scripts following the SOPs Nobody Reads house style:

- Narrative-driven, not bullet-point
- Scene-based cold opens
- Characters and scenarios grounded in the client's industry
- Conversational narrator voice
- Knowledge checks and quizzes embedded
- Production notes for visual/audio direction

### Format

Markdown files in the project repo, same format as the AI onboarding course scripts:

```
project-name/scripts/
├── module-01-[title].md
├── module-02-[title].md
└── ...
```

Each script includes:
- Scene directions
- Narrator voiceover text
- Visual descriptions
- Quiz questions with correct answers
- Production notes
- Estimated runtime

### Client Approval

Outline goes to client first (per delivery-process.md). Full scripts are internal — client sees the finished modules, not the screenplay.

---

## Stage 3: Visual Production

### Primary Tool: Gamma API

**Endpoint:** `POST https://public-api.gamma.app/v1.0/generations`

Gamma generates slide decks from the module scripts. Key parameters:

```json
{
  "inputText": "[module script content]",
  "textMode": "preserve",
  "format": "presentation",
  "numCards": 12,
  "exportAs": "pptx",
  "additionalInstructions": "[visual direction from production notes]",
  "imageOptions": {
    "source": "aiGenerated",
    "style": "[project-specific style directive]"
  },
  "textOptions": {
    "tone": "[per project]",
    "audience": "[per project]"
  }
}
```

Generation is async — POST returns a `generationId`, GET to poll status until `completed`, response includes `gammaUrl` and optional PPTX/PDF download link.

### Custom Images: Replicate

When Gamma's AI imagery doesn't meet requirements (consistent characters, specific scenes, brand-specific visuals), use Replicate for custom image generation.

Use cases:
- Recurring characters across modules (same as VFX Buddy approach — consistent character prompts)
- Specific scenes described in production notes
- Client brand integration
- Retro/period-specific aesthetics that Gamma's general style can't nail

Generated images can be fed back into Gamma as URLs in `inputText` with `imageOptions.source: "noImages"` to prevent Gamma from adding its own.

### Output Format

Export as **PPTX** (not PDF). PPTX preserves slide structure and can be decomposed into individual slide images for the SCORM player. PDF flattens into pages which is harder to work with.

Slides are extracted as PNG images for SCORM assembly:

```
project-name/assets/module-01/
├── slide-01.png
├── slide-02.png
├── slide-03.png
└── ...
```

---

## Stage 4: Audio Production

### Tool: Hume AI (Octave TTS)

**Endpoint:** `POST https://api.hume.ai/v0/tts/stream/json`

Hume's Octave TTS generates narration from the module scripts. Advantages over ElevenLabs:
- Emotional intelligence — natural expression without manual tuning
- Voice design from natural language descriptions
- Voice cloning from audio samples
- Acting instructions per utterance for fine control
- Cost: ~$0.10/1,000 characters (~$2 per 25-min module)

### Voice Setup

Create a project voice once, reuse across all modules:

```json
{
  "version": "2",
  "utterances": [
    {
      "text": "[slide narration text]",
      "voice": {
        "id": "[project-voice-id]"
      }
    }
  ]
}
```

For the AI onboarding course, the voice directive would be something like: "warm male narrator, 1960s educational film tone, slightly earnest, measured pace, clear enunciation."

### Output

One audio file per slide, named to match slide numbering:

```
project-name/assets/module-01/
├── slide-01.mp3
├── slide-02.mp3
├── slide-03.mp3
└── ...
```

---

## Stage 5: SCORM Assembly

### Tool: Claude + SCORM Builder Skill

The SCORM Builder Skill (`skills/scorm-builder/`) teaches Claude to assemble slide images, audio files, and quiz data into valid SCORM packages.

### Input: Module Config

Each module is defined by a YAML config file:

```yaml
module:
  title: "What AI Actually Is"
  description: "Introduction to AI as pattern-matching technology"
  duration: "25 min"
  scorm_version: "1.2"
  passing_score: 75

theme:
  template: "retro-drivers-ed"  # or "client-brand" etc.
  primary_color: "#2B4C3F"
  accent_color: "#D4A574"
  logo: null  # or path to client logo

slides:
  - image: "slide-01.png"
    audio: "slide-01.mp3"
    duration: 45
    notes: "Cold open - Joe at desk"
  - image: "slide-02.png"
    audio: "slide-02.mp3"
    duration: 30
    notes: "Title card"

quiz:
  - question: "What is AI primarily doing when it generates text?"
    options:
      - "Thinking like a human brain"
      - "Predicting the next most likely sequence of words"
      - "Searching a database of pre-written responses"
      - "Following a decision tree of if/then rules"
    correct: 1
  - question: "Why does AI sometimes produce incorrect information?"
    options:
      - "It's not connected to the internet"
      - "The most statistically likely output isn't always factually correct"
      - "It hasn't been updated recently"
      - "It only works with English"
    correct: 1
```

### What the Skill Produces

A SCORM-compliant zip containing:

```
module-01.zip/
├── imsmanifest.xml          # SCORM manifest
├── index.html               # Main player
├── css/
│   └── player.css           # Theme styles (retro, brand, etc.)
├── js/
│   ├── player.js            # Slide navigation, audio sync
│   ├── quiz.js              # Quiz rendering and scoring
│   └── scorm-api.js         # SCORM communication layer
├── slides/
│   ├── slide-01.png
│   ├── slide-02.png
│   └── ...
├── audio/
│   ├── slide-01.mp3
│   ├── slide-02.mp3
│   └── ...
└── assets/
    └── [logo, fonts, etc.]
```

### Player Template

The HTML/CSS/JS player template lives in the Skill's assets directory. It handles:

- Slide display with transitions
- Audio playback synced to slides (auto-advance when narration ends)
- Progress bar and navigation controls
- Quiz rendering with immediate feedback
- Score calculation and pass/fail determination
- SCORM API communication (completion, score, bookmark for resume)
- Theme/brand customization via CSS variables
- Responsive layout

The template is built once and inherited by every module. Different visual themes (retro driver's ed, clean corporate, client-branded) are CSS overrides on the same HTML/JS structure.

---

## Stage 6: Testing

### Environment 1: SCORM Cloud

**URL:** https://app.cloud.scorm.com

Rustici Software's SCORM Cloud is the industry standard for SCORM conformance testing. Free tier available.

- Upload SCORM zip
- Verify package loads without errors
- Test all slides, audio playback, quiz interactions
- Confirm completion status reports correctly
- Confirm score reports correctly
- Test bookmark/resume (close and reopen)
- Check error console for JavaScript issues

### Environment 2: Moodle

Real-world LMS testing. Moodle is open source and one of the most common platforms clients use.

- Run locally via Docker: `docker run -p 8080:8080 bitnami/moodle`
- Upload SCORM package as activity
- Test the full learner experience
- Verify grade passback and completion tracking
- Test with different browsers

### Test Checklist

- [ ] Package uploads without errors
- [ ] All slides display correctly
- [ ] Audio plays and syncs to slides
- [ ] Auto-advance works when narration ends
- [ ] Manual navigation (next/prev) works
- [ ] Quiz renders correctly
- [ ] Quiz scoring is accurate
- [ ] Pass/fail threshold works
- [ ] Completion status reports to LMS
- [ ] Score reports to LMS
- [ ] Bookmark saves position on exit
- [ ] Resume works from bookmarked position
- [ ] No JavaScript console errors
- [ ] Works in Chrome, Firefox, Safari, Edge

---

## Stage 7: Delivery

Per existing `delivery-process.md`. Final package includes:

- SCORM .zip file(s) — one per module
- Content backup (markdown scripts)
- Quiz answer key
- Deployment instructions (LMS-specific if known)
- Quick troubleshooting guide

---

## Tool Accounts & API Keys

| Service | Purpose | Account Status | Pricing |
|---------|---------|---------------|----------|
| Gamma | Slide generation | SETUP NEEDED | Pro plan for API access |
| Hume AI | TTS narration | SETUP NEEDED | Growth plan ~$0.10/1K chars |
| Replicate | Custom image generation | Existing | Pay per generation |
| SCORM Cloud | Package testing | SETUP NEEDED | Free tier available |
| Moodle | LMS testing | Local Docker | Free |

---

## Skills Required

| Skill | Location | Purpose | Status |
|-------|----------|---------|--------|
| SOP Analyzer | `skills/sop-analyzer/` | Read client docs, extract training requirements | TO BUILD |
| SCORM Builder | `skills/scorm-builder/` | Assemble slides + audio + quizzes into SCORM packages | TO BUILD |

---

## MCP Tools Required

| Tool | Purpose | Status |
|------|---------|--------|
| Gamma MCP | Generate presentations via API | TO BUILD |
| Hume TTS MCP | Generate narration via API | TO BUILD |

Replicate MCP tools already exist.

---

## Per-Project File Structure

```
project-name/
├── brief/
│   └── analysis.md              # SOP Analyzer output
├── scripts/
│   ├── module-01-[title].md     # Module scripts
│   └── ...
├── configs/
│   ├── module-01.yaml           # SCORM assembly config
│   └── ...
├── assets/
│   ├── module-01/
│   │   ├── slide-01.png
│   │   ├── slide-01.mp3
│   │   └── ...
│   └── ...
├── builds/
│   ├── module-01.zip            # Final SCORM packages
│   └── ...
└── delivery/
    ├── deployment-guide.md
    └── answer-key.md
```

---

## Cost Per Module (Estimated)

| Item | Cost |
|------|------|
| Gamma slide generation | ~$0.50-1.50 (credits per generation) |
| Hume TTS (~20K chars/module) | ~$2.00 |
| Replicate custom images (if needed) | ~$0.50-3.00 |
| SCORM Cloud testing | Free |
| **Total production cost per module** | **~$3-7** |

Labor (script writing, review, QA) is the real cost. Tool costs are negligible.

---

## First Production Target

**AI Onboarding Course — Module 1: What AI Actually Is**

1. Script: DONE (in repo)
2. Gamma visual generation: PENDING (account setup)
3. Hume voice generation: PENDING (account setup, voice design)
4. SCORM assembly: PENDING (Skill build)
5. Testing: PENDING (SCORM Cloud account)
6. Target: testable Module 1 SCORM package
