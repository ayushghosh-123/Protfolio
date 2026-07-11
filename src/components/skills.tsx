"use client";
import FadeUp from "@/components/fade-up";

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

const skillsList = [
  // Front End
  { name: "React.js", icon: <FaReact className="w-6 h-6 text-[#61DAFB]" />, category: "FRONT END" },
  { name: "Next.js", icon: <SiNextdotjs className="w-6 h-6 text-[var(--foreground)]" />, category: "FRONT END" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />, category: "FRONT END" },
  { name: "Framer Motion", icon: <SiFramer className="w-6 h-6 text-[#00F0FF]" />, category: "FRONT END" },
  { name: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" />, category: "FRONT END" },
  { name: "GSAP", icon: <SiGsap className="w-6 h-6 text-[#88CE02]" />, category: "FRONT END" },
  // Back End
  { name: "Node.js", icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" />, category: "BACK END" },
  { name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-[#47A248]" />, category: "BACK END" },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-6 h-6 text-[#4169E1]" />, category: "BACK END" },
  { name: "Firebase", icon: <SiFirebase className="w-6 h-6 text-[#FFCA28]" />, category: "BACK END" },
  { name: "Express.js", icon: <SiExpress className="w-6 h-6 text-[var(--foreground)]" />, category: "BACK END" },
  { name: "Socket.io", icon: <SiSocketdotio className="w-6 h-6 text-[var(--foreground)]" />, category: "BACK END" },
  // AI Agents & LLMs
  { name: "OpenAI", icon: <BsOpenai className="w-6 h-6 text-[#74A57F]" />, category: "AI & LLMS" },
  { name: "LangChain", icon: <SiLangchaincorporate className="w-6 h-6 text-[#1C3C3A]" />, category: "AI & LLMS" },
  { name: "LangGraph", icon: <SiLanggraph className="w-6 h-6 text-[#00A3E0]" />, category: "AI & LLMS" },
  { name: "Ollama", icon: <SiOllama className="w-6 h-6 text-[var(--foreground)]" />, category: "AI & LLMS" },
  { name: "RAG", icon: <FaBrain className="w-6 h-6 text-[#FF6B6B]" />, category: "AI & LLMS" },
  { name: "Hugging Face", icon: <SiHuggingface className="w-6 h-6 text-[#FFD21E]" />, category: "AI & LLMS" },
  // Deployment
  { name: "Vercel", icon: <SiVercel className="w-6 h-6 text-[var(--foreground)]" />, category: "DEPLOYMENT" },
  { name: "AWS", icon: <FaAws className="w-6 h-6 text-[#FF9900]" />, category: "DEPLOYMENT" },
  { name: "GitHub Actions", icon: <SiGithubactions className="w-6 h-6 text-[#2088FF]" />, category: "DEPLOYMENT" },
  { name: "Docker", icon: <SiDocker className="w-6 h-6 text-[#2496ED]" />, category: "DEPLOYMENT" },
  { name: "Octane Render", icon: <SiOctanerender className="w-6 h-6 text-[#FF5A00]" />, category: "DEPLOYMENT" },
  { name: "GitHub", icon: <FaGithub className="w-6 h-6 text-[var(--foreground)]" />, category: "DEPLOYMENT" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <FadeUp className="mb-12">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mb-4">// SKILLS</p>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight">
            Technologies &amp; Frameworks
          </h2>
        </FadeUp>

        {/* Flat Grid of Pill-style Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skillsList.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/50 hover:shadow-sm transition-all duration-200 cursor-default"
            >
              <div className="flex-shrink-0 flex items-center justify-center">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-[var(--foreground)] tracking-tight">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
