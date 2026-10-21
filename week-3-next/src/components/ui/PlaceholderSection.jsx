/**
 * PlaceholderSection — Server Component
 * Displays a "coming soon" card for pages that will be built in later phases.
 * Lists the planned screens/features so reviewers can see the full spec.
 */
export default function PlaceholderSection({ title, description, screens }) {
  return (
    <div className="page-card space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Planned features checklist */}
      {screens && screens.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            Planned Screens & Features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2" role="list">
            {screens.map((screen, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-surface-700/40 px-4 py-3 border border-surface-700"
              >
                <span
                  className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 border-surface-500
                             flex items-center justify-center text-2xs text-slate-500"
                >
                  {i + 1}
                </span>
                <span className="text-sm text-slate-300">{screen}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Visual placeholder */}
      <div className="rounded-2xl border-2 border-dashed border-surface-600 py-16 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-surface-700 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-500">
          Component will be built in a later phase
        </p>
        <p className="text-xs text-slate-600">
          This placeholder confirms the route exists and will load without errors.
        </p>
      </div>
    </div>
  );
}
