export const SITE_NAME = "Bill Stein";
export const SITE_TITLE = "Bill Stein - Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Full-Stack Developer and Computer Science student at the University of New Brunswick, specializing in building exceptional digital experiences.";
export const PROFESSIONAL_TITLE = "Full-Stack Developer";
export const EMAIL = "contact@billstein.dev";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/BillSteinUNB",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/billstein3714982",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "/",
    icon: "twitter",
  },
] as const;

export const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML/CSS", icon: "html" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Python", icon: "python" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "REST APIs", icon: "api" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "Vercel", icon: "vercel" },
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
    ],
  },
] as const;

export const PROJECTS = [
  {
    id: "project-astra",
    slug: "astra",
    title: "Project Astra",
    description:
      "A full-stack e-commerce platform built with Next.js and Stripe integration. Features real-time inventory management, advanced search filtering, and a seamless checkout experience with payment processing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
      "Prisma",
    ],
    imageUrl: "https://via.placeholder.com/600x400",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "project-zenith",
    slug: "zenith",
    title: "Project Zenith",
    description:
      "An AI-powered task management application that uses machine learning to prioritize tasks and predict completion times. Includes collaborative features, real-time updates, and intelligent scheduling suggestions.",
    technologies: [
      "React",
      "Node.js",
      "OpenAI API",
      "MongoDB",
      "Socket.io",
      "Express",
    ],
    imageUrl: "https://via.placeholder.com/600x400",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "project-nova",
    slug: "nova",
    title: "Project Nova",
    description:
      "A developer-focused analytics dashboard that visualizes code metrics, team productivity, and project health. Features customizable widgets, dark mode support, and integration with popular version control systems.",
    technologies: [
      "Next.js",
      "TypeScript",
      "D3.js",
      "PostgreSQL",
      "Docker",
      "GitHub API",
    ],
    imageUrl: "https://via.placeholder.com/600x400",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "project-pulse",
    slug: "pulse",
    title: "Project Pulse",
    description:
      "A real-time health monitoring platform for IoT devices. Processes sensor data streams, triggers alerts based on anomaly detection, and provides comprehensive historical analytics through an intuitive interface.",
    technologies: ["Python", "React", "Redis", "WebSockets", "AWS", "FastAPI"],
    imageUrl: "https://via.placeholder.com/600x400",
    demoUrl: "#",
    repoUrl: "#",
  },
] as const;

export const EXPERIENCE = [
  {
    company: "UNB ITS",
    role: "Student IT Consultant",
    dates: "September 2025 - Present",
    achievements: [
      "Provide comprehensive technical support to students, alumni, retirees, and staff through the UNB IT Service Desk",
      "Manage and resolve help desk tickets using Footprints ticketing system across diverse Microsoft software platforms",
      "Troubleshoot complex technical issues including MFA/OAuth authentication, network connectivity, and print queue management",
      "Deliver fast-paced customer service while maintaining high-quality technical solutions for university-wide IT needs",
    ],
  },
  {
    company: "UNB ITS - Faculty of Management",
    role: "Co-op Student ITS Consultant",
    dates: "January 2024 - December 2024",
    achievements: [
      "Collaborated with Level 1 tech support to diagnose and resolve tickets and maintenance requests for faculty-specific technology infrastructure",
      "Developed and implemented automation solutions using MS Power Apps, Snipe-IT database, and PostgreSQL for inventory organization and onboarding workflows",
      "Performed software and hardware maintenance across all campus devices with emphasis on proactive issue prevention and system optimization",
      "Conducted regular auditing and documentation to maintain compliance with university IT standards and procedures",
    ],
  },
  {
    company: "JD Irving",
    role: "Tree Planter",
    dates: "Summer 2023 & 2025",
    achievements: [
      "Demonstrated excellence in repetitive, physically demanding tasks while consistently meeting daily planting quotas",
      "Adapted to challenging work conditions including early morning starts, long variable hours, and unpredictable terrain and weather",
      "Developed resilience and problem-solving skills by adjusting planting techniques based on varying land types and environmental conditions",
      "Built strong work ethic and discipline through sustained performance in demanding outdoor forestry operations",
    ],
  },
] as const;

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;
