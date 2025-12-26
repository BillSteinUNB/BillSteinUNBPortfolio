import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from '../components/three/Globe';
import StarField from '../components/three/StarField';
import ScrambleText from '../components/ui/ScrambleText';
import { View } from '../types';

interface HeroProps {
  themeColor: string;
  secondaryColor: string;
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ themeColor, secondaryColor, onCta }) => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Globe primaryColor={themeColor} secondaryColor={secondaryColor} />
          <StarField />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 w-full max-w-7xl px-6 pointer-events-none flex flex-col md:flex-row items-center justify-between">
        <div className="pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-12 h-[1px] bg-cyan-500/50"></div>
             <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
               System Architecture v9.0
             </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 text-white drop-shadow-2xl mix-blend-screen">
            ENGINEERING, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-blue-600 blur-[0.5px]">
              SUPERCHARGED
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed mb-8 backdrop-blur-sm">
            Deploy sentient applications on the decentralized neural grid. 
            Scaling to <span className="text-[#ff4d00] font-mono">2099</span> nodes instantaneously.
          </p>

          <div className="flex gap-4">
             <button 
                onClick={onCta}
                className="group relative px-8 py-4 bg-transparent overflow-hidden border border-white/20 text-white font-mono text-sm tracking-widest hover:border-[#00f3ff] transition-colors"
             >
                <div className="absolute inset-0 w-0 bg-[#00f3ff] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                <span className="relative flex items-center gap-2">
                   INIT_DASHBOARD <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                </span>
             </button>
             
             <div className="px-8 py-4 border border-white/5 bg-black/40 text-gray-500 font-mono text-sm backdrop-blur-md">
                <ScrambleText text="STATUS: ONLINE" speed={100} />
             </div>
          </div>
        </div>

        {/* Floating Stat Card */}
        <div className="hidden md:block pointer-events-auto mt-12 md:mt-0 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
               <span className="text-xs text-gray-400 font-mono">ACTIVE_NODES</span>
               <span className="text-[#00f3ff] font-mono animate-pulse">● LIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-2xl font-bold font-mono">4,291</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Clusters</div>
               </div>
               <div>
                  <div className="text-2xl font-bold font-mono text-[#ff4d00]">99.9%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Uptime</div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
