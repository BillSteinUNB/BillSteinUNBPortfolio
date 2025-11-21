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
              <StatCard icon={Code2} value={5} suffix="+" label="Years Education" />
              <StatCard icon={Briefcase} value={10} suffix="+" label="Projects Completed" />
              <StatCard icon={Award} value={3} suffix="" label="Tech Domains" />
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
                Originally from Stephenville, Newfoundland, I'm a 5th year Computer Science student
                at the University of New Brunswick, combining 4 academic years with a full year of
                co-op experience. I've always enjoyed problem solving and building things—and more
                importantly, fixing them when they break. If a solution doesn't exist the way I like
                it, I don't mind creating my own.
              </p>

              <p>
                During my time at UNB, I balanced being a university athlete for 4 years while
                diving deep into tech. I've had the opportunity to work with a professor on
                AI/ML language dissecting models, which was an incredibly rewarding experience.
                My professional journey spans full-stack development, IT consulting, and even
                tree planting—each teaching me valuable lessons about persistence and adaptability.
              </p>

              <p>
                What makes my approach unique? I don't claim to know everything or to be the
                best at anything. But I will attempt anything and learn step by step if I don't
                know how. Whether it's front-end development, back-end systems, IT infrastructure,
                or entirely new domains, I'm driven by curiosity and a willingness to tackle
                challenges head-on.
              </p>

              <p>
                When I'm not coding or solving tech problems, you'll find me enjoying the winter
                weather or spending time with my dog. I've found that the same patience and
                problem-solving mindset that works in development applies just as well to life
                outside of tech.
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
