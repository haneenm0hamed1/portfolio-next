"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

interface Project {
  number: string;
  clientName: string;
  url: string;
  image1: string | null;
  image2: string | null;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    clientName: "CLIENT NAME",
    url: "#",
    image1: null,
    image2: null,
  },
  {
    number: "02",
    clientName: "CLIENT NAME",
    url: "#",
    image1: null,
    image2: null,
  },
  {
    number: "03",
    clientName: "CLIENT NAME",
    url: "#",
    image1: null,
    image2: null,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.12,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 82%",
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      id={`project-card-${project.number}`}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-baseline gap-4">
          <span
            className="gradient-text font-bold"
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
            }}
          >
            {project.number}
          </span>
          <div>
            <p
              className="font-semibold text-[#f2f1ee]"
              style={{ fontFamily: "var(--font-space), sans-serif", fontSize: "1rem" }}
            >
              CLIENT
            </p>
            <p
              className="text-[#f2f1ee]/40 text-xs mt-0.5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {project.clientName}
            </p>
          </div>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`live-project-link-${project.number}`}
          className="text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 hover:bg-white/10"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            borderColor: "rgba(242,241,238,0.2)",
            color: "#f2f1ee",
          }}
        >
          Live Project
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 px-6 pb-6">
        {([project.image1, project.image2] as (string | null)[]).map((src, i) =>
          src ? (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={src}
                alt={`${project.clientName} project image ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              key={i}
              className="relative rounded-xl flex flex-col items-center justify-center gap-2"
              style={{
                aspectRatio: "4/3",
                background: "rgba(123,97,255,0.06)",
                border: "1px dashed rgba(123,97,255,0.22)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(123,97,255,0.4)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span
                className="text-[0.65rem] uppercase tracking-widest"
                style={{ color: "rgba(123,97,255,0.4)", fontFamily: "var(--font-inter)" }}
              >
                Project Image {i + 1}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/**
 * Projects section:
 * Hibiscus flower drops down from top-right on scroll into section and settles right over letter 'P' of PROJECTS title.
 * Subtle clean shadow/glow effect.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null!);
  const headingRef = useRef<HTMLDivElement>(null!);
  const flowerRef  = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading clip reveal
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

      // Flower drops down from top-right and settles precisely over letter P of PROJECTS
      if (flowerRef.current) {
        gsap.fromTo(
          flowerRef.current,
          {
            x: 220,
            y: -140,
            rotate: 35,
            scale: 1.0,
            opacity: 0,
          },
          {
            x: -36, // centered precisely over letter P
            y: 6,
            rotate: -15,
            scale: 0.65,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 45%",
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
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 max-w-5xl mx-auto w-full overflow-visible"
    >
      {/* Hibiscus flower animating on scroll directly over letter P of PROJECTS */}
      <div
        ref={flowerRef}
        aria-hidden="true"
        className="absolute top-[3rem] left-2 sm:left-4 md:left-[-47px] pointer-events-none z-20 w-20 sm:w-24 md:w-28"
        style={{
          filter:
            "drop-shadow(0 6px 14px rgba(0,0,0,0.5)) drop-shadow(0 0 15px rgba(255,110,199,0.25))",
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

      <div ref={headingRef} className="mb-16 overflow-hidden relative z-10">
        <SectionHeading text="PROJECTS" />
      </div>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
