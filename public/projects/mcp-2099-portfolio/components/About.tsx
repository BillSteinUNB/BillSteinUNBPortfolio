import React from 'react';
import { TIMELINE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
       <div className="flex items-center gap-4 mb-16 justify-end">
        <h2 className="font-mono text-cyber-primary text-sm tracking-widest">// ORIGIN_PROTOCOL</h2>
        <div className="h-px bg-cyber-gray w-12"></div>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-cyber-gray md:left-1/2"></div>

        <div className="space-y-12">
          {TIMELINE.map((event, index) => (
            <div key={event.nodeId} className={`flex flex-col md:flex-row gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Node Point */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-cyber-black border border-cyber-dim rounded-full z-10">
                <div className="w-2 h-2 bg-cyber-secondary rounded-full animate-pulse shadow-[0_0_10px_#ff4d00]"></div>
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                <div className="glass-panel p-6 rounded-lg border-l-2 border-l-cyber-secondary hover:bg-white/5 transition-colors duration-300">
                  <div className="font-mono text-xs text-cyber-secondary mb-2 opacity-70">
                    [{event.year}] :: {event.nodeId}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="mt-24 glass-panel p-8 rounded-2xl border border-gray-800">
        <h3 className="text-center font-mono text-white mb-8">// SKILL_MATRIX_ACTIVE</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['React 19', 'TypeScript', 'WebGL / Three.js', 'Rust / WASM', 'Tailwind', 'Node.js', 'Solidity', 'Python'].map(skill => (
                <div key={skill} className="py-3 bg-white/5 rounded border border-white/5 text-sm text-gray-300 hover:border-cyber-primary/50 hover:text-cyber-primary transition-all cursor-crosshair">
                    {skill}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;