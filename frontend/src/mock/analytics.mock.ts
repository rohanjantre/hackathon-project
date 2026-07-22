class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(999);

export const analyticsData = {
  healthTrend: Array.from({ length: 12 }).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    score: rng.rand(85, 99)
  })),
  maintenanceCost: Array.from({ length: 12 }).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    cost: rng.rand(100000, 500000)
  })),
  downtimeTrend: Array.from({ length: 12 }).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    hours: rng.rand(10, 50)
  })),
  departmentPerformance: [
    { name: 'Mechanical', efficiency: 94 },
    { name: 'Electrical', efficiency: 97 },
    { name: 'Production', efficiency: 89 },
    { name: 'Utilities', efficiency: 95 },
    { name: 'Operations', efficiency: 91 }
  ],
  riskDistribution: [
    { name: 'Low Risk', value: 120, color: '#10b981' },
    { name: 'Medium Risk', value: 45, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' },
    { name: 'Critical', value: 5, color: '#991b1b' }
  ]
};
