'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * TopBar — Client Component (responsive mobile menu toggle).
 * On desktop it shows a breadcrumb; on mobile it provides the hamburger nav.
 */
export default function TopBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive page title from pathname
  const segments = pathname.split('/').filter(Boolean);
  const pageTitle =
    segments.length === 0
      ? 'Dashboard'
      : segments[segments.length - 1]
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

  const mobileLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/keywords', label: 'Keywords' },
    { href: '/ai-overviews', label: 'AI Overviews' },
    { href: '/competitors', label: 'Competitors' },
    { href: '/reports', label: 'Reports' },
    { href: '/alerts', label: 'Alerts' },
    { href: '/settings', label: 'Settings' },
    { href: '/health', label: 'Health Check' },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-5 lg:px-8 h-14 border-b border-surface-700 bg-surface-800/80 backdrop-blur-sm">
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-700 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-slate-300 transition-colors">
            FlyRankAI
          </Link>
          {segments.map((seg, i) => (
            <span key={seg} className="flex items-center gap-2">
              <span className="text-slate-600">/</span>
              {i === segments.length - 1 ? (
                <span className="text-slate-200 font-medium capitalize">
                  {seg.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link
                  href={`/${segments.slice(0, i + 1).join('/')}`}
                  className="text-slate-400 hover:text-slate-200 capitalize transition-colors"
                >
                  {seg.replace(/-/g, ' ')}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Mobile title */}
        <span className="lg:hidden font-semibold text-sm text-slate-200">{pageTitle}</span>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex badge badge-success text-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <nav
          className="lg:hidden border-b border-surface-700 bg-surface-800 px-4 py-3 space-y-1"
          aria-label="Mobile navigation"
        >
          {mobileLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-surface-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
