# SOPsNobodyReads.com

> Turn documents nobody reads into training that sticks.

---

## What This Is

SOPs Nobody Reads converts company documentation into SCORM-compliant training modules that employees actually retain. We don't make training people enjoy — we make mandatory training that works.

## Production Pipeline

See [`workflows/PRODUCTION-PIPELINE.md`](workflows/PRODUCTION-PIPELINE.md) for the full technical workflow.

```
Client SOPs → Analysis → Script → Visuals → Audio → SCORM Assembly → Testing → Delivery
```

| Stage | Tool | Output |
|-------|------|--------|
| 1. Intake & Analysis | Claude + SOP Analyzer Skill | Structured training brief |
| 2. Script Development | Claude + Sean (collaborative) | Module scripts in markdown |
| 3. Visual Production | Gamma API + Replicate | PPTX slides / image assets |
| 4. Audio Production | Hume AI (Octave TTS) | MP3 narration per slide |
| 5. SCORM Assembly | Claude + SCORM Builder Skill | SCORM .zip packages |
| 6. Testing | SCORM Cloud + Moodle | Validated, bug-free packages |
| 7. Delivery | Google Drive + Stripe | Final files + invoice |

## Repository Structure

```
├── courses/
│   └── ai-onboarding/           # First product: AI onboarding course
│       ├── scripts/               # Module scripts (Modules 1-6)
│       └── MARKET-POSITIONING.md  # Competitive positioning
├── docs/
│   ├── landing-page-copy.md     # Website copy
│   ├── intake-form.md           # Customer intake questions
│   ├── proposal-template.md     # Proposal template
│   ├── pricing.md               # Pricing logic
│   ├── outreach-templates.md    # Email templates (6 hooks)
│   └── setup-checklist.md       # Launch checklist
├── workflows/
│   ├── PRODUCTION-PIPELINE.md   # Full production workflow
│   ├── delivery-process.md      # Client delivery process
│   └── claude-prompts.md        # AI prompts for SOP analysis
├── skills/
│   ├── sop-analyzer/            # Skill: analyze client SOPs
│   │   └── SKILL.md
│   └── scorm-builder/           # Skill: assemble SCORM packages
│       ├── SKILL.md
│       ├── references/
│       │   ├── manifest-reference.md
│       │   └── scorm-api-reference.md
│       └── assets/                # Player template (TO BUILD)
│           ├── player-template/
│           └── themes/
└── tools/
    ├── gamma-mcp/               # MCP server: Gamma API
    │   ├── server.py
    │   ├── requirements.txt
    │   └── README.md
    └── hume-tts-mcp/            # MCP server: Hume AI TTS
        ├── server.py
        ├── requirements.txt
        └── README.md
```

## Tool Accounts

| Service | Purpose | Status |
|---------|---------|--------|
| Gamma | Slide/visual generation | SETUP NEEDED |
| Hume AI | TTS narration (Octave) | SETUP NEEDED |
| Replicate | Custom image generation | Active |
| SCORM Cloud | Package testing | SETUP NEEDED |
| Stripe | Payments | Active (connected to Mercury) |
| Google Workspace | Email + Drive | Active |

## Tech Stack Cost

| Item | Cost |
|------|------|
| Google Workspace | $6/mo |
| Domain | ~$12/yr |
| Gamma Pro (API access) | TBD |
| Hume AI Growth | ~$0.10/1K chars |
| Replicate | Pay per generation |
| **Per-module production cost** | **~$3-7** |

## Current Status

### Infrastructure ✅
- [x] Domain: sopsnobodyreads.com
- [x] Landing page live (custom scoping, no pricing)
- [x] Google Form intake → Sheet pipeline
- [x] Stripe → Mercury connected
- [x] Email templates (6 hooks, personalization rules)
- [x] Outreach warmup started

### AI Onboarding Course (First Product)
- [x] All 6 module scripts written
- [x] 24 quiz questions
- [x] Market positioning complete
- [ ] Gamma account + visual generation
- [ ] Hume AI account + voice design
- [ ] SCORM player template built
- [ ] Module 1 test package assembled
- [ ] Testing on SCORM Cloud + Moodle

### Production Pipeline
- [x] Full workflow documented
- [x] SOP Analyzer Skill created
- [x] SCORM Builder Skill created (references done, player template pending)
- [x] Gamma MCP tool built
- [x] Hume TTS MCP tool built
- [ ] SCORM player template (HTML/CSS/JS)
- [ ] End-to-end pipeline test

---

*"Your team will complete this like any other mandatory training. The difference is they'll actually remember it."*
