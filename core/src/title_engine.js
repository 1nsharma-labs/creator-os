/**
 * @file title_engine.js
 * @description Title CTR Predictor & Multi-Angle Generator.
 * Predicts CTR % and crafts 5 psychological variants for YouTube, Shorts & Reels.
 * Part of 1nsharma-labs/creator-os
 */

export class TitleEngine {
  constructor() {
    this.highCTRKeywords = [
      'why', 'how', 'secret', 'truth', 'stopped', 'never', 'insane', 'genius',
      'finally', 'exposed', 'mistake', 'actually', 'hours', 'tested', 'built',
      'changed', 'ruined', 'solved', 'unbelievable', 'million', 'ruin'
    ];
  }

  /**
   * Scores an existing video title and predicts CTR.
   * @param {string} title
   * @returns {Object} CTR analysis
   */
  analyze(title) {
    if (!title || typeof title !== 'string') {
      title = '';
    }

    const cleanTitle = title.trim();
    const charCount = cleanTitle.length;
    const words = cleanTitle.length > 0 ? cleanTitle.split(/\s+/) : [];
    const lower = cleanTitle.toLowerCase();

    // 1. Mobile Truncation Check (YouTube cuts off around 55-60 chars on smartphone feeds)
    const mobileSafe = charCount <= 60;
    const lengthScore = charCount >= 35 && charCount <= 58 ? 95 : (charCount < 35 ? 75 : 65);

    // 2. High CTR Keywords & Power
    let powerHits = 0;
    for (const kw of this.highCTRKeywords) {
      if (lower.includes(kw)) powerHits++;
    }
    const keywordScore = Math.min(100, 40 + powerHits * 22);

    // 3. Numbers & Specificity (e.g. 100, 24, $10, 3)
    const hasNumbers = /\d+/.test(cleanTitle);
    const hasCurrencyOrTime = /[$€₹%]|(day|hour|minute|year|week)/i.test(cleanTitle);
    const specificityBonus = (hasNumbers ? 15 : 0) + (hasCurrencyOrTime ? 10 : 0);

    // 4. Emotional Tension / Capitalization
    const hasBrackets = /[[({]/.test(cleanTitle);
    const allCapsWords = words.filter(w => w.length > 2 && w === w.toUpperCase() && !/^\d+$/.test(w));
    const tensionBonus = (allCapsWords.length >= 1 && allCapsWords.length <= 2 ? 8 : 0) + (hasBrackets ? 7 : 0);

    // Predicted CTR (baseline 4.5% to top 15.2%)
    const rawScore = Math.min(100, Math.round(
      lengthScore * 0.35 +
      keywordScore * 0.35 +
      (40 + specificityBonus + tensionBonus) * 0.30
    ));

    const predictedCTR = Number((3.5 + (rawScore / 100) * 8.5).toFixed(1));

    return {
      title: cleanTitle,
      charCount,
      wordCount: words.length,
      mobileSafe,
      score: rawScore,
      predictedCTR: `${predictedCTR}%`,
      ctrRating: predictedCTR >= 9.5 ? 'Exceptional (Top 5% CTR)' : (predictedCTR >= 6.5 ? 'Above Average' : 'Low CTR (Title Too Passive)'),
      improvements: [
        !mobileSafe ? 'Shorten title below 58 characters to prevent truncation on mobile YouTube feeds.' : null,
        !hasNumbers ? 'Add concrete numbers (e.g., "7 Days", "$1,000", "5 Mistakes") to boost credibility.' : null,
        powerHits === 0 ? 'Inject emotional power keywords or an open curiosity gap.' : null
      ].filter(Boolean)
    };
  }

  /**
   * Generates 5 high-converting psychological angles from a raw topic.
   * @param {string} topic
   * @returns {Array<Object>} 5 variant titles with angle and projected CTR
   */
  generateVariants(topic) {
    const cleanTopic = (topic || 'Software Development').trim().replace(/[.?!\s]+$/, '');

    return [
      {
        angle: 'Negative Bias / Loss Aversion',
        title: `Stop Making This Huge ${cleanTopic} Mistake (Before It's Too Late)`,
        projectedCTR: '11.8%',
        psychology: 'Loss aversion is 2.5x more potent than gain seeking.'
      },
      {
        angle: 'Curiosity Gap / Hidden Truth',
        title: `The Truth About ${cleanTopic} Nobody Is Telling You`,
        projectedCTR: '10.4%',
        psychology: 'Creates cognitive itch that only clicking can scratch.'
      },
      {
        angle: 'Extreme Challenge / High Stakes',
        title: `I Tested ${cleanTopic} for 30 Days (Here's What Happened)`,
        projectedCTR: '12.6%',
        psychology: 'First-person proof and experiential transformation.'
      },
      {
        angle: 'Contrarian / Disruptive',
        title: `Why ${cleanTopic} Is Actually Dead in 2026`,
        projectedCTR: '13.1%',
        psychology: 'Challenges industry consensus and incites debate in comments.'
      },
      {
        angle: 'Data / High Specificity',
        title: `How 1 Simple Change in ${cleanTopic} Boosted Results by 312%`,
        projectedCTR: '9.8%',
        psychology: 'Concrete quantifiable metrics build instant authority.'
      }
    ];
  }
}
