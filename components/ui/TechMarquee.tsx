'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TechMarqueeProps extends HTMLAttributes<HTMLDivElement> {
  technologies: string[];
  separator?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function TechMarquee({
  technologies,
  separator = '//',
  speed = 'normal',
  className,
  ...props
}: TechMarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '30s',
    fast: '20s',
  };

  const animationDuration = speedMap[speed];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-background/50 border-y border-foreground/10',
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-content {
            animation: none !important;
          }
        }

        .tech-marquee-content {
          animation: marquee ${animationDuration} linear infinite;
          display: flex;
          gap: 2rem;
          padding: 1.5rem 0;
          width: max-content;
        }

        .tech-marquee-wrapper {
          display: flex;
        }
      `}</style>

      <div className="tech-marquee-wrapper">
        <div className="tech-marquee-content">
          {technologies.map((tech, idx) => (
            <div
              key={`first-${idx}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-foreground/80"
            >
              <span>{tech}</span>
              {idx < technologies.length - 1 && (
                <span className="text-foreground/40">{separator}</span>
              )}
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className="tech-marquee-content"
          aria-hidden="true"
        >
          {technologies.map((tech, idx) => (
            <div
              key={`second-${idx}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-foreground/80"
            >
              <span>{tech}</span>
              {idx < technologies.length - 1 && (
                <span className="text-foreground/40">{separator}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges for visual polish */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background/50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background/50 to-transparent" />
    </div>
  );
}
