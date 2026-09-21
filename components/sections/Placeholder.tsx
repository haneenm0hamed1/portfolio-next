"use client";

import React from "react";

/**
 * Placeholder section — sits between Hero and About.
 * Content not yet confirmed by client.
 *
 * TODO: Replace with the real section once confirmed.
 * Currently renders an empty full-height space so scroll pacing is preserved.
 */
export default function Placeholder() {
  return (
    <section
      id="placeholder-section"
      className="relative min-h-screen flex items-center justify-center"
      aria-label="Coming soon section"
    >
      {/* ────────────────────────────────────────────────────────────
       *  PLACEHOLDER — confirm with client what goes here.
       *  Options discussed: selected works grid / case studies / stats.
       *  Remove this comment and section content when confirmed.
       * ──────────────────────────────────────────────────────────── */}
      <div className="text-center opacity-20 pointer-events-none select-none">
        <p
          className="uppercase tracking-[0.3em] text-xs"
          style={{ fontFamily: "var(--font-inter)", color: "#f2f1ee" }}
        >
          [ Section TBD ]
        </p>
      </div>
    </section>
  );
}
