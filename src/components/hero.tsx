"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaSpotify } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/ayushghosh-123", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://x.com/AyushGhosh30804", icon: FaTwitter, label: "Twitter" },
  { href: "https://open.spotify.com/user/31j5r7lq7bo5nea62cvxvfx7udoa", icon: FaSpotify, label: "Spotify" },
];

export default function Hero() {
  return (
    <section className="flex items-center justify-center w-full bg-[var(--background)] pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-6 text-center">

        {/* Avatar — priority-loaded to avoid CLS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--card)]"
        >
          <Image
            src="/Images/hero_image.jpeg"
            alt="Ayush Ghosh"
            fill
            sizes="(max-width: 768px) 112px, 144px"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-xs uppercase tracking-widest text-[var(--muted)]"
        >
          Hallo, I&apos;M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[48px] md:text-[72px] font-bold font-sans leading-tight tracking-tight"
        >
          Ayush Ghosh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-xl md:text-2xl font-semibold font-sans leading-tight text-[var(--foreground)]"
        >
          Full Stack &amp; AI Agent Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-4 max-w-xl text-base text-[var(--muted)] leading-relaxed"
        >
          Engineer/Artist — I love building, breaking, and shipping things
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-6 mt-8"
        >
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--muted)] hover:text-[var(--foreground)] hover:scale-110 transition-all duration-200"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
