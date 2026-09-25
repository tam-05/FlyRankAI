import React, { useEffect } from 'react';

export default function KeywordInspectorDrawer({ keyword, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (keyword) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyword, onClose]);

  if (!keyword) return null;

  // Chart computation for 7-day rank trajectory
  // Lower rank is better (top of chart = #1, bottom = #20)
  const history = keyword.rankHistory || [10, 8, 7, 5, 5, 4, keyword.currentRank];
  const minRank = Math.min(...history);
  const maxRank = Math.max(...history, 15);
  const chartHeight = 120;
  const chartWidth = 340;
  const padding = 20;

  // Compute SVG coordinates: y is inverted because #1 is top
  const points = history.map((val, idx) => {
    const x = padding + (idx / (history.length - 1)) * (chartWidth - padding * 2);
    // Normalized y: minRank is near padding, maxRank is near chartHeight - padding
    const yRange = maxRank - minRank || 1;
    const y = padding + ((val - minRank) / yRange) * (chartHeight - padding * 2);
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside
        className="drawer-card"
        role="dialog"
        aria-label={`Detailed analysis for ${keyword.keyword}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <div className="drawer-badges">
              <span className="drawer-engine">{keyword.searchEngine}</span>
              <span className="drawer-intent">{keyword.intent}</span>
            </div>
            <h2 className="drawer-title">{keyword.keyword}</h2>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close details inspector"
          >
            ×
          </button>
        </div>

        <div className="drawer-body">
          {/* Main KPI Bar */}
          <div className="drawer-kpi-bar">
            <div className="drawer-kpi">
              <span className="kpi-label">Current Position</span>
              <span className="kpi-number">#{keyword.currentRank}</span>
            </div>
            <div className="drawer-kpi">
              <span className="kpi-label">AI Overview</span>
              <span className={`kpi-status status-${keyword.aiOverviewStatus.toLowerCase()}`}>
                {keyword.aiOverviewStatus}
              </span>
            </div>
            <div className="drawer-kpi">
              <span className="kpi-label">Search Volume</span>
              <span className="kpi-number">{(keyword.searchVolume).toLocaleString()}</span>
            </div>
          </div>

          {/* 7-Day Trajectory Area Chart */}
          <section className="drawer-section">
            <h3 className="section-title">7-Day SERP Rank Trajectory</h3>
            <p className="section-subtitle">Visualizes daily organic position movement (top = rank #1)</p>
            <div className="chart-container">
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="trajectory-svg">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#areaGradient)" />
                <path d={pathD} fill="none" stroke="#0284c7" strokeWidth="2.5" />
                {points.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={pt.x} y={pt.y - 8} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">
                      #{pt.val}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="chart-axis-labels">
                <span>7 Days Ago</span>
                <span>3 Days Ago</span>
                <span>Today</span>
              </div>
            </div>
          </section>

          {/* AI Overview Analysis */}
          <section className="drawer-section">
            <h3 className="section-title">Google AI Overview Snapshot</h3>
            {keyword.aiOverviewStatus === 'Absent' ? (
              <div className="ai-absent-notice">
                <p>
                  No AI Overview or SGE snippet currently appears for this query. FlyRankAI checks every 6 hours for generative answer emergence.
                </p>
              </div>
            ) : (
              <div className="ai-snippet-card">
                <div className="ai-snippet-header">
                  <span className="ai-gemini-icon" aria-hidden="true">✦</span>
                  <strong>Generative Answer Snippet</strong>
                </div>
                <p className="ai-snippet-text">"{keyword.aiSnippet}"</p>

                {keyword.citations && keyword.citations.length > 0 && (
                  <div className="ai-citations-list">
                    <span className="citations-label">Source Citations Detected:</span>
                    <ul>
                      {keyword.citations.map((cite, idx) => (
                        <li key={idx}>
                          <a href={cite} target="_blank" rel="noreferrer" className="citation-link">
                            {cite.replace(/^https?:\/\//, '')}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Audit Metadata */}
          <section className="drawer-section">
            <h3 className="section-title">Audit Metadata</h3>
            <div className="meta-grid">
              <div className="meta-pair">
                <span className="meta-k">Target Landing URL</span>
                <span className="meta-v">
                  <a href={keyword.targetUrl} target="_blank" rel="noreferrer">
                    {keyword.targetUrl}
                  </a>
                </span>
              </div>
              <div className="meta-pair">
                <span className="meta-k">Last Crawl Timestamp</span>
                <span className="meta-v">{new Date(keyword.lastCrawled).toLocaleString()}</span>
              </div>
              <div className="meta-pair">
                <span className="meta-k">Drop Alert Sensitivity</span>
                <span className="meta-v">Alert if drops by &ge; {keyword.alertThreshold} ranks</span>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
