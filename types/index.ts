export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  showcaseImages?: string[];
  demoUrl: string | null;
  demoLabel?: string;
  repoUrl: string | null;
  githubRepo?: { owner: string; name: string };
  status?: "live" | "testflight" | "development" | "gallery";
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  achievements: string[];
}

export interface NavLink {
  name: string;
  href: string;
}
