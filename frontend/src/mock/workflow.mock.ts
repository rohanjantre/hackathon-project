export interface Workflow {
  id: string;
  title: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedById: string;
  approverId: string;
  date: string;
  linkedEntityId: string; // Could be an asset, document, etc.
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(222);

const types = ['Maintenance Approval', 'Inspection Approval', 'Document Review', 'Compliance Approval', 'Incident Escalation', 'CAPA Approval'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const workflows: Workflow[] = Array.from({ length: 80 }).map((_, i) => {
  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;
  const type = rng.pick(types);
  
  return {
    id: `wkf-${i + 1}`,
    title: `${type} Request`,
    type,
    status: rng.pick(['Pending', 'Approved', 'Rejected']),
    requestedById: `emp-${rng.rand(1, 120)}`,
    approverId: `emp-${rng.rand(1, 20)}`, // Top managers
    date: formatIndianDate(new Date(now - days(rng.rand(0, 30)))),
    linkedEntityId: `ast-${rng.rand(1, 180)}`
  };
});
