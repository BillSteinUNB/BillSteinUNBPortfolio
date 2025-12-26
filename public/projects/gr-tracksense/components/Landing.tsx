import React from 'react';
import { ViewState } from '../types';
import RacingBackground from './RacingBackground';
import TechBackground from './TechBackground';
import { ChevronRight, Cpu, Activity, Zap, Shield, Globe } from 'lucide-react';

interface LandingProps {
  onNavigate: (view: ViewState) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <RacingBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-heading font-bold italic tracking-tighter text-white mb-6 animate-pulse-fast">
            MASTER THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gr to-yellow-500">TRACK</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-body max-w-2xl mx-auto mb-10 border-l-4 border-gr pl-6 text-left">
            Real-time telemetry, AI-driven predictive analytics, and granular control for the GR ecosystem.
          </p>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="group relative px-8 py-4 bg-white text-black font-heading font-bold text-lg tracking-wider hover:bg-gr hover:text-white transition-all duration-300 clip-path-slant"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            ENTER MISSION CONTROL
            <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* CONTEXT / INFO */}
      <section className="relative py-24 bg-zinc-950">
        <TechBackground variant="circuit" className="opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-white mb-6">SYSTEM CONTEXT</h2>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                GR TrackSense integrates directly with vehicle CAN bus data, processing thousands of signals per second. 
                Our proprietary engine interprets physics data to provide actionable insights for drivers and engineers alike.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-800 bg-zinc-900/50">
                   <h3 className="text-gr font-mono text-xl font-bold">5ms</h3>
                   <p className="text-sm text-zinc-500">Latency</p>
                </div>
                <div className="p-4 border border-zinc-800 bg-zinc-900/50">
                   <h3 className="text-gr font-mono text-xl font-bold">10GB+</h3>
                   <p className="text-sm text-zinc-500">Daily Data</p>
                </div>
              </div>
            </div>
            <div className="h-64 md:h-96 w-full border border-zinc-800 bg-zinc-900/30 relative overflow-hidden">
               {/* Decorative schematic UI */}
               <div className="absolute top-0 left-0 p-4 font-mono text-xs text-gr">
                  STATUS: MONITORING<br/>
                  SOURCE: CAN_BUS_A
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Activity size={64} className="text-zinc-700 animate-pulse" />
               </div>
            </div>
        </div>
      </section>

      {/* FEATURES - BENTO GRID */}
      <section className="relative py-24 bg-zinc-900 border-t border-zinc-800">
         <TechBackground variant="grid" className="opacity-10" />
         <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-heading font-bold text-white mb-12 text-center">CORE MODULES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
               {/* Large Card */}
               <div className="md:col-span-2 row-span-2 p-8 border border-zinc-700 bg-zinc-950/80 hover:border-gr transition-colors group">
                  <Cpu className="text-gr w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-2">Neural Engine</h3>
                  <p className="text-zinc-400">
                    Our AI models learn your driving style, predicting optimal braking points and gear shifts in real-time. 
                    Trained on thousands of laps at Fuji Speedway.
                  </p>
               </div>
               {/* Small Cards */}
               <div className="p-6 border border-zinc-700 bg-zinc-950/80 hover:border-gr transition-colors">
                  <Zap className="text-yellow-500 w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold text-white">Live Telemetry</h3>
                  <p className="text-sm text-zinc-400">Sub-millisecond data stream visualization.</p>
               </div>
               <div className="p-6 border border-zinc-700 bg-zinc-950/80 hover:border-gr transition-colors">
                  <Shield className="text-blue-500 w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold text-white">Vehicle Health</h3>
                  <p className="text-sm text-zinc-400">Predictive maintenance alerts.</p>
               </div>
                <div className="md:col-span-1 p-6 border border-zinc-700 bg-zinc-950/80 hover:border-gr transition-colors">
                  <Globe className="text-purple-500 w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold text-white">Global Leaderboard</h3>
                  <p className="text-sm text-zinc-400">Compare telemetry against the pros.</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <TechBackground variant="speed" className="opacity-40" />
        <div className="relative z-10 text-center">
           <h2 className="text-5xl font-heading font-bold italic text-white mb-8">READY TO HACK?</h2>
           <button 
             onClick={() => onNavigate('auth')}
             className="px-12 py-4 bg-gr hover:bg-gr-light text-white font-bold text-xl rounded clip-path-slant shadow-[0_0_50px_rgba(255,69,0,0.4)] hover:shadow-[0_0_80px_rgba(255,69,0,0.6)] transition-all"
           >
             JOIN THE GRID
           </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;