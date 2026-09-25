import { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_KEYWORDS } from '../data/mockKeywords';

const STORAGE_KEY = 'flyrank_keywords_v1';

export function useKeywordTracker() {
  const [keywords, setKeywords] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage read errors and fall back to initial
    }
    return INITIAL_KEYWORDS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState('ALL');
  const [aiStatusFilter, setAiStatusFilter] = useState('ALL');
  const [trendFilter, setTrendFilter] = useState('ALL');
  const [sortField, setSortField] = useState('rank'); // 'rank' | 'change' | 'volume' | 'keyword'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [selectedKeywordId, setSelectedKeywordId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRecrawlingAll, setIsRecrawlingAll] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
    } catch (e) {
      console.error('Failed to sync keywords to localStorage', e);
    }
  }, [keywords]);

  // Executive metrics
  const metrics = useMemo(() => {
    const total = keywords.length;
    if (total === 0) {
      return {
        total: 0,
        avgRank: 0,
        aiWinRate: 0,
        gainedCount: 0,
        droppedCount: 0,
        totalVolume: 0,
      };
    }

    const rankSum = keywords.reduce((acc, k) => acc + k.currentRank, 0);
    const avgRank = (rankSum / total).toFixed(1);

    const wonCount = keywords.filter((k) => k.aiOverviewStatus === 'Won').length;
    const aiWinRate = Math.round((wonCount / total) * 100);

    const gainedCount = keywords.filter((k) => k.currentRank < k.previousRank).length;
    const droppedCount = keywords.filter((k) => k.currentRank > k.previousRank).length;
    const totalVolume = keywords.reduce((acc, k) => acc + (k.searchVolume || 0), 0);

    return {
      total,
      avgRank,
      aiWinRate,
      gainedCount,
      droppedCount,
      totalVolume,
    };
  }, [keywords]);

  // Filtered and sorted keyword list
  const filteredKeywords = useMemo(() => {
    return keywords
      .filter((k) => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchKw = k.keyword.toLowerCase().includes(q);
          const matchUrl = k.targetUrl.toLowerCase().includes(q);
          if (!matchKw && !matchUrl) return false;
        }

        // Intent filter
        if (intentFilter !== 'ALL' && k.intent !== intentFilter) {
          return false;
        }

        // AI Status filter
        if (aiStatusFilter !== 'ALL' && k.aiOverviewStatus !== aiStatusFilter) {
          return false;
        }

        // Trend filter
        if (trendFilter === 'GAINED' && k.currentRank >= k.previousRank) return false;
        if (trendFilter === 'DROPPED' && k.currentRank <= k.previousRank) return false;
        if (trendFilter === 'TOP3' && k.currentRank > 3) return false;
        if (trendFilter === 'TOP10' && k.currentRank > 10) return false;

        return true;
      })
      .sort((a, b) => {
        let valA;
        let valB;

        if (sortField === 'rank') {
          valA = a.currentRank;
          valB = b.currentRank;
        } else if (sortField === 'change') {
          // Change calculation: previousRank - currentRank (positive = gain)
          valA = a.previousRank - a.currentRank;
          valB = b.previousRank - b.currentRank;
        } else if (sortField === 'volume') {
          valA = a.searchVolume;
          valB = b.searchVolume;
        } else if (sortField === 'keyword') {
          valA = a.keyword.toLowerCase();
          valB = b.keyword.toLowerCase();
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [keywords, searchQuery, intentFilter, aiStatusFilter, trendFilter, sortField, sortDirection]);

  // Selected keyword object for inspector
  const selectedKeyword = useMemo(() => {
    if (!selectedKeywordId) return null;
    return keywords.find((k) => k.id === selectedKeywordId) || null;
  }, [keywords, selectedKeywordId]);

  const addKeyword = useCallback((formData) => {
    const newEntry = {
      id: `kw-${Date.now()}`,
      keyword: formData.keyword.trim(),
      targetUrl: formData.targetUrl.trim(),
      intent: formData.intent,
      currentRank: Math.floor(Math.random() * 12) + 1, // simulated initial rank
      previousRank: Math.floor(Math.random() * 15) + 2,
      searchVolume: Math.floor(Math.random() * 8000) + 1200,
      searchEngine: formData.searchEngine,
      aiOverviewStatus: Math.random() > 0.4 ? 'Won' : (Math.random() > 0.5 ? 'Cited' : 'Absent'),
      aiSnippet: `AI overview citation generated for ${formData.keyword.trim()} based on latest search generative indexing.`,
      citations: [formData.targetUrl.trim(), 'https://flyrank.ai'],
      rankHistory: [8, 7, 6, 5, 4, 3, 2],
      lastCrawled: new Date().toISOString(),
      alertThreshold: parseInt(formData.alertThreshold, 10),
    };

    setKeywords((prev) => [newEntry, ...prev]);
  }, []);

  const deleteKeyword = useCallback((id) => {
    setKeywords((prev) => prev.filter((k) => k.id !== id));
    setSelectedKeywordId((prev) => (prev === id ? null : prev));
  }, []);

  const recrawlKeyword = useCallback((id) => {
    setKeywords((prev) =>
      prev.map((k) => {
        if (k.id !== id) return k;
        // Simulate minor rank shift
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newRank = Math.max(1, k.currentRank + delta);
        const updatedHistory = [...k.rankHistory.slice(1), newRank];

        return {
          ...k,
          previousRank: k.currentRank,
          currentRank: newRank,
          rankHistory: updatedHistory,
          lastCrawled: new Date().toISOString(),
        };
      })
    );
  }, []);

  const recrawlAll = useCallback(async () => {
    setIsRecrawlingAll(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setKeywords((prev) =>
      prev.map((k) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const newRank = Math.max(1, k.currentRank + delta);
        return {
          ...k,
          previousRank: k.currentRank,
          currentRank: newRank,
          rankHistory: [...k.rankHistory.slice(1), newRank],
          lastCrawled: new Date().toISOString(),
        };
      })
    );
    setIsRecrawlingAll(false);
  }, []);

  const exportCsv = useCallback(() => {
    const headers = ['Keyword', 'Target URL', 'Intent', 'Rank', 'Previous Rank', 'Engine', 'AI Overview', 'Monthly Volume', 'Last Crawled'];
    const rows = filteredKeywords.map((k) => [
      `"${k.keyword.replace(/"/g, '""')}"`,
      `"${k.targetUrl}"`,
      k.intent,
      k.currentRank,
      k.previousRank,
      k.searchEngine,
      k.aiOverviewStatus,
      k.searchVolume,
      k.lastCrawled,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flyrank_keywords_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredKeywords]);

  const toggleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  return {
    keywords: filteredKeywords,
    totalCount: keywords.length,
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
  };
}
