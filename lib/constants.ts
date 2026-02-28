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
    id: "frontend",
    title: "Frontend & Mobile",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Swift", level: 70 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "React", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Figma", level: 65 },
    ],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    skills: [
      { name: "Python", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "FastAPI", level: 60 },
      { name: "Django", level: 55 },
      { name: "PostgreSQL", level: 72 },
      { name: "MongoDB", level: 68 },
      { name: "Firebase", level: 70 },
      { name: "REST APIs", level: 85 },
      { name: "GraphQL", level: 60 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 65 },
      { name: "Terraform", level: 45 },
      { name: "Docker", level: 70 },
      { name: "Kubernetes", level: 40 },
      { name: "GitHub Actions", level: 75 },
      { name: "Vercel", level: 85 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Xcode", level: 70 },
      { name: "Cursor", level: 80 },
      { name: "OpenCode", level: 75 },
      { name: "Git", level: 88 },
      { name: "Jira", level: 70 },
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
    githubRepo: { owner: "BillSteinUNB", name: "gymmark" },
    status: "testflight" as const,
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
    imageUrl: "/images/projects/showcase/gr-racing.png",
    showcaseImages: [
      "/images/projects/showcase/gr-racing.png",
      "/images/projects/showcase/MCP2099Dev.png",
      "/images/projects/showcase/MCP2099Portfolio.png",
      "/images/projects/showcase/Null_void.png",
      "/images/projects/showcase/SaltwaterInn.png",
      "/images/projects/showcase/SweetHaven.png",
      "/images/projects/showcase/Vault.png",
    ],
    demoUrl: "/projects",
    demoLabel: "View Gallery",
    repoUrl: null,
    status: "gallery" as const,
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
    imageUrl: "/images/projects/BettingDashboard.png",
    demoUrl: "https://betting-dashboard-sand.vercel.app/",
    repoUrl: "https://github.com/BillSteinUNB/bettingDashboard",
    githubRepo: { owner: "BillSteinUNB", name: "bettingDashboard" },
    status: "development" as const,
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
    githubRepo: { owner: "BillSteinUNB", name: "Boring-App" },
    status: "development" as const,
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
