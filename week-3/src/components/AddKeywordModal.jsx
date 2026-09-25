import React, { useState, useEffect, useRef } from 'react';
import {
  validateKeywordForm,
  ALLOWED_INTENTS,
  ALLOWED_ENGINES,
} from '../utils/validators';

const INITIAL_FORM = {
  keyword: '',
  targetUrl: 'https://flyrank.ai/',
  intent: 'Commercial',
  searchEngine: 'Google',
  alertThreshold: '5',
};

export default function AddKeywordModal({ isOpen, onClose, onAddKeyword }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const fieldRefs = {
    keyword: useRef(null),
    targetUrl: useRef(null),
    alertThreshold: useRef(null),
  };

  // Focus management and ESC listener
  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_FORM);
      setErrors({});
      setIsSubmitting(false);

      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live error dismissal as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateKeywordForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      // Focus first error field per CLAUDE.md
      const firstField = Object.keys(validationErrors)[0];
      if (firstField && fieldRefs[firstField]?.current) {
        fieldRefs[firstField].current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 300));
    onAddKeyword(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-title" className="modal-title">Track New SERP Keyword</h2>
            <p className="modal-subtitle">
              Configure search intent, target domain, and alert threshold for AI telemetry.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          {/* Keyword Query */}
          <div className={`form-field ${errors.keyword ? 'field-error' : ''}`}>
            <label htmlFor="field-kw" className="modal-label">
              Search Keyword Phrase <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              ref={(el) => {
                firstInputRef.current = el;
                fieldRefs.keyword.current = el;
              }}
              id="field-kw"
              name="keyword"
              type="text"
              className="modal-input"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="e.g. generative search optimization"
              aria-required="true"
              aria-invalid={Boolean(errors.keyword)}
              aria-describedby={errors.keyword ? 'field-kw-error' : 'field-kw-help'}
            />
            <span id="field-kw-help" className="field-hint">
              Between 2 and 80 characters.
            </span>
            {errors.keyword && (
              <span id="field-kw-error" className="error-text" role="alert" aria-live="assertive">
                {errors.keyword}
              </span>
            )}
          </div>

          {/* Target URL */}
          <div className={`form-field ${errors.targetUrl ? 'field-error' : ''}`}>
            <label htmlFor="field-url" className="modal-label">
              Target Landing URL <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              ref={fieldRefs.targetUrl}
              id="field-url"
              name="targetUrl"
              type="url"
              className="modal-input"
              value={formData.targetUrl}
              onChange={handleChange}
              placeholder="https://flyrank.ai/solution"
              aria-required="true"
              aria-invalid={Boolean(errors.targetUrl)}
              aria-describedby={errors.targetUrl ? 'field-url-error' : undefined}
            />
            {errors.targetUrl && (
              <span id="field-url-error" className="error-text" role="alert" aria-live="assertive">
                {errors.targetUrl}
              </span>
            )}
          </div>

          {/* Grid: Intent & Engine */}
          <div className="modal-grid-2">
            <div className="form-field">
              <label htmlFor="field-intent" className="modal-label">
                Search Intent
              </label>
              <select
                id="field-intent"
                name="intent"
                className="modal-select"
                value={formData.intent}
                onChange={handleChange}
              >
                {ALLOWED_INTENTS.map((intent) => (
                  <option key={intent} value={intent}>
                    {intent}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="field-engine" className="modal-label">
                Search Engine Target
              </label>
              <select
                id="field-engine"
                name="searchEngine"
                className="modal-select"
                value={formData.searchEngine}
                onChange={handleChange}
              >
                {ALLOWED_ENGINES.map((engine) => (
                  <option key={engine} value={engine}>
                    {engine}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Alert Drop Threshold */}
          <div className={`form-field ${errors.alertThreshold ? 'field-error' : ''}`}>
            <label htmlFor="field-threshold" className="modal-label">
              Rank Drop Alert Threshold (positions) <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              ref={fieldRefs.alertThreshold}
              id="field-threshold"
              name="alertThreshold"
              type="number"
              min="1"
              max="100"
              className="modal-input"
              value={formData.alertThreshold}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.alertThreshold)}
              aria-describedby={errors.alertThreshold ? 'field-threshold-error' : 'field-threshold-help'}
            />
            <span id="field-threshold-help" className="field-hint">
              Alert triggered if position drops by this amount or more (1-100).
            </span>
            {errors.alertThreshold && (
              <span id="field-threshold-error" className="error-text" role="alert" aria-live="assertive">
                {errors.alertThreshold}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary-accent"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Start Tracking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
