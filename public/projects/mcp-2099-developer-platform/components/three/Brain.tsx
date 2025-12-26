import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brainVertexShader, brainFragmentShader } from './Shaders';

interface BrainProps {
  primaryColor: string;
  secondaryColor: string;
}

const Brain: React.FC<BrainProps> = ({ primaryColor, secondaryColor }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.005;
      // Heartbeat pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = {
    uTime: { value: 0 },
    uBaseColor: { value: new THREE.Color(primaryColor) },
    uSignalColor: { value: new THREE.Color(secondaryColor) },
  };

  return (
    <group>
      {/* Central Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={brainVertexShader}
          fragmentShader={brainFragmentShader}
          uniforms={uniforms}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Particle Cloud */}
      <ParticleCloud count={400} color={secondaryColor} />
    </group>
  );
};

const ParticleCloud: React.FC<{ count: number, color: string }> = ({ count, color }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      temp.push({ x, y, z, vx: (Math.random()-0.5)*0.01, vy: (Math.random()-0.5)*0.01, vz: (Math.random()-0.5)*0.01 });
    }
    return temp;
  }, [count]);

  const [hovered, setHover] = useState<number | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Basic movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      // Keep within bounds (simple constraint)
      const dist = Math.sqrt(particle.x**2 + particle.y**2 + particle.z**2);
      if (dist > 5 || dist < 2.0) {
        particle.vx *= -1;
        particle.vy *= -1;
        particle.vz *= -1;
      }
      
      // Interaction Repulsion (Mouse is approximate in screen space, mapped loosely here for effect)
      // For true mouse interaction we need raycaster, but simple "breathing" works for ambience
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.lookAt(0,0,0);
      
      // Hover effect scale
      if (i === hovered) {
         dummy.scale.set(2.5, 2.5, 2.5);
      } else {
         dummy.scale.set(1, 1, 1);
      }
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Set color if needed (instanceColor) - keeping simple for now
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      onPointerOver={(e) => setHover(e.instanceId!)}
      onPointerOut={() => setHover(null)}
    >
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </instancedMesh>
  );
};

export default Brain;
