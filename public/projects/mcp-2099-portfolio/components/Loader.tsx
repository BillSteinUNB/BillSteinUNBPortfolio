import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const words = ['INITIALIZING_CORE', 'LOADING_ASSETS', 'DECRYPTING_BIO', 'ESTABLISHING_UPLINK', 'WELCOME_USER_2099'];

  useEffect(() => {
    let currentWordIndex = 0;
    
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Text glitch effect loop
    const textTimer = setInterval(() => {
      currentWordIndex = (currentWordIndex + 1) % words.length;
      if (progress < 100) {
        setText(words[currentWordIndex]);
      } else {
        setText('SYSTEM_ONLINE');
      }
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5
      })
      .to(containerRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [progress, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-cyber-black flex flex-col items-center justify-center font-mono">
      <div className="w-64 relative">
        <div className="h-1 w-full bg-gray-800 mb-4 overflow-hidden">
          <div 
            className="h-full bg-cyber-primary transition-all duration-75 shadow-[0_0_10px_#00f3ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-cyber-primary opacity-80 mb-2">
          <span>MEM: 64TB</span>
          <span>{progress}%</span>
        </div>
        <h1 ref={textRef} className="text-xl text-white tracking-widest text-center animate-pulse">
          {`> ${text}`}
          <span className="animate-ping">_</span>
        </h1>
      </div>
      
      {/* Decorative ring */}
      <div className="absolute w-[500px] h-[500px] border border-cyber-gray rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />
      <div className="absolute w-[450px] h-[450px] border border-dashed border-cyber-secondary rounded-full opacity-10 animate-[spin_15s_linear_infinite_reverse]" />
    </div>
  );
};

export default Loader;