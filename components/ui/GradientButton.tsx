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
 * Reusable CTA button in Thunder Lime & Midnight Slate palette.
 */
export default function GradientButton({
  label,
  href,
  onClick,
  id,
  className = "",
}: GradientButtonProps) {
  const base =
    "inline-block rounded-full px-8 py-3 font-bold text-black text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer select-none";

  const style: React.CSSProperties = {
    background: "linear-gradient(135deg, #E5E12C 0%, #F4F066 100%)",
    boxShadow: "0 0 25px rgba(229, 225, 44, 0.55), 0 8px 20px rgba(0, 0, 0, 0.4)",
    color: "#000000",
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
