# The Slide-Type Standard

The structural grammar every course renders into.

**Version:** 0.1 (draft — unexecuted) — 2026-07-18. Third governing document, companion to the Durability Standard (the *source* invariant) and the Build Methodology (the *process* invariant). This is the *structure* invariant.
**Status:** Not yet validated. This standard is validated only when the LOTO player has been rebuilt under it and passes both an epistemic-status audit (no container wears an authority its content does not hold) and an AA-contrast check in both modes. First validation target: the LOTO player rebuild.
**Applies to:** Every course produced by SOPs Nobody Reads, and the eventual self-service builder, regardless of subject or client.
**Sizing rule:** Inherited from the Durability Standard — this document must remain executable by one accountable person and a set of models in bounded sessions. Any revision that grows it should be able to point to a failure that required the growth.

---

## Preamble: The Governing Principle

**A container asserts the epistemic status of its contents before a single word is read. The form must carry the status the source assigns — never grant an authority the source withholds.**

This is the design-layer form of the Build Methodology's north star. Where the Methodology says *render from source, never create source*, this standard says the same thing one level up: **render the source's epistemic status; never let the form create authority.** A misconception the course means to refute, poured into the same container as a regulatory requirement, has been silently promoted to a truth — the form created an authority the source never granted. That is the structural equivalent of a memory-blend error (course-audit, Named Tells): a true-looking assertion given false authority, except here the false authority comes from the *layout*, not the attribution.

The corollary that motivated this document: **the reader must know how to read a statement before reading it.** In the LOTO course, one visual container — the serif hero headline — carried every kind of statement: the misconception and its correction, the mandatory step and the aside, the definition and the scene. After a hundred slides the brain gave up telling them apart, because the container told it nothing. This standard gives the course a small vocabulary of containers whose *form* discriminates what the *words* only claim.

---

## Definitions

- **Container** — a slide type: a fixed layout whose visual form signals the epistemic status of its contents. The unit this standard governs.
- **Register** — the epistemic class a container belongs to (§S2). The register, not the subject, sets the container's visual weight.
- **Chrome** — the player shell that frames every container: navigation, progress, container surfaces, type hierarchy, the light/dark toggle. One shell, every course (§S4).
- **Token** — a named CSS custom property the chrome exposes for palette and type. Some tokens are client-swappable; the scale and hierarchy they sit in are not (§S4).
- **Skin** — the swappable surface: the client's palette and fonts, and the subject's imagery. The variable layer, bounded by guardrails.

---

## §S1 — Form Carries Epistemic Status

**The source does not carry claims alone; it carries the status of each claim.** The Durability Standard's atom schema (§1) already classifies every unit of knowledge by `type` — rule, threshold, definition, procedure-step, rationale, exception, warning — and by `scope` — must-do, must-know, specialist-only. The Additions Ledger (§8) classifies everything *not* from the source as pedagogical scaffolding or pure narrative. A faithful rendering preserves these classifications; a container system is how the presentation preserves them.

**A misconception is scaffolding, not a claim.** It appears in the course to be examined and broken, not asserted. §8 requires scaffolding to be validated as rigorously as a claim; this standard requires it to be *presented* as unmistakably not-a-claim. The container is the mechanism.

**This is the same discipline as the quote/restatement split.** The atom schema keeps the source's verbatim `quote` separate from our `restatement` so drift between what the source says and what we say it says stays checkable (§1). The register system keeps a belief visually separate from a truth so drift between what is asserted and what is merely shown stays *visible* — to the learner, at a glance, and to the auditor, structurally. Emphasis drift (course-audit, Pass 3 — "does formatting emphasis track the source's *shall*") stops being something the audit must catch case by case and becomes something the structure prevents by default.

**Sequential art is the working model** (see the panel-logic skill). Comics never use one text treatment; they use a vocabulary of them, and the container tells the reader how to read the words before reading them — a narrator's caption is trusted, a character's speech balloon is a voice not necessarily right, a thought bubble is a belief. A villain's balloon is never mistaken for the narrator's caption, because the *container* carries the status. A course with one container gives every statement the narrator's authority. This standard restores the vocabulary.

---

## §S2 — The Register System (the invariant)

Every container belongs to one of four **registers**. The register fixes the container's visual weight; the subject and the client never do. This is the frozen grammar — the part a future model reaches into when it meets a statement it has never seen and must decide *how it should be read.*

**Register I — Source-authoritative.** The narrator's caption: what the source asserts. The confident, heaviest treatment. Reserved for sourced claims — atoms of type rule, threshold, definition, procedure-step. If a statement does not trace to an atom, it may not enter this register. *This is the register the hero headline was leaking to everything.*

**Register II — Held-up-for-examination.** A belief, an alternative, or a scenario, shown but not asserted. Visually lighter, set back, bracketed or quoted. Renders scaffolding — the misconception, the competing options, the establishing scene. **Nothing in this register may read as heavy as anything in Register I.** That single inequality is the load-bearing rule of the whole standard.

**Register III — Transitional.** The turns and connective beats: the moment a held-up belief breaks and the sourced truth lands; the callback that ties a later beat to an earlier one. A register *shift* made visible — the gutter between panels, not a panel.

**Register IV — Frame and assessment.** The structural givens that are not themselves teaching: the opening title, the assessment, the close. Functional, distinct from all three above so a learner never confuses "your turn" with "the truth."

**The rule that governs all four:** a container's form must match its register, and the ranking of visual weight across registers — I heaviest, II lighter, III a break, IV apart — must hold in every palette and every mode. A client may change what the colors *are*; a client may never change what the weights *mean*.

---

## §S3 — The Container Catalogue

The containers, by register. Each carries a structural rule (when it is used), an epistemic job (what it renders), and a treatment (how it looks, on the real brand tokens of §S4). Treatments are stated as *relationships* — heavier, lighter, set-back — because the absolute values move with the palette; the relationships do not.

### Register I — Source-authoritative

**`teaching-caption`** *(was `keypoint`)* — the core sourced assertion.
- *Rule:* one sourced claim that must land — atom type rule / threshold / procedure-step. Every claim that reaches the quiz has passed through here (LXD Landing Rule).
- *Job:* the narrator's caption. This is the truth the course asserts.
- *Treatment:* the display serif (`--font-display`, Lora) at the top of the type scale — the reserved hero treatment. Confident, unbracketed. This is the *only* register that gets it.

**`concept`** — a sourced definition, boxed.
- *Rule:* a named term or formal definition — atom type definition. "Name it, then explain it" (LXD).
- *Job:* establishes vocabulary with source authority.
- *Treatment:* Register-I weight, but contained in a panel surface (`--bg-panel`) to mark it as a definition rather than a proclamation. Authoritative, delimited.

**`consolidation`** *(absorbs `summary` and `list`)* — the structured whole.
- *Rule:* a sequence, map, or grid rendering multiple atoms and their `dependencies` (atom schema §1) — the six steps, the notification map, the pre-quiz review. Order-bearing: where the source mandates a sequence, the container renders it in order (course-audit Pass 2).
- *Job:* assembles many claims into one structure without flattening the dependencies between them.
- *Treatment:* diagram / table / numbered structure, Register-I authority, built *in the player* — never a generated image, because generators mangle text (Build Methodology §M1.5).

### Register II — Held-up-for-examination

**`misconception-held-up`** *(new — its absence is the diagnosed bug)* — a belief the course will refute.
- *Rule:* wherever the script surfaces "where people start" — the padlock-on-a-breaker, the fourth-role belief. **Every course has these; the current taxonomy has no container for them, so they were poured into `teaching-caption` and wore its authority.** This container closes that gap.
- *Job:* holds a belief up for examination. It must read as *quoted*, not taught.
- *Treatment:* the claim set back — smaller than a teaching-caption, in quotation or a belief-container (the thought-bubble analog), rendered in `--font-ui` or a dimmed ink, with the framing ("this is where people start") given equal or greater weight than the belief itself. **Lighter than teaching-caption, always** — and, per §S4, the "lighter" is bought with weight, containment, and quotation, never by dropping below AA contrast. The correction never lives here; it lands in Register III or I.

**`options`** — alternatives held up for comparison (non-quiz).
- *Rule:* competing choices or approaches presented side by side for the learner to weigh.
- *Job:* shows a set of possibilities without pre-asserting the answer.
- *Treatment:* parallel cards, equal weight among themselves, all below Register I. Distinct from `quiz` — options invite thought; quiz demands an answer.

**`scene`** — the establishing or narrative beat.
- *Rule:* cold opens, character moments, resolutions, the breathing beat after heavy load (LXD Breathing Rule). Concrete-before-abstract: the scene precedes the keypoint it sets up (LXD).
- *Job:* renders scaffolding and pure narrative — a situation, illustrative, never a claim.
- *Treatment:* image-forward, text minimal and low-weight, `--font-body`. The one place imagery leads — and even here it is supporting cast, subordinate to the sourced content that follows (§S5).

### Register III — Transitional

**`reveal`** — the turn.
- *Rule:* the beat where a held-up belief breaks and the sourced truth arrives — the thesis, the reframe (LXD `reveal`).
- *Job:* makes the register shift itself visible: II gives way to I.
- *Treatment:* a deliberate visual break — a change of scale, ground, or gutter — distinct from a teaching-caption because it marks *motion*, not a resting assertion. It may borrow Register-I weight for the truth it delivers, but the break is the point.

**`callback`** *(new as a named container; the pattern already lives in `scene`)* — connective reference.
- *Rule:* a later beat that reaches back to an earlier one — the cold-open image returning at resolution (LXD callback structure).
- *Job:* ties the arc together; reinforcement, not new assertion.
- *Treatment:* echoes the earlier beat's imagery at reduced weight, signalling "you have seen this" rather than "learn this now."

### Register IV — Frame and assessment

**`title`** — the module opening frame. Chrome, not teaching. Brand type, the practice's consistent shell.

**`quiz`** — assessment. After all content, never mid-content (LXD). Distractors are plausible misconceptions, not jokes (LXD assessment design) — which is why quiz is Register IV, not II: a wrong option here is *chosen*, then corrected by feedback, not merely held up. Feedback strings are a content layer and audit as one (course-audit Pass 2, Build Methodology §M5).

**`close`** *(was `results`)* — score, takeaway, and next step. The module's resting note; equipped, not merely informed (LXD "end with action").

---

## §S4 — The Chrome and the Token Contract

**One chrome, every course.** The player shell — navigation, progress track, container surfaces, type hierarchy, the light/dark toggle — is identical across every course. The subject does not get its own shell. This is the decision that removes the hardest, most taste-dependent problem from the future builder: it never has to *invent* a coherent design language per subject (the reliable way to produce slop). It applies the fixed containers, drops in a token set, and places imagery. The judgment was made once, here; generation only renders against it. **Consistent chrome is a frozen design surface — the design-layer form of the source freeze.**

**The chrome is sourced from the marketing brand, not invented.** Its type scale, measure, and default palette are the real tokens committed in `sopsnobodyreads-site/styles.css`; designing them from imagination would reintroduce exactly the drift this practice exists to freeze out. The brand defaults:

- **Surface:** `--bg` warm cream `#f4ede0`; `--bg-panel` a derived near-surface for `concept` / card containers; `--rule` ink at 12% for hairlines.
- **Ink:** `--ink` forest green `#1f3a2e` (Register-I text); `--ink-dim` / `--utility` warm gray `#6b5d4a` (held-up text, labels, kickers, UI).
- **Accent:** `--accent` dark aubergine `#3a1f2e` (progress, interactive, reveal emphasis).
- **Type:** `--font-display` Lora (Register I and the reveal); `--font-body` Lora for scene and body; `--font-ui` IBM Plex Sans (labels, misconception attribution, navigation).
- **Scale & measure:** the fluid `clamp()` scale topping at ~42px display, ~17px prose, ~13–14px UI; 36rem measure, 64rem page max, 1.5rem gutter.

**Tokenization within guardrails.** A client brings their palette and fonts by swapping a bounded set of tokens — `--accent`, the three font roles, and optionally the surface tones — exactly as the aesthetic-design skill's Client Brand Themes mechanism already does. What a swap may **never** touch, because these are what make the course legible and the pedagogy hold:

1. **AA contrast, both modes.** Every text token must pass WCAG AA against its surface, in light and in dark. The brand already sits near the floor — warm gray `#6b5d4a` on cream is close to the AA limit for small text — so a client's palette is checked, not assumed, and the held-up "lighter" is never bought by dropping contrast below AA (§S2, §S3).
2. **The register hierarchy.** The visual-weight ranking I › II › III-break › IV must survive the swap. A client's brand color may become the accent; it may not make a misconception render as heavy as a teaching-caption. The chrome enforces the inequality; the token only recolors it.
3. **State confinement.** `--correct` / `--incorrect` are quiz-feedback only, must stay mutually distinguishable (colorblind-safe), and never appear in content (aesthetic-design color rules).

This is the difference between *swappable* and *breakable*: the tokens are open so a client feels at home; the guardrails are closed so a client cannot foot-gun the legibility.

**Dark mode is a toggle over the light default.** The light, marketing-matching palette is the reading default; dark mode is its inverted-palette companion, offered as a learner toggle — not a separate theme, and not the default. Every container's treatment in §S3 is defined in both modes, and the register hierarchy and AA rules hold identically in each. (aesthetic-design's existing dark editorial palette is a natural basis for the dark toggle; see §S6.)

**Delivery-safe.** The shell uses no browser-storage APIs that break inside an LMS frame (a comment naming the constraint is fine); it must run standalone, in an iframe, and as a SCORM package (course-audit Pass 5, Build Methodology §M1.4).

---

## §S5 — The Imagery Boundary

**Range in imagery is the one variable that is supposed to vary.** Each course's images render to its subject — LOTO industrial-noir, mold horror-realism, warehouse bright. This is deliberate, and it is the answer to "should every course look the same": no, and the difference is the point. Discipline lives in the structure and the messaging; range lives in the imagery and the skin.

**But imagery is supporting cast** (Build Methodology §M1.5). It is generated last, it is optional, and a slide with no image and a correct, cited claim outranks a beautiful slide that is subtly wrong. Two bounds hold in every course, however far the aesthetic ranges:

1. **Imagery never occupies Register I.** An image may fill a `scene`, may echo in a `callback`, may set the mood of a `reveal` — but it never *is* the sourced claim, and no image-as-headline may read with a teaching-caption's authority. The claim is text, sourced and cited; the image supports it.
2. **Mood never eats content** (Additions Ledger §8). Pure narrative — imagery, texture, transition — is logged and reviewed for its one failure mode: displacing substance. Film grain, vignette, and the subject's palette are permitted to the degree they do not compete with the sourced word.

Range is licensed *because* structure is disciplined. The two are the same coherence seen from two sides.

---

## §S6 — Reconciliation and Required Conformance

This standard reorganizes an existing taxonomy; it does not invent one over a blank slate. The changes below are the reason committing it creates downstream work.

**The current LXD taxonomy → this standard.** LXD emits ten types (`title, scene, keypoint, reveal, concept, options, list, summary, quiz, results`). The mapping:

- `keypoint` → **`teaching-caption`** (renamed to name its epistemic job).
- `summary` + `list` → **`consolidation`** (folded: both assemble multiple atoms; one container, order-aware).
- `results` → **`close`**.
- `scene`, `reveal`, `concept`, `options`, `quiz`, `title` → retained, each now assigned a register.
- **`misconception-held-up`** and **`callback`** → added. The first is the missing container whose absence was the diagnosed bug; the second names a pattern currently improvised inside `scene`.

**Required conformance (not done in this commit — flagged for review):**

- **LXD** (`references/slide-decomposition-guide.md`) must update its `type` strings, its taxonomy table, and its pacing rules to these container names and registers. The Two-in-a-Row and Breathing rules gain a sharper tool: variety across *registers*, not just types.
- **aesthetic-design** must update `references/slide-type-layouts.md` and `references/theme-specification.md`: the three-theme selection model (Editorial / Retro / Corporate chosen per content register) is **superseded** by one tokenized chrome. Subject character moves to the imagery layer; the dark editorial palette becomes the dark-mode toggle; the Client Brand Themes mechanism generalizes to every course as the token contract (§S4).

These skills are not edited by this commit. Conformance is a reviewed follow-up, because it changes committed behavior.

---

## §S7 — Relationship to the Other Documents

- **The Durability Standard** is the *source* invariant — what a durable course is and why. This standard renders its classifications: the atom schema's `type` / `scope` (§1) and the Additions Ledger's scaffolding / narrative split (§8) are what the register system presents faithfully; Pass 4's coverage tiers (§4) decide which atoms reach a `teaching-caption` and a `quiz`; the adversarial audit (§9) gains a structural criterion — no container wears an authority its content does not hold.
- **The Build Methodology** is the *process* invariant — how a build runs. This standard is the fixed target of its step 3 (decompose to the build — the LXD skill) and step 4 (render the player — the aesthetic-design skill), and it closes a latent gap in step 3: a structural decomposition that "adds, removes, and rewords nothing" (§M1) still loses epistemic status if the structure it decomposes *into* has only one container. The register system is the vocabulary that lets the decomposition preserve status, not just words.
- **The course-audit skill** gains its structural backstop here: emphasis drift (Pass 3) and the "does formatting track the source's *shall*" check are prevented by default when form matches register, rather than caught case by case.
- **The positioning doctrine** is unaffected in content but shares the law: render, don't create — in structure exactly as in message.

This is the third invariant. Source says *teach only what the document says.* Process says *render it, never create it.* Structure says *and present each statement as what it is — never grant it an authority the source withholds.*

---

*Version 0.1 — 2026-07-18. Built from the LOTO player diagnosis (one container for every statement, so the misconception wore the truth's authority) and the real brand tokens in `sopsnobodyreads-site/styles.css`. Unexecuted: validated when the LOTO player is rebuilt under it and passes an epistemic-status audit and an AA-contrast check in both modes. Provisional in the sense every living document is — the next course that surprises it revises it.*
