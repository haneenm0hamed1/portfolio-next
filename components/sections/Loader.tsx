"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Enhanced Full-Screen Preloader:
 * - Ambient radial glow spotlight
 * - "HANEEN MOHAMED" with gradient color fill sweep (0% -> 100%)
 * - Subtitle reveal "FRONTEND DEVELOPER & CREATIVE DESIGNER"
 * - Shimmer progress line + tabular percentage counter
 * - Smooth curtain reveal exit into portfolio
 */
export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef     = useRef<HTMLDivElement>(null!);
  const gradientRef   = useRef<HTMLHeadingElement>(null!);
  const subtitleRef   = useRef<HTMLParagraphElement>(null!);
  const progressLineRef = useRef<HTMLDivElement>(null!);
  const countRef      = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Subtitle entrance
      tl.fromTo(
        subtitleRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 0.6, ease: "power2.out" }
      );

      // 2. Color Fill sweep on Name + Progress Line fill
      tl.to(
        gradientRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.9,
          ease: "power2.inOut",
        },
        "-=0.2"
      );

      tl.to(
        progressLineRef.current,
        {
          width: "100%",
          duration: 1.9,
          ease: "power2.inOut",
        },
        "<"
      );

      // 3. Counter 0% -> 100%
      if (countRef.current) {
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = Math.round(obj.val) + "%";
              }
            },
          },
          "<"
        );
      }

      // 4. Glow boost on 100% completion
      tl.to(gradientRef.current, {
        scale: 1.03,
        filter: "drop-shadow(0 0 40px rgba(123,97,255,0.75))",
        duration: 0.35,
        ease: "power2.out",
      });

      // 5. Curtain reveal exit
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.95,
        ease: "power4.inOut",
        delay: 0.1,
        onComplete,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center px-4">

        {/* Name Block */}
        <div className="relative flex flex-col items-center">
          {/* Base Muted Text */}
          <h1
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "clamp(2.2rem, 6.5vw, 5.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "rgba(242, 241, 238, 0.12)",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            HANEEN MOHAMED
          </h1>

          {/* Gradient Color Fill Overlay (sweeps inset 100% -> 0%) */}
          <h1
            ref={gradientRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "clamp(2.2rem, 6.5vw, 5.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              clipPath: "inset(0% 100% 0% 0%)",
              userSelect: "none",
              willChange: "clip-path, transform, filter",
            }}
          >
            HANEEN MOHAMED
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-3 text-xs uppercase tracking-[0.3em] font-medium"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            color: "#f2f1ee",
          }}
        >
          Frontend Developer & Creative Designer
        </p>

        {/* Progress Line & Counter */}
        <div className="mt-10 w-56 flex flex-col items-center gap-3">
          <div
            className="w-full h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(242,241,238,0.08)" }}
          >
            <div
              ref={progressLineRef}
              className="h-full rounded-full"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
                boxShadow: "0 0 12px rgba(123,97,255,0.8)",
              }}
            />
          </div>

          <span
            ref={countRef}
            className="text-xs font-semibold tracking-widest tabular-nums"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "rgba(242, 241, 238, 0.5)",
            }}
          >
            0%
          </span>
        </div>

      </div>
    </div>
  );
}
