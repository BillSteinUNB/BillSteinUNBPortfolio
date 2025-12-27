"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import { SKILLS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
} as const;

export function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I
            work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {SKILLS.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-4 flex flex-col h-full hover:border-primary/50 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="space-y-2 flex-1">
                {category.skills.map((skill) => (
                  <SkillRow
                    key={`${category.id}-${skill.name}`}
                    name={skill.name}
                    level={skill.level}
                    showAnimation={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillRow({
  name,
  level,
  showAnimation,
}: {
  name: string;
  level: number;
  showAnimation: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const id = useId();

  const clampedLevel = Math.min(100, Math.max(0, level));

  // 0-100 -> Hue 0-120 (red -> yellow -> green)
  const hue = (clampedLevel / 100) * 120;
  const color = `hsl(${hue}, 70%, 45%)`;

  const labelId = `${id}-label`;
  const valueId = `${id}-value`;

  return (
    <div className="group grid grid-cols-[minmax(0,1fr),1fr,auto] items-center gap-2 hover:bg-muted/50 p-1 -mx-1 rounded transition-colors">
      <span
        id={labelId}
        className="min-w-0 text-sm text-foreground group-hover:text-primary transition-colors truncate"
        title={name}
      >
        {name}
      </span>

      <div
        className="h-1.5 w-full bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-labelledby={labelId}
        aria-describedby={valueId}
        aria-valuenow={clampedLevel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${clampedLevel}%`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            transformOrigin: "left",
            willChange: "transform",
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: showAnimation ? clampedLevel / 100 : 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
        />
      </div>

      <span
        id={valueId}
        className="text-xs text-muted-foreground w-8 text-right tabular-nums"
      >
        {clampedLevel}%
      </span>
    </div>
  );
}
