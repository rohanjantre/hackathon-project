export interface Incident {
  id: string;
  title: string;
  date: string;
  assetId: string;
  reporterId: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  rootCause: string;
  resolution: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(987);

const titles = ['Bearing Failure', 'High Vibration', 'Pressure Drop', 'Steam Leakage', 'Electrical Fault', 'Motor Overheating', 'Compressor Failure', 'Valve Leakage'];
const rootCauses = ['Metal fatigue due to extended hours', 'Clogged intake filter', 'Power surge in MIDC grid', 'Improper lubrication schedule', 'Seal degradation over time'];
const resolutions = ['Replaced bearing block and recalibrated', 'Flushed system and installed new OEM filters', 'Replaced fuse and installed surge protector', 'Performed emergency LOTO and seal replacement', 'Pending engineering review'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const incidents: Incident[] = Array.from({ length: 50 }).map((_, i) => {
  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;
  const status = rng.pick(['Open', 'Investigating', 'Resolved']) as 'Open' | 'Investigating' | 'Resolved';
  
  return {
    id: `inc-${i + 1}`,
    title: rng.pick(titles),
    date: formatIndianDate(new Date(now - days(rng.rand(1, 100)))),
    assetId: `ast-${rng.rand(1, 180)}`,
    reporterId: `emp-${rng.rand(1, 120)}`,
    severity: rng.pick(['Low', 'Medium', 'High', 'Critical']),
    rootCause: rng.pick(rootCauses),
    resolution: status === 'Resolved' ? rng.pick(resolutions.slice(0, 4)) : 'Pending',
    status
  };
});
