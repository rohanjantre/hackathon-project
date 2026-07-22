import { assets } from './assets.mock';

const insightsData = [
  { insight: "vibration increasing exponentially. Bearing failure expected in 5 days.", savings: 120000, action: "Replace bearing immediately" },
  { insight: "requires urgent internal inspection based on recent emissions data.", savings: 45000, action: "Schedule shutdown for inspection" },
  { insight: "showing repeated pressure drops indicating potential seal failure.", savings: 80000, action: "Replace mechanical seal" },
  { insight: "maintenance optimization could reduce overall downtime by 18%.", savings: 250000, action: "Adopt AI predicted schedule" }
];

export const commandAIInsights = Array.from({ length: 25 }).map((_, i) => {
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const insight = insightsData[Math.floor(Math.random() * insightsData.length)];
  
  return {
    id: `INS-${8000 + i}`,
    title: `${asset.name} ${insight.insight}`,
    confidence: Math.floor(Math.random() * 20 + 80),
    businessImpact: 'High',
    estimatedSavings: insight.savings,
    evidence: 'Based on 45 days of continuous sensor telemetry and historical failure logs.',
    linkedAsset: asset.name,
    linkedDocument: 'OEM_Manual_V2.pdf',
    recommendedAction: insight.action,
    approvalStatus: Math.random() > 0.5 ? 'Pending' : 'Approved'
  };
});
