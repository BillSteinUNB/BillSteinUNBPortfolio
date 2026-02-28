"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const githubLink = SOCIAL_LINKS.find((l) => l.name === "GitHub");
  const linkedinLink = SOCIAL_LINKS.find((l) => l.name === "LinkedIn");

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative px-4 py-16 md:py-24 lg:py-32"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-6">
          
          {/* Profile Image */}
          <motion.div variants={item} className="relative group">
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-border/50 ring-offset-4 ring-offset-background transition-all duration-300 group-hover:ring-primary/30">
              <Image
                src="/images/profile.jpg"
                alt="Bill Stein"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="space-y-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {SITE_NAME}
            </h1>
          </motion.div>

          {/* Terminal-style tagline */}
          <motion.div variants={item} className="font-mono text-sm md:text-base text-muted-foreground flex items-center gap-2">
            <span className="text-primary">$</span>
            <span>whoami</span>
            <span className="text-muted-foreground/50">//</span>
            <span>developer, builder, problem-solver</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
              className="text-primary ml-0.5"
            >
              _
            </motion.span>
          </motion.div>

          {/* Personal Bio */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
          >
            I'm a 5th year CS student at UNB who genuinely enjoys building things. 
            Doesn't matter if it's a quick script, a full-stack app, or figuring out 
            why something broke—I just like the process of making stuff work.
          </motion.p>

          {/* Minimal CTAs - Single button + inline socials */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="
                inline-flex items-center gap-2 px-6 py-3 
                bg-foreground text-background font-medium rounded-lg
                transition-all duration-200
                hover:bg-foreground/90 hover:scale-[1.02] 
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              "
            >
              View my work
              <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
            </button>

            {/* Inline social links */}
            <div className="flex items-center gap-3 text-muted-foreground">
              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {linkedinLink && (
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Scroll indicator - subtle */}
          <motion.div
            variants={item}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-muted-foreground/40"
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
