/**
 * PageHeader — Server Component
 * Renders the title, description, optional badge, and optional action buttons
 * at the top of every page.
 */
export default function PageHeader({ title, description, badge, actions }) {
  const badgeClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger:  'badge-danger',
    info:    'badge-info',
    muted:   'badge-muted',
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className={badgeClasses[badge.variant] || 'badge-muted'}>
              {badge.label}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={action.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
