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
    id: "gymmark",
    slug: "gymmark",
    title: "GymMark",
    description:
      "A native iOS fitness tracking app built with SwiftUI and Firebase. Features workout logging, weight tracking with Apple HealthKit integration, TDEE calculator, cloud sync across devices, and personalized training insights.",
    technologies: [
      "Swift",
      "SwiftUI",
      "Firebase",
      "HealthKit",
      "Xcode Cloud",
      "Core Data",
    ],
    imageUrl: "/images/projects/gymmark.png",
    demoUrl: "#contact",
    demoLabel: "Join TestFlight",
    repoUrl: null,
    status: "testflight" as const,
  },
  {
    id: "boring-app",
    slug: "boring-app",
    title: "The Boring App",
    description:
      "A minimalist timer app designed to encourage intentional boredom. No gamification, no notifications, no analytics—just a timer. Built with React Native and Expo, featuring iOS Live Activities and Android foreground notifications.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Live Activities",
      "iOS",
      "Android",
    ],
    imageUrl: "/images/projects/BoringApp.png",
    demoUrl: null,
    repoUrl: "https://github.com/BillSteinUNB/Boring-App",
    status: "development" as const,
  },
  {
    id: "betting-dashboard",
    slug: "betting-dashboard",
    title: "Betting Dashboard",
    description:
      "A Python-based sports betting analytics platform for tracking statistics and performance across betting platforms. Features data visualization, historical analysis, and multi-network support for comprehensive betting insights.",
    technologies: [
      "Python",
      "Data Analysis",
      "Visualization",
      "Statistics",
      "Pandas",
      "APIs",
    ],
    imageUrl: "/images/projects/betting-dashboard-placeholder.svg",
    demoUrl: null,
    repoUrl: "https://github.com/BillSteinUNB/bettingDashboard",
    status: "development" as const,
  },
  {
    id: "frontend-showcase",
    slug: "frontend-showcase",
    title: "Frontend Showcase",
    description:
      "A collection of creative frontend experiments built with React, TypeScript, and modern web technologies. Features WebGL visualizations, AI integrations, retro-futuristic designs, and interactive experiences.",
    technologies: [
      "React",
      "TypeScript",
      "WebGL",
      "GSAP",
      "Vite",
      "Gemini AI",
    ],
    imageUrl: "/images/projects/frontend-showcase-placeholder.svg",
    demoUrl: "/projects",
    demoLabel: "View Gallery",
    repoUrl: null,
    status: "gallery" as const,
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
