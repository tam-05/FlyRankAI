# Project Instructions & Engineering Rules

## Stack
- Node.js (v18+)
- JavaScript (ES Modules, React, Vite)
- Vitest & React Testing Library
- Git and GitHub

## General Conventions
- Use clear, expressive file and variable names.
- Explain architectural decisions before making large edits.
- Never commit passwords, real API keys, or secrets to the repository.
- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`) for every commit.

## Project Rules Learned from Directed AI Verification

### 1. Form Validation & Data Sanitization
- **Strict Sanitization**: Never evaluate raw string truthiness (`if (!value)`) for validation. All text inputs must undergo `.trim()` before validation.
- **Explicit Domain & Type Contracts**:
  - URLs and domains must be verified using protocol/hostname checks or `new URL()` constructors; never accept incomplete protocols (`http://`) or unanchored strings.
  - Emails must adhere to strict format validation (RFC 5322 regex); partial substring checks (`.includes('@')`) are prohibited.
  - Numerical inputs must enforce integer boundaries (`Number.isInteger()`) and strictly validated min/max ranges (e.g. `1 <= threshold <= 100`).
- **Decoupled Architecture**: All validation rules must be isolated as pure, testable functions in a dedicated module (`validation.js`), separate from React component rendering.

### 2. WCAG 2.1 AA Accessibility Standards
- **Explicit Input-Label Binding**: Every form input must have a uniquely corresponding `<label htmlFor="{id}">`. Implicit nesting alone is insufficient.
- **ARIA Error Association**:
  - Invalid inputs must dynamically declare `aria-invalid="true"`.
  - Inputs must link to their respective error message via `aria-describedby="{id}-error"`.
  - Error messages must declare `role="alert"` and `aria-live="assertive"`.
  - Global status and toast notifications must utilize `role="status"` and `aria-live="polite"`.
- **Keyboard Navigation & Focus Management**:
  - On failed form submission, programmatic `.focus()` must automatically shift to the first invalid input element.
  - Interactive controls (buttons, inputs, toggles) must provide visible, high-contrast `:focus-visible` focus rings.
- **Idempotency & Submission Locks**: Submit buttons must be disabled during pending submission (`disabled={isSubmitting}`) and indicate loading state (`aria-busy="true"`) to prevent duplicate submits.

### 3. Automated Verification & Testing Gate
- **No Unverified Code**: Every component with logic or user input must ship with automated Vitest + React Testing Library tests. Code is not complete until `npm test` executes cleanly.
- **Edge-Case Test Coverage**: Test suites must cover:
  1. Valid payload submission and normalization.
  2. Pure whitespace rejection on required fields.
  3. Boundary condition violations (e.g. 0, negatives, values exceeding maximum).
  4. Real-time error dismissal when input is corrected.
  5. Correct presence of ARIA attributes (`aria-invalid`, `aria-describedby`).