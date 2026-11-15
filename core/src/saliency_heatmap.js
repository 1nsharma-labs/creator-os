/**
 * @file saliency_heatmap.js
 * @description Thumbnail Visual Saliency & Focal Point Predictor.
 * Simulates human visual eye tracking, rule-of-thirds contrast, and timestamp collision.
 * Part of 1nsharma-labs/creator-os
 */

export class SaliencyHeatmap {
  /**
   * Simulates visual attention and saliency across a thumbnail composition.
   * @param {Object} options
   * @param {boolean} [options.hasFace=true] - Contains human face with visible emotional expression.
   * @param {string} [options.facePosition='left'] - 'left', 'center', or 'right'.
   * @param {number} [options.wordCount=3] - Number of text words on thumbnail.
   * @param {string} [options.colorContrast='high'] - 'low', 'medium', 'high'.
   * @param {boolean} [options.avoidsTimestamp=true] - Keeps bottom-right corner clear of YouTube timestamp badge.
   * @returns {Object} Saliency analysis & 3x3 heatmap grid
   */
  evaluate({
    hasFace = true,
    facePosition = 'left',
    wordCount = 3,
    colorContrast = 'high',
    avoidsTimestamp = true
  } = {}) {
    // 3x3 grid coordinates:
    // [0,0] Top-Left     [0,1] Top-Center     [0,2] Top-Right
    // [1,0] Mid-Left     [1,1] Mid-Center     [1,2] Mid-Right
    // [2,0] Bottom-Left  [2,1] Bottom-Center  [2,2] Bottom-Right (Timestamp danger zone)

    const grid = [
      [35, 40, 30],
      [50, 60, 45],
      [30, 35, 20]
    ];

    // 1. Face Focal Bias: Eyes and human expressions pull 60%+ of visual attention
    if (hasFace) {
      if (facePosition === 'left') {
        grid[0][0] += 30;
        grid[1][0] += 40;
      } else if (facePosition === 'center') {
        grid[0][1] += 35;
        grid[1][1] += 45;
      } else {
        grid[0][2] += 30;
        grid[1][2] += 40;
      }
    }

    // 2. Text Placement (usually opposite side of face)
    if (wordCount > 0 && wordCount <= 4) {
      const textCol = facePosition === 'left' ? 2 : 0;
      grid[0][textCol] += 25;
      grid[1][textCol] += 30;
    } else if (wordCount > 5) {
      // Cluttered text penalty spreads attention too thinly
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          grid[r][c] = Math.max(10, grid[r][c] - 15);
        }
      }
    }

    // 3. Contrast Multiplier
    const contrastMult = colorContrast === 'high' ? 1.2 : (colorContrast === 'medium' ? 1.0 : 0.75);

    // 4. Timestamp Collision Check
    // YouTube's black timestamp box covers [2,2] on every platform.
    if (!avoidsTimestamp) {
      grid[2][2] = Math.max(10, grid[2][2] - 25);
    }

    // Normalize grid values to 0 - 100
    let maxVal = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        grid[r][c] = Math.min(100, Math.round(grid[r][c] * contrastMult));
        if (grid[r][c] > maxVal) maxVal = grid[r][c];
      }
    }

    // Compute composite saliency score
    const focalConcentration = Math.round((maxVal / 100) * 85);
    const textPenalty = wordCount > 4 ? (wordCount - 4) * 8 : 0;
    const timestampPenalty = avoidsTimestamp ? 0 : 25;

    const overallSaliencyScore = Math.min(100, Math.max(20, focalConcentration - textPenalty - timestampPenalty + (colorContrast === 'high' ? 15 : 0)));

    return {
      hasFace,
      facePosition,
      wordCount,
      colorContrast,
      avoidsTimestamp,
      overallSaliencyScore,
      focalPoint: facePosition === 'left' ? 'Upper-Left Quad' : (facePosition === 'center' ? 'Dead Center' : 'Upper-Right Quad'),
      saliencyVerdict: overallSaliencyScore >= 80 ? 'High-Impact Thumb (Thumb-Stopper)' : (overallSaliencyScore >= 60 ? 'Standard Contrast' : 'Low Contrast / Visually Cluttered'),
      heatmap3x3: grid,
      recommendations: [
        wordCount > 4 ? 'Reduce thumbnail text to 2-4 impactful words. Thumbnails are viewed at tiny mobile sizes.' : null,
        !avoidsTimestamp ? 'CRITICAL: Move critical text or subjects away from the bottom-right corner where YouTube duration badge overlays.' : null,
        colorContrast !== 'high' ? 'Increase saturation and complementary color contrast (e.g. orange vs teal, yellow on dark).' : null,
        !hasFace ? 'Consider adding an emotive human face to increase click-through rate by up to 38%.' : null
      ].filter(Boolean)
    };
  }
}
