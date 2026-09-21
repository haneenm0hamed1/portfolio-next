"use client";

import React from "react";

interface SectionHeadingProps {
  text: string;
  id?: string;
  className?: string;
  /** If true renders gradient text instead of off-white */
  gradient?: boolean;
}

/**
 * Consistent large uppercase heading used across sections.
 * Space Grotesk, very large, slight negative letter-spacing.
 * GSAP clip-path reveal is triggered externally by the parent section.
 */
export default function SectionHeading({
  text,
  id,
  className = "",
  gradient = false,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`section-heading font-[var(--font-space)] uppercase tracking-tight leading-none ${
        gradient ? "gradient-text" : "text-[#f2f1ee]"
      } ${className}`}
      style={{
        fontFamily: "var(--font-space), sans-serif",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        fontWeight: 700,
      }}
    >
      {text}
    </h2>
  );
}
