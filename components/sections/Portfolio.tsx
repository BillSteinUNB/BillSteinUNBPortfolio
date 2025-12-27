"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Smartphone, Layout } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
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

const statusConfig = {
  live: { label: "Live", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  testflight: { label: "TestFlight", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  development: { label: "In Development", className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  gallery: { label: "Collection", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
};

function CyclingImage({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src={images[currentIndex]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getDemoIcon = (status?: string) => {
    switch (status) {
      case "testflight":
        return <Smartphone className="mr-2 h-4 w-4" />;
      case "gallery":
        return <Layout className="mr-2 h-4 w-4" />;
      default:
        return <ExternalLink className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and expertise
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={item}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden">
                    {"showcaseImages" in project && project.showcaseImages ? (
                      <CyclingImage images={[...project.showcaseImages]} alt={project.title} />
                    ) : (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                    {project.status && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusConfig[project.status].className}`}>
                          {statusConfig[project.status].label}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="gap-3">
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link
                          href={project.demoUrl}
                          target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
                          rel={project.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {getDemoIcon(project.status)}
                          {"demoLabel" in project ? project.demoLabel : "Demo"}
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
