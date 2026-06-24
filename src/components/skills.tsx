"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Code2, Cpu, Sparkles, Layers, Box, Globe } from "lucide-react";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaDocker, 
  FaBrain, 
  FaNetworkWired, 
  FaMemory, 
  FaAws,
  FaLinux,
  FaDatabase} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiExpress, 
  SiPostgresql, 
  SiMongodb, 
  SiGraphql, 
  SiVercel, 
  SiLangchain, 
  SiOllama, 
  SiOpenai, 
  SiNestjs,
  SiRedis,
  SiRabbitmq
} from "react-icons/si";

const skillCategories = [
  {
    title: "Full Stack Design",
    description: "Architecting high-performance web ecosystems.",
    icon: <Globe className="text-primary" size={24} />,
    skills: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "NestJS", icon: <SiNestjs className="text-[#E0234E]" /> },
      { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
    ]
  },
  {
    title: "Agentic AI",
    description: "Autonomous reasoning and automation workflows.",
    icon: <Cpu className="text-primary" size={24} />,
    skills: [
      { name: "LangChain", icon: <SiLangchain className="text-white"/> },
      { name: "LangGraph", icon: <FaNetworkWired  className="text-white"/> },
      { name: "OpenAI SDK", icon: <SiOpenai className="text-white"/> },
      { name: "Ollama", icon: <SiOllama className="text-white"/> },
      { name: "RAG Systems", icon: <FaBrain className="text-white" /> },
    ],
  },
  {
    title: "Data & Scaling",
    description: "Reliable backends and real-time processing.",
    icon: <Database className="text-primary" size={24} />,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#D82C20]" /> },
      { name: "RabbitMQ", icon: <SiRabbitmq className="text-[#FF6600]" /> },
      { name: "Prisma", icon: <FaDatabase className="text-white" /> },
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Secure, automated deployment pipelines.",
    icon: <Layers className="text-primary" size={24} />,
    skills: [
      { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Git ", icon: <FaGitAlt className="text-[#F05032]" /> },
      {name: "Linux", icon: <FaLinux className="text-white" />}
    ],
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-8">
              <Sparkles size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Stack & Expertise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-8">
              Skills
            </h2>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-8 rounded-[2rem] glass border-white/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold uppercase mb-4 tracking-tight text-white">{category.title}</h3>
              <p className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed">
                {category.description}
              </p>
              
              <div className="w-full h-px bg-white/5 mb-8" />
              
              <ul className="space-y-5 mt-auto">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-4 text-zinc-500 text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors group/skill">
                    <span className="text-lg text-zinc-600 group-hover/skill:text-primary transition-colors">
                      {skill.icon}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Modern Marquee / Logos Section would go here */}
      </div>
    </section>
  );
}
