"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function MobiusMesh({ isHovered }) {
  const meshRef = useRef(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Rotate slowly normally, spin faster on hover
    meshRef.current.rotation.y += delta * (isHovered ? 2.5 : 0.5);
    meshRef.current.rotation.z += delta * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
  });

  // Highly optimized material & geometry for fast 60fps rendering
  // Removed expensive Environment, Clearcoat, and reduced vertex count by 75%
  return (
    <mesh ref={meshRef} scale={0.45}>
      <torusKnotGeometry args={[1.6, 0.55, 64, 12, 1, 2]} />
      <meshStandardMaterial 
        color={isHovered ? '#D41479' : '#A855C0'} 
        roughness={isHovered ? 0.2 : 0.6} 
        metalness={0.7}
        transparent
        depthWrite={false}
        opacity={isHovered ? 0.5 : 0.15}
      />
    </mesh>
  );
}

export default function MobiusIcon({ isHovered }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)', willChange: 'transform' }}>
      {/* Reduced DPR to prevent GPU bottleneck on high-res screens */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, powerPreference: "high-performance" }} dpr={[1, 1.2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} />
        <directionalLight position={[-5, -10, -5]} intensity={1.5} color="#D9A8E8" />
        <directionalLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
        <MobiusMesh isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
