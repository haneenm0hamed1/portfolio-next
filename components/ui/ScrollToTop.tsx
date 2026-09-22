"use client";

import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show button after scrolling down 350px
      setIsVisible(scrollY > 350);

      // Calculate 0 to 100 scroll percentage
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress calculations (radius = 20)
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      id="scroll-to-top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[400] flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 group focus:outline-none ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "rgba(10, 13, 16, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 10px 28px rgba(0, 0, 0, 0.65), 0 0 20px rgba(229, 225, 44, 0.18)",
      }}
    >
      {/* SVG Circular Scroll Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
        viewBox="0 0 48 48"
      >
        {/* Track Ring */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(64, 73, 78, 0.4)"
          strokeWidth="2.5"
        />
        {/* Progress Arc in Thunder Lime */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#E5E12C"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.15s ease-out",
            filter: "drop-shadow(0 0 6px rgba(229, 225, 44, 0.6))",
          }}
        />
      </svg>

      {/* Upward Arrow Icon with Micro-Animation on Hover */}
      <span className="relative z-10 text-[#E5E12C] transition-transform duration-300 group-hover:-translate-y-1">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 stroke-current stroke-[2.5]"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </span>

      {/* Subtle ambient pulse glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: "0 0 25px rgba(229, 225, 44, 0.45)",
        }}
      />
    </button>
  );
}
