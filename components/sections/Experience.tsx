"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TimelinePoint {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  isCurrent?: boolean;
}

const TIMELINE_POINTS: TimelinePoint[] = [
  {
    id: "p1",
    year: "2022",
    role: "Computer Science",
    company: "Mansoura University",
    description: "Started my degree, graduated top of my class in 2026.",
  },
  {
    id: "p2",
    year: "2024",
    role: "UI Developer",
    company: "Salla & Zid Store Themes",
    description: "Joined the team in third year of college, building themes for Salla, Zid, and Shopify stores.",
  },
  {
    id: "p3",
    year: "2025",
    role: "Frontend Developer",
    company: "React & Next.js",
    description: "Moved into product development at the same company — built my graduation project, MediCare, during this period.",
  },
  {
    id: "p4",
    year: "2026 – Present",
    role: "Frontend Developer",
    company: "Current Role",
    description: "Still with the same company, now fully focused on Next.js frontend development.",
    isCurrent: true,
  },
];

/**
 * Experience Section — Redesigned as an Angled Geometric Tech Monolith
 * - Non-wave architectural shape with beveled edges and dark palette
 * - Midnight Slate & Obsidian surfaces with Thunder Lime & Silver Mist accents
 * - Connects smoothly after the Projects stacked cards deck
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null!);
  const cardRef    = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const itemsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slide up smoothly over the last project card
      gsap.fromTo(
        sectionRef.current,
        { y: 70 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 65%",
            scrub: 1.2,
          },
        }
      );

      // 2. Content entrance with slight scale
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Staggered reveal of timeline points
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { y: 35, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.16,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: validItems[0],
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 35,
        marginTop: "clamp(-150px, -11vw, -70px)",
        width: "100%",
        padding: "clamp(2rem, 5vw, 4rem) 0 clamp(4rem, 8vw, 7rem)",
        overflow: "visible",
      }}
    >
      {/* ── Outer Angled Geometric Architectural Card ──────────────────── */}
      <div
        ref={cardRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(145deg, #090b0e 0%, #11151a 50%, #0c0f13 100%)",
            border: "1px solid rgba(64, 73, 78, 0.45)",
            borderRadius: "36px",
            boxShadow:
              "0 -25px 50px rgba(0,0,0,0.8), 0 35px 70px rgba(0,0,0,0.9), 0 0 30px rgba(229, 225, 44, 0.05)",
            overflow: "hidden",
          }}
        >
          {/* Subtle Top Diagonal Accent Line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(229, 225, 44, 0.6) 50%, transparent 100%)",
            }}
          />

          {/* Ambient Corner Radial Highlight */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(229, 225, 44, 0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Content Container ────────────────────────────────────────── */}
          <div
            ref={contentRef}
            style={{
              position: "relative",
              zIndex: 5,
              padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.2rem, 3.5vw, 3.5rem)",
            }}
            className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-start lg:items-center"
          >
            {/* ── Left Column: Eyebrow + Elegant Heading ─────────────────── */}
            <div
              className="w-full lg:max-w-[320px] flex flex-col gap-2"
            >
              {/* Eyebrow Label */}
              <span
                style={{
                  fontFamily: "var(--font-space), monospace",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "#E5E12C",
                  textTransform: "uppercase",
                }}
              >
                EXPERIENCE
              </span>

              {/* Two-Line Title */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.3rem, 4vw, 3.4rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                The journey
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#E5E12C",
                    fontWeight: 600,
                  }}
                >
                  that shaped me.
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(217, 217, 214, 0.65)",
                  lineHeight: 1.6,
                  marginTop: "0.4rem",
                }}
              >
                Milestones, product launches, and experience building high-impact web interfaces.
              </p>
            </div>

            {/* ── Right Column: Undulating Dotted Timeline ────────────────── */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Horizontal Connecting S-Wave Curve (Desktop only) */}
              <div
                className="hidden md:block absolute"
                style={{
                  top: "20px",
                  left: "4%",
                  right: "6%",
                  height: "36px",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                <svg
                  viewBox="0 0 900 60"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ width: "100%", height: "100%" }}
                >
                  <path
                    d="M 10,32 C 140,5 220,50 340,28 C 460,8 550,48 680,26 C 740,16 800,38 880,24"
                    stroke="rgba(217, 217, 214, 0.25)"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                  />
                </svg>
              </div>

              {/* 4 Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative z-10 w-full">
                {TIMELINE_POINTS.map((pt, idx) => {
                  const isCurrent = pt.isCurrent;
                  return (
                    <div
                      key={pt.id}
                      ref={(el) => {
                        itemsRef.current[idx] = el;
                      }}
                      className="flex flex-col items-start relative group"
                      style={{
                        paddingRight: "0.5rem",
                      }}
                    >
                      {/* Vertical connecting line on mobile */}
                      {idx < TIMELINE_POINTS.length - 1 && (
                        <div
                          className="md:hidden absolute left-[19px] top-[40px] bottom-[-32px] w-[2px]"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, rgba(229, 225, 44, 0.4), transparent)",
                          }}
                        />
                      )}

                      {/* Circular Marker Node */}
                      <div className="flex items-center gap-3 md:flex-col md:items-start mb-3">
                        <div
                          style={{
                            width: isCurrent ? "44px" : "38px",
                            height: isCurrent ? "44px" : "38px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isCurrent
                              ? "linear-gradient(135deg, #E5E12C, #C2BE18)"
                              : "#161b21",
                            border: isCurrent
                              ? "3px solid #ffffff"
                              : "2px solid rgba(64, 73, 78, 0.6)",
                            boxShadow: isCurrent
                              ? "0 0 25px rgba(229, 225, 44, 0.7), 0 0 45px rgba(229, 225, 44, 0.35), 0 8px 18px rgba(0,0,0,0.5)"
                              : "0 4px 12px rgba(0,0,0,0.4)",
                            position: "relative",
                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                          }}
                        >
                          {/* Node Icon */}
                          {isCurrent ? (
                            <span
                              style={{
                                color: "#000000",
                                fontSize: "1.1rem",
                                lineHeight: 1,
                                transform: "rotate(-15deg) translate(1px, -1px)",
                              }}
                            >
                              🚀
                            </span>
                          ) : (
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#D9D9D6",
                                boxShadow: "0 0 6px rgba(217, 217, 214, 0.6)",
                              }}
                            />
                          )}

                          {/* Pulse Ring for Present */}
                          {isCurrent && (
                            <span
                              style={{
                                position: "absolute",
                                inset: "-6px",
                                borderRadius: "50%",
                                border: "2px solid rgba(229, 225, 44, 0.6)",
                                animation: "currentPulse 2.2s infinite ease-out",
                              }}
                            />
                          )}
                        </div>

                        {/* Year badge */}
                        <span
                          style={{
                            fontFamily: "var(--font-space), monospace",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            color: isCurrent ? "#E5E12C" : "rgba(217, 217, 214, 0.7)",
                            marginTop: "0.15rem",
                          }}
                        >
                          {pt.year}
                        </span>
                      </div>

                      {/* Content text */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-space), sans-serif",
                            fontSize: "clamp(0.96rem, 1.2vw, 1.08rem)",
                            fontWeight: 800,
                            color: "#FFFFFF",
                            margin: 0,
                            lineHeight: 1.25,
                          }}
                        >
                          {pt.role}
                        </h3>

                        <p
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: isCurrent ? "#E5E12C" : "rgba(217, 217, 214, 0.8)",
                            margin: 0,
                          }}
                        >
                          {pt.company}
                        </p>

                        <p
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.78rem",
                            color: "rgba(217, 217, 214, 0.55)",
                            lineHeight: 1.6,
                            margin: 0,
                            marginTop: "0.3rem",
                          }}
                        >
                          {pt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes currentPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
