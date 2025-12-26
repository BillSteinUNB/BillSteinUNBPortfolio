import React, { useEffect, useRef, useState } from 'react';

// Declaration for GSAP on window to satisfy TS
declare global {
  interface Window {
    gsap: any;
  }
}

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = window.gsap.timeline({
      onComplete: () => {
        // Slight delay before unmounting
        setTimeout(onComplete, 500);
      }
    });

    tl.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    })
    .fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(subtextRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=1.0"
    )
    .to([textRef.current, subtextRef.current], {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 1.5,
      ease: "power2.in"
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bay-blue text-white opacity-0 pointer-events-none"
    >
      {/* Background with slight texture/image overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center"></div>
      
      <div className="z-10 text-center px-4">
        <h1 ref={textRef} className="font-serif text-4xl md:text-6xl tracking-wider mb-4 text-sunlit-gold">
          The Saltwater Inn
        </h1>
        <p ref={subtextRef} className="font-sans text-sm md:text-lg tracking-widest text-morning-fog uppercase opacity-80">
          A place to gather, rest, and belong
        </p>
      </div>
    </div>
  );
};

export default Loader;