# FlyRankAI

AI-powered search engine ranking, SERP analysis, and Google AI Overview visibility tracking platform.

## Overview
This repository contains the ongoing engineering work for FlyRankAI.

- **[CLAUDE.md](file:///c:/Users/taman/Documents/FlyRankAI/CLAUDE.md)**: Engineering instructions, conventions, and testable project-specific rules learned through directed AI verification loops.
- **[WORKFLOW.md](file:///c:/Users/taman/Documents/FlyRankAI/WORKFLOW.md)**: Comprehensive evaluation comparing single-shot unconstrained prompting (Round 1) vs. spec-driven engineering with verification (Round 2).

## Project Structure
```text
FlyRankAI/
├── CLAUDE.md              # Project rules and engineering guidelines
├── WORKFLOW.md            # AI prompt engineering drill report (300-500 words)
├── week-1/                # Week 1 foundations & initial repo setup
└── week-2/                # Week 2 settings form drill (Round 1 & Round 2)
    ├── src/
    │   ├── round-1/       # Round 1: Vague prompt implementation
    │   ├── round-2/       # Round 2: Spec-driven implementation with WCAG 2.1 AA a11y
    │   ├── tests/         # Vitest + React Testing Library verification suite
    │   ├── App.jsx        # Interactive dual-view & comparison matrix
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── WORKFLOW.md
```

## Running the Application
To run the interactive settings form comparison in `week-2`:

```bash
cd week-2
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Use the top navigation bar to toggle between:
- **Round 1 (Vague)**: The unconstrained prompt implementation with subtle validation and accessibility flaws.
- **Round 2 (Spec + Verified)**: The production-grade implementation with strict sanitization, focus trapping, and ARIA announcements.
- **Comparison Matrix**: Detailed side-by-side breakdown across correctness, a11y, edge cases, and review time.

## Running Tests
To run the automated verification suite:

```bash
cd week-2
npm test
```
