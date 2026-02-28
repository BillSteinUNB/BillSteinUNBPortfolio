"use client";

import { useState, useEffect, memo } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Smartphone,
  Layout,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CommitTimeline } from "@/components/ui/CommitTimeline";
import { cn } from "@/lib/utils";

/* ── status badge config ──────────────────────────────────────── */
const statusConfig = {
  live: {
    label: "Live",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  testflight: {
    label: "TestFlight",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  development: {
    label: "In Development",
    className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  gallery: {
    label: "Collection",
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
} as const;

/* ── cycling image for showcase projects ──────────────────────── */
const CyclingImage = memo(function CyclingImage({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, prefersReducedMotion]);

  return (
    <div className="absolute inset-0">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          style={{ position: "absolute" }}
        />
      ))}
    </div>
  );
});

/* ── demo button icon helper ──────────────────────────────────── */
function getDemoIcon(status?: string) {
  switch (status) {
    case "testflight":
      return <Smartphone className="mr-2 h-4 w-4" />;
    case "gallery":
      return <Layout className="mr-2 h-4 w-4" />;
    default:
      return <ExternalLink className="mr-2 h-4 w-4" />;
  }
}

/* ── project data type (accepts readonly from `as const`) ─────── */
type ProjectData = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly imageUrl: string;
  readonly showcaseImages?: readonly string[];
  readonly demoUrl: string | null;
  readonly demoLabel?: string;
  readonly repoUrl: string | null;
  readonly githubRepo?: { readonly owner: string; readonly name: string };
  readonly status?: "live" | "testflight" | "development" | "gallery";
};

interface ProjectCardProps {
  project: ProjectData;
}

/* ── main component ───────────────────────────────────────────── */
export const ProjectCard = memo(function ProjectCard({
  project,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  // Once loaded, keep CommitTimeline mounted to preserve fetched data
  const [loaded, setLoaded] = useState(false);
  const hasTimeline = !!project.githubRepo;

  function handleToggle() {
    if (!loaded) setLoaded(true);
    setExpanded((prev) => !prev);
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      {/* ── project image ──────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden">
        {project.showcaseImages ? (
          <CyclingImage
            images={[...project.showcaseImages]}
            alt={project.title}
          />
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {project.status && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full border ${statusConfig[project.status].className}`}
            >
              {statusConfig[project.status].label}
            </span>
          </div>
        )}
      </div>

      {/* ── header ─────────────────────────────────────────── */}
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      {/* ── tech badges ────────────────────────────────────── */}
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* ── expandable commit timeline ─────────────────────── */}
      {hasTimeline && (
        <div className="px-6 pb-3">
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-controls={`timeline-${project.id}`}
            className={cn(
              "flex w-full items-center gap-2 rounded border border-dashed px-3 py-2",
              "font-mono text-xs transition-colors cursor-pointer",
              "border-border/60 text-muted-foreground",
              "hover:border-primary/50 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <span className="text-primary/70">$</span>
            <span className="flex-1 text-left">git log --oneline</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>

          {/* Expandable region — uses CSS grid for smooth height transition */}
          <div
            id={`timeline-${project.id}`}
            role="region"
            aria-label={`Recent commits for ${project.title}`}
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              expanded
                ? "grid-rows-[1fr] opacity-100 mt-3"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded border border-dashed border-border/40 bg-muted/30 p-3">
                {/* ASCII header decoration */}
                <div className="mb-2 flex items-center gap-2 border-b border-dashed border-border/40 pb-2 font-mono text-[10px] text-muted-foreground/60">
                  <span>┌─</span>
                  <span>recent activity</span>
                  <span className="flex-1 border-b border-dashed border-border/30" />
                  <span>─┐</span>
                </div>

                {/* Lazy-loaded: only mounts after first expand, stays mounted */}
                {loaded && project.githubRepo && (
                  <CommitTimeline repo={project.githubRepo} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── footer links ───────────────────────────────────── */}
      <CardFooter className="gap-3">
        {project.demoUrl && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link
              href={project.demoUrl}
              target={
                project.demoUrl.startsWith("http") ? "_blank" : undefined
              }
              rel={
                project.demoUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {getDemoIcon(project.status)}
              {project.demoLabel ?? "Demo"}
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
        )}
        {!project.demoUrl && !project.repoUrl && (
          <div className="flex-1 text-center text-sm text-muted-foreground">
            Coming Soon
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
