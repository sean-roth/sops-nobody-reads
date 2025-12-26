# Setup Checklist

## Phase 1: Infrastructure (This Week)

### Domain & Email
- [ ] Purchase sopsnobodyreads.com
- [ ] (Optional) Purchase soptoscorm.com for future
- [ ] Set up Google Workspace
  - Primary: hello@sopsnobodyreads.com
  - Alias: sean@sopsnobodyreads.com
- [ ] Configure DNS records for email

### Moxie Setup
- [ ] Create Moxie account (Pro plan - $20/month)
- [ ] Configure company profile
- [ ] Set up Stripe integration
- [ ] Create proposal template (see proposal-template.md)
- [ ] Create contract template
- [ ] Set up intake form
- [ ] Configure client portal branding
- [ ] Set up meeting scheduler
- [ ] Test full workflow: form → proposal → contract → invoice

### Landing Page (Carrd)
- [ ] Create Carrd account (Pro plan - $19/year)
- [ ] Build landing page using copy from landing-page-copy.md
- [ ] Embed Moxie intake form (or link to it)
- [ ] Connect custom domain
- [ ] Test on mobile
- [ ] Add basic analytics (Plausible or just Carrd's built-in)

### Delivery Infrastructure
- [ ] Create SCORM Cloud free account (for previews)
- [ ] Set up Google Drive folder structure:
  ```
  SOPsNobodyReads/
  ├── Customers/
  │   └── [Customer Name]/
  │       ├── Source Documents/
  │       ├── Working Files/
  │       └── Deliverables/
  ├── Templates/
  └── Demo Modules/
  ```
- [ ] Test SCORM upload and preview workflow

---

## Phase 2: Content & Workflow (Week 1-2)

### Demo Module
- [ ] Select public SOP for demo (OSHA safety, food handling, etc.)
- [ ] Create demo module using Claude workflow
- [ ] Package as SCORM
- [ ] Upload to SCORM Cloud for preview
- [ ] Create shareable preview link

### Claude Workflow
- [ ] Test and refine analysis prompt
- [ ] Test and refine content generation prompt
- [ ] Test and refine quiz generation prompt
- [ ] Document workflow in claude-prompts.md
- [ ] Estimate time per module type

---

## Phase 3: Go Live (Week 2)

### Launch Checklist
- [ ] Landing page live and tested
- [ ] Intake form working
- [ ] Moxie workflow tested end-to-end
- [ ] Demo module ready to share
- [ ] Email signature updated
- [ ] LinkedIn profile updated

### Outreach Prep
- [ ] Create LinkedIn company page
- [ ] Connect personal LinkedIn
- [ ] Research 20 local businesses for outreach
- [ ] Find Chamber of Commerce directories
- [ ] Draft first 10 outreach emails
- [ ] Schedule first outreach batch

---

## Phase 4: First Customer

### When Lead Comes In
- [ ] Respond within 24 hours
- [ ] Schedule discovery call if needed
- [ ] Send proposal within 48 hours
- [ ] Follow up at 3 days if no response

### After Signing
- [ ] Send welcome email with document upload instructions
- [ ] Confirm receipt of documents
- [ ] Begin analysis within 24 hours
- [ ] Deliver first draft at day 7-10
- [ ] Incorporate feedback
- [ ] Deliver final at day 14
- [ ] Request testimonial
- [ ] Request referral

---

## Tools & Accounts Summary

| Tool | Purpose | Cost | Account Email |
|------|---------|------|---------------|
| Google Workspace | Email | $6/month | hello@sopsnobodyreads.com |
| Moxie Pro | CRM, invoicing, contracts | $20/month | hello@sopsnobodyreads.com |
| Carrd Pro | Landing page | $19/year | hello@sopsnobodyreads.com |
| Stripe | Payments (via Moxie) | 2.9% + $0.30 | hello@sopsnobodyreads.com |
| SCORM Cloud | Preview hosting | Free tier | hello@sopsnobodyreads.com |
| Google Drive | File storage | Free with Workspace | - |
| Claude | Content generation | Existing | - |

**Total monthly fixed cost: ~$27**