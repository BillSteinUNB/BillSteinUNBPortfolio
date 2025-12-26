import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { globeVertexShader, globeFragmentShader } from './Shaders';

interface GlobeProps {
  primaryColor: string;
  secondaryColor: string;
}

const Globe: React.FC<GlobeProps> = ({ primaryColor, secondaryColor }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uColorA.value = new THREE.Color(primaryColor);
      materialRef.current.uniforms.uColorB.value = new THREE.Color(secondaryColor);
    }
  });

  const uniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(primaryColor) },
    uColorB: { value: new THREE.Color(secondaryColor) },
  };

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={globeVertexShader}
        fragmentShader={globeFragmentShader}
        uniforms={uniforms}
        transparent
        wireframe={false}
      />
    </mesh>
  );
};

export default Globe;
