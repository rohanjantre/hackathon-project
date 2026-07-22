import { assets } from './assets.mock';
import { employees } from './employees.mock';
import { plants } from './plants.mock';

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(888);

export const rcaCases = Array.from({ length: 45 }).map((_, i) => {
  const asset = rng.pick(assets);
  return {
    id: `RCA-${3000 + i}`,
    title: `${rng.pick(['Bearing Failure', 'Emission Leak', 'Pressure Drop', 'Power Surge'])} Incident`,
    assetName: asset.name,
    plantName: plants.find(p => p.id === asset.plantId)?.name || plants[0].name,
    confidence: rng.rand(75, 99),
    rootCause: rng.pick([
      'Fatigue due to inadequate lubrication schedule.',
      'Corrosion in primary containment vessel.',
      'Defective sensor leading to false readings and override.',
      'Thermal stress due to rapid cooling cycles.'
    ]),
    recommendedAction: rng.pick([
      'Update lubrication SOP and replace bearing.',
      'Schedule ultrasonic thickness testing for vessel.',
      'Replace pressure sensor and recalibrate SCADA.',
      'Implement gradual cooling protocol.'
    ]),
    status: rng.pick(['Open', 'Investigating', 'Resolved', 'Under Review'])
  };
});

export const complianceCases = Array.from({ length: 120 }).map((_, i) => {
  const asset = rng.pick(assets);
  const employee = rng.pick(employees);
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + rng.rand(-15, 60));

  return {
    id: `COMP-${8000 + i}`,
    type: rng.pick(['Safety Violation', 'Expired Certificate', 'Audit Finding', 'Risk Register']),
    title: rng.pick(['Missing Safety Guard', 'ISO 14001 Lapse', 'High Noise Level', 'Chemical Storage Non-compliance', 'Fire Extinguisher Expired']),
    status: rng.pick(['Open', 'In Progress', 'Overdue', 'Closed']),
    owner: employee.name,
    dueDate: dueDate.toLocaleDateString('en-IN'),
    priority: rng.pick(['Critical', 'High', 'Medium', 'Low']),
    linkedAsset: asset.name,
    plantName: plants.find(p => p.id === asset.plantId)?.name || plants[0].name
  };
});

export const openCAPAs = Array.from({ length: 50 }).map((_, i) => {
  const asset = rng.pick(assets);
  const employee = rng.pick(employees);
  
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + rng.rand(5, 90));

  return {
    id: `CAPA-${5000 + i}`,
    description: rng.pick(['Implement secondary containment', 'Install emergency stop button', 'Revise LOTO procedure', 'Conduct noise mapping']),
    status: rng.pick(['Draft', 'Pending Approval', 'Implementation', 'Verification', 'Closed']),
    owner: employee.name,
    targetDate: targetDate.toLocaleDateString('en-IN'),
    priority: rng.pick(['High', 'Medium', 'Critical']),
    linkedAsset: asset.name
  };
});

export const upcomingAudits = Array.from({ length: 25 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + rng.rand(2, 60));

  return {
    id: `AUDIT-${100 + i}`,
    title: rng.pick(['ISO 9001 Surveillance Audit', 'PESO Safety Inspection', 'Internal EHS Audit', 'Energy Audit (BEE)']),
    category: rng.pick(['Quality Management', 'Safety & Environment', 'Statutory Compliance', 'Energy']),
    status: rng.pick(['Ready', 'Preparation', 'Action Required']),
    daysRemaining: rng.rand(2, 60),
    scheduledDate: date.toLocaleDateString('en-IN')
  };
});
