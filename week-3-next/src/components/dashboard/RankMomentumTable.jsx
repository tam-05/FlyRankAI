/**
 * RankMomentumTable — Server Component
 * Shows the top keyword rank movements on the dashboard.
 */
const SAMPLE_ROWS = [
  { keyword: 'ai search engine optimization platform', url: 'flyrank.ai/platform', rank: 2, prev: 5, engine: 'Google', ai: 'Won', volume: '18.4K' },
  { keyword: 'how to track google ai overview rankings', url: 'flyrank.ai/blog/track-ai-overviews', rank: 1, prev: 1, engine: 'Google', ai: 'Won', volume: '12.1K' },
  { keyword: 'generative engine optimization audit', url: 'flyrank.ai/geo-audit', rank: 3, prev: 7, engine: 'Google', ai: 'Won', volume: '14.8K' },
  { keyword: 'enterprise serp rank tracker software', url: 'flyrank.ai/enterprise', rank: 4, prev: 2, engine: 'Bing', ai: 'Cited', volume: '9.6K' },
  { keyword: 'perplexity search citation monitoring', url: 'flyrank.ai/perplexity-citations', rank: 6, prev: 6, engine: 'Perplexity', ai: 'Cited', volume: '6.2K' },
];

function RankChange({ current, previous }) {
  if (current < previous) {
    const diff = previous - current;
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
        ▲ +{diff}
      </span>
    );
  }
  if (current > previous) {
    const diff = current - previous;
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded-md">
        ▼ −{diff}
      </span>
    );
  }
  return <span className="text-xs text-slate-500">— 0</span>;
}

function AiBadge({ status }) {
  if (status === 'Won')
    return <span className="badge-success text-2xs">★ Won</span>;
  if (status === 'Cited')
    return <span className="badge-info text-2xs">● Cited</span>;
  return <span className="badge-muted text-2xs">Absent</span>;
}

export default function RankMomentumTable() {
  return (
    <div className="page-card overflow-x-auto">
      <table className="w-full text-sm" aria-label="Top keyword rank movements">
        <thead>
          <tr className="border-b border-surface-700">
            <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-400">Keyword</th>
            <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-400">Engine</th>
            <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-400">Rank</th>
            <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-400">Change</th>
            <th className="text-left py-3 pr-4 text-xs font-semibold text-slate-400">AI Overview</th>
            <th className="text-right py-3 text-xs font-semibold text-slate-400">Volume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-700">
          {SAMPLE_ROWS.map((row) => (
            <tr key={row.keyword} className="hover:bg-surface-700/30 transition-colors">
              <td className="py-3 pr-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-slate-200">{row.keyword}</span>
                  <span className="text-xs text-slate-500 truncate max-w-[260px]">
                    {row.url}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="text-xs font-medium text-slate-400 bg-surface-700 px-2 py-0.5 rounded-md border border-surface-600">
                  {row.engine}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span
                  className={`inline-block min-w-[36px] text-center font-extrabold text-sm py-0.5 px-2 rounded-lg ${
                    row.rank <= 3
                      ? 'text-brand-400 bg-brand-500/15 border border-brand-500/25'
                      : 'text-slate-200 bg-surface-700'
                  }`}
                >
                  #{row.rank}
                </span>
              </td>
              <td className="py-3 pr-4">
                <RankChange current={row.rank} previous={row.prev} />
              </td>
              <td className="py-3 pr-4">
                <AiBadge status={row.ai} />
              </td>
              <td className="py-3 text-right font-mono text-xs text-slate-400">
                {row.volume}/mo
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
