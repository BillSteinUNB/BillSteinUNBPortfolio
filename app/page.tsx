import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Portfolio } from "@/components/sections/Portfolio";
import { NowSection } from "@/components/sections/NowSection";
import { ASCIIFooter } from "@/components/layout/ASCIIFooter";

const TECH_STACK = [
  "TypeScript", "React", "Next.js", "Node.js", "Python",
  "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "Git"
];

const NOW_FOCUS = {
  year: 2026,
  items: [
    "Building side projects with Next.js and TypeScript",
    "Exploring AI/ML integration in web apps",
    "Contributing to open source",
    "PLACEHOLDER: Add your current focus items here"
  ]
};

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee technologies={TECH_STACK} />
      <Portfolio />
      <NowSection focus={NOW_FOCUS} />
      <ASCIIFooter />
    </>
  );
}
