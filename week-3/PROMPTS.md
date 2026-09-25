# Prompts Used During Week-3 Development

This document logs the exact prompts used to direct AI during the development of the **FlyRankAI SERP & AI Visibility Dashboard**. In accordance with the prompt engineering techniques learned in Week 2, each prompt incorporates strict domain specifications, explicit constraints, file references, and verification requirements.

---

### Phase 1: Architecture & Data Modeling
```text
Prompt 1:
"Design a modular domain schema for an enterprise SEO and generative search intelligence platform called FlyRankAI.
Target file: src/data/mockKeywords.js.
Requirements:
1. Model realistic keyword tracking records containing: id, keyword, targetUrl, intent (Informational, Commercial, Transactional, Navigational), currentRank (1-50), previousRank, searchVolume, searchEngine (Google, Bing, Perplexity), aiOverviewStatus (Won, Cited, Absent), aiSnippet, citations, rankHistory (7-day integer array), lastCrawled (ISO string), alertThreshold.
2. Provide at least 7 realistic seed records reflecting generative engine optimization (GEO) and AI Overview citations.
3. Export INITIAL_KEYWORDS as an immutable seed constant."
```

---

### Phase 2: Strict Validation Utilities
```text
Prompt 2:
"Implement pure validation functions for the FlyRankAI keyword tracking form adhering to our project rules in CLAUDE.md.
Target file: src/utils/validators.js.
Constraints:
- validateKeyword: Trim input, enforce length between 2 and 80 characters, reject pure whitespace.
- validateTargetUrl: Reject empty strings, require HTTP or HTTPS protocol, validate hostname via URL constructor.
- validateAlertThreshold: Enforce integer type (Number.isInteger), reject decimals, negatives, 0, or numbers > 100.
- validateKeywordForm: Composite validator returning { isValid: boolean, errors: Record<string, string> }.
- Export ALLOWED_INTENTS and ALLOWED_ENGINES constants."
```

---

### Phase 3: State Management & Custom Hook
```text
Prompt 3:
"Create a comprehensive custom hook `useKeywordTracker` in src/hooks/useKeywordTracker.js.
Requirements:
- Initialize state from localStorage with fallback to INITIAL_KEYWORDS.
- Sync state to localStorage on modification with error isolation.
- Compute executive metrics using useMemo: total keywords, average rank, AI Overview win rate (%), gained/dropped momentum count, and total volume.
- Implement search filtering across keyword text and target URL.
- Implement multi-criteria filters: intent, AI Overview status, trend momentum (Gained, Dropped, Top 3, Top 10).
- Support bidirectional sorting across Rank, Movement, Search Volume, and Keyword Name.
- Support action handlers: addKeyword, deleteKeyword, recrawlKeyword (simulate rank update and history shift), recrawlAll, and exportCsv (generate downloadable CSV blob)."
```

---

### Phase 4: UI Components & WCAG 2.1 AA Accessibility
```text
Prompt 4:
"Build the interactive presentation layer for the FlyRankAI dashboard:
Files:
- src/components/Header.jsx (brand title, live status pill, recrawl all button with SVG spinner, export CSV, add keyword CTA)
- src/components/MetricCards.jsx (executive cards for Tracked Keywords, Average Rank, AI Overview Win Rate, Momentum)
- src/components/KeywordTable.jsx (sortable table headers, intent badges, rank change indicators, AI Overview status badges, row action buttons for Inspect, Recrawl, Delete, and empty state)
- src/components/AddKeywordModal.jsx (dialog with role='dialog', aria-modal='true', focus trapping, ESC key listener, explicit htmlFor labels, dynamic aria-invalid, and live error dismissal)
- src/components/KeywordInspectorDrawer.jsx (slide-over details drawer displaying 7-day SERP trajectory SVG line/area chart, Google AI Overview snippet preview, citations, and crawl metadata)
- src/App.jsx & src/App.css (dark modern theme with responsive grid, CSS variables, high contrast, and accessible focus rings)."
```

---

### Phase 5: Automated Testing Suite
```text
Prompt 5:
"Write a full Vitest and React Testing Library test suite in src/tests/KeywordTracker.test.jsx.
Test requirements:
1. Pure unit tests for validateKeyword, validateTargetUrl, validateAlertThreshold, and validateKeywordForm asserting positive and boundary negative cases.
2. Component integration tests for App:
   - Rendering executive KPI cards and initial keywords.
   - Live query searching filtering the table.
   - Intent filtering and AI status filtering.
   - Adding a new keyword via AddKeywordModal with simulated async network delay and checking table update.
   - Deleting a keyword and asserting DOM removal.
   - Opening and closing the Keyword Inspector Drawer."
```
