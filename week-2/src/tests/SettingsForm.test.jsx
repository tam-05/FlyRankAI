import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SettingsFormSpec from '../round-2/SettingsFormSpec';
import {
  validateProjectName,
  validateTargetDomain,
  validateAlertThreshold,
  validateNotificationEmail,
  validateApiKey,
  normalizeSettings,
} from '../round-2/validation';

describe('Round 2 Unit Tests: Validation Schema & Edge Cases', () => {
  describe('validateProjectName', () => {
    it('rejects empty or whitespace-only names', () => {
      expect(validateProjectName('')).toMatch(/cannot be empty/i);
      expect(validateProjectName('   ')).toMatch(/cannot be empty or pure whitespace/i);
      expect(validateProjectName(null)).toMatch(/required/i);
    });

    it('rejects names shorter than 3 characters', () => {
      expect(validateProjectName('ab')).toMatch(/at least 3 characters/i);
    });

    it('rejects names with invalid symbols', () => {
      expect(validateProjectName('MyProject<script>')).toMatch(/only contain letters/i);
    });

    it('accepts valid project names', () => {
      expect(validateProjectName('FlyRank AI SERP')).toBeNull();
      expect(validateProjectName('e-commerce-audit')).toBeNull();
    });
  });

  describe('validateTargetDomain', () => {
    it('rejects empty strings or pure whitespace', () => {
      expect(validateTargetDomain('')).toMatch(/required/i);
      expect(validateTargetDomain('   ')).toMatch(/cannot be empty/i);
    });

    it('rejects incomplete protocols like http:// and invalid domain names', () => {
      expect(validateTargetDomain('http://')).toMatch(/complete domain name/i);
      expect(validateTargetDomain('https://')).toMatch(/complete domain name/i);
      expect(validateTargetDomain('justastring')).toMatch(/valid domain/i);
    });

    it('accepts valid domain names and URLs', () => {
      expect(validateTargetDomain('flyrank.ai')).toBeNull();
      expect(validateTargetDomain('https://app.flyrank.ai')).toBeNull();
      expect(validateTargetDomain('http://subdomain.domain.co.uk')).toBeNull();
    });
  });

  describe('validateAlertThreshold', () => {
    it('rejects 0, negative values, and non-integers', () => {
      expect(validateAlertThreshold('0')).toMatch(/at least 1/i);
      expect(validateAlertThreshold('-5')).toMatch(/at least 1/i);
      expect(validateAlertThreshold('3.5')).toMatch(/whole integer/i);
      expect(validateAlertThreshold('abc')).toMatch(/valid number/i);
    });

    it('rejects values above 100', () => {
      expect(validateAlertThreshold('101')).toMatch(/cannot exceed 100/i);
      expect(validateAlertThreshold('999')).toMatch(/cannot exceed 100/i);
    });

    it('accepts boundary integers 1, 50, and 100', () => {
      expect(validateAlertThreshold('1')).toBeNull();
      expect(validateAlertThreshold('50')).toBeNull();
      expect(validateAlertThreshold('100')).toBeNull();
    });
  });

  describe('validateNotificationEmail', () => {
    it('rejects malformed email strings', () => {
      expect(validateNotificationEmail('user@')).toMatch(/valid email/i);
      expect(validateNotificationEmail('user@domain')).toMatch(/valid email/i);
      expect(validateNotificationEmail('@domain.com')).toMatch(/valid email/i);
      expect(validateNotificationEmail('notanemail')).toMatch(/valid email/i);
    });

    it('accepts valid emails', () => {
      expect(validateNotificationEmail('dev@flyrank.ai')).toBeNull();
      expect(validateNotificationEmail('admin.user+test@company.co')).toBeNull();
    });
  });

  describe('validateApiKey', () => {
    it('allows empty optional key', () => {
      expect(validateApiKey('')).toBeNull();
      expect(validateApiKey('   ')).toBeNull();
    });

    it('rejects invalid key formats', () => {
      expect(validateApiKey('fk_short')).toMatch(/fk_ followed by 32/i);
      expect(validateApiKey('invalidprefix12345678901234567890123456789012')).toMatch(/fk_/i);
    });

    it('accepts valid 32-character fk_ prefixed keys', () => {
      expect(validateApiKey('fk_1234567890abcdef1234567890abcdef')).toBeNull();
    });
  });

  describe('normalizeSettings', () => {
    it('trims whitespace and normalizes case/types', () => {
      const normalized = normalizeSettings({
        projectName: '  FlyRank Dev  ',
        targetDomain: '  FLYRANK.AI  ',
        searchEngine: 'google',
        crawlFrequency: 'daily',
        alertThreshold: '10',
        notificationEmail: '  TEST@Domain.COM  ',
        enableAiOverview: true,
        apiKey: '  fk_1234567890abcdef1234567890abcdef  ',
      });

      expect(normalized.projectName).toBe('FlyRank Dev');
      expect(normalized.targetDomain).toBe('flyrank.ai');
      expect(normalized.alertThreshold).toBe(10);
      expect(normalized.notificationEmail).toBe('test@domain.com');
      expect(normalized.apiKey).toBe('fk_1234567890abcdef1234567890abcdef');
    });
  });
});

describe('Round 2 Component Integration Tests: Accessibility & Behavior', () => {
  it('renders with accessible labels associated with input IDs', () => {
    render(<SettingsFormSpec />);

    const nameInput = screen.getByLabelText(/Project Name/i);
    expect(nameInput).toHaveAttribute('id', 'field-projectName');
    expect(nameInput).toHaveAttribute('aria-required', 'true');
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');

    const domainInput = screen.getByLabelText(/Target Domain or Website URL/i);
    expect(domainInput).toHaveAttribute('id', 'field-targetDomain');

    const emailInput = screen.getByLabelText(/Notification Email/i);
    expect(emailInput).toHaveAttribute('id', 'field-notificationEmail');
  });

  it('triggers validation errors and applies aria-invalid & aria-describedby', async () => {
    render(<SettingsFormSpec />);
    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });

    fireEvent.click(submitBtn);

    // Errors displayed with role="alert"
    const nameError = await screen.findByText(/Project name cannot be empty/i);
    expect(nameError).toHaveAttribute('role', 'alert');

    const nameInput = screen.getByLabelText(/Project Name/i);
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAttribute('aria-describedby', 'field-projectName-error');

    // Verify first invalid field is focused
    expect(document.activeElement).toBe(nameInput);
  });

  it('clears error immediately when user types valid input into that field', async () => {
    render(<SettingsFormSpec />);

    // Click submit to show errors
    fireEvent.click(screen.getByRole('button', { name: /Save Settings/i }));
    expect(await screen.findByText(/Project name cannot be empty/i)).toBeInTheDocument();

    // Type into project name
    const nameInput = screen.getByLabelText(/Project Name/i);
    act(() => {
      fireEvent.change(nameInput, { target: { name: 'projectName', value: 'FlyRank AI' } });
    });

    expect(screen.queryByText(/Project name cannot be empty/i)).not.toBeInTheDocument();
  });

  it('toggles API key input mask and aria-label', () => {
    render(<SettingsFormSpec />);

    const toggleBtn = screen.getByRole('button', { name: /Show API key/i });
    const keyInput = screen.getByLabelText(/Custom Search API Key/i);

    expect(keyInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(keyInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /Hide API key/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Hide API key/i }));
    expect(keyInput).toHaveAttribute('type', 'password');
  });

  it('submits valid form successfully and calls onSaveSuccess with normalized data', async () => {
    const handleSuccess = vi.fn();
    render(<SettingsFormSpec onSaveSuccess={handleSuccess} />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/Project Name/i), {
        target: { name: 'projectName', value: 'FlyRank Production' },
      });
      fireEvent.change(screen.getByLabelText(/Target Domain or Website URL/i), {
        target: { name: 'targetDomain', value: 'flyrank.ai' },
      });
      fireEvent.change(screen.getByLabelText(/Notification Email/i), {
        target: { name: 'notificationEmail', value: 'alerts@flyrank.ai' },
      });
    });

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    act(() => {
      fireEvent.click(submitBtn);
    });

    // Displays saving state
    expect(submitBtn).toBeDisabled();

    // Awaits success
    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'FlyRank Production',
          targetDomain: 'flyrank.ai',
          notificationEmail: 'alerts@flyrank.ai',
          searchEngine: 'google',
          crawlFrequency: 'daily',
          alertThreshold: 5,
        })
      );
    });

    expect(await screen.findByText(/Configuration saved successfully/i)).toBeInTheDocument();
  });

  it('resets form to default values when Reset Defaults button is clicked', () => {
    render(<SettingsFormSpec />);

    const nameInput = screen.getByLabelText(/Project Name/i);
    act(() => {
      fireEvent.change(nameInput, { target: { name: 'projectName', value: 'Temporary Project' } });
    });
    expect(nameInput).toHaveValue('Temporary Project');

    const resetBtn = screen.getByRole('button', { name: /Reset Defaults/i });
    act(() => {
      fireEvent.click(resetBtn);
    });

    expect(nameInput).toHaveValue('');
    expect(screen.getByText(/Form reset to default configuration/i)).toBeInTheDocument();
  });
});
