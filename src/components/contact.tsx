"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const socialLinks = [
    { name: "Email", icon: <Mail size={20} />, href: "mailto:ghosyayush910@gmail.com" },
    { name: "LinkedIn", icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/" },
    { name: "GitHub", icon: <FaGithub size={20} />, href: "https://github.com/ayushghosh-123" },
    { name: "Twitter", icon: <FaTwitter size={20} />, href: "https://x.com/AyushGhosh30804" },
  ];

  return (
    <section id="contact" className="py-28 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        

        {/* Center Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">// contact</p>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 font-serif">
            Let's Work Together
          </h2>
          <h4 className="text-lg md:text-xl font-black tracking-tight leading-tight mb-6 font-serif"> 
             Suggestion/Idea/Thought?
          </h4>

          <div className="flex gap-4 mt-6">
            <a href="/contact" className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold hover:opacity-95">Work with me</a>
            <a href="https://drive.google.com/file/d/1H3wOjfFWLRCoVCw9RskE3c2228J_F5YX/view" className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--card)]">Download Resume</a>
          </div>
        </motion.div>

        {/* Social Links List */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto border-b border-[var(--border)]"
        >
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 px-4 border-t border-[var(--border)] hover:bg-[var(--card)]/50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                <span className="text-lg md:text-xl shrink-0">{social.icon}</span>
                <span className="text-base md:text-lg font-semibold">{social.name}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
