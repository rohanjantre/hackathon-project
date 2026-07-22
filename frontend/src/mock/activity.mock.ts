import { employees } from './employees.mock';
import { plants } from './plants.mock';

const actions = [
  'Document Uploaded', 'Maintenance Completed', 'Inspection Passed', 'Inspection Failed', 
  'Compliance Updated', 'Asset Created', 'Workflow Approved', 'Prediction Generated', 'AI Recommendation Created'
];
const modules = ['Assets', 'Knowledge', 'Predictive', 'Workflow', 'Compliance', 'Operations'];
const times = ['2 mins ago', '10 mins ago', '1 hour ago', 'Today', 'Yesterday', 'Last Week'];

export const commandActivity = Array.from({ length: 150 }).map((_, i) => {
  return {
    id: `ACT-${9000 + i}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    user: employees[Math.floor(Math.random() * employees.length)].name,
    department: 'Maintenance',
    plant: plants[Math.floor(Math.random() * plants.length)].name,
    module: modules[Math.floor(Math.random() * modules.length)],
    time: times[Math.floor(Math.random() * times.length)],
    details: 'System automatically logged this action based on user activity.'
  };
});
