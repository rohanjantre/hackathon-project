class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(666);

export const dashboardOverview = {
  assetHealthAverage: 92,
  totalDowntimeHours: 124,
  maintenanceCostYTD: 4500000, // ₹ 45 Lakhs
  complianceScore: 96,
  activeRisks: 14,
  openPredictions: 7
};

export const plantPerformance = [
  { plant: 'Pune', score: 94 },
  { plant: 'Chakan', score: 91 },
  { plant: 'Ranjangaon', score: 88 },
  { plant: 'Nashik', score: 95 },
  { plant: 'Aurangabad', score: 85 },
  { plant: 'Vadodara', score: 96 }
];

export const departmentPerformance = [
  { dept: 'Mechanical', score: 92 },
  { dept: 'Electrical', score: 95 },
  { dept: 'Production', score: 88 },
  { dept: 'Safety', score: 99 }
];

export const riskTrend = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  risks: rng.rand(5, 25)
}));

export const predictionTrend = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  predictions: rng.rand(2, 10)
}));
