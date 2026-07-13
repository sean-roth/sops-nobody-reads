# Decisions Needed — LOTO Course

Decisions surfaced during Pass-4 rework that require the accountable signer's call, per Durability Standard §2.4 (referenced-source dispositions) and §5 (conflict log / decision records). Not resolved here — logged for Sean to decide.

---

## 1. Scope exclusions — accept, exclude with rationale, or fold in?

Three provisions of 29 CFR 1910.147 are within scope of the standard but currently unaddressed by the course. `AUDIT-2026-07-11.md`'s SCOPE NOTES flagged these as candidates for a recorded scope decision, not defects — the course teaches the cautious default in each case, it just doesn't teach the exception.

- **Cord-and-plug exclusion — 1910.147(a)(2)(iii)(A).** The standard exempts work on cord-and-plug-connected electric equipment where exposure is controlled by unplugging the equipment and the plug is under the exclusive control of the employee doing the work. Daily reality in small shops; the course currently teaches full LOTO for everything.
- **Minor-servicing exception — 1910.147(a)(2)(ii) Note.** The standard's minor tool-change/adjustment exception (routine, repetitive, integral to production, using alternative measures providing effective protection). Unaddressed; course teaches the cautious default.
- **Testing/positioning re-energization — 1910.147(f)(1).** The standard's specific sequence for temporarily re-energizing equipment to test or position it during service. Unaddressed.

**Decision needed:** For each of the three — record as a deliberate scope exclusion (with rationale, on the record per §2.4), or fold it into the course as new content? If excluded, does the accountable-signer sign-off happen now or wait for a client engagement where it matters?

---

## 2. Interpretation letters as secondary sources — freeze, or stay regulation-only?

Two places in the course rely on reasoning that goes slightly beyond the plain text of 29 CFR 1910.147 and its Appendix A:

- **Thermal energy / ovens.** Module 1's thermal-energy panel (Phase 1 fix, B1) is grounded in 1910.147(b)'s definition, which does name "thermal" as an energy source — that part is solid and already frozen. The audit's original note additionally flagged an OSHA interpretation letter (2000-04-11, Dykes) that treats a natural-gas oven as an energy source on thermal-hazard grounds — this letter was **not** used as a source for the shipped fix, but it's available if Sean wants added support for the thermal reframe.
- **Master keys.** Module 2's master-key material was reframed (Phase 4, F3) from a claimed regulatory prohibition to a program-design principle flowing from exclusive control — the frozen text contains no master-key prohibition, so the fix doesn't cite one. If there's an interpretation letter or other secondary source that speaks to master keys and exclusive control more directly, it could strengthen that section, but none has been frozen or used.

**Decision needed:** Freeze either or both of these as secondary sources (same discipline as the 1910.399 freeze — §2.1/§2.2, accepted and frozen before use), or keep the course scoped to the regulation text, Appendix A, and 1910.399 only? Interpretation letters are not self-executing law the way the regulation is; treating one as a source is itself a scope decision, not a mechanical freeze.

---

## Status

Both items are open. Neither blocks the Phase 4 script fixes or build regeneration — none of the shipped fixes depend on resolving these. Route through the conflict-log / decision-record process (Durability Standard §5) when Sean is ready to rule on them.
