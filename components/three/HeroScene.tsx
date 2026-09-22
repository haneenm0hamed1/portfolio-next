"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

/** Floating ambient 3D geometric accent node */
function GeometricAccent() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Icosahedron ref={meshRef} args={[1.8, 1]} position={[0, 0, -2]}>
        <meshStandardMaterial
          color="#E5E12C"
          wireframe
          transparent
          opacity={0.16}
          emissive="#E5E12C"
          emissiveIntensity={0.22}
        />
      </Icosahedron>
    </Float>
  );
}

/** Main R3F canvas for the hero background */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.6} color="#E5E12C" />
        <pointLight position={[-5, -5, 5]} intensity={1.2} color="#D9D9D6" />

        <Suspense fallback={null}>
          <Stars radius={40} depth={40} count={600} factor={3} fade speed={0.8} />
          <Sparkles count={80} scale={10} size={2.5} speed={0.4} color="#E5E12C" opacity={0.65} />
          <GeometricAccent />
        </Suspense>
      </Canvas>
    </div>
  );
}
