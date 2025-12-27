"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Frontend showcase projects
const FRONTEND_PROJECTS = [
  {
    id: "gr-racing",
    title: "GR Racing",
    description: "High-performance real-time telemetry and predictive analytics platform for Toyota GR Hackathon.",
    image: "/images/projects/frontend-showcase-placeholder.svg",
    liveUrl: "https://gr-racing.vercel.app/",
    tags: ["React", "TypeScript", "Vite", "Real-time Data"],
  },
  {
    id: "mcp2099-dev",
    title: "MCP-2099 Dev",
    description: "A hyper-realistic, retro-futuristic developer interface featuring advanced WebGL shaders, holographic UI, and a sentient neural network visualization.",
    image: "/images/projects/frontend-showcase-placeholder.svg",
    liveUrl: "https://mcp2099dev.vercel.app/",
    tags: ["React", "WebGL", "Three.js", "TypeScript"],
  },
  {
    id: "null-void",
    title: "NULL_VOID",
    description: "A white minimalist brutalist ASCII portfolio and generative design studio experiment.",
    image: "/images/projects/frontend-showcase-placeholder.svg",
    liveUrl: "https://null-void.vercel.app/",
    tags: ["React", "ASCII Art", "Minimalist", "Generative"],
  },
  {
    id: "saltwater-inn",
    title: "Saltwater Inn",
    description: "A visually stunning, warm, and inviting landing page for The Saltwater Inn in New Brunswick, featuring a Gemini-powered local concierge.",
    image: "/images/projects/frontend-showcase-placeholder.svg",
    liveUrl: "https://saltwater-inn.vercel.app/",
    tags: ["React", "Gemini AI", "TypeScript", "Hospitality"],
  },
  {
    id: "mcp2099-portfolio",
    title: "MCP-2099 Portfolio",
    description: "A hyper-realistic, retro-futuristic developer portfolio featuring WebGL, GSAP animations, and a cyberpunk aesthetic.",
    image: "/images/projects/frontend-showcase-placeholder.svg",
    liveUrl: "https://mcp2099-portfolio.vercel.app/",
    tags: ["React", "GSAP", "WebGL", "Cyberpunk"],
  },
];

export default function ProjectsGalleryPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frontend Showcase
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-4">
              A collection of frontend experiments and creative web projects built with React, 
              TypeScript, and modern web technologies. Each project explores different design 
              aesthetics and technical challenges.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FRONTEND_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transform hover:scale-105 transition-all inline-flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note for empty state */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-muted-foreground"
        >
          <p className="text-sm">
            More projects coming soon! Check back for updates.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
