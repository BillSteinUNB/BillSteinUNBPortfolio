export interface Room {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  amenities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Guest from Toronto", "Local Fisherman"
  text: string;
  image: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
