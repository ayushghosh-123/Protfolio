"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";

export default function SecretUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Mode: project or blog
  const [activeTab, setActiveTab] = useState<"project" | "blog">("project");

  // Project Form Fields
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLongDesc, setProjectLongDesc] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [projectLiveLink, setProjectLiveLink] = useState("");
  const [projectGithubLink, setProjectGithubLink] = useState("");
  const [projectFeatured, setProjectFeatured] = useState(false);

  // Blog Form Fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogCategory, setBlogCategory] = useState("AGENTIC AI");
  const [blogWatchUrl, setBlogWatchUrl] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("5 MIN READ");
  const [blogTags, setBlogTags] = useState("");

  // Common Media
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatusMessage(null);
    };

    const handleToggle = () => {
      setIsOpen((prev) => !prev);
      setStatusMessage(null);
    };

    window.addEventListener("open-secret-upload", handleOpen);
    window.addEventListener("toggle-secret-upload", handleToggle);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-secret-upload", handleOpen);
      window.removeEventListener("toggle-secret-upload", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Master security key required");
      return;
    }
    setIsAuthenticated(true);
    setAuthError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Cover image file is required." });
      return;
    }

    if (activeTab === "project") {
      if (!projectTitle.trim() || !projectDescription.trim()) {
        setStatusMessage({ type: "error", text: "Title and short description are required." });
        return;
      }
    } else {
      if (!blogTitle.trim() || !blogSummary.trim() || !blogWatchUrl.trim()) {
        setStatusMessage({ type: "error", text: "Title, summary, and article URL are required." });
        return;
      }
    }

    setSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    if (activeTab === "project") {
      formData.append("title", projectTitle.trim());
      formData.append("description", projectDescription.trim());
      formData.append("longDescription", projectLongDesc.trim());
      formData.append("tags", projectTags.trim());
      formData.append("liveLink", projectLiveLink.trim());
      formData.append("githubLink", projectGithubLink.trim());
      formData.append("featured", String(projectFeatured));
    } else {
      formData.append("title", blogTitle.trim());
      formData.append("summary", blogSummary.trim());
      formData.append("category", blogCategory.trim());
      formData.append("watchUrl", blogWatchUrl.trim());
      formData.append("readTime", blogReadTime.trim());
      formData.append("tags", blogTags.trim());
    }

    const endpoint = activeTab === "project" ? "/api/projects/upload" : "/api/blogs/upload";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setStatusMessage({
        type: "success",
        text: `${activeTab === "project" ? "Project" : "Blog post"} successfully committed to MongoDB & ImageKit!`,
      });

      // Reset form
      if (activeTab === "project") {
        setProjectTitle("");
        setProjectDescription("");
        setProjectLongDesc("");
        setProjectTags("");
        setProjectLiveLink("");
        setProjectGithubLink("");
        setProjectFeatured(false);
      } else {
        setBlogTitle("");
        setBlogSummary("");
        setBlogWatchUrl("");
        setBlogTags("");
      }
      clearImage();

      // Notify project sections to re-fetch live data
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("projects-updated"));
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload execution failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-xl bg-[var(--surface)] border border-[var(--hairline-bright)] rounded-lg p-5 sm:p-7 text-[var(--text-primary)] font-mono text-[12px] shadow-2xl relative my-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[var(--hairline)] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4BC16B] animate-pulse shadow-[0_0_8px_#4BC16B]" />
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-secondary)] font-semibold">
                  SYS.CONSOLE // CLASSIFIED UPLOAD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] text-[var(--text-tertiary)] hover:text-[#4BC16B] transition-colors duration-150 px-2 py-0.5 border border-[var(--hairline)] rounded flex items-center gap-1"
                  title="Open full-screen admin control room"
                >
                  <span>FULL ADMIN</span>
                  <ArrowUpRight size={12} />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] text-[var(--text-tertiary)] hover:text-[#4BC16B] transition-colors duration-150 px-2 py-0.5 border border-[var(--hairline)] rounded"
                >
                  [ ESC ]
                </button>
              </div>
            </div>

            {/* Auth Gate */}
            {!isAuthenticated ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4 py-3">
                <div className="p-3 rounded border border-[var(--hairline)] bg-[var(--bg)] text-[12px] text-[var(--text-secondary)]">
                  <span className="text-[#4BC16B] font-semibold">// ACCESS RESTRICTED</span>
                  <p className="mt-1 font-sans text-[13px]">
                    Provide master security key to unlock cryptographic write access for projects &amp; dispatches.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5">
                    &gt; Master Key Authorization
                  </label>
                  <input
                    type="password"
                    placeholder="ENTER MASTER PASSWORD..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-[12px] font-mono bg-[var(--bg)] border border-[var(--hairline)] rounded focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    // AES-256 HMAC protected
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 border border-[var(--hairline)] rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#4BC16B] text-black font-semibold rounded hover:bg-[#3ea85c] transition-colors flex items-center gap-1.5"
                    >
                      <span>AUTHENTICATE</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Authenticated Form */
              <div className="space-y-4">
                {/* Switcher Tabs */}
                <div className="flex items-center gap-2 border-b border-[var(--hairline)] pb-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("project");
                      setStatusMessage(null);
                    }}
                    className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
                      activeTab === "project"
                        ? "bg-[#4BC16B]/15 text-[#4BC16B] border border-[#4BC16B]/40 font-semibold"
                        : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-transparent"
                    }`}
                  >
                    [ 01 ] PROJECT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("blog");
                      setStatusMessage(null);
                    }}
                    className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
                      activeTab === "blog"
                        ? "bg-[#4BC16B]/15 text-[#4BC16B] border border-[#4BC16B]/40 font-semibold"
                        : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-transparent"
                    }`}
                  >
                    [ 02 ] BLOG DISPATCH
                  </button>
                </div>

                {/* Status Notice */}
                {statusMessage && (
                  <div
                    className={`p-2.5 rounded border text-[11px] flex items-center gap-2 ${
                      statusMessage.type === "success"
                        ? "border-[#4BC16B]/40 bg-[#4BC16B]/10 text-[#4BC16B]"
                        : "border-red-500/40 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 size={14} className="shrink-0" />
                    ) : (
                      <AlertCircle size={14} className="shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
                  {/* Project Specific Fields */}
                  {activeTab === "project" ? (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Agentic Workflow Engine"
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
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
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                          Detailed Architecture / Long Description
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Full summary of engineering components, tech stack, and scalability..."
                          value={projectLongDesc}
                          onChange={(e) => setProjectLongDesc(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-sans"
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
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/..."
                            value={projectGithubLink}
                            onChange={(e) => setProjectGithubLink(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={projectLiveLink}
                            onChange={(e) => setProjectLiveLink(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="secret-featured"
                          checked={projectFeatured}
                          onChange={(e) => setProjectFeatured(e.target.checked)}
                          className="w-3.5 h-3.5 accent-[#4BC16B] rounded cursor-pointer"
                        />
                        <label htmlFor="secret-featured" className="text-[11px] text-[var(--text-secondary)] select-none cursor-pointer">
                          Mark as [FEATURED] work
                        </label>
                      </div>
                    </>
                  ) : (
                    /* Blog Specific Fields */
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
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                          Article Summary *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Key takeaways and architectural concepts covered in this dispatch..."
                          value={blogSummary}
                          onChange={(e) => setBlogSummary(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] font-sans"
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
                            className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] uppercase"
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
                            className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)] uppercase"
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
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
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
                          className="w-full px-3 py-1.5 bg-[var(--bg)] border border-[var(--hairline)] rounded text-[12px] focus:outline-none focus:border-[#4BC16B] text-[var(--text-primary)]"
                        />
                      </div>
                    </>
                  )}

                  {/* Common Cover Image Field */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Cover Media (ImageKit) *
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      required={!imageFile}
                      onChange={handleFileChange}
                      className="w-full text-[11px] text-[var(--text-tertiary)] file:mr-3 file:py-1 file:px-2.5 file:rounded file:border file:border-[var(--hairline)] file:bg-[var(--surface-subtle)] file:text-[var(--text-primary)] file:font-mono file:text-[11px] hover:file:border-[#4BC16B] cursor-pointer"
                    />

                    {imagePreview && (
                      <div className="relative w-full h-32 mt-2 rounded border border-[var(--hairline)] overflow-hidden bg-[var(--bg)] group">
                        <Image
                          src={imagePreview}
                          alt="Cover Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={clearImage}
                          className="absolute top-2 right-2 p-1 rounded bg-black/70 text-white hover:text-red-400 hover:bg-black transition-colors"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--hairline)]">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 border border-[var(--hairline)] rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] text-[11px]"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-1.5 bg-[#4BC16B] text-black font-semibold rounded hover:bg-[#3ea85c] transition-colors disabled:opacity-50 flex items-center gap-1.5 text-[11px]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>UPLOADING &amp; COMMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={13} />
                          <span>COMMIT TO DATABASE ↗</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
