"use client";

import { FaBrain } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiLangchain, 
  SiDocker, 
  SiMongodb, 
  SiPostgresql,
  SiVercel,
  SiNodedotjs,
  SiReact
} from "react-icons/si";

const logos = [
  { icon: <SiNextdotjs size={32} />, name: "Next.js" },
  { icon: <FaBrain size={32} />, name: "OpenAI" },
  { icon: <SiLangchain size={32} />, name: "LangChain" },
  { icon: <SiTypescript size={32} />, name: "TypeScript" },
  { icon: <SiDocker size={32} />, name: "Docker" },
  { icon: <SiMongodb size={32} />, name: "MongoDB" },
  { icon: <SiPostgresql size={32} />, name: "Postgres" },
  { icon: <SiVercel size={32} />, name: "Vercel" },
  { icon: <SiNodedotjs size={32} />, name: "Node.js" },
  { icon: <SiReact size={32} />, name: "React" },
];

export default function TrustedLogos() {
  return (
    <section className="py-20 bg-[#000000] overflow-hidden border-y border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Trusted Technologies</span>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {[...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-600 hover:text-white transition-colors duration-500 cursor-default">
              {logo.icon}
              <span className="text-sm font-bold uppercase tracking-widest">{logo.name}</span>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
      </div>
    </section>
  );
}
