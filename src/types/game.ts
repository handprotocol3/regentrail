// Add Event type
export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  attendees: number;
  location: string;
  travelText: string;
  link?: string;
  schedule?: Array<{
    time: string;
    activity: string;
  }>;
}

export interface Points {
  earth: number;
  space: number;
  hand: number;
  carbon: number;
}

export interface User {
  id: string;
  username: string | null;
  points: Points;
  createdAt: number;
}

// ... rest of your existing types