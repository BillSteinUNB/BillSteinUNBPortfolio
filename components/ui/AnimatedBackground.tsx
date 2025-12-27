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
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full filter blur-3xl opacity-30"
        style={{ 
          willChange: "transform",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
        }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, 100, 0], y: [0, -50, 0] }
        }
        transition={blobTransition(20)}
      />

      {/* Blob 2 - Purple */}
      <motion.div
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full filter blur-3xl opacity-30"
        style={{ 
          willChange: "transform",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)",
        }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, -80, 0], y: [0, 100, 0] }
        }
        transition={blobTransition(25)}
      />

      {/* Blob 3 - Cyan */}
      <motion.div
        className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full filter blur-3xl opacity-25"
        style={{ 
          willChange: "transform",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, transparent 70%)",
        }}
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, 50, 0], y: [0, -60, 0] }
        }
        transition={blobTransition(18)}
      />

      {/* Noise texture */}
      {!shouldReduceMotion && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
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
