"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for half sequence
}

/**
  * Infinite horizontal marquee strip driven entirely by GSAP.
  * Responds dynamically to page scroll velocity via ScrollTrigger.
  */
export default function Marquee({ items, speed = 20 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const trackRef     = useRef<HTMLDivElement>(null!);

  // Quadruple items to guarantee overflow and smooth looping on wide screens
  const trackItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const ctx = gsap.context(() => {
      // Continuous marquee animation using GSAP xPercent
      const tween = gsap.to(trackEl, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });

      // Boost speed slightly on active scroll using ScrollTrigger velocity
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 600);
          const timeScale = Math.min(1 + velocity, 3.5);
          gsap.to(tween, {
            timeScale: timeScale,
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: 1, duration: 1.2, ease: "power1.out" });
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full py-4 border-t border-b bg-[#000000]/80 backdrop-blur-sm select-none"
      style={{ borderColor: "rgba(64, 73, 78, 0.45)" }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {trackItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#D9D9D6]/85"
            style={{ fontFamily: "var(--font-space), sans-serif" }}
          >
            {item}
            <span
              className="inline-block w-2 h-2 rounded-full shadow-[0_0_10px_rgba(229,225,44,0.9)]"
              style={{ background: "#E5E12C" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
