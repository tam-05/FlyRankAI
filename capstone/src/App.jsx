import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { OverviewSection } from './components/OverviewSection';
import { GeoAuditSection } from './components/GeoAuditSection';
import { KeywordPortfolio } from './components/KeywordPortfolio';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { AddKeywordModal } from './components/AddKeywordModal';
import { SettingsModal } from './components/SettingsModal';
import { KeywordDetailDrawer } from './components/KeywordDetailDrawer';
import { Toast } from './components/Toast';
import { usePortfolio } from './hooks/usePortfolio';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // High contrast mode (WCAG AAA toggle)
  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem('flyrankai_high_contrast') === 'true';
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('flyrankai_anthropic_api_key') || '';
  });

  const portfolio = usePortfolio();

  const handleToggleHighContrast = () => {
    setIsHighContrast(prev => {
      const next = !prev;
      localStorage.setItem('flyrankai_high_contrast', String(next));
      return next;
    });
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('flyrankai_anthropic_api_key', key);
  };

  const handleNotify = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className={`min-h-screen bg-surface-950 text-slate-100 flex flex-col font-sans ${isHighContrast ? 'contrast-125' : ''}`}>
      {/* WCAG 2.4.1: Skip to main content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Global Header */}
      <Header
        metrics={portfolio.metrics}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={handleToggleHighContrast}
      />

      {/* Primary Accessible Navigation Bar */}
      <NavigationTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main View Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none" tabIndex={-1}>
        {activeTab === 'overview' && (
          <OverviewSection
            metrics={portfolio.metrics}
            keywords={portfolio.keywords}
            onSelectKeyword={setSelectedKeyword}
            onGoToAudit={() => setActiveTab('geo-audit')}
          />
        )}

        {activeTab === 'geo-audit' && (
          <GeoAuditSection apiKey={apiKey} />
        )}

        {activeTab === 'portfolio' && (
          <KeywordPortfolio
            keywords={portfolio.filteredKeywords}
            searchQuery={portfolio.searchQuery}
            setSearchQuery={portfolio.setSearchQuery}
            intentFilter={portfolio.intentFilter}
            setIntentFilter={portfolio.setIntentFilter}
            statusFilter={portfolio.statusFilter}
            setStatusFilter={portfolio.setStatusFilter}
            sortField={portfolio.sortField}
            sortDirection={portfolio.sortDirection}
            toggleSort={portfolio.toggleSort}
            onSelectKeyword={setSelectedKeyword}
            onDeleteKeyword={portfolio.deleteKeyword}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'competitors' && (
          <CompetitorMatrix />
        )}

        {activeTab === 'diagnostics' && (
          <SystemDiagnostics apiKey={apiKey} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-850 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 FlyRankAI Capstone Project · Developed by Tamanna Das</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>Claude 3.5 LLM Architecture</span>
            <span>•</span>
            <span>Deployed on Vercel</span>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-over Drawers */}
      <AddKeywordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddKeyword={portfolio.addKeyword}
        onNotify={handleNotify}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        onResetPortfolio={portfolio.resetToDefaults}
        isHighContrast={isHighContrast}
        onToggleHighContrast={handleToggleHighContrast}
        onNotify={handleNotify}
      />

      <KeywordDetailDrawer
        keyword={selectedKeyword}
        onClose={() => setSelectedKeyword(null)}
      />

      {/* Live Feedback Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
