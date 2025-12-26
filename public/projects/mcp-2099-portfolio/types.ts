export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  year: string;
  image?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  nodeId: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
}