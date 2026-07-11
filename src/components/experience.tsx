"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeUp from "@/components/fade-up";

const experiences = [
  {
    company: "Employability.life",
    role: "Testing Trainee",
    period: "Sep 2024 – Nov 2024",
    image: "/ExperienceImage/EmpLife_Fed_Logo.png",
    description:
      "Completed a 6-week XPro Program on Cybersecurity: API Testing in collaboration with Employability.life and Federation University Australia. Completed deliverables including API testing, documentation, incident response simulations, and final presentations. Proficient with Postman, cURL, and Splunk for API development and automation.",
  },
  {
    company: "Freelancer (Fiverr)",
    role: "Freelance Software Developer",
    period: "Jan 2026 – Present",
    image: "/ExperienceImage/fiver.png",
    link: "https://www.fiverr.com",
    description:
      "Building AI-based automation solutions that help clients grow their businesses using a modern, AI-integrated tech stack. I work transparently, collaborating closely with clients to build a trusted brand.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-6">

        <FadeUp>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mb-4">
            // EXPERIENCE
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight mb-4">
            Work &amp; Experience
          </h2>
          <p className="text-base leading-[1.6] text-[var(--muted)] mb-10">
            I love to work openly — it gives me more opportunity to grow my technical and
            management skills. An open environment helps me explore more and learn faster.
          </p>
        </FadeUp>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 group"
              >
                {/* Timeline Icon */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] overflow-hidden z-10 relative flex items-center justify-center transition-all duration-200 group-hover:border-[var(--accent)]/50 group-hover:scale-105">
                    <Image
                      src={exp.image}
                      alt={exp.company}
                      fill
                      className="object-contain p-1.5 rounded-full"
                      sizes="36px"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--accent)] transition-colors underline decoration-dotted underline-offset-2"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>
                    <div className="text-[11px] text-[var(--muted)] font-mono sm:text-right shrink-0">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-[1.6] mb-3">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub contributions — explicit width/height to prevent CLS */}
        <FadeUp delay={0.2} className="mt-12">
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-6 hover:border-[var(--foreground)]/20 transition-colors duration-300">
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">
              // GITHUB CONTRIBUTIONS
            </p>
            <a
              href="https://github.com/ayushghosh-123"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/ayushghosh-123"
                alt="GitHub contributions chart for ayushghosh-123"
                width={800}
                height={128}
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </a>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
