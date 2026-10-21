import React, { useState, useRef } from 'react';
import {
  Modal,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Disclosure,
} from './playground';
import {
  Dialog as ShadcnDialog,
  DialogContent as ShadcnDialogContent,
  DialogDescription as ShadcnDialogDescription,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogTrigger as ShadcnDialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
} from '@/components/ui/tabs';

export const App: React.FC = () => {
  // Scratch modal state
  const [isScratchModalOpen, setIsScratchModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Scratch tabs state
  const [activeTab, setActiveTab] = useState('geo-overview');

  // Interactive form state inside scratch modal
  const [keywordInput, setKeywordInput] = useState('');
  const [engineSelect, setEngineSelect] = useState('google');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b border-slate-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Week 4 · Foundations
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Accessible Component Playground
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Strict W3C ARIA Authoring Practices patterns implemented from scratch in
            React + TypeScript with zero component libraries. Includes keyboard focus trapping,
            roving tabindex navigation, and side-by-side comparison with shadcn/ui (Radix primitives).
          </p>
        </header>

        {/* Section 1: Modal Dialog */}
        <section
          aria-labelledby="modal-section-heading"
          className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Pattern 01
              </span>
              <h2
                id="modal-section-heading"
                className="text-2xl font-bold text-white mt-1"
              >
                Modal Dialog (W3C ARIA Spec)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Traps keyboard focus with Tab / Shift+Tab, dismisses on Escape, and restores focus upon exit.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsScratchModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/20 focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                Open Scratch Modal
              </button>

              {/* shadcn Dialog for comparison */}
              <ShadcnDialog>
                <ShadcnDialogTrigger asChild>
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700 focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Open shadcn Dialog
                  </button>
                </ShadcnDialogTrigger>
                <ShadcnDialogContent>
                  <ShadcnDialogHeader>
                    <ShadcnDialogTitle>shadcn/ui (Radix Primitive) Dialog</ShadcnDialogTitle>
                    <ShadcnDialogDescription>
                      This dialog is rendered by @radix-ui/react-dialog with Portal, FocusScope,
                      and DismissableLayer handling backdrop clicks, pointer-events, and scroll locking.
                    </ShadcnDialogDescription>
                  </ShadcnDialogHeader>
                  <div className="py-4 space-y-3">
                    <p className="text-sm text-slate-300">
                      Try tabbing through elements and pressing Escape. Notice how focus is trapped and
                      background elements are marked <code className="text-sky-400 font-mono text-xs">aria-hidden="true"</code>.
                    </p>
                    <input
                      type="text"
                      placeholder="Type something here..."
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </ShadcnDialogContent>
              </ShadcnDialog>
            </div>
          </div>

          {/* Scratch Modal Instance */}
          <Modal
            isOpen={isScratchModalOpen}
            onClose={() => setIsScratchModalOpen(false)}
            title="Track New SERP Keyword"
            description="Add a target search query to monitor AI Overview appearance and organic rank velocity."
            initialFocusRef={firstInputRef}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsScratchModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="scratch-keyword-input"
                  className="block text-xs font-semibold uppercase text-slate-300 mb-1.5"
                >
                  Keyword Query
                </label>
                <input
                  id="scratch-keyword-input"
                  ref={firstInputRef}
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="e.g. generative search optimization"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="scratch-engine-select"
                  className="block text-xs font-semibold uppercase text-slate-300 mb-1.5"
                >
                  Search Engine
                </label>
                <select
                  id="scratch-engine-select"
                  value={engineSelect}
                  onChange={(e) => setEngineSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="google">Google Search (with Gemini AI Overviews)</option>
                  <option value="bing">Bing Search (Copilot)</option>
                  <option value="perplexity">Perplexity AI</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsScratchModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  Add Keyword
                </button>
              </div>
            </form>
          </Modal>

          {/* Verification checklist */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">Keyboard Verification:</span>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">Tab</kbd> to cycle forward; focus wraps to the close button at the end.</li>
              <li>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">Shift + Tab</kbd> to cycle backward; wraps to the last submit button.</li>
              <li>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">Escape</kbd> to close; focus immediately restores to "Open Scratch Modal".</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Tabs */}
        <section
          aria-labelledby="tabs-section-heading"
          className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Pattern 02
            </span>
            <h2
              id="tabs-section-heading"
              className="text-2xl font-bold text-white mt-1"
            >
              Tabs (Roving Tabindex & Arrow Key Navigation)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Supports <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">←</kbd> and{' '}
              <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">→</kbd> arrow keys with cyclic wrapping,
              plus <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">Home</kbd> /{' '}
              <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">End</kbd>.
            </p>
          </div>

          {/* Scratch Tabs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-300">
                Scratch Implementation (from scratch, zero dependencies):
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Active: <span className="text-sky-400">{activeTab}</span>
              </span>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              orientation="horizontal"
              activation="automatic"
            >
              <TabList aria-label="FlyRankAI Intelligence Views">
                <Tab value="geo-overview">GEO Overview</Tab>
                <Tab value="serp-telemetry">SERP Telemetry</Tab>
                <Tab value="citation-sources">Citation Sources</Tab>
                <Tab value="audit-log">Audit Log</Tab>
              </TabList>

              <TabPanel value="geo-overview" className="mt-4 space-y-2">
                <h4 className="font-semibold text-white text-base">Generative Engine Optimization (GEO)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  FlyRankAI analyzes Google AI Overviews and Gemini snippets to measure direct citations, brand mention density, and source URL attribution across generative engines.
                </p>
              </TabPanel>

              <TabPanel value="serp-telemetry" className="mt-4 space-y-2">
                <h4 className="font-semibold text-white text-base">Real-time SERP Position Trajectory</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Daily rank delta calculations across desktop and mobile user agents with localized geographic crawling.
                </p>
              </TabPanel>

              <TabPanel value="citation-sources" className="mt-4 space-y-2">
                <h4 className="font-semibold text-white text-base">Attributed Domain Authority</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Breakdown of top third-party sources cited by LLM answer engines for your core product queries.
                </p>
              </TabPanel>

              <TabPanel value="audit-log" className="mt-4 space-y-2">
                <h4 className="font-semibold text-white text-base">Historical Verification Log</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Crawl timestamp traces, DOM snapshot diffs, and verification checksums.
                </p>
              </TabPanel>
            </Tabs>
          </div>

          {/* Side-by-side shadcn Tabs */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <h3 className="text-sm font-semibold text-slate-300">
              shadcn/ui (Radix Primitives) Tabs:
            </h3>
            <ShadcnTabs defaultValue="overview" className="w-full">
              <ShadcnTabsList>
                <ShadcnTabsTrigger value="overview">Overview</ShadcnTabsTrigger>
                <ShadcnTabsTrigger value="analytics">Analytics</ShadcnTabsTrigger>
                <ShadcnTabsTrigger value="reports">Reports</ShadcnTabsTrigger>
              </ShadcnTabsList>
              <ShadcnTabsContent value="overview" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
                shadcn/ui Overview tab panel, styled with utility classes over Radix Primitive.
              </ShadcnTabsContent>
              <ShadcnTabsContent value="analytics" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
                shadcn/ui Analytics tab panel.
              </ShadcnTabsContent>
              <ShadcnTabsContent value="reports" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
                shadcn/ui Reports tab panel.
              </ShadcnTabsContent>
            </ShadcnTabs>
          </div>
        </section>

        {/* Section 3: Disclosure */}
        <section
          aria-labelledby="disclosure-section-heading"
          className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Pattern 03
            </span>
            <h2
              id="disclosure-section-heading"
              className="text-2xl font-bold text-white mt-1"
            >
              Disclosure / Collapsible (W3C ARIA Spec)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Toggleable content regions with <code className="text-sky-400 font-mono text-xs">aria-expanded</code> and <code className="text-sky-400 font-mono text-xs">aria-controls</code> linking to <code className="text-sky-400 font-mono text-xs">role="region"</code>.
            </p>
          </div>

          <div className="space-y-3">
            <Disclosure
              title="How does FlyRankAI detect Google AI Overview presence?"
              defaultOpen={true}
            >
              <p>
                FlyRankAI deploys headless browser probes with localized geographic proxies to capture SERP DOM trees. It inspects container selectors specifically mapped to Google Gemini generative summary boxes, parsing both the generated synthesis and cited reference link cards.
              </p>
            </Disclosure>

            <Disclosure
              title="What is the difference between Roving Tabindex and Aria-Activedescendant?"
            >
              <p>
                Roving tabindex dynamically sets <code className="text-sky-400 font-mono text-xs">tabIndex=0</code> on the active item and <code className="text-sky-400 font-mono text-xs">tabIndex=-1</code> on all inactive siblings, moving physical DOM focus with JavaScript. In contrast, <code className="text-sky-400 font-mono text-xs">aria-activedescendant</code> keeps DOM focus on the composite container while virtually pointing to the id of the active child element.
              </p>
            </Disclosure>

            <Disclosure
              title="How does focus trapping prevent keyboard trap violations (WCAG 2.1.2)?"
            >
              <p>
                A standard modal must prevent keyboard focus from bleeding into the background inert document (satisfying WCAG 2.4.3 Focus Order), while simultaneously ensuring that pressing <kbd className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-mono">Escape</kbd> allows the user to exit cleanly without getting stuck (satisfying WCAG 2.1.2 No Keyboard Trap).
              </p>
            </Disclosure>
          </div>
        </section>
      </div>
    </div>
  );
};
