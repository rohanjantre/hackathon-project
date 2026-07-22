import { assets } from './assets.mock';
import { departments } from './departments.mock';

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(3030);

const anomalyTypes = ['High Vibration', 'Pressure Drop', 'Motor Overheating', 'Steam Leakage', 'Temperature Spike', 'Bearing Wear', 'Seal Leakage', 'Voltage Fluctuation', 'Flow Imbalance'];

export const anomalies = Array.from({ length: 90 }).map((_, i) => {
  const asset = rng.pick(assets);
  const dept = departments.find(d => d.id === asset.departmentId) || departments[0];
  
  const now = Date.now();
  const detectionTime = new Date(now - rng.rand(1, 48) * 3600000);

  return {
    id: `ANOM-${8000 + i}`,
    type: rng.pick(anomalyTypes),
    severity: rng.pick(['Critical', 'High', 'Medium', 'Low']),
    detectionTime: detectionTime.toLocaleString('en-IN'),
    riskScore: rng.rand(40, 99),
    assetId: asset.id,
    assetName: asset.name,
    department: dept.name,
    status: rng.pick(['Active', 'Investigating', 'Resolved', 'Ignored'])
  };
});
