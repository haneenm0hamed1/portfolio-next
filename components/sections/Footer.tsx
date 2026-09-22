"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// ─── Branded Social & Contact Apps ──────────────────────────────
// LinkedIn placed first, WhatsApp with direct chat link to 01011157622
const SOCIAL_APPS = [
  {
    name: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/in/haneen-mohamed-haneenmohamed?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    href: "https://wa.me/201011157622",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    color: "#E1306C",
    href: "https://www.instagram.com/haneenmohamed1_?stkn=dm5iYmRyeW1waXFl&utm_source=qr",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    color: "#1877F2",
    href: "https://www.facebook.com/share/1BxDn8BsWM/?mibextid=wwXIfr",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    color: "#EE1D52",
    href: "https://www.tiktok.com/@haneenmohamed_1?_r=1&_t=ZS-99wshvTH1oC",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "01011157622",
    color: "#E5E12C",
    href: "tel:01011157622",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const shapesRef = useRef<HTMLDivElement>(null!);

  // GSAP ScrollTrigger for left-to-right write-on color fill on the Bauhaus shapes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapeFills = shapesRef.current?.querySelectorAll(".bauhaus-fill");
      if (shapeFills && shapeFills.length > 0) {
        gsap.fromTo(
          shapeFills,
          {
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.52,
            stagger: 0.14,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: shapesRef.current,
              start: "top 86%",
            },
          }
        );
      }
    }, shapesRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative w-full bg-[#000000] px-4 sm:px-6 md:px-10 lg:px-14 pt-8 pb-12 overflow-hidden">
      {/* ── Main Container (Black Card with Large Rounded Corners) ───── */}
      <div
        className="relative mx-auto max-w-7xl rounded-[28px] sm:rounded-[36px] md:rounded-[42px] p-5 sm:p-10 md:p-16 lg:p-20 overflow-hidden"
        style={{
          background: "#050607",
          border: "1px solid rgba(64, 73, 78, 0.45)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(229, 225, 44, 0.06)",
        }}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(229, 225, 44, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* ── Top Row: Outlined Typography & Branded App Icons ────────── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 sm:gap-14 lg:gap-16 pb-12 sm:pb-16 border-b border-[#40494E]/40">
          
          {/* Left Column: Outlined Typography matching reference image */}
          <div className="flex flex-col">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95]"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                color: "transparent",
                WebkitTextStroke: "2px #FFFFFF",
                letterSpacing: "-0.02em",
                userSelect: "none",
              }}
            >
              HANEEN
              <br />
              MOHAMED
            </h2>
            <p
              className="mt-4 text-xs font-semibold tracking-[0.25em] uppercase text-[#E5E12C]"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              Frontend Developer & Creative Designer
            </p>
          </div>

          {/* Right Column: Branded App Icons in Official Colors */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9D9D6]/50 mb-1"
              style={{ fontFamily: "var(--font-space), monospace" }}
            >
              CONNECT WITH ME
            </span>

            {/* Grid of Branded App Buttons */}
            <div className="flex flex-wrap gap-3 max-w-md">
              {SOCIAL_APPS.map((app) => (
                <a
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`footer-app-${app.name.toLowerCase()}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 group"
                  style={{
                    background: "rgba(18, 22, 26, 0.8)",
                    border: `1.5px solid ${app.color}40`,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = app.color;
                    e.currentTarget.style.boxShadow = `0 0 20px ${app.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${app.color}40`;
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
                  }}
                >
                  <span
                    className="flex items-center justify-center w-6 h-6 transition-transform group-hover:scale-110 duration-200"
                    style={{ color: app.color }}
                  >
                    {app.icon}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-wide text-white group-hover:text-white"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {app.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Quick Contact Info */}
            <div className="mt-4 pt-4 border-t border-[#40494E]/25 flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#D9D9D6]/60 font-mono">
              <p>📍 Mansoura, Egypt</p>
              <p>⚡ Available for freelance & full-time</p>
            </div>
          </div>

        </div>

        {/* ── Bottom Bauhaus Strip: Enlarged & Fluid Color Fill ───────── */}
        <div ref={shapesRef} className="relative z-10 w-full pt-14 pb-4">
          <div
            className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-6 lg:gap-8 items-center justify-items-center w-full"
            aria-hidden="true"
          >
            {/* 1. Purple Rounded Clover */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <path
                  d="M 36,14 C 44,14 50,22 50,30 C 50,22 56,14 64,14 C 77,14 86,23 86,36 C 86,44 78,50 70,50 C 78,50 86,56 86,64 C 86,77 77,86 64,86 C 56,86 50,78 50,70 C 50,78 44,86 36,86 C 23,86 14,77 14,64 C 14,56 22,50 30,50 C 22,50 14,44 14,36 C 14,23 23,14 36,14 Z"
                  fill="none"
                  stroke="#40494E"
                  strokeWidth="2"
                />
                {/* Animated Color Fill */}
                <path
                  className="bauhaus-fill"
                  d="M 36,14 C 44,14 50,22 50,30 C 50,22 56,14 64,14 C 77,14 86,23 86,36 C 86,44 78,50 70,50 C 78,50 86,56 86,64 C 86,77 77,86 64,86 C 56,86 50,78 50,70 C 50,78 44,86 36,86 C 23,86 14,77 14,64 C 14,56 22,50 30,50 C 22,50 14,44 14,36 C 14,23 23,14 36,14 Z"
                  fill="#8B5CF6"
                />
              </svg>
            </div>

            {/* 2. Thunder Lime 4-Dots Cluster */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <circle cx="28" cy="28" r="18" fill="none" stroke="#40494E" strokeWidth="2" />
                <circle cx="72" cy="28" r="18" fill="none" stroke="#40494E" strokeWidth="2" />
                <circle cx="28" cy="72" r="18" fill="none" stroke="#40494E" strokeWidth="2" />
                <circle cx="72" cy="72" r="18" fill="none" stroke="#40494E" strokeWidth="2" />
                {/* Animated Color Fill */}
                <g className="bauhaus-fill">
                  <circle cx="28" cy="28" r="18" fill="#E5E12C" />
                  <circle cx="72" cy="28" r="18" fill="#E5E12C" />
                  <circle cx="28" cy="72" r="18" fill="#E5E12C" />
                  <circle cx="72" cy="72" r="18" fill="#E5E12C" />
                </g>
              </svg>
            </div>

            {/* 3. Silver Mist Curved J-Arc */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <path
                  d="M 18,16 L 42,16 L 42,52 C 42,66 52,74 64,74 C 76,74 86,66 86,52 L 86,42 L 98,42 L 98,52 C 98,74 82,88 64,88 C 44,88 28,74 28,52 L 28,16 Z"
                  fill="none"
                  stroke="#40494E"
                  strokeWidth="2"
                />
                {/* Animated Color Fill */}
                <path
                  className="bauhaus-fill"
                  d="M 18,16 L 42,16 L 42,52 C 42,66 52,74 64,74 C 76,74 86,66 86,52 L 86,42 L 98,42 L 98,52 C 98,74 82,88 64,88 C 44,88 28,74 28,52 L 28,16 Z"
                  fill="#D9D9D6"
                />
              </svg>
            </div>

            {/* 4. Purple Solid Circle */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#40494E" strokeWidth="2" />
                {/* Animated Color Fill */}
                <circle className="bauhaus-fill" cx="50" cy="50" r="42" fill="#8B5CF6" />
              </svg>
            </div>

            {/* 5. Silver Mist Z-Bracket Ribbon */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <polygon
                  points="14,16 86,16 86,34 46,66 86,66 86,84 14,84 14,66 54,34 14,34"
                  fill="none"
                  stroke="#40494E"
                  strokeWidth="2"
                />
                {/* Animated Color Fill */}
                <polygon
                  className="bauhaus-fill"
                  points="14,16 86,16 86,34 46,66 86,66 86,84 14,84 14,66 54,34 14,34"
                  fill="#D9D9D6"
                />
              </svg>
            </div>

            {/* 6. Orange Butterfly Semicircles */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <path d="M 46,14 A 36,36 0 0,0 46,86 Z" fill="none" stroke="#40494E" strokeWidth="2" />
                <path d="M 54,14 A 36,36 0 0,1 54,86 Z" fill="none" stroke="#40494E" strokeWidth="2" />
                {/* Animated Color Fill */}
                <g className="bauhaus-fill">
                  <path d="M 46,14 A 36,36 0 0,0 46,86 Z" fill="#F97316" />
                  <path d="M 54,14 A 36,36 0 0,1 54,86 Z" fill="#F97316" />
                </g>
              </svg>
            </div>

            {/* 7. White Double Triangle Upward Arrow */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <polygon points="50,14 86,48 14,48" fill="none" stroke="#40494E" strokeWidth="2" />
                <polygon points="50,54 82,86 18,86" fill="none" stroke="#40494E" strokeWidth="2" />
                {/* Animated Color Fill */}
                <g className="bauhaus-fill">
                  <polygon points="50,14 86,48 14,48" fill="#FFFFFF" />
                  <polygon points="50,54 82,86 18,86" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            {/* 8. Magenta Donut Ring */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center transition-transform hover:scale-110 duration-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outlined Base */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#40494E" strokeWidth="4" />
                {/* Animated Color Fill */}
                <circle
                  className="bauhaus-fill"
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="16"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* ── Copyright & Bottom Details ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D9D9D6]/35 font-mono">
        <p>© {new Date().getFullYear()} Haneen Mohamed. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Crafted with passion</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5E12C]" />
          <span>Next.js & Three.js</span>
        </p>
      </div>
    </footer>
  );
}
