"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export interface NowSectionProps {
  focus: {
    year: number;
    items: string[];
  };
}

export function NowSection({ focus }: NowSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="now"
      ref={ref}
      className="py-20 md:py-32"
      style={{ contain: "layout style" }}
    >
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {focus.year} Focus
            </h2>
            <p className="text-muted-foreground">
              What I'm currently working on and learning
            </p>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 md:p-8 font-mono text-sm md:text-base"
          >
            {/* Terminal-style header */}
            <div className="mb-6 pb-4 border-b border-muted flex items-center gap-2">
              <span className="text-xs text-muted-foreground">$ focus</span>
              <span className="text-primary animate-pulse">_</span>
            </div>

            {/* Focus items */}
            <div className="space-y-3">
              {focus.items.map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: prefersReducedMotion ? 0 : -10 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
                  }}
                  className="flex gap-3 text-foreground"
                >
                  <span className="text-primary flex-shrink-0">•</span>
                  <span className="flex-1 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
