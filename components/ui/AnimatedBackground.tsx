"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useId } from "react";

export const AnimatedBackground = memo(function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();
  const noiseId = useId();

  const blobTransition = (duration: number) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a] pointer-events-none"
      aria-hidden="true"
    >
      {/* Blob 1 - Blue */}
      <motion.div
        className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl"
        style={{ willChange: "transform" }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, 100, 0], y: [0, -100, 0] }
        }
        transition={blobTransition(20)}
      />

      {/* Blob 2 - Purple */}
      <motion.div
        className="absolute top-0 right-4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl"
        style={{ willChange: "transform" }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, -100, 0], y: [0, 100, 0] }
        }
        transition={blobTransition(25)}
      />

      {/* Blob 3 - Cyan */}
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl"
        style={{ willChange: "transform" }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, 50, 0], y: [0, -50, 0] }
        }
        transition={blobTransition(18)}
      />

      {/* Noise texture */}
      {!shouldReduceMotion && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.12]"
          focusable="false"
        >
          <defs>
            <filter id={noiseId}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
              />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
        </svg>
      )}
    </div>
  );
});
