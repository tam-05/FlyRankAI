import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/Header';
import { NavigationTabs } from '../components/NavigationTabs';
import { AddKeywordModal } from '../components/AddKeywordModal';
import { KeywordPortfolio } from '../components/KeywordPortfolio';
import { INITIAL_KEYWORDS } from '../data/mockKeywords';

describe('Header Component', () => {
  it('renders application brand title and KPI metrics', () => {
    const mockMetrics = {
      totalKeywords: 7,
      averageRank: '3.4',
      aiWonCount: 3,
      aiWinRate: 43,
      totalVolume: 78000,
    };

    render(
      <Header
        metrics={mockMetrics}
        onOpenAddModal={vi.fn()}
        onOpenSettings={vi.fn()}
        isHighContrast={false}
        onToggleHighContrast={vi.fn()}
      />
    );

    expect(screen.getByText('FlyRankAI')).toBeInTheDocument();
    expect(screen.getByText('#3.4')).toBeInTheDocument();
    expect(screen.getByText('43%')).toBeInTheDocument();
  });

  it('triggers onOpenAddModal when clicking Track Keyword button', async () => {
    const handleAdd = vi.fn();
    render(
      <Header
        metrics={{ totalKeywords: 0, averageRank: '0', aiWonCount: 0, aiWinRate: 0, totalVolume: 0 }}
        onOpenAddModal={handleAdd}
        onOpenSettings={vi.fn()}
        isHighContrast={false}
        onToggleHighContrast={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /track keyword/i });
    await userEvent.click(button);
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});

describe('NavigationTabs Component (W3C ARIA Pattern)', () => {
  it('renders with role="tablist" and roving tabindex', () => {
    const handleSelect = vi.fn();
    render(<NavigationTabs activeTab="overview" onSelectTab={handleSelect} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const activeTab = screen.getByRole('tab', { name: /overview/i });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab).toHaveAttribute('tabindex', '0');

    const inactiveTab = screen.getByRole('tab', { name: /ai citability audit/i });
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
    expect(inactiveTab).toHaveAttribute('tabindex', '-1');
  });

  it('supports ArrowRight and ArrowLeft keyboard navigation with wrap-around', () => {
    const handleSelect = vi.fn();
    render(<NavigationTabs activeTab="overview" onSelectTab={handleSelect} />);

    const tablist = screen.getByRole('tablist');
    fireEvent.keyDown(tablist, { key: 'ArrowRight' });
    expect(handleSelect).toHaveBeenCalledWith('geo-audit');

    fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
    expect(handleSelect).toHaveBeenCalledWith('diagnostics'); // wrapped to end
  });
});

describe('AddKeywordModal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <AddKeywordModal
        isOpen={false}
        onClose={vi.fn()}
        onAddKeyword={vi.fn()}
        onNotify={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders with role="dialog" and traps Escape key when open', async () => {
    const handleClose = vi.fn();
    render(
      <AddKeywordModal
        isOpen={true}
        onClose={handleClose}
        onAddKeyword={vi.fn()}
        onNotify={vi.fn()}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('submits valid keyword data and calls callbacks', async () => {
    const handleAdd = vi.fn();
    const handleNotify = vi.fn();
    const handleClose = vi.fn();

    render(
      <AddKeywordModal
        isOpen={true}
        onClose={handleClose}
        onAddKeyword={handleAdd}
        onNotify={handleNotify}
      />
    );

    const keywordInput = screen.getByLabelText(/search query \/ keyword/i);
    const urlInput = screen.getByLabelText(/target landing page url/i);
    const submitBtn = screen.getByRole('button', { name: /start tracking/i });

    await userEvent.type(keywordInput, 'geo seo software');
    await userEvent.type(urlInput, 'https://flyrank.ai/software');
    await userEvent.click(submitBtn);

    expect(handleAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        keyword: 'geo seo software',
        url: 'https://flyrank.ai/software',
      })
    );
    expect(handleNotify).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});

describe('KeywordPortfolio Component', () => {
  it('renders keyword rows and handles row selection for inspection', async () => {
    const handleSelect = vi.fn();
    render(
      <KeywordPortfolio
        keywords={INITIAL_KEYWORDS.slice(0, 3)}
        searchQuery=""
        setSearchQuery={vi.fn()}
        intentFilter="All"
        setIntentFilter={vi.fn()}
        statusFilter="All"
        setStatusFilter={vi.fn()}
        sortField="currentRank"
        sortDirection="asc"
        toggleSort={vi.fn()}
        onSelectKeyword={handleSelect}
        onDeleteKeyword={vi.fn()}
        onNotify={vi.fn()}
      />
    );

    expect(screen.getByText('generative engine optimization audit')).toBeInTheDocument();

    const inspectButtons = screen.getAllByTitle(/inspect ai citation & trajectory chart/i);
    await userEvent.click(inspectButtons[0]);
    expect(handleSelect).toHaveBeenCalledWith(INITIAL_KEYWORDS[0]);
  });
});
