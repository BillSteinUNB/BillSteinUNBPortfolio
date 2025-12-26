import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    ).fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="z-10 max-w-5xl">
        <div className="mb-6 inline-block">
          <span className="py-1 px-3 border border-cyber-primary/30 rounded text-cyber-primary font-mono text-xs tracking-[0.2em] bg-cyber-primary/5">
            SYSTEM_ID: MCP-2099
          </span>
        </div>
        
        <h1 ref={titleRef} className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-tight mix-blend-screen holographic-text">
          ENGINEERING,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
            SUPERCHARGED.
          </span>
        </h1>

        <p ref={subtitleRef} className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed border-l-2 border-cyber-secondary pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          Architecting hyper-scalable interfaces for the post-silicon era. 
          Specialized in React ecosystems, WebGL visualizations, and neural interface design.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button className="px-8 py-3 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary font-mono text-xs tracking-widest hover:bg-cyber-primary hover:text-black transition-all duration-300 uppercase clip-path-slant">
            Initialize Project
          </button>
          <button className="px-8 py-3 border border-gray-700 text-gray-400 font-mono text-xs tracking-widest hover:border-cyber-secondary hover:text-cyber-secondary transition-all duration-300 uppercase">
             Decrypt Logs
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;