import { graphNodes } from './graphNodes.mock';
import { graphEdges } from './graphEdges.mock';

export const graphStatistics = {
  totalNodes: graphNodes.length,
  totalEdges: graphEdges.length,
  types: {
    assets: graphNodes.filter(n => n.type === 'Asset').length,
    documents: graphNodes.filter(n => n.type === 'Document').length,
    engineers: graphNodes.filter(n => n.type === 'Engineer').length,
    maintenance: graphNodes.filter(n => n.type === 'Maintenance').length,
    inspections: graphNodes.filter(n => n.type === 'Inspection').length,
    incidents: graphNodes.filter(n => n.type === 'Incident').length,
    insights: graphNodes.filter(n => n.type === 'AI Insight').length,
  },
  analytics: {
    mostConnectedAsset: 'Pump P-101 (24 connections)',
    mostConnectedEngineer: 'Rahul Sharma (18 tasks)',
    mostReferencedDocument: 'OEM Manual V3.0 (12 references)',
    mostCriticalAsset: 'Boiler B-201 (High Risk)',
    mostActiveDepartment: 'Mechanical Maintenance',
    graphDensity: '2.4%',
  }
};
