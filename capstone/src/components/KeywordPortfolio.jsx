import React from 'react';
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ExternalLink,
  Trash2,
  Eye,
  CheckCircle,
} from 'lucide-react';

export function KeywordPortfolio({
  keywords,
  searchQuery,
  setSearchQuery,
  intentFilter,
  setIntentFilter,
  statusFilter,
  setStatusFilter,
  sortField,
  sortDirection,
  toggleSort,
  onSelectKeyword,
  onDeleteKeyword,
  onNotify,
}) {
  const exportCsv = () => {
    if (keywords.length === 0) return;

    const headers = [
      'Keyword',
      'Target URL',
      'Search Engine',
      'Search Intent',
      'Current Rank',
      'Previous Rank',
      'Monthly Volume',
      'AI Overview Status',
      'AI Citation Share (%)',
    ];

    const rows = keywords.map(k => [
      `"${k.keyword.replace(/"/g, '""')}"`,
      `"${k.url}"`,
      k.searchEngine,
      k.intent,
      k.currentRank,
      k.previousRank,
      k.volume,
      k.aiOverviewStatus,
      k.aiCitationShare,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `flyrankai-serp-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onNotify?.('CSV export downloaded successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in" id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio">
      {/* Controls Bar */}
      <div className="card-surface p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords or URLs..."
            aria-label="Filter keywords by query or URL"
            className="w-full pl-10 pr-4 py-2 bg-surface-800 border border-surface-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Intent */}
          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            aria-label="Filter by search intent"
            className="px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="All">All Intents</option>
            <option value="Commercial">Commercial</option>
            <option value="Informational">Informational</option>
            <option value="Transactional">Transactional</option>
          </select>

          {/* AI Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by AI overview status"
            className="px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="All">All AI Statuses</option>
            <option value="Won">Won (Primary)</option>
            <option value="Cited">Cited (Referenced)</option>
            <option value="Absent">Absent (None)</option>
          </select>

          {/* Export CSV */}
          <button
            type="button"
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-800 hover:bg-surface-750 text-slate-200 border border-surface-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm" aria-label="Tracked SERP Keywords Portfolio">
            <thead className="bg-surface-850/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-surface-750">
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-6">
                  <button
                    type="button"
                    onClick={() => toggleSort('keyword')}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span>Keyword & URL</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th scope="col" className="py-3.5 px-4 hidden md:table-cell">
                  Engine / Intent
                </th>
                <th scope="col" className="py-3.5 px-4">
                  <button
                    type="button"
                    onClick={() => toggleSort('currentRank')}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span>SERP Rank</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th scope="col" className="py-3.5 px-4">
                  AI Overview Status
                </th>
                <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">
                  <button
                    type="button"
                    onClick={() => toggleSort('volume')}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span>Volume</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800 text-slate-200">
              {keywords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No keywords match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                keywords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-surface-850/60 transition-colors group"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-white group-hover:text-brand-300 transition-colors">
                        {item.keyword}
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 mt-0.5 truncate max-w-xs"
                      >
                        <span className="truncate">{item.url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>

                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-300 font-medium">{item.searchEngine}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">{item.intent}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-white">#{item.currentRank}</span>
                        {item.currentRank < item.previousRank && (
                          <span className="text-2xs font-bold text-emerald-400">
                            ▲ +{item.previousRank - item.currentRank}
                          </span>
                        )}
                        {item.currentRank > item.previousRank && (
                          <span className="text-2xs font-bold text-red-400">
                            ▼ -{item.currentRank - item.previousRank}
                          </span>
                        )}
                        {item.currentRank === item.previousRank && (
                          <span className="text-2xs font-medium text-slate-500">— 0</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {item.aiOverviewStatus === 'Won' && (
                        <span className="badge-won">★ Won ({item.aiCitationShare}%)</span>
                      )}
                      {item.aiOverviewStatus === 'Cited' && (
                        <span className="badge-cited">● Cited ({item.aiCitationShare}%)</span>
                      )}
                      {item.aiOverviewStatus === 'Absent' && (
                        <span className="badge-absent">Absent</span>
                      )}
                    </td>

                    <td className="py-4 px-4 hidden sm:table-cell font-mono text-xs text-slate-400">
                      {(item.volume).toLocaleString()}/mo
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectKeyword(item)}
                          title="Inspect AI citation & trajectory chart"
                          aria-label={`Inspect ${item.keyword}`}
                          className="p-1.5 rounded-lg bg-surface-800 hover:bg-brand-500/20 hover:text-brand-300 text-slate-400 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteKeyword(item.id)}
                          title="Delete keyword"
                          aria-label={`Delete ${item.keyword}`}
                          className="p-1.5 rounded-lg bg-surface-800 hover:bg-red-500/20 hover:text-red-300 text-slate-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
