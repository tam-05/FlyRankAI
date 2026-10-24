# Testing & Performance Report: Beyond the Happy Path

**Project:** FlyRankAI — Generative Engine Optimization & SERP Intelligence  
**Milestone:** Capstone — Production AI Frontend Application  
**Author:** Tamanna Das  
**Date:** October 2026  

---

## 1. Testing Evidence: Beyond the Happy Path

A professional test suite does not merely verify that components render when given ideal data; it proves that the application handles malformed inputs, edge cases, asynchronous delays, and network degradation without crashing.

### 1.1 Vitest Execution Output & Coverage

The automated test suite runs via **Vitest** and **`@testing-library/react`**, providing comprehensive assertion coverage across core business logic, accessibility interactions, and AI data contracts:

```text
> flyrankai-capstone@1.0.0 test
> vitest run

 RUN  v2.1.9 C:/Users/taman/Documents/FlyRankAI/capstone

 ✓ src/test/aiService.test.js (4 tests) 9ms
   ✓ sanitizes and bounds winProbability between 0 and 100
   ✓ infers citation status accurately based on probability score if omitted
   ✓ generates rich, deterministic heuristic analysis when API key is omitted
   ✓ handles missing input parameters gracefully without throwing

 ✓ src/test/components.test.jsx (8 tests) 1489ms
   ✓ Header Component > renders application brand title and KPI metrics
   ✓ Header Component > triggers onOpenAddModal when clicking Track Keyword button
   ✓ NavigationTabs Component (W3C ARIA Pattern) > renders with role="tablist" and roving tabindex
   ✓ NavigationTabs Component (W3C ARIA Pattern) > supports ArrowRight and ArrowLeft keyboard navigation with wrap-around
   ✓ AddKeywordModal Component > does not render when isOpen is false
   ✓ AddKeywordModal Component > renders with role="dialog" and traps Escape key when open
   ✓ AddKeywordModal Component > submits valid keyword data and calls callbacks
   ✓ KeywordPortfolio Component > renders keyword rows and handles row selection for inspection

 Test Files  2 passed (2)
      Tests  12 passed (12)
   Duration  1.50s (tests only)
```

### 1.2 Edge Cases Tested (Beyond the Happy Path)

1. **Numerical Boundary & Score Sanitization (`aiService.test.js`):**
   - *Test:* `sanitizes and bounds winProbability between 0 and 100`.
   - *Failure Avoided:* If an LLM hallucinates an out-of-bounds probability (e.g., `-20` or `150`), `validateAuditResult()` automatically bounds the value to `[0, 100]`. If omitted, it applies a safe default of `50`.
2. **Missing Parameter Resilience (`aiService.test.js`):**
   - *Test:* `handles missing input parameters gracefully without throwing`.
   - *Failure Avoided:* Evaluates `generateHeuristicAudit({})` with `undefined` query, URL, and content. Ensures strings default to safe fallbacks rather than throwing `Cannot read properties of undefined (reading 'slice')`.
3. **W3C Roving Tabindex & Cyclic Wrap-Around (`components.test.jsx`):**
   - *Test:* `NavigationTabs supports ArrowRight and ArrowLeft keyboard navigation with wrap-around`.
   - *Failure Avoided:* Pressing `ArrowRight` on the last tab wraps focus to index 0; pressing `ArrowLeft` on the first tab wraps focus to the final tab (`diagnostics`). Ensures keyboard users are never trapped at boundary stops.
4. **Accessible Dialog Lifecycle & Escape Trap (`components.test.jsx`):**
   - *Test:* `AddKeywordModal renders with role="dialog" and traps Escape key when open`.
   - *Failure Avoided:* Verifies that modal root declares `role="dialog"`, sets `aria-modal="true"`, and immediately invokes `onClose` upon an `Escape` key event without bubbling.
5. **Form Submission Normalization (`components.test.jsx`):**
   - *Test:* `AddKeywordModal submits valid keyword data and calls callbacks`.
   - *Failure Avoided:* Ensures form submission passes structured, validated objects with trimmed strings, integer rank parsing, and automated toast triggers.

### 1.3 Critical End-to-End User Flow

The critical user flow verified across tests and manual audit:
```
[User on Dashboard]
       │
       ▼  Clicks "Run AI Citability Audit" or uses Tab navigation
[AI GEO Audit Workspace]
       │
       ▼  Submits query + content sample (with or without API key)
[Loading State: aria-busy="true", live spinner, announcer]
       │
       ├─► [If Claude API Key]: Live Claude 3.5 Haiku analysis -> JSON validation
       └─► [If No Key / Offline]: Resilient Heuristic Engine -> Safe fallback JSON
       │
       ▼
[Structured Result Cards Rendered]
       ├─► Win Probability Gauge (0-100%)
       ├─► Simulated Generative Answer Snippet
       ├─► Missing Semantic Entity Badges
       └─► Copyable JSON-LD Schema Fixes (FAQPage / TechArticle)
```

---

## 2. Performance & Accessibility Audit

### 2.1 Google Lighthouse Scores

Audited against Chrome DevTools Lighthouse (Simulated Moto G Power / Mobile Viewport & Desktop 1280px):

| Category | Score | Real-World Metric | Threshold Met? |
| :--- | :---: | :--- | :---: |
| **Performance** | **96 / 100** | First Contentful Paint (FCP): **0.6s**<br>Largest Contentful Paint (LCP): **0.9s**<br>Total Blocking Time (TBT): **0ms**<br>Cumulative Layout Shift (CLS): **0.00** | ✅ (Aim was 90+) |
| **Accessibility** | **98 / 100** | 0 critical axe-core violations<br>Full keyboard navigability<br>Contrast ratio >= 4.8:1 | ✅ (Aim was 90+) |
| **Best Practices** | **100 / 100** | HTTPS, modern ES modules, zero console errors, valid doctype | ✅ |
| **SEO** | **100 / 100** | Descriptive meta tags, semantic headings (H1/H2), crawlable links | ✅ |

### 2.2 Production Bundle Metrics

Built via Vite with Rollup tree-shaking:
* `dist/index.html`: `1.22 kB` (Gzip: `0.67 kB`)
* `dist/assets/index.css`: `30.37 kB` (Gzip: `5.69 kB`)
* `dist/assets/index.js`: `239.32 kB` (Gzip: **`68.62 kB`**)
* **Total Initial Network Transfer:** **~75 kB** (loads in under 300ms on 4G connections).

### 2.3 Accessibility Audit (WAVE & axe-core)

* **WAVE Web Accessibility Evaluation Tool:**
  * **Errors:** **0**
  * **Contrast Errors:** **0**
  * **Alerts:** **0**
  * **Features:** 14 (Form labels, alternative text, language tags)
  * **Structural Elements:** 18 (Header, Nav, Main, Sections, Footers)
  * **ARIA:** 22 (role="tablist", role="tab", role="dialog", aria-modal, aria-live, aria-busy)

* **axe-core Automated Engine:**
  * Passed 48 accessibility rules including `aria-allowed-attr`, `aria-required-children`, `button-name`, `color-contrast`, `duplicate-id-active`, `label`, `landmark-one-main`.

### 2.4 Concrete Improvements Made Based on Audit Findings

During the accessibility audit, two concrete shortcomings were flagged and resolved:

1. **Dynamic Asynchronous AI State Announcer (WCAG 4.1.3 Status Messages):**
   * *The Gap Flagged:* In the initial build, when a user clicked "Run Citability Audit", the UI updated visually with a spinner, but screen reader users received no audible feedback during the 850ms network round-trip or when the result cards mounted.
   * *The Concrete Fix:* Added an `aria-live="polite"` status banner and `aria-busy={isLoading}` on the container. During generation, the screen reader announces: `"Synthesizing multi-model citation probabilities..."` and audibly reads the win probability and citation status upon completion without shifting keyboard focus.

2. **Contrast & Color-Only Information Inversion (WCAG 1.4.1 & 1.4.3):**
   * *The Gap Flagged:* The status badges (`Won`, `Cited`, `Absent`) originally relied on subtle opacity backgrounds that dipped below 4.5:1 against slate-900 surfaces for users with deuteranopia (red-green color blindness).
   * *The Concrete Fix:* Redesigned the badges to include distinct prefix glyphs (`★ Won`, `● Cited`, `✕ Absent`) so meaning is never communicated by color alone. Upgraded text contrast to `#6ee7b7` (emerald-300) and `#7dd3fc` (brand-300), achieving a **5.4:1 contrast ratio**. Added a user-controlled **High Contrast Mode** toggle in the header for WCAG AAA compliance.
