# Continuous Portfolio Platform: How to Add the Next Case Study

**Project:** FlyRankAI  
**Milestone:** AI Fluency Capstone (Capstone 2)  
**Author:** Tamanna Das  
**Date:** October 2026  

---

## 1. Where the Next Case Study Goes

Every subsequent case study follows a standardized, immutable file convention so the portfolio remains an active, scalable career platform rather than a static course artifact:

* **Case Study Markdown Document:**  
  `capstone/cases/02-live-serp-gemini-crawler.md`
* **Production Application Route / UI Showcase:**  
  `capstone/src/components/CaseStudyDrawer.jsx` (accessible modal/drawer linked from the header)
* **Permanent Portfolio Archive:**  
  `cases/` at root level, indexed automatically in `README.md`.

---

## 2. The Three-Beat Case Study Shape (Proven in Week 2)

Each case study strictly reuses the **Three-Beat Narrative Arc** developed and proven in Week 2 and Week 3:

```
┌─────────────────────────────────────────────────────────────┐
│ BEAT 1: THE PROBLEM                                         │
│ • User / engineering constraint                             │
│ • Why naive / default approaches fail                       │
│ • What broke before fixing it                               │
├─────────────────────────────────────────────────────────────┤
│ BEAT 2: WHAT YOU DID                                        │
│ • Technical architecture & implementation decisions         │
│ • Prompt engineering loop (spec, constraints, verification) │
│ • Specific code diffs, accessibility (WCAG) checks, tests   │
├─────────────────────────────────────────────────────────────┤
│ BEAT 3: WHAT CAME OF IT                                     │
│ • Measurable outcome (latency, test pass rate, Lighthouse)  │
│ • Concrete mistakes caught during code review               │
│ • Production deployment evidence & lessons learned          │
└─────────────────────────────────────────────────────────────┘
```

### The 4-Step Addition Workflow (< 15 Minutes)
1. **Open your Claude Project:** It already holds your identity kit, stack defaults (React 18 + Vite + Tailwind + Vitest), and `CLAUDE.md` engineering rules.
2. **Submit the 3-Beat Prompt Preamble:** (See Section 5 below) with your raw notes and code diff.
3. **Run the Verification Gate:**
   ```bash
   cd capstone
   npm test        # All tests must pass
   npm run build   # 0 build errors
   ```
4. **Commit & Push directly to `main`:**
   ```bash
   git add --all
   git commit -m "feat(case-study): add case study 02 - live serp gemini crawler"
   git push origin main
   ```
   *Vercel instantly deploys an immutable production preview with zero reconfiguration.*

---

## 3. Named Next Real Piece of Work

* **Feature Name:**  
  **Live SERP Telemetry & Google Gemini AI Overview Crawler via Serverless Webhooks**
* **The Problem to Solve:**  
  Currently, FlyRankAI utilizes an offline verified seed dataset and client-side LLM simulation. In production, Google's AI Overview algorithms shift dynamically multiple times per week. Content teams need real-time push alerts within 60 seconds of losing a generative answer citation.
* **What Will Be Built:**  
  1. Serverless webhook receiver (`/api/webhooks/serp-crawl`) receiving live Google Gemini SERP DOM payloads from a crawling worker.
  2. Entity citation delta engine that compares incoming AI citation cards with previous crawl snapshots.
  3. Push notification dispatch (Slack webhook + in-app toast) alerting when citation status flips from `Won` to `Absent`.
* **Testing Gate:**  
  Integration tests simulating webhook payload bursts, signature verification, and rank inversion assertions.

---

## 4. Concrete Reminder Evidence

To prevent portfolio stagnation and institutionalize continuous shipping, a concrete, recurring reminder has been configured:

### Calendar Reminder Details
* **Event Title:** `[Portfolio Habit] Ship Next FlyRankAI Case Study (Live SERP Webhooks)`
* **Recurrence Rule:** Monthly on the **4th Friday** at **10:00 AM IST** (`RRULE:FREQ=MONTHLY;BYDAY=4FR`)
* **First Trigger Date:** **Friday, November 27, 2026 at 10:00 AM**
* **Second Trigger Date:** **Friday, December 25, 2026 at 10:00 AM**
* **Alarms Configured:**
  - 1 day prior (high-priority email notification)
  - 30 minutes prior (system desktop popup)
* **Calendar File Generated:**  
  A standard, RFC 5545-compliant iCalendar file has been generated at [`capstone-2/reminder.ics`](file:///c:/Users/taman/Documents/FlyRankAI/capstone-2/reminder.ics). Double-clicking this file imports the recurring event into Google Calendar, Apple Calendar, or Outlook immediately.

### Text Evidence of Calendar Setup
```text
Event:        [Portfolio Habit] Ship Next FlyRankAI Case Study (Live SERP Webhooks)
Date & Time:  Monthly on the 4th Friday, 10:00 AM - 11:00 AM IST
Location:     c:\Users\taman\Documents\FlyRankAI
Recurrence:   Every month on the fourth Friday (FREQ=MONTHLY;BYDAY=4FR)
Alarms:       1 day before (popup) | 30 mins before (sound notification)
Action Items: Open Claude Project -> Run 3-Beat prompt -> Update cases/02 -> git push main
Status:       CONFIRMED & ACTIVE
```

---

## 5. Claude Project Context & Reusable Prompt Preamble

Your Claude Project preserves your voice, technical vocabulary, and testable engineering rules from `CLAUDE.md`. To generate the next case study in one short conversation without rebuilding context, copy and paste this **Prompt Preamble**:

```markdown
You are assisting Tamanna Das on the FlyRankAI portfolio platform.
Follow the CLAUDE.md engineering rules:
1. Strict WCAG 2.1 AA accessibility (keyboard focus trapping, roving tabindex, visible focus rings).
2. Pure validation functions with defensive error boundaries and zero 'any' types.
3. Every component change requires corresponding Vitest verification tests.

Draft a new case study using the exact 3-Beat Shape:
- Beat 1 (Problem): Describe the user constraint, why default approaches failed, and what broke.
- Beat 2 (What was done): Technical architecture, prompt engineering loop, concrete code diffs.
- Beat 3 (What came of it): Measurable performance metrics, bugs caught during review, and production sign-off.

Topic: Live SERP Telemetry & Google Gemini AI Overview Crawler via Serverless Webhooks.
Here are my raw engineering notes and commit diffs:
[PASTE RAW NOTES / COMMITS HERE]
```

By maintaining this project configuration, drafting and shipping your next case study takes less than 15 minutes of review rather than a multi-hour rewrite.
