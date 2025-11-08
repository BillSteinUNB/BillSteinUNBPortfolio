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
    company: "TechCorp Solutions",
    role: "Senior Software Engineer",
    dates: "2022 - Present",
    achievements: [
      "Engineered a microservices architecture that improved system reliability by 40% and reduced deployment time by 60%",
      "Led a team of 5 developers in building a customer-facing dashboard that serves 100K+ daily active users",
      "Implemented automated testing strategies that increased code coverage from 45% to 92% across all services",
    ],
  },
  {
    company: "InnovateLab Inc",
    role: "Software Engineer",
    dates: "2020 - 2022",
    achievements: [
      "Developed a real-time collaboration feature using WebSockets that became the most-used product feature within 3 months",
      "Refactored legacy codebase reducing technical debt and improving application performance by 35%",
      "Mentored 3 junior developers and established coding standards that were adopted company-wide",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    dates: "2018 - 2020",
    achievements: [
      "Built responsive web applications from scratch using React and modern JavaScript frameworks",
      "Collaborated with designers to create pixel-perfect implementations of UI/UX designs",
      "Optimized application bundle size by 50% through code splitting and lazy loading techniques",
    ],
  },
] as const;

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;
