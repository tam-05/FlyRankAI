import { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_KEYWORDS } from '../data/mockKeywords';

const STORAGE_KEY = 'flyrankai_capstone_portfolio_v1';

export function usePortfolio() {
  const [keywords, setKeywords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio from localStorage, using initial dataset:', e);
    }
    return INITIAL_KEYWORDS;
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
    } catch (e) {
      console.error('Failed to save portfolio to localStorage:', e);
    }
  }, [keywords]);

  // Filtering and Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('currentRank');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // Computed KPIs
  const metrics = useMemo(() => {
    const total = keywords.length;
    if (total === 0) {
      return { totalKeywords: 0, averageRank: '0.0', aiWonCount: 0, aiWinRate: 0, totalVolume: 0 };
    }

    const rankSum = keywords.reduce((acc, k) => acc + (Number(k.currentRank) || 0), 0);
    const avgRank = (rankSum / total).toFixed(1);

    const wonCount = keywords.filter(k => k.aiOverviewStatus === 'Won').length;
    const winRate = Math.round((wonCount / total) * 100);

    const volumeSum = keywords.reduce((acc, k) => acc + (Number(k.volume) || 0), 0);

    return {
      totalKeywords: total,
      averageRank: avgRank,
      aiWonCount: wonCount,
      aiWinRate: winRate,
      totalVolume: volumeSum,
    };
  }, [keywords]);

  // Filtered & Sorted Keywords
  const filteredKeywords = useMemo(() => {
    return keywords
      .filter(item => {
        const matchesQuery = !searchQuery ||
          item.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.url.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIntent = intentFilter === 'All' || item.intent === intentFilter;
        const matchesStatus = statusFilter === 'All' || item.aiOverviewStatus === statusFilter;
        return matchesQuery && matchesIntent && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [keywords, searchQuery, intentFilter, statusFilter, sortField, sortDirection]);

  const toggleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const addKeyword = useCallback((newRecord) => {
    const created = {
      id: `kw-${Date.now()}`,
      keyword: newRecord.keyword.trim(),
      url: newRecord.url.trim(),
      searchEngine: newRecord.searchEngine || 'Google',
      intent: newRecord.intent || 'Commercial',
      currentRank: Number(newRecord.currentRank) || 10,
      previousRank: Number(newRecord.currentRank) || 10,
      volume: Number(newRecord.volume) || 1200,
      aiOverviewStatus: newRecord.aiOverviewStatus || 'Cited',
      aiCitationShare: newRecord.aiOverviewStatus === 'Won' ? 80 : newRecord.aiOverviewStatus === 'Cited' ? 50 : 0,
      aiSummarySnippet: newRecord.aiSummarySnippet || 'Simulated AI Overview snippet pending next scheduled crawl.',
      history: [12, 11, 10, Number(newRecord.currentRank) || 10],
      lastCrawled: new Date().toISOString(),
    };

    setKeywords(prev => [created, ...prev]);
    return created;
  }, []);

  const deleteKeyword = useCallback((id) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setKeywords(INITIAL_KEYWORDS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    keywords,
    filteredKeywords,
    metrics,
    searchQuery,
    setSearchQuery,
    intentFilter,
    setIntentFilter,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    toggleSort,
    addKeyword,
    deleteKeyword,
    resetToDefaults,
  };
}
