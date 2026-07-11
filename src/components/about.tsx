"use client";

import FadeUp from "@/components/fade-up";

// ----------------------------------------------------
// BIO CONFIGURATION
// ----------------------------------------------------

export default function About() {
  return (
    <section id="about" className="bg-[var(--background)] py-16 border-t border-[var(--border)]">
      <div className="mx-auto max-w-2xl px-6 text-left">

        <FadeUp>
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4 font-bold">
            // ABOUT
          </p>
          <h2 className="sr-only">About</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-base leading-[1.6] text-[var(--foreground)] mb-6">
            Hey! I&apos;m Ayush, a full-stack developer and AI agent developer who loves building
            projects based on real-life issues. I enjoy taking ideas from a blank canvas to
            production, whether it&apos;s a modern web application, an AI-powered workflow, or an
            intelligent automation system.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-base leading-[1.6] text-[var(--muted)]">
            Over the past few years, I&apos;ve been building with Next.js, React, Node.js, Express,
            MongoDB, TypeScript, and the MERN stack, while exploring the world of Generative AI,
            LLMs, LangChain, LangGraph, and Agentic AI. I love creating applications where AI
            isn&apos;t just a feature — it becomes an intelligent collaborator that helps users get
            things done.
          </p>
        </FadeUp>

      </div>
    </section>
  );
}