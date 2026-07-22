export interface Employee {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  shift: string;
  experienceYears: number;
  phone: string;
  email: string;
  reportingManager: string;
  plantId: string;
}

class RandomGenerator {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next() { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  rand(min: number, max: number) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick<T>(arr: T[]): T { return arr[this.rand(0, arr.length - 1)]; }
}
const rng = new RandomGenerator(123);

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Rohit', 'Anjali', 'Harsh', 'Nikhil', 'Akshay', 'Saurabh', 'Neha', 'Vaibhav', 'Karan', 'Aditya', 'Omkar', 'Pooja', 'Abhishek', 'Vivek', 'Tanmay', 'Ritika', 'Vikram', 'Rajesh', 'Sunil', 'Mahesh', 'Prakash', 'Sandeep', 'Deepak', 'Ramesh', 'Ashish'];
const lastNames = ['Sharma', 'Patil', 'Deshmukh', 'Kulkarni', 'Verma', 'Joshi', 'Shah', 'Jadhav', 'Mishra', 'Desai', 'Pawar', 'Mehta', 'Chavan', 'Yadav', 'More', 'Singh', 'Kumar', 'Naik', 'Gupta', 'Deshpande'];
const designations = ['Plant Head', 'Maintenance Manager', 'Production Manager', 'Reliability Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Instrumentation Engineer', 'Maintenance Engineer', 'Safety Officer', 'QA Engineer', 'Inspection Engineer', 'Operator', 'Supervisor', 'Technician', 'Compliance Officer', 'Store Manager'];
const shifts = ['A Shift (6:00 AM – 2:00 PM)', 'B Shift (2:00 PM – 10:00 PM)', 'C Shift (10:00 PM – 6:00 AM)', 'General Shift (9:00 AM - 6:00 PM)'];

export const employees: Employee[] = Array.from({ length: 120 }).map((_, i) => {
  const name = `${rng.pick(firstNames)} ${rng.pick(lastNames)}`;
  const desig = rng.pick(designations);
  let shift = rng.pick(shifts);
  if (desig.includes('Manager') || desig.includes('Head')) shift = 'General Shift (9:00 AM - 6:00 PM)';
  
  return {
    id: `emp-${i + 1}`,
    name,
    designation: desig,
    departmentId: `dep-${rng.rand(1, 15)}`,
    shift,
    experienceYears: rng.rand(1, 25),
    phone: `+91 9${rng.rand(100000000, 999999999)}`,
    email: `${name.toLowerCase().replace(' ', '.')}@forgemind.in`,
    reportingManager: `emp-${rng.rand(1, 20)}`,
    plantId: `plt-${rng.rand(1, 6)}`
  };
});
