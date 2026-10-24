# FlyRankAI — Generative Engine Optimization (GEO) & SERP Intelligence

> **Production Capstone Application**  
> An AI-enhanced frontend platform that solves modern search visibility: monitoring Google Gemini AI Overviews, tracking organic rank velocity across search engines, and diagnosing web content citability using Claude 3.5 LLM reasoning.

**GitHub Repository:** [https://github.com/tam-05/FlyRankAI](https://github.com/tam-05/FlyRankAI)  
**Production URL:** [https://flyrankai.vercel.app](https://flyrankai.vercel.app) *(or live preview on Vercel)*  
**Author:** Tamanna Das  
**Milestone:** Capstone — Production AI Frontend Application  

---

## 1. Project Brief

### What problem does it solve?
Traditional SEO tools track 10 blue organic links, but search has fundamentally changed: **Google Gemini AI Overviews, Perplexity, and Copilot generative answers now dominate the top of SERPs**, summarizing search results before users ever see traditional rank #1. Marketers and engineers have no accessible telemetry to monitor whether their domain is cited as an authority in these generative summaries, nor do they know *what specific semantic entities their content is missing* compared to cited competitors. FlyRankAI solves this by providing automated SERP rank tracking paired with a real-time **AI Citability & GEO Content Audit Engine**.

### Who is it for?
B2B SaaS marketers, technical SEO specialists, and developer-advocate teams who need to protect their organic search traffic and win generative citations in LLM answer engines.

### Why did you choose this idea?
Generative Engine Optimization (GEO) is the most critical shift in search since mobile-first indexing. Building an end-to-end telemetry dashboard with real LLM citation analysis demonstrates the convergence of accessible UI architecture (WCAG 2.1 AA), structured AI integration, and resilient production engineering.

---

## 2. Architecture Overview

FlyRankAI is built on React 18, Vite, Tailwind CSS, and Vitest, following strict component modularity and resilient data contracts.

```
capstone/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Brand, telemetry ticker, A11y high-contrast toggle
│   │   ├── NavigationTabs.jsx         # W3C ARIA roving tabindex keyboard navigation
│   │   ├── OverviewSection.jsx        # Executive KPI cards, rank momentum highlights
│   │   ├── GeoAuditSection.jsx        # Star AI Feature: Citability audit & recommendation engine
│   │   ├── KeywordPortfolio.jsx       # Interactive SERP table (search, filter, sort, CSV export)
│   │   ├── CompetitorMatrix.jsx       # Citation share distribution & competitor benchmark
│   │   ├── SystemDiagnostics.jsx      # Telemetry latency, fail-safe status, deployment runbook
│   │   ├── AddKeywordModal.jsx        # Accessible dialog with Tab focus trap & Esc listener
│   │   ├── SettingsModal.jsx          # Claude API key configuration & local data reset
│   │   ├── KeywordDetailDrawer.jsx    # Slide-over inspector with 7-day SVG rank trajectory
│   │   ├── Toast.jsx                  # ARIA live region status announcements
│   │   └── ErrorBoundary.jsx          # Top-level catch boundary for graceful crash recovery
│   ├── data/
│   │   └── mockKeywords.js            # Initial verified seed dataset & competitor metrics
│   ├── hooks/
│   │   └── usePortfolio.js            # Central state, filtering, sorting, and localStorage persistence
│   ├── services/
│   │   └── aiService.js               # Claude API integration, prompt engineering & resilient fallback
│   ├── test/
│   │   ├── setup.js                   # Node 26 global localStorage mock & DOM polyfills
│   │   ├── aiService.test.js          # Heuristic engine, score bounding & validation tests
│   │   └── components.test.jsx        # Component rendering, modal traps, keyboard tabs tests
│   ├── App.jsx                        # Master layout with skip-to-content and view switching
│   └── main.jsx                       # React DOM root with ErrorBoundary
├── DEPLOYMENT_CHECKLIST.md            # FE-11 Production deployment sign-off & rollback plan
├── PORTFOLIO_ENTRY.md                 # Master capstone submission report
├── TESTING_PERFORMANCE.md             # Testing evidence (beyond happy path) & Lighthouse/A11y audit
├── REFLECTION.md                      # Engineering reflection: Hardest challenges & lessons learned
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Meaningful AI Integration (Claude 3.5 LLM)

### How does the LLM fit?
The application integrates Anthropic's Claude 3.5 model (`claude-3-5-haiku-20241022` or `claude-3-5-sonnet`) to act as a **Generative Search Simulation & Entity Attribution Engine**. Rather than a generic conversational chatbot, Claude performs a specialized cognitive task:
1. Deconstructs the user's target search query into semantic intent categories.
2. Evaluates the user's landing page content against Google Gemini's generative citation criteria (definitional clarity, numerical evidence, E-E-A-T markers).
3. Produces a simulated 45-word AI Overview synthesis showing what a generative engine would extract.
4. Diagnoses **missing semantic entities** present in competitor documentation that your page lacks.
5. Emits strict structured JSON with priority-weighted copywriting and schema fixes (`FAQPage`, `TechArticle`).

### Prompt Engineering Architecture
The prompt enforces strict machine-readable output:
```json
{
  "winProbability": 82,
  "citationStatus": "Won",
  "simulatedAiOverview": "...",
  "citationLinks": [
    { "domain": "flyrank.ai", "title": "...", "relevanceScore": 85, "isUserDomain": true }
  ],
  "missingEntities": ["Quantitative Benchmarks", "Direct Answer Paragraph"],
  "schemaFixes": [{ "type": "FAQPage", "recommendation": "..." }],
  "actionableRecommendations": [{ "priority": "High", "title": "...", "detail": "..." }],
  "sentimentSummary": "..."
}
```

### Resilience & Zero-Config Fallback (FE-07)
* If an API key is not supplied (or if Anthropic's API experiences rate-limiting or network issues), FlyRankAI **does not crash or show an empty screen**.
* It automatically activates its **Offline GEO Heuristic Engine** (`generateHeuristicAudit`), calculating context-aware citation metrics, entity gaps, and simulated snippets based on NLP token density and lexical markers.
* The UI clearly indicates the active engine mode via accessible status badges.

---

## 4. Setup & Run Instructions

Get running locally in under 2 minutes:

```bash
# 1. Clone repository
git clone https://github.com/tam-05/FlyRankAI.git
cd FlyRankAI/capstone

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### Run Verification Test Suite
```bash
npm test
```

### Production Build
```bash
npm run build
```

---

## 5. Accessibility (WCAG 2.1 AA)

- **Skip-to-Content:** Immediate keyboard bypass link adhering to WCAG 2.4.1.
- **Focus Trapping:** Modal dialogs trap `Tab` and `Shift+Tab` strictly within the dialog and restore focus to the triggering element upon exit (WCAG 2.1.2 & 2.4.3).
- **Roving Tabindex:** Navigation tabs use native W3C roving tabindex (`0` on active, `-1` on inactive) with `ArrowLeft`, `ArrowRight`, `Home`, and `End` keys (WCAG 2.1.1).
- **High Contrast Mode:** Built-in AAA toggle button in the header enhances border luminance and color contrast ratios beyond 7:1.
- **ARIA Live Regions:** Asynchronous AI audits and user actions announce status changes via `aria-live="polite"` and `role="status"` without stealing focus.

---

## 6. Known Limitations & Future Roadmap

1. **Live SERP Scraping:** Currently relies on mock historical rank points and simulated AI overview DOM parsing; future releases will integrate a live SERP API webhook (e.g. SerpApi / DataForSEO).
2. **Multi-Domain Tracking:** Currently optimized for single-project monitoring; multi-tenant workspace switching is planned for v2.0.
3. **Automated Scheduled Crawls:** Periodic background polling via scheduled cron automations (Vercel Cron Jobs).
