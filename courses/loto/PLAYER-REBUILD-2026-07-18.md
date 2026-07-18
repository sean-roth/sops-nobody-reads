# LOTO Player Rebuild — Brief for a Fresh Build Instance

**Date:** 2026-07-18
**For:** a Sonnet instance with repo access (GitHub MCP) and a Playwright-capable browser environment.
**Task type:** presentation rebuild — NOT content work, NOT a redesign.
**Governing document:** `docs/standards/SLIDE-TYPE-STANDARD.md` (on `main`). Build to it.

---

## 1. What this is

SOPs Nobody Reads turns regulatory and company source documents into interactive training courses. The LOTO course (29 CFR 1910.147, three modules) has a finished, adversarially-audited HTML player — the *content* is verified and must not be touched. But the player renders every kind of statement in one visual container (a serif hero headline), so a misconception the course means to refute looks exactly as authoritative as a regulatory requirement. A learner cannot tell a belief from a truth by looking.

The Slide-Type Standard fixes this structurally: every slide type belongs to an epistemic *register*, and a container's form must carry the status its content holds. Your job is to rebuild the LOTO player so it conforms — one consistent chrome, the register-appropriate container treatments, and (the heart of it) the belief-vs-truth distinction made visible.

## 2. Read first, in this order

1. **`docs/standards/SLIDE-TYPE-STANDARD.md`** — the spec you build against. Read it in full before touching anything. Closest attention to §S2 (the four registers), §S3 (the container catalogue and each container's treatment), §S4 (the chrome and token contract), §S5 (the imagery boundary), and §S6 (what changed from the current taxonomy).
2. **`docs/standards/BUILD-METHODOLOGY.md`** (§M1 workflow, §M1.5 imagery-is-supporting-cast) and **`docs/standards/DURABILITY-STANDARD.md`** (§1 atom types, §8 additions ledger) — the source and process invariants the Standard extends. Skim for the frozen-vs-rendered discipline.
3. **The `lxd` and `aesthetic-design` skills** — the current decomposition and rendering skills. *Important:* the Standard **supersedes** aesthetic-design's three-theme model (§S6). Build to the Standard's single tokenized chrome, not to Editorial/Retro/Corporate. These skills have not yet been updated to conform — that's a separate task — so where their current text conflicts with the Standard, the Standard wins.
4. **`styles.css`** from the marketing-site repo (`sean-roth/sopsnobodyreads-site` — confirm the repo name and pull via the GitHub MCP, not the unauthenticated API). This is the canonical source for the chrome's palette, type scale, and measure. **Do not invent design tokens** — the point of consistent chrome is that it renders from the brand, not from imagination.

## 3. Current state — what you're rebuilding

- **Player (replace):** `courses/loto/builds/index.html` — the current single-container player.
- **Build data (content frozen; types reclassified):** `courses/loto/builds/module-01.json`, `module-02.json`, `module-03.json` — the MODULE JSON objects, typed in the current taxonomy (`title, scene, keypoint, reveal, concept, options, list, summary, quiz, results`). Every claim in these files is source-verified and has passed adversarial audit (see `courses/loto/AUDIT-*.md`, `PRODUCTION-LOG.md`, `REWORK-2026-07-16.md`). **Treat the content as frozen.**
- **Imagery (preserve exactly):** `courses/loto/builds/module-01/`, `module-02/`, `module-03/` and the `module-0*-image-manifest.md` files — the LOTO industrial-noir comic art. This is the per-subject imagery the Standard explicitly licenses to range (§S5). Do not regenerate or restyle it.
- **Live demo:** `https://sean-roth.github.io/sops-nobody-reads/courses/loto/builds/index.html` — a sales asset. It must not change until Sean signs off (§5).

## 4. The build

**a. Chrome (§S4).** One consistent shell sourced from `styles.css`: the light palette as the reading default (warm cream `--bg`, forest `--ink`, aubergine `--accent`), the fluid `clamp()` type scale and measure, the container surfaces, and a **dark-mode toggle** (inverted palette — not a separate theme, not the default). The register hierarchy and AA contrast hold identically in both modes.

**b. Container treatments (§S2, §S3).** Every slide type renders in its register-appropriate form. Changes from the current player:

- **`misconception-held-up` — the new container, and the core of this rebuild.** A belief the course refutes: set back, quoted, in `--font-ui` or dimmed ink, *lighter than a teaching-caption*, with the framing ("this is where people start") weighted at least as heavily as the belief itself. Never below AA contrast (§S4). The correction never shares this container — it lands in a `reveal` or a `teaching-caption`.
- **`teaching-caption`** (was `keypoint`): the reserved display-serif hero treatment. **Only sourced truths get it.**
- Fold `summary` + `list` → **`consolidation`** (order-aware; built in the player, never as a generated image). `results` → **`close`**. Add **`callback`**. Keep `scene`, `reveal`, `concept`, `options`, `quiz`, `title` with the registers §S3 assigns them.

**c. The reclassification — the judgment this rebuild requires.** Because the old taxonomy had no misconception container, beliefs-to-be-refuted are currently typed `keypoint` and wear the truth's authority. Walk every slide in the three module JSONs. For each slide typed `keypoint` (and any other slide presenting a belief), decide its true register: a sourced truth stays `teaching-caption`; a belief-held-up-for-examination moves to `misconception-held-up`. Update the `type` strings accordingly. **Where a slide's correct register is genuinely ambiguous, flag it for Sean — do not guess.** Silently promoting a belief to a truth (or demoting a truth) is the exact failure this standard exists to prevent.

**d. Constraints (§S4).** Single self-contained HTML file; Google Fonts CDN only; no `localStorage`/`sessionStorage` or other browser storage that breaks inside an LMS iframe (a comment naming the constraint is fine); must run standalone, in an iframe, and as a SCORM package.

## 5. Acceptance gate — before/after Playwright screenshots

Do not report the rebuild complete without this. It is the acceptance test.

1. **Before:** with Playwright, screenshot the current player (`courses/loto/builds/index.html`) as it stands. Capture a representative spread, and specifically at least one **taught-truth** slide and one **misconception** slide — the two that are currently indistinguishable.
2. Rebuild.
3. **After:** screenshot the *same* slides in the rebuilt player, in **both light and dark modes**.
4. **The gate — the after-state must demonstrate:**
   - a misconception slide is immediately, visually distinguishable from — and lighter than — a teaching-caption slide;
   - the chrome matches the `styles.css` brand (light default);
   - the register weight-ranking holds and all text passes AA contrast, in both modes.

   The before/after pairs are the evidence that the bug is fixed, not merely moved.
5. **Present the before/after set to Sean.** The rebuild is accepted only when Sean signs off on the screenshots (a human signs — Durability §7, Build Methodology §M5). The live demo does not update until then.

## 6. Scope guards — do NOT

- **Do not touch the imagery.** The LOTO noir art is correct and subject-appropriate (§S5).
- **Do not edit, add, or reword any claim or content string** in the module JSON. Presentation only — regenerate the player from the build; never hand-patch content (Build Methodology §M1 / §M3). If you believe a claim is wrong, *flag it* — the content is audited; fixing it is out of scope here.
- **Do not invent slide types** beyond the Standard's set. A slide that fits none is a flag, not a new container.
- **Do not build to the old three-theme model.** One tokenized chrome (§S4).
- **Do not add browser storage. Do not commit to `main`, and do not stack branches** (§M5: branch off `main`, base on `main`). Work on a branch; hand back the branch for review.

## 7. Hand back

- The rebuilt `index.html`, plus the module JSONs with updated `type` strings (the type reclassification only — no content changes).
- The before/after screenshot set (both modes).
- A short change note: which slides moved `keypoint` → `misconception-held-up` (and any other reclassifications), any slides flagged as ambiguous, and any deviation from the Standard with its justification.

Build against the committed Standard. When in doubt about how a statement should read, that doubt is a flag for Sean — not a guess to make.
