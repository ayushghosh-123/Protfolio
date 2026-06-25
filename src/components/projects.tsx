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
  SiHtml5
} from "react-icons/si";
import { FaCss } from "react-icons/fa6";
import { MdEmail, MdOutlineWebhook } from "react-icons/md";
import { AiFillOpenAI } from "react-icons/ai";
import { FaGoogleDrive } from "react-icons/fa";



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
      return <SiNextdotjs className="w-5 h-5 text-white" title="Next.js" />;
    case "html":
      return <SiHtml5 className="w-5 h-5 text-white" title="HTML5" />;
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
      return <MdEmail className="w-5 h-5 text-white" title="Nodemailer" />;
    case "webhook":
      return <MdOutlineWebhook className="w-5 h-5 text-white" title="Webhook" />;
    case "openai":
      return <AiFillOpenAI className="w-5 h-5 text-white" title="OpenAI" />;
    case "google drive":
      return <FaGoogleDrive className="w-5 h-5 text-white" title="Google Drive" />; 
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
    <section id="projects" className="py-32 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-8">
              <Layers size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-8">
              My Projects
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              A curated collection of digital experiences, AI agents, and engineering solutions built for performance.
            </p>
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
                className="group relative rounded-3xl border border-white bg-[#0D0D0D] p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_0_80px_rgba(255,255,255,0.02)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Content */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Title & Year */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Tech Icons Row */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {project.tags.map((tag) => (
                          <div key={tag} className="flex items-center text-zinc-400 hover:text-white transition-colors">
                            <TechIcon tag={tag} />
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm md:text-base font-normal leading-relaxed mt-6">
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-xs md:text-sm font-bold shadow-md select-none"
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-xs md:text-sm font-bold shadow-md select-none"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Image Preview */}
                  <div className="lg:col-span-5 relative w-full h-full min-h-[220px] lg:min-h-full aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
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
