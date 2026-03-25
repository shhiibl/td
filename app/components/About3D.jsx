"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Float, MeshDistortMaterial } from "@react-three/drei";

function AbstractShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <TorusKnot ref={meshRef} args={[1.5, 0.4, 64, 24]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.25}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </TorusKnot>
    </Float>
  );
}

export default function About3D() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.2]}>
        <ambientLight intensity={1.5} color="#ffffff" />
        <pointLight position={[5, 10, 5]} intensity={18} color="#D41479" />
        <pointLight position={[-5, -10, -5]} intensity={12} color="#6C2A79" />
        <pointLight position={[0, 0, 5]} intensity={10} color="#ffffff" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
