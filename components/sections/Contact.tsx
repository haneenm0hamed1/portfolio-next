"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const ContactShape = dynamic(() => import("@/components/three/ContactShape"), { ssr: false });

/**
 * Contact section.
 * Left column: heading + email link
 * Right column: Name / Email / Phone / Message form
 * Top-right floating 3-D blob shape
 *
 * TODO: Wire up the form to a real backend (EmailJS / server action).
 * Currently logs form data to console.
 */
export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null!);
  const headingRef  = useRef<HTMLDivElement>(null!);
  const contentRef  = useRef<HTMLDivElement>(null!);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    // TODO: Replace with real form submission (EmailJS / server action)
    console.log({
      name:    data.get("name"),
      email:   data.get("email"),
      phone:   data.get("phone"),
      message: data.get("message"),
    });
    setTimeout(() => setStatus("sent"), 1200);
  };

  const inputClass =
    "w-full rounded-xl px-5 py-3.5 text-sm text-[#f2f1ee] outline-none transition-all duration-200 focus:ring-1 focus:ring-[#7b61ff]";
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    fontFamily: "var(--font-inter), sans-serif",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* 3-D blob shape top-right */}
      <ContactShape />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 overflow-hidden">
          <SectionHeading
            text="LET'S GET IN TOUCH"
            className="!text-[clamp(2rem,5.5vw,5rem)]"
          />
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: intro + email */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[#f2f1ee]/60 leading-relaxed"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "1.05rem",
              }}
            >
              Have a project in mind, a question, or just want to say hi?
              Drop me a message — I try to reply within 24 hours.
            </p>
            {/* TODO: Replace with real email */}
            <a
              href="mailto:hanin@example.com"
              id="contact-email-link"
              className="gradient-text font-semibold text-xl hover:opacity-80 transition-opacity duration-200"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              hanin@example.com
            </a>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            aria-label="Contact form"
          >
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className={inputClass}
              style={inputStyle}
            />
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className={inputClass}
              style={inputStyle}
            />
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className={inputClass}
              style={inputStyle}
            />
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project…"
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />

            <button
              id="contact-send-btn"
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="mt-2 rounded-full px-8 py-3.5 font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #7b61ff, #4fd1ff)",
                boxShadow: "0 0 28px rgba(123,97,255,0.35)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                ? "Message sent ✓"
                : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
