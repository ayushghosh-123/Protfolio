"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaSpotify } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="flex items-center justify-center w-full bg-[var(--background)] bg-none pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="relative mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--card)]">
          <Image src="/Images/hero_image.jpeg" alt="Ayush" fill sizes="(max-width: 768px) 72px, 144px" className="object-cover" />
        </div>

        <p className="mt-6 text-xs uppercase tracking-widest text-[var(--muted)]">Hallo, I'M</p>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-4 text-4xl md:text-6xl font-black font-serif leading-tight">
          Ayush Ghosh
        </motion.h1>

        <p className="mx-auto mt-6 max-w-xl text-[var(--muted)]">
          Engineer/Artist - I love building , braking and shipping the thing
        </p>
        {/* add my social media icon based link here */}
        <div className="flex justify-center gap-5 mt-6">
          <a href="https://github.com/ghoshayush777" className="text-[var(--muted)] hover:text-foreground transition-colors" aria-label="GitHub"><FaGithub size={24} /></a>
          <a href="https://www.linkedin.com/in/ayush-ghosh-0a9b9b9b9" className="text-[var(--muted)] hover:text-foreground transition-colors" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
          <a href="https://twitter.com/ayushghosh777" className="text-[var(--muted)] hover:text-foreground transition-colors" aria-label="Twitter"><FaTwitter size={24} /></a>
          <a href="https://open.spotify.com" className="text-[var(--muted)] hover:text-foreground transition-colors" aria-label="Spotify"><FaSpotify size={24} /></a>
        </div>
      </div>
    </section>
  );
}
