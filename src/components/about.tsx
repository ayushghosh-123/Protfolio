"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Users } from "lucide-react";

export default function About() {
  

  return (
    <section id="about" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FF5722] font-black tracking-[0.3em] uppercase text-sm mb-4 block">
              Hello
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-8 leading-tight">
              I’m <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Ayush Ghosh</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Full Stack Developer with strong expertise in MERN stack and modern web technologies. Experienced in building scalable, user-centric applications and integrating AI-driven solutions using LangChain and LangGraph. Passionate about performance optimization, clean architecture, and intelligent automation.
            </p>
            {/* GitHub Contributions Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FF5722] mb-6">
                Code Activity
              </h3>
              <div className="bg-white/5 p-6 rounded-lg border border-white/5 overflow-hidden flex justify-center">
                <img 
                  src="https://ghchart.rshah.org/FF5722/ayushghosh-123" 
                  alt="Ayush Ghosh's Github Contributions" 
                  className="w-full max-w-3xl opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Background Box */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#FF5722] -z-0" />
            
            <div className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] bg-gray-900 overflow-hidden">
              <img
                src="/Images/about_image.jpeg"
                alt="Developer working with coffee"
                className="w-full h-full object-cover"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Orange Accent Badge */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5722] hidden md:flex items-center justify-center p-6 text-center leading-tight">
              <span className="font-black text-xs uppercase tracking-tighter">
                Design Thinking
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
