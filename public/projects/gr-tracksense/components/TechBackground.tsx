import React, { useRef, useEffect } from 'react';
import { BackgroundVariant } from '../types';

interface TechBackgroundProps {
  variant: BackgroundVariant;
  className?: string;
  active?: boolean;
}

const TechBackground: React.FC<TechBackgroundProps> = ({ variant, className = "", active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Animation state
    let time = 0;
    const particles: Array<{ x: number, y: number, speed: number, size: number }> = [];

    // Init particles for speed/hex
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 5 + 2,
        size: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);
      time += 0.01;

      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;

      switch (variant) {
        case 'grid':
          const gridSize = 40;
          const offset = (time * 20) % gridSize;
          
          ctx.beginPath();
          // Vertical lines
          for (let x = 0; x < width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
          }
          // Horizontal lines (moving)
          for (let y = offset; y < height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
          }
          ctx.stroke();
          
          // Horizon fade
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, 'rgba(9,9,11,1)');
          gradient.addColorStop(0.5, 'rgba(9,9,11,0)');
          gradient.addColorStop(1, 'rgba(9,9,11,1)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
          break;

        case 'circuit':
          ctx.beginPath();
          for (let i = 0; i < 20; i++) {
            const y = (height / 20) * i;
            const wave = Math.sin(time + i * 0.5) * 50;
            ctx.moveTo(0, y);
            for (let x = 0; x < width; x += 50) {
              const noise = Math.random() > 0.98 ? 10 : 0;
              ctx.lineTo(x, y + (i % 2 === 0 ? wave : -wave) + noise);
            }
          }
          ctx.stroke();
          
          // Data packets
          particles.forEach((p, i) => {
            p.x += p.speed;
            if (p.x > width) p.x = 0;
            ctx.fillStyle = i % 3 === 0 ? '#FF4500' : '#3f3f46';
            ctx.fillRect(p.x, (height/10) * (i % 10) + Math.sin(time)*20, 4, 4);
          });
          break;

        case 'wave':
           for (let i = 0; i < height; i+= 30) {
             ctx.beginPath();
             ctx.moveTo(0, i);
             for(let x = 0; x < width; x+= 10) {
               ctx.lineTo(x, i + Math.sin(x * 0.01 + time + i*0.01) * 20);
             }
             ctx.strokeStyle = `rgba(255, 69, 0, ${0.05 + (i/height) * 0.1})`;
             ctx.stroke();
           }
           break;
        
        case 'hex':
           const hexSize = 30;
           const h = hexSize * Math.sqrt(3);
           const w = hexSize * 2;
           for(let y = 0; y < height + h; y += h * 0.75) {
             for(let x = 0; x < width + w; x += w * 0.75) {
                if(Math.random() > 0.995) {
                   ctx.fillStyle = '#FF4500';
                   ctx.globalAlpha = 0.5 * Math.sin(time * 5);
                   ctx.beginPath();
                   ctx.arc(x, y, 2, 0, Math.PI * 2);
                   ctx.fill();
                   ctx.globalAlpha = 1;
                }
             }
           }
           // Grid logic omitted for brevity, focused on active cells
           break;

        case 'speed':
           ctx.fillStyle = 'rgba(255, 69, 0, 0.5)';
           particles.forEach(p => {
             p.x += p.speed * 4;
             p.y += p.speed * 0.5; // Diagonal
             if (p.x > width) { p.x = -50; p.y = Math.random() * height; }
             if (p.y > height) { p.y = -50; p.x = Math.random() * width; }
             
             ctx.beginPath();
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(p.x - p.speed * 10, p.y - p.speed * 1.25);
             ctx.stroke();
           });
           break;
          
        case 'network':
          ctx.fillStyle = '#52525b';
          particles.forEach((p, i) => {
            p.x += Math.sin(time + i) * 0.5;
            p.y += Math.cos(time + i) * 0.5;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby
            particles.forEach((p2, j) => {
              if (i === j) return;
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(82, 82, 91, ${1 - dist/100})`;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            });
          });
          break;
      }

      // Draw Spine
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.3)';
      ctx.beginPath();
      ctx.moveTo(width * 0.1, 0);
      ctx.lineTo(width * 0.1, height);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, active]);

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 ${className}`} />;
};

export default TechBackground;