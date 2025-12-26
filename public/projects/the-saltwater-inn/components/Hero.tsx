import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// Fix: Add ScrollTrigger to Window interface
declare global {
  interface Window {
    ScrollTrigger: any;
  }
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect logic
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 30,
        scale: 1.1,
        ease: "none"
      });

      window.gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "400px top",
          scrub: true
        },
        yPercent: 50,
        opacity: 0,
        ease: "none"
      });
    }
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/saltwaterinn/1920/1200')", 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bay-blue/30 via-transparent to-bay-blue/60 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="font-sans text-sunlit-gold tracking-[0.2em] text-sm md:text-base uppercase mb-4 animate-fade-in">
          Welcome to New Brunswick
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-lg opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
          Experience True <br />
          <span className="italic">Maritime Comfort</span>
        </h1>
        
        <button 
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all duration-300 overflow-hidden"
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth'})}
        >
          <span className="font-serif text-lg tracking-wide relative z-10">Book Your Stay</span>
          <div className="absolute inset-0 bg-sunlit-gold/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 z-10 animate-bounce cursor-pointer text-white/70 hover:text-white" onClick={scrollToContent}>
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;