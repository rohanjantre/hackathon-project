import { assets } from './assets.mock';
import { employees } from './employees.mock';

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(2020);

export const recommendations = Array.from({ length: 80 }).map((_, i) => {
  const asset = rng.pick(assets);
  const engineer = rng.pick(employees);
  
  return {
    id: `REC-${5000 + i}`,
    title: `Optimize ${asset.name} Operating Parameters`,
    priority: rng.pick(['Critical', 'High', 'Medium', 'Low']),
    businessReason: 'Prevent accelerated wear and tear to extend asset lifecycle.',
    confidence: rng.rand(80, 99),
    expectedSavings: rng.rand(25000, 500000),
    downtimeReduction: rng.rand(2, 48), // in hours
    linkedAssetId: asset.id,
    linkedAssetName: asset.name,
    responsibleEngineer: engineer.name,
    approvalStatus: rng.pick(['Pending', 'Approved', 'Rejected', 'Implemented'])
  };
});
