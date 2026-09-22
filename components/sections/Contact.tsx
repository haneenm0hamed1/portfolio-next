"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const sectionRef   = useRef<HTMLElement>(null!);
  const waveWrapperRef = useRef<HTMLDivElement>(null!);
  const contentRef   = useRef<HTMLDivElement>(null!);
  const catRef       = useRef<HTMLDivElement>(null!);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Professional GSAP Wave Rise & 3D Overlap Animation over Experience
      gsap.fromTo(
        waveWrapperRef.current,
        {
          y: 130,
          scale: 0.96,
          rotateX: 4,
          opacity: 0.85,
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 1.2,
          },
        }
      );

      // 2. Content entrance
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Cat subtle floating idle loop
      gsap.to(catRef.current, {
        y: -12,
        rotation: 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Client-side validation: name and message required, email must be valid
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "40abfe10-101e-4de1-adfe-f6941c755cac";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          from_name: "Portfolio Contact Form",
          subject: `New Portfolio Message from ${formData.name.trim()}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setSuccessMessage("Message sent — I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 36,
        marginTop: "clamp(-120px, -8vw, -40px)",
        width: "100%",
        padding: "clamp(1rem, 3vw, 2rem) 0 clamp(3rem, 6vw, 5rem)",
        overflow: "visible",
        perspective: "1200px",
      }}
    >
      {/* ── Outer Reverse Fluid Wave Ribbon with 3D Overlap ────────────── */}
      <div
        ref={waveWrapperRef}
        style={{
          position: "relative",
          width: "100%",
          willChange: "transform, opacity",
          filter:
            "drop-shadow(0 -25px 45px rgba(0,0,0,0.9)) drop-shadow(0 30px 60px rgba(0,0,0,0.95))",
        }}
      >
        {/* SVG Fluid Wave Ribbon Background (Dark Luxury Palette with Thunder Lime Crest) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 1600 700"
            fill="none"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            {/* Dark Obsidian & Midnight Slate Wave Body */}
            <path
              d="M 0,35 C 300,15 650,45 950,20 C 1250,5 1450,38 1600,25 L 1600,675 C 1450,645 1250,685 950,660 C 650,635 300,675 0,650 Z"
              fill="url(#contactDarkWaveGradient)"
            />

            {/* Glowing Thunder Lime Crest Highlight on top edge */}
            <path
              d="M 0,35 C 300,15 650,45 950,20 C 1250,5 1450,38 1600,25"
              stroke="#E5E12C"
              strokeWidth="3.5"
              style={{
                filter: "drop-shadow(0 0 10px rgba(229, 225, 44, 0.75))",
              }}
            />

            {/* Subtle bottom edge shade */}
            <path
              d="M 0,650 C 300,675 650,635 950,660 C 1250,685 1450,645 1600,675"
              stroke="rgba(64, 73, 78, 0.4)"
              strokeWidth="2"
            />

            <defs>
              <linearGradient id="contactDarkWaveGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a0d10" />
                <stop offset="35%" stopColor="#12161b" />
                <stop offset="70%" stopColor="#0e1115" />
                <stop offset="100%" stopColor="#07090b" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Content Container inside the Dark Wave Ribbon ──────────── */}
        <div
          ref={contentRef}
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(5.5rem, 9vw, 8rem) clamp(1.2rem, 3.5vw, 3.5rem) clamp(4rem, 7vw, 7rem)",
          }}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-center"
        >
          {/* ── Left Column: Heading + Clean Dark Form ──────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              {/* Eyebrow */}
              <span
                style={{
                  fontFamily: "var(--font-space), monospace",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "#E5E12C",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "0.4rem",
                }}
              >
                LET&apos;S TALK
              </span>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Let&apos;s be
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#E5E12C",
                    fontWeight: 600,
                  }}
                >
                  in touch.
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                  color: "rgba(217, 217, 214, 0.75)",
                  margin: "0.6rem 0 0",
                  lineHeight: 1.6,
                }}
              >
                Have an idea, project, or just want to say hi? Drop me a message below.
              </p>
            </div>

            {/* ── Simple Clean Dark Form ──────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              {/* Success Notification Banner */}
              {status === "success" && (
                <div
                  className="p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in"
                  style={{
                    background: "rgba(34, 197, 94, 0.12)",
                    borderColor: "rgba(74, 222, 128, 0.45)",
                    boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)",
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4ade80]/20 flex items-center justify-center text-[#4ade80] font-bold text-sm">
                    ✓
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#4ade80",
                      margin: 0,
                    }}
                  >
                    {successMessage || "Message sent — I'll get back to you soon."}
                  </p>
                </div>
              )}

              {/* Error Notification Banner */}
              {status === "error" && errorMessage && (
                <div
                  className="p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in"
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    borderColor: "rgba(248, 113, 113, 0.45)",
                    boxShadow: "0 8px 24px rgba(239, 68, 68, 0.15)",
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f87171]/20 flex items-center justify-center text-[#f87171] font-bold text-sm">
                    !
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#f87171",
                      margin: 0,
                    }}
                  >
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Name input */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "14px",
                    background: "rgba(18, 22, 28, 0.85)",
                    border: "1.5px solid rgba(64, 73, 78, 0.6)",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#E5E12C";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(229,225,44,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(64, 73, 78, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                  }}
                />
              </div>

              {/* Email input */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "14px",
                    background: "rgba(18, 22, 28, 0.85)",
                    border: "1.5px solid rgba(64, 73, 78, 0.6)",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#E5E12C";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(229,225,44,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(64, 73, 78, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                  }}
                />
              </div>

              {/* Message textarea */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Tell me about your project..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "14px",
                    background: "rgba(18, 22, 28, 0.85)",
                    border: "1.5px solid rgba(64, 73, 78, 0.6)",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#E5E12C";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(229,225,44,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(64, 73, 78, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                  }}
                />
              </div>

              {/* Submit button in Thunder Lime */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 2rem",
                    borderRadius: "9999px",
                    background: status === "sending" ? "rgba(229, 225, 44, 0.6)" : "#E5E12C",
                    color: "#000000",
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: "0.86rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    border: "none",
                    cursor: status === "sending" ? "wait" : "pointer",
                    boxShadow: "0 10px 25px rgba(229,225,44,0.35)",
                    transition: "all 0.25s ease",
                    opacity: status === "sending" ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 14px 30px rgba(229,225,44,0.55)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(229,225,44,0.35)";
                    }
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>↗</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ── Right Column: The Cool Cat with Sunglasses & Phone ─────── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={catRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "340px",
                willChange: "transform",
              }}
            >
              {/* Floating status pill */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "-10px",
                  zIndex: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "9999px",
                  background: "rgba(18, 22, 28, 0.92)",
                  border: "1px solid rgba(229, 225, 44, 0.4)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.5), 0 0 15px rgba(229,225,44,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#E5E12C",
                    boxShadow: "0 0 8px #E5E12C",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-space), monospace",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.04em",
                  }}
                >
                  CALL ME MAYBE 📞
                </span>
              </div>

              {/* The Cat Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cattouch.png"
                alt="Let's be in touch"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.65))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
