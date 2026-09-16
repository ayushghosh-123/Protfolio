"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: "Email", href: "mailto:ghoshayush910@gmail.com" },
  { label: "GitHub", href: "https://github.com/ayushghosh-123" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/" },
  { label: "Twitter", href: "https://x.com/AyushGhosh30804" },
  { label: "Spotify", href: "https://open.spotify.com/user/31j5r7lq7bo5nea62cvxvfx7udoa" },
];

export default function HeroSection() {
  const fullRole = "Full Stack & AI Agent Developer";
  const [displayedRole, setDisplayedRole] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedRole(fullRole.slice(0, index));
      if (index >= fullRole.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12">
      {/* Top Hero Block: Circular Avatar + Name + Role + Location */}
      <div className="flex items-start gap-5 mb-6">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden border border-[var(--hairline)] bg-[var(--surface)]">
          <Image
            src="/Images/hero_image.jpeg"
            alt="Ayush Ghosh"
            fill
            sizes="64px"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-[32px] sm:text-[38px] font-medium tracking-tight text-[var(--text-primary)] leading-tight">
            Ayush Ghosh
          </h1>

          {/* Role line with typewriter reveal */}
          <div className="mt-1 flex items-center gap-2 font-mono text-[13px] sm:text-[14px] text-[var(--text-secondary)]">
            <span>{displayedRole}</span>
            {!isTypingComplete && (
              <span className="w-2 h-4 bg-[#4BC16B] inline-block animate-pulse" aria-hidden="true" />
            )}
          </div>

          {/* Location field */}
          <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
            <span className="text-[#4BC16B]" aria-hidden="true">⌖</span>
            <span>West Bengal, India</span>
          </div>
        </div>
      </div>

      {/* Two short bio paragraphs in neutral sans */}
      <div className="space-y-3 font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[var(--text-secondary)]">
        <p>
          Hey! I&apos;m Ayush, a full-stack developer and AI agent developer who loves building
          projects based on real-life issues. I enjoy taking ideas from a blank canvas to
          production, whether it&apos;s a modern web application, an AI-powered workflow, or an
          intelligent automation system.
        </p>
        <p className="text-[13px] sm:text-[14px] text-[var(--text-tertiary)]">
          Building with Next.js, React, Node.js, Express, MongoDB, TypeScript, and the MERN stack,
          while pioneering Generative AI, LLMs, LangChain, LangGraph, and autonomous Agentic AI architectures.
        </p>
      </div>

      {/* Row of text links: styled as underlined mono text with small ↗ on hover, NOT buttons */}
      <div className="mt-6 pt-5 border-t border-[var(--hairline)] flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] sm:text-[13px] font-mono">
        {LINKS.map((link, idx) => (
          <div key={link.label} className="flex items-center gap-4">
            <a
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#4BC16B] underline underline-offset-4 decoration-[var(--hairline-bright)] hover:decoration-[#4BC16B] transition-colors duration-150"
            >
              <span>{link.label}</span>
              <span
                className="text-[10px] text-[var(--text-tertiary)] group-hover:text-[#4BC16B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
            {idx < LINKS.length - 1 && (
              <span className="text-[var(--hairline-bright)] select-none" aria-hidden="true">
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
