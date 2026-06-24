"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
    <section id="experience" className="py-10 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Work Experience
        </motion.h2>

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              {/* Company Logo */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 relative flex-shrink-0 bg-[#1a1a1a]">
                <Image
                  src={exp.image}
                  alt={exp.company}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>

              {/* Company Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {exp.company}
                  </h3>
                  {exp.badge && (
                    <span className="px-2.5 py-0.5 text-[11px] font-medium rounded bg-white/10 text-zinc-300 border border-white/5">
                      {exp.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{exp.role}</p>
              </div>

              {/* Date */}
              <div className="text-sm text-zinc-500 flex-shrink-0 hidden sm:block">
                {exp.period}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
