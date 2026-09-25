import React from 'react';
import { ALLOWED_INTENTS } from '../utils/validators';

export default function KeywordTable({
  keywords,
  totalCount,
  searchQuery,
  setSearchQuery,
  intentFilter,
  setIntentFilter,
  aiStatusFilter,
  setAiStatusFilter,
  trendFilter,
  setTrendFilter,
  sortField,
  sortDirection,
  toggleSort,
  onSelectKeyword,
  onRecrawlKeyword,
  onDeleteKeyword,
}) {
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <span className="sort-icon-inactive" aria-hidden="true">
          ↕
        </span>
      );
    }
    return (
      <span className="sort-icon-active" aria-hidden="true">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const renderRankChange = (current, previous) => {
    // In SEO ranks: lower number is better!
    // If current < previous: rank improved! (gained positions)
    if (current < previous) {
      const diff = previous - current;
      return (
        <span className="rank-change-pill change-gain" title={`Improved ${diff} positions`}>
          <span aria-hidden="true">▲</span> +{diff}
        </span>
      );
    }
    if (current > previous) {
      const diff = current - previous;
      return (
        <span className="rank-change-pill change-drop" title={`Dropped ${diff} positions`}>
          <span aria-hidden="true">▼</span> -{diff}
        </span>
      );
    }
    return <span className="rank-change-pill change-stable">— 0</span>;
  };

  const getIntentBadgeClass = (intent) => {
    switch (intent) {
      case 'Informational':
        return 'intent-badge intent-info';
      case 'Commercial':
        return 'intent-badge intent-comm';
      case 'Transactional':
        return 'intent-badge intent-trans';
      case 'Navigational':
        return 'intent-badge intent-nav';
      default:
        return 'intent-badge';
    }
  };

  const getAiBadge = (status) => {
    if (status === 'Won') {
      return (
        <span className="ai-status-badge ai-won">
          <span className="sparkle-dot" aria-hidden="true">★</span> Won Snippet
        </span>
      );
    }
    if (status === 'Cited') {
      return (
        <span className="ai-status-badge ai-cited">
          <span className="sparkle-dot" aria-hidden="true">●</span> Cited Source
        </span>
      );
    }
    return <span className="ai-status-badge ai-absent">Not In Overview</span>;
  };

  return (
    <section className="table-card" aria-label="Tracked Keywords Database">
      {/* Controls Bar */}
      <div className="table-controls-bar">
        <div className="search-box-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Filter keywords, landing URLs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search keywords or URLs"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ×
            </button>
          )}
        </div>

        <div className="filters-group">
          {/* Intent Filter */}
          <div className="filter-item">
            <label htmlFor="filter-intent" className="sr-only">
              Filter by Intent
            </label>
            <select
              id="filter-intent"
              className="filter-select"
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
            >
              <option value="ALL">All Intents</option>
              {ALLOWED_INTENTS.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </select>
          </div>

          {/* AI Overview Status Filter */}
          <div className="filter-item">
            <label htmlFor="filter-ai" className="sr-only">
              Filter by AI Overview Status
            </label>
            <select
              id="filter-ai"
              className="filter-select"
              value={aiStatusFilter}
              onChange={(e) => setAiStatusFilter(e.target.value)}
            >
              <option value="ALL">All AI Statuses</option>
              <option value="Won">AI Overview: Won</option>
              <option value="Cited">AI Overview: Cited</option>
              <option value="Absent">AI Overview: Absent</option>
            </select>
          </div>

          {/* Trend Filter */}
          <div className="filter-item">
            <label htmlFor="filter-trend" className="sr-only">
              Filter by Trend
            </label>
            <select
              id="filter-trend"
              className="filter-select"
              value={trendFilter}
              onChange={(e) => setTrendFilter(e.target.value)}
            >
              <option value="ALL">All Momentum</option>
              <option value="GAINED">↑ Gained Ranks</option>
              <option value="DROPPED">↓ Dropped Ranks</option>
              <option value="TOP3">★ Top 3 Only</option>
              <option value="TOP10">Top 10 Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="table-meta-row">
        <span className="results-count">
          Showing <strong>{keywords.length}</strong> of {totalCount} keywords
        </span>
        {(searchQuery || intentFilter !== 'ALL' || aiStatusFilter !== 'ALL' || trendFilter !== 'ALL') && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setIntentFilter('ALL');
              setAiStatusFilter('ALL');
              setTrendFilter('ALL');
            }}
          >
            Reset Active Filters
          </button>
        )}
      </div>

      {/* Table Element */}
      <div className="table-scroll-container">
        <table className="flyrank-table" aria-label="SERP Keywords">
          <thead>
            <tr>
              <th scope="col" onClick={() => toggleSort('keyword')} className="sortable-th">
                Keyword &amp; Target URL {getSortIcon('keyword')}
              </th>
              <th scope="col">Intent</th>
              <th scope="col">Engine</th>
              <th scope="col" onClick={() => toggleSort('rank')} className="sortable-th">
                Current Rank {getSortIcon('rank')}
              </th>
              <th scope="col" onClick={() => toggleSort('change')} className="sortable-th">
                Change {getSortIcon('change')}
              </th>
              <th scope="col">AI Overview</th>
              <th scope="col" onClick={() => toggleSort('volume')} className="sortable-th">
                Volume {getSortIcon('volume')}
              </th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keywords.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-state-cell">
                  <div className="empty-state-content">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <p className="empty-title">No matching keywords found</p>
                    <p className="empty-desc">Try clearing your search query or filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              keywords.map((item) => (
                <tr key={item.id} className="keyword-row">
                  <td>
                    <div className="keyword-cell">
                      <span className="keyword-name">{item.keyword}</span>
                      <a
                        href={item.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="keyword-url"
                        title={item.targetUrl}
                      >
                        {item.targetUrl.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </td>

                  <td>
                    <span className={getIntentBadgeClass(item.intent)}>{item.intent}</span>
                  </td>

                  <td>
                    <span className="engine-badge">{item.searchEngine}</span>
                  </td>

                  <td>
                    <span className={`rank-badge ${item.currentRank <= 3 ? 'rank-top3' : ''}`}>
                      #{item.currentRank}
                    </span>
                  </td>

                  <td>{renderRankChange(item.currentRank, item.previousRank)}</td>

                  <td>{getAiBadge(item.aiOverviewStatus)}</td>

                  <td>
                    <span className="volume-text">{(item.searchVolume).toLocaleString()}/mo</span>
                  </td>

                  <td className="text-right">
                    <div className="row-actions">
                      <button
                        type="button"
                        className="action-btn action-inspect"
                        onClick={() => onSelectKeyword(item.id)}
                        aria-label={`Inspect AI Overview and history for ${item.keyword}`}
                        title="Inspect AI Overview & History"
                      >
                        Inspect
                      </button>

                      <button
                        type="button"
                        className="action-btn action-recrawl"
                        onClick={() => onRecrawlKeyword(item.id)}
                        aria-label={`Recrawl SERP for ${item.keyword}`}
                        title="Recrawl Now"
                      >
                        ↻
                      </button>

                      <button
                        type="button"
                        className="action-btn action-delete"
                        onClick={() => onDeleteKeyword(item.id)}
                        aria-label={`Delete ${item.keyword}`}
                        title="Delete keyword"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
