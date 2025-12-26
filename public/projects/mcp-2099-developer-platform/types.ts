export enum View {
  HERO = 'HERO',
  INTERFACE = 'INTERFACE',
  NEURAL_NET = 'NEURAL_NET',
  PROTOCOL = 'PROTOCOL',
  LOGS = 'LOGS',
  DASHBOARD = 'DASHBOARD'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'SEC' | 'ERR';
  message: string;
}

export interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export type ThemeMode = 'dark' | 'light';
