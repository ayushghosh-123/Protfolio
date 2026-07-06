"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
// import { 
//   SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
//   SiNodedotjs, SiMongodb, SiPostgresql, SiOpenai, SiStripe,
//   SiRecharts
// } from "react-icons/si";
import Link from "next/link";

// const techIcons: Record<string, JSX.Element> = {
//   "React": <SiReact />,
//   "Next.js": <SiNextdotjs />,
//   "TypeScript": <SiTypescript />,
//   "Tailwind CSS": <SiTailwindcss />,
//   "Node.js": <SiNodedotjs />,
//   "MongoDB": <SiMongodb />,
//   "PostgreSQL": <SiPostgresql />,
//   "OpenAI": <SiOpenai />,
//   "Stripe": <SiStripe />,
//   "Recharts": <SiRecharts />,
// };

const featuredProjects = [
  {
    title: "AI Task Manager",
    tag: "AI Tool",
    tech: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind CSS"],
    description: "A smart task management application featuring AI-driven priority sorting and natural language processing to streamline your workflow and boost productivity.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    title: "Eco-Commerce",
    tag: "Web App",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    description: "A full-stack e-commerce solution focused on sustainable products, featuring complex filtering, real-time inventory management, and secure Stripe integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    title: "Crypto Tracker",
    tag: "Web App",
    tech: ["TypeScript", "Next.js", "Recharts"],
    description: "A real-time cryptocurrency dashboard tracking live prices and market trends using WebSockets and the Coingecko API for precise financial data.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    github: "https://github.com",
    live: "https://demo.com",
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
              <span className="text-[var(--muted)] font-black tracking-[0.2em] uppercase text-sm mb-4 block">
                // Projects
              </span>
              <h2 className="text-4xl md:text-6xl font-black">
                Selected Works
              </h2>
          </motion.div>
        </div>

        {/* Projects List */}
        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Left: Project Preview Image */}
              <div className="w-full lg:w-3/5 relative group">
                <div className="absolute -inset-4 border border-white/5 -z-10 group-hover:border-[#FF5722]/20 transition-colors duration-500" />
                
                <div className="relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <span className="absolute -top-8 -left-4 text-6xl font-black text-[var(--muted)]/40 select-none pointer-events-none">
                  0{index + 1}
                </span>
              </div>

              {/* Right: Content */}
              <div className="w-full lg:w-2/5 flex flex-col items-start">
                <span className="text-[var(--muted)] text-xs font-black uppercase tracking-[0.18em] mb-4">
                  {project.tag}
                </span>

                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  {project.title}
                </h3>

                <p className="text-[var(--muted)] text-base mb-6 leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* Tech Stack Icons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {project.tech.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-[#FF5722] text-xl" title={t}>
                      {/* {techIcons[t]} */}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <Link
                    href={project.live}
                    className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white hover:text-[#FF5722] transition-colors group"
                  >
                    View Project 
                    <ExternalLink size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={project.github}
                    className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                  >
                    Source Code 
                    <FaGithub size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
