"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Marquee from "@/components/ui/Marquee";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const MARQUEE_ITEMS = [
  "Frontend Development",
  "Salla & Zid Themes",
  "React",
  "Next.js",
  "Animation",
  "API Integration",
  "TypeScript",
  "UI/UX",
];

const PHRASES = [
  { text: "HANEEN MOHAMED", size: "clamp(1.6rem, 5.8vw, 7.0rem)" },
  { text: "FRONTEND DEVELOPER", size: "clamp(1.3rem, 4.6vw, 5.6rem)" },
  { text: "REACT & NEXT.JS EXPERT", size: "clamp(1.0rem, 3.6vw, 4.4rem)" },
];

export default function Hero() {
  const sectionRef          = useRef<HTMLDivElement>(null!);
  const typedTextRef        = useRef<HTMLHeadingElement>(null!);
  const avatarRef           = useRef<HTMLDivElement>(null!);
  const ctaRef              = useRef<HTMLAnchorElement>(null!);
  const taglineRef          = useRef<HTMLParagraphElement>(null!);
  const flowerHeroLeftRef   = useRef<HTMLDivElement>(null!);
  const flowerHeroRightRef  = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ─── 1. Typewriter / Eraser Loop with Dynamic Fluid Font Size ───
    let phraseIdx = 0;
    let activeTween: gsap.core.Tween | null = null;
    let timerCall: gsap.core.Tween | null = null;

    const typeNextPhrase = () => {
      const currentItem = PHRASES[phraseIdx];
      const targetEl = typedTextRef.current;
      if (!targetEl) return;

      // Adjust font-size dynamically per phrase length to eliminate clipping
      targetEl.style.fontSize = currentItem.size;

      activeTween = gsap.to(
        {},
        {
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const charCount = Math.floor(progress * currentItem.text.length);
            targetEl.textContent = currentItem.text.substring(0, charCount);
          },
          onComplete: () => {
            timerCall = gsap.delayedCall(2.2, () => {
              activeTween = gsap.to(
                {},
                {
                  duration: 0.8,
                  ease: "none",
                  onUpdate: function () {
                    const progress = this.progress();
                    const charCount = Math.floor((1 - progress) * currentItem.text.length);
                    targetEl.textContent = currentItem.text.substring(0, charCount);
                  },
                  onComplete: () => {
                    phraseIdx = (phraseIdx + 1) % PHRASES.length;
                    typeNextPhrase();
                  },
                }
              );
            });
          },
        }
      );
    };

    typeNextPhrase();

    // ─── 2. Entrance timeline ─────────────────────────────────
    const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });

    // Avatar emerges from below
    tl.fromTo(
      avatarRef.current,
      { y: 140, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.2)" }
    );

    // Tagline slides in from left with blur-to-clear entrance
    tl.fromTo(
      taglineRef.current,
      { x: -80, opacity: 0, filter: "blur(10px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
      "-=0.7"
    );

    // CTA pops in with spin
    tl.fromTo(
      ctaRef.current,
      { scale: 0, opacity: 0, rotation: 40 },
      { scale: 1, opacity: 1, rotation: 14, duration: 0.7, ease: "back.out(1.8)" },
      "-=0.6"
    );

    // Flowers entrance in Hero
    if (flowerHeroLeftRef.current) {
      tl.fromTo(
        flowerHeroLeftRef.current,
        { scale: 0, rotate: -40, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.6"
      );
    }

    if (flowerHeroRightRef.current) {
      tl.fromTo(
        flowerHeroRightRef.current,
        { scale: 0, rotate: 40, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.7"
      );
    }

    // ─── 3. Avatar gentle float loop ──────────────────────────
    const floatTween = gsap.to(avatarRef.current, {
      y: "-=12",
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.easeInOut",
      paused: true,
    });
    tl.add(() => floatTween.play());

    // ─── 4. Mouse parallax tilt on avatar ─────────────────────
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const rx = ((e.clientY / innerHeight) - 0.5) * -12;
      const ry = ((e.clientX / innerWidth) - 0.5) * 16;
      const tx = ((e.clientX / innerWidth) - 0.5) * 10;
      gsap.to(avatarRef.current, { rotateX: rx, rotateY: ry, x: tx, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouse);

    // ─── 5. Pinned ScrollTrigger: Hero section pins on scroll ─
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // CTA straightens & moves down to container right
    pinTl.to(
      ctaRef.current,
      {
        rotation: 0,
        y: 230,
        ease: "power1.inOut",
      },
      0
    );

    // Avatar subtle lift
    pinTl.to(
      avatarRef.current,
      {
        scale: 1.04,
        y: -15,
        ease: "power1.inOut",
      },
      0
    );

    // Tagline moves slightly on scroll
    pinTl.to(
      taglineRef.current,
      {
        x: 24,
        opacity: 0.95,
        ease: "power1.inOut",
      },
      0
    );

    // Traveling Flowers transition down on scroll
    if (flowerHeroLeftRef.current) {
      pinTl.to(
        flowerHeroLeftRef.current,
        {
          y: 220,
          x: 40,
          rotate: 35,
          ease: "power1.inOut",
        },
        0
      );
    }

    if (flowerHeroRightRef.current) {
      pinTl.to(
        flowerHeroRightRef.current,
        {
          y: 220,
          x: -40,
          rotate: -35,
          ease: "power1.inOut",
        },
        0
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (activeTween) activeTween.kill();
      if (timerCall) timerCall.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      floatTween.kill();
    };
  }, []);

  return (
    <section id="hero">
      <div
        ref={sectionRef}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      >
        {/* ── Background 3D scene (particles & wireframe) ── */}
        <HeroScene />

        {/* ── Radial subtle glow behind center ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center"
        >
          <div
            style={{
              width: "60vw",
              height: "60vw",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(123,97,255,0.18) 0%, transparent 68%)",
            }}
          />
        </div>

        {/* ── TOP-LEFT FLOWER (Hibiscus 3D Flower) ────────────────── */}
        <div
          ref={flowerHeroLeftRef}
          aria-hidden="true"
          className="absolute top-16 left-4 md:left-12 pointer-events-none z-[25] w-24 sm:w-32 md:w-40"
          style={{
            filter:
              "drop-shadow(0 15px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(255,110,199,0.5))",
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

        {/* ── TOP-RIGHT FLOWER (Blue Crystal 3D Flower) ────────────── */}
        <div
          ref={flowerHeroRightRef}
          aria-hidden="true"
          className="absolute top-16 right-4 md:right-12 pointer-events-none z-[25] w-24 sm:w-32 md:w-40"
          style={{
            filter:
              "drop-shadow(0 15px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(79,209,255,0.5))",
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

        {/* ── MAIN CONTENT AREA ─────────────────────────────── */}
        <div className="relative z-[2] flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-24 pb-6">

          {/* CENTER STACK */}
          <div className="relative w-full mx-auto">

            {/* ── OUTLINED TYPED HEADLINE (No clipping, dynamic scale) ── */}
            <div className="w-full flex justify-center items-center px-2 min-h-[120px]">
              <h1
                ref={typedTextRef}
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(242, 241, 238, 0.85)",
                  textShadow: "0 0 30px rgba(123,97,255,0.4)",
                  position: "relative",
                  zIndex: 2,
                  userSelect: "none",
                  transition: "font-size 0.3s ease",
                }}
              >
                HANEEN MOHAMED
              </h1>
            </div>

            {/* ── AVATAR: tuned proportion & floating position ── */}
            <div
              ref={avatarRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -40%)",
                zIndex: 10,
                width: "clamp(170px, 17vw, 290px)",
                transformStyle: "preserve-3d",
                filter:
                  "drop-shadow(0 20px 35px rgba(0,0,0,0.8)) drop-shadow(0 0 45px rgba(123,97,255,0.45))",
                pointerEvents: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-placeholder.png"
                alt="Haneen Mohamed"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>

            {/* ── CTA BUTTON: tilted top-right ── */}
            <a
              ref={ctaRef}
              href="#contact"
              id="hero-cta"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                zIndex: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8rem 2rem",
                borderRadius: "9999px",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.75rem, 1.1vw, 0.95rem)",
                color: "#fff",
                whiteSpace: "nowrap",
                background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
                boxShadow: "0 0 28px rgba(123,97,255,0.55), 0 8px 24px rgba(0,0,0,0.4)",
                textDecoration: "none",
                cursor: "pointer",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
              className="hover:brightness-125 transition-[filter] duration-200"
            >
              Contact me →
            </a>

          </div>

          {/* ── TAGLINE: animated entrance & scroll ────────────── */}
          <div className="w-full flex items-center justify-between mt-8 md:mt-12">
            <p
              ref={taglineRef}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.78rem, 1.1vw, 0.92rem)",
                color: "rgba(242,241,238,0.75)",
                lineHeight: 1.75,
                maxWidth: "22rem",
                userSelect: "none",
                willChange: "transform, opacity, filter",
              }}
            >
              Frontend Developer specializing in React and Next.js, with 4+ years
              of experience turning ideas into fast, interactive, and polished
              digital experiences.
            </p>
          </div>
        </div>

        {/* ── MARQUEE STRIP ─────────────────────────────────────── */}
        <div className="relative z-[3] w-full">
          <Marquee items={MARQUEE_ITEMS} speed={24} />
        </div>
      </div>
    </section>
  );
}
