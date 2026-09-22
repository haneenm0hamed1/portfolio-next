"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * TravelingFlowers — position:fixed داخل الـ viewport
 * الورود دايماً مرئية جوا الشاشة وبتتحرك بـ scrub على السكرول
 * Hibiscus (يسار) و Crystal (يمين) يعملوا staircase:
 * يمين → يسار → يمين → يسار مع نزول تدريجي
 */
export default function TravelingFlowers() {
  const leftRef  = useRef<HTMLDivElement>(null!);
  const rightRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const id = setTimeout(() => {
      // ─── Keyframes (viewport-relative: x في px/vw، y في vh) ───
      // كل مرحلة = transition من حالة لحالة مع السكرول
      // Left = Hibiscus، Right = Crystal

      const leftStages = [
        // 0: Hero — يسار عالي
        { x: "0vw",   y: "8vh",  rotate:  0,   scale: 1.0 },
        // 1: About — ينزل يسار، بيدور
        { x: "1.5vw", y: "30vh", rotate:  20,  scale: 1.05 },
        // 2: Projects — على الحافة اليسرى مؤطراً للكروت
        { x: "1.5vw", y: "48vh", rotate: -12,  scale: 0.92 },
        // 3: Experience — يمر بسلاسة على حافة شريط الموجة الحريري
        { x: "2vw",   y: "56vh", rotate:  16,  scale: 0.95 },
        // 4: Contact — يسار أسفل مؤطراً لشريط الموجة المعاكس
        { x: "3vw",   y: "72vh", rotate: -10,  scale: 0.95 },
      ];

      const rightStages = [
        // 0: Hero — يمين عالي
        { x: "0vw",   y: "8vh",  rotate:  0,   scale: 1.0 },
        // 1: About — ينزل يمين، بيدور
        { x: "-1.5vw", y: "20vh", rotate: -25,  scale: 1.05 },
        // 2: Projects — على الحافة اليمنى مؤطراً للكروت
        { x: "-1.5vw", y: "50vh", rotate:  15,  scale: 0.92 },
        // 3: Experience — يمر بسلاسة على حافة شريط الموجة الحريري
        { x: "-2vw",   y: "58vh", rotate: -15,  scale: 0.95 },
        // 4: Contact — يمين أسفل مؤطراً لشريط الموجة المعاكس
        { x: "-3vw",   y: "70vh", rotate:  10,  scale: 0.95 },
      ];

      // Set initial
      gsap.set(leftRef.current,  { ...leftStages[0] });
      gsap.set(rightRef.current, { ...rightStages[0] });

      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const numStages   = leftStages.length - 1;

      for (let i = 0; i < numStages; i++) {
        const startPct = i       / numStages;
        const endPct   = (i + 1) / numStages;

        const startPx = startPct * totalScroll;
        const endPx   = endPct   * totalScroll;

        gsap.to(leftRef.current, {
          ...leftStages[i + 1],
          ease: "none",
          scrollTrigger: {
            trigger:    "body",
            start:      `top+=${startPx} top`,
            end:        `top+=${endPx}   top`,
            scrub:      1.4,
          },
        });

        gsap.to(rightRef.current, {
          ...rightStages[i + 1],
          ease: "none",
          scrollTrigger: {
            trigger:    "body",
            start:      `top+=${startPx} top`,
            end:        `top+=${endPx}   top`,
            scrub:      1.4,
          },
        });
      }

      ScrollTrigger.refresh();
    }, 800);

    // ─── Opacity ديناميكي: أثناء السكرول opacity أعلى، بعد التوقف يخفت ليكونوا خلف المحتوى
    // الـ zIndex ثابت = 1 دايماً (خلف كل شيء)
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      // أثناء السكرول: ظاهرين بوضوح
      gsap.to([leftRef.current, rightRef.current], { opacity: 0.85, duration: 0.2 });
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        // لما يوقف: يخفتوا شوية خلف المحتوى
        gsap.to([leftRef.current, rightRef.current], { opacity: 0.4, duration: 0.5 });
      }, 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(id);
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:          0,
        zIndex:         1,
        pointerEvents: "none",
        overflow:      "visible",
      }}
    >
      {/* Hibiscus — يبدأ يسار */}
      <div
        ref={leftRef}
        style={{
          position:   "absolute",
          top:         0,
          left:       "4vw",
          width:      "clamp(45px, 6vw, 105px)",   // أصغر
          willChange: "transform",
          opacity:     0.88,
          filter:
            "drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 25px rgba(229,225,44,0.4))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-hibiscus.png"
          alt=""
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>

      {/* Crystal — يبدأ يمين */}
      <div
        ref={rightRef}
        style={{
          position:   "absolute",
          top:         0,
          right:      "4vw",
          width:      "clamp(45px, 6vw, 105px)",   // أصغر
          willChange: "transform",
          opacity:     0.88,
          filter:
            "drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 25px rgba(217,217,214,0.4))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-crystal.png"
          alt=""
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
