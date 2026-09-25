import React, { useState } from 'react';
import SettingsFormVague from './round-1/SettingsFormVague';
import SettingsFormSpec from './round-2/SettingsFormSpec';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('round-2');

  return (
    <div className="app-container">
      <nav className="app-navbar" aria-label="Main Navigation">
        <div className="brand-wrapper">
          <span className="brand-logo">FlyRankAI</span>
          <span className="brand-badge">Week 2 AI Drill</span>
        </div>
        <div className="nav-tabs" role="tablist" aria-label="Form Iterations">
          <button
            role="tab"
            aria-selected={activeTab === 'round-1'}
            className={`tab-btn ${activeTab === 'round-1' ? 'active' : ''}`}
            onClick={() => setActiveTab('round-1')}
          >
            Round 1 (Vague)
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'round-2'}
            className={`tab-btn ${activeTab === 'round-2' ? 'active' : ''}`}
            onClick={() => setActiveTab('round-2')}
          >
            Round 2 (Spec + Verified)
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'comparison'}
            className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Comparison Matrix
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'round-1' && (
          <section aria-labelledby="r1-section">
            <SettingsFormVague />
          </section>
        )}

        {activeTab === 'round-2' && (
          <section aria-labelledby="r2-section">
            <SettingsFormSpec />
          </section>
        )}

        {activeTab === 'comparison' && (
          <section className="diff-comparison-card">
            <h2>Workflow & Quality Evaluation Matrix</h2>
            <p style={{ color: '#64748b' }}>
              Comparison between unconstrained single-shot prompting and spec-directed engineering with verification.
            </p>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Round 1: Vague Prompt</th>
                  <th>Round 2: Spec-Driven + Verification</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Correctness</strong></td>
                  <td>
                    <span className="pill-fail">Flawed</span> Accepts whitespace names, malformed domains (<code>http://</code>), and incomplete emails (<code>@</code>).
                  </td>
                  <td>
                    <span className="pill-pass">Robust</span> RFC 5322 regex email, URL/domain constructor validation, 3-50 char alphanumeric project names.
                  </td>
                </tr>
                <tr>
                  <td><strong>Accessibility (WCAG 2.1 AA)</strong></td>
                  <td>
                    <span className="pill-fail">Non-Compliant</span> Labels lack <code>htmlFor</code>, no <code>aria-invalid</code>, no <code>aria-describedby</code>, no <code>role="alert"</code>.
                  </td>
                  <td>
                    <span className="pill-pass">Compliant</span> Explicit <code>htmlFor</code>/<code>id</code>, dynamic <code>aria-invalid</code>, error focus trapping, <code>role="alert"</code>.
                  </td>
                </tr>
                <tr>
                  <td><strong>Edge Cases</strong></td>
                  <td>
                    <span className="pill-fail">Unhandled</span> Negative threshold (<code>-10</code>), pure whitespace (<code>"   "</code>), duplicate submits while processing.
                  </td>
                  <td>
                    <span className="pill-pass">Protected</span> Sanitizing trims, bounded integers [1-100], submit loading lock, live error dismissal.
                  </td>
                </tr>
                <tr>
                  <td><strong>Verification & Tests</strong></td>
                  <td>
                    <span className="pill-fail">Zero Tests</span> 0 automated tests, manual testing required to spot silent validation failures.
                  </td>
                  <td>
                    <span className="pill-pass">22 Vitest Tests</span> 100% pass rate covering units, edge cases, a11y attributes, and form resets.
                  </td>
                </tr>
                <tr>
                  <td><strong>Review & Fixing Effort</strong></td>
                  <td>
                    <strong>High (45 mins)</strong> Prompt took 5s, but manual code review, fixing edge cases, and adding a11y took substantial manual debugging.
                  </td>
                  <td>
                    <strong>Low (10 mins)</strong> Prompt took 5 mins to specify, code was delivered correct and tested on first run.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
      </main>

      <footer className="app-footer">
        FlyRankAI Foundations &bull; Directed AI Workflow Drill
      </footer>
    </div>
  );
}
