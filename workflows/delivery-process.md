# Delivery Process Workflow

End-to-end process from signed contract to delivered module.

---

## Overview Timeline

| Day | Milestone |
|-----|-----------|
| 0 | Contract signed, payment received |
| 1 | Document analysis complete |
| 2-3 | Outline created and sent for approval |
| 4-7 | Content generation |
| 8-9 | Internal review and polish |
| 10 | First draft delivered to client |
| 11-12 | Client review period |
| 13 | Revisions incorporated |
| 14 | Final delivery |

---

## Phase 1: Kickoff (Day 0-1)

### When Contract Is Signed

1. **Send Welcome Email**
   ```
   Subject: Let's get started on your training module!

   Hi [Name],

   Thanks for choosing SOPsNobodyReads! I'm excited to transform your 
   [document type] into training your team will actually complete.

   To get started, I need:
   
   1. Your final source documents (attached or via the link below)
   2. Any brand guidelines or logos you'd like included
   3. Confirmation of target audience and any special requirements

   Upload link: [Google Drive or Moxie file request]

   Once I have everything, I'll send you an outline within 2-3 days 
   for your approval before we dive into content creation.

   Questions? Just reply to this email.

   Let's make those documents work for you!

   Sean
   ```

2. **Create Project Folder**
   ```
   Google Drive > Customers > [Company Name]/
   ├── Source Documents/
   ├── Working Files/
   │   ├── Analysis/
   │   ├── Outline/
   │   ├── Content/
   │   └── Drafts/
   └── Deliverables/
   ```

3. **Log in Moxie**
   - Create project
   - Set deadline reminders
   - Start time tracking

---

## Phase 2: Analysis (Day 1)

### Document Analysis

1. **Read through all source documents**
   - Take notes on key topics
   - Flag unclear sections
   - Note any compliance requirements

2. **Run Analysis Prompt** (see claude-prompts.md)
   - Document summary
   - Key topics
   - Learning objectives
   - Content gaps
   - Recommended structure

3. **Save Analysis**
   - Save to Working Files/Analysis/
   - Note any questions for client

4. **If Questions Exist**
   - Email client with specific questions
   - Don't proceed until clarified

---

## Phase 3: Outline (Day 2-3)

### Create Module Outline

1. **Run Outline Prompt** (see claude-prompts.md)
   - Module structure
   - Section breakdown
   - Quiz placement
   - Time estimates

2. **Format for Client Review**
   ```
   # [Module Title] - Outline for Review

   ## Overview
   - Total time: [X] minutes
   - Sections: [X]
   - Final quiz: [X] questions

   ## Learning Objectives
   After completing this training, learners will be able to:
   1. [Objective 1]
   2. [Objective 2]
   ...

   ## Module Structure

   ### Section 1: [Title] (X minutes)
   - [Key point]
   - [Key point]
   - Knowledge check: [Topic]

   ### Section 2: [Title] (X minutes)
   ...

   ## Final Assessment
   - X questions covering all objectives
   - Passing score: 80%

   ## Next Steps
   Please review and let me know:
   1. Any topics to add or remove?
   2. Any emphasis changes?
   3. Anything missing from your original docs?

   Once approved, I'll begin content creation.
   ```

3. **Send to Client**
   - Email with outline attached/inline
   - Set expectation for 24-48 hour review
   - Offer quick call if helpful

4. **Wait for Approval**
   - Don't start content until outline approved
   - Minor changes: proceed
   - Major changes: revise outline first

---

## Phase 4: Content Creation (Day 4-7)

### Generate Content Section by Section

1. **For Each Section:**
   - Run Content Generation Prompt
   - Review output for accuracy
   - Check against source documents
   - Save to Working Files/Content/

2. **Generate Quiz Questions**
   - Run Quiz Generation Prompt
   - Ensure coverage of all objectives
   - Mix question types

3. **Compile Full Draft**
   - Intro + all sections + summary + quiz
   - Run Review & Polish Prompt
   - Fix any issues flagged

---

## Phase 5: Internal Review (Day 8-9)

### Quality Check

1. **Content Review**
   - [ ] All learning objectives covered
   - [ ] Content matches source documents
   - [ ] No contradictions or errors
   - [ ] Tone consistent throughout
   - [ ] Reading level appropriate

2. **Quiz Review**
   - [ ] Questions clear and unambiguous
   - [ ] All objectives tested
   - [ ] Feedback helpful
   - [ ] Passing score reasonable

3. **Format Check**
   - [ ] Section lengths balanced
   - [ ] Knowledge checks placed well
   - [ ] Flow is logical

---

## Phase 6: First Draft (Day 10)

### Deliver to Client

1. **Prepare Draft Package**
   - Full content document (Word/Google Doc)
   - Or: SCORM preview link (SCORM Cloud)

2. **Send Delivery Email**
   ```
   Subject: Your training module draft is ready!

   Hi [Name],

   Great news - your [Module Name] training is ready for review!

   [Link to draft / attachment]

   What to look for:
   - Content accuracy - does this match your policies/procedures?
   - Tone - is this right for your team?
   - Missing info - anything we should add?
   - Quiz questions - fair and clear?

   Please send feedback by [Date - 2 days out]. You have two rounds 
   of revisions included, so don't hold back!

   Quick tip: It's often helpful to have a subject matter expert 
   review for accuracy.

   Talk soon,
   Sean
   ```

3. **Set Reminder**
   - Follow up at Day 12 if no response

---

## Phase 7: Revisions (Day 11-13)

### Process Client Feedback

1. **Receive Feedback**
   - Categorize: Content / Quiz / Tone / Structure
   - Clarify anything unclear

2. **Make Revisions**
   - Address all feedback items
   - Note what was changed

3. **If Major Changes**
   - May require re-running prompts
   - Communicate timeline impact if needed

4. **Send Revised Draft**
   - Track changes or summary of edits
   - Confirm this is revision 1 of 2

---

## Phase 8: Final Delivery (Day 14)

### Package and Deliver

1. **Create Final SCORM Package**
   - Export as SCORM 1.2 (most compatible)
   - Test in SCORM Cloud
   - Verify all interactions work

2. **Prepare Deliverables**
   - SCORM .zip file
   - Content backup (Word doc)
   - Quiz answer key
   - Deployment instructions

3. **Send Final Delivery**
   ```
   Subject: Your training module is complete! 🎉

   Hi [Name],

   Your [Module Name] training is ready to deploy!

   **Included:**
   - SCORM package (.zip) - upload to your LMS
   - Content backup (Word doc)
   - Quiz answer key
   - Quick start deployment guide

   **Download link:** [Google Drive folder]

   **Need help deploying?**
   Most LMS platforms have a "import SCORM" option. If you run 
   into issues, just reply and I'll help troubleshoot.

   **One last thing:**
   If you're happy with the result, I'd really appreciate:
   1. A brief testimonial I can use (even 1-2 sentences helps!)
   2. Any referrals to colleagues who might need this service

   Thanks for trusting SOPsNobodyReads with your training!

   Best,
   Sean

   P.S. - Need more modules? Reply and I'll send you our 
   volume pricing.
   ```

4. **Post-Delivery Tasks**
   - Request testimonial (if not in email)
   - Request referral
   - Add to portfolio (with permission)
   - Send invoice for remaining 50% (if applicable)
   - Update CRM status

---

## Handling Issues

### Client Not Responding

- Day 3 after sending: Gentle follow-up
- Day 7 after sending: Direct email asking for status
- Day 14 after sending: Final notice that project will be paused

### Scope Creep

- "That's a great idea! It's a bit outside our original scope. I can add it for $X, or we can include it in a follow-up project."

### Unhappy Client

- Listen fully before responding
- Offer to schedule a call
- Find the root issue (usually miscommunication)
- Make it right within reason
- Learn for next time

---

## Time Tracking Categories

- Analysis
- Outline
- Content Creation
- Quiz Development
- Revisions
- SCORM Packaging
- Client Communication
- Admin

Track everything. Review monthly to improve estimates.