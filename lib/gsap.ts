// lib/gsap.ts
// Centralised GSAP import + plugin registration for client-side use only.
// ALL components should import gsap from here — never directly from "gsap".
// This ensures plugins are registered exactly once before any animation runs.

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

// Register plugins once at module level (client-only, guarded by window check)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// ScrollTrigger default config for smooth page behaviour
if (typeof window !== "undefined") {
  ScrollTrigger.config({ limitCallbacks: true });
}

export { gsap, ScrollTrigger };
