// app/types.ts

export interface Trip {
    id: number; // Changed from string to number for consistency with SQLite
    title: string;
    startdate: string;
    enddate: string;
    status: 'Ideated' | 'Planned' | 'Confirmed';
    people: string;
    TravelTo: string,
    TravelBack: string,
    Accomodation1: string,
    Accomodation2: string,
    ExtraTravel: string,
    ExtraAccomodation: string,
    notes: string;
  }
