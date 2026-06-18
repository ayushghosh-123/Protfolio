"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden pt-32 pb-20 glow-mesh">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] opacity-30 animate-pulse" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Content Column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Currently engineering Agentic Workflows
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="mb-10 max-w-2xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-[-0.05em] leading-[1.0] text-white"
            >
              Hi, I'm <br />
              <span className="text-gradient">Ayush Ghosh</span> <span className="inline-block hover:animate-bounce">👋</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-zinc-500 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-medium"
          >
            Software Developer & AI Engineer trying to solve complex engineering problems
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 mb-12 lg:mb-0"
          >
            <Link 
              href="/projects"
              className="group relative flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            
            <Link 
              href="/contact"
              className="group flex items-center gap-3 px-10 py-5 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all"
            >
              Book a Call
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Play size={10} fill="currentColor" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image Column (Fills the Empty Space) */}
        <div className="flex justify-center items-center w-full">
          <motion.div
            style={{ y: y1 }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)] group flex-shrink-0"
          >
            <Image 
              src="/Images/hero_image.jpeg" 
              alt="Portfolio Preview"
              fill
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
              className="object-cover object-top transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-600 font-bold [writing-mode:vertical-rl]">
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
