export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkedId?: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(444);

const types = ['Maintenance Due', 'Certificate Expiring', 'High Temperature', 'Inspection Overdue', 'Document Processed', 'Workflow Approved', 'AI Alert'];

export const notifications: Notification[] = Array.from({ length: 100 }).map((_, i) => {
  const now = Date.now();
  const minutes = (m: number) => m * 60 * 1000;
  const type = rng.pick(types);
  
  return {
    id: `notif-${i + 1}`,
    type,
    message: `System Alert: ${type} registered for an industrial entity.`,
    timestamp: new Date(now - minutes(rng.rand(1, 10000))).toISOString(), // Kept ISO for chronological UI sorting
    isRead: rng.rand(0, 1) === 1,
    linkedId: `ast-${rng.rand(1, 180)}`
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
