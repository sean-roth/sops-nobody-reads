# LOTO Content Pass — Implementation

**Date:** 2026-07-21
**For:** a Sonnet instance with repo access (GitHub MCP).
**Governing docs:** the Durability Standard (§8 additions ledger, for C), Slide-Type Standard v0.2 (§S3, for B and C), course-audit-SPEC.
**Reference:** the proposal — `courses/loto/CONTENT-PASS-PROPOSAL-2026-07-21.md` — carries the full source grounding for every item.
**Mode: IMPLEMENT** the four decisions below. Sean has ruled on each. Apply each change to the **module JSON and the shipped player** (`module-0X/index.html`), kept in sync exactly as the shape passes did. **Branch off `main`; do not commit to `main`; do not merge.** One decision is still open — the exact wording of the new C slide — surface it prominently for Sean.

---

## The decisions — implement exactly these, and nothing else

### A — M2 "Step One — Notify" → "Notify"
Sean chose Option 2: drop the step number. In Module 2, change **slide 5's kicker** from `"Step One — Notify"` to `"Notify"`. Leave slide 4 (`"Step One — Prepare"`) unchanged. Rationale (from the proposal): the "Step N" labels sit beside CFR citations and read as the regulation's own numbering, and notify is not one of the six (d)-steps — it's (c)(9) — so a step number there is a fidelity error. Only that one kicker changes.

### B — relocate the correction out of the misconception (M1)
1. Move the sentence **"Lockout/tagout isn't just a procedure — it's a barrier."** — verbatim — from Module 1 **slide 5's** body to the **end of slide 4's** body (after "There's a difference. And the difference is everything.").
2. Trim the now-dangling leading **"And"** from slide 5's remaining body, so it opens "When people picture the hazard, they usually picture one thing: electricity…". (This is the one approved word-level cleanup — flag it in the change note as such.)

Every claim preserved: one sentence relocated verbatim, one connective trimmed. Nothing invented or cut.

### C — add the held-up fourth-role slide (M3), and create the additions ledger
Both parts are approved (Sean folded this in to clear the list).

1. **New slide.** Insert a `misconception-held-up` slide in Module 3 **between slides 19 and 20**, stating the "fourth role" belief *before* slide 20 corrects it — matching M1's misconception pattern (short, quoted, held-up, visually lighter than a teaching-caption). The belief is validated as real (the proposal confirms it three ways: 1910.147(b)/1910.399, the audit-spec's own "four roles" founding-error example, and the M3 script pre-empting it). **Draft the exact wording, and surface it prominently in the change note as the one item awaiting Sean's confirmation** — new content gets his eyes on the actual words. Sonnet's illustrative draft, to refine or keep: kicker "Where People Miscount," heading "Authorized. Affected. Other. And… qualified person?" (body optional — a bare heading, like M1's, is fine).

2. **Additions ledger.** The course has no additions-ledger artifact yet (Durability §8; noted in AUDIT-2026-07-15). Create it — `courses/loto/ADDITIONS-LEDGER.md`, following §8's structure — with this new slide as its **first entry**: category *pedagogical scaffolding*, with the validation recorded (the belief is a real misconception per the sources above). Log only this one addition. Note at the top that retroactively cataloging the course's prior scaffolding is a separate task, not done here.

### D — reword the presumptive line (M1)
Sean chose Option 2. Replace Module 1 **slide 6's body first sentence** — "You've worked around most of these for years without needing a list." — with:

> "It's easy to assume you already know these — but the list matters because the one you're not thinking about is the one that gets you."

Keep the rest of the body verbatim. This is voice/framing (unsourced scaffolding per §8), not a source claim.

---

## Verify

- **Diff shows only the four changes:** A (one kicker), B (one sentence relocated + one "And" trimmed), C (one new M3 slide + the new `ADDITIONS-LEDGER.md`), D (one framing sentence reworded). Nothing else moved in any module.
- **No sourced claim altered.** A, B, and D touch only labels and scaffolding/framing — confirm no atom's meaning changed. C is a pure insertion; every existing slide untouched.
- **L1 structural check re-run:** Module 2's "Step" sequence is now clean (the duplicate is resolved — "Notify" no longer claims a step number).
- **Player renders:** the new M3 slide displays as a held-up misconception (lighter, quoted, matching M1) in both modes; the relocated and reworded M1 text renders correctly in both modes.

---

## Hand back

Branch off `main` (don't stack). Hand back the branch, a change note documenting each of the four changes with before/after, and — **prominently** — the exact wording of the new C slide, flagged as the one open decision awaiting Sean's confirmation. Do **not** merge; the live demo waits on his sign-off.