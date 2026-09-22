"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 140;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      sc[i] = Math.random() * 0.6 + 0.4;
    }
    return [pos, sc];
  }, [count]);

  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const currentColor = useRef(new THREE.Color(color));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    currentColor.current.lerp(targetColor, 0.05);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04;
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.color.copy(currentColor.current);
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ProjectsPortalScene({ activeColor = "#E5E12C" }: { activeColor?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 3]} intensity={2.0} color={activeColor} distance={8} />
        <pointLight position={[-4, 3, 2]} intensity={1.2} color="#ffffff" distance={10} />
        <Suspense fallback={null}>
          <ParticleField color={activeColor} />
        </Suspense>
      </Canvas>
    </div>
  );
}
