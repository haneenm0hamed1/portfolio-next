"use client";

import React from "react";

/**
 * Footer — big name as heading, two-column social/contact info,
 * horizontal decorative shape strip, copyright line.
 *
 * TODO: Replace all placeholder links and contact info below with real data.
 */

// ─── Placeholder data — replace with real links ────────────────
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },  // TODO: real Instagram URL
  { label: "Facebook",  href: "#" },  // TODO: real Facebook URL
  { label: "ArtStation", href: "#" }, // TODO: real ArtStation URL
  { label: "GitHub",    href: "#" },  // TODO: real GitHub URL
];

const CONTACT_INFO = [
  { label: "Email",   value: "hanin@example.com",       href: "mailto:hanin@example.com" }, // TODO
  { label: "Phone",   value: "+XX XXX XXX XXXX",        href: "tel:+00000000000" },          // TODO
  { label: "Address", value: "Mansoura, Egypt",          href: null },                        // TODO
];
// ───────────────────────────────────────────────────────────────

/** Decorative SVG shape strip — colorful flat geometric shapes */
function ShapeStrip() {
  const shapes = [
    // [shape, fill]
    { type: "circle",   fill: "#ff6ec7" },
    { type: "donut",    fill: "#7b61ff" },
    { type: "x",        fill: "#f87171" },
    { type: "arc",      fill: "#4fd1ff" },
    { type: "triangle", fill: "#fb923c" },
    { type: "diamond",  fill: "#a78bfa" },
    { type: "circle",   fill: "#34d399" },
    { type: "triangle", fill: "#f472b6" },
  ];

  return (
    <div
      className="flex items-center justify-center gap-4 py-6 flex-wrap"
      aria-hidden="true"
    >
      {shapes.map((s, i) => {
        const size = 48;
        const half = size / 2;

        if (s.type === "circle") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle cx={half} cy={half} r={half - 2} fill={s.fill} />
            </svg>
          );
        }
        if (s.type === "donut") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle cx={half} cy={half} r={half - 2} fill="none" stroke={s.fill} strokeWidth="10" />
            </svg>
          );
        }
        if (s.type === "x") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <line x1="8" y1="8" x2={size - 8} y2={size - 8} stroke={s.fill} strokeWidth="8" strokeLinecap="round" />
              <line x1={size - 8} y1="8" x2="8" y2={size - 8} stroke={s.fill} strokeWidth="8" strokeLinecap="round" />
            </svg>
          );
        }
        if (s.type === "arc") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <path d={`M 6 ${half} A ${half - 6} ${half - 6} 0 0 1 ${size - 6} ${half}`} fill="none" stroke={s.fill} strokeWidth="8" strokeLinecap="round" />
            </svg>
          );
        }
        if (s.type === "triangle") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <polygon points={`${half},6 ${size - 6},${size - 6} 6,${size - 6}`} fill={s.fill} />
            </svg>
          );
        }
        if (s.type === "diamond") {
          return (
            <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <polygon points={`${half},4 ${size - 4},${half} ${half},${size - 4} 4,${half}`} fill={s.fill} />
            </svg>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "#08080a" }}>
      {/* Big name */}
      <div className="px-8 pt-16 pb-8 border-b" style={{ borderColor: "rgba(242,241,238,0.06)" }}>
        <h2
          className="uppercase leading-none tracking-tight text-[#f2f1ee]"
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          HANEEN MOHAMED
        </h2>
      </div>

      {/* Two-column info */}
      <div className="grid md:grid-cols-2 gap-12 px-8 py-12">
        {/* Social */}
        <div>
          <p
            className="uppercase tracking-[0.18em] text-xs mb-5"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "#f2f1ee40",
            }}
          >
            Social
          </p>
          <ul className="flex flex-col gap-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  id={`footer-social-${link.label.toLowerCase()}`}
                  className="text-sm text-[#f2f1ee]/60 hover:text-[#f2f1ee] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p
            className="uppercase tracking-[0.18em] text-xs mb-5"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "#f2f1ee40",
            }}
          >
            Contact
          </p>
          <ul className="flex flex-col gap-3">
            {CONTACT_INFO.map((item) => (
              <li key={item.label} className="flex flex-col gap-0.5">
                <span
                  className="text-[0.7rem] uppercase tracking-widest opacity-40"
                  style={{ fontFamily: "var(--font-inter), sans-serif", color: "#f2f1ee" }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    id={`footer-contact-${item.label.toLowerCase()}`}
                    className="text-sm text-[#f2f1ee]/70 hover:text-[#f2f1ee] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    className="text-sm text-[#f2f1ee]/70"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative shape strip */}
      <div
        className="border-t border-b mx-8"
        style={{ borderColor: "rgba(242,241,238,0.06)" }}
      >
        <ShapeStrip />
      </div>

      {/* Copyright */}
      <div className="px-8 py-6 flex items-center justify-between">
        <p
          className="text-xs text-[#f2f1ee]/25"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          © {new Date().getFullYear()} Haneen Mohamed. All rights reserved.
        </p>
        <p
          className="text-xs text-[#f2f1ee]/25"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Built with Next.js & React Three Fiber
        </p>
      </div>
    </footer>
  );
}
