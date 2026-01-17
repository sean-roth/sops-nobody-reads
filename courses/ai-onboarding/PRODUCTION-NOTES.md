# Production Notes

Planning for delivery format, artwork, voiceover, and technical implementation.

---

## Delivery Format Options

### Option 1: SCORM Packages (Primary)

**Pros:**
- Works with any LMS (Moodle, TalentLMS, corporate HRIS)
- Standard format, widely compatible
- Tracks completion, quiz scores, time spent
- Already planned for SOPs Nobody Reads workflow

**Cons:**
- Limited interactivity compared to web apps
- Packaging can be finicky
- Some LMS platforms handle SCORM better than others

**Technical Notes:**
- SCORM 1.2 for maximum compatibility, or SCORM 2004 for richer tracking
- Test on Moodle (already set up), TalentLMS, and at least one enterprise LMS
- Include fallback for non-SCORM viewing (direct web access)

### Option 2: Custom Web Platform

**Pros:**
- Full control over experience
- Can include interactive exercises, live AI demos
- Better analytics
- Direct sales without LMS requirement

**Cons:**
- Development time
- Hosting/maintenance
- Doesn't help enterprise buyers who need LMS integration

**Potential approach:**
- Build custom for direct sales
- Export to SCORM for enterprise/LMS buyers
- Same content, different wrappers

### Option 3: Hybrid

- Core video content works anywhere
- Interactive exercises on web platform
- SCORM wrapper for LMS delivery
- Supplementary materials (templates, checklists) as downloadable PDFs

---

## Aesthetic Direction: 1950s-60s Instructional Film

### Visual Style

**Reference films:**
- "A Date with Your Family" (1950)
- "Duck and Cover" (1951)
- "Design for Dreaming" (1956)
- AT&T training films
- Coronet Instructional Films

**Visual elements:**
- Slightly desaturated color palette (or tasteful B&W)
- Film grain overlay
- Period-appropriate typography (Futura, Century Schoolbook)
- Simple, clean compositions
- Occasional "damage" artifacts (scratches, dust)

**Modern adaptations:**
- Not full parody—respectful homage
- Clean enough to read on small screens
- Accessible (captions, contrast ratios)

### Animation Style Options

**Option A: Illustrated/Animated**
- Stylized 2D animation
- Character design for Joe (and possibly narrator)
- Can control every frame
- Scalable for updates
- Easier to produce than live action

**Option B: Stock + Motion Graphics**
- Vintage stock footage where available
- Modern screen recordings for demos
- Motion graphics for diagrams/concepts
- Faster to produce
- May feel less cohesive

**Option C: AI-Generated Imagery**
- Generate period-appropriate stills
- Animate with tools like Runway, Pika
- Experimental but potentially efficient
- Quality control challenges

**Recommended:** Option A (illustrated) for Joe scenarios and conceptual content, with screen recordings for technical demos. Most cohesive, most controllable.

### Character Design: Joe

**Personality:**
- Everyman professional, mid-40s
- Slightly rumpled, trying his best
- Expressions range from confusion to frustration to eventual understanding
- Sympathetic, not a punching bag

**Visual:**
- Period-appropriate but not costume-y
- Could work in modern office (timeless professional wear)
- Distinctive enough to be memorable
- Simple enough to animate efficiently

### Typography

**Headers:** Futura Bold or similar geometric sans
**Body:** Century Schoolbook or similar readable serif
**Accent:** Script or handwritten for "personal" notes
**On-screen text:** High contrast, readable at small sizes

### Color Palette

**Primary:**
- Warm cream/off-white backgrounds
- Deep navy or charcoal for text
- Muted teal accent

**Secondary:**
- Dusty rose for warnings/mistakes
- Soft gold for success/correct approaches
- Period-appropriate "Kodachrome" feel

---

## Voiceover

### Narrator Voice

**Style:**
- 1950s educational film narrator
- Warm, authoritative, slightly formal
- Hint of humor without mugging
- Think: "The voice of knowledge and reason"

**NOT:**
- Sarcastic or ironic
- Robotic or flat
- Modern "podcast bro" energy
- Condescending

### Production Options

**Option A: Professional Voice Actor**
- Highest quality
- Full control over delivery
- Cost: $200-500+ per finished hour
- Turnaround: Days to weeks

**Option B: AI Voice Generation**
- Tools: ElevenLabs, Play.ht, WellSaid
- Faster iteration
- Lower cost
- Quality improving rapidly
- May lack the subtle performance quality
- Can clone a custom voice with training

**Option C: Hybrid**
- AI for drafts and iteration
- Professional VO for final delivery
- Best of both worlds

**Consideration for Compel English:**
- Already working on voice consistency for audiobooks
- Learnings may transfer
- Could use same voice pipeline

### Script Format

**For each module:**
1. Cold open (Joe makes mistake)
2. Narrator intro: "What went wrong here?"
3. Explanation with visuals
4. Correct approach demonstrated
5. Summary/key takeaways
6. Transition to next topic

**Timing:**
- Narrator speaks at ~150 words/minute
- 25-minute module = ~3,750 words script
- Full course = ~45,000-60,000 words of narration

---

## Technical Production Workflow

### Content Pipeline

1. **Script writing** (per module)
   - Outline → Draft → Review → Final
   - Include visual directions in script

2. **Storyboarding**
   - Key frames for each scene
   - Timing notes
   - Animation direction

3. **Asset creation**
   - Character animations
   - Background illustrations
   - Icons and diagrams
   - Screen recordings (for technical modules)

4. **Voiceover recording**
   - Record in sections
   - Review and revise

5. **Animation/editing**
   - Sync visuals to audio
   - Add effects, transitions
   - Motion graphics for data/concepts

6. **Review cycle**
   - Internal review
   - Test with beta learners
   - Revise based on feedback

7. **Packaging**
   - Export video
   - Build SCORM wrapper
   - Add quizzes/interactions
   - Test on target LMS platforms

### Tools (Tentative)

**Scripting:** Claude, Google Docs
**Storyboarding:** Figma, Miro, or traditional
**Illustration:** Figma, Illustrator, or AI-assisted (Midjourney + cleanup)
**Animation:** After Effects, or simpler tools (Doodly, Vyond)
**Screen Recording:** OBS, Loom
**Video Editing:** DaVinci Resolve, Premiere
**Voiceover:** ElevenLabs + professional VO for final
**SCORM Packaging:** Articulate Storyline, iSpring, or open-source
**LMS Testing:** Moodle (primary), TalentLMS (secondary)

---

## Pricing Considerations

### Direct Sales (B2C/Prosumer)

**Comparable products:**
- Coursera courses: $50-100
- LinkedIn Learning: subscription
- Premium courses (cohort-based): $500-2000
- Enterprise training: $200-500/seat

**Potential pricing:**
- Individual license: $199-299
- Team license (5-10 seats): $799-1,499
- Enterprise: Custom pricing

### Lead Magnet Version

- Free excerpt (1-2 modules, ~30 min)
- Module 1 (What is this thing?) + Module 6 (One-shot catastrophe)
- Ends with CTA for full course
- Also serves as sample for SOPs Nobody Reads capability

### Enterprise/White-Label

- Custom branding
- Additional modules for specific industries
- Integration with client's existing training
- Premium pricing: $5,000-20,000+ depending on scope

---

## Timeline Estimates

### Minimum Viable Course

**Scope:** Parts 1-3 (foundations + failure patterns) = ~9 modules, 3-4 hours

| Phase | Duration |
|-------|----------|
| Script writing | 3-4 weeks |
| Storyboarding | 2 weeks |
| Asset creation | 4-6 weeks |
| Voiceover | 1-2 weeks |
| Animation/editing | 4-6 weeks |
| Review/revision | 2 weeks |
| SCORM packaging | 1 week |
| **Total** | **17-23 weeks** |

### Full Course

**Scope:** All 19 modules, 6-8 hours

| Phase | Duration |
|-------|----------|
| Full production | 30-40 weeks |

### Accelerated Option

- Parallel production (multiple modules simultaneously)
- AI-assisted asset generation
- Simpler animation style
- Could compress to 12-16 weeks for MVP

---

## Open Questions

- [ ] What's the realistic budget for production?
- [ ] Should Joe be animated or illustrated stills with motion?
- [ ] Do we want a "face" for the narrator or just voice?
- [ ] How much interactivity is needed vs. passive video?
- [ ] Should modules stand alone or require sequential completion?
- [ ] Closed captions—included or separate track?
- [ ] Accessibility audit requirements?
- [ ] Music/sound design—original or licensed?
