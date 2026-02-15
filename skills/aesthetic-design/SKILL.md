---
name: aesthetic-design
description: "Visual design skill for SOPs Nobody Reads module player. Use when applying a visual theme to a MODULE data structure. Takes the MODULE JSON (produced by the LXD skill) and a theme selection, then generates the complete HTML player with the appropriate visual identity. Manages the theme system (CSS custom properties), slide type layouts, typography pairing, and responsive behavior. Does NOT make content decisions — those come from the LXD skill."
---

# Aesthetic Design

Apply visual themes to the SOPs Nobody Reads HTML player.

## When to Use This Skill

You have a completed MODULE data object (from the LXD skill) and need to generate the HTML player with a specific visual identity. This skill handles all visual decisions: which theme to apply, how slide types render, typography, color, texture, spacing, and responsive behavior.

## The Theme System

Themes are CSS custom property sets that cascade through the player's slide type layouts. The HTML structure and JavaScript are identical across themes — only the CSS changes. This means:

- Switching themes = swapping the `<style>` block
- MODULE data is theme-agnostic
- All slide types work in all themes
- Custom client themes extend the base system

## Theme Selection

### When to Use Each Theme

| Theme | Register | Content Type | Visual Character |
|-------|----------|-------------|------------------|
| **Editorial** | Serious, contemplative | Flagship courses, paradigm shifts, content that challenges worldview | Dark, warm, spacious. Prestige documentary feel. |
| **Retro** | Playful, memorable | Marketing clips, social teasers, lighter compliance content, onboarding checklists | Bright, textured, charming. 60s educational film. |
| **Corporate** | Neutral, professional | Client-branded deliverables, company-specific training | Clean, minimal, disappears behind content. |

**Decision framework:** Match the theme to the emotional register of the content, not the subject matter. A cybersecurity training module that takes a serious, "this affects your life" approach → Editorial. The same content framed as "quick tips for staying safe" → Corporate or Retro.

See `references/theme-specification.md` for full CSS definitions of each theme.

## Typography System

Each theme specifies three font roles:

| Role | Usage | Guidelines |
|------|-------|------------|
| `--font-display` | Headings, dramatic text, large statements | Highest visual weight. Sets the emotional tone. |
| `--font-body` | Supporting text, descriptions, scene narration | Readable at small sizes. Comfortable for 30–50 words. |
| `--font-ui` | Labels, kickers, navigation, meta-text | Functional. Small caps, letter-spacing. Doesn't compete with content. |

**Pairing rules:**
- Display + Body should be from different type families (serif + serif is fine if they contrast in weight/style; serif + sans is classic)
- UI font should always be sans-serif for clarity at small sizes
- Display font carries the theme's personality. Body font is invisible. UI font is utilitarian.
- Google Fonts only — everything must load from CDN for self-contained HTML files

## Slide Type Layouts

See `references/slide-type-layouts.md` for the complete CSS specification of each slide type.

Every slide type has a fixed layout structure that works across themes. The theme affects colors, fonts, spacing scale, and texture — NOT the fundamental layout (flex direction, alignment, element hierarchy).

Layout invariants (true in all themes):
- All slides are `position: absolute; inset: 0` with flexbox centering
- Transitions are `opacity 0.6s ease` between slides
- Padding scales with viewport units (`vh`, `vw`) for proportional spacing
- Text uses `clamp()` for fluid responsive sizing
- Maximum content width is constrained (headings: ~20ch, body: ~48ch) to prevent eye-tracking fatigue

## Color System

Each theme defines these CSS custom properties:

```css
/* Backgrounds */
--bg-dark        /* deepest background */
--bg-card        /* card/panel surfaces */
--bg-warm        /* gradient endpoint for warmth */

/* Text */
--cream          /* primary text */
--cream-dim      /* secondary/body text */

/* Accents */
--olive          /* success, nature, calm */
--olive-light    /* success text/highlights */
--rust           /* scene labels, warm alerts */
--rust-light     /* warm emphasis */
--gold           /* primary accent, interactive elements */
--gold-dim       /* muted accent, progress bars */

/* State */
--red-dim        /* incorrect/error */
--green-dim      /* correct/success */
--charcoal       /* card backgrounds, quiz options */
```

**Color usage rules:**
- Gold is the primary interactive/accent color across all themes
- Olive tones = success, correctness, positive outcomes
- Rust tones = scenes, warmth, gentle alerts
- Red/green dims = quiz feedback only. Never used in content.
- Background gradients use `170deg` angle consistently for subtle directional warmth

## Texture and Effects

### Film Grain
SVG-based noise texture at low opacity, animated with CSS `steps()` for organic movement. Intensity varies by theme:
- Editorial: `opacity: 0.035` — subtle, adds depth without distraction
- Retro: `opacity: 0.06` — more visible, part of the aesthetic
- Corporate: `opacity: 0` or removed — clean, no texture

### Vignette
Radial gradient overlay darkening edges. Intensity varies:
- Editorial: `rgba(10,8,4,0.6)` at edges — cinematic, focuses attention center
- Retro: `rgba(10,8,4,0.5)` — slightly softer
- Corporate: removed — no vignette

### Scanlines
Repeating linear gradient on slide `::after` pseudo-element. Extremely subtle (`rgba(0,0,0,0.015)`). Present in Editorial and Retro, absent in Corporate.

## Responsive Breakpoints

Single breakpoint at `768px` (tablet/mobile). Below this:
- Slide padding reduces from `4vh 8vw` to `3vh 5vw`
- Options grid switches to single column
- Summary grid switches to single column
- Waitlist form stacks vertically
- List slides reduce horizontal padding

The player is designed for landscape/desktop viewing first. Mobile is supported but not the primary consumption context.

## Player Shell

The bottom navigation bar is theme-aware but structurally identical:
- Progress track (thin line, fills with `--gold-dim`)
- Slide counter (`font-ui`, small)
- Prev/Next buttons (transparent, border, `font-ui`)

The bar uses `rgba` background for slight transparency over the slide content. Border-top uses very low opacity `--cream` to separate without hard lines.

## Building a Complete Player

1. Start with the HTML skeleton (player shell, slide container, bottom bar)
2. Apply the selected theme's `<style>` block
3. Inject the MODULE data as a JavaScript object
4. Include the standard player JavaScript (navigation, quiz engine, SCORM wrapper)
5. Everything in one self-contained HTML file — no external dependencies except Google Fonts CDN

The output should be a single `.html` file under 50KB that works:
- Standalone in a browser (demo/sales context)
- Inside an LMS as a SCORM package (with imsmanifest.xml wrapper)
- Embedded in an iframe (landing page context)

## Client Brand Themes

For client deliverables, create a custom theme by:
1. Starting from the Corporate base
2. Replacing `--gold` and `--gold-dim` with client brand primary color
3. Replacing fonts with client brand fonts (must be available on Google Fonts or included as assets)
4. Optionally replacing background tones to match brand darkness/lightness
5. Keeping all layout and type scale unchanged

Client themes should feel like the client's design system, not like SOPs Nobody Reads. Our brand appears only in the SCORM metadata, not in the visual presentation.

## References

- `references/theme-specification.md` — Full CSS for Editorial, Retro, and Corporate themes
- `references/slide-type-layouts.md` — Complete CSS specification for each slide type layout
