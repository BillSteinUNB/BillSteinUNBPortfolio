"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Code2, Briefcase, Award } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about who I am and what I do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-primary/10">
              <Image
                src="https://via.placeholder.com/600x600"
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCard icon={Code2} value={7} suffix="+" label="Years Experience" />
              <StatCard icon={Briefcase} value={50} suffix="+" label="Projects Completed" />
              <StatCard icon={Award} value={15} suffix="+" label="Happy Clients" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I'm a passionate full-stack developer currently in my 5th year
                of Computer Science at the University of New Brunswick. My
                journey in tech started with a curiosity about how things work,
                and has evolved into a dedication to crafting elegant,
                user-centric solutions that solve real-world problems.
              </p>

              <p>
                I specialize in modern JavaScript frameworks, particularly React
                and Next.js, and have a strong foundation in backend
                technologies. I believe in writing clean, maintainable code and
                following best practices to ensure scalability and performance.
              </p>

              <p>
                When I'm not coding or studying, you'll find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community. I'm always eager to take
                on new challenges and collaborate on innovative projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
}

function StatCard({ icon: Icon, value, suffix = "", label }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="bg-card border rounded-lg p-4 text-center space-y-2"
    >
      <Icon className="h-6 w-6 mx-auto text-primary" />
      <div className="text-2xl font-bold">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
