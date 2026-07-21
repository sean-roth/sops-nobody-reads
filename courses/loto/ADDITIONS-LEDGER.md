# Additions Ledger — LOTO Course

Per Durability Standard §8: everything in the course that is not sourced from an atom is logged here in one of three categories — **source claims** (must trace to atoms; an unanchored source claim is a defect, not a ledger entry), **pedagogical scaffolding** (invented examples, scenarios, characters, worked cases — validated as if it were a claim: every scenario must be consistent with all in-scope atoms and contradict none), and **pure narrative** (voice, mood, imagery, transitions — reviewed for the one failure mode narrative has: displacing substance).

**Started 2026-07-21, with the Content Pass.** This ledger did not exist before — `AUDIT-2026-07-15.md` noted the gap. **This entry is the first; it is not a retroactive catalog of the course's existing scaffolding** (the misconception slides, scenes, and worked examples already shipped across all three modules). Cataloging what's already live is a separate, larger task, not done here — this ledger starts from the moment it was created forward.

---

## 1. M3 misconception-held-up — "the fourth-role belief"

**Category:** Pedagogical scaffolding.

**What was added:** a new `misconception-held-up` slide in `module-03.json` / `module-03/index.html`, inserted between the existing "Other Employees" (definition) and "A Different Standard" (reveal) slides:

> kicker: `"Where People Miscount"`
> heading: `"Authorized. Affected. Other.\nAnd qualified person makes four."`
> body: `"You hear the term constantly around electrical work — it's easy to assume it's a fourth role here too."`

**Why it was added:** the deck already corrected a "fourth-role" belief (the reveal immediately following this slide: "'Qualified person' lives in electrical safety") but never stated the belief itself first — the correction landed with nothing visibly being corrected. `CONTENT-PASS-PROPOSAL-2026-07-21-RESPONSE.md`, Item C, has the full research.

**Validation (per §8 — scaffolding checked as if it were a claim):**
- **Consistent with all in-scope atoms; contradicts none.** `29 CFR 1910.147(b)` defines only *authorized employee* and *affected employee*; "other employees" is the residual training category from `(c)(7)(i)(C)`. `29 CFR 1910.399` (Subpart S) separately defines *qualified person* for electrical safety work — a different standard, a different question. The new slide's belief ("qualified person makes four") is the exact belief the immediately-following reveal already corrects; the new slide adds no claim of its own, source-derived or otherwise — it states a belief in order to hold it up, not to assert it.
- **Is it a genuine misconception, not a strawman invented to justify the container?** Two pieces of evidence: `docs/standards/course-audit-SPEC.md` names "four roles" for three as one of this project's own founding memory-blend errors — its own canonical example of the failure class the audit discipline exists to catch. And the M3 script's narration (`scripts/module-03-when-simple-gets-complicated.md`) pre-empts the same belief without ever stating it as a line: *"That's three roles, not four."* ... *"'Qualified person' isn't a fourth lockout/tagout role."* The script clearly expects a learner who'd think "four" — this addition makes that expectation explicit instead of implicit.
- **Register check:** rendered via the existing `misconception-held-up` container (Slide-Type Standard v0.2 §S4) — same treatment as M1's only other instance of this container: quoted, set back, visually lighter than any `teaching-caption` or `reveal`. No new CSS or render logic; the container already existed and is already shape-pass-verified in both light and dark mode.

**Status:** implemented per Sean's decision (`CONTENT-PASS-IMPLEMENTATION-2026-07-21.md`, Item C). **The exact wording above is the one item still awaiting Sean's confirmation** — flagged prominently in the change note for this pass, not treated as final.
