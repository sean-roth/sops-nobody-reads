# Theme Specification

Complete CSS custom property definitions for each theme.

## Editorial Theme

**Character:** Dark, warm, spacious. Prestige documentary. "This matters, take your time."  
**Font stack:** Playfair Display (display) + Source Serif 4 (body) + DM Sans (UI)  
**Palette:** Deep browns and warm neutrals. Gold accents. Olive success tones. Rust for warmth.

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --bg-dark: #1a1812;
  --bg-card: #2a2620;
  --bg-warm: #332e26;
  --cream: #f0e8d8;
  --cream-dim: #c8bfad;
  --olive: #5c6b4f;
  --olive-light: #7a8c6a;
  --rust: #b8704a;
  --rust-light: #d4956a;
  --gold: #c9a84c;
  --gold-dim: #8a7535;
  --red-dim: #8b3a3a;
  --green-dim: #4a6b4a;
  --charcoal: #3a3632;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-ui: 'DM Sans', 'Segoe UI', sans-serif;
}

/* Grain: opacity 0.035, animated */
/* Vignette: rgba(10,8,4,0.6) at edges */
/* Scanlines: rgba(0,0,0,0.015) repeating 2px/4px */
```

**When to use:** Flagship AI onboarding course. Any content where the learner's worldview is being challenged. Modules that induce the "existential wobble." Content that demands respect and space.

---

## Retro Theme

**Character:** 1960s educational film. Warm, playful, nostalgic. "Learning can be charming."  
**Font stack:** Archivo Black (display) + Lora (body) + Space Mono (UI)  
**Palette:** Warmer, brighter. Mustard yellows, warm oranges, avocado green. Higher contrast.

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Lora:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg-dark: #2a2218;
  --bg-card: #3d3428;
  --bg-warm: #4a3e2e;
  --cream: #f5edd5;
  --cream-dim: #d4c9a8;
  --olive: #6b7a42;
  --olive-light: #8a9d5c;
  --rust: #c45e2a;
  --rust-light: #e87d40;
  --gold: #d4a020;
  --gold-dim: #a67d18;
  --red-dim: #a04030;
  --green-dim: #507040;
  --charcoal: #4a4035;
  --font-display: 'Archivo Black', Impact, sans-serif;
  --font-body: 'Lora', Georgia, serif;
  --font-ui: 'Space Mono', 'Courier New', monospace;
}

/* Grain: opacity 0.06, animated */
/* Vignette: rgba(10,8,4,0.5) at edges */
/* Scanlines: rgba(0,0,0,0.025) repeating 2px/4px */
/* Additional: consider rounded corners on cards (border-radius: 8px) */
/* Additional: consider projector flicker animation on slide transitions */
```

**When to use:** Social media clips and course teasers. Lighter compliance modules (workplace safety refreshers, onboarding checklists). Marketing materials. Content where charm and memorability matter more than gravity. NOT for the AI onboarding course flagship modules.

---

## Corporate Theme

**Character:** Clean, neutral, professional. Disappears behind the content. "Your brand, our structure."  
**Font stack:** Inter (display + UI) + Source Serif 4 (body)  
**Palette:** Near-black backgrounds, white text, blue-gray accents. Minimal warmth.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

:root {
  --bg-dark: #121418;
  --bg-card: #1e2028;
  --bg-warm: #1a1c22;
  --cream: #f0f0f4;
  --cream-dim: #a0a4b0;
  --olive: #3a7a5c;
  --olive-light: #4ca876;
  --rust: #7a8a9a;
  --rust-light: #9aaaba;
  --gold: #5a8abf;
  --gold-dim: #3a6a9f;
  --red-dim: #8b3a3a;
  --green-dim: #3a6b4a;
  --charcoal: #252830;
  --font-display: 'Inter', 'Segoe UI', sans-serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-ui: 'Inter', 'Segoe UI', sans-serif;
}

/* Grain: none (opacity: 0 or element removed) */
/* Vignette: none */
/* Scanlines: none */
/* Clean backgrounds, no texture effects */
```

**When to use:** Client-branded training deliverables. Replace accent colors (`--gold`, `--gold-dim`) with client brand colors. Replace fonts if client has brand fonts on Google Fonts. This theme is a starting point for customization, not a finished product.

---

## Creating Client Brand Themes

Start from Corporate. Override these properties minimum:

```css
:root {
  --gold: [client primary color];
  --gold-dim: [client primary color, darkened 20%];
  --font-display: [client heading font];
  /* --font-body and --font-ui can stay as defaults unless client specifies */
}
```

For clients with light brand palettes, you may need to invert the background scheme:
```css
:root {
  --bg-dark: #f8f8fa;
  --bg-card: #ffffff;
  --bg-warm: #f0f0f4;
  --cream: #1a1a2e;
  --cream-dim: #4a4a5e;
  --charcoal: #e8e8ec;
}
```

Test all slide types after palette inversion — some opacity values on borders and overlays may need adjustment for light backgrounds.
