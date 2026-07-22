export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  shift: string;
}

export const users: User[] = [
  { id: 'usr-1', name: 'Rajesh Kumar', role: 'Plant Manager', email: 'rajesh.kumar@tatasteel.com', phone: '+91 98765 43210', avatar: 'https://i.pravatar.cc/150?u=rajesh', status: 'online', shift: 'General' },
  { id: 'usr-2', name: 'Rahul Sharma', role: 'Maintenance Engineer', email: 'rahul.sharma@reliance.com', phone: '+91 91234 56789', avatar: 'https://i.pravatar.cc/150?u=rahul', status: 'online', shift: 'A Shift (6:00 AM – 2:00 PM)' },
  { id: 'usr-3', name: 'Priya Patil', role: 'Compliance Officer', email: 'priya.patil@lt.com', phone: '+91 98989 87878', avatar: 'https://i.pravatar.cc/150?u=priya', status: 'offline', shift: 'General' },
  { id: 'usr-4', name: 'Amit Deshmukh', role: 'Reliability Engineer', email: 'amit.deshmukh@bharatforge.com', phone: '+91 99887 76655', avatar: 'https://i.pravatar.cc/150?u=amit', status: 'busy', shift: 'B Shift (2:00 PM – 10:00 PM)' },
  { id: 'usr-5', name: 'Sneha Kulkarni', role: 'Safety Inspector', email: 'sneha.kulkarni@jsw.in', phone: '+91 94567 12345', avatar: 'https://i.pravatar.cc/150?u=sneha', status: 'online', shift: 'C Shift (10:00 PM – 6:00 AM)' },
  { id: 'usr-6', name: 'Sunil Patil', role: 'Operations Head', email: 'sunil.patil@mahindra.com', phone: '+91 97654 32109', avatar: 'https://i.pravatar.cc/150?u=sunil', status: 'online', shift: 'General' }
];
