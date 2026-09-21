"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

// Load R3F canvas client-side only
const FloatingShapes = dynamic(() => import("@/components/three/FloatingShapes"), { ssr: false });

const BIO_LINES = [
  "I've been a frontend developer for over four years.",
  "I started with theme development and customization for Salla and Zid stores,",
  "then moved into building full products with React and Next.js —",
  "where animation and interaction became a real focus, not an afterthought.",
  "I studied Computer Science at Mansoura University and graduated top of my class.",
  "Comfortable across Git workflows and API integration,",
  "but what I actually enjoy is making an interface feel right, not just look right.",
];

/**
 * About Me section with swapped entrance flowers:
 * - Blue Crystal Flower drops in top-left on scroll
 * - Hibiscus Flower drops in bottom-right on scroll
 * - Text & Avatar Image reveal smoothly
 */
export default function About() {
  const sectionRef      = useRef<HTMLElement>(null!);
  const contentRef      = useRef<HTMLDivElement>(null!);
  const imageRef        = useRef<HTMLDivElement>(null!);
  const shapesRef       = useRef<HTMLDivElement>(null!);
  const flowerLeftRef   = useRef<HTMLDivElement>(null!);
  const flowerRightRef  = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Main ScrollTrigger Timeline ────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      // 1. Crystal Flower drops down in top-left
      if (flowerLeftRef.current) {
        tl.fromTo(
          flowerLeftRef.current,
          { y: -160, x: -60, rotate: -35, opacity: 0, scale: 0.7 },
          { y: 0, x: 0, rotate: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 },
          0
        );
      }

      // 2. Hibiscus Flower drops down in bottom-right
      if (flowerRightRef.current) {
        tl.fromTo(
          flowerRightRef.current,
          { y: -160, x: 60, rotate: 35, opacity: 0, scale: 0.7 },
          { y: 0, x: 0, rotate: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 },
          0.2
        );
      }

      // 3. Main Avatar Image: comes down smoothly
      tl.fromTo(
        imageRef.current,
        { x: 180, y: -140, rotate: 18, opacity: 0, scale: 0.7 },
        { x: 0, y: 0, rotate: -2, opacity: 1, scale: 1, ease: "power1.out", duration: 0.5 },
        0.3
      );

      // 4. Text Content: comes in smoothly
      tl.fromTo(
        contentRef.current,
        { x: -160, opacity: 0 },
        { x: 0, opacity: 1, ease: "power1.out", duration: 0.5 },
        0.4
      );

      // 3D Background Shapes: scale smoothly across the whole scroll range
      if (shapesRef.current) {
        gsap.fromTo(
          shapesRef.current,
          { opacity: 0.2, scale: 0.75 },
          {
            opacity: 1,
            scale: 1.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* 3-D floating shapes background (Three.js) */}
      <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none">
        <FloatingShapes />
      </div>

      {/* Radial purple gradient glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(123,97,255,0.16) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      {/* ── TOP-LEFT FLOWER (Blue Crystal 3D Flower) ────────────────── */}
      <div
        ref={flowerLeftRef}
        aria-hidden="true"
        className="absolute top-12 left-4 md:left-12 pointer-events-none z-[5] w-28 sm:w-36 md:w-44"
        style={{
          filter:
            "drop-shadow(0 15px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(79,209,255,0.45))",
          willChange: "transform, opacity",
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

      {/* ── BOTTOM-RIGHT FLOWER (Iridescent Hibiscus 3D Flower) ────── */}
      <div
        ref={flowerRightRef}
        aria-hidden="true"
        className="absolute bottom-12 right-4 md:right-12 pointer-events-none z-[5] w-28 sm:w-36 md:w-44"
        style={{
          filter:
            "drop-shadow(0 15px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(255,110,199,0.45))",
          willChange: "transform, opacity",
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

      {/* Container: split 2-column responsive layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

        {/* LEFT COLUMN: Text Content */}
        <div ref={contentRef} className="w-full md:w-7/12 flex flex-col items-start gap-8">
          <div>
            <SectionHeading text="ABOUT ME" />
          </div>

          <p
            className="flex flex-col gap-3"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(0.95rem, 1.35vw, 1.12rem)",
              lineHeight: 1.85,
              color: "#f2f1ee",
            }}
          >
            {BIO_LINES.map((line, i) => (
              <span key={i} className="block">
                {i === 3 ? (
                  <>
                    {line.replace("where animation and interaction became a real focus, not an afterthought.", "")}
                    <span className="gradient-text font-semibold">
                      where animation and interaction became a real focus, not an afterthought.
                    </span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </p>

          <div>
            <a
              href="#contact"
              id="about-cta"
              className="inline-block rounded-full px-9 py-3.5 font-semibold text-white text-sm tracking-wide transition-transform duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
                boxShadow: "0 0 36px rgba(123,97,255,0.35)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Contact me
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div
          ref={imageRef}
          className="w-full md:w-5/12 flex items-center justify-center relative"
        >
          <div
            className="relative w-full max-w-[360px] md:max-w-[420px]"
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(0,0,0,0.75)) drop-shadow(0 0 50px rgba(123,97,255,0.35))",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-avatar.png"
              alt="Haneen Mohamed"
              className="w-full h-auto object-contain rounded-2xl"
              style={{ display: "block" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
