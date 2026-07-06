"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Star, House, User, Toolbox, Briefcase, BookOpen, Mail } from "lucide-react";
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

// Compact clock for mobile (HH:MM)
const CompactClock = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${hh}:${mm}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] select-none">{timeString}</span>;
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
    { name: "Home", href: "/", Icon: House },
    { name: "About", href: "/about", Icon: User },
    { name: "Skills", href: "/skills", Icon: Toolbox },
    { name: "Projects", href: "/projects", Icon: Briefcase },
    { name: "Blog", href: "/blog", Icon: BookOpen },
    { name: "Contact", href: "/contact", Icon: Mail },
  ];

  const { theme, toggleTheme, setTheme } = useTheme();

  if (!mounted) return null;

  return (
    <header className="fixed top-6 left-0 w-full z-50 transition-colors duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 py-0 flex justify-center">
        {/* Capsule container holding logo, links, and controls */}
        <div className="w-full max-w-4xl inline-flex items-center justify-between gap-2 md:gap-4 bg-[var(--card)] border border-[var(--border)] rounded-full px-2 py-1.5 md:px-3 md:py-2 shadow-sm pointer-events-auto">
          {/* Left: small logo on capsule */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <Link href="/" className="hidden md:inline-block font-serif text-sm font-semibold tracking-tight text-foreground">Ayush Ghosh</Link>
            <Link href="/" className="md:hidden font-serif text-base font-semibold tracking-tight text-foreground">AG</Link>
          </div>

          {/* Center: nav links inside capsule */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="flex items-center justify-center gap-2 w-8 h-8 md:w-9 md:h-9 rounded-full transition-colors duration-150 text-[var(--muted)] hover:text-foreground hover:bg-[var(--card)]/10 focus:outline-none focus:ring-0"
                >
                  {/* @ts-ignore */}
                  <link.Icon className="w-4 h-4" />
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
                  const next = theme === "light" ? "dark" : "light";
                  if (setTheme) {
                    setTheme(next as any);
                  } else if (toggleTheme) {
                    toggleTheme();
                  } else {
                    document.documentElement.setAttribute("data-theme", next);
                    localStorage.setItem("site-theme", next);
                  }
                }}
                className="p-1 rounded-md bg-transparent text-[var(--muted)] hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

            {/* Inline mobile controls (theme only) */}
            <div className="flex items-center md:hidden gap-2 pr-1.5 border-r border-[var(--border)] mr-0.5">
              <span className="hidden sm:inline-block">
                <CompactClock />
              </span>
              <button
                onClick={() => {
                  const next = theme === "light" ? "dark" : "light";
                  if (setTheme) {
                    setTheme(next as any);
                  } else if (toggleTheme) {
                    toggleTheme();
                  } else {
                    document.documentElement.setAttribute("data-theme", next);
                    localStorage.setItem("site-theme", next);
                  }
                }}
                className="p-1 rounded-md bg-transparent text-[var(--muted)] hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
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
              <div className="w-full flex items-center justify-end gap-3 pb-3 mb-2 border-b border-[var(--border)]">
                <button
                  onClick={() => {
                      const next = theme === "light" ? "dark" : "light";
                      if (setTheme) {
                        setTheme(next as any);
                      } else if (toggleTheme) {
                        toggleTheme();
                      } else {
                        document.documentElement.setAttribute("data-theme", next);
                        localStorage.setItem("site-theme", next);
                      }
                    }}
                    className="p-2 rounded-md bg-transparent text-[var(--muted)] hover:text-foreground transition-colors"
                    aria-label="Toggle theme"
                  >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>
              {/* only show the time */}
              <LiveClock />
              <div className="w-full flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-150 ${pathname === link.href ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-[var(--muted)] hover:text-foreground hover:bg-[var(--card)]/10"}`}
                  >
                    {/* @ts-ignore */}
                    <link.Icon className="w-4 h-4" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
