"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto transition-all duration-500 flex items-center gap-8 px-6 py-2.5 rounded-full border ${
          scrolled 
            ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-white group flex items-center gap-1">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-sm font-black italic">A</span>
          <span className="hidden sm:block group-hover:translate-x-0.5 transition-transform duration-300">GHOSH</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 relative group ${
                pathname === link.href ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full hover:bg-[#8B5CF6] hover:text-white transition-all duration-500 group"
        >
          Book a Call
          <ArrowUpRight size={12} className="group-hover:rotate-45 transition-transform" />
        </Link>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-24 left-6 right-6 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:hidden pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold uppercase tracking-tight text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-white/5 my-2" />
              <Link
                href="/contact"
                className="w-full text-center bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-sm"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
