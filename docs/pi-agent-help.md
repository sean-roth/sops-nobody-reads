╔══════════════════════════════════════════════════════════════════════════════╗
║                     SOPs MODULE BUILDER — Pi Agent                         ║
║                     "Training people actually want."                       ║
╚══════════════════════════════════════════════════════════════════════════════╝

USAGE
  pi                          Start interactive session
  pi -p "query"               Single prompt, print result
  pi --continue               Resume last session
  pi --resume                 Pick a session to resume

══════════════════════════════════════════════════════════════════════════════

PIPELINE COMMANDS                                          [module-pipeline]

  /new-client <n>          Scaffold a new client directory from template.
                              Creates: clients/<n>/ with all subdirectories,
                              blank expertise file, and intake checklist.

  /analyze <path>             STAGE 1 — Ingest client documents and produce a
                              training brief. Reads PDFs, DOCX, plain text.
                              Output: clients/<n>/briefs/<module>-brief.md
                              Auto-generates: client questionnaire
                              ⚠ GATE: Client Q&A must be resolved before Stage 2

  /script                     STAGE 2 — Generate narrative script from approved
                              brief. Uses SOPs house voice and 3-act structure.
                              Output: clients/<n>/scripts/<module>-script.md
                              ⚠ GATE: L&D review required before Stage 3

  /design [theme]             STAGE 3 — Decompose script into slides, apply theme.
                              Themes: editorial | retro | corporate
                              Output: clients/<n>/modules/<module>/
                              ⚠ GATE: SME review required before Stage 4

  /package [version]          STAGE 4 — Assemble SCORM package.
                              Versions: 1.2 (default) | 2004
                              Output: clients/<n>/packages/<module>.zip

  /learn                      STAGE 5 — Update expertise file with everything
                              learned during this module build. Runs self-improve
                              prompt against source documents and review feedback.

  /status                     Show pipeline progress for current client.
                              Displays: current stage, gate status, blockers,
                              review status, time elapsed per stage.

  /run-full                   Run all stages sequentially, pausing at each gate.
                              For experienced users who want one command.

══════════════════════════════════════════════════════════════════════════════

FEEDBACK COMMANDS                                          [feedback-loops]

  /ask-client                 Format client questionnaire from current brief.
                              Tiers questions: must-answer / recommended / nice-to-have
                              Output: clients/<n>/reviews/client-q&a.md

  /client-answers <path>      Ingest client responses. Updates brief, resolves
                              gaps and contradictions, opens Stage 2 gate.

  /request-ld-review          Format L&D review request from current script.
                              Includes: rubric, specific questions, free response.
                              Output: clients/<n>/reviews/ld-review-request.md

  /ld-feedback <path>         Ingest L&D reviewer feedback. Flags revisions,
                              updates expertise file with pedagogical patterns.

  /request-sme-review         Format SME review request from current design.
                              Includes: accuracy checklist, tribal knowledge prompts.
                              Output: clients/<n>/reviews/sme-review-request.md

  /sme-feedback <path>        Ingest SME feedback. Flags accuracy issues,
                              captures tribal knowledge in expertise file.

  /gate-status                Show all gates and their current state.
  /gate-override <stage>      Override a gate with confirmation. Logged to audit.
                              ⚠ Overrides are permanently recorded with reason.

══════════════════════════════════════════════════════════════════════════════

IMAGE PIPELINE COMMANDS                                    [image-pipeline]

  /generate-manifest        Read script visual notes + LXD decomposition,
                              produce IMAGE-PROMPTS.md with one prompt per
                              slide. Style suffix and visual through-line
                              are pre-applied from the style manifest.

  /generate-images            Batch-generate all images via Replicate API.
                              Output: clients/<n>/modules/<module>/img/
                              Files named: s01-slug.jpg, s02-slug.jpg, ...

  /review-images              Generate HTML grid of all images alongside
                              their slide text for rapid visual QA.
                              Open in browser, flag images that need regen.

  /regenerate <slides>        Re-run only flagged images with optional
                              prompt tweaks. e.g., /regenerate 5,8,14

  /match-style <path>         Analyze existing module images and extract a
                              style manifest for new modules to match.
                              For extending an existing client's library.

  /set-style <manifest>       Apply a style manifest to the current module.

══════════════════════════════════════════════════════════════════════════════

REPORTING & AUDIT COMMANDS                                 [audit-trail]

  /audit                      Generate full audit report for current module.
                              See AUDIT REPORT section below for contents.
                              Output: clients/<n>/audit/<module>-audit.md

  /audit --format docx        Export audit report as Word document.
                              For client delivery and regulatory filing.

  /trace <slide-number>       Trace a single slide back through the full chain:
                              slide → script section → brief section → source doc
                              Shows: page number, paragraph, exact source text.

  /trace --all                Trace every slide. Produces a complete traceability
                              matrix. Output: audit/<module>-traceability.md

  /coverage                   Compliance coverage report. Maps every regulatory
                              requirement found in source docs to:
                              - Which slide(s) teach it
                              - Which quiz question(s) test it
                              - Whether it was reviewed by SME
                              Flags: requirements with NO coverage (critical gap)

  /coverage --regulation <id> Filter coverage to a specific regulation.
                              e.g., /coverage --regulation "OSHA 1910.147"

  /decisions                  Decision log. Every non-trivial choice the agent
                              made during this module build, with reasoning:
                              - Why this slide type (not that one)
                              - Why this theme
                              - Why this quiz question tests this objective
                              - Where the agent was uncertain and what it chose

  /changelog                  Show all changes made after each review cycle.
                              Diff format: what the reviewer said → what changed.

  /timeline                   Chronological view of the entire module build.
                              Every stage entry/exit, every review request/response,
                              every gate pass/override, every expertise update.
                              Timestamps, durations, participants.

══════════════════════════════════════════════════════════════════════════════

AUDIT REPORT CONTENTS                            (generated by /audit)

  The audit report is the single document that answers: "How was this
  training built, by whom, from what sources, and can you prove it?"

  1. MODULE SUMMARY
     Title, version, audience, duration, completion criteria, date produced.

  2. SOURCE DOCUMENT INVENTORY
     Every input document: filename, date, version, page count, hash (SHA-256).
     Proves: which documents were used and that they haven't changed since.

  3. TRACEABILITY MATRIX
     Every slide mapped to: script section → brief section → source document
     with page/paragraph reference. Nothing in the training is unsourced.
     Proves: all training content derives from approved source material.

  4. COMPLIANCE COVERAGE MAP
     Every regulatory requirement identified in source docs, mapped to:
     - Slide(s) that teach it (with slide number)
     - Quiz question(s) that test it (with question text)
     - Whether SME validated it (with reviewer name + date)
     Flags: any requirement with zero coverage.
     Proves: regulatory obligations are addressed and tested.

  5. REVIEW HISTORY
     Complete record of all human reviews:
     - Client Q&A: questions asked, answers received, date, respondent
     - L&D review: rubric scores, feedback text, revisions made, reviewer
     - SME review: accuracy flags, tribal knowledge captured, reviewer
     Proves: qualified humans reviewed the training at each stage.

  6. DECISION LOG
     Every significant agent decision with reasoning:
     - Slide type assignments and rationale
     - Theme selection and rationale
     - Quiz question design choices
     - Content that was excluded and why
     - Contradictions resolved and how (always by client, never by agent)
     Proves: decisions are explainable, not black-box.

  7. QUALITY METRICS
     - Reading level (Flesch-Kincaid)
     - Estimated completion time
     - Quiz question count and type distribution
     - Slide count by type
     - Cognitive load distribution (dense vs. breathing slides)

  8. GATE LOG
     Every pipeline gate: passed/overridden, timestamp, by whom.
     If overridden: reason recorded (mandatory field).
     Proves: the review process was followed (or deviations are documented).

  9. EXPERTISE DELTA
     What the agent learned during this module build.
     Diff of expertise file before/after.
     Proves: the system improves over time (valuable for ongoing contracts).

  10. REVISION HISTORY
      If the module was revised after initial delivery:
      what changed, why, who requested it, new audit entries.

══════════════════════════════════════════════════════════════════════════════

EXPERTISE COMMANDS                                    [expertise-manager]

  /expertise                  Display current client's expertise file.
  /expertise <client>         Display a specific client's expertise file.
  /expertise-sync             Run self-improve prompt. Syncs expertise against
                              source documents and review feedback.
  /expertise-diff             Show changes since last sync.
  /industry <n>            Display industry-level expertise file.
                              e.g., /industry credit-unions

══════════════════════════════════════════════════════════════════════════════

QUALITY & SAFETY                                         [quality-gate]

  HARD BLOCKS (cannot proceed, no override)
  ├── Quiz question with no traceable learning objective
  ├── Compliance content not sourced to a specific document
  └── Module exceeds 30 slides without a split recommendation

  SOFT BLOCKS (override with /gate-override, logged to audit)
  ├── Proceeding to next stage without required review
  ├── Module estimated duration exceeds 20 minutes
  └── Reading level exceeds target audience specification

  WARNINGS (displayed, not blocking)
  ├── More than 3 keypoint slides in a row (pacing issue)
  ├── Quiz has fewer than 3 or more than 10 questions
  ├── Cold open scenario not validated by SME
  ├── Expertise file is stale (no sync in 30+ days)
  └── Source document hash changed since analysis (docs were updated)

══════════════════════════════════════════════════════════════════════════════

SHORTCUTS

  Ctrl+L          Switch model mid-session
  Ctrl+P          Cycle favorite models
  Ctrl+C          Clear editor
  Ctrl+Shift+A    Open agents manager overlay (if pi-subagents installed)
  Escape          Cancel current action
  Shift+Enter     Multi-line input (Ctrl+Enter on Windows Terminal)
  @               Fuzzy file search (respects .gitignore)
  Tab             Path completion

══════════════════════════════════════════════════════════════════════════════

WORKFLOW REMINDERS

  START OF EVERY CLIENT ENGAGEMENT
  1. /new-client <n>
  2. Drop their documents into clients/<n>/intake/
  3. /analyze clients/<n>/intake/
  4. Read the brief. Read it again. The brief is the contract.

  THE GOLDEN RULE
  The agent NEVER resolves contradictions. The agent NEVER invents
  compliance requirements. The agent NEVER silently fills gaps.
  If the source docs don't say it, the training doesn't teach it.
  Gaps become questions. Contradictions become client decisions.

  BEFORE EVERY DELIVERY
  1. /audit                   (generate the full report)
  2. /coverage                (verify regulatory coverage — zero gaps)
  3. /trace --all             (verify every slide has a source)
  4. Review the audit report yourself. You are the final gate.

  AFTER EVERY MODULE
  1. /learn                   (update expertise file)
  2. /expertise-diff          (review what the agent learned)
  3. Commit the expertise file to git

  WHEN SOMETHING FEELS WRONG
  Trust the feeling. Check:
  - /trace <slide>            (is this sourced or hallucinated?)
  - /decisions                (why did the agent do this?)
  - /coverage                 (is something missing?)
  The audit trail exists so you never have to wonder.

══════════════════════════════════════════════════════════════════════════════

WARNINGS

  ⚠ THE AGENT IS NOT A COMPLIANCE OFFICER.
    The agent identifies regulatory references in source documents and maps
    them to training content. It does not interpret regulations, determine
    applicability, or guarantee compliance. The client's compliance team
    and/or legal counsel must validate the coverage map.

  ⚠ THE AGENT IS NOT A SUBJECT MATTER EXPERT.
    SME review exists because the agent will confidently produce training
    that is technically plausible but practically wrong. The SME catches
    "correct but nobody does it that way" — the most dangerous kind of error.

  ⚠ EXPERTISE FILES ARE MENTAL MODELS, NOT TRUTH.
    The expertise file is the agent's working memory. It can be wrong,
    outdated, or incomplete. Source documents are always the source of
    truth. The expertise file helps the agent work faster — it does not
    replace verification.

  ⚠ GATE OVERRIDES ARE PERMANENT.
    Every gate override is logged to the audit report with timestamp and
    reason. If a module is later questioned, the override is visible.
    Override when you have good reason. Never override to save time.

  ⚠ SOURCE DOCUMENT HASHES MATTER.
    The audit report records SHA-256 hashes of every source document.
    If a client updates their SOP after training is built, the hash
    mismatch warning tells you the training may be stale. This is a
    feature, not a bug — it's how you catch drift.

══════════════════════════════════════════════════════════════════════════════

CONFIGURATION

  Gate strictness:
    .pi/config.json → "gates": "strict" | "warn" | "open"

  Default theme:
    .pi/config.json → "default_theme": "editorial" | "retro" | "corporate"

  Default SCORM version:
    .pi/config.json → "scorm_version": "1.2" | "2004"

  Reading level target:
    .pi/config.json → "reading_level": 8  (Flesch-Kincaid grade level)

  Max module duration (minutes):
    .pi/config.json → "max_duration": 20

  Max slides per module:
    .pi/config.json → "max_slides": 25

  Expertise sync reminder (days):
    .pi/config.json → "expertise_stale_days": 30

══════════════════════════════════════════════════════════════════════════════

EXAMPLES

  First course for a new client:
    > /new-client thatcher-company
    > /analyze clients/thatcher-company/intake/
    > /ask-client
    [send questionnaire to client, wait for answers]
    > /client-answers clients/thatcher-company/reviews/client-answers.md
    > /script
    > /request-ld-review
    [send to L&D reviewer, wait for feedback]
    > /ld-feedback clients/thatcher-company/reviews/ld-feedback-01.md
    > /design editorial
    > /generate-manifest
    > /generate-images
    > /review-images
    [open grid in browser, flag any misses]
    > /regenerate 5,12
    > /request-sme-review
    [send to retired plant manager, wait for feedback]
    > /sme-feedback clients/thatcher-company/reviews/sme-feedback-01.md
    > /package
    > /audit
    > /learn

  Adding a module to an existing client's library:
    > /match-style clients/thatcher-company/modules/loto-01/img/
    > /analyze clients/thatcher-company/intake/chemical-safety-sop.pdf
    [abbreviated cycle — expertise file accelerates everything]
    > /script
    > /design editorial
    > /generate-manifest
    > /generate-images
    [style manifest ensures visual consistency with existing modules]
    > /review-images

  Quick check on a suspicious slide:
    > /trace 14
    Slide 14 (keypoint): "Lockout/tagout requires two-person verification"
    ← Script §2.3: "The buddy system isn't just policy — it's physics..."
    ← Brief §4: "LOTO two-person requirement (MUST-KNOW, OSHA 1910.147)"
    ← Source: safety-manual-v3.pdf, page 12, paragraph 3
    ✓ Sourced. Reviewed by SME (J. Martinez, 2026-03-22).

  Proving compliance coverage to an examiner:
    > /coverage --regulation "OSHA 1910.147"
    OSHA 1910.147 — Control of Hazardous Energy (Lockout/Tagout)
    ┌─────────────────────────┬──────────┬──────────┬───────────┐
    │ Requirement             │ Slide(s) │ Quiz Q#  │ SME ✓     │
    ├─────────────────────────┼──────────┼──────────┼───────────┤
    │ Energy control procedure│ 8, 9     │ Q3       │ ✓ 03/22   │
    │ Training requirements   │ 11       │ Q4       │ ✓ 03/22   │
    │ Periodic inspection     │ 14       │ Q6       │ ✓ 03/22   │
    │ Group lockout           │ 15, 16   │ Q7       │ ✓ 03/22   │
    │ Shift change procedure  │ —        │ —        │ —         │
    └─────────────────────────┴──────────┴──────────┴───────────┘
    ⚠ GAP: "Shift change procedure" has NO coverage.
      Source: safety-manual-v3.pdf, page 18
      Action: Add content or document exclusion with client approval.

══════════════════════════════════════════════════════════════════════════════

  SOPs Nobody Reads LLC — sean@seanroth.ai — seanroth.ai
  Built with Pi (shittycodingagent.ai) + Anthropic API

══════════════════════════════════════════════════════════════════════════════
