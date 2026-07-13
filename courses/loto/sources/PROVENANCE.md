# Source Provenance — 29 CFR 1910.147

- **Citation:** 29 CFR 1910.147 — The control of hazardous energy (lockout/tagout), including Appendix A (Typical Minimal Lockout Procedure).
- **Primary source URL (eCFR):** https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-J/section-1910.147
- **eCFR currency:** up to date as of 7/01/2026; content last changed 2017-01-03 (per eCFR site metadata).
- **Last actual amendments:** 76 FR 24698 (May 2, 2011); 76 FR 44265 (July 25, 2011) — per the closing citation line of the fetched text, which also carries the earlier 54 FR 36687 (Sept. 1, 1989), 54 FR 42498 (Oct. 17, 1989), and 55 FR 38685/38686 (Sept. 20, 1990) amendments.
- **Fetched:** 2026-07-12
- **Frozen file:** `courses/loto/sources/29-CFR-1910.147.md`
- **SHA-256:** `28f449dd8c333046ef9b777bece07096f91ade9421e579d3dc88dd2eab2cf157`

## Extraction method

Fetched via `curl` directly to disk (`text/html`, server-rendered — no JavaScript execution required; verified the eCFR response contains full paragraph text, not a client-side shell). The regulatory text span was extracted programmatically (Python `html.parser`, tag-stripping only — no manual retyping or paraphrase) from the `<h4>§ 1910.147 The control of hazardous energy...</h4>` heading through the closing Federal Register citation paragraph `[54 FR 36687, ... 76 FR 44265, July 25, 2011]`, inclusive of Appendix A. Site chrome (nav, breadcrumbs, sidebar, footer, embedded JSON metadata) was excluded by bounding the extraction to that line range before parsing. Paragraph lettering/numbering ((a)(1)(i), (c)(4)(i) Note, (d)(5)(ii), etc.) is preserved verbatim as it appears in the source's own paragraph-hierarchy markup — not reconstructed or renumbered.

## Cross-check

Independently fetched OSHA's rendering as a second source:
- Main text: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147 (covers paragraphs (a)–(f))
- Appendix A (hosted on a separate OSHA page, linked from the main page's "Appendix" field): https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147AppA

**Four anchor passages verified verbatim in the frozen eCFR file AND in the OSHA cross-check (main page for a/b, Appendix A page for c/d):**

a. Energy source definition, (b): "Any source of electrical, mechanical, hydraulic, pneumatic, chemical, thermal, or other energy." — confirmed in frozen file and osha.gov main page.
b. (d)(5)(ii) reaccumulation caveat: "If there is a possibility of reaccumulation of stored energy to a hazardous level, verification of isolation shall be continued until the servicing or maintenance is completed, or until the possibility of such accumulation no longer exists." — confirmed in frozen file and osha.gov main page.
c. Appendix A step (6): "...capacitors, springs, elevated machine members, rotating flywheels, hydraulic systems, and air, gas, steam, or water pressure..." — confirmed in frozen file and osha.gov Appendix A page.
d. Appendix A step (7): "Return operating control(s) to neutral or 'off' position after verifying the isolation of the equipment." — confirmed in frozen file and osha.gov Appendix A page (text appears under an inline "Caution:" label in both sources — this is source-native, not an extraction artifact).

## Full-document completeness cross-check

Beyond the four anchor passages, the entire OSHA rendering (both pages) was extracted with the same tag-stripping method and compared against the frozen eCFR file for structural and content completeness — not just spot-checked.

- **Paragraph structure:** every paragraph locator ((a)(1)(i) through the end of Appendix A) present in one source's markup is present in the other. An initial automated diff flagged apparent gaps (all twelve `(b)` definitions; the `(a)(2)(iii)(B)` cord-and-plug/hot-tap subitems; the `(c)(5)(ii)(A)`/`(C)` durability subitems), all of which were artifacts of the two sites' different HTML ID schemes (eCFR embeds `<em>` tags inside its numbering labels; OSHA doesn't break `(b)` into per-term IDs). Each flagged item was manually verified present, verbatim, in both sources.
- **Shared transcription artifact:** `(c)(6)(i)(A)` reads "...shall be **perfomed** by an authorized employee..." (missing r) in both the eCFR and OSHA fetches — confirms both sites are serving the same underlying text, not independently-drifted copies.
- **Word count:** eCFR frozen text ~4,936 words vs. OSHA main+AppA ~4,836 words. The ~2% delta is fully accounted for by the citation-trailer discrepancy below; no missing regulatory provisions.

**Citation-trailer discrepancy (history metadata only — does not affect any regulatory text taught in the course):**

| Source | Closing FR citation |
|---|---|
| eCFR (frozen, authoritative) | 54 FR 36687; 54 FR 42498; 55 FR 38685, 38686; 76 FR 24698; **76 FR 44265** |
| osha.gov main page | 54 FR 36687; 54 FR 42498; 55 FR 38685, 38686; **61 FR 5507**; 76 24698 *(missing 76 FR 44265; "FR" dropped from the 2011 cite)* |
| osha.gov Appendix A page | 54 FR 36687; 54 FR 42498; 55 FR 38685; **61 FR 5507** *(missing both 2011 amendments)* |

OSHA's two standalone pages disagree with each other and both lag the eCFR citation history by omitting the July 2011 amendment (76 FR 44265); eCFR additionally omits a February 1996 correction (61 FR 5507) that both OSHA pages carry. eCFR was treated as authoritative for the frozen text and its citation line, consistent with it being the continuously Federal-Register-synced codification (vs. OSHA's standalone regulation pages, which are not guaranteed to be refreshed on the same cadence). This discrepancy was not independently resolved against govinfo.gov's Federal Register archive — noted here per Durability Standard §2.2 rather than silently reconciled, since it is provenance metadata rather than a course-facing claim.

## §3 fidelity note

Prose section throughout; Appendix A is a fill-in-the-blank procedural template (the standard's own "Typical Minimal Lockout Procedure" form) and was transcribed verbatim with no fields altered, added, or omitted.

---

# Source Provenance — 29 CFR 1910.399 (Qualified Person)

Secondary source. Frozen to gate Module 3's NEW-1 reframe (LOTO teaches three employee roles, not four — "qualified person" is a real OSHA term but belongs to Subpart S electrical safety, not to 1910.147).

- **Citation:** 29 CFR 1910.399 — Definitions applicable to this subpart (Subpart S, Electrical), "Qualified person" entry only, with its two Notes. Supporting excerpts: 29 CFR 1910.331(a) (Scope — qualified/unqualified persons) and 29 CFR 1910.332(b) (Training — content of training for qualified persons).
- **Primary source URL (eCFR):** https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-S/subject-group-ECFR314553c63ae81f4/section-1910.399
  - Supporting: https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-S/subject-group-ECFRbd7903c591a5eff/section-1910.331
  - Supporting: https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-S/subject-group-ECFRbd7903c591a5eff/section-1910.332
- **eCFR currency:** up-to-date as of 7/14/2026 (per eCFR site metadata at fetch time).
- **Fetched:** 2026-07-14
- **Frozen file:** `courses/loto/sources/29-CFR-1910.399-qualified-person.md`
- **SHA-256:** `20a5856023139fed9ee788a5151387504d50719e3024de7b7c020de919540f86`

## Extraction method

Same discipline as the 1910.147 freeze: fetched via `curl` directly to disk, extracted programmatically (Python `html.parser`, tag-stripping only). Deliberately narrow scope — extracted only the `<div id="p-1910.399(Qualified%20person)">` block (the "Qualified person" definition plus its Note 1 and Note 2), not the whole of 1910.399's much larger definitions list. The 1910.331 and 1910.332 excerpts are similarly narrow: 1910.331's scope paragraph (a) intro sentence only (not its full list of covered installations, which is irrelevant to the LOTO reframe), and 1910.332(b) "Content of training" including subitems (1)–(3)(iii) (the paragraph explicitly cross-referenced by 1910.399's Note 1).

## Cross-check

Independently fetched OSHA's rendering: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.399

The "Qualified person" definition and both of its Notes were verified verbatim between the frozen eCFR file and the OSHA page — identical text (only a cosmetic period-placement difference relative to an italics tag, not a content difference). 1910.331 and 1910.332 were not independently cross-checked against OSHA (out of scope for this narrow freeze — those two excerpts are supporting context for the reframe, not the load-bearing citation; the load-bearing "qualified person" definition itself is the one that was cross-checked).

## §3 fidelity note

All three excerpts are prose definitions/scope statements, no tables or figures. Transcribed verbatim, including the source's own internal cross-references (e.g., "(See 1910.332(b)(3)...)") which are preserved as-is rather than resolved or annotated.
