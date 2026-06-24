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

          {/* Main Headline */}
          <div className="mb-10 max-w-2xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-[-0.05em] leading-[1.0] text-white"
            >
              Hi, I'm <br />
              <span className="text-white">Ayush Ghosh</span> <span className="inline-block hover:animate-bounce">👋</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-zinc-300 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-medium"
          >
            Software Developer & Agentic Developer

            <p className="text-gray-400 text-sm md:text-base mb-12 leading-relaxed font-medium">
              Kolkata , West Bengal , India
            </p>
          </motion.div>
          
          </div>

        {/* Right Side: Image Column (Fills the Empty Space) */}
        <div className="flex justify-center items-center w-full">
          <motion.div
            style={{ y: 0}}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)] group flex-shrink-0"
          >
            <Image 
              src="/Images/hero_image.jpeg" 
              alt="Portfolio Preview"
              fill
              priority
              sizes="(max-width: 886px) 256px, (max-width: 1124px) 320px, 400px"
              className="object-cover object-top transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
