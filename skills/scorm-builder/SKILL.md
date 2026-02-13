---
name: scorm-builder
description: "Build SCORM-compliant e-learning packages from slide images, audio files, and quiz data. Use when assembling training modules for LMS delivery. Takes a YAML config file pointing to slide images, audio narration files, and quiz questions, then produces a valid SCORM 1.2 or 2004 zip package with an HTML player that handles slide display, audio sync, quiz interaction, score reporting, and completion tracking."
---

# SCORM Builder

Assemble slide images, audio files, and quiz data into SCORM-compliant packages.

## Quick Start

1. Read the module config YAML
2. Read the player template from `assets/player-template/`
3. Copy slide images and audio files into the package structure
4. Generate `imsmanifest.xml` from config metadata
5. Inject quiz data into the player
6. Apply theme/brand CSS
7. Zip everything into a SCORM package

## Module Config Format

Each module is defined by a YAML config:

```yaml
module:
  title: "Module Title"
  description: "Brief description"
  duration: "25 min"
  scorm_version: "1.2"     # "1.2" or "2004"
  passing_score: 75         # percentage

theme:
  template: "default"       # template name from assets/themes/
  primary_color: "#2B4C3F"  # CSS override
  accent_color: "#D4A574"   # CSS override
  logo: null                # path to logo image or null

slides:
  - image: "slide-01.png"
    audio: "slide-01.mp3"
    duration: 45              # seconds (fallback if audio metadata unavailable)
  - image: "slide-02.png"
    audio: "slide-02.mp3"
    duration: 30

quiz:
  - question: "Question text here?"
    options:
      - "Option A"
      - "Option B"
      - "Option C"
      - "Option D"
    correct: 1               # 0-indexed
```

## Package Structure

The output zip must contain:

```
module-name.zip/
├── imsmanifest.xml
├── index.html
├── css/
│   └── player.css
├── js/
│   ├── player.js
│   ├── quiz.js
│   └── scorm-api.js
├── slides/
│   ├── slide-01.png
│   └── ...
├── audio/
│   ├── slide-01.mp3
│   └── ...
└── assets/
    └── [logo, fonts if needed]
```

## SCORM Manifest

See `references/manifest-reference.md` for the full imsmanifest.xml specification.

Minimal SCORM 1.2 manifest:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="MODULE_ID" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_ID">
    <organization identifier="ORG_ID">
      <title>MODULE_TITLE</title>
      <item identifier="ITEM_ID" identifierref="RES_ID">
        <title>MODULE_TITLE</title>
        <adlcp:masteryscore>PASSING_SCORE</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_ID" type="webcontent"
      adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="css/player.css"/>
      <file href="js/player.js"/>
      <file href="js/quiz.js"/>
      <file href="js/scorm-api.js"/>
      <!-- list all slide and audio files -->
    </resource>
  </resources>
</manifest>
```

Replace MODULE_ID, ORG_ID, ITEM_ID, RES_ID with slugified module title. Replace MODULE_TITLE and PASSING_SCORE from config.

Every file in the package must be listed in the manifest's resource file list.

## SCORM API Integration

See `references/scorm-api-reference.md` for the full SCORM API specification.

The player must communicate with the LMS using these calls:

### Initialization
```javascript
// Find the SCORM API object (traverse window hierarchy)
function findAPI(win) {
  let attempts = 0;
  while ((!win.API) && (win.parent) && (win.parent != win) && (attempts < 10)) {
    win = win.parent;
    attempts++;
  }
  return win.API || null;
}

const API = findAPI(window);
API.LMSInitialize("");
```

### During Module
```javascript
// Save bookmark (current slide index)
API.LMSSetValue("cmi.core.lesson_location", slideIndex.toString());
API.LMSCommit("");

// Set lesson status
API.LMSSetValue("cmi.core.lesson_status", "incomplete");
```

### On Quiz Completion
```javascript
// Report score
API.LMSSetValue("cmi.core.score.raw", score.toString());
API.LMSSetValue("cmi.core.score.min", "0");
API.LMSSetValue("cmi.core.score.max", "100");

// Set completion
const status = score >= passingScore ? "passed" : "failed";
API.LMSSetValue("cmi.core.lesson_status", status);
API.LMSCommit("");
```

### On Exit
```javascript
API.LMSSetValue("cmi.core.exit", "suspend");  // or "" for normal exit
API.LMSFinish("");
```

### On Resume
```javascript
// Restore bookmark
const bookmark = API.LMSGetValue("cmi.core.lesson_location");
if (bookmark) {
  currentSlide = parseInt(bookmark);
}
```

## Player Template

The HTML player template is in `assets/player-template/`. It provides:

- **Slide display**: Full-viewport image display with fade transitions
- **Audio sync**: HTML5 audio player, auto-advances to next slide when audio ends
- **Navigation**: Previous/Next buttons, progress bar, slide counter
- **Quiz rendering**: Multiple-choice questions with immediate feedback
- **Score calculation**: Percentage-based, compared against passing_score
- **SCORM hooks**: All API calls wired to player events
- **Bookmark/Resume**: Saves slide position on exit, restores on re-entry
- **Theme system**: CSS custom properties for colors, fonts, branding

Customize appearance through the theme section of the config. The template uses CSS custom properties:

```css
:root {
  --primary-color: #2B4C3F;
  --accent-color: #D4A574;
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
  --font-family: 'Georgia', serif;
}
```

## Themes

Theme presets live in `assets/themes/`. Each is a CSS file that overrides the custom properties.

- `default.css` — Clean, neutral corporate
- `retro-drivers-ed.css` — 1960s educational film aesthetic (muted colors, film grain, serif fonts)
- `client-brand.css` — Template for client brand colors/fonts/logo

To apply a theme, set `theme.template` in the config. Color overrides in the config take precedence over the theme file.

## Build Checklist

Before packaging, verify:

- [ ] All slide images exist and are referenced
- [ ] All audio files exist and are referenced
- [ ] imsmanifest.xml lists every file in the package
- [ ] Quiz correct answers match the intended answers from the script
- [ ] Passing score is set correctly
- [ ] SCORM version matches what the client's LMS supports
- [ ] Module title and description are correct
- [ ] Theme/brand CSS is applied
- [ ] Logo file included if specified
- [ ] No absolute paths in any file references (all relative)
- [ ] Zip file structure is flat at root (imsmanifest.xml at zip root, not in a subfolder)

## Common LMS Quirks

- **SCORM 1.2 vs 2004**: Default to 1.2 unless client specifically requests 2004. 1.2 has broader LMS support.
- **Zip root**: Some LMS platforms fail if imsmanifest.xml isn't at the root of the zip (not in a subfolder). Always verify.
- **API detection**: Different LMS platforms expose the API object at different levels of the window hierarchy. The findAPI function traverses up to 10 levels.
- **Completion vs. success**: SCORM 1.2 uses `lesson_status` (passed/failed/completed/incomplete). Set to "passed" or "failed" based on quiz score, not just "completed".
- **Commit frequency**: Call LMSCommit() after setting values. Some LMS platforms don't persist without explicit commit.
- **File size**: Keep total package under 100MB. Compress images, use reasonable audio bitrate (128kbps MP3 is fine for narration).

## References

- `references/manifest-reference.md` — Full imsmanifest.xml specification and examples
- `references/scorm-api-reference.md` — Complete SCORM 1.2 and 2004 API documentation
- `assets/player-template/` — HTML/CSS/JS player template files
- `assets/themes/` — CSS theme presets
