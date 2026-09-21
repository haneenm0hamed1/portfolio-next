"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  phaseOffset: number;
  geometry: "sphere" | "box" | "torus" | "octahedron" | "icosahedron";
  scale?: number;
}

function FloatingShape({ position, color, speed, phaseOffset, geometry, scale = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * speed + phaseOffset) * 0.18;
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "sphere":       return new THREE.SphereGeometry(0.55, 32, 32);
      case "box":          return new THREE.BoxGeometry(0.8, 0.8, 0.8);
      case "torus":        return new THREE.TorusGeometry(0.5, 0.22, 16, 60);
      case "octahedron":   return new THREE.OctahedronGeometry(0.65);
      case "icosahedron":  return new THREE.IcosahedronGeometry(0.6, 0);
      default:             return new THREE.SphereGeometry(0.5, 32, 32);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geo}>
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.5}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

/**
 * Floating 3-D decorative shapes canvas — used in About and Contact sections.
 * Renders 4 distinct shapes (blob/sphere, cube, torus, icosahedron/flower-like)
 * positioned in corners of the section.
 *
 * The parent must be position:relative with a set height.
 */
export default function FloatingShapes() {
  const shapes: ShapeProps[] = [
    { position: [-2.8, 0.5,  0], color: "#c084fc", speed: 0.7, phaseOffset: 0,    geometry: "torus",       scale: 0.9 },
    { position: [ 2.8, 0.4,  0], color: "#60a5fa", speed: 0.9, phaseOffset: 1.5,  geometry: "icosahedron", scale: 0.85 },
    { position: [-2.5, -1.2, 0], color: "#f87171", speed: 0.6, phaseOffset: 0.8,  geometry: "sphere",      scale: 0.7 },
    { position: [ 2.6, -1.0, 0], color: "#a78bfa", speed: 0.8, phaseOffset: 2.1,  geometry: "box",         scale: 0.75 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]}  intensity={1.0} color="#ff6ec7" />
        <pointLight position={[-5, -5, 5]} intensity={0.7} color="#4fd1ff" />
        <Suspense fallback={null}>
          {shapes.map((s, i) => (
            <FloatingShape key={i} {...s} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
