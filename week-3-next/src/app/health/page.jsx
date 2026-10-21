import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Health Check',
};

/**
 * Health Check (/health) — Server Component
 *
 * Fetches live data from the JSONPlaceholder API at render time
 * (no client JS required). This proves server-side data fetching
 * works in this deployment.
 *
 * Cache is explicitly set to 'no-store' so each visit fetches fresh data,
 * demonstrating the data pipeline is live and not statically generated.
 */
async function fetchHealthData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_HEALTH_API_URL || 'https://jsonplaceholder.typicode.com';

  const [todosRes, postsRes] = await Promise.all([
    fetch(`${baseUrl}/todos?_limit=5`, { cache: 'no-store' }),
    fetch(`${baseUrl}/posts?_limit=3`, { cache: 'no-store' }),
  ]);

  if (!todosRes.ok || !postsRes.ok) {
    throw new Error('Health check API request failed');
  }

  const todos = await todosRes.json();
  const posts = await postsRes.json();

  return { todos, posts, fetchedAt: new Date().toISOString() };
}

export default async function HealthPage() {
  let data = null;
  let error = null;

  try {
    data = await fetchHealthData();
  } catch (err) {
    error = err.message;
  }

  const statusOk = data !== null && !error;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="System Health Check"
        description="Verifies that the deployment is live, server-side data fetching is operational, and environment variables are correctly configured."
        badge={{ label: statusOk ? 'Healthy' : 'Degraded', variant: statusOk ? 'success' : 'danger' }}
      />

      {/* ── Status Banner ── */}
      <div
        role="status"
        aria-live="polite"
        className={`flex items-center gap-3 rounded-2xl border p-5 ${
          statusOk
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'border-red-500/30 bg-red-500/10 text-red-300'
        }`}
      >
        <span className="text-2xl" aria-hidden="true">
          {statusOk ? '✅' : '❌'}
        </span>
        <div>
          <p className="font-semibold">
            {statusOk
              ? 'All systems operational — server-side fetch succeeded'
              : `System degraded — ${error}`}
          </p>
          {data && (
            <p className="text-sm opacity-75 mt-0.5">
              Fetched at: <code className="font-mono">{data.fetchedAt}</code>
            </p>
          )}
        </div>
      </div>

      {/* ── Environment Variables ── */}
      <section className="page-card space-y-4">
        <h2 className="text-base font-semibold text-slate-200">
          Environment Variable Structure
        </h2>
        <p className="text-sm text-slate-400">
          Public variables prefixed with <code className="text-brand-400 font-mono text-xs">NEXT_PUBLIC_</code> are exposed to the browser.
          Server-only variables (no prefix) remain secret and are never serialised to client bundles.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-700">
                <th className="text-left py-2 pr-6 text-slate-400 font-medium">Variable</th>
                <th className="text-left py-2 pr-6 text-slate-400 font-medium">Scope</th>
                <th className="text-left py-2 text-slate-400 font-medium">Value (resolved)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {[
                {
                  key: 'NEXT_PUBLIC_APP_NAME',
                  scope: 'Public',
                  value: process.env.NEXT_PUBLIC_APP_NAME || '(not set)',
                },
                {
                  key: 'NEXT_PUBLIC_APP_VERSION',
                  scope: 'Public',
                  value: process.env.NEXT_PUBLIC_APP_VERSION || '(not set)',
                },
                {
                  key: 'NEXT_PUBLIC_HEALTH_API_URL',
                  scope: 'Public',
                  value: process.env.NEXT_PUBLIC_HEALTH_API_URL || '(not set)',
                },
                {
                  key: 'FLYRANK_API_KEY',
                  scope: 'Server-only',
                  value: process.env.FLYRANK_API_KEY ? '✓ Set (hidden)' : '(not set — add in Vercel)',
                },
              ].map(({ key, scope, value }) => (
                <tr key={key} className="hover:bg-surface-700/30 transition-colors">
                  <td className="py-3 pr-6">
                    <code className="text-brand-400 font-mono text-xs">{key}</code>
                  </td>
                  <td className="py-3 pr-6">
                    <span
                      className={`badge text-2xs ${
                        scope === 'Public' ? 'badge-info' : 'badge-warning'
                      }`}
                    >
                      {scope}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300 font-mono text-xs">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Live API Data (Server-fetched) ── */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Todos */}
          <section className="page-card space-y-4">
            <h2 className="text-base font-semibold text-slate-200">
              Server-Fetched Data Sample
              <span className="ml-2 badge badge-success">Live API</span>
            </h2>
            <p className="text-sm text-slate-400">
              Fetched from{' '}
              <code className="text-brand-400 font-mono text-xs">
                {process.env.NEXT_PUBLIC_HEALTH_API_URL}/todos
              </code>{' '}
              at request time — no client JavaScript required.
            </p>
            <ul className="space-y-2">
              {data.todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl bg-surface-700/50 px-4 py-3"
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-2xs ${
                      todo.completed
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-surface-500'
                    }`}
                  >
                    {todo.completed && '✓'}
                  </span>
                  <span className="text-sm text-slate-300">{todo.title}</span>
                  <span className="ml-auto text-2xs font-mono text-slate-500">#{todo.id}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Posts */}
          <section className="page-card space-y-4">
            <h2 className="text-base font-semibold text-slate-200">
              Additional API Endpoint
              <span className="ml-2 badge badge-info">Live</span>
            </h2>
            <p className="text-sm text-slate-400">
              Parallel fetch from{' '}
              <code className="text-brand-400 font-mono text-xs">
                {process.env.NEXT_PUBLIC_HEALTH_API_URL}/posts
              </code>
            </p>
            <div className="space-y-3">
              {data.posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl bg-surface-700/50 px-4 py-3 space-y-1"
                >
                  <p className="text-sm font-medium text-slate-200 capitalize line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
