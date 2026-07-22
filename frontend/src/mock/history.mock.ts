export interface HistoryEvent {
  id: string;
  assetId: string;
  assetName: string;
  type: 'Asset Created' | 'Maintenance Completed' | 'Inspection Done' | 'Document Uploaded' | 'AI Recommendation' | 'Compliance Updated' | 'Workflow Approved';
  description: string;
  timestamp: string;
  user: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(888);

const types: HistoryEvent['type'][] = ['Asset Created', 'Maintenance Completed', 'Inspection Done', 'Document Uploaded', 'AI Recommendation', 'Compliance Updated', 'Workflow Approved'];
const users = ['Rahul Sharma', 'Priya Patil', 'Amit Deshmukh', 'Sneha Kulkarni', 'Akshay Jadhav', 'Rohit Verma', 'System AI'];
const assets = ['Pump P-101', 'Boiler B-201', 'Generator G-07', 'Compressor C-05', 'Cooling Tower CT-01', 'Motor M-301', 'Valve V-221', 'Transformer TR-05'];

export const historyEvents: HistoryEvent[] = Array.from({ length: 150 }).map((_, i) => {
  const now = Date.now();
  const type = rng.pick(types);
  let timeOffset = 0;
  
  if (i < 5) timeOffset = rng.rand(1, 120) * 60000; // minutes ago
  else if (i < 15) timeOffset = rng.rand(2, 24) * 3600000; // hours ago
  else if (i < 40) timeOffset = rng.rand(1, 7) * 86400000; // days ago
  else timeOffset = rng.rand(7, 30) * 86400000;

  return {
    id: `hist-${i + 1}`,
    assetId: `ast-${rng.rand(1, 180)}`,
    assetName: rng.pick(assets),
    type,
    description: `${type} for industrial asset.`,
    timestamp: new Date(now - timeOffset).toISOString(),
    user: type === 'AI Recommendation' ? 'System AI' : rng.pick(users)
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
