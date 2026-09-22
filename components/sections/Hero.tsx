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
  { text: "HANEEN MOHAMED",       size: "clamp(1.35rem, 5.8vw, 7.0rem)" },
  { text: "FRONTEND DEVELOPER",   size: "clamp(1.1rem, 4.6vw, 5.6rem)" },
  { text: "REACT & NEXT.JS EXPERT", size: "clamp(0.9rem, 3.6vw, 4.4rem)" },
];

// ارتفاع الـ Marquee strip تقريباً
const MARQUEE_H = 56; // px

export default function Hero() {
  const sectionRef   = useRef<HTMLDivElement>(null!);
  const typedTextRef = useRef<HTMLHeadingElement>(null!);
  const avatarRef    = useRef<HTMLDivElement>(null!);
  const ctaRef       = useRef<HTMLAnchorElement>(null!);
  const taglineRef   = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ─── 1. Typewriter Loop ───────────────────────────────────
    let phraseIdx = 0;
    let activeTween: gsap.core.Tween | null = null;
    let timerCall:   gsap.core.Tween | null = null;

    const typeNextPhrase = () => {
      const item   = PHRASES[phraseIdx];
      const target = typedTextRef.current;
      if (!target) return;

      target.style.fontSize = item.size;

      activeTween = gsap.to({}, {
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          const n = Math.floor(this.progress() * item.text.length);
          target.textContent = item.text.substring(0, n);
        },
        onComplete: () => {
          timerCall = gsap.delayedCall(2.2, () => {
            activeTween = gsap.to({}, {
              duration: 0.8,
              ease: "none",
              onUpdate: function () {
                const n = Math.floor((1 - this.progress()) * item.text.length);
                target.textContent = item.text.substring(0, n);
              },
              onComplete: () => {
                phraseIdx = (phraseIdx + 1) % PHRASES.length;
                typeNextPhrase();
              },
            });
          });
        },
      });
    };

    typeNextPhrase();

    // ─── 2. Entrance — كل العناصر مخفية، تظهر بعد اللودر ───────
    gsap.set([avatarRef.current, taglineRef.current, ctaRef.current], { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

    // Avatar: يبان في مكانه (نص + طالع من الـ marquee)
    tl.fromTo(
      avatarRef.current,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.3)" }
    );

    // Tagline: من اليسار مع blur
    tl.fromTo(
      taglineRef.current,
      { x: -70, opacity: 0, filter: "blur(8px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
      "-=0.7"
    );

    // CTA: يبان بدوران
    tl.fromTo(
      ctaRef.current,
      { scale: 0, opacity: 0, rotation: 40 },
      { scale: 1, opacity: 1, rotation: 14, duration: 0.7, ease: "back.out(1.8)" },
      "-=0.6"
    );

    // ─── 3. Float loop ───────────────────────────────────────
    const floatTween = gsap.to(avatarRef.current, {
      y: "-=14",
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });
    tl.add(() => floatTween.play());

    // ─── 4. Mouse parallax ───────────────────────────────────
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      const rx = ((e.clientY / H) - 0.5) * -10;
      const ry = ((e.clientX / W) - 0.5) *  14;
      const tx = ((e.clientX / W) - 0.5) *   8;
      gsap.to(avatarRef.current, {
        rotateX: rx, rotateY: ry, x: tx,
        duration: 0.6, ease: "power2.out", overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", handleMouse);

    // ─── 5. Pin ScrollTrigger — CTA ينزل ومستقيم + Avatar يطلع ─
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // CTA يستقيم وينزل لليمين السفلي
    pinTl.to(ctaRef.current, {
      rotation: 0,
      y: 210,
      ease: "power1.inOut",
    }, 0);

    // Avatar floats up slightly with scroll, staying fully visible at all times
    pinTl.to(avatarRef.current, {
      y: -40,
      scale: 1.03,
      ease: "power1.out",
    }, 0);

    // Tagline تتزحزح بخفة
    pinTl.to(taglineRef.current, {
      x: 18,
      opacity: 0.88,
      ease: "power1.inOut",
    }, 0);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (activeTween) activeTween.kill();
      if (timerCall)   timerCall.kill();
      floatTween.kill();
      pinTl.kill();  // فقط الـ pinTl، مش كل الـ triggers
      tl.kill();
      // لا نقتل ScrollTrigger.getAll() هنا عشان نمسحش triggers الورود
    };
  }, []);

  return (
    <section id="hero">
      {/*
        overflow: visible على الـ section الخارجي
        عشان Avatar ينزل فوق الـ marquee ظاهر
      */}
      <div
        ref={sectionRef}
        style={{ overflow: "visible" }}
        className="relative min-h-screen flex flex-col justify-between"
      >
        {/* Background (overflow hidden عشان ما يطلعش للخارج) */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <HeroScene />
        </div>

        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center"
        >
          <div style={{
            width: "60vw", height: "60vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(229, 225, 44, 0.12) 0%, rgba(64, 73, 78, 0.18) 45%, transparent 70%)",
          }} />
        </div>

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <div className="relative z-[2] flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-24 pb-6">

          {/* Center stack — relative لتحديد مواقع الـ absolute children */}
          <div className="relative w-full mx-auto" style={{ minHeight: "160px" }}>

            {/* Typed headline */}
            <div className="w-full flex justify-center items-center px-2 min-h-[120px]">
              <h1
                ref={typedTextRef}
                style={{
                  fontFamily:       "var(--font-space), sans-serif",
                  fontWeight:        900,
                  letterSpacing:    "0.02em",
                  lineHeight:        1.15,
                  textAlign:        "center",
                  whiteSpace:       "nowrap",
                  color:            "transparent",
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.95)",
                  textShadow:       "0 0 35px rgba(229, 225, 44, 0.35)",
                  position:         "relative",
                  zIndex:            2,
                  userSelect:       "none",
                  transition:       "font-size 0.3s ease",
                }}
              >
                HANEEN MOHAMED
              </h1>
            </div>

            {/* CTA — top-right مائل */}
            <a
              ref={ctaRef}
              href="#contact"
              id="hero-cta"
              style={{
                position:       "absolute",
                top:            "0",
                right:          "0",
                zIndex:          20,
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "0.4rem",
                padding:        "0.8rem 2rem",
                borderRadius:   "9999px",
                fontFamily:     "var(--font-inter), sans-serif",
                fontWeight:      800,
                fontSize:       "clamp(0.75rem, 1.1vw, 0.95rem)",
                color:          "#000000",
                whiteSpace:     "nowrap",
                background:     "linear-gradient(135deg, #E5E12C, #F3EF5E)",
                boxShadow:      "0 0 28px rgba(229, 225, 44, 0.6), 0 8px 24px rgba(0,0,0,0.5)",
                textDecoration: "none",
                cursor:         "pointer",
                transformOrigin:"center center",
                willChange:     "transform, opacity",
              }}
              className="hover:brightness-110 hover:scale-105 transition-all duration-200"
            >
              Contact me →
            </a>

          </div>

          {/* Tagline */}
          <div className="w-full flex items-center mt-6 md:mt-10">
            <p
              ref={taglineRef}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize:   "clamp(0.78rem, 1.1vw, 0.92rem)",
                color:      "rgba(217, 217, 214, 0.85)",
                lineHeight:  1.75,
                maxWidth:   "22rem",
                userSelect: "none",
              }}
            >
              Frontend Developer specializing in React and Next.js, with 4+ years
              of experience turning ideas into fast, interactive, and polished
              digital experiences.
            </p>
          </div>
        </div>

        {/*
          MARQUEE — z-[20] أعلى من الـ avatar (z-[10])
          الـ avatar سيكون خلف الـ marquee
          والجزء السفلي من الـ avatar يبدو "داخل" الـ marquee
        */}
        <div
          style={{
            position:       "relative",
            zIndex:          20,
            background:     "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            borderTop:      "1px solid rgba(64, 73, 78, 0.4)",
            borderBottom:   "1px solid rgba(64, 73, 78, 0.4)",
          }}
        >
          <Marquee items={MARQUEE_ITEMS} speed={24} />
        </div>

        {/*
          AVATAR — position absolute داخل sectionRef
          bottom مرتفع قليلاً فوق أسفل الـ section
          فيبدو أن نصه داخل الـ marquee (اللي z-[20] يغطيه من الأسفل)
          z-[10] < z-[20] للـ marquee
        */}
        <div
          ref={avatarRef}
          aria-hidden="true"
          style={{
            position:       "absolute",
            bottom:         0, // مستقر تماماً داخل شريط الـ marquee ولا يتجاوزه للأسفل
            left:           "50%",
            transform:      "translateX(-50%)",
            zIndex:          10,              // خلف الـ marquee (z-20)
            width:          "clamp(180px, 18vw, 300px)",
            transformStyle: "preserve-3d",
            clipPath:       "inset(-600px -150px 0px -150px)", // يمنع خروج أي جزء أسفل شريط الـ marquee
            filter:
              "drop-shadow(0 20px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 45px rgba(229,225,44,0.35))",
            pointerEvents:  "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar-placeholder.png"
            alt="Haneen Mohamed"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
