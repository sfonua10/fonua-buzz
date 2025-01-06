export interface Person {
    id: string;
    name: string;
    nickname?: string;
    birthDate: string;  // YYYY-MM-DD format
    age?: number;       // as of 2025
    zodiacSign?: string;
    element?: string;
    note?: string;
  }
  
  export type Anniversary = {
    id: string;
    date: string;
    description: string;
    participants: string[];
  };
  
  export interface Memorial {
    id: string;
    name: string;
    relation: string;
    date: string;      // YYYY-MM-DD format
  }
  
  export interface Pet {
    id: string;
    name: string;
    type: string;
    birthDate: string; // YYYY-MM-DD format
  }
  
  export interface Address {
    id: string;
    residents: string[];
    address: string;
    city: string;
    state: string;
    zip: string;
  }