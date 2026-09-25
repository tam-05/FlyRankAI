import React from 'react';

export default function MetricCards({ metrics }) {
  const { total, avgRank, aiWinRate, gainedCount, droppedCount, totalVolume } = metrics;

  return (
    <section className="metric-cards-grid" aria-label="Executive Performance KPIs">
      {/* Total Keywords */}
      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-label">Tracked Keywords</span>
          <span className="metric-icon-bubble bubble-blue" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{total}</span>
          <span className="metric-delta delta-neutral">Active Audit</span>
        </div>
        <div className="metric-footer-note">Continuous SERP crawl frequency</div>
      </div>

      {/* Average Rank */}
      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-label">Average Rank</span>
          <span className="metric-icon-bubble bubble-emerald" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </span>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">#{avgRank}</span>
          <span className="metric-delta delta-positive">
            <span aria-hidden="true">↑</span> Top 5 Target
          </span>
        </div>
        <div className="metric-footer-note">Across Google, Bing &amp; Perplexity</div>
      </div>

      {/* AI Overview Win Rate */}
      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-label">AI Overview Win Rate</span>
          <span className="metric-icon-bubble bubble-purple" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </span>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{aiWinRate}%</span>
          <span className={`metric-delta ${aiWinRate >= 40 ? 'delta-positive' : 'delta-neutral'}`}>
            Citation Leader
          </span>
        </div>
        <div className="metric-footer-note">Featured in Gemini / SGE answer snippets</div>
      </div>

      {/* Rank Movement Trend */}
      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-label">Rank Momentum</span>
          <span className="metric-icon-bubble bubble-amber" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </span>
        </div>
        <div className="metric-value-row">
          <div className="momentum-split">
            <span className="momentum-pill gain-pill">+{gainedCount} Gained</span>
            <span className="momentum-pill drop-pill">-{droppedCount} Dropped</span>
          </div>
        </div>
        <div className="metric-footer-note">
          {(totalVolume).toLocaleString()} aggregate monthly volume
        </div>
      </div>
    </section>
  );
}
