"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LogoRevealProps {
  onComplete?: () => void;
}

/**
 * Brief animated name intro right after the loader exits.
 * Each character clips up from inset(100%0%0%0%) to inset(0%).
 * After the reveal settles the animation self-removes (onComplete).
 */
export default function LogoReveal({ onComplete }: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      tl.from(charsRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const chars = "HANEEN".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
      style={{ background: "transparent" }}
    >
      <span
        aria-label="HANEEN"
        className="flex gap-[0.02em]"
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "clamp(4rem, 12vw, 10rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#f2f1ee",
        }}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block"
            ref={(el) => { if (el) charsRef.current[i] = el; }}
          >
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}
