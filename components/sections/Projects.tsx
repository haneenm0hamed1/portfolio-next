"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsPortalScene from "@/components/three/ProjectsPortalScene";

// ─── Project Item Definition ────────────────────────────────────
interface ProjectItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  accent: string;
  glow: string;
  imageMain: string | null;
  imageOverlay: string | null;
  overlayLabel?: string;
  liveUrl?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "01",
    badge: "GRADUATION CAPSTONE • EXCELLENT",
    title: "MediCare",
    tagline: "Smart Healthcare Platform & QR Emergency Card System",
    description:
      "MediCare is a full-stack healthcare platform I built as my graduation project, using PHP for the backend and React for the frontend. It converts a patient's medical file into a QR-linked smart card — scanning it gives any doctor immediate access to that patient's medical history, blood type, allergies, and emergency contact. The system includes two dashboards: an admin dashboard for managing patients and records, and a doctor dashboard for reviewing and updating patient visits.",
    features: [
      "🪪 Smart QR-Linked Card",
      "👨‍⚕️ Doctor Diagnosis Dashboard",
      "🏥 Admin Management Hub",
      "🩸 Instant Emergency Profile",
    ],
    tech: ["React", "PHP", "MySQL", "REST API", "QR Code Engine", "CSS Modules"],
    accent: "#E5E12C",
    glow: "rgba(229, 225, 44, 0.45)",
    imageMain: "/card1 (1).jpg",
    imageOverlay: "/card1.jpg",
    overlayLabel: "Smart QR Card Preview",
    liveUrl: "https://github.com/ziadsaad24/medi_front",
  },
  {
    id: "02",
    badge: "FULL-STACK ANALYTICS DASHBOARD",
    title: "DataView",
    tagline: "Enterprise Business Intelligence & Performance Monitoring",
    description:
      "A full analytics dashboard built with Next.js, designed to give admins a clear, at-a-glance view of business performance. It includes live KPI cards (emails sent, sales, new clients, traffic), a multi-country revenue trend chart, a recent transactions feed, campaign performance breakdowns, and a geography-based traffic map showing activity by country. Built with a consistent dark UI and color-coded data across every chart for easy scanning.",
    features: [
      "📊 Live KPI Metrics Cards",
      "🌍 Geography-Based Traffic Map",
      "📈 Multi-Country Revenue Chart",
      "💳 Recent Transactions Feed",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts", "Chart.js"],
    accent: "#D9D9D6",
    glow: "rgba(217, 217, 214, 0.45)",
    imageMain: "/card2.png",
    imageOverlay: "/card2 (1).png",
    overlayLabel: "Geo & Campaign Insights",
    liveUrl: "https://github.com/haneenm0hamed1/dashboardAdmin",
  },
  {
    id: "03",
    badge: "EVENT PHOTO SHARING PLATFORM",
    title: "Momento Live",
    tagline: "Collaborative Memory Gathering & Live Guest Photo Gallery",
    description:
      "Momento Live lets people turn any event into a shared photo memory. The host creates an event and shares a unique link or QR code with guests — no app or account needed on their end. Guests scan or click to upload their own photos straight to the event's gallery, and everything gets collected automatically in one place. The host can then browse, download, or delete any photo, making it easy to gather memories from everyone who attended without chasing individual phones.",
    features: [
      "📸 Instant Guest QR Upload",
      "🖼️ Live Event Shared Gallery",
      "📱 Zero App or Signup Needed",
      "⚡ Host Moderation & Downloads",
    ],
    tech: ["Next.js", "React", "Cloudinary / S3", "Tailwind CSS", "QR Code API"],
    accent: "#E5E12C",
    glow: "rgba(229, 225, 44, 0.45)",
    imageMain: "/card3.png",
    imageOverlay: "/card3(1).png",
    overlayLabel: "Live Event Gallery",
    liveUrl: "https://github.com/haneenm0hamed1/momenmtLive",
  },
];

// ─── Single Project Card View ───────────────────────────────────
interface CardProps {
  project: ProjectItem;
  cardRef: React.RefObject<HTMLDivElement | null>;
  initialY?: string;
  zIndex: number;
}

function ProjectCardView({ project, cardRef, initialY = "0", zIndex }: CardProps) {
  return (
    <div
      ref={cardRef}
      id={`project-card-${project.id}`}
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "center top",
        transform: `translateY(${initialY})`,
        opacity: 1, // Always visible — NO FADE, pure physical card stack!
        willChange: "transform, filter",
        borderRadius: "26px",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, rgba(12, 16, 20, 0.98) 0%, rgba(6, 8, 10, 0.99) 100%)",
        border: `1px solid rgba(64, 73, 78, 0.5)`,
        boxShadow: `0 28px 85px -12px rgba(0,0,0,0.95), 0 0 45px -10px ${project.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        flexDirection: "column",
        zIndex: zIndex,
        transition: "box-shadow 0.3s ease",
      }}
      className="p-3.5 sm:p-5 md:p-8"
    >
      {/* ── Top Bar (Clean badge on left, Live button on right — NO // 01 / 02 / 03) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "0.8rem",
          borderBottom: `1px solid ${project.accent}22`,
          marginBottom: "0.85rem",
          flexShrink: 0,
        }}
      >
        {/* Left: Badge Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.28rem 0.8rem",
            borderRadius: "9999px",
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}45`,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: project.accent,
              boxShadow: `0 0 8px ${project.accent}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.64rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#f2f1ee",
              textTransform: "uppercase",
            }}
          >
            {project.badge}
          </span>
        </div>

        {/* Right: Repository Link */}
        <a
          href={project.liveUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            padding: "0.38rem 0.95rem",
            borderRadius: "9999px",
            background: `${project.accent}22`,
            border: `1px solid ${project.accent}55`,
            color: "#f2f1ee",
            textDecoration: "none",
            transition: "all 0.25s ease",
            boxShadow: `0 0 14px -3px ${project.glow}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = project.accent;
            e.currentTarget.style.color = "#0a0c0e";
            e.currentTarget.style.boxShadow = `0 0 22px ${project.accent}`;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${project.accent}22`;
            e.currentTarget.style.color = "#f2f1ee";
            e.currentTarget.style.boxShadow = `0 0 14px -3px ${project.glow}`;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>GitHub Repo</span>
          <span>↗</span>
        </a>
      </div>

      {/* ── Main Body Grid ─────────────────────────────────── */}
      <div
        className="flex flex-col md:grid md:grid-cols-[1.08fr_1.12fr] gap-3.5 sm:gap-5 md:gap-8 flex-1 min-h-0 overflow-y-auto md:overflow-visible items-stretch md:items-center pr-1 md:pr-0 w-full min-w-0"
      >
        {/* Left Side: Story & Information */}
        <div
          className="w-full min-w-0 flex flex-col gap-2.5 sm:gap-3 justify-between flex-shrink-0"
        >
          {/* Title & Tagline */}
          <div className="w-full min-w-0">
            <h3
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "clamp(1.35rem, 2.2vw, 2.1rem)",
                fontWeight: 800,
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
              className="w-full min-w-0 break-words"
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.75rem, 0.95vw, 0.84rem)",
                fontWeight: 600,
                color: project.accent,
                margin: 0,
                marginTop: "3px",
                letterSpacing: "0.01em",
              }}
              className="w-full min-w-0 break-words"
            >
              {project.tagline}
            </p>
          </div>

          {/* Description — cleanly formatted with zero cutoff */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(0.72rem, 0.88vw, 0.8rem)",
              color: "rgba(242, 241, 238, 0.8)",
              lineHeight: 1.6,
              margin: 0,
            }}
            className="w-full min-w-0 break-words"
          >
            {project.description}
          </p>

          {/* Features Highlights */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 w-full min-w-0"
          >
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] min-w-0 overflow-hidden"
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.68rem",
                    color: "rgba(242, 241, 238, 0.92)",
                  }}
                  className="truncate min-w-0 block"
                >
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills — plenty of room, never cut off */}
          <div
            className="flex flex-wrap gap-1.5 pt-1 w-full min-w-0"
          >
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-space), monospace",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "0.22rem 0.55rem",
                  borderRadius: "9999px",
                  background: `${project.accent}18`,
                  border: `1px solid ${project.accent}35`,
                  color: "#f2f1ee",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Mockup Showcase */}
        <div
          className="relative w-full min-w-0 flex items-center justify-center pt-2 md:pt-0"
        >
          {project.imageMain ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "470px",
                borderRadius: "16px",
              }}
            >
              {/* Primary Screen Mockup */}
              <div
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: `1px solid rgba(255, 255, 255, 0.16)`,
                  boxShadow: `0 18px 45px rgba(0, 0, 0, 0.75), 0 0 30px ${project.glow}`,
                  background: "#080612",
                  position: "relative",
                  aspectRatio: "16/10",
                }}
              >
                {/* Screen Header Bar */}
                <div
                  style={{
                    height: "22px",
                    background: "rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#ff5f56",
                    }}
                  />
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#ffbd2e",
                    }}
                  />
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#27c93f",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--font-space), monospace",
                      fontSize: "0.52rem",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {project.title.toLowerCase()}.app
                  </span>
                </div>

                {/* Main Screenshot */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageMain}
                  alt={project.title}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "calc(100% - 22px)",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Overlapping Secondary Card (Card 2 / QR / Insights) */}
              {project.imageOverlay && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    right: "-12px",
                    width: "55%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `1px solid ${project.accent}75`,
                    boxShadow: `0 16px 40px rgba(0, 0, 0, 0.9), 0 0 25px ${project.glow}`,
                    background: "rgba(10, 8, 22, 0.96)",
                    backdropFilter: "blur(12px)",
                    transform: "rotate(-2deg)",
                  }}
                >
                  <div
                    style={{
                      padding: "3px 8px",
                      background: `${project.accent}30`,
                      borderBottom: `1px solid ${project.accent}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space), sans-serif",
                        fontSize: "0.54rem",
                        fontWeight: 700,
                        color: "#f2f1ee",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {project.overlayLabel || "Preview"}
                    </span>
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: project.accent,
                      }}
                    />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageOverlay}
                    alt={`${project.title} Secondary View`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      aspectRatio: "16/10",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Project 03 Concept Interactive Visual */
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                aspectRatio: "16/11",
                borderRadius: "16px",
                border: `1px solid ${project.accent}45`,
                background:
                  "radial-gradient(circle at center, rgba(236,72,153,0.16) 0%, rgba(10,8,22,0.96) 75%)",
                boxShadow: `0 20px 45px rgba(0,0,0,0.7), 0 0 35px ${project.glow}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${project.accent}12 1px, transparent 1px), linear-gradient(90deg, ${project.accent}12 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "16px",
                    background: `${project.accent}20`,
                    border: `1px solid ${project.accent}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.7rem",
                    boxShadow: `0 0 25px ${project.glow}`,
                  }}
                >
                  ⚡
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  WebGL & Shaders Playground
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(242,241,238,0.7)",
                    margin: 0,
                    maxWidth: "280px",
                  }}
                >
                  Full 3D physics simulation engine and interactive creative code experiments.
                </p>
                <span
                  style={{
                    marginTop: "0.4rem",
                    fontFamily: "var(--font-space), monospace",
                    fontSize: "0.62rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "9999px",
                    background: `${project.accent}20`,
                    border: `1px solid ${project.accent}50`,
                    color: "#f2f1ee",
                  }}
                >
                  STATUS: EXPERIMENTAL
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Projects Section ─────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null!);
  const card1Ref   = useRef<HTMLDivElement>(null!);
  const card2Ref   = useRef<HTMLDivElement>(null!);
  const card3Ref   = useRef<HTMLDivElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const pinTlRef   = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading entrance
    gsap.from(headingRef.current, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });

    // ── Setup initial physical cards stack positions (NO FADE!)
    // Card 1: at top in focus
    gsap.set(card1Ref.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "brightness(1)",
      pointerEvents: "auto",
    });

    // Card 2: waiting below the container
    gsap.set(card2Ref.current, {
      y: "115%",
      scale: 0.98,
      opacity: 1,
      filter: "brightness(1)",
      pointerEvents: "none",
    });

    // Card 3: waiting below the container
    gsap.set(card3Ref.current, {
      y: "115%",
      scale: 0.98,
      opacity: 1,
      filter: "brightness(1)",
      pointerEvents: "none",
    });

    // ── Pin Timeline on sectionRef
    // Pins section for 2400px of scrolling while cards stack directly over each other!
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2400",
        pin: true,
        pinSpacing: true,
        scrub: 1.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.38) {
            setActiveIndex(0);
          } else if (p < 0.72) {
            setActiveIndex(1);
          } else {
            setActiveIndex(2);
          }
        },
      },
    });

    pinTlRef.current = tl;

    // Step 1: Card 1 hold (0.0 to 0.12)
    tl.to({}, { duration: 0.4 });

    // Step 2: Card 2 slides UP and stacks directly ON TOP of Card 1 (0.12 to 0.45)
    tl.to(
      card1Ref.current,
      {
        y: -24,
        scale: 0.93,
        filter: "brightness(0.65)",
        ease: "power2.out",
        duration: 1.2,
      },
      "stack2"
    );

    tl.to(
      card2Ref.current,
      {
        y: 0,
        scale: 1,
        filter: "brightness(1)",
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 1.2,
      },
      "stack2"
    );

    // Step 3: Card 2 hold in center (0.45 to 0.58)
    tl.to({}, { duration: 0.5 });

    // Step 4: Card 3 slides UP and stacks directly ON TOP of Card 2 (0.58 to 0.90)
    tl.to(
      card1Ref.current,
      {
        y: -48,
        scale: 0.86,
        filter: "brightness(0.4)",
        ease: "power2.out",
        duration: 1.2,
      },
      "stack3"
    );

    tl.to(
      card2Ref.current,
      {
        y: -24,
        scale: 0.93,
        filter: "brightness(0.65)",
        ease: "power2.out",
        duration: 1.2,
      },
      "stack3"
    );

    tl.to(
      card3Ref.current,
      {
        y: 0,
        scale: 1,
        filter: "brightness(1)",
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 1.2,
      },
      "stack3"
    );

    // Step 5: Card 3 hold in center (0.90 to 1.00)
    tl.to({}, { duration: 0.4 });

    return () => {
      if (pinTlRef.current) {
        pinTlRef.current.kill();
      }
    };
  }, []);

  const activeColor = PROJECTS_DATA[activeIndex]?.accent || "#E5E12C";

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Three.js 3D WebGL Background Scene */}
      <ProjectsPortalScene activeColor={activeColor} />

      {/* Top Heading */}
      <div
        ref={headingRef}
        style={{
          position: "relative",
          zIndex: 5,
          marginBottom: "1rem",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <SectionHeading text="FEATURED PROJECTS" />
      </div>

      {/* Cards Stack Stage: Exact same boundaries for all 3 cards */}
      <div
        className="relative z-10 w-[94vw] max-w-[1160px] h-[520px] sm:h-[550px] md:h-[590px] lg:h-[620px]"
      >
        <ProjectCardView
          project={PROJECTS_DATA[0]}
          cardRef={card1Ref}
          initialY="0"
          zIndex={10}
        />
        <ProjectCardView
          project={PROJECTS_DATA[1]}
          cardRef={card2Ref}
          initialY="115%"
          zIndex={20}
        />
        <ProjectCardView
          project={PROJECTS_DATA[2]}
          cardRef={card3Ref}
          initialY="115%"
          zIndex={30}
        />
      </div>

      {/* Bottom Project Indicators */}
      <div
        style={{
          position: "relative",
          zIndex: 15,
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          marginTop: "1.2rem",
          padding: "0.35rem 1rem",
          borderRadius: "9999px",
          background: "rgba(10, 8, 22, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          flexShrink: 0,
        }}
      >
        {PROJECTS_DATA.map((p, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              <span
                style={{
                  width: isActive ? "22px" : "7px",
                  height: "7px",
                  borderRadius: "9999px",
                  background: isActive ? p.accent : "rgba(255,255,255,0.2)",
                  boxShadow: isActive ? `0 0 10px ${p.accent}` : "none",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-space), monospace",
                  fontSize: "0.68rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.05em",
                  transition: "color 0.3s ease",
                }}
              >
                {p.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
