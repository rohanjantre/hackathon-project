export interface Plant {
  id: string;
  name: string;
  location: string;
  head: string;
  established: number;
}

export const plants: Plant[] = [
  { id: 'plt-1', name: 'Pune Manufacturing Plant', location: 'Pune, Maharashtra', head: 'Rajesh Kumar', established: 2005 },
  { id: 'plt-2', name: 'Chakan MIDC Plant', location: 'Chakan MIDC, Pune', head: 'Sunil Patil', established: 2010 },
  { id: 'plt-3', name: 'Ranjangaon Production Unit', location: 'Ranjangaon MIDC', head: 'Mahesh Chavan', established: 2012 },
  { id: 'plt-4', name: 'Nashik Assembly Plant', location: 'Nashik, Maharashtra', head: 'Prakash Kulkarni', established: 2008 },
  { id: 'plt-5', name: 'Aurangabad Fabrication Unit', location: 'Aurangabad, Maharashtra', head: 'Sandeep Joshi', established: 2015 },
  { id: 'plt-6', name: 'Vadodara Engineering Plant', location: 'Vadodara, Gujarat', head: 'Deepak Naik', established: 2018 }
];
