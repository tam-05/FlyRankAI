import React, { useState, useEffect, useRef, useId } from 'react';
import { X, Plus, Search, Globe, Tag } from 'lucide-react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AddKeywordModal({ isOpen, onClose, onAddKeyword, onNotify }) {
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');
  const [searchEngine, setSearchEngine] = useState('Google');
  const [intent, setIntent] = useState('Commercial');
  const [currentRank, setCurrentRank] = useState('5');
  const [volume, setVolume] = useState('8500');
  const [aiOverviewStatus, setAiOverviewStatus] = useState('Won');

  const titleId = useId();
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const firstInputRef = useRef(null);

  // Store trigger element on open and restore on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      // Lock scroll
      document.body.style.overflow = 'hidden';
      // Initial focus
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap and Escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const dialog = modalRef.current;
        if (!dialog) return;

        const focusables = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR));
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim() || !url.trim()) return;

    onAddKeyword({
      keyword,
      url,
      searchEngine,
      intent,
      currentRank: Number(currentRank) || 1,
      volume: Number(volume) || 1000,
      aiOverviewStatus,
    });

    onNotify?.(`Keyword "${keyword}" added to SERP tracking portfolio.`);
    onClose();

    // Reset form
    setKeyword('');
    setUrl('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg card-surface bg-surface-900 border-surface-700 p-6 sm:p-7 space-y-6 shadow-2xl relative outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 id={titleId} className="text-lg font-bold text-white tracking-tight">
                Track New SERP Keyword
              </h2>
              <p className="text-xs text-slate-400">
                Monitor organic rank and Google AI Overview citations.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Keyword */}
          <div>
            <label htmlFor="modal-keyword" className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Search Query / Keyword <span className="text-red-400">*</span>
            </label>
            <input
              id="modal-keyword"
              ref={firstInputRef}
              type="text"
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. generative search optimization"
              className="w-full px-3.5 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="modal-url" className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Target Landing Page URL <span className="text-red-400">*</span>
            </label>
            <input
              id="modal-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourdomain.com/landing-page"
              className="w-full px-3.5 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Grid Options */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="modal-engine" className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Search Engine
              </label>
              <select
                id="modal-engine"
                value={searchEngine}
                onChange={(e) => setSearchEngine(e.target.value)}
                className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-xs"
              >
                <option value="Google">Google (Gemini)</option>
                <option value="Bing">Bing (Copilot)</option>
                <option value="Perplexity">Perplexity AI</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-intent" className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Search Intent
              </label>
              <select
                id="modal-intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-xs"
              >
                <option value="Commercial">Commercial</option>
                <option value="Informational">Informational</option>
                <option value="Transactional">Transactional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="modal-rank" className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Initial SERP Rank
              </label>
              <input
                id="modal-rank"
                type="number"
                min="1"
                max="100"
                value={currentRank}
                onChange={(e) => setCurrentRank(e.target.value)}
                className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-xs"
              />
            </div>

            <div>
              <label htmlFor="modal-status" className="block text-xs font-bold uppercase text-slate-300 mb-1">
                AI Overview Status
              </label>
              <select
                id="modal-status"
                value={aiOverviewStatus}
                onChange={(e) => setAiOverviewStatus(e.target.value)}
                className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-400 text-xs"
              >
                <option value="Won">Won (Primary Citation)</option>
                <option value="Cited">Cited (Referenced Link)</option>
                <option value="Absent">Absent (None)</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-800 hover:bg-surface-750 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 text-xs font-bold shadow-glow-brand transition-all"
            >
              Start Tracking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
