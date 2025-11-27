"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at center, hsl(var(--foreground)) 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle radial glow in top right - adds depth without blur */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.15] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
