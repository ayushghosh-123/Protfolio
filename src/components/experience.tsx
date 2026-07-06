"use client";

import { motion } from "framer-motion";



const experiences = [
  {
    company: "Employability.life ",
    role: "Testing Trainee",
    period: "Sep 2024 - Nov, 2024",
    image: "/ExperienceImage/EmpLife_Fed_Logo.png",
    badge: null,
  },
  {
    company: "Freelancer (Fiverr)",
    role: "Freelance Software Developer",
    period: "Feb 2021 - Present",
    image: "/ExperienceImage/fiver.png",
    badge: null,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-left">
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// EXPERIENCE</p>

          <h2 className="text-2xl md:text-3xl font-black font-serif mb-6">Professional Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-start gap-6"
              >
                {/* timeline marker */}
                <div className="flex flex-col items-center mt-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] block" />
                  {idx !== experiences.length - 1 && <span className="w-px bg-[var(--border)] h-full block mt-2" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--foreground)]">{exp.role} — <span className="font-normal">{exp.company}</span></h3>
                      <p className="text-[13px] text-[var(--muted)] mt-1">{exp.period}</p>
                    </div>

                    <a href="#" className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider hidden sm:inline">View More →</a>
                  </div>

                  <p className="mt-3 text-[14px] text-[var(--muted)]">Worked on building resilient systems and autonomous workflows, focusing on scalable architectures and clean integrations.</p>
                </div>
              </motion.div>
            ))}

            {/* GitHub contributions preview box (minimal) */}
            <div className="mt-4 border border-[var(--border)] rounded-md bg-[var(--card)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">// GITHUB CONTRIBUTIONS</p>
                  <a href="https://github.com/ayushghosh-123" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <img
                      src="https://ghchart.rshah.org/ayushghosh-123"
                      alt="GitHub contributions chart for ayushghosh-123"
                      className="w-full h-auto rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
