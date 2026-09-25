import React from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import KeywordTable from './components/KeywordTable';
import AddKeywordModal from './components/AddKeywordModal';
import KeywordInspectorDrawer from './components/KeywordInspectorDrawer';
import { useKeywordTracker } from './hooks/useKeywordTracker';
import './App.css';

export default function App() {
  const {
    keywords,
    totalCount,
    metrics,
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
    selectedKeyword,
    setSelectedKeywordId,
    isAddModalOpen,
    setIsAddModalOpen,
    isRecrawlingAll,
    addKeyword,
    deleteKeyword,
    recrawlKeyword,
    recrawlAll,
    exportCsv,
  } = useKeywordTracker();

  return (
    <div className="flyrank-app">
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onRecrawlAll={recrawlAll}
        onExportCsv={exportCsv}
        isRecrawlingAll={isRecrawlingAll}
        totalKeywords={totalCount}
      />

      <main className="dashboard-container">
        {/* Executive Metrics Overview */}
        <MetricCards metrics={metrics} />

        {/* Tracked Keywords Table & Filters */}
        <KeywordTable
          keywords={keywords}
          totalCount={totalCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          intentFilter={intentFilter}
          setIntentFilter={setIntentFilter}
          aiStatusFilter={aiStatusFilter}
          setAiStatusFilter={setAiStatusFilter}
          trendFilter={trendFilter}
          setTrendFilter={setTrendFilter}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          onSelectKeyword={setSelectedKeywordId}
          onRecrawlKeyword={recrawlKeyword}
          onDeleteKeyword={deleteKeyword}
        />
      </main>

      {/* Add Keyword Modal Dialog */}
      <AddKeywordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddKeyword={addKeyword}
      />

      {/* Slide-over Keyword Analysis Drawer */}
      <KeywordInspectorDrawer
        keyword={selectedKeyword}
        onClose={() => setSelectedKeywordId(null)}
      />

      <footer className="dashboard-footer">
        <div className="footer-content">
          <span>FlyRankAI &bull; AI-Powered Search Visibility Intelligence</span>
          <span className="footer-meta">Autonomous Telemetry &bull; Week 3 Capstone Application</span>
        </div>
      </footer>
    </div>
  );
}
