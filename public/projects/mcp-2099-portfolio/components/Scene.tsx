import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null!);
  
  // Create particles
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      temp[i * 3] = 20 * Math.sin(theta) * Math.cos(phi);
      temp[i * 3 + 1] = 20 * Math.sin(theta) * Math.sin(phi);
      temp[i * 3 + 2] = 20 * Math.cos(theta);
    }
    return temp;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00f3ff') }
  }), []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      // @ts-ignore
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // Custom Shader Material
  const vertexShader = `
    uniform float uTime;
    varying vec3 vPos;
    void main() {
      vPos = position;
      vec3 pos = position;
      // Add subtle wave
      pos.x += sin(uTime * 0.5 + pos.y * 0.5) * 0.5;
      pos.y += cos(uTime * 0.3 + pos.x * 0.5) * 0.5;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (100.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);
      
      vec3 finalColor = uColor * strength;
      gl_FragColor = vec4(finalColor, strength * 0.8);
    }
  `;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ParticleField />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene;