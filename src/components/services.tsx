"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Bot, Database, ShieldCheck, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Autonomous AI Agents",
    description: "Architecting self-reasoning agents using LangGraph and OpenAI for complex business logic automation.",
    icon: <Bot className="text-primary" size={28} />,
    tags: ["LangChain", "OpenAI", "Workflows"]
  },
  {
    title: "Enterprise Full Stack",
    description: "Building production-grade web applications with Next.js, focused on scalability, SEO, and user experience.",
    icon: <Globe className="text-accent" size={28} />,
    tags: ["Next.js", "TypeScript", "Performance"]
  },
  {
    title: "Automation Pipelines",
    description: "Streamlining operations through custom integration layers, connecting legacy tools with modern LLM capabilities.",
    icon: <Zap className="text-yellow-500" size={28} />,
    tags: ["Python", "Docker", "Event-Driven"]
  },
  {
    title: "Intelligent Data RAG",
    description: "Developing advanced Retrieval Augmented Generation systems to chat with your private enterprise data securely.",
    icon: <Database className="text-purple-500" size={28} />,
    tags: ["Vector DB", "Embeddings", "Security"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-15 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/[0.02] border border-[#222222] mb-8">
            <Cpu size={12} className="text-primary" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">// Solutions</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-8">
            AI & Automation <br />
            <span className="text-gradient">Services</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            I deliver high-converting digital products that solve real-world problems using the latest in Agentic AI and Full Stack engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group p-10 rounded-none bg-[#111111] border border-[#222222] hover:border-primary/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-none bg-white/[0.02] border border-[#222222] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 px-3 py-1 rounded-none border border-white/5 bg-[#1a1a1a]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                  Explore Solution <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
