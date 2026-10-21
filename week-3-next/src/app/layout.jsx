import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export const metadata = {
  title: {
    default: 'FlyRankAI — SERP & AI Search Visibility',
    template: '%s | FlyRankAI',
  },
  description:
    'Enterprise-grade SERP telemetry, Generative Engine Optimization (GEO), and Google AI Overview citation intelligence.',
  keywords: ['seo', 'rank tracking', 'ai overviews', 'generative search', 'geo'],
  authors: [{ name: 'Tamanna Das' }],
  openGraph: {
    title: 'FlyRankAI — SERP & AI Search Visibility',
    description: 'Track organic rankings and AI Overview citations at enterprise scale.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex h-screen overflow-hidden bg-surface-900 antialiased">
        {/* Accessibility: skip navigation link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Sidebar — Server Component (no interactivity at this level) */}
        <Sidebar />

        {/* Right pane */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <TopBar />

          {/* Page content */}
          <main
            id="main-content"
            className="flex-1 overflow-y-auto thin-scrollbar p-5 lg:p-8"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
