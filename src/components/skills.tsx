"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FaReact, FaBrain, FaAws, FaRobot } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiTypescript,
  SiDocker,
  SiVercel,
  SiGithubactions,
} from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
import { SiGsap } from "react-icons/si";
import { BsOpenai } from "react-icons/bs";
import { SiLangchaincorporate } from "react-icons/si";
import { SiLanggraph } from "react-icons/si";
import { SiOllama } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import { SiOctanerender } from "react-icons/si";
import { FaGithub } from "react-icons/fa";


// Simple inline React atom icon (minimal)
// Using react-icons for recognizable icons

const columns = [
  {
    title: "FRONT END",
    items: [
      { name: "React.js", icon: <FaReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      { name: "Framer Motion", icon: <SiFramer className="w-5 h-5" /> },
      { name: "TypeScript", icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
      { name: "GSAP", icon: <SiGsap className="w-5 h-5" /> },
    ],
  },
  {
    title: "BACK END",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" /> },
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" /> },
      { name: "Firebase", icon: <SiFirebase className="w-5 h-5" /> },
      { name: "Express.js", icon: <SiExpress className="w-5 h-5" /> },
      { name: "Socket.io", icon: <SiSocketdotio className="w-5 h-5" /> },
    ],
  },
  {
    title : "AI Agents & LLMs",
    items: [
      { name: "OpenAI", icon: <BsOpenai className="w-5 h-5 text-[#61DAFB]" /> },
      { name: "LangChain", icon: <SiLangchaincorporate className="w-5 h-5" /> },
      { name: "LangGraph", icon: <SiLanggraph className="w-5 h-5" /> },
      { name: "Ollama", icon: <SiOllama className="w-5 h-5" /> },
      { name: "RAG", icon: <FaBrain className="w-5 h-5" /> },
      { name: "Hugging Face", icon: <SiHuggingface className="w-5 h-5" /> },
    ],
  },
  {
    title: "DEPLOYMENT",
    items: [
      { name: "Vercel", icon: <SiVercel className="w-5 h-5" /> },
      { name: "AWS", icon: <FaAws className="w-5 h-5" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="w-5 h-5" /> },
      { name: "Docker", icon: <SiDocker className="w-5 h-5" /> },
      { name: "Octane Render", icon: <SiOctanerender className="w-5 h-5" /> },
      { name: "GitHub", icon: <FaGithub className="w-5 h-5" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">
              Skills
            </h2>
          </div>
        </div>

        {/* Card-style skill tiles (four columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm h-full flex flex-col"
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">{col.title}</h4>

              <ul className="mt-auto space-y-3">
                {col.items.map((it) => (
                  <li key={it.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                      {it.icon}
                    </div>

                    <span className="text-sm font-medium text-[var(--foreground)]">{it.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Agentic AI & LLMs are included above in the columns */}

        {/* Modern Marquee / Logos Section would go here */}
      </div>
    </section>
  );
}
