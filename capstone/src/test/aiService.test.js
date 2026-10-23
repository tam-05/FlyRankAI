import { describe, it, expect } from 'vitest';
import { validateAuditResult, generateHeuristicAudit } from '../services/aiService';

describe('aiService - Validation & Fallback Heuristics', () => {
  it('sanitizes and bounds winProbability between 0 and 100', () => {
    const rawHigh = { winProbability: 150, citationStatus: 'Won' };
    const validatedHigh = validateAuditResult(rawHigh);
    expect(validatedHigh.winProbability).toBe(100);

    const rawLow = { winProbability: -20, citationStatus: 'Absent' };
    const validatedLow = validateAuditResult(rawLow);
    expect(validatedLow.winProbability).toBe(0);

    const rawDefault = {};
    const validatedDefault = validateAuditResult(rawDefault);
    expect(validatedDefault.winProbability).toBe(50);
  });

  it('infers citation status accurately based on probability score if omitted', () => {
    const high = validateAuditResult({ winProbability: 85 });
    expect(high.citationStatus).toBe('Won');

    const mid = validateAuditResult({ winProbability: 55 });
    expect(mid.citationStatus).toBe('Cited');

    const low = validateAuditResult({ winProbability: 25 });
    expect(low.citationStatus).toBe('Absent');
  });

  it('generates rich, deterministic heuristic analysis when API key is omitted', () => {
    const audit = generateHeuristicAudit({
      query: 'enterprise generative search optimization',
      targetUrl: 'https://flyrank.ai/platform',
      contentSample: 'Generative search optimization requires definitive answer definitions and verified data benchmarks.',
      engine: 'google',
    });

    expect(audit.winProbability).toBeGreaterThan(0);
    expect(audit.winProbability).toBeLessThanOrEqual(100);
    expect(audit.isFallback).toBe(true);
    expect(audit.citationLinks.length).toBeGreaterThan(0);
    expect(audit.actionableRecommendations.length).toBeGreaterThan(0);
    expect(audit.simulatedAiOverview).toContain('generative search optimization');
    expect(audit.citationLinks[0].domain).toBe('flyrank.ai');
  });

  it('handles missing input parameters gracefully without throwing', () => {
    const emptyAudit = generateHeuristicAudit({});
    expect(emptyAudit).toBeDefined();
    expect(emptyAudit.winProbability).toBeTypeOf('number');
    expect(Array.isArray(emptyAudit.missingEntities)).toBe(true);
    expect(Array.isArray(emptyAudit.schemaFixes)).toBe(true);
  });
});
