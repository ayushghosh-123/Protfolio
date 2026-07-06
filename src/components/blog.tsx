"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  watchUrl: string;
  tags: string[];
  readTime: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()).slice(2);
  return `${month} ${day}, ${year}`;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const pathname = usePathname();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["ALL", ...Array.from(new Set(blogs.map((b) => b.category.toUpperCase())))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "ALL" || blog.category.toUpperCase() === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(q) ||
      blog.summary.toLowerCase().includes(q) ||
      blog.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  if (error) {
    return (
      <section className="bg-[var(--background)] px-6 py-24 flex flex-col items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 border border-[var(--border)] rounded-2xl p-6 mb-6 text-[var(--foreground)]">
          <AlertCircle size={18} className="text-[var(--accent)]" />
          <p className="text-sm font-medium">{error}</p>
        </div>
        <button
          onClick={fetchBlogs}
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-[var(--border)] rounded-full text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] py-20 border-t border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-3">// BLOG</p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
              Writing &amp; Thoughts
            </h2>
          </div>

          {/* Sub-page back link */}
          {pathname !== "/" && (
            <Link
              href="/"
              className="text-[var(--muted)] hover:text-[var(--foreground)] text-xs font-medium uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              ← Home
            </Link>
          )}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-0 pb-6 border-b border-[var(--border)]">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-full py-2 pl-8 pr-4 text-xs text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Loader size={28} className="text-[var(--muted)]" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Loading…</span>
          </div>
        )}

        {/* Blog List */}
        {!loading && (
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredBlogs.map((blog, index) => (
                  <motion.a
                    key={blog._id}
                    href={blog.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="group flex gap-8 py-8 border-b border-[var(--border)] hover:bg-[var(--card)] hover:px-4 hover:rounded-xl transition-all duration-300 -mx-4 px-4"
                  >
                    {/* Left: date + read time */}
                    <div className="hidden sm:flex flex-col items-start gap-1 min-w-[72px] pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] leading-none">
                        {formatDate(blog.createdAt)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]/60 leading-none">
                        {blog.readTime} read
                      </span>
                    </div>

                    {/* Right: category + title + summary */}
                    <div className="flex-1 min-w-0">
                      {/* Category pill */}
                      <span className="inline-block mb-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/5">
                        {blog.category}
                      </span>

                      {/* Mobile: date */}
                      <div className="sm:hidden text-[10px] uppercase tracking-wide text-[var(--muted)] mb-1">
                        {formatDate(blog.createdAt)} · {blog.readTime} read
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold font-serif leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                        {blog.summary}
                      </p>
                    </div>

                    {/* Arrow icon */}
                    <div className="hidden sm:flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--accent)]">
                      <ArrowUpRight size={18} />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center border-b border-[var(--border)]"
              >
                <p className="text-sm text-[var(--muted)] mb-5">No articles match your search.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }}
                  className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest border border-[var(--border)] rounded-full text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}
