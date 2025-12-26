import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Brain from '../components/three/Brain';
import StarField from '../components/three/StarField';

interface NeuralNetProps {
  themeColor: string;
  secondaryColor: string;
}

const NeuralNet: React.FC<NeuralNetProps> = ({ themeColor, secondaryColor }) => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-[#050505]">
      {/* HUD Overlay */}
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
         <h2 className="text-3xl font-bold tracking-tight text-white mb-1">SENTIENT CORE</h2>
         <div className="text-[#00f3ff] text-xs font-mono tracking-widest">
            NEURAL_DENSITY: 98.4% // SYNAPSE_FIRING
         </div>
      </div>

      <div className="absolute bottom-10 right-10 z-10 pointer-events-none text-right">
         <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-mono">MEMORY_HEAP</span>
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-[#ff4d00] w-[75%] animate-pulse"></div>
            </div>
         </div>
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color={themeColor} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color={secondaryColor} />
        
        <Brain primaryColor={themeColor} secondaryColor={secondaryColor} />
        <StarField />
        
        <OrbitControls enableZoom={true} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
};

export default NeuralNet;
