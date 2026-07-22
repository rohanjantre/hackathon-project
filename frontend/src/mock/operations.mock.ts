import { assets } from './assets.mock';
import { plants } from './plants.mock';

export const operationsStats = {
  plantStatus: 'Running',
  runningEquipment: 145,
  stoppedEquipment: 12,
  maintenanceRunning: 8,
  operatorsOnShift: 42,
  productionTarget: 5000,
  productionAchieved: 4250,
  powerConsumption: '12.4 MW',
  steamConsumption: '45.2 t/h',
  compressedAirUsage: '1200 cfm',
  coolingWaterUsage: '350 m3/h',
  machineUtilization: '88%',
  oee: '84.5%'
};

export const runningEquipment = assets.map(a => ({
  id: a.id,
  name: a.name,
  plant: plants.find(p => p.id === a.plantId)?.name || 'Pune Plant',
  status: Math.random() > 0.1 ? 'Running' : 'Stopped',
  uptime: `${Math.floor(Math.random() * 100)} hrs`,
  performance: `${Math.floor(Math.random() * 20 + 80)}%`
}));
