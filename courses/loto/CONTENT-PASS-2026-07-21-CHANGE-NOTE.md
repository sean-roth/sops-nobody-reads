# LOTO Content Pass — Implementation Change Note

**Date:** 2026-07-21
**Branch:** `claude/content-pass-proposal-2026-07-21` (off `main`, not merged — live demo unchanged pending sign-off)
**Reference:** `courses/loto/CONTENT-PASS-PROPOSAL-2026-07-21-RESPONSE.md` (the full source grounding for every item) and `CONTENT-PASS-IMPLEMENTATION-2026-07-21.md` (the four decisions this note implements)
**Screenshots:** `courses/loto/CONTENT-PASS-2026-07-21-screenshots/`

---

## ⚠️ One open decision — read this first

**Item C's new slide wording is a draft, not a confirmed final.** Sean approved *adding* a held-up slide for the fourth-role belief; the exact words below are Sonnet's illustrative draft, carried into the implementation because the decision doc said to draft it and flag it, not to treat it as settled. This is new content (not source-derived, though validated against source) — it needs Sean's eyes on the actual copy before it's final:

> kicker: **"Where People Miscount"**
> heading: **"Authorized. Affected. Other.\nAnd qualified person makes four."**
> body: **"You hear the term constantly around electrical work — it's easy to assume it's a fourth role here too."**

Everything else in this pass is a direct, literal implementation of an approved decision with no wording judgment left open.

---

## What changed — four items, nothing else

### A — M2 "Step One — Notify" → "Notify"

`module-02.json` / `module-02/index.html`, slide 5's `kicker` only:

| | |
|---|---|
| Before | `"Step One — Notify"` |
| After | `"Notify"` |

Slide 4 (`"Step One — Prepare"`) is untouched. This resolves the L1 duplicate-step-label defect (below). No claim, heading, or body changed.

### B — Relocated the correction out of the M1 misconception

`module-01.json` / `module-01/index.html`, slides 4 and 5. One sentence moved verbatim; the newly-dangling "And" was trimmed per the approved decision (the one word-level cleanup in this pass, flagged as such):

| Slide | Before | After |
|---|---|---|
| 4 (`reveal`) | `"There's a difference. And the difference is everything."` | `"There's a difference. And the difference is everything. Lockout/tagout isn't just a procedure — it's a barrier."` |
| 5 (`misconception-held-up`) | `"Lockout/tagout isn't just a procedure — it's a barrier. And when people picture the hazard, they usually picture one thing: electricity, the one that gets all the safety posters."` | `"When people picture the hazard, they usually picture one thing: electricity, the one that gets all the safety posters."` |

The misconception now holds only the belief; the correction landed in the reveal that already makes the adjacent "stop ≠ secure" turn. Screenshot-verified in both modes — the misconception still reads lighter/quoted/set-back than the reveal (register hierarchy intact).

### C — New M3 misconception slide + the additions ledger

Inserted a `misconception-held-up` slide in `module-03.json` / `module-03/index.html`, between the existing "Other Employees" (definition) and "A Different Standard" (reveal) slides — M3 grows from 29 to 30 slides. Wording is the draft flagged at the top of this note. Renders via the existing container (no new CSS/render logic — same mechanism M1's misconception already uses); screenshot-verified in both modes, reading visibly lighter than the reveal that immediately follows it.

Created `courses/loto/ADDITIONS-LEDGER.md` — the course had none (noted in `AUDIT-2026-07-15.md`). This new slide is the ledger's first entry, category *pedagogical scaffolding*, with the §8 validation recorded (consistent with 1910.147(b)/1910.399, and the belief's reality confirmed two ways: `course-audit-SPEC.md` names "four roles" for three as this project's own founding memory-blend error, and the M3 script's narration — *"That's three roles, not four"* / *"isn't a fourth lockout/tagout role"* — pre-empts the same belief without ever stating it as a line). The ledger's header notes explicitly that retroactively cataloging the course's *existing* scaffolding (already-shipped misconceptions, scenes, worked examples) is a separate, larger task, not done here — this entry is the start of the ledger going forward, not a backfill.

### D — Reworded the presumptive-audience line (M1)

`module-01.json` / `module-01/index.html`, slide 6 body, first sentence only:

| | |
|---|---|
| Before | `"You've worked around most of these for years without needing a list. The list matters because the one you're not thinking about is the one that gets you."` |
| After | `"It's easy to assume you already know these — but the list matters because the one you're not thinking about is the one that gets you."` |

Second sentence kept verbatim. The `boxText` (the sourced six-energy-source definition) is untouched — only the elaboration line changed.

---

## Verification

- **Diff scoped exactly as expected.** `git diff --stat` on `courses/loto/builds/`: 6 files, 16 insertions / 8 deletions — module-01 (3 edits: B×2, D×1), module-02 (1 edit: A), module-03 (1 insertion: C, in both the `.json` and the embedded `MODULE` const). Full diffs reviewed line-by-line; nothing moved beyond the four items above.
- **L1 structural-consistency gate re-run** (same check used for the proposal's gate section): Module 2's `Step` label sequence is now `[1,2,3,4,5,6]` — unique, gapless, no duplicate. Modules 1 and 3 still carry no `Step`/`Part`/`Phase` structural labels.
- **HTML ↔ JSON parity confirmed** for all three modules: the embedded `MODULE` const in each player deep-equals its `.json` file (slides and quiz), after every edit.
- **Full-deck Playwright traversal**, all three players (every slide, every quiz question, to the close screen): zero console/page errors, zero failed requests. M1: 30 steps (unchanged slide count). M2: 27 steps (unchanged slide count, label-only edit). M3: 35 steps (was 34 — the one new slide).
- **Rendered and screenshotted** (both modes) every touched slide plus the new slide's immediate neighbors: M1 slides 4/5/6, M2 slide 5, M3 slides 19/20/21. All read correctly; register hierarchy holds at both edit sites.

---

## Not done here (explicitly out of scope for this pass)

- Item C's wording is not final — see the banner at the top.
- Retroactively cataloging the course's pre-existing scaffolding into the new additions ledger.
- Any of the three items still open in `DECISIONS-NEEDED.md` (interpretation letters, notification-ordering sign-off) — unrelated to this pass.

**Not merged.** Live demo unchanged pending Sean's sign-off — and pending his confirmation of Item C's wording specifically.
