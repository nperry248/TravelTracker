// app/types.ts

export interface Trip {
    id: number; // Changed from string to number for consistency with SQLite
    title: string;
    startdate: string;
    enddate: string;
    status: 'Ideated' | 'Planned' | 'Confirmed';
    people: string;
    transportation: string;
    accommodation: string;
    notes: string;
  }


  