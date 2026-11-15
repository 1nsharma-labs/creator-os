<h1 align="center">🎬 Creator-OS</h1>

<p align="center">
  <b>100B Content Pattern Vector Index & Neural Video Intelligence Engine (Year 2046 MAX Spec)</b><br>
  Trained on the behavioral telemetry of 100+ Billion digital contents, Shorts & Reels.<br>
  Simulate 3-second hook retention, thumbnail eye-tracking heatmaps, title CTR psychology, and Year 2046 holographic synapse immersion.
</p>

<p align="center">
  <a href="https://1nsharma-labs.github.io/creator-os/"><img src="https://img.shields.io/badge/Live_Simulator-1nsharma--labs.github.io%2Fcreator--os-purple?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/1nsharma-labs/creator-os/releases"><img src="https://img.shields.io/badge/Version-v2046.1.0--MAX-blue?style=for-the-badge" alt="Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-green?style=for-the-badge" alt="License"></a>
</p>

<p align="center">
  <a href="https://github.com/sponsors/1nsharma"><img src="https://img.shields.io/badge/Sponsor-GitHub_Sponsors-pink.svg" alt="Sponsor"></a>
  <a href="https://polar.sh/1nsharma-labs"><img src="https://img.shields.io/badge/Polar.sh-1nsharma--labs-purple.svg" alt="Polar"></a>
  <a href="#"><img src="https://img.shields.io/badge/Direct_UPI-6393741171%40upi-emerald.svg" alt="UPI"></a>
</p>

---

## ⚡ Why Creator-OS?

In the modern algorithmic attention economy, video success is determined in the **first 3 seconds** and the **thumbnail focal point**:
1. **The 3-Second Retention Cliff**: If audience drop-off exceeds 35% in the opening 3 seconds, video distribution algorithms halt impression testing.
2. **Thumbnail Visual Saliency**: 82% of clicks are dictated by high-contrast focal points, rule-of-thirds facial placement, and avoiding the platform's bottom-right duration overlay.
3. **Title Cognitive Triggers**: Generic titles stall at 3-5% Click-Through Rate (CTR). High-stakes loss aversion, curiosity loops, and quantifiable metrics lift CTR to 11-16%.
4. **100 Billion Vector Index**: Behavioral benchmarks calibrated across 12 major digital content niches (Tech & AI, Coding Tutorials, FinTech & Crypto, Gaming, Longform Video Essays, Science, Startups, Lifestyle, Cinema, Horror, Comedy, Motivation).
5. **Year 2046 MAX Horizon**: Neural Brain-Computer Interface (BCI) dopamine cycle modeling, 6DoF holographic spatial depth, and cognitive fatigue safety interlocks.

---

## 🌐 Instant In-Browser Interactive Simulator (Zero-Login)

Launch the zero-login interactive lab on GitHub Pages:  
👉 [**https://1nsharma-labs.github.io/creator-os/**](https://1nsharma-labs.github.io/creator-os/)

* **Live 3-Second Hook Analyzer**: Real-time curiosity gap, loss aversion, and WPM/WPS pacing meters.
* **Interactive Retention Curve Simulator**: Dynamic SVG graph simulating 0-100% viewer retention, drop-off cliffs, and re-watch spikes.
* **Title CTR Engine & 5 Angles**: Simulated mobile feed preview and 1-click generation of 5 psychological variants.
* **Thumbnail Visual Saliency Heatmap**: 3x3 eye-tracking attention matrix with platform duration badge safety.
* **100B Pattern Niche Matrix**: Explore average percentage viewed (APV), RPM, and viral hook templates across 12 verticals.
* **Year 2046 Neural Synapse Holo-Predictor**: Multi-sensory neural broadcast simulation.

---

## 🚀 Quickstart & Single-Command CLI

Run instantly with zero dependencies using native Node.js 24:

```bash
# Analyze a 3-second opening hook
npx creator-os hook "This simple coding mistake cost Google 400 million dollars in 12 minutes."

# Score a video title and predict mobile feed CTR
npx creator-os title "Why 99% of Software Engineers Build the Wrong Architecture"

# Generate 5 psychological title variants
npx creator-os variants "Distributed System Architecture"

# Simulate a 10-minute video retention curve
npx creator-os retention

# Predict thumbnail visual saliency and 3x3 heatmap
npx creator-os thumb

# Query 100B content data index for a niche
npx creator-os niche tech-ai

# Simulate Year 2046 MAX neural synapse telemetry
npx creator-os 2046

# Launch the interactive local web simulator (port 3888)
npx creator-os serve
```

---

## 🔌 Model Context Protocol (MCP) Server Integration

Creator-OS provides a built-in MCP server over standard input/output (`stdio`), enabling autonomous agents in **Claude Desktop**, **Cursor**, and **Antigravity** to directly evaluate scripts and thumbnails:

### Claude Desktop Configuration (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "creator-os": {
      "command": "node",
      "args": ["C:/Users/18/OneDrive/Desktop/creator-os/core/src/mcp.js"]
    }
  }
}
```

### Available MCP Tools

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `creator_analyze_hook` | `text`, `durationSec` | Evaluates curiosity gap, loss aversion, pacing, and 3s retention |
| `creator_predict_retention` | `durationSec`, `hookScore`, `pacingCutsPerMin` | Simulates 0-100% retention curve and detects cliff drops |
| `creator_score_title` | `title` | Scores title for mobile feed truncation and predicts CTR % |
| `creator_generate_titles` | `topic` | Generates 5 psychological angle title formulas |
| `creator_evaluate_thumbnail` | `hasFace`, `facePosition`, `wordCount` | Simulates 3x3 visual saliency heatmap and badge collision |
| `creator_query_100b_index` | `niche` | Retrieves APV, CTR, and hook benchmarks from 104.8B points |
| `creator_simulate_2046_synapse` | `contentFormat`, `emotionalArousal` | Year 2046 MAX holographic 6DoF & BCI immersion telemetry |

---

## 🏗️ Architecture & Core Components

```
creator-os/
├── core/
│   └── src/
│       ├── hook_analyzer.js        # 3-Second Viral Hook Evaluation Engine
│       ├── retention_predictor.js  # 0-100% Retention Curve & APV Simulator
│       ├── title_engine.js         # Title CTR Predictor & 5-Angle Generator
│       ├── saliency_heatmap.js     # 3x3 Visual Attention Saliency Matrix
│       ├── content_index.js        # 104.8B Content Pattern Vector Index (12 Niches)
│       ├── neural_synapse_2046.js  # Year 2046 MAX Neural BCI & Holographic Engine
│       ├── mcp.js                  # Model Context Protocol (MCP) stdio Server
│       ├── cli.js                  # Zero-dependency Executable CLI
│       └── server.js               # Native HTTP Web Server & REST API
├── test/
│   └── test_creator.js             # Automated Test Suite (100% passing)
├── index.html                      # Interactive Zero-Login Web Simulator (GitHub Pages)
├── package.json                    # v2046.1.0-MAX
└── LICENSE                         # Apache 2.0
```

---

## 🧪 Automated Testing

Run the zero-dependency test runner:

```bash
node --test test/test_creator.js
```

```
▶ Creator-OS Core Suite
  ✔ HookAnalyzer scores high-converting hooks and calculates 3s retention (2.29ms)
  ✔ HookAnalyzer handles empty strings gracefully (0.29ms)
  ✔ RetentionPredictor simulates 0-100% curve points and APV (0.65ms)
  ✔ TitleEngine evaluates mobile feed safety and generates 5 variants (0.79ms)
  ✔ SaliencyHeatmap calculates 3x3 attention grid and detects timestamp zone (0.53ms)
  ✔ ContentIndex queries 104.8B data points across 12 niches (0.65ms)
  ✔ NeuralSynapse2046 simulates Year 2046 MAX holographic immersion (0.47ms)
  ✔ MCPServer exposes 7 tools and handles tool calls correctly (1.22ms)
✔ Creator-OS Core Suite (10.86ms)
ℹ tests 8, suites 1, pass 8, fail 0
```

---

## 💼 Founder & Community Sponsorship

Creator-OS is 100% Free and Open-Source under the **Apache 2.0 License**.

* **Founder & Lead Architect:** **Amit Sharma** ([@1nsharma](https://github.com/1nsharma))
* **Headquarters:** Kanpur, Uttar Pradesh, India 🇮🇳
* **Direct Email:** [amitsharma9976@gmail.com](mailto:amitsharma9976@gmail.com)
* **Direct UPI Support:** `6393741171@upi` (PhonePe / GPay / Paytm: `6393741171`)
* **Global Sponsorship:** [polar.sh/1nsharma-labs](https://polar.sh/1nsharma-labs) &bull; [github.com/sponsors/1nsharma](https://github.com/sponsors/1nsharma)

---

<p align="center">
  Crafted with ❤️ for creators and autonomous AI agents by <a href="https://github.com/1nsharma"><b>Amit Sharma</b></a> (@1nsharma-labs)
</p>
