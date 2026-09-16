"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./section-header";
import { Search, Loader2 } from "lucide-react";

interface ApiBlog {
  _id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl?: string;
  watchUrl: string;
  tags?: string[] | string;
  readTime?: string;
  createdAt?: string;
}

interface BlogPostItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  link: string;
}

function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return "MAR 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "MAR 2026";
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = d.getFullYear();
    return `${month} ${year}`;
  } catch {
    return "MAR 2026";
  }
}

export default function BlogDossierSection() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [source, setSource] = useState<"database" | "empty">("empty");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/blogs?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();

      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        const items: BlogPostItem[] = data.data.map((b: ApiBlog) => {
          const rawTags = Array.isArray(b.tags)
            ? b.tags
            : typeof b.tags === "string"
            ? (b.tags as string).split(",").map((s) => s.trim()).filter(Boolean)
            : [];

          return {
            id: b._id,
            title: b.title,
            summary: b.summary,
            category: (b.category || "AGENTIC AI").toUpperCase(),
            readTime: b.readTime || "5 MIN READ",
            date: formatBlogDate(b.createdAt),
            tags: rawTags,
            link: b.watchUrl,
          };
        });
        setBlogs(items);
        setSource("database");
      } else {
        setBlogs([]);
        setSource("empty");
      }
    } catch {
      setBlogs([]);
      setSource("empty");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();

    const handleUpdate = () => {
      fetchBlogs();
    };

    window.addEventListener("blogs-updated", handleUpdate);
    return () => {
      window.removeEventListener("blogs-updated", handleUpdate);
    };
  }, [fetchBlogs]);

  // Derive unique categories dynamically
  const categories = [
    "ALL",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory =
      activeCategory === "ALL" || post.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="mb-14">
      <SectionHeader number="01" label="TECHNICAL DISPATCHES & ARTICLES" />

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 font-mono text-[11px]">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded border transition-colors duration-150 cursor-pointer ${
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
        <div className="relative w-full sm:w-52">
          <input
            type="text"
            placeholder="FILTER BY KEYWORD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2.5 py-1 text-[11px] font-mono bg-[var(--surface)] border border-[var(--hairline)] rounded focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-tertiary)] mb-6">
        <span>
          // {filteredBlogs.length} dispatch{filteredBlogs.length !== 1 ? "es" : ""} loaded{" "}
          {source === "database" ? "[DATABASE CONNECTED]" : "[EMPTY ARCHIVE]"}
        </span>
        {isLoading && <span className="text-[#4BC16B] animate-pulse">// SYNCING...</span>}
      </div>

      {/* Articles list */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {filteredBlogs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-14 text-center border border-dashed border-[var(--hairline)] rounded-lg"
            >
              <p className="font-mono text-[12px] text-[var(--text-tertiary)]">
                // No dispatches indexed under [{activeCategory}]
              </p>
              <p className="font-sans text-[12px] text-[var(--text-tertiary)] mt-1">
                Dispatches added via the admin panel will appear here automatically.
              </p>
            </motion.div>
          ) : (
            filteredBlogs.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0 group"
              >
                {/* Header: Title with external link + Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2.5">
                  <h2 className="font-mono text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] leading-snug">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#4BC16B] underline underline-offset-4 decoration-[var(--hairline-bright)] hover:decoration-[#4BC16B] transition-colors duration-150 inline-flex items-baseline gap-1.5"
                    >
                      <span>{post.title}</span>
                      <span
                        className="text-[12px] text-[var(--text-tertiary)] group-hover:text-[#4BC16B] transition-colors duration-150"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </h2>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-tertiary)] tabular-nums shrink-0">
                    <span className="text-[#4BC16B] font-medium">[{post.category}]</span>
                    <span>/</span>
                    <span>{post.readTime}</span>
                    <span>/</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Summary in Inter */}
                <p className="font-sans text-[14px] leading-[1.65] text-[var(--text-secondary)] mb-3.5">
                  {post.summary}
                </p>

                {/* Tags and Direct Link */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--hairline)] text-[var(--text-tertiary)] bg-[var(--surface)] select-none"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-[#4BC16B] hover:underline inline-flex items-center gap-1"
                  >
                    <span>[ READ DISPATCH ↗ ]</span>
                  </a>
                </div>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
