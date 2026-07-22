export interface Inspection {
  id: string;
  assetId: string;
  date: string;
  inspectorId: string;
  type: string;
  status: 'Passed' | 'Passed with Observation' | 'Failed' | 'Critical';
  remarks: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(654);

const types = ['Internal Safety Audit', 'Factory Inspector', 'BIS Audit', 'PESO Routine Check', 'ISO 9001 Review', 'ISO 45001 Assessment'];
const remarksPassed = ['Compliant with all parameters.', 'No issues found during visual inspection.'];
const remarksObs = ['Minor rust observed on base plate.', 'Calibration due next month, noted for follow-up.', 'Documentation slightly outdated but acceptable.'];
const remarksFailed = ['Pressure relief valve failed bench test.', 'LOTO tags missing during active maintenance.', 'Vibration levels exceed BIS threshold.'];
const remarksCritical = ['Imminent risk of structural failure.', 'Severe gas leak detected at flange.', 'Fire safety suppression system offline.'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const inspections: Inspection[] = Array.from({ length: 180 }).map((_, i) => {
  const status = rng.pick(['Passed', 'Passed', 'Passed with Observation', 'Failed', 'Critical']) as 'Passed' | 'Passed with Observation' | 'Failed' | 'Critical';
  let remarks = '';
  if (status === 'Passed') remarks = rng.pick(remarksPassed);
  if (status === 'Passed with Observation') remarks = rng.pick(remarksObs);
  if (status === 'Failed') remarks = rng.pick(remarksFailed);
  if (status === 'Critical') remarks = rng.pick(remarksCritical);
  
  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;

  return {
    id: `insp-${i + 1}`,
    assetId: `ast-${rng.rand(1, 180)}`,
    date: formatIndianDate(new Date(now - days(rng.rand(1, 200)))),
    inspectorId: `emp-${rng.rand(1, 120)}`,
    type: rng.pick(types),
    status,
    remarks
  };
});
