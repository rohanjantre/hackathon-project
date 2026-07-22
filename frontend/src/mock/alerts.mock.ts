import { assets } from './assets.mock';
import { plants } from './plants.mock';
import { employees } from './employees.mock';

const alertTypes = ['High Temperature', 'Bearing Vibration', 'Oil Leakage', 'Pressure Drop', 'Motor Overload', 'Steam Leak', 'Boiler Alarm', 'Electrical Fault', 'Fire Detection', 'Inspection Due'];
const severities = ['Critical', 'High', 'Medium', 'Low'];
const statuses = ['Open', 'Acknowledged', 'Resolved'];

export const commandAlerts = Array.from({ length: 100 }).map((_, i) => {
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const plant = plants.find(p => p.id === asset.plantId) || plants[0];
  const engineer = employees[Math.floor(Math.random() * employees.length)];
  const now = new Date();
  now.setMinutes(now.getMinutes() - Math.floor(Math.random() * 1440));

  return {
    id: `ALT-${1000 + i}`,
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    assignedEngineer: engineer.name,
    timestamp: now.toLocaleString('en-IN'),
    assetName: asset.name,
    plantName: plant.name,
    description: `Automated alert triggered for ${asset.name} due to irregular sensor patterns.`
  };
});
