# The Slide-Type Standard

The grammar every course renders into.

**Version:** 0.2 (draft — unexecuted) — 2026-07-20. Companion to the Durability Standard (the *source* invariant) and the Build Methodology (the *process* invariant). This is the *structure* invariant.
**Changes since 0.1:** adds the shape axis (§S3) as a second, orthogonal design dimension; moves endorsed synthesis into Register I (§S2); adds the over-image scrim and composite-contrast rule (§S5). Reconciliation and required conformance in §S7.
**Status:** Not yet validated. Validated only when the LOTO player has been rebuilt under it and passes (a) an epistemic-status audit — no container wears an authority its content does not hold; (b) a contrast check on the *actual rendered composite* — text as it sits over its background, image and scrim included — for every container in both modes; and (c) a shape-rhythm check — no stretch of the deck collapses to a single shape. First validation target: the LOTO player rebuild.
**Applies to:** Every course produced by SOPs Nobody Reads, and the eventual self-service builder, regardless of subject or client.
**Sizing rule:** Inherited from the Durability Standard — this document must remain executable by one accountable person and a set of models in bounded sessions. Any revision that grows it should be able to point to a failure that required the growth.

---

## Preamble: The Governing Principle

**A container asserts the epistemic status of its contents before a single word is read. The form must carry the status the source assigns — never grant an authority the source withholds.**

This is the design-layer form of the Build Methodology's north star. Where the Methodology says *render from source, never create source*, this standard says the same thing one level up: **render the source's epistemic status; never let the form create authority.** A misconception the course means to refute, poured into the same container as a regulatory requirement, has been silently promoted to a truth — the form created an authority the source never granted.

The corollary that motivated this document: **the reader must know how to read a statement before reading it.** In the LOTO course, one visual container — the serif hero headline — carried every kind of statement: the misconception and its correction, the mandatory step and the aside, the definition and the scene. After a hundred slides the brain gave up telling them apart, because the container told it nothing.

This standard governs **two independent properties** of every slide: the **weight** a statement carries — whether the course asserts it, holds it up, or merely frames it (its *register*, §S1–§S2) — and the **shape** its information takes — a claim, a comparison, a figure, a sequence (its *shape*, §S3). The first was the whole of version 0.1 and is the load-bearing invariant. The second is added in this revision, because a single shape applied to every statement is its own monotony — distinct from the epistemic collapse the register system prevents, but a failure of the same kind: form that has stopped doing work.

---

## Definitions

- **Register** — the epistemic weight class a statement belongs to (§S2): source-authoritative, held-up-for-examination, transitional, or frame. Sets a slide's visual weight.
- **Shape** — the compositional structure a slide takes (§S3): stack, stark-cut, figure, sequence, and the specialized shapes. Independent of register; sets a slide's layout.
- **Container** — a slide type, fixed by a register and a shape together. The unit the catalogue governs (§S4).
- **Chrome** — the player shell that frames every container: navigation, progress, container surfaces, type hierarchy, the light/dark toggle. One shell, every course (§S5).
- **Token** — a named CSS custom property the chrome exposes for palette and type. Some tokens are client-swappable; the scale and hierarchy they sit in are not (§S5).
- **Scrim** — an overlay placed behind text on a full-bleed image, dark or light as the mode requires, sufficient to hold the text's contrast against the image whatever the image contains (§S5).
- **Skin** — the swappable surface: the client's palette and fonts, and the subject's imagery. The variable layer, bounded by guardrails.

---

## §S1 — Form Carries Epistemic Status

**The source does not carry claims alone; it carries the status of each claim.** The Durability Standard's atom schema (§1) already classifies every unit of knowledge by `type` — rule, threshold, definition, procedure-step, rationale, exception, warning — and by `scope` — must-do, must-know, specialist-only. The Additions Ledger (§8) classifies everything *not* from the source as pedagogical scaffolding or pure narrative. A faithful rendering preserves these classifications; a container system is how the presentation preserves them.

**A misconception is scaffolding, not a claim.** It appears in the course to be examined and broken, not asserted. §8 requires scaffolding to be validated as rigorously as a claim; this standard requires it to be *presented* as unmistakably not-a-claim. The container is the mechanism.

**This is the same discipline as the quote/restatement split.** The atom schema keeps the source's verbatim `quote` separate from our `restatement` so drift between what the source says and what we say it says stays checkable (§1). The register system keeps a belief visually separate from a truth so drift between what is asserted and what is merely shown stays *visible* — to the learner, at a glance, and to the auditor, structurally. Emphasis drift (course-audit, Pass 3 — "does formatting emphasis track the source's *shall*") stops being something the audit must catch case by case and becomes something the structure prevents by default.

**Sequential art is the working model** (see the panel-logic skill). Comics never use one text treatment; they use a vocabulary of them, and the container tells the reader how to read the words before reading them — a narrator's caption is trusted, a character's speech balloon is a voice not necessarily right, a thought bubble is a belief. A villain's balloon is never mistaken for the narrator's caption, because the *container* carries the status. A course with one container gives every statement the narrator's authority. This standard restores the vocabulary.

---

## §S2 — The Register System (the weight axis)

Every container belongs to one of four **registers**. The register fixes the container's visual weight; the subject and the client never do. This is the frozen grammar — the part a future model reaches into when it meets a statement it has never seen and must decide *how it should be read.* Register is one of the standard's two axes; shape (§S3) is the other, and the rule at the end of this section binds them.

**Register I — Source-authoritative.** The confident, heaviest treatment: what the course asserts as true and stands behind. The line that admits a statement here is **endorsement, not citation** — *does the course assert this as true?* — because a course's own validated conclusion carries its authority as surely as a regulation does. Two kinds of statement qualify:

- **Sourced claims** — the atoms the Durability Standard recognizes: rule, threshold, definition, procedure-step, rationale, exception, warning (§1). All seven are source-authoritative; a rationale ("simple is what makes it dangerous, *because…*") or a warning is asserted no less firmly than a rule.
- **Endorsed synthesis** — the course's own teaching conclusions: the pedagogical scaffolding of Additions Ledger §8 that has passed validation. "Simple is exactly what makes it dangerous" is not in the regulation, but the course asserts it and stands behind it; it belongs with the truths, not held up beside them.

What may never enter Register I is anything the course does *not* assert — a belief to be refuted, an alternative merely shown. That line, endorsed-vs-held-up, is the real boundary between Register I and II; citation is not. *This is the register the hero headline was leaking to everything.*

**Provenance stays visible within the register.** The distinction between "the regulation says" and "the course concludes" is real and must not be lost — but it is not carried by the register (both are asserted). It is carried by the citation chrome: a sourced claim shows its source; an endorsed synthesis does not. Same weight, different mark. This keeps the source/our-words line (the atom schema's quote/restatement split, §1) legible without demoting the course's own conclusions to a lower register.

**Register II — Held-up-for-examination.** A belief, an alternative, or a scenario, shown but not asserted. Visually lighter, set back, bracketed or quoted. Renders scaffolding — the misconception, the competing options, the establishing scene. **Nothing in this register may read as heavy as anything in Register I.** That single inequality is the load-bearing rule of the whole standard.

**Register III — Transitional.** The turns and connective beats: the moment a held-up belief breaks and the sourced truth lands; the callback that ties a later beat to an earlier one. A register *shift* made visible — the gutter between panels, not a panel.

**Register IV — Frame and assessment.** The structural givens that are not themselves teaching: the opening title, the assessment, the close. Functional, distinct from all three above so a learner never confuses "your turn" with "the truth."

**The rule that governs all four:** a container's form must match its register, and the ranking of visual weight across registers — I heaviest, II lighter, III a break, IV apart — must hold in every palette and every mode. A client may change what the colors *are*; a client may never change what the weights *mean*. And because register is only one of two axes: **the weight ranking holds across every shape (§S3).** A held-up belief rendered as a stark cut still reads lighter than a sourced truth rendered as a stack. A statement's register — not its shape — sets its weight; a shape is a way of arranging weight, never a source of it.

---

## §S3 — The Shape Axis (the composition axis)

A container answers *what weight does this statement carry?* It does not answer *what shape does this information take?* Those are different questions, and version 0.1 answered only the first — so every statement, whatever its weight, arrived in the same shape: a kicker, a headline, a sentence of elaboration, stacked and centered. Three of the most-used containers — teaching-caption, misconception, reveal — share that exact shape and differ only in treatment. The result is a second monotony: a deck where every slide makes the same move, announce-assert-explain, a hundred times over. §S2 stopped a belief from wearing a truth's authority; this section stops every truth from wearing the same clothes.

**The discipline is the register's discipline: a small, fixed vocabulary, applied by rule.** This is not a license to lay out each slide however it wants — that is the return of slop, the exact failure the single chrome (§S5) exists to prevent. A handful of shapes, each with a clear trigger, is a vocabulary; per-slide invention is not. The set is closed, and grows only the way this standard grows — against a beat that no existing shape could carry.

**The shapes.** Each carries a *use it when* — the trigger that admits it — because a shape used off its trigger is decoration.

- **Stack** — kicker, statement, elaboration, centered. The workhorse. *Use it when* a statement needs its context carried with it — the default for most teaching. The stack is not the problem; the stack *for everything* is. The shapes below are the seasoning that keeps it from going flat.
- **Stark cut** — one or two lines at large scale, little or no elaboration. *Use it when* a line should land in silence: a climax, a turn, a phrase worth a beat. Its cost is real and must be paid — it exports its explanation to a neighboring slide, so the elaboration it sheds must have a home. A stark cut with nowhere for its body to go is not a stark cut; it is a deleted sentence.
- **Figure** — a number leads at scale; a short caption carries the meaning. *Use it when* the fact *is* a quantity — a pressure, a count, a threshold, a dimension. The number does the work; the words point at it.
- **Sequence** — ordered steps as a visible progression, not a stacked list. *Use it when* the content is inherently ordered and the order is load-bearing — a procedure, a set of steps. Order-bearing in the audit sense (course-audit Pass 2): where the source mandates a sequence, the shape renders it in the source's order.

Those four carry most teaching content. The catalogue (§S4) also uses **specialized shapes** that were always distinct because their composition was never the stack: the **definition-box** (a sourced definition, contained), the **scene** (image-forward, text subordinate), the **transitional** beats (the reveal, the callback), and the **frame** shapes (title, quiz, close). They are shapes too, named in the catalogue rather than here because each binds to a single register.

**Shape composes with register; it does not replace it.** Every slide is one register × one shape. Register sets weight and treatment (§S2); shape sets composition. The two are chosen separately: a sourced truth (Register I) may be a stack, a stark cut, a figure, or a sequence; a misconception (Register II) is usually a stack but may be a stark cut when the belief is short and worth isolating. The register's invariants hold throughout — nothing in II out-weighs I, in any shape.

**Seasoning, not replacement.** Most teaching stays the stack. The other shapes are used sparingly, at the beats that earn them; a deck of all-varied-shapes is as tiring as a deck of all-stacks, and twice the work to build. The measure is rhythm, not novelty: enough variation that the eye stays awake, no more. A shape that is not carrying a beat that wanted it is noise — cut it back to a stack.

---

## §S4 — The Catalogue (register × shape)

The containers, grouped by register. Each names the shape(s) its content may take; where more than one is available, the §S3 trigger decides. Treatments are stated as relationships — heavier, lighter, set-back — because the absolute values move with the palette (§S5); the relationships do not.

### Register I — Source-authoritative

**`teaching-caption`** — the core sourced or endorsed assertion.
- *Shapes:* stack (default), stark-cut, figure, sequence — by the §S3 triggers. This is the change from 0.1: teaching content is no longer locked to the stack.
- *Treatment:* the display serif (`--font-display`, Lora), top of the type scale — the reserved hero treatment. The only register that gets it, in whichever shape it takes.

**`definition`** *(was `concept`)* — a sourced definition.
- *Shape:* the definition-box — the statement contained in a panel surface (`--bg-panel`) to mark it as a definition rather than a proclamation.
- *Treatment:* Register-I weight, delimited. Atom type `definition`; "name it, then explain it."

**`consolidation`** — multiple atoms assembled into one structure.
- *Shape:* sequence (order-bearing) for ordered content — the six steps, the notification map; a grid for unordered — a pre-quiz review. Renders atoms and their `dependencies` (§1) without flattening them.
- *Treatment:* Register-I authority, built *in the player* — never a generated image, because generators mangle text (§M1.5).

### Register II — Held-up-for-examination

**`misconception-held-up`** — a belief the course will refute.
- *Shapes:* stack (default — set back, quoted, the framing weighted over the belief) or stark-cut (the belief isolated in large quotes, when it is short). **Lighter than teaching-caption, always** — the "lighter" bought with weight, containment, and quotation, never by dropping below AA (§S5). The correction never shares this container; it lands in a `reveal` or a `teaching-caption`.

**`options`** — alternatives held up for comparison (non-quiz).
- *Shape:* parallel cards, equal weight among themselves, all below Register I. Distinct from `quiz` — options invite thought; quiz demands an answer.

**`scene`** — the establishing or narrative beat.
- *Shape:* image-forward, text minimal and low-weight, `--font-body`. The one place imagery leads — and even here it is supporting cast, subordinate to the sourced content that follows (§S6). Text over the image carries a scrim (§S5).

### Register III — Transitional

**`reveal`** — the turn: a held-up belief breaks and the sourced truth arrives.
- *Shape:* a deliberate visual break — a change of scale, ground, or gutter — distinct from a teaching-caption because it marks *motion*, not a resting assertion. May borrow Register-I weight for the truth it delivers; the break is the point. Text over image carries a scrim (§S5).

**`callback`** — a later beat reaching back to an earlier one.
- *Shape:* echoes the earlier beat's imagery at reduced weight, signalling "you have seen this" rather than "learn this now."

### Register IV — Frame and assessment

**`title`** — the module opening frame. Chrome, not teaching. Brand type, the practice's consistent shell.

**`quiz`** — assessment. After all content, never mid-content. Distractors are plausible misconceptions, not jokes — which is why quiz is Register IV, not II: a wrong option here is *chosen*, then corrected by feedback, not merely held up. Feedback strings are a content layer and audit as one (course-audit Pass 2, §M5).

**`close`** *(was `results`)* — score, takeaway, and next step. The module's resting note; equipped, not merely informed.

---

## §S5 — The Chrome and the Token Contract

**One chrome, every course.** The player shell — navigation, progress track, container surfaces, type hierarchy, the light/dark toggle — is identical across every course. The subject does not get its own shell. This is the decision that removes the hardest, most taste-dependent problem from the future builder: it never has to *invent* a coherent design language per subject (the reliable way to produce slop). It applies the fixed containers, drops in a token set, and places imagery. The judgment was made once, here; generation only renders against it. **Consistent chrome is a frozen design surface — the design-layer form of the source freeze.**

**The chrome is sourced from the marketing brand, not invented.** Its type scale, measure, and default palette are the real tokens committed in `sopsnobodyreads-site/styles.css`; designing them from imagination would reintroduce exactly the drift this practice exists to freeze out. The brand defaults:

- **Surface:** `--bg` warm cream `#f4ede0`; `--bg-panel` a derived near-surface for the definition-box and card containers; `--rule` ink at 12% for hairlines.
- **Ink:** `--ink` forest green `#1f3a2e` (Register-I text); `--ink-dim` / `--utility` warm gray `#6b5d4a` (held-up text, labels, kickers, UI).
- **Accent:** `--accent` dark aubergine `#3a1f2e` (progress, interactive, reveal emphasis).
- **Type:** `--font-display` Lora (Register I and the reveal); `--font-body` Lora for scene and body; `--font-ui` IBM Plex Sans (labels, misconception attribution, navigation).
- **Scale & measure:** the fluid `clamp()` scale topping at ~42px display, ~17px prose, ~13–14px UI; 36rem measure, 64rem page max, 1.5rem gutter.

**Tokenization within guardrails.** A client brings their palette and fonts by swapping a bounded set of tokens — `--accent`, the three font roles, and optionally the surface tones — as the aesthetic-design skill's Client Brand Themes mechanism already does. What a swap may **never** touch:

1. **AA contrast, measured on the composite.** Every text token must pass WCAG AA against *what actually sits behind it*, in light and in dark. Token-against-surface is necessary but not sufficient: a container that places text over a full-bleed image is not checked against the surface token, nor against the image's average — it is checked against a **scrim**, an overlay behind the text that holds the text's contrast against the image whatever the image contains and whichever mode is active. Contrast is verified on the **rendered composite** — the text as it sits over image plus scrim — not on token pairs in isolation. *This is the fix for the dark-mode washout: the scene and reveal shapes over dark art must carry a scrim, and the shipped check must be the composite, not the tokens — 0.1 checked token-vs-surface and the text-over-image case was never evaluated.* The brand already sits near the floor (warm gray `#6b5d4a` on cream is close to the AA limit for small text), so a client's palette is checked, never assumed.
2. **The register hierarchy.** The visual-weight ranking I › II › III-break › IV must survive the swap. A client's brand color may become the accent; it may not make a misconception render as heavy as a teaching-caption. The chrome enforces the inequality; the token only recolors it.
3. **State confinement.** `--correct` / `--incorrect` are quiz-feedback only, must stay mutually distinguishable (colorblind-safe), and never appear in content.

This is the difference between *swappable* and *breakable*: the tokens are open so a client feels at home; the guardrails are closed so a client cannot foot-gun the legibility.

**Dark mode is a toggle over the light default.** The light, marketing-matching palette is the reading default; dark mode is its inverted-palette companion, offered as a learner toggle — not a separate theme, and not the default. Every container's treatment is defined in both modes, and the register hierarchy and composite-contrast rules hold identically in each.

**Delivery-safe.** The shell uses no browser-storage APIs that break inside an LMS frame (a comment naming the constraint is fine); it must run standalone, in an iframe, and as a SCORM package (course-audit Pass 5, §M1.4).

**The gate that verifies this.** The acceptance gate screenshots **every container, in both modes, with and without its image** — because the dark-mode washout shipped past a gate that checked two container types in one mode. A gate narrower than the catalogue is not a gate.

---

## §S6 — The Imagery Boundary

**Range in imagery is the one variable that is supposed to vary.** Each course's images render to its subject — LOTO industrial-noir, mold horror-realism, warehouse bright. This is deliberate, and it is the answer to "should every course look the same": no, and the difference is the point. Discipline lives in the structure and the messaging; range lives in the imagery and the skin.

**But imagery is supporting cast** (§M1.5). It is generated last, it is optional, and a slide with no image and a correct, cited claim outranks a beautiful slide that is subtly wrong. Two bounds hold in every course, however far the aesthetic ranges:

1. **Imagery never occupies Register I.** An image may fill a `scene`, may echo in a `callback`, may set the mood of a `reveal` — but it never *is* the sourced claim, and no image-as-headline may read with a teaching-caption's authority. The claim is text, sourced and cited; the image supports it. (This is also why the annotated-image shape — text pointing at a specific spot in generated art — is *not* in the vocabulary: it would make imagery load-bearing, which this bound forbids.)
2. **Mood never eats content** (Additions Ledger §8). Pure narrative — imagery, texture, transition — is logged and reviewed for its one failure mode: displacing substance. Film grain, vignette, and the subject's palette are permitted to the degree they do not compete with the sourced word.

Range is licensed *because* structure is disciplined. The two are the same coherence seen from two sides.

---

## §S7 — Reconciliation and Required Conformance

This standard now carries two axes; conforming the pipeline means teaching each stage both. The changes below are the reason committing this revision creates downstream work.

**The current build taxonomy → this standard.** The 0.1 renames carry forward — `keypoint` → `teaching-caption`, `summary` + `list` → `consolidation`, `results` → `close`, with `misconception-held-up` and `callback` added. This revision adds:

- `concept` → **`definition`** (renamed; it *is* the definition-box shape).
- **Shape on Register-I teaching content.** A `teaching-caption` is no longer implicitly a stack; the decomposition now assigns it a shape — stack / stark-cut / figure / sequence — by the §S3 triggers, and the build gains a field to carry that choice.
- `misconception-held-up` may now also take the stark-cut shape.

**Required conformance (not done in this revision — flagged for review):**

- **LXD** must learn the shape axis. Its decomposition now chooses a *shape* per statement, not only a register, and the MODULE schema gains a field to hold it. The atom's `type` is a strong hint — a threshold or count invites a figure, a procedure invites a sequence, a climactic line invites a stark cut — but the choice is the decomposition's, made by the §S3 triggers and held to *seasoning, not replacement*. The Two-in-a-Row and Breathing rules now have two dimensions to vary across: register and shape.
- **aesthetic-design** must render the shapes (the stark-cut, figure, and sequence layouts), carry the scrim on every image shape, and — carried over from 0.1 — retire the three-theme model (Editorial / Retro / Corporate) for the single tokenized chrome (§S5), with the Client Brand Themes mechanism generalized to every course.

These change committed skill behavior; conformance is a reviewed follow-up.

---

## §S8 — Relationship to the Other Documents

- **The Durability Standard** is the *source* invariant — what a durable course is and why. This standard renders its classifications: the atom schema's `type` / `scope` (§1) and the Additions Ledger's scaffolding / narrative split (§8) are what the register system presents faithfully; Pass 4's coverage tiers (§4) decide which atoms reach a `teaching-caption` and a `quiz`; the adversarial audit (§9) gains a structural criterion — no container wears an authority its content does not hold.
- **The Build Methodology** is the *process* invariant — how a build runs. This standard is the fixed target of its step 3 (decompose to the build — the LXD skill) and step 4 (render the player — the aesthetic-design skill), and it closes a latent gap in step 3: a structural decomposition that "adds, removes, and rewords nothing" (§M1) still loses epistemic status if the structure it decomposes *into* has only one container — and loses rhythm if that container has only one shape. The register and shape axes are the vocabulary that lets the decomposition preserve status *and* variety, not just words.
- **The panel-logic skill** supplies both axes their model. Comics vary the balloon (who is speaking, with what authority — the register axis) *and* the panel composition (establishing shot, close-up, wordless beat, splash — the shape axis). Version 0.1 imported the balloons; this revision imports the panels. The McCloud vocabulary is now used whole.
- **The course-audit skill** gains its structural backstop here: emphasis drift (Pass 3) is prevented by default when form matches register.
- **The positioning doctrine** is unaffected in content but shares the law: render, don't create — in structure exactly as in message.

This is the third invariant. Source says *teach only what the document says.* Process says *render it, never create it.* Structure says *present each statement as what it is — at the weight the source assigns, and in a shape that lets it land.*

---

*Version 0.2 — 2026-07-20. Adds the shape axis, the over-image scrim and composite-contrast rule, and endorsed synthesis in Register I, over the 0.1 base (built from the LOTO player diagnosis and the real brand tokens in `sopsnobodyreads-site/styles.css`). Unexecuted: validated when the LOTO player is rebuilt under it and passes the epistemic-status, composite-contrast, and shape-rhythm checks in both modes. Provisional in the sense every living document is — the next course that surprises it revises it.*
