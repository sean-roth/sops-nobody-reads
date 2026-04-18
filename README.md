# SOPs Nobody Reads

Course content and production pipeline documentation for the SOPs Nobody Reads compliance training system.

The platform itself (Laravel app with SHA-256 audit chain) lives in a separate repository. This repo contains the training courses, production workflow docs, and custom Claude skills that power the content pipeline.

## Live Courses

**LOTO Safety Training** — Three-module interactive lockout/tagout course with comprehension checks, built from a 24-page OSHA procedure in one weekend.
→ [View course](https://sean-roth.github.io/sops-nobody-reads/courses/loto/builds/index.html)

**AI Onboarding: A Course for Humans** — Six-module course on human-AI interaction fundamentals. Grounded in cognitive science research on human-AI perception. Learner outcome: a working context document. Backward design — the course exists to produce that artifact, not to lecture.
→ [View course](https://sean-roth.github.io/sops-nobody-reads/courses/ai-onboarding/builds/index.html)

## Production Pipeline

Content is produced through a set of composable custom Claude skills:

```
Client SOPs → SOP Analyzer → Script Writer → LXD → Panel Logic → Aesthetic Design → Course Output
```

Each skill specializes Claude for one stage of the production workflow. Modular architecture allows individual stages to be updated without rebuilding the pipeline.

| Skill | Purpose |
|-------|---------|
| SOP Analyzer | Extract training requirements from client documentation |
| Script Writer | Generate narrative training scripts in the SOPs house voice |
| LXD | Decompose scripts into typed slide structures with pedagogy decisions |
| Panel Logic | Apply sequential-art methodology for visual sequencing |
| Aesthetic Design | Apply visual themes to the module player |

## Repository Structure

```
├── courses/
│   ├── loto/                    # LOTO safety training course
│   │   └── builds/              # Published HTML (GitHub Pages)
│   └── ai-onboarding/           # AI onboarding course
│       ├── scripts/             # Module scripts (Modules 1-6)
│       └── builds/              # Published HTML (GitHub Pages)
├── workflows/
│   └── PRODUCTION-PIPELINE.md   # Full production workflow
├── skills/
│   ├── sop-analyzer/            # Skill: analyze client SOPs
│   └── scorm-builder/           # Skill: assemble training packages
└── tools/
    └── ...                      # MCP server integrations
```

## Stack

Custom Claude Skills · Claude Code · HTML/CSS · GitHub Pages

## Links

[Portfolio](https://seanroth.ai) · [Platform details](https://seanroth.ai/resume)
