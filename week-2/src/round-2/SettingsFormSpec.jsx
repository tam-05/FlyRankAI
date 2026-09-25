import React, { useState, useRef } from 'react';
import {
  validateSettings,
  normalizeSettings,
  ALLOWED_SEARCH_ENGINES,
  ALLOWED_FREQUENCIES,
} from './validation';
import './SettingsFormSpec.css';

const DEFAULT_SETTINGS = {
  projectName: '',
  targetDomain: '',
  searchEngine: 'google',
  crawlFrequency: 'daily',
  alertThreshold: '5',
  notificationEmail: '',
  enableAiOverview: true,
  apiKey: '',
};

/**
 * ROUND 2 IMPLEMENTATION
 * Built from precise prompt with explicit file references, strict schema constraints,
 * WCAG 2.1 AA accessibility (aria-invalid, aria-describedby, role="alert", focus trapping),
 * async submission loading state, and edge case resilience.
 */
export default function SettingsFormSpec({ onSaveSuccess }) {
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // References to input elements for programmatic focus management on error
  const fieldRefs = {
    projectName: useRef(null),
    targetDomain: useRef(null),
    searchEngine: useRef(null),
    crawlFrequency: useRef(null),
    alertThreshold: useRef(null),
    notificationEmail: useRef(null),
    apiKey: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // UX: Live-clear errors as the user fixes the input
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_SETTINGS);
    setErrors({});
    setStatusMessage({
      type: 'info',
      text: 'Form reset to default configuration.',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const { isValid, errors: validationErrors } = validateSettings(formData);

    if (!isValid) {
      setErrors(validationErrors);

      // WCAG 2.1 AA: Programmatically focus the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField && fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
      }

      setStatusMessage({
        type: 'error',
        text: 'Please correct the highlighted errors before submitting.',
      });
      return;
    }

    // Submission start: disable button to prevent double-submits
    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = normalizeSettings(formData);
      // Simulate network persistence
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatusMessage({
        type: 'success',
        text: `Configuration saved successfully for "${payload.projectName}" (${payload.targetDomain})!`,
      });

      if (onSaveSuccess) {
        onSaveSuccess(payload);
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'An unexpected error occurred while saving settings. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="spec-settings-card">
      <div className="spec-badge">Round 2: Spec-Driven Implementation</div>
      <header className="spec-header">
        <h2 id="settings-heading">FlyRankAI Search & Audit Settings</h2>
        <p className="spec-subtitle">
          Manage target domain crawl schedules, AI Overview tracking, and rank drop alerts.
        </p>
      </header>

      {/* Live status region for assistive technologies */}
      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`spec-alert spec-alert-${statusMessage.type}`}
        >
          {statusMessage.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="settings-heading"
        className="spec-form"
      >
        {/* Project Name */}
        <div className={`form-row ${errors.projectName ? 'has-error' : ''}`}>
          <label htmlFor="field-projectName" className="field-label">
            Project Name <span className="required-star" aria-hidden="true">*</span>
          </label>
          <input
            ref={fieldRefs.projectName}
            id="field-projectName"
            name="projectName"
            type="text"
            className="field-input"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="e.g. Acme Ecommerce SERP"
            aria-required="true"
            aria-invalid={Boolean(errors.projectName)}
            aria-describedby={errors.projectName ? 'field-projectName-error' : 'field-projectName-help'}
          />
          <span id="field-projectName-help" className="field-help">
            Between 3 and 50 characters (letters, numbers, hyphens).
          </span>
          {errors.projectName && (
            <span
              id="field-projectName-error"
              className="error-message"
              role="alert"
              aria-live="assertive"
            >
              {errors.projectName}
            </span>
          )}
        </div>

        {/* Target Domain */}
        <div className={`form-row ${errors.targetDomain ? 'has-error' : ''}`}>
          <label htmlFor="field-targetDomain" className="field-label">
            Target Domain or Website URL <span className="required-star" aria-hidden="true">*</span>
          </label>
          <input
            ref={fieldRefs.targetDomain}
            id="field-targetDomain"
            name="targetDomain"
            type="text"
            className="field-input"
            value={formData.targetDomain}
            onChange={handleChange}
            placeholder="e.g. flyrank.ai or https://example.com"
            aria-required="true"
            aria-invalid={Boolean(errors.targetDomain)}
            aria-describedby={errors.targetDomain ? 'field-targetDomain-error' : undefined}
          />
          {errors.targetDomain && (
            <span
              id="field-targetDomain-error"
              className="error-message"
              role="alert"
              aria-live="assertive"
            >
              {errors.targetDomain}
            </span>
          )}
        </div>

        {/* Grid for Search Engine & Crawl Frequency */}
        <div className="form-grid-2">
          <div className="form-row">
            <label htmlFor="field-searchEngine" className="field-label">
              Primary Search Engine <span className="required-star" aria-hidden="true">*</span>
            </label>
            <select
              ref={fieldRefs.searchEngine}
              id="field-searchEngine"
              name="searchEngine"
              className="field-select"
              value={formData.searchEngine}
              onChange={handleChange}
            >
              {ALLOWED_SEARCH_ENGINES.map((engine) => (
                <option key={engine} value={engine}>
                  {engine.charAt(0).toUpperCase() + engine.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="field-crawlFrequency" className="field-label">
              Crawl Frequency <span className="required-star" aria-hidden="true">*</span>
            </label>
            <select
              ref={fieldRefs.crawlFrequency}
              id="field-crawlFrequency"
              name="crawlFrequency"
              className="field-select"
              value={formData.crawlFrequency}
              onChange={handleChange}
            >
              {ALLOWED_FREQUENCIES.map((freq) => (
                <option key={freq} value={freq}>
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid for Alert Threshold & Notification Email */}
        <div className="form-grid-2">
          <div className={`form-row ${errors.alertThreshold ? 'has-error' : ''}`}>
            <label htmlFor="field-alertThreshold" className="field-label">
              Alert Rank Drop (1-100) <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              ref={fieldRefs.alertThreshold}
              id="field-alertThreshold"
              name="alertThreshold"
              type="number"
              min="1"
              max="100"
              step="1"
              className="field-input"
              value={formData.alertThreshold}
              onChange={handleChange}
              placeholder="e.g. 5"
              aria-required="true"
              aria-invalid={Boolean(errors.alertThreshold)}
              aria-describedby={errors.alertThreshold ? 'field-alertThreshold-error' : undefined}
            />
            {errors.alertThreshold && (
              <span
                id="field-alertThreshold-error"
                className="error-message"
                role="alert"
                aria-live="assertive"
              >
                {errors.alertThreshold}
              </span>
            )}
          </div>

          <div className={`form-row ${errors.notificationEmail ? 'has-error' : ''}`}>
            <label htmlFor="field-notificationEmail" className="field-label">
              Notification Email <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              ref={fieldRefs.notificationEmail}
              id="field-notificationEmail"
              name="notificationEmail"
              type="email"
              className="field-input"
              value={formData.notificationEmail}
              onChange={handleChange}
              placeholder="alerts@company.com"
              aria-required="true"
              aria-invalid={Boolean(errors.notificationEmail)}
              aria-describedby={errors.notificationEmail ? 'field-notificationEmail-error' : undefined}
            />
            {errors.notificationEmail && (
              <span
                id="field-notificationEmail-error"
                className="error-message"
                role="alert"
                aria-live="assertive"
              >
                {errors.notificationEmail}
              </span>
            )}
          </div>
        </div>

        {/* AI Overview Toggle Switch */}
        <div className="form-row toggle-row">
          <div className="toggle-container">
            <input
              id="field-enableAiOverview"
              name="enableAiOverview"
              type="checkbox"
              className="toggle-checkbox"
              checked={formData.enableAiOverview}
              onChange={handleChange}
              role="switch"
              aria-checked={formData.enableAiOverview}
            />
            <label htmlFor="field-enableAiOverview" className="toggle-label">
              <span className="toggle-title">Track AI Overviews & Search Generative Experience</span>
              <span className="toggle-description">
                Monitor SERP answer snippets, citations, and LLM summary visibility.
              </span>
            </label>
          </div>
        </div>

        {/* API Key with Mask/Unmask Toggle */}
        <div className={`form-row ${errors.apiKey ? 'has-error' : ''}`}>
          <label htmlFor="field-apiKey" className="field-label">
            Custom Search API Key <span className="optional-tag">(Optional)</span>
          </label>
          <div className="password-input-wrapper">
            <input
              ref={fieldRefs.apiKey}
              id="field-apiKey"
              name="apiKey"
              type={showApiKey ? 'text' : 'password'}
              className="field-input"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="fk_32characters..."
              aria-invalid={Boolean(errors.apiKey)}
              aria-describedby={errors.apiKey ? 'field-apiKey-error' : 'field-apiKey-help'}
            />
            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={() => setShowApiKey((prev) => !prev)}
              aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <span id="field-apiKey-help" className="field-help">
            Must start with "fk_" followed by 32 alphanumeric characters if provided.
          </span>
          {errors.apiKey && (
            <span
              id="field-apiKey-error"
              className="error-message"
              role="alert"
              aria-live="assertive"
            >
              {errors.apiKey}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Saving Configuration...' : 'Save Settings'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
