"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

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
    <div className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center">
      <nav className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-10 py-3 flex items-center gap-8 shadow-2xl">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          A<span className="text-[#FF5722]">G.</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${
                pathname === link.href ? "text-[#FF5722]" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/resume.pdf"
          className="hidden md:block bg-white text-black text-[9px] font-black uppercase tracking-widest px-5 py-2 rounded-full hover:bg-[#FF5722] hover:text-white transition-all"
        >
          CV
        </Link>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 left-6 right-6 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase text-white hover:text-[#FF5722]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                className="w-full text-center bg-[#FF5722] py-4 rounded-2xl font-black uppercase tracking-widest"
              >
                Download CV
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
