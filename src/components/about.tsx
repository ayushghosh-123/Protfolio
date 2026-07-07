"use client";


// ----------------------------------------------------
// BIO CONFIGURATION
// ----------------------------------------------------



export default function About() {
  return (
    <section id="about" className="bg-[var(--background)] py-20">
      <div className="mx-auto max-w-2xl px-6 text-left">
        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4 font-bold">// ABOUT</p>

        <h3 className="sr-only ">About</h3>

        <p className="text-[15px] leading-relaxed text-[var(--foreground)] mb-4">
         Hey! I'm Ayush, a full-stack developer and AI engineer who loves building products that solve real-world problems. I enjoy taking ideas from a blank canvas to production, whether it's a modern web application, an AI-powered workflow, or an intelligent automation system
        </p>

        <p className="text-[14px] leading-relaxed text-[var(--muted)]">
          Over the past few years, I've been building with Next.js, React, Node.js, Express, MongoDB, TypeScript, and the MERN stack, while exploring the world of Generative AI, LLMs, LangChain, LangGraph, and Agentic AI. I love creating applications where AI isn't just a feature-it becomes an intelligent collaborator that helps users get things done.
        </p>
      </div>
    </section>
  );
}