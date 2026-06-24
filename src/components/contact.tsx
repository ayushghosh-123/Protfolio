"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Contact() {
  const socialLinks = [
    { name: "Email", icon: <Mail size={20} />, href: "mailto:ghosyayush910@gmail.com" },
    { name: "LinkedIn", icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/" },
    { name: "GitHub", icon: <FaGithub size={20} />, href: "https://github.com/ayushghosh-123" },
    { name: "Twitter", icon: <FaTwitter size={20} />, href: "https://x.com/AyushGhosh30804" },
    { name: "WhatsApp", icon: <FaWhatsapp size={20} />, href: "https://wa.me/919064941837" },
  ];

  return (
    <section id="contact" className="py-32 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        

        {/* Center Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-10">
            Let's Work Together
          </h2>

          {/* Side-by-side Squares */}
          <div className="flex items-center gap-6 mb-10 select-none">
            {/* Left box: Hero Photo */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-1 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/Images/hero_image.jpeg"
                  alt="Ayush Ghosh"
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-cover object-top scale-105"
                />
              </div>
            </div>

            {/* Double Arrow */}
            <span className="text-zinc-500 font-mono text-2xl md:text-3xl">⇆</span>

            {/* Right box: Circle Outline */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border border-zinc-800/80 bg-zinc-950 flex items-center justify-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-800/80" />
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
            Suggestion/Idea/Thought?
          </h3>
          
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal mb-8 max-w-md">
            Let's create the website you've always wanted. Send me a message to begin.
          </p>

          {/* Green Flame Icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-emerald-400 stroke-current fill-none stroke-[1.5]" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 2C12 2 17 8 17 11.5C17 14.5 14.5 17 12 17C9.5 17 7 14.5 7 11.5C7 8 12 2 12 2Z" />
            <path d="M12 7C12 7 14 10 14 11.5C14 12.88 12.88 14 12 14C11.12 14 10 12.88 10 11.5C10 10 12 7 12 7Z" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Social Links List */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto border-b border-zinc-800/80"
        >
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-6 px-4 border-t border-zinc-800/80 hover:bg-white/[0.01] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors">
                <span className="text-lg md:text-xl shrink-0">{social.icon}</span>
                <span className="text-base md:text-lg font-bold tracking-tight">{social.name}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
