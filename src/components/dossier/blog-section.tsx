"use client";

import { useState } from "react";
import SectionHeader from "./section-header";

interface BlogPost {
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  link: string;
}

const DUMMY_BLOGS: BlogPost[] = [
  {
    title: "Architecting Multi-Agent State Machines with LangGraph and TypeScript",
    summary:
      "A deep dive into building production-grade autonomous agent loops. Exploring deterministic state transitions, persistent memory checkpoints, and human-in-the-loop validation.",
    category: "AGENTIC AI",
    readTime: "5 MIN READ",
    date: "MAR 2026",
    tags: ["LangGraph", "LangChain", "TypeScript", "AI Agents"],
    link: "https://github.com/ayushghosh-123",
  },
  {
    title: "Enterprise API Testing & Incident Simulation: Lessons from Federation University",
    summary:
      "Practical strategies for automated security scanning, token fuzzing, rate-limiting verification, and telemetry analysis using Postman collections and Splunk logging.",
    category: "CYBERSECURITY",
    readTime: "6 MIN READ",
    date: "FEB 2026",
    tags: ["Postman", "Splunk", "cURL", "API Testing", "Security"],
    link: "https://github.com/ayushghosh-123",
  },
  {
    title: "Next.js 16 App Router & Turbopack: Building Low-Latency Dossier Interfaces",
    summary:
      "Achieving instant prerender speeds, strict tabular-num layouts, and terminal mission-control aesthetics using React 19 and Tailwind CSS.",
    category: "FULL STACK",
    readTime: "4 MIN READ",
    date: "JAN 2026",
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/ayushghosh-123",
  },
  {
    title: "Production RAG Systems: Vector Embeddings, Semantic Chunking & Guardrails",
    summary:
      "Moving beyond naive similarity search to implement hybrid retrieval, contextual re-ranking, and hallucination evaluation in real-world documentation assistants.",
    category: "LLMS & RAG",
    readTime: "7 MIN READ",
    date: "DEC 2025",
    tags: ["ChromaDB", "OpenAI", "RAG", "Python", "Embeddings"],
    link: "https://github.com/ayushghosh-123",
  },
];

const CATEGORIES = ["ALL", "AGENTIC AI", "CYBERSECURITY", "FULL STACK", "LLMS & RAG"];

export default function BlogDossierSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = DUMMY_BLOGS.filter((post) => {
    const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="mb-14">
      <SectionHeader number="01" label="TECHNICAL DISPATCHES & ARTICLES" />

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 font-mono text-[11px]">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded border transition-colors duration-150 ${
                activeCategory === cat
                  ? "border-[#4BC16B] text-[#4BC16B] bg-[#4BC16B]/10 font-semibold"
                  : "border-[var(--hairline)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--hairline-bright)]"
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            placeholder="FILTER BY KEYWORD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2.5 py-1 text-[11px] font-mono bg-[var(--surface)] border border-[var(--hairline)] rounded focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--text-tertiary)] mb-6">
        // {filteredBlogs.length} dispatch{filteredBlogs.length !== 1 ? "es" : ""} loaded
      </p>

      {/* Articles list */}
      <div className="space-y-10">
        {filteredBlogs.map((post) => (
          <article
            key={post.title}
            className="pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0"
          >
            {/* Header: Title on left, metadata on right */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <h2 className="font-mono text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] leading-snug">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#4BC16B] underline underline-offset-4 decoration-[var(--hairline-bright)] hover:decoration-[#4BC16B] transition-colors duration-150 inline-flex items-baseline gap-1"
                >
                  <span>{post.title}</span>
                  <span className="text-[11px] text-[var(--text-tertiary)]" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </h2>

              <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-tertiary)] tabular-nums shrink-0">
                <span className="text-[#4BC16B] font-medium">[{post.category}]</span>
                <span>/</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Summary in Inter */}
            <p className="font-sans text-[14px] leading-[1.65] text-[var(--text-secondary)] mb-3">
              {post.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--hairline)] text-[var(--text-tertiary)] bg-[var(--surface)] select-none"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
