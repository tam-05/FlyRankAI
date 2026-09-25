/**
 * ROUND 2: Validation Schema and Sanitization Utilities
 * Strict, pure, testable functions handling edge cases, trimming, and type enforcement.
 */

export const ALLOWED_SEARCH_ENGINES = ['google', 'bing', 'duckduckgo'];
export const ALLOWED_FREQUENCIES = ['daily', 'weekly', 'monthly'];

// RFC 5322 compliant simplified regex ensuring valid user, @, domain, and TLD >= 2 letters
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// API key format: fk_ followed by 32 alphanumeric characters
export const API_KEY_REGEX = /^fk_[a-zA-Z0-9]{32}$/;

// FQDN or URL validation regex
export const DOMAIN_REGEX = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

export function validateProjectName(value) {
  if (value === undefined || value === null) {
    return 'Project name is required';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Project name cannot be empty or pure whitespace';
  }
  if (trimmed.length < 3) {
    return 'Project name must be at least 3 characters long';
  }
  if (trimmed.length > 50) {
    return 'Project name must be at most 50 characters long';
  }
  if (!/^[a-zA-Z0-9\s\-]+$/.test(trimmed)) {
    return 'Project name may only contain letters, numbers, spaces, and hyphens';
  }
  return null;
}

export function validateTargetDomain(value) {
  if (!value || typeof value !== 'string') {
    return 'Target domain or URL is required';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Target domain cannot be empty or pure whitespace';
  }

  // Reject incomplete protocol schemes
  if (trimmed === 'http://' || trimmed === 'https://') {
    return 'Enter a complete domain name (e.g. flyrank.ai)';
  }

  // Check valid domain format
  if (!DOMAIN_REGEX.test(trimmed)) {
    return 'Please enter a valid domain (e.g. example.com or https://example.com)';
  }

  // Deep validation using URL constructor
  try {
    const urlString = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
    const parsed = new URL(urlString);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return 'Target domain must include a valid top-level domain (e.g. .com, .ai)';
    }
  } catch {
    return 'Target domain format is invalid';
  }

  return null;
}

export function validateSearchEngine(value) {
  if (!value || !ALLOWED_SEARCH_ENGINES.includes(value)) {
    return `Search engine must be one of: ${ALLOWED_SEARCH_ENGINES.join(', ')}`;
  }
  return null;
}

export function validateCrawlFrequency(value) {
  if (!value || !ALLOWED_FREQUENCIES.includes(value)) {
    return `Crawl frequency must be one of: ${ALLOWED_FREQUENCIES.join(', ')}`;
  }
  return null;
}

export function validateAlertThreshold(value) {
  if (value === '' || value === null || value === undefined) {
    return 'Rank drop alert threshold is required';
  }

  const num = Number(value);

  if (isNaN(num)) {
    return 'Threshold must be a valid number';
  }
  if (!Number.isInteger(num)) {
    return 'Threshold must be a whole integer';
  }
  if (num < 1) {
    return 'Threshold must be at least 1 rank position';
  }
  if (num > 100) {
    return 'Threshold cannot exceed 100 rank positions';
  }

  return null;
}

export function validateNotificationEmail(value) {
  if (!value || typeof value !== 'string') {
    return 'Notification email is required';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Notification email cannot be empty or pure whitespace';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please provide a valid email address (e.g. team@flyrank.ai)';
  }
  return null;
}

export function validateApiKey(value) {
  if (!value) return null; // API key is optional
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  if (!API_KEY_REGEX.test(trimmed)) {
    return 'API key must start with fk_ followed by 32 alphanumeric characters';
  }
  return null;
}

export function validateSettings(formData) {
  const errors = {};

  const nameError = validateProjectName(formData.projectName);
  if (nameError) errors.projectName = nameError;

  const domainError = validateTargetDomain(formData.targetDomain);
  if (domainError) errors.targetDomain = domainError;

  const engineError = validateSearchEngine(formData.searchEngine);
  if (engineError) errors.searchEngine = engineError;

  const freqError = validateCrawlFrequency(formData.crawlFrequency);
  if (freqError) errors.crawlFrequency = freqError;

  const thresholdError = validateAlertThreshold(formData.alertThreshold);
  if (thresholdError) errors.alertThreshold = thresholdError;

  const emailError = validateNotificationEmail(formData.notificationEmail);
  if (emailError) errors.notificationEmail = emailError;

  const apiKeyError = validateApiKey(formData.apiKey);
  if (apiKeyError) errors.apiKey = apiKeyError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function normalizeSettings(formData) {
  return {
    projectName: formData.projectName.trim(),
    targetDomain: formData.targetDomain.trim().toLowerCase(),
    searchEngine: formData.searchEngine,
    crawlFrequency: formData.crawlFrequency,
    alertThreshold: parseInt(formData.alertThreshold, 10),
    notificationEmail: formData.notificationEmail.trim().toLowerCase(),
    enableAiOverview: Boolean(formData.enableAiOverview),
    apiKey: formData.apiKey ? formData.apiKey.trim() : '',
  };
}
