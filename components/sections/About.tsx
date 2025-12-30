"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Code2, Briefcase, Award } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-20 md:py-32"
      style={{ contain: "layout style" }}
    >
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
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
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto mb-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/10 bg-muted">
                <Image
                  src="/images/profile.jpg"
                  alt="Bill Stein - Full-Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-2xl rotate-6 transition-transform hover:rotate-3 hover:scale-105 duration-300">
                <Image
                  src="/images/dog.jpg"
                  alt="My loyal coding companion"
                  fill
                  sizes="160px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={Code2} value={5} suffix="+" label="Years Education" />
              <StatCard icon={Briefcase} value={10} suffix="+" label="Projects Completed" />
              <StatCard icon={Award} value={3} suffix="" label="Tech Domains" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Originally from Stephenville, Newfoundland, I'm a 5th year Computer Science student
                at the University of New Brunswick, combining 4 academic years with a full year of
                co-op experience. I've always enjoyed problem solving and building things, and more
                importantly, fixing them when they break. If a solution doesn't exist the way I like
                it, I don't mind creating my own.
              </p>

              <p>
                During my time at UNB, I balanced being a varsity swimmer for 4 years while diving
                deep into tech. I've done a bit of everything: a co-op building internal tools, some
                AI/ML research with a professor, IT support, and even tree planting. Each one taught
                me something different about persistence and adaptability.
              </p>

              <p>
                I don't claim to know everything or to be the best at anything. But I'll attempt
                anything, and if I don't know how, I'll figure it out step by step. Whether it's
                front-end, back-end, infrastructure, or something entirely new, I'm driven by
                curiosity and a willingness to figure things out.
              </p>

              <p>
                When I'm not coding or solving tech problems, you'll find me enjoying the winter
                weather or spending time with my dog.
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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      // Skip animation if reduced motion is preferred
      if (prefersReducedMotion) {
        setCount(value);
        return;
      }

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
  }, [isInView, value, prefersReducedMotion]);

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
