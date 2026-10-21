/**
 * MetricCardGrid — Server Component
 * Renders executive KPI cards on the dashboard.
 * Uses static data (no client-side state).
 */
const METRICS = [
  {
    label: 'Tracked Keywords',
    value: '7',
    detail: 'Active SERP audit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: 'brand',
  },
  {
    label: 'Average Rank',
    value: '#5.3',
    detail: 'Across Google, Bing & Perplexity',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    color: 'emerald',
    badge: { label: '↑ Top 5 Target', variant: 'success' },
  },
  {
    label: 'AI Overview Win Rate',
    value: '43%',
    detail: 'Featured in Gemini / SGE snippets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    color: 'purple',
    badge: { label: 'Citation Leader', variant: 'info' },
  },
  {
    label: 'Rank Momentum',
    value: '+4 / −2',
    detail: '73,600 aggregate monthly volume',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    color: 'amber',
  },
];

const colorMap = {
  brand:   'bg-brand-500/15 text-brand-400',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  purple:  'bg-purple-500/15 text-purple-400',
  amber:   'bg-amber-500/15 text-amber-400',
};

export default function MetricCardGrid() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      aria-label="Executive Performance KPIs"
    >
      {METRICS.map((m) => (
        <div key={m.label} className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">{m.label}</span>
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[m.color]}`}
              aria-hidden="true"
            >
              {m.icon}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {m.value}
            </span>
            {m.badge && (
              <span className={`badge text-2xs badge-${m.badge.variant}`}>
                {m.badge.label}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">{m.detail}</p>
        </div>
      ))}
    </section>
  );
}
