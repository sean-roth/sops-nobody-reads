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

See the full document at: /mnt/user-data/outputs/sops-module-builder-architecture.md

This is a placeholder commit — the full 800+ line architecture document is maintained
in the local working copy and available via Claude Desktop. The complete document covers:

- 5-stage pipeline with 3 feedback loops
- Image generation pipeline (Stage 3.5)
- Reporting & audit trail (hash chain, traceability, compliance coverage)
- Pi agent configuration (directory structure, AGENTS.md, 6 extensions)
- Eval strategy
- 7-day build plan
- Pricing model (tiered by company size, mid-market focus)
- Competitive positioning
- Strategic notes
