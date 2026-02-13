---
name: sop-analyzer
description: "Analyze client SOP documents to extract training requirements. Use when receiving client documentation (policies, procedures, handbooks, compliance docs, safety manuals) that needs to be converted into training modules. Reads corporate documents and produces a structured brief identifying what employees need to know, recommended module structure, knowledge gaps, and questions for the client."
---

# SOP Analyzer

Analyze client documentation and produce a structured training brief.

## Input

One or more corporate documents: policies, procedures, handbooks, compliance requirements, safety manuals, onboarding materials, process documentation.

## What to Extract

### Must-Know Content
- Policies employees are required to follow
- Procedures with specific steps
- Compliance and regulatory requirements
- Safety protocols and emergency procedures
- Role-specific responsibilities
- Deadlines, schedules, reporting requirements

### What to Note but Not Train On
- Organizational context (helps set the scene but isn't testable)
- Historical background (may be useful for narrative)
- Contact information and resources (reference material, not training)

### What to Ignore
- Document revision histories
- Legal boilerplate and disclaimers (unless legally required in training)
- Formatting artifacts and table of contents
- Internal document control numbers
- Distribution lists
- Signatures and approval chains

## What to Look For

### Knowledge Gaps
Corporate documents frequently assume knowledge they never state:
- Acronyms used without definition
- References to other documents not provided
- Procedures that skip steps ("as per standard practice")
- Role references without explaining what that role does
- Tribal knowledge assumptions ("everyone knows" situations)

Flag these. They become questions for the client and often become the most valuable parts of the training.

### Contradictions
- Policies that conflict across documents
- Procedures described differently in different places
- Outdated references alongside current ones

Flag these for client clarification. Never resolve contradictions — the client decides which version is correct.

### Compliance Criticality
Identify content that is legally or regulatorily required versus best-practice recommendations. This affects:
- What MUST be in the training (non-negotiable)
- What SHOULD be in the training (recommended)
- What COULD be in the training (nice to have)
- Quiz questions on compliance content need higher scrutiny

## Output Format

Produce a structured brief in markdown:

```markdown
# Training Brief: [Client Name]

## Document Inventory
| Document | Pages | Coverage | Notes |
|----------|-------|----------|-------|

## Target Audience
- Who needs this training
- What they likely already know
- What context they're missing

## Must-Know Content
### [Topic 1]
- Key points
- Source document(s)
- Compliance requirement: Yes/No

### [Topic 2]
...

## Recommended Module Structure
| Module | Title | Content | Est. Duration |
|--------|-------|---------|---------------|

## Learning Objectives
After completing this training, learners will be able to:
1. ...

## Knowledge Gaps Found
- [Gap]: [Which document, what's missing]

## Contradictions Found
- [Contradiction]: [Document A says X, Document B says Y]

## Questions for Client
1. [Specific question about unclear content]

## Narrative Opportunities
Potential scenarios, characters, or story angles:
- [Opportunity]: [Why it would work]
```

## Guidelines

- Be specific. "Employees must follow safety procedures" is useless. "Employees must perform lockout/tagout before servicing equipment per OSHA 1910.147" is actionable.
- Distinguish between what the document SAYS and what the document MEANS. Corporate writing often buries the actual requirement in passive voice and qualifiers.
- Think like a trainer, not a summarizer. The question is always: "What does someone need to be able to DO after this training?"
- Keep the brief under the length of the source documents. If the brief is longer than the originals, it's not a brief.
- The narrative opportunities section is for Sean's use in script development. Note potential characters, scenarios, or story angles that could make the content engaging without specifying how — that's the creative work.
