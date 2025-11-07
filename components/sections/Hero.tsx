"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { SITE_NAME, PROFESSIONAL_TITLE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Hero() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container px-4 py-16 md:py-24 lg:py-32"
      >
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Greeting */}
          <motion.div variants={item} className="space-y-2">
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Hello, I'm
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {SITE_NAME}
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={item}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
              {PROFESSIONAL_TITLE}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground"
          >
            5th year Computer Science student at the University of New
            Brunswick, specializing in full-stack development and building
            exceptional digital experiences with modern web technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="min-w-[160px]"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="min-w-[160px]"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="min-w-[160px]"
            >
              <a href="/resume/Bill_Stein_Resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={item}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
