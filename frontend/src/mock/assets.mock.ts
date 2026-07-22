export interface Asset {
  id: string;
  name: string;
  plantId: string;
  departmentId: string;
  manufacturer: string;
  installationDate: string;
  runningHours: number;
  healthScore: number;
  criticality: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Operational' | 'Warning' | 'Critical' | 'Offline';
  maintenanceSchedule: string;
  inspectionSchedule: string;
  assignedEngineerId: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(456);

const types = ['Pump', 'Boiler', 'Steam Turbine', 'Heat Exchanger', 'Compressor', 'Cooling Tower', 'Air Compressor', 'Diesel Generator', 'Motor', 'Valve', 'Conveyor', 'Pressure Vessel', 'Transformer'];
const prefixes: Record<string, string> = { 'Pump': 'P', 'Boiler': 'B', 'Steam Turbine': 'ST', 'Heat Exchanger': 'HX', 'Compressor': 'C', 'Cooling Tower': 'CT', 'Air Compressor': 'AC', 'Diesel Generator': 'DG', 'Motor': 'M', 'Valve': 'V', 'Conveyor': 'CV', 'Pressure Vessel': 'PV', 'Transformer': 'TR' };
const manufacturers = ['Larsen & Toubro', 'Bharat Forge', 'Thermax', 'Kirloskar Brothers', 'Cummins India', 'Siemens India', 'ABB India', 'Schneider Electric India', 'BHEL', 'Godrej'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const assets: Asset[] = Array.from({ length: 180 }).map((_, i) => {
  const type = rng.pick(types);
  const prefix = prefixes[type];
  const name = `${type} ${prefix}-${rng.rand(101, 999)}`;
  const status = rng.pick(['Operational', 'Operational', 'Operational', 'Warning', 'Critical', 'Offline']);
  
  let healthScore = rng.rand(85, 100);
  if (status === 'Warning') healthScore = rng.rand(50, 84);
  if (status === 'Critical') healthScore = rng.rand(10, 49);
  if (status === 'Offline') healthScore = 0;

  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;
  
  return {
    id: `ast-${i + 1}`,
    name,
    plantId: `plt-${rng.rand(1, 6)}`,
    departmentId: `dep-${rng.rand(1, 15)}`,
    manufacturer: rng.pick(manufacturers),
    installationDate: formatIndianDate(new Date(now - days(rng.rand(365, 3650)))),
    runningHours: rng.rand(1000, 85000),
    healthScore,
    criticality: rng.pick(['Low', 'Medium', 'High', 'Critical']),
    status,
    maintenanceSchedule: `Every ${rng.pick([3, 6, 12])} Months`,
    inspectionSchedule: `Every ${rng.pick([1, 3, 6])} Months`,
    assignedEngineerId: `emp-${rng.rand(1, 120)}`
  };
});
