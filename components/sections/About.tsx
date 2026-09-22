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
  const sectionRef = useRef<HTMLElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const imageRef   = useRef<HTMLDivElement>(null!);
  const shapesRef  = useRef<HTMLDivElement>(null!);

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

      // 1. Main Avatar Image: comes down smoothly
      tl.fromTo(
        imageRef.current,
        { x: 180, y: -140, rotate: 18, opacity: 0, scale: 0.7 },
        { x: 0, y: 0, rotate: -2, opacity: 1, scale: 1, ease: "power1.out", duration: 0.5 },
        0
      );

      // 2. Text Content: comes in smoothly
      tl.fromTo(
        contentRef.current,
        { x: -160, opacity: 0 },
        { x: 0, opacity: 1, ease: "power1.out", duration: 0.5 },
        0.1
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

      {/* Radial glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(229, 225, 44, 0.12) 0%, rgba(64, 73, 78, 0.16) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

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
              className="inline-block rounded-full px-9 py-3.5 font-bold text-black text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #E5E12C 0%, #F3EF5E 100%)",
                boxShadow: "0 0 30px rgba(229, 225, 44, 0.5), 0 8px 20px rgba(0,0,0,0.4)",
                color: "#000000",
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
                "drop-shadow(0 20px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 45px rgba(229,225,44,0.25))",
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
