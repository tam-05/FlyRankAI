import React from 'react';
import {
  TrendingUp,
  Award,
  Search,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export function OverviewSection({ metrics, keywords, onSelectKeyword, onGoToAudit }) {
  const topGainers = keywords
    .filter(k => k.currentRank < k.previousRank)
    .slice(0, 3);

  const topCitations = keywords
    .filter(k => k.aiOverviewStatus === 'Won')
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
      {/* Hero Banner */}
      <div className="card-surface p-6 sm:p-8 bg-gradient-to-r from-surface-900 via-surface-850 to-brand-950/40 border-brand-500/20">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/15 text-brand-300 border border-brand-500/30">
            <Zap className="w-3.5 h-3.5 text-brand-400" />
            AI Overview Telemetry Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Generative Engine Optimization Dashboard
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Track organic rankings across traditional SERPs and generative AI search engines.
            Audit your content in real time with Claude 3.5 to claim top generative citation slots.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGoToAudit}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 font-bold text-xs sm:text-sm shadow-glow-brand transition-all"
            >
              Run AI Citability Audit
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Keywords */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Tracked Keywords</span>
            <Search className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.totalKeywords}
          </div>
          <p className="text-xs text-slate-500">Google, Bing & Perplexity</p>
        </div>

        {/* Average Rank */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Position</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              #{metrics.averageRank}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              ↑ Top 5 Target
            </span>
          </div>
          <p className="text-xs text-slate-500">Across active portfolio</p>
        </div>

        {/* AI Overview Win Rate */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Win Rate</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {metrics.aiWinRate}%
            </span>
            <span className="text-xs text-purple-300 font-semibold">
              {metrics.aiWonCount} of {metrics.totalKeywords} won
            </span>
          </div>
          <p className="text-xs text-slate-500">Primary citation in AI answers</p>
        </div>

        {/* Total Search Volume */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Volume</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {(metrics.totalVolume / 1000).toFixed(1)}K
          </div>
          <p className="text-xs text-slate-500">Total addressable searches/mo</p>
        </div>
      </div>

      {/* Highlights: Top Gainers & Citations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Momentum Gainers */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Top Rank Momentum Gainers</h3>
            <span className="text-xs text-slate-400 font-medium">7-Day Delta</span>
          </div>

          <div className="space-y-3">
            {topGainers.map((item) => {
              const diff = item.previousRank - item.currentRank;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectKeyword(item)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-800/80 hover:bg-surface-750 transition-colors cursor-pointer border border-surface-700/60"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-sm text-slate-200 truncate">{item.keyword}</p>
                    <p className="text-xs text-slate-500 truncate">{item.url}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-extrabold text-white">#{item.currentRank}</span>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +{diff}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top AI Citations */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Primary AI Overview Citations</h3>
            <span className="text-xs text-emerald-400 font-semibold">Won Status</span>
          </div>

          <div className="space-y-3">
            {topCitations.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectKeyword(item)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-800/80 hover:bg-surface-750 transition-colors cursor-pointer border border-surface-700/60"
              >
                <div className="min-w-0 pr-3">
                  <p className="font-semibold text-sm text-slate-200 truncate">{item.keyword}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{item.aiSummarySnippet}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
                    {item.aiCitationShare}% Share
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
