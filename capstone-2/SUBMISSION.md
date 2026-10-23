# Capstone 2 Submission: Continuous Portfolio Platform

**Milestone:** AI Fluency Capstone (Capstone 2)  
**Candidate:** Tamanna Das  
**Repository:** [https://github.com/tam-05/FlyRankAI](https://github.com/tam-05/FlyRankAI)  
**Capstone 2 Directory:** [https://github.com/tam-05/FlyRankAI/tree/main/capstone-2](https://github.com/tam-05/FlyRankAI/tree/main/capstone-2)  
**Calendar Reminder File:** [https://github.com/tam-05/FlyRankAI/blob/main/capstone-2/reminder.ics](https://github.com/tam-05/FlyRankAI/blob/main/capstone-2/reminder.ics)  

---

### 1. "How to Add the Next Case" Note (The Three-Beat Shape)

* **Destination:** `capstone/cases/02-live-serp-gemini-crawler.md` and indexed in `README.md`.
* **The Three-Beat Structure:**
  1. **Beat 1: The Problem**  
     Document the real constraint, why default/naive methods failed, and what broke in the baseline implementation.
  2. **Beat 2: What You Did**  
     Detail the technical architecture, prompt-engineering loop (spec, constraints, verification gate), code diffs, and accessibility compliance checks.
  3. **Beat 3: What Came of It**  
     Report concrete outcomes (test suite pass rate, latency delta, Lighthouse scores), specific AI mistakes caught during human review, and production lessons.
* **4-Step Rapid Workflow (< 15 Minutes):**
  1. Open the Claude Project (pre-loaded with FlyRankAI stack defaults, identity kit, and `CLAUDE.md` rules).
  2. Paste the standardized 3-Beat Prompt Preamble with raw engineering notes.
  3. Run the automated verification gate: `npm test && npm run build` (zero errors).
  4. Commit and push directly to `main` (triggering instant Vercel preview deployment).

---

### 2. The Named Next Real Piece of Work

* **Piece Name:**  
  **Live SERP Telemetry & Google Gemini AI Overview Crawler via Serverless Webhooks**
* **Technical Scope:**  
  Build a serverless webhook ingest pipeline (`/api/webhooks/serp-crawl`) that receives live headless SERP captures from distributed scraping nodes, parses Google Gemini AI Overview citation link cards, compares them against previous crawl snapshots, and dispatches real-time alerts when a domain loses or gains citation ownership.
* **Verification Gate:**  
  Automated Vitest test suite testing webhook signature verification, burst payload parsing, and rank delta computations.

---

### 3. Evidence of Concrete Reminder Set

A recurring monthly calendar event has been established:
* **Event Name:** `[Portfolio Habit] Ship Next FlyRankAI Case Study (Live SERP Webhooks)`
* **Recurrence Schedule:** Monthly on the **4th Friday** at **10:00 AM IST** (`RRULE:FREQ=MONTHLY;BYDAY=4FR`)
* **First Trigger:** Friday, November 27, 2026 at 10:00 AM IST
* **Second Trigger:** Friday, December 25, 2026 at 10:00 AM IST
* **Configured Alarms:**
  - 1 day before (email notification)
  - 30 minutes before (desktop alert)
* **Calendar File Artifact:** An RFC 5545 iCalendar file is committed at `capstone-2/reminder.ics`.

---

### 4. Preservation of Build Context (Claude Project)

The Claude Project retains the persistent project instructions:
* **Stack Kit:** React 18, Vite, Tailwind CSS, Vitest, Node 26.
* **Project Rules:** Form validation via pure testable functions, WCAG 2.1 AA keyboard accessibility (Tab focus trapping, roving tabindex, Escape listeners), and automated test gates before committing.
* **Reusable Prompt Preamble:** Pre-formatted prompt included in `capstone-2/HOW_TO_ADD_NEXT_CASE.md` to ensure adding future case studies requires a 5-minute conversation rather than a cold rebuild.
