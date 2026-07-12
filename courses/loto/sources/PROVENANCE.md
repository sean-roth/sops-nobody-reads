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

## §3 fidelity note

Prose section throughout; Appendix A is a fill-in-the-blank procedural template (the standard's own "Typical Minimal Lockout Procedure" form) and was transcribed verbatim with no fields altered, added, or omitted.
