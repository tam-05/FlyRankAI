import React from 'react';

export default function Header({
  onOpenAddModal,
  onRecrawlAll,
  onExportCsv,
  isRecrawlingAll,
  totalKeywords,
}) {
  return (
    <header className="app-header">
      <div className="header-brand-section">
        <div className="brand-logo-group">
          <div className="brand-symbol" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">FlyRankAI</h1>
              <span className="version-pill">v2.4 Live</span>
            </div>
            <p className="brand-subtitle">
              SERP Telemetry &amp; Generative AI Overview Visibility Intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={onRecrawlAll}
          disabled={isRecrawlingAll || totalKeywords === 0}
          aria-label="Refresh and recrawl all tracked keywords"
        >
          <svg
            className={`btn-icon ${isRecrawlingAll ? 'spin' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          {isRecrawlingAll ? 'Recrawling SERP...' : 'Recrawl All'}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={onExportCsv}
          disabled={totalKeywords === 0}
          aria-label="Export filtered keywords to CSV"
        >
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export CSV
        </button>

        <button
          type="button"
          className="btn btn-primary-accent"
          onClick={onOpenAddModal}
          aria-label="Add new tracked keyword"
        >
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Keyword
        </button>
      </div>
    </header>
  );
}
