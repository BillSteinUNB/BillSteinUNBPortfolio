"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)`,

            `radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 60% 20%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)`,

            `radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)`,

            `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Blur overlay for smooth mesh effect */}
      <div className="absolute inset-0 backdrop-blur-[80px]" />
    </div>
  );
}
