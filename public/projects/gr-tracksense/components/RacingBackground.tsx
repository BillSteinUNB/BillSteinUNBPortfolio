import React, { useRef, useEffect } from 'react';

const RacingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
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

    let speed = 2;
    let offset = 0;

    const draw = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(9, 9, 11, 0.5)';
      ctx.fillRect(0, 0, width, height);

      const horizon = height * 0.4;
      const centerX = width * 0.5;
      
      offset += speed;
      if(offset > 20) offset = 0;

      // Draw Track Grid (Floor)
      ctx.strokeStyle = '#FF4500';
      ctx.lineWidth = 1;

      // Perspective Lines
      for (let i = -10; i <= 10; i++) {
        const x = centerX + i * 100;
        ctx.beginPath();
        ctx.moveTo(centerX, horizon);
        ctx.lineTo(x + i * width * 0.5, height); // Fan out
        ctx.strokeStyle = `rgba(82, 82, 91, ${Math.abs(i) < 2 ? 0.5 : 0.1})`;
        ctx.stroke();
      }

      // Horizontal Moving Lines (Speed effect)
      for(let i = 0; i < 20; i++) {
         const y = horizon + Math.pow(i / 20, 2) * (height - horizon);
         const alpha = i / 20;
         // Animate y slightly
         const movingY = y + (offset * (y - horizon) * 0.05); 
         
         if(movingY > height) continue;

         ctx.beginPath();
         ctx.moveTo(0, movingY);
         ctx.lineTo(width, movingY);
         ctx.strokeStyle = `rgba(255, 69, 0, ${alpha * 0.3})`;
         ctx.stroke();
      }
      
      // Kerbs
      const trackWidthBase = width * 0.8;
      const trackWidthTop = width * 0.05;
      
      ctx.beginPath();
      ctx.moveTo(centerX - trackWidthTop, horizon);
      ctx.lineTo(centerX - trackWidthBase, height);
      ctx.strokeStyle = '#FF4500';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + trackWidthTop, horizon);
      ctx.lineTo(centerX + trackWidthBase, height);
      ctx.stroke();


      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default RacingBackground;