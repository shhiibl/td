"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";

function AnimatedBlob() {
  const blobRef = useRef();

  useFrame((state) => {
    if (blobRef.current) {
      blobRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      blobRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={blobRef} args={[1, 48, 48]} scale={2.2} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.2]}>
        <ambientLight intensity={1.5} color="#ffffff" />
        <pointLight position={[5, 10, 5]} intensity={15} color="#6C2A79" />
        <pointLight position={[-5, -10, -5]} intensity={15} color="#D41479" />
        <pointLight position={[0, 10, 5]} intensity={10} color="#ffffff" />
        <AnimatedBlob />
      </Canvas>
    </div>
  );
}
