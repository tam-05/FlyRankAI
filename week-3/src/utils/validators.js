/**
 * Validation utilities conforming to FlyRankAI engineering rules (CLAUDE.md)
 */

export const ALLOWED_INTENTS = ['Informational', 'Commercial', 'Transactional', 'Navigational'];
export const ALLOWED_ENGINES = ['Google', 'Bing', 'Perplexity'];

export function validateKeyword(value) {
  if (value === null || value === undefined) {
    return 'Keyword query is required';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Keyword cannot be empty or pure whitespace';
  }
  if (trimmed.length < 2) {
    return 'Keyword must be at least 2 characters long';
  }
  if (trimmed.length > 80) {
    return 'Keyword cannot exceed 80 characters';
  }
  return null;
}

export function validateTargetUrl(value) {
  if (!value || typeof value !== 'string') {
    return 'Target URL is required';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Target URL cannot be empty or pure whitespace';
  }

  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return 'Target URL must use HTTP or HTTPS protocol';
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return 'Target URL must contain a valid domain (e.g. https://flyrank.ai)';
    }
  } catch {
    return 'Invalid URL format (example: https://flyrank.ai/product)';
  }

  return null;
}

export function validateAlertThreshold(value) {
  if (value === '' || value === null || value === undefined) {
    return 'Drop alert threshold is required';
  }
  const num = Number(value);
  if (isNaN(num)) {
    return 'Threshold must be a valid number';
  }
  if (!Number.isInteger(num)) {
    return 'Threshold must be a whole integer';
  }
  if (num < 1 || num > 100) {
    return 'Threshold must be between 1 and 100';
  }
  return null;
}

export function validateKeywordForm(formData) {
  const errors = {};

  const kwError = validateKeyword(formData.keyword);
  if (kwError) errors.keyword = kwError;

  const urlError = validateTargetUrl(formData.targetUrl);
  if (urlError) errors.targetUrl = urlError;

  const thresholdError = validateAlertThreshold(formData.alertThreshold);
  if (thresholdError) errors.alertThreshold = thresholdError;

  if (!ALLOWED_INTENTS.includes(formData.intent)) {
    errors.intent = 'Please select a valid search intent';
  }

  if (!ALLOWED_ENGINES.includes(formData.searchEngine)) {
    errors.searchEngine = 'Please select a valid search engine';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
