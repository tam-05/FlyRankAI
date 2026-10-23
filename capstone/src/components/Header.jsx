import React from 'react';
import { Sparkles, Plus, Settings, ShieldCheck, Activity } from 'lucide-react';

export function Header({
  metrics,
  onOpenAddModal,
  onOpenSettings,
  isHighContrast,
  onToggleHighContrast,
}) {
  return (
    <header className="border-b border-surface-800 bg-surface-900/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand flex-shrink-0" aria-hidden="true">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                FlyRankAI
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-500/15 text-brand-400 border border-brand-500/30">
                Capstone v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Generative Engine Optimization & SERP AI Overview Telemetry
            </p>
          </div>
        </div>

        {/* Real-time KPI Ticker */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-surface-850 border border-surface-750 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Tracked:</span>
            <span className="font-bold text-white">{metrics.totalKeywords}</span>
          </div>
          <div className="h-3 w-px bg-surface-700" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Avg Rank:</span>
            <span className="font-bold text-brand-400">#{metrics.averageRank}</span>
          </div>
          <div className="h-3 w-px bg-surface-700" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">AI Win Rate:</span>
            <span className="font-bold text-emerald-400">{metrics.aiWinRate}%</span>
          </div>
          <div className="h-3 w-px bg-surface-700" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-emerald-400 font-medium">Telemetry Live</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleHighContrast}
            title={isHighContrast ? 'Switch to Normal Contrast' : 'Switch to High Contrast (A11y)'}
            aria-pressed={isHighContrast}
            className="p-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-slate-300 border border-surface-700 text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Toggle High Contrast</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-slate-200 border border-surface-700 text-xs font-semibold transition-colors"
          >
            <Settings className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 text-xs font-bold shadow-glow-brand transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Track Keyword</span>
          </button>
        </div>
      </div>
    </header>
  );
}
