"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy sections to avoid SSR issues with R3F / GSAP
const Loader   = dynamic(() => import("@/components/sections/Loader"),   { ssr: false });
const Navbar   = dynamic(() => import("@/components/sections/Navbar"),   { ssr: false });
const Hero     = dynamic(() => import("@/components/sections/Hero"),     { ssr: false });
const About            = dynamic(() => import("@/components/sections/About"),            { ssr: false });
const Projects         = dynamic(() => import("@/components/sections/Projects"),         { ssr: false });
const Experience       = dynamic(() => import("@/components/sections/Experience"),       { ssr: false });
const Contact          = dynamic(() => import("@/components/sections/Contact"),          { ssr: false });
const Footer           = dynamic(() => import("@/components/sections/Footer"),           { ssr: false });

const GlobalFlowers = dynamic(() => import("@/components/ui/GlobalFlowers"), { ssr: false });
const ScrollToTop   = dynamic(() => import("@/components/ui/ScrollToTop"),   { ssr: false });

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    setRevealDone(true);
    // Re-enable scrolling after intro
    document.body.style.overflow = "";
  }, []);

  // Lock scroll during intro
  if (!loaderDone && typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  }

  return (
    <main>
      {/* Step 1 — Loader with Gradient Name Color Fill */}
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}

      {/* Step 2 — Full site */}
      {/* position:relative is crucial — GlobalFlowers is position:absolute and needs this as anchor */}
      <div
        style={{
          opacity: revealDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          position: "relative",
        }}
      >
        {/* TravelingFlowers: absolute overlay spanning full page height */}
        <GlobalFlowers />

        <Navbar />

        <Hero />

        <About />

        <Projects />

        <Experience />

        <Contact />

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}
