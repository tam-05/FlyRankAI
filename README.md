# FlyRankAI

AI-powered search engine ranking, SERP analysis, and Google AI Overview visibility tracking platform.

## Overview
This repository contains the ongoing engineering work for FlyRankAI across curriculum milestones.

- **[CLAUDE.md](file:///c:/Users/taman/Documents/FlyRankAI/CLAUDE.md)**: Engineering instructions, conventions, and testable project-specific rules learned through directed AI verification loops.
- **[capstone/PORTFOLIO_ENTRY.md](file:///c:/Users/taman/Documents/FlyRankAI/capstone/PORTFOLIO_ENTRY.md)**: Master Production Capstone Portfolio Entry (7-part comprehensive evaluation).
- **[capstone/DEPLOYMENT_CHECKLIST.md](file:///c:/Users/taman/Documents/FlyRankAI/capstone/DEPLOYMENT_CHECKLIST.md)**: FE-11 Production deployment sign-off & rollback plan.
- **[WORKFLOW.md](file:///c:/Users/taman/Documents/FlyRankAI/WORKFLOW.md)**: Week 2 evaluation comparing single-shot unconstrained prompting (Round 1) vs. spec-driven engineering with verification (Round 2).
- **[week-4/NOTES.md](file:///c:/Users/taman/Documents/FlyRankAI/week-4/NOTES.md)**: Week 4 ARIA gap analysis (custom scratch components vs. Radix/shadcn).
- **[week-3/SUBMISSION.md](file:///c:/Users/taman/Documents/FlyRankAI/week-3/SUBMISSION.md)**: Week 3 Capstone Application Master Submission report.

## Project Structure
```text
FlyRankAI/
├── CLAUDE.md                  # Project rules and engineering guidelines
├── WORKFLOW.md                # Week 2 AI prompt engineering drill report
├── capstone/                  # ★ PRODUCTION CAPSTONE APPLICATION ★
│   ├── src/
│   │   ├── components/        # Header, GeoAuditSection, KeywordPortfolio, Drawer, Modals
│   │   ├── services/          # aiService.js (Claude 3.5 API + Resilient Heuristic Fallback)
│   │   ├── hooks/             # usePortfolio.js (state, filtering, sorting, localStorage)
│   │   ├── test/              # Vitest test suite (12 passed tests)
│   │   └── App.jsx            # Master layout with WCAG 2.1 AA accessibility & A11y toggle
│   ├── PORTFOLIO_ENTRY.md     # Complete 7-part capstone submission document
│   ├── DEPLOYMENT_CHECKLIST.md# FE-11 production sign-off and rollback runbook
│   ├── package.json
│   └── vite.config.js
├── week-1/                    # Week 1 foundations & initial repo setup
├── week-2/                    # Week 2 settings form drill (Round 1 & Round 2)
├── week-3/                    # Week 3 core React application & AI partnership
│   ├── src/
│   │   ├── components/        # Header, MetricCards, KeywordTable, AddKeywordModal, InspectorDrawer
│   │   ├── data/              # Seed keywords and AI Overview telemetry
│   │   ├── hooks/             # useKeywordTracker custom state & CSV export hook
│   │   ├── utils/             # Validators adhering to CLAUDE.md rules
│   │   ├── tests/             # Vitest + React Testing Library verification suite (19 tests)
│   │   ├── App.jsx            # Core dashboard layout
│   │   └── main.jsx
│   ├── SUBMISSION.md          # Master submission document
│   ├── PROMPTS.md             # Complete prompt engineering logs
│   ├── AI_ASSISTANCE.md       # Explanation of AI collaboration
│   ├── MANUAL_IMPROVEMENTS.md # Detailed code review fixes & diffs
│   ├── package.json
│   └── vite.config.js
├── week-3-next/               # Week 3 Phase 3: Next.js + Tailwind app (Vercel deploy)
│   ├── src/
│   │   ├── app/               # App Router pages (Server Components by default)
│   │   │   ├── page.jsx       # Dashboard overview
│   │   │   ├── keywords/      # Keyword tracking placeholder
│   │   │   ├── ai-overviews/  # AI Overview intelligence placeholder
│   │   │   ├── competitors/   # Competitor benchmarking placeholder
│   │   │   ├── reports/       # Reports & exports placeholder
│   │   │   ├── alerts/        # Alert rules placeholder
│   │   │   ├── settings/      # Project settings placeholder
│   │   │   └── health/        # Health check (live fetched data)
│   │   └── components/
│   │       ├── layout/        # Sidebar, TopBar (Client Components)
│   │       ├── dashboard/     # MetricCardGrid, RankMomentumTable
│   │       └── ui/            # PageHeader, PlaceholderSection, SkeletonGrid
│   ├── tailwind.config.js     # FlyRankAI design tokens
│   ├── .env.example           # Env var template (no secrets)
│   ├── next.config.js
│   └── package.json
└── week-4/                    # Week 4: Accessible Component Playground (FE-03)
    ├── playground/            # Three scratch W3C ARIA components (React + TypeScript)
    │   ├── Modal.tsx          # Dialog modal with focus trapping & return focus
    │   ├── Tabs.tsx           # Tabs with roving tabindex & arrow navigation
    │   ├── Disclosure.tsx     # Show/hide disclosure region with aria-expanded
    │   └── index.ts
    ├── src/
    │   ├── components/ui/     # Canonical shadcn/ui components (dialog.tsx, tabs.tsx)
    │   ├── playground/        # Component sources
    │   ├── App.tsx            # Interactive comparison showcase
    │   └── main.tsx
    ├── NOTES.md               # Deep gap analysis (scratch vs. shadcn / Radix primitives)
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Running the Applications

### ★ Production Capstone: FlyRankAI (FE-12)
```bash
cd capstone
npm install
npm run dev
```
Open `http://localhost:5173` to test:
- **AI Citability & GEO Content Audit**: Live query and content audit powered by Claude 3.5 (or resilient offline heuristic fallback).
- **SERP Portfolio Tracking**: Multi-criteria search, filtering (Intent, AI Overview Status), column sorting, and CSV export.
- **Telemetry Inspector**: 7-day SERP Trajectory SVG polyline charts and captured AI overview answer snippets.
- **Accessibility (WCAG 2.1 AA)**: Roving tabindex navigation, focus-trapped dialogs, Escape listeners, high-contrast mode toggle, and ARIA live regions.
- **System Diagnostics**: Telemetry latency ping, deployment tier status, and rollback protocols.

Run the test suite:
```bash
npm test         # 12 / 12 unit & integration tests passing (100%)
npm run build    # Optimized production build (< 70 kB gzip JS)
```

### Week 3: SERP & AI Visibility Dashboard
```bash
cd week-3
npm install
npm run dev
```
Open `http://localhost:5173` to test:
- Live keyword search, multi-criteria intent & AI Overview filters.
- Real-time KPI metrics calculation.
- 7-day SERP Trajectory SVG charts in the Keyword Inspector Drawer.
- Adding new keywords with full WCAG 2.1 AA validation.
- One-click CSV audit export.

To run the Week 3 test suite:
```bash
cd week-3
npm test
```

### Week 3 Phase 3: Next.js + Tailwind (Vercel Deploy)
```bash
cd week-3-next
npm install
npm run dev
```
Open `http://localhost:3000` to view:
- 8 fully-routed pages (Dashboard, Keywords, AI Overviews, Competitors, Reports, Alerts, Settings, Health Check).
- Responsive layout at 375px and 1280px with collapsible sidebar.
- Health Check page fetches live data server-side from JSONPlaceholder API.
- FlyRankAI design tokens in Tailwind config (brand sky-blue palette, dark navy surfaces, glow effects).

Production build:
```bash
npm run build    # 0 errors, 11/11 pages generated
```

### Week 4: Accessible Component Playground (FE-03)
```bash
cd week-4
npm install
npm run dev
```
Open `http://localhost:5173` to test:
- **Modal Dialog**: Focus trapping (`Tab` / `Shift+Tab`), Escape key listener, focus return to triggering element on close, body scroll locking, and zero `any` types.
- **Tabs**: Roving `tabIndex` (only active tab is focusable with Tab), Left/Right arrow keys with cyclic wrapping, Home/End keys, automatic/manual activation.
- **Disclosure**: Native `<button>` trigger with `aria-expanded` and `aria-controls` referencing `role="region"` content.
- **Side-by-side shadcn/ui comparison**: Compare scratch implementations with canonical `@radix-ui/react-dialog` and `@radix-ui/react-tabs`.
- Read **[week-4/NOTES.md](file:///c:/Users/taman/Documents/FlyRankAI/week-4/NOTES.md)** for detailed gap analysis covering:
  1. Accessibility tree isolation (`aria-hidden` subtree inversion)
  2. Pointer interaction lifecycles (`DismissableLayer` pointerdown vs pointerup)
  3. Mobile Safari scroll lock & scrollbar layout shifts (`react-remove-scroll`)
  4. Bidirectional (RTL) keyboard navigation in roving tabindex (`RovingFocusGroup`)
  5. Focus restoration edge cases when trigger elements detach (`onCloseAutoFocus`)

Type check & production build:
```bash
npx tsc -b       # 0 errors, strict TypeScript, zero 'any' types
npm run build    # Production bundle verification
```

### Week 2: Settings Form Comparison Drill
```bash
cd week-2
npm install
npm run dev
npm test
```
