/**
 * @file mcp.js
 * @description Model Context Protocol (MCP) Server for Creator-OS.
 * Connects Creator-OS tools to Claude Desktop, Cursor, Antigravity, and AI agents.
 * Part of 1nsharma-labs/creator-os
 */

import { HookAnalyzer } from './hook_analyzer.js';
import { RetentionPredictor } from './retention_predictor.js';
import { TitleEngine } from './title_engine.js';
import { SaliencyHeatmap } from './saliency_heatmap.js';
import { ContentIndex } from './content_index.js';
import { NeuralSynapse2046 } from './neural_synapse_2046.js';

export class MCPServer {
  constructor() {
    this.hookAnalyzer = new HookAnalyzer();
    this.retentionPredictor = new RetentionPredictor();
    this.titleEngine = new TitleEngine();
    this.saliencyHeatmap = new SaliencyHeatmap();
    this.contentIndex = new ContentIndex();
    this.neuralSynapse = new NeuralSynapse2046();

    this.tools = [
      {
        name: 'creator_analyze_hook',
        description: 'Analyzes the first 3 seconds of a video or short script to predict viewer retention, curiosity gap, and loss aversion.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Opening 1-3 sentences or hook text.' },
            durationSec: { type: 'number', description: 'Target hook window in seconds (default 3).' }
          },
          required: ['text']
        }
      },
      {
        name: 'creator_predict_retention',
        description: 'Simulates the entire viewer retention curve (0-100% time), identifying drop-off cliffs and calculating viral potential.',
        inputSchema: {
          type: 'object',
          properties: {
            durationSec: { type: 'number', description: 'Total video duration in seconds.' },
            hookScore: { type: 'number', description: 'Hook score (0-100).' },
            pacingCutsPerMin: { type: 'number', description: 'Visual scene cuts / b-roll changes per minute.' },
            hasCuriosityLoop: { type: 'boolean', description: 'Whether the narrative holds an unresolved curiosity loop.' }
          }
        }
      },
      {
        name: 'creator_score_title',
        description: 'Scores a video title for mobile truncation, power words, specificity, and predicts Click-Through Rate (CTR %).',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Video title to evaluate.' }
          },
          required: ['title']
        }
      },
      {
        name: 'creator_generate_titles',
        description: 'Generates 5 psychological angle title variants (loss aversion, curiosity gap, extreme challenge, contrarian, data).',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Core video topic or idea.' }
          },
          required: ['topic']
        }
      },
      {
        name: 'creator_evaluate_thumbnail',
        description: 'Evaluates thumbnail visual saliency, face focal bias, 3x3 rule-of-thirds contrast, and timestamp collision.',
        inputSchema: {
          type: 'object',
          properties: {
            hasFace: { type: 'boolean', description: 'Whether thumbnail features a human face.' },
            facePosition: { type: 'string', enum: ['left', 'center', 'right'], description: 'Position of face.' },
            wordCount: { type: 'number', description: 'Word count on thumbnail image.' },
            colorContrast: { type: 'string', enum: ['low', 'medium', 'high'] }
          }
        }
      },
      {
        name: 'creator_query_100b_index',
        description: 'Queries behavioral benchmarks (APV, CTR, RPM, viral hooks) across 12 niches trained on 100B content data points.',
        inputSchema: {
          type: 'object',
          properties: {
            niche: { type: 'string', description: 'Niche key (e.g. tech-ai, coding-tutorials, fintech-money, gaming-streaming).' }
          }
        }
      },
      {
        name: 'creator_simulate_2046_synapse',
        description: 'Year 2046 MAX Spec: Simulates holographic 6DoF immersion, neural BCI dopamine cycles, and sensory bandwidth.',
        inputSchema: {
          type: 'object',
          properties: {
            contentFormat: { type: 'string', enum: ['flat-2d', 'spatial-vr', 'holographic-6dof', 'direct-neural-bci'] },
            emotionalArousal: { type: 'number', description: '0-100 emotional excitation level.' },
            sensoryChannels: { type: 'number', description: 'Number of sensory streams (1-5).' }
          }
        }
      }
    ];
  }

  handleToolCall(name, args = {}) {
    switch (name) {
      case 'creator_analyze_hook':
        return this.hookAnalyzer.analyze(args.text, args.durationSec || 3);
      case 'creator_predict_retention':
        return this.retentionPredictor.predict(args);
      case 'creator_score_title':
        return this.titleEngine.analyze(args.title);
      case 'creator_generate_titles':
        return this.titleEngine.generateVariants(args.topic);
      case 'creator_evaluate_thumbnail':
        return this.saliencyHeatmap.evaluate(args);
      case 'creator_query_100b_index':
        return this.contentIndex.getNiche(args.niche);
      case 'creator_simulate_2046_synapse':
        return this.neuralSynapse.simulate(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  startStdio() {
    process.stdin.setEncoding('utf8');
    let buffer = '';

    process.stdin.on('data', chunk => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const req = JSON.parse(line);
          const res = this.processRequest(req);
          if (res) {
            process.stdout.write(JSON.stringify(res) + '\n');
          }
        } catch (err) {
          process.stdout.write(JSON.stringify({
            jsonrpc: '2.0',
            id: null,
            error: { code: -32700, message: 'Parse error', data: String(err) }
          }) + '\n');
        }
      }
    });
  }

  processRequest(req) {
    const { id, method, params } = req;

    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: 'creator-os-mcp',
            version: '2046.1.0'
          },
          capabilities: {
            tools: {}
          }
        }
      };
    }

    if (method === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: this.tools
        }
      };
    }

    if (method === 'tools/call') {
      try {
        const result = this.handleToolCall(params.name, params.arguments || {});
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2)
              }
            ]
          }
        };
      } catch (err) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32603,
            message: err.message
          }
        };
      }
    }

    return {
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    };
  }
}

if (process.argv[1] && process.argv[1].endsWith('mcp.js')) {
  const server = new MCPServer();
  server.startStdio();
}
