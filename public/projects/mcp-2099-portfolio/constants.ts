import { NavItem, Project, TimelineEvent } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '// ZERO_POINT', href: '#home' },
  { id: 'work', label: '// MODULES', href: '#work' },
  { id: 'about', label: '// MEMORY_LOG', href: '#about' },
  { id: 'contact', label: '// UPLINK', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'NEURAL_SYNAPSE_V1',
    category: 'AI Interface',
    description: 'Generative AI interface mapping distinct neural pathways to visual output.',
    techStack: ['React', 'WebGL', 'TensorFlow.js'],
    year: '2098',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'p2',
    title: 'QUANTUM_LEDGER',
    category: 'FinTech',
    description: 'Decentralized exchange dashboard visualizing heavy data streams in real-time.',
    techStack: ['Rust', 'WASM', 'D3.js'],
    year: '2098',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: 'p3',
    title: 'VOID_WALKER',
    category: 'Game Dev',
    description: 'Browser-based raytracing engine demo exploring infinite procedural corridors.',
    techStack: ['Three.js', 'GLSL', 'WebGPU'],
    year: '2097',
    image: 'https://picsum.photos/600/400?random=3'
  },
  {
    id: 'p4',
    title: 'CYBER_SECURITY_GRID',
    category: 'Security',
    description: 'Holographic intrusion detection system for enterprise networks.',
    techStack: ['Python', 'React Flow', 'Socket.io'],
    year: '2099',
    image: 'https://picsum.photos/600/400?random=4'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2090',
    title: 'GENESIS SEQUENCE',
    description: 'Initial boot. Acquired fascination with silicon-based logic structures.',
    nodeId: 'SEQ_001'
  },
  {
    year: '2095',
    title: 'SYSTEM EVOLUTION',
    description: 'Upgrade to Full-Stack Architect. Mastered the quantum-web protocols.',
    nodeId: 'SEQ_002'
  },
  {
    year: '2099',
    title: 'CURRENT NODE',
    description: 'Operating at peak efficiency. Building the bridge between human intent and machine execution.',
    nodeId: 'SEQ_003'
  }
];