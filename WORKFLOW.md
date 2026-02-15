# SOPs Nobody Reads — Production Manual

How the pieces fit together. Read this first when starting any task in this repo.

## What This Business Does

SOPs Nobody Reads converts corporate documentation (SOPs, policies, handbooks, compliance docs) into narrative training modules that people actually complete. The deliverable is a self-contained HTML player that works standalone in a browser or inside an LMS as a SCORM package.

The flagship product is a 6-module AI onboarding course. Client work follows the same pipeline but starts from their documentation.

## The Skills

Five skills, each handling one discipline. They chain together but can be used independently.

| Skill | What It Does | Input | Output |
|-------|-------------|-------|--------|
| `sop-analyzer` | Reads client docs, extracts training requirements | Client SOPs, policies, handbooks | Structured training brief |
| `script-writing` | Writes narrative training scripts | Training brief or creative direction from Sean | Markdown script with narration, visuals, quiz |
| `lxd` | Decomposes scripts into slide structures | Finished script | MODULE JSON data object |
| `aesthetic-design` | Applies visual theme to slide structure | MODULE JSON + theme selection | Complete HTML player |
| `scorm-builder` | Wraps HTML player for LMS delivery | HTML player + module config | SCORM zip package |

## Typical Workflows

### Client Training Module (full pipeline)

```
Client docs → sop-analyzer → training brief
                                    ↓
                    Sean reviews, adds creative direction
                                    ↓
                         script-writing → script draft
                                    ↓
                          Sean edits, gives feedback
                                    ↓
                              lxd → MODULE JSON
                                    ↓
                      aesthetic-design → HTML player
                                    ↓
                       scorm-builder → SCORM package
```

Every handoff to Sean is a review/approval point. Don't skip them.

### AI Onboarding Course Module

Scripts already exist in `courses/ai-onboarding/scripts/`. Start at the LXD step:

```
Existing script → lxd → MODULE JSON → aesthetic-design (Editorial theme) → HTML player
```

### Quick Demo for a Prospect

Skip SCORM. The HTML player IS the demo:

```
Brief conversation with Sean about client's pain point
    → script-writing (short, 1 module)
    → lxd → aesthetic-design (Corporate theme with client brand colors)
    → HTML file, email it or embed on landing page
```

### Script Revision

Sean has feedback on a draft. Read the script-writing skill, apply the feedback, preserve Sean's `<!-- editorial comments -->`.

### New Theme for a Client

Read aesthetic-design skill. Start from Corporate theme spec. Swap CSS custom properties for client brand. Test all slide types.

## Where Things Live

```
sops-nobody-reads/
├── skills/
│   ├── sop-analyzer/          # Client doc analysis
│   ├── script-writing/        # Narrative voice + structure
│   ├── lxd/                   # Learning experience design
│   ├── aesthetic-design/       # Visual themes + player CSS
│   └── scorm-builder/         # LMS packaging
├── courses/
│   └── ai-onboarding/
│       ├── scripts/           # Module 1-6 markdown scripts
│       └── builds/
│           └── module-01/     # Completed HTML player
├── tools/
│   ├── gamma-mcp/             # Gamma API (not currently needed)
│   └── hume-tts-mcp/          # Hume AI voice generation
├── workflows/
│   └── PRODUCTION-PIPELINE.md # Detailed 7-stage pipeline reference
└── WORKFLOW.md                # ← You are here
```

## Key Principles

**Sean writes the thesis. Claude writes the words.** Sean provides the insight, understanding, creative direction, and editorial feedback. Claude generates prose, structure, and code. The scripts are collaborative — don't try to replace Sean's voice, amplify it.

**One idea per screen.** This is the SOPs instructional philosophy. It applies to slides, to script sections, to quiz questions. When in doubt, split it.

**The HTML player is the product.** No LMS required for demos, sales, or the lead magnet. SCORM wrapping is only needed when a client's LMS requires it. The player works standalone in any browser.

**Theme matches register, not subject.** Editorial theme for serious/transformative content. Retro for marketing/playful content. Corporate for client-branded deliverables. The content's emotional weight determines the theme, not the topic.

**Skills are disciplines, not steps.** You might need script-writing for a revision without touching LXD. You might need aesthetic-design to build a client theme without any new content. Read the skills you need for the task at hand — don't force the full pipeline when a single skill applies.

## MCP Tools (when installed)

- **Hume TTS** (`tools/hume-tts-mcp/`) — Voice generation for narration audio. Not yet integrated into the player; audio layer coming after Module 1 visual approval.
- **Gamma** (`tools/gamma-mcp/`) — Slide deck generation. Currently not needed — we build HTML directly. May be useful for quick client-facing pitch decks separate from training modules.

## What's Next (as of Feb 2026)

Immediate:
- Sean reviewing Module 1 HTML player for aesthetic/content feedback
- Remaining Modules 2-6 need the LXD → aesthetic-design pipeline run against existing scripts
- Audio production pipeline (Hume TTS integration) pending

Business:
- AI onboarding course Part 1 (Modules 1-3) is the free lead magnet
- Part 2 (Modules 4-6) is the paid product
- Client outreach starting — the HTML player doubles as the sales demo
- Landing page: sopsnobodyreads.com
