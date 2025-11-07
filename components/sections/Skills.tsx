"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section id="skills" ref={ref} className="py-20 md:py-32 bg-muted/30">
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
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {SKILLS.map((skillCategory) => (
            <motion.div
              key={skillCategory.category}
              variants={item}
              className="bg-card border rounded-lg p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-center mb-4">
                {skillCategory.category}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillCategory.items.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="text-sm py-1.5 px-3"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
