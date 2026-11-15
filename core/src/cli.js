#!/usr/bin/env node

/**
 * @file cli.js
 * @description Zero-dependency CLI for 1nsharma-labs/creator-os.
 * Evaluates hooks, titles, retention curves, thumbnails, and 100B content data patterns.
 */

import { HookAnalyzer } from './hook_analyzer.js';
import { RetentionPredictor } from './retention_predictor.js';
import { TitleEngine } from './title_engine.js';
import { SaliencyHeatmap } from './saliency_heatmap.js';
import { ContentIndex } from './content_index.js';
import { NeuralSynapse2046 } from './neural_synapse_2046.js';
import { MCPServer } from './mcp.js';
import { startServer } from './server.js';

const BANNER = `
\x1b[35m   ██████╗██████╗ ███████╗ █████╗ ████████╗ ██████╗ ██████╗      ██████╗ ███████╗
  ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗    ██╔═══██╗██╔════╝
  ██║     ██████╔╝█████╗  ███████║   ██║   ██║   ██║██████╔╝    ██║   ██║███████╗
  ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██║   ██║██╔══██╗    ██║   ██║╚════██║
  ╚██████╗██║  ██║███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║    ╚██████╔╝███████║
   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝     ╚═════╝ ╚══════╝\x1b[0m
  \x1b[1m\x1b[36m100B Content Pattern Vector Index & Neural Video Intelligence Engine (Year 2046 MAX)\x1b[0m
  \x1b[90mBuilt with ❤️ by Amit Sharma (@1nsharma) • Kanpur, India • 1nsharma-labs\x1b[0m
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'hook': {
      const text = args.slice(1).join(' ');
      if (!text) {
        console.log(BANNER);
        console.log('\x1b[31mError: Please provide a hook script or sentence to analyze.\x1b[0m');
        console.log('Usage: creator-os hook "This simple mistake destroyed my entire business."\n');
        process.exit(1);
      }
      const analyzer = new HookAnalyzer();
      const res = analyzer.analyze(text);
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m🎯 3-Second Viral Hook Analysis:\x1b[0m`);
      console.log(`  \x1b[36mHook Text:\x1b[0m "${res.text}"`);
      console.log(`  \x1b[36mWord Count:\x1b[0m ${res.wordCount} words (${res.wordsPerSec} wps)`);
      console.log(`  \x1b[32mHook Score:\x1b[0m \x1b[1m${res.scores.hookScore}/100\x1b[0m`);
      console.log(`  \x1b[35mProjected 3s Retention:\x1b[0m \x1b[1m${res.scores.projected3sRetention}%\x1b[0m [${res.retentionVerdict}]`);
      console.log(`  \x1b[90mCuriosity: ${res.scores.curiosityScore}/100 | Loss Aversion: ${res.scores.lossAversionScore}/100 | Pacing: ${res.scores.pacingScore}/100\x1b[0m`);
      console.log(`\n\x1b[1m💡 Actionable Recommendations:\x1b[0m`);
      res.recommendations.forEach(r => console.log(`  • ${r}`));
      console.log();
      break;
    }

    case 'title': {
      const title = args.slice(1).join(' ');
      if (!title) {
        console.log(BANNER);
        console.log('\x1b[31mError: Please provide a video title to score.\x1b[0m');
        console.log('Usage: creator-os title "Why 99% of Developers Are Doing It Wrong"\n');
        process.exit(1);
      }
      const engine = new TitleEngine();
      const res = engine.analyze(title);
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m📊 Title CTR & Mobile Feed Score:\x1b[0m`);
      console.log(`  \x1b[36mTitle:\x1b[0m "${res.title}"`);
      console.log(`  \x1b[36mLength:\x1b[0m ${res.charCount} characters (${res.wordCount} words)`);
      console.log(`  \x1b[36mMobile Feed Safe:\x1b[0m ${res.mobileSafe ? '✅ Yes (No cut-off)' : '⚠️ Warning: Truncated on mobile'}`);
      console.log(`  \x1b[32mPredicted CTR:\x1b[0m \x1b[1m${res.predictedCTR}\x1b[0m [${res.ctrRating}]`);
      console.log(`  \x1b[35mComposite Score:\x1b[0m ${res.score}/100`);
      if (res.improvements.length > 0) {
        console.log(`\n\x1b[1m💡 Optimization Suggestions:\x1b[0m`);
        res.improvements.forEach(i => console.log(`  • ${i}`));
      }
      console.log();
      break;
    }

    case 'variants': {
      const topic = args.slice(1).join(' ') || 'Software Engineering';
      const engine = new TitleEngine();
      const variants = engine.generateVariants(topic);
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m⚡ 5 High-Converting Viral Angles for:\x1b[0m "${topic}"\n`);
      variants.forEach((v, idx) => {
        console.log(`  \x1b[36m[${idx + 1}] ${v.angle}\x1b[0m (Projected CTR: \x1b[32m${v.projectedCTR}\x1b[0m)`);
        console.log(`      \x1b[1m"${v.title}"\x1b[0m`);
        console.log(`      \x1b[90mPsychology: ${v.psychology}\x1b[0m\n`);
      });
      break;
    }

    case 'retention': {
      const predictor = new RetentionPredictor();
      const res = predictor.predict({ durationSec: 600, hookScore: 82 });
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m📈 10-Minute Video Retention Curve Simulation:\x1b[0m`);
      console.log(`  \x1b[36mAverage Percentage Viewed (APV):\x1b[0m \x1b[1m${res.averagePercentageViewed}%\x1b[0m`);
      console.log(`  \x1b[32mViral Potential Index:\x1b[0m \x1b[1m${res.viralScore}/100\x1b[0m (${res.retentionVerdict})`);
      console.log(`\n\x1b[1m  Timeline Graph:\x1b[0m`);
      res.curvePoints.forEach(p => {
        const bar = '█'.repeat(Math.round(p.retentionPercent / 3));
        console.log(`  ${String(p.timelinePercent).padStart(3)}% (${String(p.timeSeconds).padStart(3)}s) | \x1b[35m${bar}\x1b[0m ${p.retentionPercent}%`);
      });
      console.log();
      break;
    }

    case 'thumb': {
      const heatmap = new SaliencyHeatmap();
      const res = heatmap.evaluate({ hasFace: true, facePosition: 'left', wordCount: 3, colorContrast: 'high' });
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m🖼️ Thumbnail Saliency & Heatmap Prediction:\x1b[0m`);
      console.log(`  \x1b[36mOverall Saliency Score:\x1b[0m \x1b[1m${res.overallSaliencyScore}/100\x1b[0m (${res.saliencyVerdict})`);
      console.log(`  \x1b[36mPrimary Focal Point:\x1b[0m ${res.focalPoint}`);
      console.log(`\n  \x1b[1m3x3 Visual Attention Matrix:\x1b[0m`);
      res.heatmap3x3.forEach(row => {
        console.log(`    [ ${row.map(val => String(val).padStart(3) + '%').join(' | ')} ]`);
      });
      console.log();
      break;
    }

    case 'niche': {
      const nicheKey = args[1] || 'tech-ai';
      const index = new ContentIndex();
      const data = index.getNiche(nicheKey);
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[33m🌐 100B Pattern Benchmark: ${data.name}\x1b[0m`);
      console.log(`  \x1b[36mTotal Indexed Points:\x1b[0m ${data.indexedCount}`);
      console.log(`  \x1b[36mBenchmark APV:\x1b[0m ${data.benchmarkAPV} | \x1b[36mAvg CTR:\x1b[0m ${data.avgCTR}`);
      console.log(`  \x1b[32mEstimated RPM:\x1b[0m ${data.rpmRangeUSD}`);
      console.log(`  \x1b[35mDominant Hook Archetype:\x1b[0m ${data.dominantHookType}`);
      console.log(`\n\x1b[1m  Top Viral Hook Formulas:\x1b[0m`);
      data.topHooks.forEach(h => console.log(`  • "${h}"`));
      console.log();
      break;
    }

    case '2046': {
      const synapse = new NeuralSynapse2046();
      const res = synapse.simulate({ contentFormat: 'holographic-6dof', emotionalArousal: 88 });
      console.log(BANNER);
      console.log(`\x1b[1m\x1b[35m🔮 Year 2046 MAX Neural Synapse Telemetry:\x1b[0m`);
      console.log(`  \x1b[36mSpec:\x1b[0m ${res.specVersion} | \x1b[36mFormat:\x1b[0m ${res.contentFormat}`);
      console.log(`  \x1b[32mMax Immersion Score:\x1b[0m \x1b[1m${res.metrics.maxImmersionScore}/100\x1b[0m [${res.verdict}]`);
      console.log(`  \x1b[36mDopamine Resonance:\x1b[0m ${res.metrics.dopamineResonance}%`);
      console.log(`  \x1b[36mTarget Neural Band:\x1b[0m ${res.biometricTelemetry.targetNeuralBand}`);
      console.log(`  \x1b[36mPupil Dilation Surge:\x1b[0m ${res.biometricTelemetry.pupilDilationDelta}`);
      console.log(`  \x1b[36mRetention Resistance:\x1b[0m ${res.biometricTelemetry.retentionDecayResistance}`);
      console.log();
      break;
    }

    case 'serve': {
      const port = parseInt(args[1] || '3888', 10);
      startServer(port);
      break;
    }

    case 'mcp': {
      const server = new MCPServer();
      server.startStdio();
      break;
    }

    case 'help':
    default:
      console.log(BANNER);
      console.log(`\x1b[1mCommands:\x1b[0m`);
      console.log(`  \x1b[36mhook <text>\x1b[0m           Analyze 3-second opening hook retention & psychology`);
      console.log(`  \x1b[36mtitle <title>\x1b[0m         Score title CTR & mobile feed truncation risk`);
      console.log(`  \x1b[36mvariants <topic>\x1b[0m      Generate 5 psychological angle title formulas`);
      console.log(`  \x1b[36mretention\x1b[0m             Simulate 0-100% video retention curve and cliff drops`);
      console.log(`  \x1b[36mthumb\x1b[0m                 Predict thumbnail visual saliency and 3x3 heatmap`);
      console.log(`  \x1b[36mniche [category]\x1b[0m      Query 100B content data index for niche benchmarks`);
      console.log(`  \x1b[36m2046\x1b[0m                  Simulate Year 2046 MAX holographic neural immersion`);
      console.log(`  \x1b[36mserve [port]\x1b[0m          Launch interactive local web simulator (default 3888)`);
      console.log(`  \x1b[36mmcp\x1b[0m                   Start stdio Model Context Protocol (MCP) server`);
      console.log();
      break;
  }
}

main().catch(err => {
  console.error('\x1b[31mFatal error:\x1b[0m', err);
  process.exit(1);
});
