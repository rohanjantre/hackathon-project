export interface AIRecommendation {
  id: string;
  assetId: string;
  title: string;
  confidence: number;
  recommendation: string;
  estimatedDowntimeAvoidedHours: number;
  estimatedSavings: number; // in INR
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(333);

const scenarios = [
  { t: 'bearing vibration increased by 18%', r: 'Schedule bearing replacement within the next 5 operating days.' },
  { t: 'cooling temperature exceeds 85°C constantly', r: 'Inspect cooling tower intake and clear blockages.' },
  { t: 'oil degradation signature detected', r: 'Perform lube oil change and filter replacement.' },
  { t: 'motor drawing 12% excess current', r: 'Check alignment and stator winding insulation.' },
  { t: 'pressure drop of 15 psi across valve', r: 'Inspect valve seal for leakages.' }
];

export const aiRecommendations: AIRecommendation[] = Array.from({ length: 80 }).map((_, i) => {
  const scenario = rng.pick(scenarios);
  
  return {
    id: `ai-${i + 1}`,
    assetId: `ast-${rng.rand(1, 180)}`,
    title: `Asset telemetry indicates ${scenario.t}`,
    confidence: rng.rand(85, 99),
    recommendation: scenario.r,
    estimatedDowntimeAvoidedHours: rng.rand(4, 48),
    estimatedSavings: rng.rand(150000, 850000)
  };
});
