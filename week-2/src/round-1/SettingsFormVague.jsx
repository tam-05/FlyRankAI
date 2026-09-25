import React, { useState } from 'react';
import './SettingsFormVague.css';

/**
 * ROUND 1 IMPLEMENTATION
 * Generated from single vague prompt: "make a settings form with validation for flyrank"
 * 
 * Flaws & Omissions:
 * - Weak validation: accepts whitespace-only name ("   "), malformed domains ("http://", "foobar"),
 *   negative/zero thresholds, and invalid emails (e.g. "@").
 * - Accessibility: Missing htmlFor on labels, no aria-invalid, no aria-describedby, no role="alert".
 * - UX: No focus management on error, no loading state, uses browser alert().
 */
export default function SettingsFormVague() {
  const [formData, setFormData] = useState({
    projectName: '',
    targetDomain: '',
    searchEngine: 'google',
    crawlFrequency: 'daily',
    alertThreshold: '',
    email: '',
    enableAiOverview: false,
    apiKey: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    // AI Mistake 1: Accepts pure whitespace like "   "
    if (!formData.projectName) {
      newErrors.projectName = 'Project name is required';
    }

    // AI Mistake 2: Accepts any string (e.g. "http://", "notadomain")
    if (!formData.targetDomain) {
      newErrors.targetDomain = 'Target domain is required';
    }

    // AI Mistake 3: Naive check accepts "@" or "user@"
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }

    // AI Mistake 4: Accepts 0, negative numbers (-10), or absurd values (99999)
    if (!formData.alertThreshold) {
      newErrors.alertThreshold = 'Threshold is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
      alert('Settings saved successfully!');
    }
  };

  return (
    <div className="vague-settings-card">
      <div className="vague-badge">Round 1: Vague Prompt Output</div>
      <h2>FlyRankAI Settings (Round 1)</h2>
      <p className="vague-subtitle">Built with a single vague prompt without constraints.</p>

      {submitted && <div className="vague-success">Settings saved!</div>}

      <form onSubmit={handleSubmit} noValidate>
        {/* Missing htmlFor association */}
        <div className="vague-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="e.g. FlyRank Main"
          />
          {errors.projectName && <span className="vague-error">{errors.projectName}</span>}
        </div>

        {/* Missing htmlFor & aria tags */}
        <div className="vague-group">
          <label>Target Domain / URL:</label>
          <input
            type="text"
            name="targetDomain"
            value={formData.targetDomain}
            onChange={handleChange}
            placeholder="e.g. example.com"
          />
          {errors.targetDomain && <span className="vague-error">{errors.targetDomain}</span>}
        </div>

        <div className="vague-group">
          <label>Search Engine:</label>
          <select name="searchEngine" value={formData.searchEngine} onChange={handleChange}>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="duckduckgo">DuckDuckGo</option>
          </select>
        </div>

        <div className="vague-group">
          <label>Crawl Frequency:</label>
          <select name="crawlFrequency" value={formData.crawlFrequency} onChange={handleChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Accepts negative or zero */}
        <div className="vague-group">
          <label>Alert Drop Threshold (rank positions):</label>
          <input
            type="number"
            name="alertThreshold"
            value={formData.alertThreshold}
            onChange={handleChange}
            placeholder="e.g. 5"
          />
          {errors.alertThreshold && <span className="vague-error">{errors.alertThreshold}</span>}
        </div>

        <div className="vague-group">
          <label>Notification Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.com"
          />
          {errors.email && <span className="vague-error">{errors.email}</span>}
        </div>

        <div className="vague-group vague-checkbox">
          <label>
            <input
              type="checkbox"
              name="enableAiOverview"
              checked={formData.enableAiOverview}
              onChange={handleChange}
            />
            Track Google AI Overviews & SGE
          </label>
        </div>

        <div className="vague-group">
          <label>API Key:</label>
          <input
            type="password"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            placeholder="fk_..."
          />
        </div>

        <button type="submit" className="vague-submit-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
}
