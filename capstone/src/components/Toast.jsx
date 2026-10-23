import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-850 border border-brand-500/40 text-slate-100 shadow-2xl animate-slide-in text-xs sm:text-sm font-medium"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="ml-2 text-slate-400 hover:text-white p-0.5 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
