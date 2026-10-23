import React, { useRef } from 'react';
import { LayoutDashboard, Sparkles, Table, BarChart3, Activity } from 'lucide-react';

export const TABS_CONFIG = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'geo-audit', label: 'AI Citability Audit', icon: Sparkles, badge: 'Claude' },
  { id: 'portfolio', label: 'SERP Portfolio', icon: Table },
  { id: 'competitors', label: 'Competitor Matrix', icon: BarChart3 },
  { id: 'diagnostics', label: 'System Health', icon: Activity },
];

export function NavigationTabs({ activeTab, onSelectTab }) {
  const tablistRef = useRef(null);

  const handleKeyDown = (e) => {
    const tabs = TABS_CONFIG.map(t => t.id);
    const currentIndex = tabs.indexOf(activeTab);
    let targetIndex = -1;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      const nextId = tabs[targetIndex];
      onSelectTab(nextId);
      const nextButton = tablistRef.current?.querySelector(`[data-tab-id="${nextId}"]`);
      nextButton?.focus();
    }
  };

  return (
    <nav className="border-b border-surface-800 bg-surface-900/40" aria-label="Main Application Views">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="FlyRankAI Workspaces"
          onKeyDown={handleKeyDown}
          className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar"
        >
          {TABS_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                data-tab-id={tab.id}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} aria-hidden="true" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-400/20 text-brand-300 border border-brand-400/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
