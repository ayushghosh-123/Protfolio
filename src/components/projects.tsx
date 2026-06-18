"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers, ArrowUpRight, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

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
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-8">
              Selected <span className="text-gradient">Artifacts</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              A curated collection of digital experiences, AI agents, and engineering solutions built for performance.
            </p>
          </div>
          
          <button className="flex items-center gap-3 px-8 py-4 rounded-full glass border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors group">
            All Repositories
            <FaGithub size={14} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Projects Bento Grid Concept */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 mb-8 shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                  <Image
                    src={project.imageUrl || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Floating Tech Tags in Image */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg glass border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Overlay Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight size={24} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex gap-4">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" className="text-zinc-600 hover:text-white transition-colors">
                          <FaGithub size={20} />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" className="text-zinc-600 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-500 text-lg leading-relaxed font-medium line-clamp-2 group-hover:text-zinc-400 transition-colors">
                    {project.description}
                  </p>
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
