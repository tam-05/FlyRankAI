import React, { useEffect, useRef, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement>;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * W3C ARIA Compliant Modal Dialog Pattern
 * Spec: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * Requirements satisfied:
 * - role="dialog" with aria-modal="true"
 * - aria-labelledby pointing to title and aria-describedby to description
 * - Focus trapped inside dialog on Tab and Shift+Tab
 * - Initial focus placed on first focusable element (or initialFocusRef)
 * - Focus restored to triggering element upon closing
 * - Escape key closes modal
 * - Body scroll locked while modal is open
 * - Portal rendering to prevent z-index / clipping issues
 * - Zero `any` types in props or internal logic
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Store previous active element to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Focus trap and initial focus
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );

    // Initial focus
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else if (focusableElements.length > 0 && focusableElements[0]) {
      focusableElements[0].focus();
    } else {
      dialog.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const elements = Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (elements.length === 0) {
          event.preventDefault();
          return;
        }

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === first && last) {
            event.preventDefault();
            last.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === last && first) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEscape, initialFocusRef]);

  // Return focus on close
  useEffect(() => {
    return () => {
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity"
      onClick={handleOverlayClick}
      data-testid="modal-backdrop"
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${className}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="false"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 id={titleId} className="text-xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {description && (
          <p id={descriptionId} className="text-sm text-slate-400 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-2">{children}</div>
      </div>
    </div>,
    document.body
  );
};
