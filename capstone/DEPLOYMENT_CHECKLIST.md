# FE-11 Production Deployment Checklist & Operational Runbook

**Project:** FlyRankAI — Generative Engine Optimization & SERP Intelligence  
**Engineer:** Tamanna Das  
**Version:** v1.0.0 (Production Release)  
**Target Environment:** Vercel Production (`https://flyrankai.vercel.app` / custom domain)  
**Date:** October 2026  

---

## 1. Pre-Deployment Verification Sign-Off

| Check Item | Requirement | Status | Sign-off Notes |
| :--- | :--- | :---: | :--- |
| **Linting & Formatting** | Zero ESLint / build warnings | **PASSED** | Clean build via `vite build` |
| **Unit & Integration Tests** | 100% test suite passing | **PASSED** | Vitest suite passing with zero failures |
| **Bundle Size Optimization** | Minified & compressed JS/CSS | **PASSED** | Gzip payload < 80 kB initial load |
| **TypeScript / Prop Checking** | Clean data contracts | **PASSED** | Schema sanitization in `aiService.js` |
| **WCAG 2.1 AA Compliance** | Zero critical/serious axe-core violations | **PASSED** | Contrast >= 4.5:1, skip-links, ARIA live regions |
| **Keyboard Accessibility** | All flows accessible via Tab/Arrows/Esc | **PASSED** | W3C Dialog & Roving Tabindex tested |
| **Secrets & Keys Hygiene** | Zero API keys committed to git | **PASSED** | `.env.example` committed; `.env*` in `.gitignore` |

---

## 2. Fail-Safe & Resilience Architecture (FE-07)

### Failure Mode 1: Anthropic API Outage or Invalid API Key (HTTP 401 / 500)
* **Risk:** User requests a GEO audit with an expired or missing key, causing an uncaught network rejection.
* **Mitigation:** `aiService.js` intercepts network failures and non-200 HTTP statuses. It automatically activates the **Resilient Offline GEO Heuristic Engine**, computing realistic contextual citations and entity gaps without crashing. An informative amber banner alerts the user of offline heuristic mode.

### Failure Mode 2: Malformed LLM Markdown or Code Fence Injection
* **Risk:** The LLM responds with conversational preamble or wraps JSON in ````json ... ```` fences, causing `JSON.parse` to throw.
* **Mitigation:** The parser regex-strips markdown fences and trims whitespace before parsing. All parsed keys are passed through `validateAuditResult()`, bounding numerical scores (0-100) and backfilling missing arrays with safe defaults.

### Failure Mode 3: LocalStorage Corrupted or Quota Exceeded
* **Risk:** Browser storage throws `QuotaExceededError` or encounters invalid JSON from prior versions.
* **Mitigation:** `usePortfolio.js` wraps all `localStorage.getItem` and `setItem` calls in try/catch blocks. If corruption occurs, the state safely falls back to the factory seed dataset (`INITIAL_KEYWORDS`).

### Failure Mode 4: Catastrophic Component Render Error
* **Risk:** An unhandled error in a deeply nested table or chart crashes the entire page into a blank screen.
* **Mitigation:** The top-level root tree is wrapped in `ErrorBoundary.jsx`, catching unhandled runtime exceptions and displaying an accessible error recovery card with a one-click reload button.

---

## 3. Rollback & Emergency Recovery Protocol

1. **Vercel Instant Rollback (Zero Downtime):**
   - In the Vercel Project Dashboard (`Deployments` tab), select the previous verified green deployment.
   - Click `...` -> **"Promote to Production"**.
   - Rollback completes globally across CDN edge locations in under **15 seconds** without rebuilding.
2. **Git Emergency Revert:**
   - If a rollback commit is required in version control:
     ```bash
     git revert HEAD
     git push origin main
     ```
   - Automated git CI/CD triggers and lands the clean build on production automatically.
3. **Local Incident Reproduction:**
   ```bash
   cd capstone
   npm run preview
   ```

---

## 4. Sign-Off Authorization

- **Engineer:** Tamanna Das  
- **Role:** Frontend Software Engineer Intern  
- **Status:** **APPROVED FOR PRODUCTION DEPLOYMENT**
