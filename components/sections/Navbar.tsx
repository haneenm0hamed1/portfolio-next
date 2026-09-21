"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

/**
 * Sticky nav bar.
 * - Logo/name on the left (gradient text).
 * - Links on the right with hover underline slide-in effect.
 * - Hides on scroll down, reappears on scroll up (GSAP ScrollTrigger).
 * - Background blurs/darkens once user scrolls past hero.
 */
export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null!);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide on scroll down, show on scroll up
      if (navRef.current) {
        if (y > lastY.current && y > 120) {
          gsap.to(navRef.current, { yPercent: -150, duration: 0.35, ease: "power2.in" });
        } else {
          gsap.to(navRef.current, { yPercent: 0, duration: 0.35, ease: "power2.out" });
        }
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-[500] flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-6 md:gap-12 px-6 md:px-8 py-3.5 rounded-full transition-all duration-300 max-w-4xl w-full"
        style={{
          background: scrolled
            ? "rgba(10,10,12,0.85)"
            : "rgba(18,18,22,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: scrolled
            ? "1px solid rgba(242,241,238,0.12)"
            : "1px solid rgba(242,241,238,0.07)",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 20px rgba(123,97,255,0.15)"
            : "0 8px 24px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="gradient-text font-bold tracking-tight whitespace-nowrap text-base md:text-lg"
          style={{
            fontFamily: "var(--font-space), sans-serif",
          }}
        >
          Haneen Mohamed
        </a>

        {/* Links */}
        <ul className="flex items-center gap-5 md:gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-xs md:text-sm font-medium text-[#f2f1ee]/75 hover:text-[#f2f1ee] transition-colors duration-200 group"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {link.label}
                {/* Underline slide-in */}
                <span
                  className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--gradient)" }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
