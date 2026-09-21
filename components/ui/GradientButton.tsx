"use client";

import React from "react";

interface GradientButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  id?: string;
  className?: string;
}

/**
 * Reusable gradient CTA button.
 * Background: pink → purple → blue.
 * Can act as an <a> or <button>.
 * The data-label attribute is used by GSAP to swap text on scroll.
 */
export default function GradientButton({
  label,
  href,
  onClick,
  id,
  className = "",
}: GradientButtonProps) {
  const base =
    "inline-block rounded-full px-8 py-3 font-semibold text-white text-sm tracking-wide transition-transform duration-300 hover:scale-105 hover:brightness-110 cursor-pointer select-none";

  const style: React.CSSProperties = {
    background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
    boxShadow: "0 0 30px rgba(123,97,255,0.35)",
  };

  if (href) {
    return (
      <a id={id} href={href} style={style} className={`${base} ${className}`}>
        {label}
      </a>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      style={style}
      className={`${base} ${className}`}
      data-label={label}
    >
      {label}
    </button>
  );
}
