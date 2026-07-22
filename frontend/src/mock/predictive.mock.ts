import { assets } from './assets.mock';
import { plants } from './plants.mock';

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(1010);

const types = ['Bearing Failure', 'Seal Leakage', 'Motor Overheating', 'Vibration Anomaly', 'Pressure Drop', 'Cooling Failure', 'Voltage Fluctuation', 'Flow Imbalance'];
const statuses = ['Open', 'Under Review', 'Mitigated', 'False Positive'];
const impacts = ['High', 'Medium', 'Low', 'Critical'];

export const predictions = Array.from({ length: 120 }).map((_, i) => {
  const asset = rng.pick(assets);
  const plant = plants.find(p => p.id === asset.plantId) || plants[0];
  const type = rng.pick(types);
  
  const daysToFailure = rng.rand(1, 45);
  const failureDate = new Date();
  failureDate.setDate(failureDate.getDate() + daysToFailure);

  return {
    id: `PRED-${1000 + i}`,
    assetId: asset.id,
    assetName: asset.name,
    plantName: plant.name,
    type,
    probability: rng.rand(40, 99),
    confidence: rng.rand(70, 98),
    severity: rng.pick(['Critical', 'High', 'Medium', 'Low']),
    estimatedFailureDate: failureDate.toLocaleDateString('en-IN'),
    daysToFailure,
    businessImpact: rng.pick(impacts),
    recommendedAction: `Schedule inspection and potential replacement of parts related to ${type.toLowerCase()}.`,
    status: rng.pick(statuses)
  };
});
