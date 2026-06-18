"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Send, Phone, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const socials = [
    { name: "GitHub", icon: <FaGithub size={18} />, href: "https://github.com/ayushghosh-123" },
    { name: "LinkedIn", icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/" },
    { name: "Twitter", icon: <FaTwitter size={18} />, href: "https://x.com/AyushGhosh30804" },
    { name: "Email", icon: <Mail size={18} />, href: "mailto:ghosyayush910@gmail.com" }
  ];

  return (
    <section id="contact" className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden glow-mesh">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-8">
              <MessageSquare size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Collaboration</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
              Building <br />
              Something <br />
              <span className="text-gradient">Epic?</span>
            </h2>

            <p className="text-zinc-500 text-lg md:text-xl mb-16 max-w-md leading-relaxed font-medium">
              Stop building MVPs that break. I’m currently available for high-impact freelance work and strategic full-time roles.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col gap-6">
                <a href="mailto:ghosyayush910@gmail.com" className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-primary transition-colors">
                  ghosyayush910@gmail.com
                </a>
                <a href="https://wa.me/919064941837" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors group">
                   <Phone size={18} className="text-primary" />
                   <span className="text-sm font-bold uppercase tracking-widest">+91 9064941837</span>
                </a>
              </div>

              <div className="flex gap-4 flex-wrap">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-primary/50 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Modern Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="p-10 md:p-14 rounded-[3rem] glass border-white/10 relative overflow-hidden">
              {/* Subtle background gradient for form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              
              <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4 group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-600 group-focus-within:text-primary transition-colors">Your Identity</label>
                    <input
                      type="text"
                      placeholder="Name or Brand"
                      className="w-full bg-transparent border-b border-white/5 py-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-zinc-800 text-lg font-medium tracking-tight"
                    />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-600 group-focus-within:text-primary transition-colors">Secure Channel</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-white/5 py-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-zinc-800 text-lg font-medium tracking-tight"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 group">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-600 group-focus-within:text-primary transition-colors">Brief Overview</label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your mission..."
                    className="w-full bg-transparent border-b border-white/5 py-4 focus:outline-none focus:border-primary/50 transition-colors placeholder:text-zinc-800 text-lg font-medium tracking-tight resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <button className="flex-1 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#8B5CF6] hover:text-white transition-all duration-500 flex items-center justify-center gap-4 rounded-3xl group">
                    Deploy Message
                    <Send size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <a
                    href="https://wa.me/919064941837"
                    target="_blank"
                    className="px-8 py-6 rounded-3xl glass border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-zinc-400 hover:text-[#25D366] group"
                  >
                    <FaWhatsapp size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
