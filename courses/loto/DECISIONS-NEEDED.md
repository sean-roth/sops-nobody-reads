# Decisions Needed — LOTO Course

Decisions surfaced during Pass-4 rework that require the accountable signer's call, per Durability Standard §2.4 (referenced-source dispositions) and §5 (conflict log / decision records). Not resolved here — logged for Sean to decide.

---

## 1. Scope exclusions — accept, exclude with rationale, or fold in?

Three provisions of 29 CFR 1910.147 are within scope of the standard but currently unaddressed by the course. `AUDIT-2026-07-11.md`'s SCOPE NOTES flagged these as candidates for a recorded scope decision, not defects — the course teaches the cautious default in each case, it just doesn't teach the exception.

- **Cord-and-plug exclusion — 1910.147(a)(2)(iii)(A).** The standard exempts work on cord-and-plug-connected electric equipment where exposure is controlled by unplugging the equipment and the plug is under the exclusive control of the employee doing the work. Daily reality in small shops; the course currently teaches full LOTO for everything.
- **Minor-servicing exception — 1910.147(a)(2)(ii) Note.** The standard's minor tool-change/adjustment exception (routine, repetitive, integral to production, using alternative measures providing effective protection). Unaddressed; course teaches the cautious default.
- **Testing/positioning re-energization — 1910.147(f)(1).** The standard's specific sequence for temporarily re-energizing equipment to test or position it during service. Unaddressed.

**Resolved — folded in, per Sean.** All three exclusions (cord-and-plug, minor servicing, testing/positioning) were written into the M3 script as new fenced content in Phase 4a, shipped in the Phase 4b build regeneration, and have been re-verified present and correctly fenced by every subsequent audit (07-14, 07-14 round 2) and fix pass through Pass-7. This entry previously read "open" after the decision had already been made and shipped — three consecutive audits flagged the log/main mismatch (07-14 4.1, 07-14 round-2 FRICTION 4.1). Status corrected here to match what main has taught since Phase 4a.

---

## 2. Interpretation letters as secondary sources — freeze, or stay regulation-only?

Two places in the course rely on reasoning that goes slightly beyond the plain text of 29 CFR 1910.147 and its Appendix A:

- **Thermal energy / ovens.** Module 1's thermal-energy panel (Phase 1 fix, B1) is grounded in 1910.147(b)'s definition, which does name "thermal" as an energy source — that part is solid and already frozen. The audit's original note additionally flagged an OSHA interpretation letter (2000-04-11, Dykes) that treats a natural-gas oven as an energy source on thermal-hazard grounds — this letter was **not** used as a source for the shipped fix, but it's available if Sean wants added support for the thermal reframe.
- **Master keys.** Module 2's master-key material was reframed (Phase 4, F3) from a claimed regulatory prohibition to a program-design principle flowing from exclusive control — the frozen text contains no master-key prohibition, so the fix doesn't cite one. If there's an interpretation letter or other secondary source that speaks to master keys and exclusive control more directly, it could strengthen that section, but none has been frozen or used.

**Decision needed:** Freeze either or both of these as secondary sources (same discipline as the 1910.399 freeze — §2.1/§2.2, accepted and frozen before use), or keep the course scoped to the regulation text, Appendix A, and 1910.399 only? Interpretation letters are not self-executing law the way the regulation is; treating one as a source is itself a scope decision, not a mechanical freeze.

---

## 3. Notification-ordering conflict — Appendix A step (5) vs. 1910.147(e)(2)(ii) — §5 conflict-log item

Two passages in the frozen source disagree on *when* the post-lockout notification happens, relative to restarting the machine:

- **Appendix A, Restoring Equipment to Service** (non-mandatory model procedure) sequences its steps as: (4) "Remove the lockout devices and reenergize the machine or equipment," then (5) "Notify affected employees that the servicing or maintenance is completed and the machine or equipment is ready for use." Notification is last, after reenergizing.
- **1910.147(e)(2)(ii)** (mandatory) requires: "After lockout or tagout devices have been removed and before a machine or equipment is started, affected employees shall be notified that the lockout or tagout device(s) have been removed." Notification is required *before* the machine is started.

Pass-6 restored the after-removal notification as a single step, positioned last (matching Appendix A's sequence) under a single anchor comment that silently noted the Appendix-A-ordering rationale. The 07-14 round-2 audit (BLOCKER 1.1) caught the resulting contradiction: the course's own "re-energize" step was taught as executing the startup sequence, then notification followed — landing after the mandatory (e)(2)(ii) window, on a machine the course itself described as already "live."

**Resolution (Pass-7, applied to main; flagged here for Sean's sign-off, not yet confirmed):** Appendix A is an explicitly non-mandatory model procedure; 1910.147(e)(2)(ii) is a mandatory requirement. Where the two conflict on timing, the mandatory provision governs. The course now teaches **two distinct notifications**, each anchored separately:

1. A **before-start** notification, positioned between "Remove your lock" and "Re-energize" — anchored to (e)(2)(ii) alone, telling affected employees the lockout devices have been removed, before the machine can move again.
2. A **closing** notification, retained as the last step — anchored to (c)(9) and Appendix A step (5) together, telling affected employees the servicing is complete and the machine is ready for use, after it's running.

This reading is also the only one under which Appendix A is internally consistent with itself: its own step (5) language ("ready for use") only makes sense as a distinct, later beat if "reenergize" (restore power) and "start"/"use" (operate) are read as different events from the before-start notice required by (e)(2)(ii).

**Needs Sean's sign-off:** this is a genuine within-source conflict resolved by an editorial call (specific-and-mandatory governs general-and-non-mandatory), not a mechanical fix. If Sean reads the conflict differently, the split and the two anchors should be revisited.

---

## Status

| Item | Status |
|---|---|
| 1. Scope exclusions | Resolved — folded in, per Sean (shipped Phase 4a, re-verified through Pass-7) |
| 2. Interpretation letters as secondary sources | Open — no shipped fix depends on it |
| 3. Notification-ordering conflict (Appendix A vs. (e)(2)(ii)) | Resolution applied to main in Pass-7 — pending Sean's sign-off |

Route items 2 and 3 through the conflict-log / decision-record process (Durability Standard §5) when Sean is ready to rule on them.

Approved — Sean, 07-15-2026
