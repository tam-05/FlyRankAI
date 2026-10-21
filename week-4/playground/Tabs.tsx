import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useCallback,
  useState,
} from 'react';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivation = 'automatic' | 'manual';

export interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  orientation: TabsOrientation;
  activation: TabsActivation;
  baseId: string;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  unregisterTab: (value: string) => void;
  tabValuesRef: React.MutableRefObject<string[]>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within a <Tabs> component.`);
  }
  return context;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  activation?: TabsActivation;
  className?: string;
  children: React.ReactNode;
}

/**
 * W3C ARIA Compliant Tabs Root
 * Spec: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  activation = 'automatic',
  className = '',
  children,
}) => {
  const baseId = useId();
  const [internalSelectedTab, setInternalSelectedTab] = useState<string>(
    defaultValue || ''
  );
  const tabValuesRef = useRef<string[]>([]);
  const tabElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isControlled = value !== undefined;
  const selectedTab = isControlled ? value : internalSelectedTab;

  const setSelectedTab = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalSelectedTab(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  const registerTab = useCallback(
    (tabValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabElementsRef.current.set(tabValue, element);
        if (!tabValuesRef.current.includes(tabValue)) {
          tabValuesRef.current.push(tabValue);
        }
        // If no default was set and this is the first tab, select it
        if (!selectedTab && tabValuesRef.current.length === 1) {
          setSelectedTab(tabValue);
        }
      }
    },
    [selectedTab, setSelectedTab]
  );

  const unregisterTab = useCallback((tabValue: string) => {
    tabElementsRef.current.delete(tabValue);
    tabValuesRef.current = tabValuesRef.current.filter((v) => v !== tabValue);
  }, []);

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        orientation,
        activation,
        baseId,
        registerTab,
        unregisterTab,
        tabValuesRef,
      }}
    >
      <div
        className={`w-full ${
          orientation === 'vertical' ? 'flex flex-row gap-6' : 'flex flex-col'
        } ${className}`}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * TabList - renders role="tablist" with arrow key navigation (roving tabindex)
 */
export const TabList: React.FC<TabListProps> = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className = '',
  children,
}) => {
  const { orientation, activation, selectedTab, setSelectedTab, tabValuesRef } =
    useTabsContext('TabList');
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const values = tabValuesRef.current;
    if (values.length === 0) return;

    const currentIndex = values.indexOf(selectedTab);
    let nextIndex = -1;

    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    switch (event.key) {
      case nextKey:
        event.preventDefault();
        nextIndex = currentIndex >= values.length - 1 ? 0 : currentIndex + 1;
        break;
      case prevKey:
        event.preventDefault();
        nextIndex = currentIndex <= 0 ? values.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = values.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== -1 && values[nextIndex] !== undefined) {
      const targetValue = values[nextIndex] as string;
      const targetButton = listRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-value="${targetValue}"]`
      );

      targetButton?.focus();

      if (activation === 'automatic') {
        setSelectedTab(targetValue);
      }
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={`flex ${
        orientation === 'vertical'
          ? 'flex-col space-y-1 border-r border-slate-700 pr-3 min-w-[180px]'
          : 'flex-row border-b border-slate-700 space-x-1'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Tab - individual tab button with role="tab", aria-selected, aria-controls
 */
export const Tab: React.FC<TabProps> = ({
  value,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  const {
    selectedTab,
    setSelectedTab,
    baseId,
    registerTab,
    unregisterTab,
    activation,
  } = useTabsContext('Tab');
  const isSelected = selectedTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        registerTab(value, node);
      } else {
        unregisterTab(value);
      }
    },
    [value, registerTab, unregisterTab]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setSelectedTab(value);
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (activation === 'manual' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setSelectedTab(value);
    }
    rest.onKeyDown?.(e);
  };

  return (
    <button
      {...rest}
      ref={setButtonRef}
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      data-tab-value={value}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        isSelected
          ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold shadow-sm'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * TabPanel - container for tab content with role="tabpanel", aria-labelledby, tabIndex=0
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  className = '',
  children,
  ...rest
}) => {
  const { selectedTab, baseId } = useTabsContext('TabPanel');
  const isSelected = selectedTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      {...rest}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={`p-4 rounded-xl bg-slate-900/60 border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition-all ${className}`}
    >
      {children}
    </div>
  );
};
