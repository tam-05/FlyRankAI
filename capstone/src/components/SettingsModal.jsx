import React, { useState, useEffect, useRef, useId } from 'react';
import { X, Key, Eye, EyeOff, RotateCcw, ShieldCheck, Check } from 'lucide-react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  onResetPortfolio,
  isHighContrast,
  onToggleHighContrast,
  onNotify,
}) {
  const [localKey, setLocalKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const titleId = useId();
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const keyInputRef = useRef(null);

  useEffect(() => {
    setLocalKey(apiKey || '');
  }, [apiKey]);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => keyInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    }
  }, [isOpen]);

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

  const handleSaveKey = (e) => {
    e.preventDefault();
    onSaveApiKey(localKey.trim());
    setSavedSuccess(true);
    onNotify?.('API Key settings saved.');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all tracked keywords and restore initial seed dataset?')) {
      onResetPortfolio();
      onNotify?.('Portfolio reset to initial seed dataset.');
      onClose();
    }
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
            <div className="w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center text-slate-300">
              <Key className="w-4 h-4 text-brand-400" />
            </div>
            <div>
              <h2 id={titleId} className="text-lg font-bold text-white tracking-tight">
                Settings & API Configurations
              </h2>
              <p className="text-xs text-slate-400">
                Configure your Anthropic Claude key and accessibility preferences.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Form */}
        <form onSubmit={handleSaveKey} className="space-y-4">
          <div>
            <label htmlFor="settings-api-key" className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Anthropic Claude API Key (Optional)
            </label>
            <div className="relative">
              <input
                id="settings-api-key"
                ref={keyInputRef}
                type={showKey ? 'text' : 'password'}
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              If left blank, FlyRankAI seamlessly activates its built-in heuristic GEO synthesis engine.
              Keys are stored strictly in client-side localStorage and are never sent to third-party tracking servers.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Key</span>
              )}
            </button>
          </div>
        </form>

        {/* Preferences Section */}
        <div className="pt-4 border-t border-surface-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Accessibility & Display
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-850 border border-surface-750">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-white">High Contrast Mode</p>
                <p className="text-[11px] text-slate-400">Enhance borders and text contrast to WCAG AAA standards</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleHighContrast}
              role="switch"
              aria-checked={isHighContrast}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                isHighContrast ? 'bg-brand-500' : 'bg-surface-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isHighContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset Database */}
        <div className="pt-4 border-t border-surface-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white">Reset Local Data</p>
            <p className="text-[11px] text-slate-500">Restore factory seed keywords</p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-800 hover:bg-red-500/20 hover:text-red-300 text-slate-400 border border-surface-700 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
