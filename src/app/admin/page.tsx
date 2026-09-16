"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Trash2,
  Edit3,
  Plus,
  RefreshCw,
  Eye,
  ShieldCheck,
  Lock,
} from "lucide-react";
import StatusBar from "@/components/dossier/status-bar";

interface ApiProjectItem {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  tags?: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
  createdAt?: string;
}

interface ApiBlogItem {
  _id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl?: string;
  watchUrl?: string;
  readTime?: string;
  tags?: string[];
  createdAt?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab: project or blog
  const [activeTab, setActiveTab] = useState<"project" | "blog">("project");

  // Project Form State
  const [projectId, setProjectId] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLongDesc, setProjectLongDesc] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [projectLiveLink, setProjectLiveLink] = useState("");
  const [projectGithubLink, setProjectGithubLink] = useState("");
  const [projectFeatured, setProjectFeatured] = useState(false);

  // Blog Form State
  const [blogId, setBlogId] = useState<string>("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogCategory, setBlogCategory] = useState("AGENTIC AI");
  const [blogWatchUrl, setBlogWatchUrl] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("5 MIN READ");
  const [blogTags, setBlogTags] = useState("");

  // Media state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & loading
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Vault data from database
  const [projectsList, setProjectsList] = useState<ApiProjectItem[]>([]);
  const [blogsList, setBlogsList] = useState<ApiBlogItem[]>([]);
  const [vaultLoading, setVaultLoading] = useState(false);
  const [searchVault, setSearchVault] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Fetch Vault Projects
  const fetchVaultProjects = useCallback(async () => {
    try {
      setVaultLoading(true);
      const res = await fetch(`/api/projects?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        setProjectsList(data.data);
      }
    } catch {
      // Ignored: silent fallback
    } finally {
      setVaultLoading(false);
    }
  }, []);

  // Fetch Vault Blogs
  const fetchVaultBlogs = useCallback(async () => {
    try {
      setVaultLoading(true);
      const res = await fetch(`/api/blogs?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        setBlogsList(data.data);
      }
    } catch {
      // Ignored: silent fallback
    } finally {
      setVaultLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "project") {
        fetchVaultProjects();
      } else {
        fetchVaultBlogs();
      }
    }
  }, [isAuthenticated, activeTab, fetchVaultProjects, fetchVaultBlogs]);

  // Handle Login Gate
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Master authorization key required");
      return;
    }
    setIsAuthenticated(true);
    setAuthError("");
  };

  // Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Reset Forms
  const resetProjectForm = () => {
    setProjectId("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectLongDesc("");
    setProjectTags("");
    setProjectLiveLink("");
    setProjectGithubLink("");
    setProjectFeatured(false);
    clearImage();
  };

  const resetBlogForm = () => {
    setBlogId("");
    setBlogTitle("");
    setBlogSummary("");
    setBlogCategory("AGENTIC AI");
    setBlogWatchUrl("");
    setBlogReadTime("5 MIN READ");
    setBlogTags("");
    clearImage();
  };

  // Switch Tab
  const handleTabChange = (tab: "project" | "blog") => {
    setActiveTab(tab);
    setStatusMessage(null);
    if (tab === "project") {
      resetProjectForm();
      fetchVaultProjects();
    } else {
      resetBlogForm();
      fetchVaultBlogs();
    }
  };

  // Load project for edit
  const handleEditProject = (item: ApiProjectItem) => {
    setProjectId(item._id);
    setProjectTitle(item.title || "");
    setProjectDescription(item.description || "");
    setProjectLongDesc(item.longDescription || "");
    setProjectTags(Array.isArray(item.tags) ? item.tags.join(", ") : "");
    setProjectLiveLink(item.liveLink || "");
    setProjectGithubLink(item.githubLink || "");
    setProjectFeatured(Boolean(item.featured));
    if (item.imageUrl) {
      setImagePreview(item.imageUrl);
      setImageFile(null);
    } else {
      clearImage();
    }
    setStatusMessage(null);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load blog for edit
  const handleEditBlog = (item: ApiBlogItem) => {
    setBlogId(item._id);
    setBlogTitle(item.title || "");
    setBlogSummary(item.summary || "");
    setBlogCategory(item.category || "AGENTIC AI");
    setBlogWatchUrl(item.watchUrl || "");
    setBlogReadTime(item.readTime || "5 MIN READ");
    setBlogTags(Array.isArray(item.tags) ? item.tags.join(", ") : "");
    if (item.imageUrl) {
      setImagePreview(item.imageUrl);
      setImageFile(null);
    } else {
      clearImage();
    }
    setStatusMessage(null);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("CONFIRM DELETION: Permanently remove this project from MongoDB?")) {
      return;
    }
    try {
      setDeletingId(id);
      const res = await fetch(`/api/projects/upload?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete project");
      }
      setStatusMessage({ type: "success", text: "Project deleted from database." });
      if (projectId === id) resetProjectForm();
      fetchVaultProjects();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("projects-updated"));
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Deletion failed",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("CONFIRM DELETION: Permanently remove this blog dispatch?")) {
      return;
    }
    try {
      setDeletingId(id);
      const res = await fetch(`/api/blogs/upload?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete blog");
      }
      setStatusMessage({ type: "success", text: "Blog dispatch deleted from database." });
      if (blogId === id) resetBlogForm();
      fetchVaultBlogs();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Deletion failed",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isProject = activeTab === "project";
    const isUpdate = isProject ? Boolean(projectId) : Boolean(blogId);

    if (!isUpdate && !imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image cover." });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isProject) {
      if (isUpdate) formData.append("id", projectId);
      formData.append("title", projectTitle.trim());
      formData.append("description", projectDescription.trim());
      formData.append("longDescription", projectLongDesc.trim());
      formData.append("tags", projectTags.trim());
      formData.append("liveLink", projectLiveLink.trim());
      formData.append("githubLink", projectGithubLink.trim());
      formData.append("featured", String(projectFeatured));
    } else {
      if (isUpdate) formData.append("id", blogId);
      formData.append("title", blogTitle.trim());
      formData.append("summary", blogSummary.trim());
      formData.append("category", blogCategory.trim());
      formData.append("watchUrl", blogWatchUrl.trim());
      formData.append("readTime", blogReadTime.trim());
      formData.append("tags", blogTags.trim());
    }

    const targetUrl = isProject ? "/api/projects/upload" : "/api/blogs/upload";

    try {
      const response = await fetch(targetUrl, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage({
          type: "success",
          text: `${isProject ? "Project" : "Blog dispatch"} ${isUpdate ? "updated" : "committed"} successfully!`,
        });

        if (isProject) {
          resetProjectForm();
          fetchVaultProjects();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("projects-updated"));
          }
        } else {
          resetBlogForm();
          fetchVaultBlogs();
        }
      } else {
        throw new Error(result.error || "Operation failed");
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Commit failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filter Vault Items by Search Query
  const filteredProjects = projectsList.filter((p) => {
    const q = searchVault.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const filteredBlogs = blogsList.filter((b) => {
    const q = searchVault.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // Unauthenticated Gate Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-mono flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-[var(--surface)] border border-[var(--hairline-bright)] rounded-lg p-6 sm:p-8 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--hairline)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4BC16B] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)] font-semibold">
                SYS.GATE // ADMIN ACCESS
              </span>
            </div>
            <Link
              href="/"
              className="text-[11px] text-[var(--text-tertiary)] hover:text-[#4BC16B] transition-colors duration-150 px-2 py-0.5 border border-[var(--hairline)] rounded"
            >
              [ ← EXIT ]
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-[20px] font-semibold tracking-tight text-[var(--text-primary)]">
              Master Control Center
            </h1>
            <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1">
              Restricted interface for Ayush Ghosh. All database write actions require master credentials.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5 flex items-center gap-1.5">
                <Lock size={12} className="text-[#4BC16B]" />
                <span>&gt; Master Authorization Key</span>
              </label>
              <input
                type="password"
                required
                placeholder="ENTER MASTER KEY..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-[12px] font-mono bg-[var(--bg)] border border-[var(--hairline)] rounded focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                autoFocus
              />
              {authError && (
                <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#4BC16B] text-black font-semibold text-[12px] uppercase tracking-wider rounded hover:bg-[#3ea85c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={15} />
                <span>AUTHORIZE ACCESS ↗</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-[10px] text-[var(--text-tertiary)]">
            <span>REF: AG-2026-REL</span>
            <span>AES-256 HMAC VERIFIED</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated Admin Dashboard Screen
  // -------------------------------------------------------------
  const isEditing = activeTab === "project" ? Boolean(projectId) : Boolean(blogId);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-mono selection:bg-[#4BC16B]/25 selection:text-[#4BC16B]">
      <main className="max-w-[1020px] mx-auto px-4 sm:px-6 pt-6 pb-28">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-8 border-b border-[var(--hairline)]">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4BC16B] animate-pulse" />
              <span>SYS.OPERATIONAL // COMMAND CENTER</span>
              <span className="text-[var(--hairline-bright)]">/</span>
              <span className="text-[#4BC16B] font-semibold">AUTHORIZED</span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[var(--text-primary)]">
              Admin Control Room
            </h1>
            <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-0.5">
              Deploy and update projects, curate technical dispatches, and manage the live database.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (activeTab === "project") fetchVaultProjects();
                else fetchVaultBlogs();
              }}
              className="px-2.5 py-1 text-[11px] border border-[var(--hairline)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#4BC16B] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw size={12} className={vaultLoading ? "animate-spin text-[#4BC16B]" : ""} />
              <span>SYNC VAULT</span>
            </button>
            <Link
              href="/"
              className="px-3 py-1 text-[11px] border border-[var(--hairline)] rounded text-[var(--text-secondary)] hover:text-[#4BC16B] hover:border-[#4BC16B] transition-colors flex items-center gap-1"
            >
              <span>← EXIT TO PORTFOLIO</span>
            </Link>
          </div>
        </div>

        {/* Tab Selector & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleTabChange("project")}
              className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "project"
                  ? "bg-[#4BC16B]/15 text-[#4BC16B] border border-[#4BC16B]/40 font-semibold"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--hairline)] bg-[var(--surface)]"
              }`}
            >
              [ 01 ] PROJECTS ({projectsList.length})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("blog")}
              className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "blog"
                  ? "bg-[#4BC16B]/15 text-[#4BC16B] border border-[#4BC16B]/40 font-semibold"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--hairline)] bg-[var(--surface)]"
              }`}
            >
              [ 02 ] BLOG DISPATCHES ({blogsList.length})
            </button>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-2">
            <span className="text-[#4BC16B]">●</span>
            <span>STORAGE: MONGODB &amp; IMAGEKIT LIVE</span>
          </div>
        </div>

        {/* Status Notification Banner */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`p-3 rounded border text-[12px] mb-6 flex items-center justify-between gap-3 ${
                statusMessage.type === "success"
                  ? "border-[#4BC16B]/40 bg-[#4BC16B]/10 text-[#4BC16B]"
                  : "border-red-500/40 bg-red-500/10 text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMessage.type === "success" ? (
                  <CheckCircle2 size={16} className="shrink-0" />
                ) : (
                  <AlertCircle size={16} className="shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="hover:opacity-75"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid: Form on Left/Top + Live Vault on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* -------------------------------------------------------------
              LEFT: FORM PANEL (CREATE / EDIT)
          ------------------------------------------------------------- */}
          <div
            ref={formRef}
            className="lg:col-span-7 bg-[var(--surface)] border border-[var(--hairline)] rounded-lg p-5 sm:p-6"
          >
            {/* Header of Form */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--hairline)]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[11px] uppercase tracking-wider text-[var(--text-primary)]">
                  {isEditing ? `[ EDITING ${activeTab.toUpperCase()} ]` : `[ COMMIT NEW ${activeTab.toUpperCase()} ]`}
                </span>
                {isEditing && (
                  <span className="text-[10px] text-[#4BC16B] px-1.5 py-0.5 rounded bg-[#4BC16B]/10 border border-[#4BC16B]/30">
                    ID: {activeTab === "project" ? projectId.slice(-6) : blogId.slice(-6)}
                  </span>
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={activeTab === "project" ? resetProjectForm : resetBlogForm}
                  className="text-[10px] text-[var(--text-tertiary)] hover:text-[#4BC16B] transition-colors border border-[var(--hairline)] px-2 py-0.5 rounded flex items-center gap-1"
                >
                  <Plus size={11} />
                  <span>NEW ENTRY</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Form Fields */}
              {activeTab === "project" ? (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agentic Workflow Orchestrator"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Technical One-Liner *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Autonomous multi-agent orchestration engine with LangGraph"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Detailed Architecture / Long Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Comprehensive overview of architecture, tech choices, agentic loops, and deployment..."
                      value={projectLongDesc}
                      onChange={(e) => setProjectLongDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Tags &amp; Chips (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="AI Agents, LangGraph, TypeScript, Next.js"
                      value={projectTags}
                      onChange={(e) => setProjectTags(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={projectLiveLink}
                        onChange={(e) => setProjectLiveLink(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={projectGithubLink}
                        onChange={(e) => setProjectGithubLink(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="admin-featured"
                      checked={projectFeatured}
                      onChange={(e) => setProjectFeatured(e.target.checked)}
                      className="w-4 h-4 accent-[#4BC16B] rounded cursor-pointer"
                    />
                    <label htmlFor="admin-featured" className="text-[11px] text-[var(--text-secondary)] select-none cursor-pointer">
                      Mark as [FEATURED] project (displays in Featured tabs)
                    </label>
                  </div>
                </>
              ) : (
                /* Blog Form Fields */
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Dispatch Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architecting Multi-Agent State Machines"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Article Summary *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Brief synopsis and engineering insights shared in this publication..."
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                        Category *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="AGENTIC AI / FULL STACK / CYBERSECURITY"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="5 MIN READ"
                        value={blogReadTime}
                        onChange={(e) => setBlogReadTime(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Destination Link (Video / Article URL) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/... or https://youtu.be/..."
                      value={blogWatchUrl}
                      onChange={(e) => setBlogWatchUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="LangGraph, TypeScript, AI Agents"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-mono"
                    />
                  </div>
                </>
              )}

              {/* Cover Image Upload */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                  Cover Photo {isEditing ? "(Optional: leave as is to keep existing)" : "* (ImageKit)"}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  required={!isEditing && !imagePreview}
                  onChange={handleImageChange}
                  className="w-full text-[11px] text-[var(--text-tertiary)] file:mr-3 file:py-1 file:px-2.5 file:rounded file:border file:border-[var(--hairline)] file:bg-[var(--surface-subtle)] file:text-[var(--text-primary)] file:font-mono file:text-[11px] hover:file:border-[#4BC16B] cursor-pointer"
                />

                {imagePreview && (
                  <div className="relative w-full h-40 mt-2 rounded border border-[var(--hairline)] overflow-hidden bg-[var(--bg)] group">
                    <Image
                      src={imagePreview}
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1.5 rounded bg-black/75 text-white hover:text-red-400 hover:bg-black transition-colors cursor-pointer"
                      title="Clear photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--hairline)] gap-2">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={activeTab === "project" ? resetProjectForm : resetBlogForm}
                    className="px-3.5 py-2 border border-[var(--hairline)] rounded text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    CANCEL EDIT
                  </button>
                ) : (
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    // Commits directly to active database
                  </span>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#4BC16B] text-black font-semibold text-[11px] uppercase tracking-wider rounded hover:bg-[#3ea85c] transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>COMMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={13} />
                      <span>{isEditing ? "UPDATE IN DATABASE ↗" : "COMMIT TO DATABASE ↗"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* -------------------------------------------------------------
              RIGHT: LIVE VAULT EXPLORER PANEL
          ------------------------------------------------------------- */}
          <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--hairline)] rounded-lg p-5 sm:p-6 space-y-4">
            {/* Header with Search */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-[var(--text-primary)]">
                [ LIVE {activeTab.toUpperCase()} VAULT ]
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                {activeTab === "project" ? filteredProjects.length : filteredBlogs.length} ITEMS
              </span>
            </div>

            {/* Filter / Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH VAULT ENTRIES..."
                value={searchVault}
                onChange={(e) => setSearchVault(e.target.value)}
                className="w-full px-3 py-1.5 text-[11px] bg-[var(--bg)] border border-[var(--hairline)] rounded text-[var(--text-primary)] focus:outline-none focus:border-[#4BC16B]"
              />
              {searchVault && (
                <button
                  type="button"
                  onClick={() => setSearchVault("")}
                  className="absolute right-2 top-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Vault List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {activeTab === "project" ? (
                filteredProjects.length === 0 ? (
                  <div className="py-12 text-center text-[11px] text-[var(--text-tertiary)] border border-dashed border-[var(--hairline)] rounded">
                    // No projects matching query in database
                  </div>
                ) : (
                  filteredProjects.map((item) => (
                    <div
                      key={item._id}
                      className={`p-3 rounded border transition-colors ${
                        projectId === item._id
                          ? "border-[#4BC16B] bg-[#4BC16B]/5"
                          : "border-[var(--hairline)] bg-[var(--bg)] hover:border-[var(--hairline-bright)]"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        {item.imageUrl && (
                          <div className="relative w-14 h-14 rounded overflow-hidden border border-[var(--hairline)] shrink-0 bg-[var(--surface)]">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                              {item.title}
                            </h3>
                            {item.featured && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#4BC16B]/15 text-[#4BC16B] border border-[#4BC16B]/30">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5 font-sans">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[var(--hairline)]">
                        <div className="flex items-center gap-2">
                          {item.liveLink && (
                            <a
                              href={item.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[#4BC16B] hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>LIVE</span>
                              <Eye size={10} />
                            </a>
                          )}
                          {item.githubLink && (
                            <a
                              href={item.githubLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] inline-flex items-center gap-0.5"
                            >
                              <span>CODE</span>
                              <ArrowUpRight size={10} />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditProject(item)}
                            className="px-2 py-0.5 text-[10px] rounded border border-[var(--hairline)] hover:border-[#4BC16B] text-[var(--text-secondary)] hover:text-[#4BC16B] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 size={10} />
                            <span>EDIT</span>
                          </button>
                          <button
                            type="button"
                            disabled={deletingId === item._id}
                            onClick={() => handleDeleteProject(item._id)}
                            className="px-2 py-0.5 text-[10px] rounded border border-[var(--hairline)] hover:border-red-500 text-[var(--text-tertiary)] hover:text-red-400 transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 size={10} />
                            <span>DEL</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : filteredBlogs.length === 0 ? (
                <div className="py-12 text-center text-[11px] text-[var(--text-tertiary)] border border-dashed border-[var(--hairline)] rounded">
                  // No blogs matching query in database
                </div>
              ) : (
                filteredBlogs.map((item) => (
                  <div
                    key={item._id}
                    className={`p-3 rounded border transition-colors ${
                      blogId === item._id
                        ? "border-[#4BC16B] bg-[#4BC16B]/5"
                        : "border-[var(--hairline)] bg-[var(--bg)] hover:border-[var(--hairline-bright)]"
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {item.imageUrl && (
                        <div className="relative w-14 h-14 rounded overflow-hidden border border-[var(--hairline)] shrink-0 bg-[var(--surface)]">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                            {item.title}
                          </h3>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[var(--surface-subtle)] text-[var(--text-tertiary)] border border-[var(--hairline)]">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5 font-sans">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Item Actions */}
                    <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[var(--hairline)]">
                      <div className="flex items-center gap-2">
                        {item.watchUrl && (
                          <a
                            href={item.watchUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-[#4BC16B] hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>ARTICLE</span>
                            <ArrowUpRight size={10} />
                          </a>
                        )}
                        <span className="text-[10px] text-[var(--text-tertiary)]">
                          {item.readTime || "5 MIN READ"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEditBlog(item)}
                          className="px-2 py-0.5 text-[10px] rounded border border-[var(--hairline)] hover:border-[#4BC16B] text-[var(--text-secondary)] hover:text-[#4BC16B] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 size={10} />
                          <span>EDIT</span>
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={() => handleDeleteBlog(item._id)}
                          className="px-2 py-0.5 text-[10px] rounded border border-[var(--hairline)] hover:border-red-500 text-[var(--text-tertiary)] hover:text-red-400 transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={10} />
                          <span>DEL</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Synchronized status bar at bottom */}
      <StatusBar />
    </div>
  );
}
