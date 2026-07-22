export type NodeType = 'Asset' | 'Document' | 'Engineer' | 'Plant' | 'Department' | 'Inspection' | 'Incident' | 'Maintenance' | 'Compliance';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  group: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
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

const rng = new RandomGenerator(101);

const nodes: GraphNode[] = [];
const edges: GraphEdge[] = [];

const addNode = (id: string, label: string, type: NodeType, group: number) => {
  nodes.push({ id, label, type, group });
  return id;
};

const addEdge = (source: string, target: string, relation: string) => {
  edges.push({ source, target, relation });
};

// 1. Core Entities
const plants = [
  addNode('plt-1', 'Chakan MIDC, Pune', 'Plant', 1),
  addNode('plt-2', 'Hazira Industrial Estate', 'Plant', 1),
  addNode('plt-3', 'Jamshedpur Steel Plant', 'Plant', 1),
];

const departments = [
  addNode('dep-1', 'Production', 'Department', 2),
  addNode('dep-2', 'Mechanical Maintenance', 'Department', 2),
  addNode('dep-3', 'Electrical', 'Department', 2),
  addNode('dep-4', 'Safety', 'Department', 2),
];

const engineers = [
  'Rahul Sharma', 'Priya Patil', 'Amit Deshmukh', 'Sneha Kulkarni', 'Rohit Verma', 'Anjali Joshi', 'Vikram Singh', 'Karan Mehta'
].map((name, i) => addNode(`eng-${i}`, name, 'Engineer', 3));

engineers.forEach(eng => {
  addEdge(eng, rng.pick(plants), 'WORKS_AT');
});

// 2. Assets (50 items)
const assetTypes = ['Pump', 'Boiler', 'Generator', 'Compressor', 'Cooling Tower', 'Valve', 'Motor'];
const assets: string[] = [];
for (let i = 0; i < 50; i++) {
  const type = rng.pick(assetTypes);
  const id = addNode(`ast-${i}`, `${type} ${type.charAt(0)}-${rng.rand(100, 999)}`, 'Asset', 4);
  assets.push(id);
  
  addEdge(id, rng.pick(plants), 'LOCATED_IN');
  addEdge(id, rng.pick(departments), 'MANAGED_BY');
}

// 3. Documents (60 items)
const docPrefixes = ['OEM Manual', 'P&ID Drawing', 'Safety SOP', 'Risk Assessment', 'Vendor Guide'];
const documents: string[] = [];
for (let i = 0; i < 60; i++) {
  const asset = rng.pick(assets);
  const assetLabel = nodes.find(n => n.id === asset)?.label || 'Asset';
  const id = addNode(`doc-${i}`, `${rng.pick(docPrefixes)}: ${assetLabel}`, 'Document', 5);
  documents.push(id);
  
  addEdge(id, asset, 'REFERENCES');
}

// 4. Maintenance (40 items)
const maintTasks = ['Bearing Replacement', 'Routine Lubrication', 'Filter Change', 'Seal Repair', 'Calibration'];
const maintenance: string[] = [];
for (let i = 0; i < 40; i++) {
  const id = addNode(`mnt-${i}`, rng.pick(maintTasks), 'Maintenance', 6);
  maintenance.push(id);
  
  const asset = rng.pick(assets);
  const engineer = rng.pick(engineers);
  
  addEdge(id, asset, 'PERFORMED_ON');
  addEdge(id, engineer, 'PERFORMED_BY');
  
  if (rng.rand(1, 100) > 50) {
    const docId = addNode(`doc-mnt-${i}`, `Maintenance Report: ${nodes.find(n => n.id === id)?.label}`, 'Document', 5);
    addEdge(docId, id, 'DOCUMENTS');
    addEdge(docId, engineer, 'AUTHORED_BY');
  }
}

// 5. Incidents (20 items)
const incidentTypes = ['Vibration Spike', 'Temperature Alert', 'Pressure Drop', 'Seal Leak', 'Unexpected Shutdown'];
const incidents: string[] = [];
for (let i = 0; i < 20; i++) {
  const id = addNode(`inc-${i}`, `${rng.pick(incidentTypes)} Incident`, 'Incident', 7);
  incidents.push(id);
  
  const asset = rng.pick(assets);
  addEdge(id, asset, 'AFFECTS');
  
  const maint = rng.pick(maintenance);
  addEdge(maint, id, 'RESOLVES');
}

// 6. Inspections (25 items)
const inspectionTypes = ['Internal Safety Audit', 'Factory Inspector Visit', 'BIS Compliance Check', 'PESO Audit'];
for (let i = 0; i < 25; i++) {
  const id = addNode(`insp-${i}`, rng.pick(inspectionTypes), 'Inspection', 8);
  
  const asset = rng.pick(assets);
  const engineer = rng.pick(engineers);
  
  addEdge(id, asset, 'CONDUCTED_ON');
  addEdge(id, engineer, 'CONDUCTED_BY');
  
  if (rng.rand(1, 100) > 70) {
    const incident = rng.pick(incidents);
    addEdge(id, incident, 'DISCOVERED');
  }
}

// 7. Compliance (15 items)
const compliances = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'BIS Standard'];
for (let i = 0; i < 15; i++) {
  const id = addNode(`cmp-${i}`, `${rng.pick(compliances)} Cert`, 'Compliance', 9);
  
  const asset = rng.pick(assets);
  const plant = rng.pick(plants);
  
  addEdge(id, asset, 'APPLIES_TO');
  addEdge(plant, id, 'MUST_COMPLY_WITH');
}

const exPump = addNode('ex-pump', 'Pump P-101', 'Asset', 4);
const exReport = addNode('ex-report', 'Maintenance Report', 'Document', 5);
const exEng = addNode('ex-eng', 'Engineer Rahul', 'Engineer', 3);
const exPlant = addNode('ex-plant', 'Plant 01', 'Plant', 1);
const exInsp = addNode('ex-insp', 'Inspection', 'Inspection', 8);
const exInc = addNode('ex-inc', 'Incident', 'Incident', 7);

addEdge(exReport, exPump, 'REFERENCES');
addEdge(exReport, exEng, 'AUTHORED_BY');
addEdge(exEng, exPlant, 'WORKS_AT');
addEdge(exInsp, exPlant, 'CONDUCTED_AT');
addEdge(exInsp, exInc, 'DISCOVERED');
addEdge(exInc, exPump, 'AFFECTS');

export const graphData = {
  nodes,
  edges
};
