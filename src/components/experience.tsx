"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "Sep, 2024 - Nov, 2024",
    company: "EmployeeLife",
    role: "Training Learner",
    description: "fixing security holes , and making endpoint work better.Used the best security practice to make sure that data integrity and authentication and authentication weren all in place .Develope system-level and command-line skill by Linux for scripting server configuration and security testing ",
    image: "/ExperienceImage/Intern1.jpeg"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-[#FF5722] font-black tracking-[0.3em] uppercase text-sm mb-4 block">
            Journey
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase">
            Work <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 px-0 md:px-12 flex justify-center">
                  <div className={`p-6 md:p-8 bg-white/5 border border-white/5 hover:border-[#FF5722]/30 transition-colors flex flex-col lg:flex-row gap-6 items-center w-full ${
                    index % 2 === 0 ? "text-left md:text-right lg:flex-row-reverse" : "text-left"
                  }`}>
                    <div className="flex-1">
                      <span className="text-[#FF5722] font-black text-sm uppercase tracking-widest mb-2 block">
                        {exp.year}
                      </span>
                      <h3 className="text-2xl font-black uppercase mb-1">{exp.company}</h3>
                      <p className="text-white/60 font-bold uppercase text-xs tracking-widest mb-4">
                        {exp.role}
                      </p>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                    {exp.image && (
                      <div className="w-full lg:w-40 xl:w-48 shrink-0">
                        <img
                          src={exp.image}
                          alt={`${exp.company} ${exp.role}`}
                          className="w-full h-auto aspect-[4/3] object-cover rounded-lg border border-white/5 hover:border-[#FF5722]/30 transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#FF5722] rounded-full -translate-x-1/2 top-0 md:top-1/2 -translate-y-1/2 z-10 hidden md:block shadow-[0_0_20px_rgba(255,87,34,0.5)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
