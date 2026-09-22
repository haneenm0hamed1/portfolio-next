"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Refined Full-Screen Preloader:
 * - Avatar positioned seamlessly between "HANEEN" and "MOHAMED" on the same line
 * - Clean layout without badges or subtitles
 * - Smooth color fill sweep (0% -> 100%) in Thunder Lime & Silver Mist
 * - Shimmer progress line + percentage counter
 * - No heavy drop-shadow on completion
 * - Smooth curtain reveal exit into portfolio
 */
export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef        = useRef<HTMLDivElement>(null!);
  const avatarWrapperRef = useRef<HTMLDivElement>(null!);
  const haneenFillRef    = useRef<HTMLHeadingElement>(null!);
  const mohamedFillRef   = useRef<HTMLHeadingElement>(null!);
  const progressLineRef  = useRef<HTMLDivElement>(null!);
  const countRef         = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial entrance: avatar pops in subtly
      tl.fromTo(
        avatarWrapperRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
      );

      // Subtle gentle floating idle motion for the avatar
      gsap.to(avatarWrapperRef.current, {
        y: -4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Sequential Color Fill sweep:
      // First HANEEN (0% -> 50%)
      tl.to(
        haneenFillRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.95,
          ease: "power2.inOut",
        },
        "-=0.2"
      );

      // Then avatar ring glow lights up
      tl.to(
        avatarWrapperRef.current,
        {
          boxShadow: "0 0 25px rgba(229, 225, 44, 0.45)",
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.3"
      );

      // Then MOHAMED (50% -> 100%)
      tl.to(
        mohamedFillRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.95,
          ease: "power2.inOut",
        },
        "-=0.1"
      );

      // Total Progress Line fill spans across the whole duration
      tl.to(
        progressLineRef.current,
        {
          width: "100%",
          duration: 1.9,
          ease: "power2.inOut",
        },
        1.0 // Start along with the fill sweep
      );

      // Counter 0% -> 100%
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
          1.0
        );
      }

      // 3. Clean curtain reveal exit (no heavy shadow added)
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        delay: 0.15,
        onComplete,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Ambient background glow in Thunder Lime */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(229, 225, 44, 0.09) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      {/* Main Lockup: HANEEN [Avatar] MOHAMED on one horizontal row */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-full">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 flex-nowrap select-none">
          
          {/* 1. HANEEN */}
          <div className="relative">
            <h1
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.35rem, 3.2vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "rgba(255, 255, 255, 0.12)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.22)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              HANEEN
            </h1>

            <h1
              ref={haneenFillRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.35rem, 3.2vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                background: "linear-gradient(90deg, #E5E12C 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                clipPath: "inset(0% 100% 0% 0%)",
                willChange: "clip-path",
                margin: 0,
              }}
            >
              HANEEN
            </h1>
          </div>

          {/* 2. Avatar between the two words */}
          <div
            ref={avatarWrapperRef}
            className="relative flex-shrink-0 rounded-full p-0.5"
            style={{
              width: "clamp(42px, 5vw, 68px)",
              height: "clamp(42px, 5vw, 68px)",
              background: "linear-gradient(135deg, rgba(229, 225, 44, 0.8), rgba(64, 73, 78, 0.5), rgba(217, 217, 214, 0.6))",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.7)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0f12] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/loading.png"
                alt="Haneen Avatar"
                className="w-full h-full object-cover object-top scale-105"
              />
            </div>
          </div>

          {/* 3. MOHAMED */}
          <div className="relative">
            <h1
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.35rem, 3.2vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "rgba(255, 255, 255, 0.12)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.22)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              MOHAMED
            </h1>

            <h1
              ref={mohamedFillRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.35rem, 3.2vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                background: "linear-gradient(90deg, #FFFFFF 0%, #E5E12C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                clipPath: "inset(0% 100% 0% 0%)",
                willChange: "clip-path",
                margin: 0,
              }}
            >
              MOHAMED
            </h1>
          </div>

        </div>

        {/* Progress Line & Tabular Counter */}
        <div className="mt-8 w-56 flex flex-col items-center gap-2.5">
          <div
            className="w-full h-[2.5px] rounded-full overflow-hidden"
            style={{ background: "rgba(64, 73, 78, 0.4)" }}
          >
            <div
              ref={progressLineRef}
              className="h-full rounded-full"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #E5E12C 0%, #FFFFFF 100%)",
                boxShadow: "0 0 12px rgba(229, 225, 44, 0.7)",
              }}
            />
          </div>

          <span
            ref={countRef}
            className="text-xs font-semibold tracking-widest tabular-nums"
            style={{
              fontFamily: "var(--font-space), monospace",
              color: "#E5E12C",
            }}
          >
            0%
          </span>
        </div>

      </div>
    </div>
  );
}
