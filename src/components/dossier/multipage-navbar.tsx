"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

const NAV_LINKS = [
  { name: "Home", href: "/", code: "01" },
  { name: "About", href: "/about", code: "02" },
  { name: "Skills", href: "/skills", code: "03" },
  { name: "Projects", href: "/projects", code: "04" },
  { name: "Blog", href: "/blog", code: "05" },
  { name: "Contact", href: "/contact", code: "06" },
];

export default function MultipageNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change & register secret shortcut
  useEffect(() => {
    setMobileMenuOpen(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Alt + U keyboard shortcut
      if (e.altKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-secret-upload"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname]);

  const handleSecretHeaderClick = (e: React.MouseEvent) => {
    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent("open-secret-upload"));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-[var(--status-bg)] backdrop-blur-md border-b border-[var(--hairline)] flex items-center justify-between px-4 sm:px-6 select-none font-mono">
      {/* Brand ID & Secret Alt + Click Trigger on Header Icon */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          onClick={handleSecretHeaderClick}
          className="flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[var(--text-primary)] hover:text-[#4BC16B] transition-colors duration-150"
          title="Ayush Ghosh (Alt + Mouse Click on header icon opens Secret Upload Console)"
        >
          <span
            onClick={handleSecretHeaderClick}
            className="w-2.5 h-2.5 rounded-full bg-[#4BC16B] shrink-0 inline-block transition-transform duration-150 hover:scale-125 shadow-[0_0_8px_rgba(75,193,107,0.4)]"
            aria-hidden="true"
          />
          <span>AYUSH GHOSH</span>
        </Link>
        <span className="text-[var(--text-tertiary)] hidden md:inline text-[10px] tracking-widest opacity-60">
          // DOSSIER
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 text-[11px] tracking-wider">
        {NAV_LINKS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2.5 py-1 rounded transition-colors duration-150 relative ${
                isActive
                  ? "text-[#4BC16B] font-semibold bg-[#4BC16B]/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              <span>
                [{item.code}] {item.name.toUpperCase()}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#4BC16B]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right: Theme Toggle & Mobile Menu Toggle */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden px-2 py-1 border border-[var(--hairline)] rounded text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-[var(--status-bg)] backdrop-blur-xl border-b border-[var(--hairline)] p-4 flex flex-col gap-2 font-mono text-[12px] shadow-2xl">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-3 rounded flex items-center justify-between ${
                  isActive
                    ? "text-[#4BC16B] bg-[#4BC16B]/10 font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
                }`}
              >
                <span>
                  [{item.code}] {item.name.toUpperCase()}
                </span>
                {isActive && <span className="text-[#4BC16B]">●</span>}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
