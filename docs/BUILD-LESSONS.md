# Build Lessons

Real errors caught while building the LOTO demo, and what each one teaches the system.

**Why this exists.** Every blatant error we catch by hand is a specification for a check the eventual app should run automatically. It is cheaper and more honest to derive the app's validation layer from errors we have actually hit than to guess at it up front. So each entry records three things: the error, how it got past our checks, and the safeguard the error implies — for the course-audit now, and for the self-service app we have not built yet.

**Format.** One entry per error: *what it was · how it got through · the safeguard it implies.* Keep the safeguard concrete enough to become a real check.

---

## L1 · Duplicate step number, Module 2 · 2026-07-20

**What it was.** Two consecutive Module 2 slides are both labeled "Step One" — slide 4 "Step One — Prepare" and slide 5 "Step One — Notify." The course keeps six steps (Prepare, Shutdown, Isolate, Lock, Stored Energy, Verify) and folds Notify in as a second beat of Step One, but the label reads as a duplicate. Blatant on sight, and live on the demo before anyone caught it.

**How it got through.** Pre-existing content, verified — the M2 shape pass changed zero words (content-frozen diff, 1311/1311 leaf strings), so the label predates all three rebuilds. Every review in the shape-pass arc checked content *preservation* (did a pass alter anything), never content *correctness*. Content was frozen and treated as already-audited. And the content audit that first produced it had no structural-consistency check — so the class "duplicate or non-sequential ordinal label" was never something any gate looked for. The frozen-content boundary held perfectly; the gap is in the content audit's scope, not the presentation work.

**The safeguard it implies.** A structural-consistency validator on the content itself — mechanical, deterministic, cheap to run. The rule this case seeds: *ordinal labels (Step N, Part N, Phase N) must form a unique, gapless sequence within their group.* A second "Step One" fails it in one line of code, no judgment required.

- *Audit, now:* add a structural-consistency pass to the course-audit — label sequences, citation format, orphaned references — the classes a machine can catch, so human and model review spend their attention on the errors that actually need judgment.
- *App, later:* this is first-line validation — automated structural checks that run *before* any model or human review and block blatant inconsistencies at the door. This log is where those checks get specified from real cases. L1 is the first: **label-sequence integrity.**

**What it is not:** a presentation fix. The relabel is a content decision — does Notify stay under Step One with a clearer label, or move — made against the source, through the content pass.

---

*Started 2026-07-20. Add an entry whenever a real error is caught, especially one that got past a review — the ones that slip through are the ones worth a check.*