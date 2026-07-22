import { assets } from './assets.mock';
import { employees } from './employees.mock';

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(4040);

const taskTypes = ['Preventive', 'Predictive', 'Corrective', 'Emergency'];

export const maintenancePlanner = Array.from({ length: 60 }).map((_, i) => {
  const asset = rng.pick(assets);
  const engineer = rng.pick(employees);
  
  const daysAhead = rng.rand(0, 30);
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  return {
    id: `MPLAN-${2000 + i}`,
    assetId: asset.id,
    assetName: asset.name,
    taskType: rng.pick(taskTypes),
    scheduledDate: date.toLocaleDateString('en-IN'),
    durationHours: rng.rand(1, 24),
    costEstimation: rng.rand(5000, 150000),
    priority: rng.pick(['Critical', 'High', 'Medium', 'Low']),
    engineer: engineer.name,
    status: rng.pick(['Scheduled', 'In Progress', 'Pending Parts', 'Completed'])
  };
});
