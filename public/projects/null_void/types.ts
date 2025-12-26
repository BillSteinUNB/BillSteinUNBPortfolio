export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  ascii: string;
}

export enum TerminalStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  TYPING = 'TYPING',
  ERROR = 'ERROR',
}

export interface ChatMessage {
  role: 'user' | 'system' | 'model';
  content: string;
  timestamp: number;
}
