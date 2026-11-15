/**
 * @file test_creator.js
 * @description Automated test suite for 1nsharma-labs/creator-os.
 * Validates hook analyzer, retention predictor, title engine, heatmap, 100B index, 2046 synapse, and MCP tools.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { HookAnalyzer } from '../core/src/hook_analyzer.js';
import { RetentionPredictor } from '../core/src/retention_predictor.js';
import { TitleEngine } from '../core/src/title_engine.js';
import { SaliencyHeatmap } from '../core/src/saliency_heatmap.js';
import { ContentIndex } from '../core/src/content_index.js';
import { NeuralSynapse2046 } from '../core/src/neural_synapse_2046.js';
import { MCPServer } from '../core/src/mcp.js';

describe('Creator-OS Core Suite', () => {
  test('HookAnalyzer scores high-converting hooks and calculates 3s retention', () => {
    const analyzer = new HookAnalyzer();
    const result = analyzer.analyze('This one coding mistake cost Google 400 million dollars in 12 minutes.');

    assert.ok(result.scores.hookScore > 70, 'Hook score should exceed 70 for high stakes');
    assert.ok(result.scores.projected3sRetention >= 80, 'Projected 3s retention should be >= 80%');
    assert.strictEqual(result.wordCount, 12);
    assert.ok(result.recommendations.length > 0);
  });

  test('HookAnalyzer handles empty strings gracefully', () => {
    const analyzer = new HookAnalyzer();
    const result = analyzer.analyze('');

    assert.strictEqual(result.wordCount, 0);
    assert.ok(result.scores.hookScore <= 40);
  });

  test('RetentionPredictor simulates 0-100% curve points and APV', () => {
    const predictor = new RetentionPredictor();
    const result = predictor.predict({ durationSec: 600, hookScore: 85, pacingCutsPerMin: 8 });

    assert.strictEqual(result.curvePoints.length, 11);
    assert.strictEqual(result.curvePoints[0].timelinePercent, 0);
    assert.strictEqual(result.curvePoints[0].retentionPercent, 100);
    assert.ok(result.averagePercentageViewed > 45, 'APV should be > 45%');
    assert.ok(result.viralScore > 60);
    assert.strictEqual(result.cliffs.length, 3);
  });

  test('TitleEngine evaluates mobile feed safety and generates 5 variants', () => {
    const engine = new TitleEngine();
    const score = engine.analyze('Stop Making This Huge Mistake in React Architecture');

    assert.ok(score.mobileSafe, 'Title length 50 chars should be mobile-safe');
    assert.ok(score.score > 60);
    assert.ok(score.predictedCTR.includes('%'));

    const variants = engine.generateVariants('Cloud Computing');
    assert.strictEqual(variants.length, 5);
    assert.ok(variants[0].angle.includes('Loss Aversion'));
    assert.ok(variants[0].projectedCTR.includes('%'));
  });

  test('SaliencyHeatmap calculates 3x3 attention grid and detects timestamp zone', () => {
    const heatmap = new SaliencyHeatmap();
    const result = heatmap.evaluate({ hasFace: true, facePosition: 'left', wordCount: 3, avoidsTimestamp: true });

    assert.strictEqual(result.heatmap3x3.length, 3);
    assert.strictEqual(result.heatmap3x3[0].length, 3);
    assert.ok(result.overallSaliencyScore >= 75);
    assert.strictEqual(result.focalPoint, 'Upper-Left Quad');
  });

  test('ContentIndex queries 104.8B data points across 12 niches', () => {
    const index = new ContentIndex();
    assert.ok(index.totalIndexedDataPoints > 100000000000);

    const niches = index.listNiches();
    assert.strictEqual(niches.length, 12);

    const tech = index.getNiche('tech-ai');
    assert.strictEqual(tech.name, 'AI, Technology & Engineering');
    assert.ok(tech.topHooks.length >= 3);
  });

  test('NeuralSynapse2046 simulates Year 2046 MAX holographic immersion', () => {
    const synapse = new NeuralSynapse2046();
    const report = synapse.simulate({ contentFormat: 'holographic-6dof', emotionalArousal: 88, sensoryChannels: 5 });

    assert.strictEqual(report.specVersion, '2046.1.0-MAX');
    assert.ok(report.metrics.maxImmersionScore >= 80);
    assert.ok(report.biometricTelemetry.targetNeuralBand.includes('Gamma'));
    assert.ok(report.biometricTelemetry.pupilDilationDelta.startsWith('+'));
  });

  test('MCPServer exposes 7 tools and handles tool calls correctly', () => {
    const mcp = new MCPServer();
    assert.strictEqual(mcp.tools.length, 7);

    const hookRes = mcp.handleToolCall('creator_analyze_hook', { text: 'Why did this simple script crash the entire cloud?' });
    assert.ok(hookRes.scores.hookScore > 50);

    const titleRes = mcp.handleToolCall('creator_score_title', { title: 'How to Build an AI OS' });
    assert.ok(titleRes.score > 40);

    const nicheRes = mcp.handleToolCall('creator_query_100b_index', { niche: 'coding-tutorials' });
    assert.strictEqual(nicheRes.name, 'Software Development & Architecture');

    const synapseRes = mcp.handleToolCall('creator_simulate_2046_synapse', { contentFormat: 'direct-neural-bci', emotionalArousal: 90 });
    assert.ok(synapseRes.metrics.maxImmersionScore >= 85);
  });
});
