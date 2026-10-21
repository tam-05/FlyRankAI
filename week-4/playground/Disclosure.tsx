import React, { useId, useState } from 'react';

export interface DisclosureProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
}

/**
 * W3C ARIA Compliant Disclosure (Show/Hide) Pattern
 * Spec: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 *
 * Requirements satisfied:
 * - Trigger is a native <button> with type="button"
 * - aria-expanded reflects open/closed state accurately
 * - aria-controls references the unique id of the collapsible region
 * - Collapsible content has role="region" and aria-labelledby referencing the button id
 * - Space and Enter toggle the disclosure (standard button behavior)
 * - Controlled and uncontrolled modes supported
 * - Clean animated chevron indicator
 * - Zero `any` types in props or implementation
 */
export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  disabled = false,
  className = '',
  triggerClassName = '',
  panelClassName = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const buttonId = useId();
  const panelId = useId();

  const handleToggle = () => {
    if (disabled) return;
    const nextOpen = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <div
      className={`border border-slate-800 rounded-xl bg-slate-900/70 overflow-hidden transition-colors ${
        isOpen ? 'border-slate-700' : ''
      } ${className}`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={disabled}
          onClick={handleToggle}
          className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium text-slate-200 hover:text-white hover:bg-slate-800/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            disabled ? 'opacity-40 cursor-not-allowed' : ''
          } ${triggerClassName}`}
        >
          <span className="text-base font-semibold">{title}</span>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ease-out flex-shrink-0 ${
              isOpen ? 'rotate-180 text-sky-400' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={`px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
