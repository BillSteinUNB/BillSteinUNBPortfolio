"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function BackgroundDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dot Grid Effect (Right Side)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth / 2; // Half screen
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Dot grid settings
    const dotSpacing = 40;
    const dotRadius = 2;
    const glowRadius = 150;
    let mouseX = -1000;
    let mouseY = -1000;

    // Track mouse position (relative to right half of screen)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          // Calculate distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate glow intensity
          const intensity = Math.max(0, 1 - distance / glowRadius);

          if (intensity > 0) {
            // Glowing dot
            const size = dotRadius + intensity * 4;
            const opacity = 0.3 + intensity * 0.7;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`; // Primary blue
            ctx.fill();

            // Glow effect
            if (intensity > 0.5) {
              ctx.beginPath();
              ctx.arc(x, y, size * 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(59, 130, 246, ${intensity * 0.2})`;
              ctx.fill();
            }
          } else {
            // Normal dot
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(100, 116, 139, 0.3)"; // Muted
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Left Side - Mesh Gradient */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
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

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[80px]" />

        {/* Label */}
        <div className="absolute top-8 left-8 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
          <p className="text-sm font-medium">Animated Mesh Gradient</p>
          <p className="text-xs text-muted-foreground">Smooth, flowing colors</p>
        </div>
      </div>

      {/* Right Side - Dot Grid */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <canvas
          ref={canvasRef}
          className="absolute right-0 top-0"
        />

        {/* Label */}
        <div className="absolute top-8 right-8 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
          <p className="text-sm font-medium">Interactive Dot Grid</p>
          <p className="text-xs text-muted-foreground">Move your mouse!</p>
        </div>
      </div>

      {/* Center Divider */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-border -translate-x-1/2" />
    </div>
  );
}
