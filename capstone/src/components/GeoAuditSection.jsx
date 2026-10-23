import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Layers,
} from 'lucide-react';
import { runGeoAudit, AUDIT_ENGINES } from '../services/aiService';

export function GeoAuditSection({ apiKey }) {
  const [query, setQuery] = useState('how to optimize content for google ai overviews');
  const [targetUrl, setTargetUrl] = useState('https://flyrank.ai/guide/geo-strategy');
  const [contentSample, setContentSample] = useState(
    'Generative Engine Optimization (GEO) requires structuring content with direct answers, numerical data, and JSON-LD schema. Pages should feature 40-word concise definition blocks that LLMs can extract easily into Gemini answer snippets.'
  );
  const [engine, setEngine] = useState('google');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auditResult, setAuditResult] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await runGeoAudit({
        query: query.trim(),
        targetUrl: targetUrl.trim(),
        contentSample: contentSample.trim(),
        engine,
        apiKey,
      });
      setAuditResult(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during the audit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="panel-geo-audit" role="tabpanel" aria-labelledby="tab-geo-audit">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-brand-500/10 text-brand-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Generative Engine Intelligence
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            AI Overview Citability Audit
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Audit target content against Google Gemini, Perplexity, and Copilot retrieval algorithms.
            Predict citation probability, uncover semantic information gaps, and get structured JSON recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-850 px-3.5 py-2 rounded-xl border border-surface-750 text-xs text-slate-400">
          <Cpu className="w-4 h-4 text-brand-400" />
          <span>Model: <strong>{apiKey ? 'Claude 3.5 Haiku (Live API)' : 'Resilient Heuristic GEO Engine'}</strong></span>
        </div>
      </div>

      {/* Audit Input Form */}
      <form onSubmit={handleSubmit} className="card-surface p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Target Query */}
          <div>
            <label htmlFor="audit-query" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Search Query <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" aria-hidden="true" />
              <input
                id="audit-query"
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. enterprise generative search optimization"
                className="w-full pl-10 pr-4 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
          </div>

          {/* Target Engine */}
          <div>
            <label htmlFor="audit-engine" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Generative Engine Scope
            </label>
            <select
              id="audit-engine"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {AUDIT_ENGINES.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Target URL */}
        <div>
          <label htmlFor="audit-url" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Target Page URL (Landing Page)
          </label>
          <input
            id="audit-url"
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://yourdomain.com/target-page"
            className="w-full px-4 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Content Excerpt */}
        <div>
          <label htmlFor="audit-content" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Page Content Sample / Body Text
          </label>
          <textarea
            id="audit-content"
            rows={3}
            value={contentSample}
            onChange={(e) => setContentSample(e.target.value)}
            placeholder="Paste your page intro, key definitions, or core sections here..."
            className="w-full px-4 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <p className="text-xs text-slate-500 mt-1">
            Tip: Include your opening 150 words or technical summary to evaluate definitional density.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <div aria-live="polite" className="text-xs text-slate-400">
            {isLoading && (
              <span className="flex items-center gap-2 text-brand-400 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Synthesizing multi-model citation probabilities...
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 font-bold text-sm shadow-glow-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Citability Audit</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error State Banner */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">Citability Audit Encountered an Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Fallback Notice if triggered */}
      {auditResult?.isFallback && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              {auditResult.fallbackReason ||
                'Running via Resilient Offline GEO Heuristic Engine (no API key required). To use live Claude API, add your key in Settings.'}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400/80">
            Resilient Mode
          </span>
        </div>
      )}

      {/* Structured Audit Results Output */}
      {auditResult && (
        <div
          aria-live="polite"
          aria-busy={isLoading}
          className="space-y-6 animate-fade-in"
        >
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Win Probability */}
            <div className="card-surface p-5 border-l-4 border-brand-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                AI Overview Win Probability
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {auditResult.winProbability}%
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  auditResult.winProbability >= 70
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : auditResult.winProbability >= 40
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {auditResult.winProbability >= 70 ? 'High Confidence' : auditResult.winProbability >= 40 ? 'Moderate' : 'Low'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Evaluated against current Google Gemini & Copilot extraction weights.
              </p>
            </div>

            {/* Citation Status */}
            <div className="card-surface p-5 border-l-4 border-emerald-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Predicted Citation Status
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-white">
                  {auditResult.citationStatus === 'Won' && '★ Primary Source (Won)'}
                  {auditResult.citationStatus === 'Cited' && '● Referenced Source (Cited)'}
                  {auditResult.citationStatus === 'Absent' && '✕ Not Cited (Absent)'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Status reflects presence in simulated generative snippet card carousels.
              </p>
            </div>

            {/* Engine Audited */}
            <div className="card-surface p-5 border-l-4 border-purple-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Engine Synthesis
              </span>
              <div className="text-lg font-bold text-white mt-2">
                {auditResult.engineUsed}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Audited at: {new Date(auditResult.auditedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Simulated Generative Snippet */}
          <div className="card-surface p-6 space-y-3 border-brand-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <h3 className="font-bold text-white text-base">
                  Simulated Generative Answer Box
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider bg-brand-500/15 text-brand-400 border border-brand-500/20">
                LLM Synthesis Preview
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-950/80 border border-surface-750 text-slate-200 text-sm leading-relaxed font-sans">
              <p>{auditResult.simulatedAiOverview}</p>
            </div>

            {/* Simulated Citation Sources */}
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                Attributed Citation Links in Carousel:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {auditResult.citationLinks.map((link, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      link.isUserDomain
                        ? 'bg-brand-500/10 border-brand-500/40 text-brand-300'
                        : 'bg-surface-800 border-surface-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold truncate">{link.domain}</span>
                      {link.isUserDomain && (
                        <span className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                          Your Site
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 truncate text-[11px]">{link.title}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                      <span>Relevance:</span>
                      <span className="font-bold text-slate-300">{link.relevanceScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Semantic Entities & Action Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missing Semantic Entities */}
            <div className="card-surface p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-base">
                  Missing Semantic Entities
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Competitor articles cited in AI Overviews consistently contain these concepts. Your page currently lacks:
              </p>
              <div className="flex flex-wrap gap-2">
                {auditResult.missingEntities.map((entity, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  >
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    {entity}
                  </span>
                ))}
              </div>

              {/* Schema Fixes */}
              <div className="pt-3 border-t border-surface-750 space-y-2">
                <span className="text-xs font-semibold uppercase text-slate-400 block">
                  Structured Data (Schema.org) Recommendations:
                </span>
                <div className="space-y-2">
                  {auditResult.schemaFixes.map((sf, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-surface-800 border border-surface-700 text-xs">
                      <span className="font-bold text-brand-400">[{sf.type}]</span>{' '}
                      <span className="text-slate-300">{sf.recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Content Recommendations */}
            <div className="card-surface p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">
                    Action Plan to Win Citation
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  {auditResult.actionableRecommendations.length} priorities
                </span>
              </div>

              <div className="space-y-3">
                {auditResult.actionableRecommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-800 border border-surface-700/80 space-y-1.5 group hover:border-surface-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          rec.priority === 'High'
                            ? 'bg-red-500/20 text-red-300'
                            : rec.priority === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {rec.priority} Priority
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {rec.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(`${rec.title}: ${rec.detail}`, idx)}
                        title="Copy recommendation"
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-surface-700 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="sr-only">Copy recommendation</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {rec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
