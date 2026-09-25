# AI Workflow Comparison: Directed Specs vs. Single-Shot Prompting

## Executive Summary
This drill evaluated the tangible impact of directed AI specification versus unconstrained, single-shot prompting on FlyRankAI's Search Audit & Settings Form. While Round 1 took under 10 seconds to prompt, it demanded 45 minutes of manual code review and remediation. Round 2 took 5 minutes to specify upfront with constraints and tests, yet finished end-to-end in under 12 minutes with 100% test coverage. Upfront rigor felt slower initially, but was significantly faster end-to-end.

---

## 1. Correctness & Specific AI Mistake Caught
- **Round 1 (Vague)**: The model produced a single-file form using naive JavaScript state.
  ```javascript
  // Round 1 flaw: Naive empty check & substring email match
  if (!formData.projectName) newErrors.projectName = 'Project name is required';
  if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
  ```
  **AI Mistake Caught**: Input `"   "` (pure whitespace) silently passed validation because whitespace strings are truthy. Similarly, invalid emails like `"user@"` and malformed domains like `"http://"` were accepted without warning. Alert threshold allowed `-50` or `0` ranks.
- **Round 2 (Spec-Driven)**: Extracted validation into an isolated, pure module (`src/round-2/validation.js`). It enforces whitespace trimming, length boundaries (3–50 chars), RFC 5322 regex email checking, `new URL()` hostname parsing, and strict integer range checking `[1, 100]`. All inputs are sanitized and normalized prior to payload dispatch.

---

## 2. Accessibility (WCAG 2.1 AA)
- **Round 1**: Lacked programmatic form associations. Labels were plain `<label>Project Name:</label>` without `htmlFor`, inputs lacked `id` attributes, and errors were unannounced `<span>` elements invisible to screen reader alert queues.
- **Round 2**: Implemented full WCAG 2.1 AA compliance:
  - Explicit `<label htmlFor="field-projectName">` linked to input `id`.
  - Dynamic `aria-invalid={Boolean(errors.projectName)}` and `aria-describedby`.
  - Error messages equipped with `role="alert"` and `aria-live="assertive"`.
  - Programmatic focus shifting to the first invalid field upon failed submission.
  - Live status notifications managed via `role="status"` and `aria-live="polite"`.
  - High-contrast `:focus-visible` styling and accessible password reveal toggle (`aria-label`).

---

## 3. Edge Cases & Review Effort
- **Round 1**: Left the submit button active during submission, exposing the application to double-submission race conditions. It relied on browser `alert()` popups, failed to clear validation errors as the user typed, and shipped zero automated tests.
- **Round 2**: Prevented duplicate submissions via loading locks (`aria-busy`), cleared errors dynamically on input change, provided an accessible form reset button, and shipped 22 automated Vitest tests covering edge cases, sanitization, and UI interactions.
- **Review Effort**: Round 1 required intensive manual scrutiny to catch silent security and usability failures. Round 2 replaced human guesswork with deterministic automated verification (`npm test` passed in 1.2s).

---

## 4. UI Generation Comparison (v0 Perspective)
Generative UI tools (like v0) excel at visual layout and Tailwind component scaffolds. However, without explicit behavioral contracts, they replicate Round 1's exact failure modes: decorative form fields lacking accessible ARIA bindings, shallow string validation, and missing regression tests.
