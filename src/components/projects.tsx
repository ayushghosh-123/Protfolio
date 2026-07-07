"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiReact, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiSupabase,
  SiLangchain,
  SiLanggraph,
  SiWhatsapp,
  SiFramer,
  SiClerk,
  SiHtml5,
} from "react-icons/si";
import { FaCss } from "react-icons/fa6";
import { MdEmail, MdOutlineWebhook } from "react-icons/md";
import { AiFillOpenAI } from "react-icons/ai";
import { FaGoogleDrive } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";



interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  createdAt: string;
}

// Map tech stack tags to their corresponding React icons
const TechIcon = ({ tag }: { tag: string }) => {
  const normalized = tag.toLowerCase().trim();
  switch (normalized) {
    case "nextjs":
      return <SiNextdotjs className="w-5 h-5 text-[var(--foreground)]" title="Next.js" />;
    case "html":
      return <SiHtml5 className="w-5 h-5 text-orange-600" title="HTML5" />;
    case "css":
      return <FaCss className="w-5 h-5 text-blue-600" title="CSS" />;
    case "typescript":
      return <SiTypescript className="w-5 h-5 text-[#3178C6]" title="TypeScript" />;
    case "js":
      return (
        <span className="w-5 h-5 font-black text-[9px] bg-[#F7DF1E] text-black flex items-center justify-center rounded-sm select-none" title="JavaScript">
          JS
        </span>
      );
    case "reactjs":
      return <SiReact className="w-5 h-5 text-[#61DAFB]" title="React" />;
    case "tailwindcss":
      return <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" title="Tailwind CSS" />;
    case "nodejs":
      return <SiNodedotjs className="w-5 h-5 text-[#339933]" title="Node.js" />;
    case "mongodb":
      return <SiMongodb className="w-5 h-5 text-[#47A248]" title="MongoDB" />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql className="w-5 h-5 text-[#4169E1]" title="PostgreSQL" />;
    case "supabase":
      return <SiSupabase className="w-5 h-5 text-[#3ECF8E]" title="Supabase" />;
    case "whatsapp":
      return <SiWhatsapp className="w-5 h-5 text-[#25D366]" title="Whatsapp" />;
    case "framer":
      return <SiFramer className="w-5 h-5 text-[#FF0055]" title="Framer" />;
    case "clerk":
      return <SiClerk className="w-5 h-5 text-[#276EF1]" title="Clerk" />;
    case "langchain":
      return <SiLangchain className="w-5 h-5 text-[#276EF1]" title="Langchain" />;
    case "langgraph":
      return <SiLanggraph className="w-5 h-5 text-[#276EF1]" title="Langgraph" />;
    case "nodemailer":
      return <MdEmail className="w-5 h-5 text-[var(--foreground)]" title="Nodemailer" />;
    case "webhook":
      return <MdOutlineWebhook className="w-5 h-5 text-[var(--foreground)]" title="Webhook" />;
    case "openai":
      return <AiFillOpenAI className="w-5 h-5 text-[var(--foreground)]" title="OpenAI" />;
    case "google drive":
      return <FaGoogleDrive className="w-5 h-5 text-[var(--foreground)]" title="Google Drive" />; 
    case "paymentgateway":
      return <RiSecurePaymentLine className="w-5 h-5 text-[var(--foreground)]" title="Payment Gateway" />;
    default:
      return (
        <span className="text-[10px] font-semibold text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 select-none">
          {tag}
        </span>
      );
  }
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <section id="projects" className="py-32 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="max-w-3xl">

            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">
              Projects
            </h2>
          </div>

        </div>

        {/* Projects Layout */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl border border-[var(--project-border)] bg-[var(--card)] p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.04)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Content */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Title & Year */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Tech Icons Row */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {project.tags.map((tag) => (
                          <div key={tag} className="flex items-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                            <TechIcon tag={tag} />
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-[var(--muted)] text-sm md:text-base font-normal leading-relaxed mt-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-8 lg:mt-12">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--card)] hover:opacity-95 transition-colors text-xs md:text-sm font-bold shadow-md select-none"
                        >
                          <FaGithub className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--card)] hover:opacity-95 transition-colors text-xs md:text-sm font-bold shadow-md select-none"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Image Preview */}
                  <div className="lg:col-span-5 relative w-full h-full min-h-[220px] lg:min-h-full aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-sm">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
                      className="object-cover transition-all duration-750 scale-102 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-40 rounded-[3rem] glass border-white/5">
            <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-sm">No artifacts found in the vault.</p>
          </div>
        )}
      </div>
    </section>
  );
}
