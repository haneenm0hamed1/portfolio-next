"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function PurpleBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#7b61ff"
        emissive="#ff6ec7"
        emissiveIntensity={0.3}
        distort={0.5}
        speed={2.5}
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/**
 * Single decorative 3-D blob shape for the Contact section.
 * Positioned top-right of the contact area.
 */
export default function ContactShape() {
  return (
    <div
      className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1.5} color="#ff6ec7" />
        <pointLight position={[-2, -2, 2]} intensity={0.8} color="#4fd1ff" />
        <Suspense fallback={null}>
          <PurpleBlob />
        </Suspense>
      </Canvas>
    </div>
  );
}
