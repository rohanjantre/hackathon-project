import { employees } from './employees.mock';

const reportTypes = ['Daily Report', 'Weekly Report', 'Monthly Report', 'Executive Summary', 'Maintenance Report', 'Compliance Report', 'Asset Health Report', 'Inspection Report', 'Incident Report'];

export const commandReports = Array.from({ length: 45 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id: `REP-${5000 + i}`,
    title: reportTypes[Math.floor(Math.random() * reportTypes.length)],
    generatedBy: employees[Math.floor(Math.random() * employees.length)].name,
    date: date.toLocaleDateString('en-IN'),
    size: `${Math.floor(Math.random() * 5 + 1)} MB`,
    format: Math.random() > 0.5 ? 'PDF' : 'XLSX'
  };
});
