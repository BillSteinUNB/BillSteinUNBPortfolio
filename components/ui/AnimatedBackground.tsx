"use client";

import { memo, useEffect, useState } from "react";

export const AnimatedBackground = memo(function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile and reduced motion preferences
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    checkMobile();
    setPrefersReducedMotion(motionQuery.matches);

    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", (e) => setPrefersReducedMotion(e.matches));

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Disable animations on mobile or when reduced motion is preferred
  const shouldAnimate = !isMobile && !prefersReducedMotion;

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a] pointer-events-none"
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      {/* Blob 1 - Blue - Using CSS animations instead of JS for better performance */}
      <div
        className={`absolute top-1/4 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-30 ${
          shouldAnimate ? "animate-blob-1" : ""
        }`}
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
          filter: isMobile ? "blur(40px)" : "blur(60px)",
          transform: "translateZ(0)",
        }}
      />

      {/* Blob 2 - Purple */}
      <div
        className={`absolute top-1/3 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-30 ${
          shouldAnimate ? "animate-blob-2" : ""
        }`}
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
          filter: isMobile ? "blur(40px)" : "blur(60px)",
          transform: "translateZ(0)",
        }}
      />

      {/* Blob 3 - Cyan - Hidden on mobile for performance */}
      {!isMobile && (
        <div
          className={`absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-25 ${
            shouldAnimate ? "animate-blob-3" : ""
          }`}
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  );
});
