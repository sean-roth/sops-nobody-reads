# SCORM Manifest Reference

The `imsmanifest.xml` file is the entry point for any SCORM package. The LMS reads this file first to understand the package structure.

## SCORM 1.2 Manifest

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="com.sopsnobodyreads.MODULE_SLUG"
         version="1.0"
         xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
         xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                             http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="org-MODULE_SLUG">
    <organization identifier="org-MODULE_SLUG">
      <title>MODULE_TITLE</title>
      <item identifier="item-MODULE_SLUG" identifierref="res-MODULE_SLUG">
        <title>MODULE_TITLE</title>
        <adlcp:masteryscore>PASSING_SCORE</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="res-MODULE_SLUG"
              type="webcontent"
              adlcp:scormtype="sco"
              href="index.html">
      <file href="index.html"/>
      <file href="css/player.css"/>
      <file href="js/player.js"/>
      <file href="js/quiz.js"/>
      <file href="js/scorm-api.js"/>
      <!-- ALL slide images -->
      <!-- ALL audio files -->
      <!-- ALL asset files (logo, fonts) -->
    </resource>
  </resources>
</manifest>
```

## Generating the Manifest

### Replacement Variables

| Variable | Source | Example |
|----------|--------|---------|
| `MODULE_SLUG` | Slugified module title | `what-ai-actually-is` |
| `MODULE_TITLE` | `module.title` from config | `What AI Actually Is` |
| `PASSING_SCORE` | `module.passing_score` from config | `75` |

### File Listing Rules

**Every single file in the zip must have a `<file>` element in the resource.**

Generate file entries from:
1. Static files: `index.html`, `css/player.css`, `js/player.js`, `js/quiz.js`, `js/scorm-api.js`
2. Slide images: iterate `slides` array from config, generate `<file href="slides/slide-NN.png"/>`
3. Audio files: iterate `slides` array from config, generate `<file href="audio/slide-NN.mp3"/>`
4. Assets: logo file if specified, any fonts

### Slug Generation

```python
import re
def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')
```

## SCORM 2004 Manifest

Only use if client specifically requests it. Key differences from 1.2:

- Schema version: `2004 4th Edition` (or `2004 3rd Edition`)
- Namespace: `http://www.adlnet.org/xsd/adlcp_v1p3`
- Sequencing and navigation elements (usually not needed for linear courses)
- `adlcp:masteryscore` replaced by sequencing rules
- Data model paths change (e.g., `cmi.core.lesson_status` becomes `cmi.completion_status` + `cmi.success_status`)

For most client LMS platforms, SCORM 1.2 is more compatible. Default to 1.2.

## Validation

Before packaging, verify:

1. XML is well-formed (parseable)
2. All `href` attributes point to files that exist in the zip
3. `identifier` values are unique
4. `identifierref` in `<item>` matches `identifier` in `<resource>`
5. `organizations default` matches an `organization identifier`
6. `masteryscore` is a valid integer 0-100
7. No absolute paths anywhere (all relative)
