"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./section-header";
import Image from "next/image";

type FilterTab = "All" | "Featured" | "AI Agents" | "Full Stack" | "JS/TS";

interface ProjectItem {
  id: string;
  name: string;
  repoUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  oneLiner: string;
  description: string;
  tags: FilterTab[];
  techChips: string[];
}

interface ApiProject {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  tags?: string[] | string;
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
  createdAt?: string;
}

function normalizeTabs(rawTags: string[], featured?: boolean): FilterTab[] {
  const tabs = new Set<FilterTab>();
  tabs.add("All");

  if (featured) {
    tabs.add("Featured");
  }

  const tagStrings = rawTags.map((t) => String(t).toLowerCase());

  for (const t of tagStrings) {
    if (t.includes("featured") || t === "feature") {
      tabs.add("Featured");
    }
    if (
      t.includes("ai") ||
      t.includes("agent") ||
      t.includes("langchain") ||
      t.includes("langgraph") ||
      t.includes("llm") ||
      t.includes("openai") ||
      t.includes("rag") ||
      t.includes("vector")
    ) {
      tabs.add("AI Agents");
    }
    if (
      t.includes("full") ||
      t.includes("stack") ||
      t.includes("mongo") ||
      t.includes("postgres") ||
      t.includes("database") ||
      t.includes("node") ||
      t.includes("express") ||
      t.includes("backend") ||
      t.includes("sql") ||
      t.includes("api")
    ) {
      tabs.add("Full Stack");
    }
    if (
      t.includes("js") ||
      t.includes("ts") ||
      t.includes("javascript") ||
      t.includes("typescript") ||
      t.includes("next") ||
      t.includes("react") ||
      t.includes("tailwind") ||
      t.includes("frontend") ||
      t.includes("css") ||
      t.includes("html")
    ) {
      tabs.add("JS/TS");
    }
  }

  if (tabs.size === 1) {
    tabs.add("Full Stack");
  }

  return Array.from(tabs);
}

const TABS: FilterTab[] = ["All", "Featured", "AI Agents", "Full Stack", "JS/TS"];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [source, setSource] = useState<"database" | "local">("local");

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/projects?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!res.ok) throw new Error("Database fetch failed");
      const data = await res.json();

      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        const dbItems: ProjectItem[] = data.data.map((p: ApiProject) => {
          const rawTags = Array.isArray(p.tags)
            ? p.tags
            : typeof p.tags === "string"
            ? (p.tags as string).split(",").map((s) => s.trim()).filter(Boolean)
            : [];

          return {
            id: p._id,
            name: p.title,
            repoUrl: p.githubLink || "https://github.com/ayushghosh-123",
            liveUrl: p.liveLink || undefined,
            imageUrl: p.imageUrl || undefined,
            oneLiner: p.description,
            description: p.longDescription || p.description,
            tags: normalizeTabs(rawTags, p.featured),
            techChips: rawTags.length > 0 ? rawTags : ["Next.js", "TypeScript"],
          };
        });
        setProjects(dbItems);
        setSource("database");
      } else {
        setProjects([]);  
        setSource("local");
      }
    } catch {
      setProjects([]);
      setSource("local");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    const handleUpdate = () => {
      fetchProjects();
    };

    window.addEventListener("projects-updated", handleUpdate);
    return () => {
      window.removeEventListener("projects-updated", handleUpdate);
    };
  }, [fetchProjects]);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTab));

  return (
    <section id="projects" className="mb-14">
      {/* Section Header */}
      <div className="mb-2">
        <SectionHeader number="06" label="PROJECTS" className="mb-0" />
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-tertiary)] mb-4">
        <span>
          // {filteredProjects.length} projects loaded {source === "database" ? "[DATABASE CONNECTED]" : "[LOCAL ARCHIVE]"}
        </span>
        {isLoading && <span className="text-[#4BC16B] animate-pulse">// SYNCING...</span>}
      </div>

      {/* Filter tab bar with animated green underline */}
      <div className="flex items-center gap-6 mb-8 border-b border-[var(--hairline)] pb-2 font-mono text-[12px] select-none mt-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 cursor-pointer transition-colors duration-150 ${
                isActive
                  ? "text-[#4BC16B] font-semibold"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <motion.div
                  layoutId="project-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4BC16B]"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Project Cards List */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center border border-dashed border-[var(--hairline)] rounded-lg"
            >
              <p className="font-mono text-[12px] text-[var(--text-tertiary)]">
                // No projects indexed under [{activeTab}]
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0 group"
              >
                {/* Optional Project Cover Thumbnail */}
                {project.imageUrl && (
                  <div className="relative w-full h-44 sm:h-52 mb-4 rounded border border-[var(--hairline)] overflow-hidden bg-[var(--surface)]">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 680px"
                      className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Repo link heading and live demo */}
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] hover:text-[#4BC16B] underline underline-offset-4 decoration-[var(--hairline-bright)] hover:decoration-[#4BC16B] transition-colors duration-150"
                  >
                    <span>{project.name}</span>
                    <span
                      className="text-[12px] text-[var(--text-tertiary)] group-hover/link:text-[#4BC16B] transition-colors duration-150"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] text-[#4BC16B] hover:underline"
                    >
                      [ LIVE DEMO ↗ ]
                    </a>
                  )}
                </div>

                {/* Bold technical one-liner */}
                <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.14em] font-semibold text-[var(--text-tertiary)] mb-2.5 leading-relaxed">
                  {project.oneLiner}
                </p>

                {/* Longer description in neutral sans Inter */}
                <p className="font-sans text-[14px] leading-[1.65] text-[var(--text-secondary)] mb-4">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techChips.map((chip) => (
                    <span
                      key={chip}
                      className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--hairline)] hover:border-[var(--hairline-bright)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 select-none bg-[var(--surface)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
