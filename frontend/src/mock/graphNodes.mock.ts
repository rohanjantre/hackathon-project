import { assets } from './assets.mock';
import { documents } from './documents.mock';
import { employees } from './employees.mock';
import { maintenanceRecords } from './maintenance.mock';
import { inspections } from './inspection.mock';
import { incidents } from './incident.mock';
import { complianceRecords } from './compliance.mock';
import { aiRecommendations } from './ai.mock';
import { plants } from './plants.mock';
import { departments } from './departments.mock';

// ForgeMind Heavy Engineering Pvt Ltd
export const companyNode = { nodeId: 'comp-1', title: 'ForgeMind Heavy Engineering Pvt Ltd', type: 'Company', metadata: { location: 'Pune, Maharashtra' } };

export const graphNodes = [
  companyNode,
  ...plants.map(p => ({ nodeId: p.id, title: p.name, type: 'Plant', metadata: p })),
  ...departments.map(d => ({ nodeId: d.id, title: d.name, type: 'Department', metadata: d })),
  ...assets.map(a => ({ nodeId: a.id, title: a.name, type: 'Asset', metadata: a })),
  ...documents.map(d => ({ nodeId: d.id, title: d.title, type: 'Document', metadata: d })),
  ...employees.map(e => ({ nodeId: e.id, title: e.name, type: 'Engineer', metadata: e })),
  ...maintenanceRecords.map(m => ({ nodeId: m.id, title: `Maintenance: ${m.reason}`, type: 'Maintenance', metadata: m })),
  ...inspections.map(i => ({ nodeId: i.id, title: `Inspection: ${i.type}`, type: 'Inspection', metadata: i })),
  ...incidents.map(i => ({ nodeId: i.id, title: `Incident: ${i.type}`, type: 'Incident', metadata: i })),
  ...complianceRecords.map(c => ({ nodeId: c.id, title: `Compliance: ${c.standard}`, type: 'Compliance', metadata: c })),
  ...aiRecommendations.map(a => ({ nodeId: a.id, title: `AI: ${a.title}`, type: 'AI Insight', metadata: a }))
];
