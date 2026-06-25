"use client";

import { motion } from "framer-motion";
import {  Sparkles, Terminal, ShieldCheck, Zap, Briefcase, Award, MapPin } from "lucide-react";
import Image from "next/image";


// ----------------------------------------------------
// BIO CONFIGURATION
// Easily adjust your personal text, titles, and stats here!
// ----------------------------------------------------
const bioConfig = {
  name: "Ayush Ghosh",
  title: "CTO & AI Architect",
  location: "West Bengal, India",
  experienceYears: "5+",
  projectsCompleted: "50+",
  rating: "4.9/5",
  shortBio: "Building resilient web ecosystems and autonomous Agentic workflows that scale.",
  storyParagraph: "I build highly scalable full-stack products with a strong focus on AI Agents, AI workflows, MCP and cloud-native architecture. Since starting my software engineering journey in 2023, I&ve delivered decentralized platforms and responsive Next.js experiences using LangChain, LangGraph , RAG Systems, MCP , Mongoose, React, Node, Express with some cloud and best system design practices. I enjoy turning ambitious ideas into clean, production-ready systems that solve real problems, while continuously leveling up in system design, AI automation, and developer-first architecture.",
};



const capabilities = [
  {
    title: "Agentic AI Engineering",
    description: "Orchestrating stateful, multi-agent frameworks using LangGraph, LangChain, and OpenAI to automate complex workflows.",
    icon: <Terminal size={20} className="text-primary" />,
    tags: ["LangGraph", "LLMs", "RAG", "Langchain", "vector databases", "OpenAI", "ChromaDB"]
  },
  {
    title: "Production Full Stack",
    description: "Architecting responsive Next.js apps and clean TypeScript backends (NestJS, PostgreSQL, Redis, RabbitMQ) built to scale.",
    icon: <ShieldCheck size={20} className="text-accent" />,
    tags: ["Next.js", "NestJS", "PostgreSQL", "React", "RabbitMQ", "Redis", "Typescript", "Scalable API"]
  }
];

export default function About() {
  return (
    <section id="about" className="py-22 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 -right-10 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="mb-24 max-w-3xl">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-8"
          >
            About Me 
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed"
          >
            {bioConfig.shortBio}
          </motion.p>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Photo + Milestones */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Image Holder */}
            <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(139,92,246,0.1)]">
              <Image 
                src="/Images/about_image.jpeg" 
                alt={`${bioConfig.name} Profile`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/65 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">{bioConfig.name}</h4>
                  <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">{bioConfig.title}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full border border-primary/25">
                  <MapPin size={10} /> IN
                </div>
              </div>
            </div>

            {/* Micro Stats Row */}
            {/* <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl glass border-white/10 flex flex-col justify-between h-32 hover:border-primary/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                    <div className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div> */}
          </motion.div>

          {/* Right Side: Narrative Bio & Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-16"
          >
            {/* Story Paragraphs */}
            <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
              <p>{bioConfig.storyParagraph}</p>
            </div>

            {/* Highlighted Values / Capabilities */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Core Areas of Focus</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-8 rounded-[2rem] glass border-white/10 hover:border-primary/40 transition-all duration-500 flex flex-col justify-between group h-full"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-md font-bold uppercase tracking-tight text-white mb-3">{item.title}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium mb-6">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.01]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
