# LOTO Course — Adversarial Re-Audit (post Pass-4 rework)

**Date:** 2026-07-14
**Auditor:** Claude (Fable), fresh context — did not write this course or any of its fixes. Independence per Durability Standard §9. Find-and-report only; nothing fixed here.
**Repo state audited:** `main` @ `c6c1abf` (merge of `claude/loto-m2-m3-build-regen-20260714`, 2026-07-13 23:47 −0600).
**Ground truth:** `courses/loto/sources/29-CFR-1910.147.md` and `courses/loto/sources/29-CFR-1910.399-qualified-person.md` only. Nothing verified from memory or the live internet.
**Scope:** all three modules — scripts, builds (JSON), and players (index.html) — plus PROVENANCE, the hub page, image manifests, and DECISIONS-NEEDED as governance context.

**Precondition (stale-main check): PASSED.** Case-insensitive grep for `five type`, `four role`, and `Five types of hazardous energy` across `module-02.json`, `module-03.json`, and both players: zero hits. Main includes the M2/M3 regeneration.

---

## PASS 0 — Source readiness

**Result: PASS, no findings above NOTE.**

- Both frozen files exist. SHA-256 recomputed against PROVENANCE.md: `28f449dd…2cf157` (1910.147) and `20a58560…540f86` (1910.399 excerpt file) — **both match exactly.**
- Provenance carries URL, fetch date, extraction method, dual-rendering cross-check, and an honestly-logged citation-trailer discrepancy. The 1910.399 fetch date (2026-07-14) is today's date; internally consistent.
- **Authority coverage:** swept scripts, JSONs, players, and the hub for any authority outside the frozen set — NFPA, ANSI, Z244, NIOSH, other 1910.x sections, fatality statistics, "OSHA estimates/requires/defines/mandates" phrasing. Zero un-frozen authority claims. The only "OSHA requires…" string in the course is a quiz distractor marked wrong (M1 Q4 option A). The 1910.331/1910.332 supporting excerpts used by M3's qualified-person gloss are inside the frozen 399 file.
- **NOTE (P0-1):** the minor-servicing verbatim quote carries the source's own cross-reference "(See subpart O of this part)". Under Durability Standard §2.4 that reference has no recorded disposition. Low stakes — it rides inside a verbatim quote and the taught behavior doesn't depend on subpart O content — but it belongs in the decision record when item Pass4-1 (below) is closed.

---

## PASS 1 — Source fidelity, claim by claim

Mechanical anchor verification: **18 citations exist** (M1: 6 slide + 1 quiz; M2: 2 slide; M3: 8 slide + 1 quiz — the audit brief's per-module counts for M2 and M3 match exactly, including exactly two 1910.399 cites in M3). 14 of 18 anchors verify **verbatim, whole-string** against the frozen file they name. 3 verify only segment-wise. 1 cannot verify at all. Details in findings 1.3–1.5 and Pass 5.

### BLOCKER 1.1 — After-removal notification requirement is untaught; the "complete" restoration sequence ends before it

**Frozen source it fails against:**
- (c)(9): "Affected employees shall be notified by the employer or authorized employee of the application and removal of lockout devices or tagout devices. Notification shall be given before the controls are applied, **and after they are removed** from the machine or equipment."
- (e)(2)(ii): "**After** lockout or tagout devices have been removed and **before** a machine or equipment is started, affected employees shall be notified that the lockout or tagout device(s) have been removed."
- Appendix A, Restoring Equipment to Service, step (5): "Notify affected employees that the servicing or maintenance is completed and the machine or equipment is ready for use."

**Where it fails:**
- `scripts/module-03-…md` L45–48: the seven-step restoration visual and narration — Inspect, Clean Up, Replace Guards, Check Controls, Check for Personnel, Remove Locks, **Re-energize** — terminates at re-energization. The standard's own model procedure has one more step, and (e)(2)(ii)/(c)(9) make its substance mandatory, not model.
- `builds/module-03.json` slide[3] ("Restoring Equipment — Seven Steps") and slide[4] ("The Critical Ones"): same omission, presented as the complete sequence.
- The nearest thing taught is pre-removal notice — script L55 / JSON slide[4]: personnel "Notified that the lockout is being removed." That is earlier than, and not a substitute for, the source's requirement: the after-removal notice exists so that anyone who believes protection is still in place learns the machine's state changed. The course teaches exactly this logic for the (e)(3) special case ("the lock removal isn't complete until they know") and never teaches the general-case requirement it comes from.
- M2's notification teaching (script L64–70, JSON slide[5]) covers the before-application half of (c)(9) only.

**Why BLOCKER:** a mandatory element of the release sequence has zero coverage, inside a section that affirmatively presents itself as the complete restoration procedure — the same class as the prior audit's B3 (mandatory sequence element, zero coverage). A compliance-literate buyer comparing the course's seven steps to Appendix A's five will see two steps added that the standard doesn't contain and the standard's final step deleted. Regression note: the 2026-07-11 audit's "WHAT CHECKED OUT" list verified "Notification before application / after removal ↔ (c)(9), (e)(2)(ii)" as present in the then-current scripts. The Pass-4 rework lost it.

### FRICTION 1.2 — "Tagout required, period" overstates the not-lockable case

**Frozen source:** the (c)(2)(i) requirement is correctly quoted, but tagout — in either case — carries additional obligations the course forecloses: (c)(7)(ii) ("When tagout systems are used, employees shall also be trained in the following limitations of tags: (A)–(F)"), (c)(6)(i)(D) (tagout periodic inspections extend to affected employees), and Appendix A, General ("When the energy isolating devices are not lockable, tagout may be used, provided the employer complies with the provisions of the standard which require additional training and more rigorous periodic inspections").
**Where:** `scripts/module-02-…md` L177 — "tagout is required — **that's the whole requirement for that case**"; `builds/module-02.json` slide[12] — "Can't be locked out: tagout required, **period**." Carried into the player inline data.
**Why FRICTION:** the two-case structure itself is now accurate (prior F1 is fixed), but the fix minted a smaller sibling error: an affirmative completeness claim the source contradicts. Restating without "period / whole requirement" — or adding "with extra training and inspection duties attached" — resolves it.

### FRICTION 1.3 — The (e)(3) exception is systematically labeled "emergency"; the source conditions it on unavailability

**Frozen source:** Exception to (e)(3): "**When the authorized employee who applied the lockout or tagout device is not available to remove it**, that device may be removed under the direction of the employer…" No emergency condition anywhere in the paragraph.
**Where:** `scripts/module-02-…md` L148 ("one narrow, employer-directed **emergency** procedure"); `builds/module-02.json` slide[9]; `scripts/module-03-…md` L204 section title "EMERGENCY LOCK REMOVAL"; `builds/module-03.json` slide[13] label "Emergency Lock Removal"; both modules' summary items ("Emergency lock removal: …"); M3 quiz Q2 option C ("remove the lock following emergency procedures").
**Why FRICTION:** the elements taught are right and cited, and the container (employer-directed, pre-documented) is right — but the label misdescribes the trigger, and the module's own scenario proves it: a worker who went home with their lock on is not an emergency; it is precisely the mundane unavailability case (e)(3) exists for. The mislabel cuts both ways operationally — workers may improvise on the mundane case ("not an emergency, so that procedure doesn't apply") or invoke it on urgency alone ("production is down, that's an emergency"). A buyer who knows (e)(3) as the unavailable-employee exception will catch the rename. This finding is the audit brief's known open item, confirmed still present on main in five distinct locations across both modules and all three layers.

### FRICTION 1.4 — M1 quiz Q3's anchor contains a paraphrase segment; the chip cannot verify

**Where:** `builds/module-01.json` quiz[2].source.anchor (mirrored in script L376 and player inline data): `"Any source of electrical, … or other energy. / (d)(5)(i) stored-or-residual-energy requirement"`.
**Failure:** the first segment verifies verbatim against (b); the second segment — "(d)(5)(i) stored-or-residual-energy requirement" — is editorial paraphrase, present nowhere in the frozen file. Whole-anchor and segment-wise verification both fail. Under the course's own rule (every anchor verifies verbatim; a chip that can't is worse than none) this is the single worst citation in the course, and it renders in Reviewer mode on the quiz question. The cited provisions are real and correctly numbered — the failure is anchor discipline, not content — which is why this is FRICTION rather than BLOCKER, but it should be treated as must-fix before any buyer demo of the citation feature.

### FRICTION 1.5 — Composite anchors exist in three different, undocumented grammars

**Where:**
- `builds/module-02.json` slide[12]: `(c)(2)(i): "…" / (c)(2)(ii): "…"` — label-colon-quote scaffolding.
- `builds/module-03.json` slide[17]: two (b) definitions joined bare with ` / `.
- `builds/module-03.json` slide[20]: three (c)(7)(i) subparagraphs joined with ` / `, labels retained.
- `builds/module-01.json` quiz[2]: quote ` / ` paraphrase (finding 1.4).

Each individual quoted segment in the first three verifies verbatim; only the join scaffolding breaks whole-anchor matching. But there is no documented anchor convention, so verification tooling cannot distinguish "multi-segment anchor by convention" from "corrupted anchor." Decide one grammar (recommendation for the signer: one verbatim span per anchor; multi-provision slides carry an array of sources) and regenerate the four offenders.

### FRICTION 1.6 — Script-layer anchors embed editorial commentary inside the anchor field

**Where:** `scripts/module-01-…md` L177 — anchor ends "…bleeding down, etc. **-- NOTE: Appendix A has no per-step id anchors on eCFR; url points to the section page…**"; `scripts/module-02-…md` L179 — anchor ends "…paragraph (c)(3) of this section." **-- two separate numbered paragraphs in the frozen file, quoted separately here, not a continuous span.**"
**Failure:** both script anchors fail verbatim verification as written; both builds silently stripped the commentary, so script and build anchors diverge. The commentary is useful — it just belongs in a sibling field or an adjacent comment, not inside the value that is defined as verbatim source text.

### NOTE 1.7 — Unanchored program-design elaborations taught in the imperative voice

None of these is attributed to OSHA, all run in the conservative direction, and several are conventional good practice — but under Durability Standard §1/§8 they are unanchored claims with no additions ledger in the course folder to hold them:

- Notification content list ("What is being locked out. Why. How long. Who's responsible. Who to contact.") — M2 script L66, JSON slide[5]. (c)(9) and Appendix A step (1) require notification, not this content set.
- "Every machine with hazardous energy should have one [a documented machine-specific procedure]" — M2 script L55, JSON slide[4]. Hedged with "should," but the (c)(4)(i) Note's eight-element documentation exception exists in the frozen source and is neither taught nor recorded as excluded.
- Restoration steps "Clean up" (as a distinct step) and "Replace guards — every guard goes back before the machine starts, **with rare exceptions for startup adjustments**" — M3 script L48, JSON slide[3]. The startup-adjustment exception corresponds to machine-guarding provisions that exist in **no frozen source**; that clause is a memory-shaped claim of exactly the founding-failure class, and it is the sharpest item in this NOTE.
- "Document the attempts" (element 2) and "Before they approach any equipment" (element 3) — M3 script L227–229, JSON slide[14]. (e)(3)(ii)–(iii) require the efforts and the knowledge-before-resuming-work, not the documentation of attempts, and "resumes work at that facility" is narrower than "approach any equipment."
- Periodic inspection described as the inspector "**watches** another authorized employee perform it" — M3 script L323. (c)(6)(i)(A),(C) require an uninvolved authorized inspector and a review of responsibilities; observation-of-performance is an interpretation, not the text.
- "Then inform the people in the area that you're about to begin work" appended to step 6 — M2 script L255. Not a source step.

### NOTE 1.8 — "This standard defines three roles"

M3 script L255 / JSON slide[16]. (b) defines two terms (authorized, affected); "other employees" is a training class created by (c)(7)(i)(C), not a defined term. The count of three is correct and is the framing OSHA's own training tiers produce; the verb "defines" slightly over-claims. The slide's dual-anchor structure ((b) definitions + (c)(7)(i)(A)–(C)) already carries the honest version.

### Verified clean (search shown, not vibes)

Six named sources + "other," never five, in every layer including quiz Q3 and both summary cards ↔ (b). Gravity explicitly framed as not a seventh source, anchored to Appendix A step (6) — anchor verifies verbatim. Three roles, never four; qualified-person reframe correct, fenced, and anchored to the frozen 1910.399 (both cites verify verbatim), with the "exposed energized parts" gloss grounded in the frozen 1910.332(b)(3) excerpt. Master-key material framed as program design with an explicit "not a regulation's phrase — it doesn't [use it]" disclaimer ↔ prior F3, fixed. Reaccumulation taught and cited, anchor verbatim ↔ (d)(5)(ii), prior B3 fixed. Six-step sequence ↔ (d)(1)–(6) one-to-one. Cord-and-plug: both conditions taught, "two conditions, not one" called out, anchor verbatim ↔ (a)(2)(iii)(A). Minor servicing: all five conditions present, misuse warned, anchor verbatim ↔ (a)(2)(ii) Note. Testing/positioning: all five actions in script order ↔ (f)(1) (build compression → finding 3.2). Contractor information-exchange-not-certificate ↔ (f)(2)(i), prior F6 fixed. 2000 PSI appears only as scenario color, never attributed to the regulation; the bad tire-pressure comparison (prior F5) is gone. No "50 PSI" corruption of the (c)(5)(ii)(C)(2) 50-pound tag-strength figure anywhere (the figure is untaught, which is a defensible scope call). No fatality statistics anywhere.

---

## PASS 2 — Layer consistency

**Parity results:** slide counts — M1 32/32, M2 23/23, M3 31/31 (JSON vs player inline, deep content comparison, not counts alone). Quiz 4/4/4 in all three. **Each player's inline data is content-identical to its JSON.** No fabricated slides found in any build; the previously-fabricated M1/M3 slides were not reintroduced.

### FRICTION 2.1 — Annual/periodic inspection taught in the M3 script, absent from the M3 build

`scripts/module-03-…md` L323 teaches (c)(6)'s inspector-independence ("an authorized employee who is not involved in the procedure being inspected") and the script's end card carries "Annual inspections: the system checking itself." The build has **zero** occurrences of "annual" or "periodic" — not in any slide, and the summary item was dropped (replaced by a scope-exclusions item; see 2.2). A learner who takes the shipped product never encounters (c)(6). Regression note: the 07-11 audit verified this content present.

### FRICTION 2.2 — M3 end card diverges from build summary in both directions

Script end card (L372–379) lists annual inspections but omits the scope exclusions — the module's largest new section is absent from its own summary. Build summary (`module-03.json` slide[30]) adds the scope-exclusions item (good) but drops annual inspections (bad). Neither layer's summary is the other's. One of them is wrong; per the script-is-upstream convention, both need a reconciled pass.

### FRICTION 2.3 — "Return controls to neutral" after verification: in the script, not in the build

`scripts/module-02-…md` L255 teaches Appendix A step (7)'s Caution ("Return operating control(s) to neutral or 'off' position after verifying the isolation"). `builds/module-02.json` slide[15] (Step Six — Verify) omits it. This is a safety-relevant step — a control left in ON after the try-start test means the machine starts the instant energy is restored. M3's restoration list ("Check controls — everything in neutral") partially compensates, but at restoration time, not at verification time, and only for learners who connect the two modules.

### FRICTION 2.4 — A player-only content layer exists: hardcoded quiz feedback

All three players carry a `getQuizFeedback()` function with per-question teaching text (12 strings total) that exists in **neither the scripts nor the JSONs**. One of the twelve was script-directed — M3 Q4's distractor note demanding feedback that explains the qualified-person option is wrong on two counts — and the player implements it correctly and completely (credit where due). The other eleven originate in the player layer with no upstream counterpart. All eleven are content-accurate against the frozen source as written today, but they are invisible to any script↔JSON audit, which is how content drifts. Either promote feedback into the JSON schema (where the parity check will see it) or add it to the scripts.

### NOTE 2.5 — M2/M3 inline data blocks are valid JS but not strict JSON

Both carry a trailing comma after the last slide (`module-02/index.html` L788–789; `module-03/index.html` L796–797). M1's block is strict JSON. Harmless at runtime; any strict-JSON parity tooling will false-fail on two of three modules. Normalize.

### NOTE 2.6 — Rejected image assets still ship inside the package

The M3 image manifest correctly rejects `s12-roles.jpg` ("shows four workers in concentric circles — this is the old four-role diagram… asserts the exact error Phase 4 corrected") and `s13-documentation.jpg` (garbled "LOCKLOUT" text) — but both files remain in `builds/module-03/img/`, alongside other unreferenced leftovers in all three modules (M1: s04, s10, s12, s14, s15, s16; M2: s02, s03, s04, s11, s13, s14, s15; M3: s03, s04, s05, s08, s12, s13, s14). No player renders them, but anyone browsing the delivered package can open the four-ring roles diagram the course was specifically corrected to kill. Purge rejected assets from shipping directories or move them to a quarantine folder.

---

## PASS 3 — Structural coherence

### FRICTION 3.1 — Citation coverage is inversely correlated with operational weight in M3

In Reviewer mode, M3's chips cluster on the scope exclusions, emergency removal, roles, and contractors. The module's operational core — group lockout ((f)(3)), the lockbox method ((f)(3)(ii)(D) names "group lockbox" verbatim), shift-change overlap ((f)(4)), and the entire restoration sequence ((e), Appendix A) — carries **zero citations** in script, JSON, and player. M2 has the same shape: its two most load-bearing procedural sections (steps one through four; step six) are chip-less while the tags digression and reaccumulation are cited. Nothing cited is wrong; but for a buyer whose reason to believe is the citation feature, the barest slides are precisely the ones a safety manager will act on. This is a coverage asymmetry, not a fidelity error — hence FRICTION.

### FRICTION 3.2 — The course's own uncited seven-step list gets richer treatment than the regulation's mandated five-action sequence

`module-03.json` slide[3] renders the course-invented restoration sequence as a full numbered-list slide; slide[12] compresses the regulation's mandatory (f)(1) sequence — five actions the source says "shall be followed" in order — into four prose phrases ("Clear tools and personnel. Remove LOTO devices. Energize, test or position. De-energize, reapply LOTO.") under a boxText claiming "An exact sequence, in order." All five actions survive (tools and personnel are merged), so this is not a fidelity failure, but the emphasis is exactly backwards for a compliance-literate reader, and it compounds finding 1.1 (the seven-step list is also the slide missing the mandatory final notification).

### NOTE 3.3 — M2 Q4's blanket line vs M3's minor-servicing exception

M2 Q4's correct answer ("the procedure applies regardless of job duration") is literally true — duration alone never exempts — and M3 fences the exception explicitly ("Not 'it's quick.'"). No contradiction. But the M2 player feedback repeats the blanket line with no pointer, and a learner who finishes M3 may perceive tension. One clause in the M2 Q4 feedback ("the only exception that even resembles this is Module 3's minor-servicing fence — which this scenario fails") would close it.

### NOTE 3.4 — "Six named sources, not five" is a rework artifact

`module-01.json` slide[7] body. "Not five" is meaningful only to people who saw the pre-rework error; to a fresh learner it's a non sequitur that invites the question "who said five?" The script's equivalent line doesn't carry it.

### Verified clean

M2↔M3 lock-removal consistency: prior F2 fixed — M2 states the no-removal rule with an explicit carve-out pointing at M3's employer-directed procedure; M3 teaches it with the container sentence (prior F4 fixed). Cold-open/callback architecture is coherent across modules; the three cold opens are three distinct failure modes as designed. Six-steps preview (M1) → walkthrough (M2) is intentional spiral, not redundancy. No learner-facing competing "most important" claims. Hub page carries no stale taxonomy.

---

## PASS 4 — Scope & decisions

**Content quality of the folded-in exclusions: good.** Cord-and-plug teaches both conditions and names the failure mode of losing exclusive control. Minor servicing is the best-fenced of the three: all five conditions stated conjunctively ("every one of these… all at once, every time"), the classic misuse named ("clearing a jam"), tone calibrated as warning label ("boundaries, not shortcuts"), verbatim quote anchored. Testing/positioning teaches the sequence as discipline, complete in the script (build compression → 3.2).

### FRICTION 4.1 — The fold-in decision was executed but never recorded; DECISIONS-NEEDED.md now contradicts main

`DECISIONS-NEEDED.md` item 1 still describes all three exclusions as "currently unaddressed by the course" with the accept/exclude/fold-in decision open ("Both items are open"). Main teaches all three. Under the governing principle — the system never makes decisions; it forces them to the decision-maker — a scope decision was made silently by the rework and the decision log was left asserting the opposite. **For the accountable signer (not resolved here):** close item 1 as "folded in," dated and signed; while there, disposition item 2 (interpretation letters) and the subpart-O reference (P0-1).

### NOTE 4.2 — Positioning question for the signer: what does this course claim to satisfy?

If the course is ever positioned as satisfying an employer's (c)(7) training obligations: (a) tag-limitations training under (c)(7)(ii)(A)–(F) is partial — (A) and the false-sense-of-security idea are taught in substance; never-bypass (B), legibility (C), materials (D), and secure attachment (F) are not; (b) authorized-employee training under (c)(7)(i)(A) requires "the type and magnitude of the energy available **in the workplace**" — inherently site-specific, unsatisfiable by any generic course alone; (c) the (c)(4)(i) Note documentation exception is untaught while the course asserts every machine "should have" a documented procedure. None of this is a defect in an awareness course; all of it becomes one in a compliance-training claim. Decide the positioning on the record.

---

## PASS 5 — Citation feature integrity

**Toggle mechanics: PASS.** Reviewer mode is a single in-memory boolean, default Learner; the button carries `aria-pressed`; `renderCitation()` returns `''` unless reviewer mode is on and both `citation` and `url` exist — it cannot render a partial or fabricated chip from missing fields. **SCORM-safety: PASS** — zero `localStorage`/`sessionStorage` calls in any player; the only occurrences are the explanatory comment (explicitly permitted by this audit's terms). The toggle never touches SCORM/completion state. `renderCitation` is invoked on every slide type and on quiz questions, so no citation in data is silently unrenderable.

**Chip verification against the frozen files (all 18 rendered chips):** 14 verify whole-anchor verbatim. 3 (M2 slide[12], M3 slides[17] and [20]) verify segment-wise only, under an undocumented ` / ` join convention — see 1.5. **1 chip cannot verify at all** — M1 quiz Q3, whose anchor carries a paraphrase segment — see 1.4. By the course's own rule ("a chip that can't is worse than none"), that chip is the feature's single must-fix.

### NOTE 5.1 — The fail-safe guards the wrong fields

`renderCitation` requires `citation` and `url` but not `anchor` — the verification key. An anchor-less source would still render a confident, unverifiable chip. Moot today (all 18 sources carry anchors); one added condition closes the gap permanently.

### NOTE 5.2 — Chips link to live eCFR, not the frozen file

Reasonable design — buyers want the authority, not a repo file — but live eCFR can drift from the checksummed freeze, and the package nowhere states that the frozen file is the verification ground truth. One sentence in the course README fixes the epistemics.

### NOTE 5.3 — Players stub the SCORM API but never call it

`window.API` graceful-degradation stub only; quiz scores are computed and displayed but reported nowhere. Consistent with a static demo posture; flag for the scorm-builder packaging pass so nobody mistakes the stub for reporting.

---

## VERDICT

**Is this course defensible in front of a compliance-literate buyer today: NO — one blocker.**

The blocker is 1.1: the after-removal notification requirement ((c)(9), (e)(2)(ii), Appendix A restoration step (5)) is taught nowhere, and the course's seven-step restoration sequence presents itself as complete while ending one step short of the standard's own model procedure. A buyer who knows the standard will find it by putting the seven-step slide next to Appendix A — a thirty-second check.

Everything else is friction or below. The Pass-4 rework held: all three prior blockers and five of six prior frictions are verifiably fixed against the frozen sources, the fabricated slides are gone and not reintroduced, the counts (six + other; three roles) are right in every layer, the master-key and qualified-person reframes are properly fenced, and the layer parity between JSON and player is exact. Fix 1.1, and — for a demo where the citation feature is the pitch — 1.4 and the "emergency" labeling (1.3), and the honest answer flips to yes.

---

## META — for the course-audit skill

1. **Add a regression pass against the prior audit's "WHAT CHECKED OUT" inventory, not just its findings.** This audit's only blocker (1.1) was content the 07-11 audit verified present; the rework lost it while fixing other things. The six passes as specified all point at the current state; nothing owns "did the fix delete something that used to be right." Cheap to run: diff the prior verified-content list against the current layers before anything else.
2. **Pass 2 should name both directions explicitly.** As written it emphasizes "build content absent from its script" (fabrication). This rework's actual losses ran the other way — script content absent from the build (2.1, 2.3). Direction two found more than direction one.
3. **Enumerate all content-bearing surfaces, including JS literals.** The hardcoded quiz-feedback layer (2.4) sits outside script, JSON, and inline-data parity. A pass that diffs "script ↔ JSON ↔ player data" and stops will never see it. The spec should say: any string a learner can read is a content layer.
4. **The anchor grammar needs a spec before the next audit.** Findings 1.4–1.6 are all one root cause: "anchor" has no defined shape, so composites, joins, and embedded commentary each fail verification differently. One verbatim span per anchor (arrays for multi-provision slides) makes Pass 1 and Pass 5 verification purely mechanical.
5. **Decision-log currency didn't fit any pass.** DECISIONS-NEEDED contradicting main (4.1) is a governance failure the Durability Standard cares about deeply, but Passes 0–5 don't ask "do the decision records match the shipped state?" I filed it under Pass 4; it deserves its own check.
6. **Brief calibration:** the parenthetical "(11 citations exist: M1's set, M2's 2, M3's 9…)" parses only if 11 = M2 + M3 with M1's set uncounted. Actuals: M1 = 7 (6 slide + 1 quiz), M2 = 2, M3 = 9 (8 slide + 1 quiz), total 18. The M2/M3 counts and the two-1910.399-cites detail matched exactly. State per-module totals in the next brief so the count is a checksum, not a riddle.
7. **One thing that fit nowhere:** the emphasis-asymmetry finding (3.2 — invented list gets a list slide; mandated sequence gets compressed prose) is neither fidelity, consistency, nor scope. It's rhetorical weighting against regulatory weight. Worth a named heuristic in Pass 3: "does the course's formatting emphasis track the source's normative force?"
