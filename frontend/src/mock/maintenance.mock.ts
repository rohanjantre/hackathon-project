export interface MaintenanceRecord {
  id: string;
  assetId: string;
  date: string;
  technicianId: string;
  durationHours: number;
  downtimeHours: number;
  cost: number;
  reason: string;
  partsReplaced: string[];
  remarks: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(321);

const reasons = ['Routine Preventive Maintenance', 'Vibration Alert Resolution', 'Seal Replacement', 'Bearing Failure', 'Overheating Diagnosis', 'Lubrication & Oil Change', 'Calibration Reset', 'Filter Choked'];
const parts = ['O-Rings', 'Bearings', 'Coolant Filter', 'Mechanical Seal', 'Sensor Module', 'Impeller', 'Drive Belt', 'Fuse Block', 'Actuator'];
const remarksPool = ['Job completed successfully. Asset running within normal parameters.', 'Delayed due to part availability. Temporary fix applied.', 'Required external vendor support.', 'LOTO followed. No safety incidents.'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const maintenanceRecords: MaintenanceRecord[] = Array.from({ length: 250 }).map((_, i) => {
  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;
  
  return {
    id: `maint-${i + 1}`,
    assetId: `ast-${rng.rand(1, 180)}`,
    date: formatIndianDate(new Date(now - days(rng.rand(1, 365)))),
    technicianId: `emp-${rng.rand(1, 120)}`,
    durationHours: rng.rand(1, 12),
    downtimeHours: rng.rand(0, 16),
    cost: rng.rand(2500, 250000), // INR
    reason: rng.pick(reasons),
    partsReplaced: [rng.pick(parts), rng.pick(parts)],
    remarks: rng.pick(remarksPool)
  };
});
