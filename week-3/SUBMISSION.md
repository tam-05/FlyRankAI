# Week 3 Capstone Submission: FlyRankAI SERP & AI Visibility Dashboard

**Candidate**: Tamanna Das  
**Track**: AI Fluency Capstone  
**Repository**: [FlyRankAI (GitHub)](https://github.com/tam-05/FlyRankAI.git)  
**Branch**: `main`  
**Path**: `week-3/`

---

## 1. Project Overview & Completed Application
For Week 3, we built the core client-facing application for **FlyRankAI**: an enterprise-grade **SERP & Generative AI Overview Visibility Dashboard**.

### Key Features Implemented:
- **Executive Metric Cards**: Real-time calculated KPIs for Tracked Keywords, Average Organic Rank, AI Overview Win Rate (%), and Rank Movement Momentum.
- **Interactive Keywords Table**:
  - Live search across keyword query phrases and destination landing URLs.
  - Multi-dimensional filters: Search Intent (Informational, Commercial, Transactional, Navigational), AI Overview Status (Won, Cited, Absent), and Rank Momentum (Gained, Dropped, Top 3, Top 10).
  - Bidirectional sorting across Rank, Movement, Monthly Volume, and Keyword Name.
  - Row actions: Inspect AI Overview, Manual Single-Keyword Recrawl, and Delete.
- **Keyword Inspector Drawer (Slide-Over Panel)**:
  - Deep-dive panel displaying simulated Google AI Overview generative answer snippet.
  - Source citations breakdown.
  - Custom SVG 7-day SERP Rank Trajectory area chart with inverted Y-axis.
  - Full crawl metadata and drop sensitivity triggers.
- **Add Tracked Keyword Modal**:
  - Validated dialog with focus management, Escape key listener, and live validation.
  - Full compliance with `CLAUDE.md` rules (trimmed strings, protocol validation, integer thresholds).
- **Audit Data Export**:
  - One-click CSV export utility generating downloadable CSV reports of the active filtered dataset.
- **Persistent State**:
  - Synced to `localStorage` with fail-safe fallbacks.

---

## 2. Prompts Used During Development
All prompts used during development followed the explore-plan-code paradigm established in Week 2, specifying schema requirements, constraints, and verification steps upfront.

The complete verbatim prompt log is preserved in **[PROMPTS.md](./PROMPTS.md)**:
1. **Phase 1: Architecture & Data Modeling** — Schema definition for keywords, search intents, AI statuses, and seed records.
2. **Phase 2: Strict Validation Utilities** — Pure validator functions in `src/utils/validators.js` conforming to `CLAUDE.md`.
3. **Phase 3: State Management & Custom Hook** — Custom hook `useKeywordTracker` encapsulating filters, sorting, metrics computation, and CSV export.
4. **Phase 4: Presentation & UI Layer** — Accessible components (`Header`, `MetricCards`, `KeywordTable`, `AddKeywordModal`, `KeywordInspectorDrawer`, and responsive dark-theme CSS).
5. **Phase 5: Automated Testing Suite** — Unit and integration tests in `src/tests/KeywordTracker.test.jsx`.

---

## 3. Explanation of How AI Assisted Throughout Implementation
The complete analysis is documented in **[AI_ASSISTANCE.md](./AI_ASSISTANCE.md)**:
- **Domain Modeling**: AI rapidly scaffolded realistic mock SEO data and Generative Engine Optimization (GEO) snippets.
- **Validation Boilerplate**: AI generated standard URL and string validation logic.
- **Mathematical Geometry**: AI generated the SVG coordinate mapping algorithm to render the 7-day sparkline and area chart without external dependencies.
- **Test Generation**: AI synthesized 19 comprehensive Vitest and Testing Library test cases covering unit assertions and integration flows.

---

## 4. Manual Improvements, Corrections & Refactoring
Full code diffs and explanations are provided in **[MANUAL_IMPROVEMENTS.md](./MANUAL_IMPROVEMENTS.md)**:
1. **SERP Rank Inversion Bug**: AI naively treated rank numbers as standard metrics where higher is better. In SEO, rank `#1` is superior to `#10`. We manually corrected the rank change calculation and inverted the SVG Y-axis.
2. **Node.js 26 `localStorage` Runtime Failure**: AI assumed `localStorage` was present in Node.js 26 JSDOM. We manually implemented an isolated global storage mock in `setupTests.js` to ensure clean test execution.
3. **Async Test Synchronization**: AI wrote synchronous assertions after a simulated network timeout. We corrected this using `await waitFor(...)` to prevent test race conditions.
4. **WCAG 2.1 AA Accessibility & Keyboard Trapping**: Manually added Escape key listeners, programmatic focus shifting on modal open, and ARIA dialog bindings.

---

## 5. Verification & Test Summary
The entire application was verified locally via automated tests and production builds:

```bash
cd week-3
npm test
npm run build
```

- **Vitest Test Suite**: 19 tests passing (`19 passed (19)`) in 779ms.
- **Vite Production Build**: 40 modules transformed, `0` warnings, built in 727ms.
