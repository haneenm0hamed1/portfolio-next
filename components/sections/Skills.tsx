"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const SKILLS = [
  { label: "React",        icon: "⚛️" },
  { label: "Next.js",      icon: "▲" },
  { label: "TypeScript",   icon: "TS" },
  { label: "GSAP",         icon: "✦" },
  { label: "Git",          icon: "⌥" },
  { label: "GitHub",       icon: "◉" },
  { label: "REST APIs",    icon: "⚡" },
  { label: "Salla",        icon: "◈" },
  { label: "Zid",          icon: "◇" },
  { label: "Tailwind CSS", icon: "◆" },
  { label: "Three.js",     icon: "◎" },
  { label: "CSS / SCSS",   icon: "✿" },
];

/**
 * Skills / Experience section.
 * Pill row with icon + label.
 * Each pill animates left → right staggered on scroll.
 */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const pillsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // Pills stagger
      gsap.from(pillsRef.current, {
        x: -28,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 overflow-hidden">
          <SectionHeading text="SKILLS" />
        </div>

        {/* Subtitle */}
        <p
          className="mb-10 text-[#f2f1ee]/50 text-sm uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Tools & Technologies
        </p>

        {/* Pill row */}
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.label}
              ref={(el) => { if (el) pillsRef.current[i] = el; }}
              id={`skill-pill-${skill.label.toLowerCase().replace(/[\s/]/g, "-")}`}
              className="flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "#f2f1ee",
                fontFamily: "var(--font-inter), sans-serif",
                backdropFilter: "blur(6px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(123,97,255,0.5)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 16px rgba(123,97,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <span
                className="text-xs font-bold"
                style={{
                  background: "var(--gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                aria-hidden="true"
              >
                {skill.icon}
              </span>
              {skill.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
