"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sun, Moon, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

// LiveClock component for the navbar
const LiveClock = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTimeString(`${hh}:${mm}:${ss}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] select-none">
      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]/80" />
      <span className="text-[var(--muted)]">{timeString} IST</span>
    </div>
  );
};

// Note: LiveClock removed to keep header minimal per design.

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

  const { theme, toggleTheme } = useTheme();

  if (!mounted) return null;

  return (
    <header className="fixed top-6 left-0 w-full z-50 transition-colors duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-0 flex justify-center">
        {/* Capsule container holding logo, links, and controls */}
        <div className="w-full max-w-4xl inline-flex items-center justify-between gap-4 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-2 shadow-sm pointer-events-auto">
          {/* Left: small logo on capsule */}
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden md:inline-block font-serif text-sm font-semibold tracking-tight text-foreground">Ayush Ghosh</Link>
            <Link href="/" className="md:hidden font-serif text-lg font-semibold tracking-tight text-foreground">AG</Link>
          </div>

          {/* Center: nav links inside capsule */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-[12px] uppercase tracking-wider font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                    pathname === link.href ? "bg-[var(--foreground)] text-[var(--card)] shadow-sm" : "text-[var(--muted)] hover:text-foreground hover:bg-[var(--card)]/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Live clock, theme toggle, Connect button, and mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 border-r border-[var(--border)] pr-4">
              <LiveClock />
              <button
                onClick={() => {
                  if (toggleTheme) {
                    toggleTheme();
                    return;
                  }

                  const el = document.documentElement;
                  const cur = el.getAttribute("data-theme") || "light";
                  const next = cur === "light" ? "dark" : cur === "dark" ? "night" : "light";
                  el.setAttribute("data-theme", next);
                  localStorage.setItem("site-theme", next);
                }}
                className="p-1 rounded-md bg-transparent text-[var(--muted)] hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Sun size={18} /> : theme === "dark" ? <Moon size={18} /> : <Star size={18} />}
              </button>
            </div>

            {/* Mobile Toggle inside capsule */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground p-1 cursor-pointer"
              aria-label="Open menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu: centered dropdown under capsule */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[min(96%,40rem)] md:hidden bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm pointer-events-auto"
          >
            <div className="flex flex-col gap-4 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-lg font-semibold uppercase tracking-tight text-foreground hover:text-[var(--accent)] transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
