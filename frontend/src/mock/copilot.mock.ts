export interface CopilotBrief {
  id: string;
  title: string;
  date: string;
  content: string;
  keyInsights: string[];
}

export interface CopilotRecommendation {
  id: string;
  assetId: string;
  title: string;
  description: string;
  confidence: number;
  referencedDocs: string[];
}

export interface AIPromptResponse {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  confidence: number;
  evidence: string[];
  referencedDocuments: string[];
  relatedAssets: string[];
  suggestedActions: string[];
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  rand(min: number, max: number) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick<T>(arr: T[]): T {
    return arr[this.rand(0, arr.length - 1)];
  }
}

const rng = new RandomGenerator(42);
const now = Date.now();
const minutes = (m: number) => m * 60 * 1000;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatIndianDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
};

export const copilotBriefs: CopilotBrief[] = [
  {
    id: 'brf-1',
    title: 'Morning Plant Briefing - Chakan MIDC',
    date: formatIndianDate(new Date(now).toISOString()),
    content: 'Chakan MIDC Plant is operating at 94% overall health. Attention is required on multiple assets due to imminent failure predictions as we transition into the monsoon season. Boiler B-201 is currently offline following an overnight sensor fault during C Shift. Factory Inspector audit is due next week.',
    keyInsights: [
      'Pump P-101 requires immediate LOTO and bearing replacement.',
      'PESO compliance audit is overdue for Valve V-120.',
      '12 maintenance tasks are scheduled for Rahul Sharma this week.'
    ]
  }
];

export const copilotRecommendations: CopilotRecommendation[] = [
  {
    id: 'rec-1',
    assetId: 'ast-3',
    title: 'Accelerate Bearing Replacement on Compressor C-305',
    description: 'Based on vibration analysis and historical failure data from Indian summer conditions, bearing life is < 3 days. Recommend dispatching Amit Deshmukh immediately to perform the swap using Larsen & Toubro parts.',
    confidence: 98,
    referencedDocs: ['doc-2', 'doc-15']
  },
  {
    id: 'rec-2',
    assetId: 'ast-10',
    title: 'Replace Pressure Relief Valve V-120',
    description: 'Valve has failed 2 consecutive self-tests. Recalibration is unlikely to hold. Recommend ordering OEM replacement from local Pune distributor before BIS inspection.',
    confidence: 85,
    referencedDocs: ['doc-4']
  }
];

const queries = [
  {
    q: 'How do I replace {asset} bearings?',
    r: 'To replace the bearings on {asset}, you must first perform a complete Lockout/Tagout (LOTO) procedure as per Indian Factory Act guidelines. Isolate the equipment from the power grid, drain any residual fluids, and follow the OEM disassembly sequence outlined in the Maintenance Manual.',
    evidence: ['OEM Manual page 42 specifies bearing replacement sequence', 'Safety Checklist mandates LOTO before casing removal'],
    actions: ['Initiate Workflow for Bearing Replacement', 'Assign to Sneha Kulkarni']
  },
  {
    q: 'When is {asset} inspection due?',
    r: 'The next scheduled inspection for {asset} is due in {days} days. It requires a Level 2 vibration analysis and seal integrity check as per the latest BIS compliance mandates.',
    evidence: ['Maintenance Log indicates last inspection was 11 months ago', 'ISO 9001 Certificate requires annual Level 2 checks'],
    actions: ['Schedule Inspection', 'Assign to Amit Deshmukh']
  },
  {
    q: 'Show maintenance history of {asset}.',
    r: '{asset} has had {count} maintenance events in the past year. The most recent was a part replacement costing approximately ₹85,000. The asset has generally maintained a stable health score during the A Shift operations.',
    evidence: ['Work Order History from ERP', 'Technician logs from previous quarter'],
    actions: ['Download Maintenance CSV', 'View Cost Breakdown']
  },
  {
    q: 'Which assets have highest risk?',
    r: 'Currently, the assets with the highest predicted failure risk are mostly localized in Ranjangaon MIDC and the Substation. Elevated vibration and temperature anomalies are the primary contributing factors according to the SCADA system.',
    evidence: ['Predictive Analytics Engine shows 3 assets >90% failure probability', 'Sensor telemetry indicates sustained temperature spikes'],
    actions: ['View Predictive Dashboard', 'Generate Risk Report PDF']
  },
  {
    q: 'What caused the recent trip on {asset}?',
    r: 'The recent shutdown of {asset} was triggered by a pressure drop below the minimum safe threshold during the B Shift, likely caused by a failing seal. I recommend a physical inspection before attempting a restart.',
    evidence: ['SCADA telemetry showed 15 psi drop over 3 minutes', 'Incident Report notes similar behavior 6 months ago'],
    actions: ['Create Incident Report', 'Acknowledge Alarm']
  },
  {
    q: 'Provide the safety checklist for {asset} LOTO.',
    r: 'The Lockout/Tagout (LOTO) procedure for {asset} involves 5 critical steps aligned with Factory Inspectorate standards: 1) Notify A Shift personnel, 2) Shut down equipment, 3) Isolate energy sources, 4) Apply locks and tags, 5) Verify isolation.',
    evidence: ['Plant Safety Standard Operating Procedure', 'Indian Safety Standards requirements'],
    actions: ['Print Checklist', 'Share with Rajesh Kumar']
  }
];

const assetNames = ['Pump P-101', 'Boiler B-201', 'Compressor C-305', 'Cooling Tower CT-01', 'Heat Exchanger HX-12', 'Steam Turbine ST-03', 'Diesel Generator DG-07', 'Air Compressor AC-11', 'Motor M-402', 'Valve V-120', 'Conveyor CV-09'];

export const copilotChatHistory: AIPromptResponse[] = Array.from({ length: 40 }).map((_, i) => {
  const template = rng.pick(queries);
  const assetName = rng.pick(assetNames);
  
  const queryText = template.q.replace('{asset}', assetName);
  const responseText = template.r
    .replace('{asset}', assetName)
    .replace('{days}', rng.rand(5, 90).toString())
    .replace('{count}', rng.rand(2, 8).toString());

  return {
    id: `chat-${i + 1}`,
    query: queryText,
    response: responseText,
    timestamp: new Date(now - minutes(rng.rand(1, 10000))).toISOString(),
    confidence: rng.rand(82, 99),
    evidence: template.evidence,
    referencedDocuments: [`doc-${rng.rand(1, 250)}`, `doc-${rng.rand(1, 250)}`],
    relatedAssets: [`ast-${rng.rand(1, 150)}`],
    suggestedActions: template.actions
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
