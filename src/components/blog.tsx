"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, Search, Sparkles, Loader, AlertCircle } from "lucide-react";
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
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["ALL", ...Array.from(new Set(blogs.map(b => b.category.toUpperCase())))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "ALL" || blog.category.toUpperCase() === activeCategory;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (error) {
    return (
      <section className="min-h-screen bg-[#0A0A0A] px-6 py-32 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-primary/50 rounded-2xl p-6 text-white mb-8">
            <AlertCircle size={20} className="text-primary" />
            <p className="font-bold uppercase tracking-tight">{error}</p>
          </div>
          <div>
            <button
              onClick={fetchBlogs}
              className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white px-6 py-32 overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-8">
              <Sparkles size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Publications</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold  tracking-tight leading-none">
             Blog
            </h2>
          </div>
          
          {/* Breadcrumb back to Home if on the sub-page */}
          {pathname !== "/" && (
            <Link 
              href="/"
              className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.02]"
            >
              ← Back to Home
            </Link>
          )}
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-8 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar py-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary border-primary text-white"
                    : "bg-transparent border-white/10 text-zinc-400 hover:border-white hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="SEARCH ARTICLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3 pl-12 pr-6 text-xs uppercase tracking-widest font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Loader size={48} className="text-primary" />
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              Loading thoughts...
            </span>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && (
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              <motion.div
                key="blogs-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {filteredBlogs.map((blog) => {
                  const blogDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).toUpperCase();

                  return (
                    <motion.article
                      key={blog._id}
                      variants={cardVariants}
                      className="group relative flex flex-col glass border-white/10 hover:border-primary/50 rounded-[2rem] p-6 transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.1)]"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="text-primary text-[9px] font-bold uppercase tracking-widest">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-zinc-500 mb-3">
                        <span>{blogDate}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1">
                          <Sparkles size={10} className="text-primary" /> {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 leading-tight tracking-tight group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium line-clamp-4">
                        {blog.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <motion.a
                        href={blog.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-white/[0.03] group-hover:bg-primary text-white hover:text-white px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 border border-white/5 group-hover:border-primary"
                      >
                        <span>Watch / Read Blog</span>
                        <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.a>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-32 border border-dashed border-white/10 rounded-3xl"
              >
                <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">
                  No articles found
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("ALL");
                  }}
                  className="px-6 py-3 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-black transition-all duration-300"
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
