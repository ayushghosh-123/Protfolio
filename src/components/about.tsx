"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Terminal,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import Image from "next/image";

// ----------------------------------------------------
// BIO CONFIGURATION
// ----------------------------------------------------
const bioConfig = {
  name: "Ayush Ghosh",
  title: "CTO & AI Architect",
  location: "West Bengal, India",
  experienceYears: "5+",
  projectsCompleted: "50+",
  rating: "4.9/5",
  shortBio:
    "Building resilient web ecosystems and autonomous Agentic workflows that scale.",
  storyParagraph:
    "I build highly scalable full-stack products with a strong focus on AI Agents, AI workflows, MCP and cloud-native architecture. Since starting my software engineering journey in 2023, I've delivered decentralized platforms and responsive Next.js experiences using LangChain, LangGraph, RAG Systems, MCP with cloud-native practices and modern system design. I enjoy turning ambitious ideas into clean, production-ready systems that solve real problems while continuously leveling up in system design, AI automation, and developer-first architecture.",
};

const capabilities = [
  {
    title: "Agentic AI Engineering",
    description:
      "Orchestrating stateful, multi-agent frameworks using LangGraph, LangChain, and OpenAI to automate complex workflows.",
    icon: <Terminal size={20} className="text-primary" />,
    tags: [
      "LangGraph",
      "LLMs",
      "RAG",
      "LangChain",
      "Vector DB",
      "OpenAI",
      "ChromaDB",
    ],
  },
  {
    title: "Production Full Stack",
    description:
      "Architecting responsive Next.js apps and clean TypeScript backends (NestJS, PostgreSQL, Redis, RabbitMQ) built to scale.",
    icon: <ShieldCheck size={20} className="text-accent" />,
    tags: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "React",
      "RabbitMQ",
      "Redis",
      "TypeScript",
      "Scalable API",
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[var(--background)] py-20">
      <div className="mx-auto max-w-2xl px-6 text-left">
        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// ABOUT</p>

        <h3 className="sr-only">About</h3>

        <p className="text-[15px] leading-relaxed text-[var(--foreground)] mb-4">
          I am a full-stack engineer and researcher specializing in Agentic AI Engineering. My work revolves around creating systems that don't just process data, but reason through complex tasks autonomously.
        </p>

        <p className="text-[14px] leading-relaxed text-[var(--muted)]">
          With a deep foundation in Full Stack Development, I bridge the gap between sophisticated backend logic and intuitive frontend interfaces. I believe in intentional code—where every line serves a purpose and every interaction is designed for clarity.
        </p>
      </div>
    </section>
  );
}