import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from '../App';
import {
  validateKeyword,
  validateTargetUrl,
  validateAlertThreshold,
  validateKeywordForm,
} from '../utils/validators';

describe('Validation Unit Tests', () => {
  describe('validateKeyword', () => {
    it('rejects empty or whitespace-only inputs', () => {
      expect(validateKeyword('')).toMatch(/cannot be empty/i);
      expect(validateKeyword('    ')).toMatch(/cannot be empty or pure whitespace/i);
      expect(validateKeyword(null)).toMatch(/required/i);
    });

    it('rejects keywords shorter than 2 characters', () => {
      expect(validateKeyword('a')).toMatch(/at least 2 characters/i);
    });

    it('rejects keywords exceeding 80 characters', () => {
      const longStr = 'a'.repeat(85);
      expect(validateKeyword(longStr)).toMatch(/cannot exceed 80 characters/i);
    });

    it('accepts valid keyword queries', () => {
      expect(validateKeyword('generative ai search audit')).toBeNull();
      expect(validateKeyword('seo rank tracker')).toBeNull();
    });
  });

  describe('validateTargetUrl', () => {
    it('rejects missing or whitespace URLs', () => {
      expect(validateTargetUrl('')).toMatch(/required/i);
      expect(validateTargetUrl('   ')).toMatch(/cannot be empty/i);
    });

    it('rejects invalid URL protocols and unanchored strings', () => {
      expect(validateTargetUrl('ftp://flyrank.ai')).toMatch(/http or https/i);
      expect(validateTargetUrl('not a url')).toMatch(/invalid url format/i);
    });

    it('accepts valid HTTP/HTTPS URLs', () => {
      expect(validateTargetUrl('https://flyrank.ai/platform')).toBeNull();
      expect(validateTargetUrl('http://subdomain.example.com/page')).toBeNull();
    });
  });

  describe('validateAlertThreshold', () => {
    it('rejects 0, negative values, and non-integers', () => {
      expect(validateAlertThreshold('0')).toMatch(/between 1 and 100/i);
      expect(validateAlertThreshold('-3')).toMatch(/between 1 and 100/i);
      expect(validateAlertThreshold('4.5')).toMatch(/whole integer/i);
      expect(validateAlertThreshold('abc')).toMatch(/valid number/i);
    });

    it('rejects numbers above 100', () => {
      expect(validateAlertThreshold('105')).toMatch(/between 1 and 100/i);
    });

    it('accepts valid integers 1, 5, and 100', () => {
      expect(validateAlertThreshold('1')).toBeNull();
      expect(validateAlertThreshold('5')).toBeNull();
      expect(validateAlertThreshold('100')).toBeNull();
    });
  });

  describe('validateKeywordForm', () => {
    it('returns valid when all fields conform to schema', () => {
      const result = validateKeywordForm({
        keyword: 'best serp rank tracker',
        targetUrl: 'https://flyrank.ai',
        intent: 'Commercial',
        searchEngine: 'Google',
        alertThreshold: '5',
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('returns errors for multiple invalid fields', () => {
      const result = validateKeywordForm({
        keyword: ' ',
        targetUrl: 'invalid',
        intent: 'Commercial',
        searchEngine: 'Google',
        alertThreshold: '0',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.keyword).toBeDefined();
      expect(result.errors.targetUrl).toBeDefined();
      expect(result.errors.alertThreshold).toBeDefined();
    });
  });
});

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders executive KPI cards and initial keywords', () => {
    render(<App />);

    expect(screen.getByText('FlyRankAI')).toBeInTheDocument();
    expect(screen.getByText('Tracked Keywords')).toBeInTheDocument();
    expect(screen.getByText('Average Rank')).toBeInTheDocument();
    expect(screen.getByText('AI Overview Win Rate')).toBeInTheDocument();

    // Verify initial keywords appear
    expect(screen.getByText('ai search engine optimization platform')).toBeInTheDocument();
    expect(screen.getByText('how to track google ai overview rankings')).toBeInTheDocument();
  });

  it('filters keywords via search input', () => {
    render(<App />);

    const searchInput = screen.getByLabelText(/Search keywords or URLs/i);
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'perplexity' } });
    });

    expect(screen.getByText('perplexity search citation monitoring')).toBeInTheDocument();
    expect(screen.queryByText('how to track google ai overview rankings')).not.toBeInTheDocument();
  });

  it('filters keywords by search intent', () => {
    render(<App />);

    const intentSelect = screen.getByLabelText(/Filter by Intent/i);
    act(() => {
      fireEvent.change(intentSelect, { target: { value: 'Transactional' } });
    });

    expect(screen.getByText('enterprise serp rank tracker software')).toBeInTheDocument();
    expect(screen.queryByText('how to track google ai overview rankings')).not.toBeInTheDocument();
  });

  it('filters keywords by AI Overview status', () => {
    render(<App />);

    const aiSelect = screen.getByLabelText(/Filter by AI Overview Status/i);
    act(() => {
      fireEvent.change(aiSelect, { target: { value: 'Won' } });
    });

    expect(screen.getByText('how to track google ai overview rankings')).toBeInTheDocument();
    expect(screen.queryByText('competitor serp visibility benchmark')).not.toBeInTheDocument();
  });

  it('opens Add Keyword modal and successfully adds a new keyword', async () => {
    render(<App />);

    const addBtn = screen.getByRole('button', { name: /Add new tracked keyword/i });
    act(() => {
      fireEvent.click(addBtn);
    });

    expect(screen.getByRole('dialog', { name: /Track New SERP Keyword/i })).toBeInTheDocument();

    const kwInput = screen.getByLabelText(/Search Keyword Phrase/i);
    const urlInput = screen.getByLabelText(/Target Landing URL/i);
    const thresholdInput = screen.getByLabelText(/Rank Drop Alert Threshold/i);

    act(() => {
      fireEvent.change(kwInput, { target: { value: 'generative ai brand protection' } });
      fireEvent.change(urlInput, { target: { value: 'https://flyrank.ai/brand-protection' } });
      fireEvent.change(thresholdInput, { target: { value: '4' } });
    });

    const submitBtn = screen.getByRole('button', { name: /Start Tracking/i });
    act(() => {
      fireEvent.click(submitBtn);
    });

    // Verify modal closes and keyword is listed
    await waitFor(() => {
      expect(screen.getByText('generative ai brand protection')).toBeInTheDocument();
    });
  });

  it('deletes a keyword from the table', () => {
    render(<App />);

    const initialKeyword = screen.getByText('competitor serp visibility benchmark');
    expect(initialKeyword).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: /Delete competitor serp visibility benchmark/i,
    });

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(screen.queryByText('competitor serp visibility benchmark')).not.toBeInTheDocument();
  });

  it('opens and closes the Keyword Inspector Drawer', () => {
    render(<App />);

    const inspectBtn = screen.getByRole('button', {
      name: /Inspect AI Overview and history for ai search engine optimization platform/i,
    });

    act(() => {
      fireEvent.click(inspectBtn);
    });

    expect(screen.getByText('7-Day SERP Rank Trajectory')).toBeInTheDocument();
    expect(screen.getByText(/FlyRankAI provides automated generative engine optimization/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close details inspector/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByText('7-Day SERP Rank Trajectory')).not.toBeInTheDocument();
  });
});
