export interface Document {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Archived' | 'Pending Review';
  version: string;
  uploadDate: string;
  uploaderId: string;
  linkedAssetId: string;
  linkedPlantId: string;
  aiSummary: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(789);

const docTypes = [
  { type: 'Pump Maintenance SOP', category: 'SOP' },
  { type: 'OEM Manual', category: 'Manual' },
  { type: 'Inspection Report', category: 'Report' },
  { type: 'Safety Procedure', category: 'Procedure' },
  { type: 'Lockout Tagout SOP', category: 'SOP' },
  { type: 'Calibration Certificate', category: 'Certificate' },
  { type: 'Incident Report', category: 'Report' },
  { type: 'Vendor Manual', category: 'Manual' },
  { type: 'Electrical Drawing', category: 'Drawing' },
  { type: 'P&ID', category: 'Drawing' },
  { type: 'Daily Maintenance Report', category: 'Report' },
  { type: 'Root Cause Analysis', category: 'Analysis' },
  { type: 'Quality Checklist', category: 'Checklist' },
  { type: 'Pressure Test Report', category: 'Report' },
  { type: 'Boiler Inspection Report', category: 'Report' }
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (d: Date) => `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

export const documents: Document[] = Array.from({ length: 300 }).map((_, i) => {
  const docType = rng.pick(docTypes);
  const now = Date.now();
  const days = (d: number) => d * 24 * 60 * 60 * 1000;
  
  return {
    id: `doc-${i + 1}`,
    title: `${docType.type} - V${rng.rand(1, 5)}.0`,
    category: docType.category,
    status: rng.pick(['Active', 'Active', 'Active', 'Archived', 'Pending Review']),
    version: `v${rng.rand(1, 5)}.${rng.rand(0, 9)}`,
    uploadDate: formatIndianDate(new Date(now - days(rng.rand(1, 1000)))),
    uploaderId: `emp-${rng.rand(1, 120)}`,
    linkedAssetId: `ast-${rng.rand(1, 180)}`,
    linkedPlantId: `plt-${rng.rand(1, 6)}`,
    aiSummary: `This ${docType.category.toLowerCase()} contains the approved standards, historical references, and procedures regarding industrial operations.`
  };
});
