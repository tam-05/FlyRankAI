# FlyRankAI

AI-powered search engine ranking, SERP analysis, and Google AI Overview visibility tracking platform.

## Overview
This repository contains the ongoing engineering work for FlyRankAI across curriculum milestones.

- **[CLAUDE.md](file:///c:/Users/taman/Documents/FlyRankAI/CLAUDE.md)**: Engineering instructions, conventions, and testable project-specific rules learned through directed AI verification loops.
- **[WORKFLOW.md](file:///c:/Users/taman/Documents/FlyRankAI/WORKFLOW.md)**: Week 2 evaluation comparing single-shot unconstrained prompting (Round 1) vs. spec-driven engineering with verification (Round 2).
- **[week-3/SUBMISSION.md](file:///c:/Users/taman/Documents/FlyRankAI/week-3/SUBMISSION.md)**: Week 3 Capstone Application Master Submission report.

## Project Structure
```text
FlyRankAI/
├── CLAUDE.md                  # Project rules and engineering guidelines
├── WORKFLOW.md                # Week 2 AI prompt engineering drill report
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
└── week-3-next/               # Week 3 Phase 3: Next.js + Tailwind app (Vercel deploy)
    ├── src/
    │   ├── app/               # App Router pages (Server Components by default)
    │   │   ├── page.jsx       # Dashboard overview
    │   │   ├── keywords/      # Keyword tracking placeholder
    │   │   ├── ai-overviews/  # AI Overview intelligence placeholder
    │   │   ├── competitors/   # Competitor benchmarking placeholder
    │   │   ├── reports/       # Reports & exports placeholder
    │   │   ├── alerts/        # Alert rules placeholder
    │   │   ├── settings/      # Project settings placeholder
    │   │   └── health/        # Health check (live fetched data)
    │   └── components/
    │       ├── layout/        # Sidebar, TopBar (Client Components)
    │       ├── dashboard/     # MetricCardGrid, RankMomentumTable
    │       └── ui/            # PageHeader, PlaceholderSection, SkeletonGrid
    ├── tailwind.config.js     # FlyRankAI design tokens
    ├── .env.example           # Env var template (no secrets)
    ├── next.config.js
    └── package.json
```

## Running the Applications

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

### Week 2: Settings Form Comparison Drill
```bash
cd week-2
npm install
npm run dev
npm test
```
