import React from 'react';
import { COMPETITOR_DATA } from '../data/mockKeywords';
import { BarChart3, Globe, Award, TrendingUp } from 'lucide-react';

export function CompetitorMatrix() {
  return (
    <div className="space-y-8 animate-fade-in" id="panel-competitors" role="tabpanel" aria-labelledby="tab-competitors">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-brand-500/10 text-brand-400">
            <BarChart3 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Market Intelligence
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Competitor AI Citation Share Benchmark
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Breakdown of domain attribution frequencies across tracked Google AI Overviews and generative search results.
        </p>
      </div>

      {/* Visual Share Bar */}
      <div className="card-surface p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200">
          Aggregate Generative Citation Share Distribution
        </h3>

        {/* Multi-segment progress bar */}
        <div className="h-6 w-full rounded-xl overflow-hidden flex bg-surface-800 border border-surface-700" role="progressbar" aria-label="Competitor Citation Share">
          {COMPETITOR_DATA.map((c) => (
            <div
              key={c.domain}
              style={{ width: `${c.citationShare}%`, backgroundColor: c.color }}
              title={`${c.domain}: ${c.citationShare}%`}
              className="h-full transition-all duration-500 hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-slate-950 overflow-hidden"
            >
              {c.citationShare >= 15 ? `${c.citationShare}%` : ''}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2 text-xs">
          {COMPETITOR_DATA.map((c) => (
            <div key={c.domain} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} aria-hidden="true" />
              <span className="font-semibold text-slate-200">{c.domain}</span>
              <span className="text-slate-500">({c.citationShare}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Table */}
      <div className="card-surface overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm" aria-label="Competitor Citation Share Table">
          <thead className="bg-surface-850/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-surface-750">
            <tr>
              <th scope="col" className="py-3.5 px-6">Domain</th>
              <th scope="col" className="py-3.5 px-4">Citations Won</th>
              <th scope="col" className="py-3.5 px-4">Citation Share</th>
              <th scope="col" className="py-3.5 px-4">Avg SERP Rank</th>
              <th scope="col" className="py-3.5 px-6 text-right">Market Position</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800 text-slate-200">
            {COMPETITOR_DATA.map((comp, idx) => (
              <tr key={comp.domain} className="hover:bg-surface-850/60 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-slate-950"
                      style={{ backgroundColor: comp.color }}
                      aria-hidden="true"
                    >
                      {comp.domain.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-white">{comp.domain}</span>
                      {idx === 0 && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300">
                          Your Brand
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-bold text-white">
                  {comp.citationsWon}
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{comp.citationShare}%</span>
                    <div className="w-16 h-1.5 rounded-full bg-surface-800 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${comp.citationShare}%`, backgroundColor: comp.color }} />
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-mono">
                  #{comp.avgPosition}
                </td>

                <td className="py-4 px-6 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    idx === 0
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-surface-800 text-slate-400'
                  }`}>
                    {idx === 0 ? 'Citation Leader' : `Rank #${idx + 1}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
