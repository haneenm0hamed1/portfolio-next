"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Global Persistent Traveling Flowers:
 * Two single-instance 3D flower elements that travel down the entire site across sections as the user scrolls,
 * and travel back up when the user scrolls up.
 *
 * Flower 1: /flower-hibiscus.png (Iridescent Hibiscus)
 * Flower 2: /flower-crystal.png (Blue Crystal)
 */
export default function TravelingFlowers() {
  const flower1Ref = useRef<HTMLDivElement>(null!);
  const flower2Ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // Wait for DOM layout to settle before calculating scroll triggers
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // ─── FLOWER 1: Hibiscus (Starts Hero Top-Left -> About Bottom-Right -> Projects Letter P -> Skills -> Contact) ───
      mainTl.fromTo(
        flower1Ref.current,
        {
          x: "4vw",
          y: "12vh",
          rotate: -15,
          scale: 1,
        },
        {
          keyframes: [
            // 1. In About section: lands at bottom-right
            { x: "76vw", y: "55vh", rotate: 40, scale: 1.15, ease: "none" },
            // 2. In Projects section: lands right next to letter "P" in PROJECTS (top-left)
            { x: "18vw", y: "18vh", rotate: -15, scale: 0.85, ease: "none" },
            // 3. In Skills section: lands on right side
            { x: "80vw", y: "50vh", rotate: 30, scale: 1.0, ease: "none" },
            // 4. In Contact section: lands on left side
            { x: "8vw", y: "60vh", rotate: -10, scale: 0.9, ease: "none" },
          ],
        }
      );

      // ─── FLOWER 2: Crystal (Starts Hero Top-Right -> About Top-Left -> Projects Right -> Skills Left -> Footer) ───
      mainTl.fromTo(
        flower2Ref.current,
        {
          x: "80vw",
          y: "12vh",
          rotate: 15,
          scale: 1,
        },
        {
          keyframes: [
            // 1. In About section: lands at top-left
            { x: "6vw", y: "22vh", rotate: -35, scale: 0.95, ease: "none" },
            // 2. In Projects section: lands on right side of cards
            { x: "78vw", y: "45vh", rotate: 25, scale: 1.05, ease: "none" },
            // 3. In Skills section: lands on left side
            { x: "8vw", y: "40vh", rotate: -25, scale: 0.9, ease: "none" },
            // 4. In Contact / Footer: lands on right side
            { x: "80vw", y: "65vh", rotate: 15, scale: 0.85, ease: "none" },
          ],
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[40] overflow-hidden"
      aria-hidden="true"
    >
      {/* ── FLOWER 1 (Iridescent Hibiscus 3D Flower) ────────────────── */}
      <div
        ref={flower1Ref}
        className="absolute top-0 left-0 w-24 sm:w-32 md:w-44"
        style={{
          filter:
            "drop-shadow(0 15px 30px rgba(0,0,0,0.65)) drop-shadow(0 0 35px rgba(229,225,44,0.45))",
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-hibiscus.png"
          alt=""
          className="w-full h-auto object-contain"
          style={{ display: "block" }}
        />
      </div>

      {/* ── FLOWER 2 (Blue Crystal 3D Flower) ────────────────────── */}
      <div
        ref={flower2Ref}
        className="absolute top-0 left-0 w-24 sm:w-32 md:w-44"
        style={{
          filter:
            "drop-shadow(0 15px 30px rgba(0,0,0,0.65)) drop-shadow(0 0 35px rgba(217,217,214,0.45))",
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-crystal.png"
          alt=""
          className="w-full h-auto object-contain"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
