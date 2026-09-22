"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

/**
 * Responsive Sticky Nav Bar:
 * - Desktop: Full logo on left, inline links with hover effects on right.
 * - Mobile: Compact logo, sleek hamburger toggle button with glassmorphism slide-down menu.
 * - Hides on scroll down, reappears on scroll up.
 */
export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null!);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide on scroll down, show on scroll up (unless menu is open)
      if (navRef.current && !menuOpen) {
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
  }, [menuOpen]);

  return (
    <div className="fixed top-3 sm:top-5 left-0 right-0 z-[500] flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-4 md:gap-12 px-5 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 max-w-4xl w-full"
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.92)"
            : "rgba(10,12,14,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: scrolled
            ? "1px solid rgba(64, 73, 78, 0.65)"
            : "1px solid rgba(64, 73, 78, 0.4)",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.7), 0 0 20px rgba(229,225,44,0.18)"
            : "0 8px 24px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="gradient-text font-bold tracking-tight whitespace-nowrap text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "var(--font-space), sans-serif" }}
        >
          Haneen Mohamed
        </a>

        {/* Desktop Links (Visible on md and up) */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-xs md:text-sm font-medium text-[#D9D9D6]/80 hover:text-white transition-colors duration-200 group"
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

        {/* Mobile Hamburger Toggle Button (Visible on mobile only) */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full bg-[#181d22] border border-[#40494E]/50 text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-4 h-0.5 bg-[#E5E12C] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          />
          <span
            className={`block w-4 h-0.5 bg-[#E5E12C] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-0" : "translate-y-0.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          className="pointer-events-auto md:hidden mt-2 w-full max-w-sm rounded-2xl p-4 flex flex-col gap-3 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2"
          style={{
            background: "rgba(8, 10, 12, 0.96)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(229, 225, 44, 0.3)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.8), 0 0 25px rgba(229, 225, 44, 0.15)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#D9D9D6] hover:text-[#000000] hover:bg-[#E5E12C] transition-all duration-200 flex items-center justify-between"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              <span>{link.label}</span>
              <span className="text-xs opacity-60">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
