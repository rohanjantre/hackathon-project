import { companyNode } from './graphNodes.mock';
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

export const graphEdges: { source: string, target: string, relationship: string }[] = [];

// Company -> Plants
plants.forEach(p => {
  graphEdges.push({ source: companyNode.nodeId, target: p.id, relationship: 'operates' });
});

// Plants -> Departments
departments.forEach(d => {
  // Randomly assign departments to plants for a dense graph
  const plant = plants[parseInt(d.id.split('-')[1]) % plants.length];
  if(plant) graphEdges.push({ source: plant.id, target: d.id, relationship: 'contains_department' });
});

// Assets -> Plants & Departments
assets.forEach(a => {
  if (a.plantId) graphEdges.push({ source: a.plantId, target: a.id, relationship: 'houses_asset' });
  if (a.departmentId) graphEdges.push({ source: a.departmentId, target: a.id, relationship: 'manages_asset' });
});

// Documents -> Assets
documents.forEach(d => {
  if (d.linkedAssetId) graphEdges.push({ source: d.id, target: d.linkedAssetId, relationship: 'documents_asset' });
});

// Maintenance -> Assets & Engineers
maintenanceRecords.forEach(m => {
  if (m.assetId) graphEdges.push({ source: m.id, target: m.assetId, relationship: 'maintains_asset' });
  if (m.engineerId) graphEdges.push({ source: m.engineerId, target: m.id, relationship: 'performed_maintenance' });
});

// Inspections -> Assets & Inspectors
inspections.forEach(i => {
  if (i.assetId) graphEdges.push({ source: i.id, target: i.assetId, relationship: 'inspects_asset' });
  if (i.inspectorId) graphEdges.push({ source: i.inspectorId, target: i.id, relationship: 'conducted_inspection' });
});

// Incidents -> Assets
incidents.forEach(i => {
  if (i.assetId) graphEdges.push({ source: i.id, target: i.assetId, relationship: 'affected_asset' });
});

// Compliance -> Assets & Plants
complianceRecords.forEach(c => {
  if (c.linkedAssetId) graphEdges.push({ source: c.id, target: c.linkedAssetId, relationship: 'regulates_asset' });
  if (c.linkedPlantId) graphEdges.push({ source: c.linkedPlantId, target: c.id, relationship: 'applies_to_plant' });
});

// AI Recommendations -> Assets
aiRecommendations.forEach(a => {
  if (a.assetId) graphEdges.push({ source: a.id, target: a.assetId, relationship: 'predicts_for_asset' });
});
