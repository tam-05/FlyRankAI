'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    section: 'Core',
    links: [
      { href: '/',            label: 'Dashboard',     icon: 'chart' },
      { href: '/keywords',    label: 'Keywords',      icon: 'search' },
      { href: '/ai-overviews',label: 'AI Overviews',  icon: 'sparkle' },
    ],
  },
  {
    section: 'Intelligence',
    links: [
      { href: '/competitors', label: 'Competitors',   icon: 'users' },
      { href: '/reports',     label: 'Reports',       icon: 'file' },
      { href: '/alerts',      label: 'Alerts',        icon: 'bell' },
    ],
  },
  {
    section: 'System',
    links: [
      { href: '/settings',    label: 'Settings',      icon: 'cog' },
      { href: '/health',      label: 'Health Check',  icon: 'heart' },
    ],
  },
];

/* Inline SVG icons – avoids an external icon dependency */
function NavIcon({ name }) {
  const cls = 'w-[18px] h-[18px] flex-shrink-0';
  switch (name) {
    case 'chart':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    case 'search':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case 'users':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'file':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 'bell':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'cog':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Sidebar — Client Component (needs usePathname for active-link highlighting).
 * All navigation items are defined statically; no data fetching here.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col w-64 border-r border-surface-700
                 bg-surface-800 h-screen overflow-y-auto thin-scrollbar"
      aria-label="Main navigation"
    >
      {/* Brand header */}
      <div className="px-5 py-5 border-b border-surface-700">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400
                        flex items-center justify-center shadow-glow-brand
                        group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-base text-white tracking-tight">
              FlyRankAI
            </span>
            <span className="ml-1.5 text-2xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/15 px-1.5 py-0.5 rounded-full border border-brand-500/20">
              v2.4
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="px-3 mb-2 text-2xs font-bold uppercase tracking-widest text-slate-500">
              {section.section}
            </p>
            <ul className="space-y-1" role="list">
              {section.links.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <NavIcon name={link.icon} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-surface-700">
        <p className="text-2xs text-slate-500">
          © 2026 FlyRankAI · Week 3 Capstone
        </p>
      </div>
    </aside>
  );
}
