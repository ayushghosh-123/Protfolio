"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    company: "Employability.life",
    role: "Testing Trainee",
    period: "Sep 2024 – Nov 2024",
    image: "/ExperienceImage/EmpLife_Fed_Logo.png",
    link: null,
    description:
      "Worked as a QA testing trainee, contributing to manual and exploratory testing of web-based platforms. Identified bugs, documented issues, and collaborated with the development team to ensure product quality and reliability."
  },
  {
    company: "Freelancer (Fiverr)",
    role: "Freelance Software Developer",
    image: "/ExperienceImage/fiver.png",
    link: "https://www.fiverr.com",
    description:
      "Delivering full-stack web applications and AI-powered solutions for clients worldwide. Projects span MERN stack apps, Next.js dashboards, LangChain/LangGraph integrations, and custom automation workflows — from concept to production deployment."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// EXPERIENCE</p>
        <h2 className="text-2xl md:text-3xl font-bold font-serif mb-10">Professional Experience</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="flex gap-6 group"
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] block z-10" />
                </div>

                {/* Content card */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    {/* Role + company */}
                    <div className="flex items-center gap-3">
                      {/* Company logo */}
                      <div className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          fill
                          className="object-contain p-1"
                          sizes="36px"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-[12px] text-[var(--muted)]">{exp.company}</p>
                      </div>
                    </div>

                    
                  </div>

                  {/* Description */}
                  <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-3">
                    {exp.description}
                  </p>

                
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub contributions */}
        <div className="mt-12 border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// GITHUB CONTRIBUTIONS</p>
          <a href="https://github.com/ayushghosh-123" target="_blank" rel="noopener noreferrer" className="block w-full">
            <img
              src="https://ghchart.rshah.org/ayushghosh-123"
              alt="GitHub contributions chart for ayushghosh-123"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
