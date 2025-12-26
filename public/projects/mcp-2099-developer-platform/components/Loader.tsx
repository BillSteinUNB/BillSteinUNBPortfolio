import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ringVertexShader, ringFragmentShader } from './three/Shaders';
import * as THREE from 'three';
import ScrambleText from './ui/ScrambleText';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Ring: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={ringVertexShader}
        fragmentShader={ringFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00f3ff') }
        }}
        transparent
      />
    </mesh>
  );
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    // Auto-complete after sequence
    const timer = setTimeout(() => {
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: onComplete
      });
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center text-cyan-500 font-mono overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <Ring />
        </Canvas>
      </div>
      
      <div className="z-10 flex flex-col items-center gap-4">
        <div className="text-sm tracking-[0.2em] text-cyan-800">KERNEL_INIT</div>
        <div className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
           <ScrambleText text="SYSTEM_READY" delay={500} revealSpeed={20} />
        </div>
        
        <div className="mt-8 flex flex-col gap-1 text-xs text-cyan-900/80 w-64">
           <div className="flex justify-between">
              <span>MEM_CHECK</span>
              <ScrambleText text="[OK]" delay={1500} />
           </div>
           <div className="flex justify-between">
              <span>NEURAL_LINK</span>
              <ScrambleText text="[ESTABLISHED]" delay={2200} />
           </div>
           <div className="flex justify-between">
              <span>PROTOCOL_V2</span>
              <ScrambleText text="[CONNECTED]" delay={3000} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
