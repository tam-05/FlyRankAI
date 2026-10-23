import React, { useEffect, useRef, useId } from 'react';
import { X, ExternalLink, Sparkles, TrendingUp, Calendar, Zap, CheckCircle2 } from 'lucide-react';

export function KeywordDetailDrawer({ keyword, onClose }) {
  const drawerRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!keyword) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyword, onClose]);

  if (!keyword) return null;

  // Compute 7-day trajectory SVG coordinates
  // Note: Rank 1 is the best (top), so inverted Y scale
  const history = keyword.history && keyword.history.length > 0 ? keyword.history : [5, 4, 3, 2, 2, 2, 1];
  const maxRank = Math.max(...history, 10);
  const minRank = Math.min(...history, 1);

  const width = 360;
  const height = 120;
  const padding = 20;

  const points = history.map((val, idx) => {
    const x = padding + (idx / (history.length - 1)) * (width - 2 * padding);
    // Invert: lower rank number = closer to top (padding)
    const y = padding + ((val - 1) / (maxRank - minRank || 1)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-surface-900 border-l border-surface-750 p-6 space-y-6 overflow-y-auto shadow-2xl relative animate-slide-in outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-surface-800 pb-4">
          <div className="space-y-1">
            <span className="text-2xs font-bold uppercase tracking-wider text-brand-400">
              SERP Telemetry Inspector
            </span>
            <h2 id={titleId} className="text-lg font-bold text-white tracking-tight leading-snug">
              {keyword.keyword}
            </h2>
            <a
              href={keyword.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-brand-300 flex items-center gap-1 mt-0.5 truncate max-w-xs"
            >
              <span className="truncate">{keyword.url}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close detail inspector drawer"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-surface-850 border border-surface-750 space-y-1">
            <span className="text-2xs font-semibold uppercase text-slate-400">Current SERP Position</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">#{keyword.currentRank}</span>
              {keyword.currentRank < keyword.previousRank && (
                <span className="text-xs font-bold text-emerald-400">
                  ▲ +{keyword.previousRank - keyword.currentRank}
                </span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-850 border border-surface-750 space-y-1">
            <span className="text-2xs font-semibold uppercase text-slate-400">AI Overview Citability</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-purple-400">
                {keyword.aiCitationShare}%
              </span>
              <span className="text-2xs text-slate-400">Share</span>
            </div>
          </div>
        </div>

        {/* 7-Day Trajectory SVG Chart */}
        <div className="p-4 rounded-xl bg-surface-850 border border-surface-750 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              <h3 className="text-xs font-bold uppercase text-slate-200">
                7-Day Rank Velocity Trajectory
              </h3>
            </div>
            <span className="text-2xs text-slate-500">Rank #1 is top</span>
          </div>

          <div className="relative py-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible" aria-label="7-Day SERP Trajectory Line Chart">
              {/* Grid lines */}
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#334155" strokeDasharray="3 3" />
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeDasharray="3 3" />

              {/* Trajectory Polyline */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* Data points */}
              {history.map((val, idx) => {
                const x = padding + (idx / (history.length - 1)) * (width - 2 * padding);
                const y = padding + ((val - 1) / (maxRank - minRank || 1)) * (height - 2 * padding);
                const isLatest = idx === history.length - 1;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={isLatest ? 4 : 2.5}
                    fill={isLatest ? '#38bdf8' : '#0ea5e9'}
                    stroke="#0b0f19"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-2xs font-mono text-slate-500 px-1">
            <span>7 days ago: #{history[0]}</span>
            <span>Today: #{history[history.length - 1]}</span>
          </div>
        </div>

        {/* AI Overview Captured Synthesis */}
        <div className="p-4 rounded-xl bg-surface-850 border border-surface-750 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase text-slate-200">
              Captured Generative Answer Snippet
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic bg-surface-900/60 p-3 rounded-lg border border-surface-800">
            "{keyword.aiSummarySnippet}"
          </p>
        </div>

        {/* Metadata Details */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-surface-800 text-slate-400">
            <span>Search Engine:</span>
            <span className="font-semibold text-slate-200">{keyword.searchEngine}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-surface-800 text-slate-400">
            <span>Intent Category:</span>
            <span className="font-semibold text-slate-200">{keyword.intent}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-surface-800 text-slate-400">
            <span>Estimated Monthly Searches:</span>
            <span className="font-semibold text-slate-200">{keyword.volume.toLocaleString()}/mo</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-400">
            <span>Last Telemetry Audit:</span>
            <span className="font-semibold text-slate-200">
              {new Date(keyword.lastCrawled).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
