export type ViewState = 'landing' | 'dashboard' | 'auth' | 'team' | 'docs';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image?: string; // Placeholder ID
}

export interface TelemetryData {
  rpm: number;
  speed: number;
  gear: number;
  throttle: number; // 0-100
  brake: number; // 0-100
  steering: number; // -90 to 90
  latG: number;
  longG: number;
  lapTime: string;
  tireTemps: { fl: number; fr: number; rl: number; rr: number };
}

export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export type BackgroundVariant = 'circuit' | 'grid' | 'wave' | 'network' | 'hex' | 'speed';
