"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
];

const connectLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub", href: "https://github.com/ayushghosh-123", external: true },
];

const socialIcons = [
  { href: "https://github.com/ayushghosh-123", Icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ayush-ghosh-9659772b0/", Icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://x.com/AyushGhosh30804", Icon: FaTwitter, label: "Twitter" },
];

export default function Footer() {
  const router = useRouter();

  const handleSecretClick = (e: React.MouseEvent) => {
    if (e.altKey) {
      e.preventDefault();
      router.push("/admin");
    }
  };

  return (
    <footer className="bg-background text-foreground pt-16 pb-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-5">
            {/* Brand link — underline slide animation via after: pseudo */}
            <Link
              href="/"
              onClick={handleSecretClick}
              className="inline-block text-3xl font-black tracking-tighter text-foreground mb-4 relative group"
            >
              A
              <span className="ml-1 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-200">
                GHOSH
              </span>
              {/* Animated underline */}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-300 ease-out"
                aria-hidden="true"
              />
            </Link>

            {/* Social icons */}
            <div className="flex gap-4 mt-4">
              {socialIcons.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--muted)] hover:text-foreground hover:scale-110 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors duration-200 relative group inline-block"
                    >
                      {label}
                      <span className="absolute -bottom-px left-0 h-px bg-[var(--foreground)] w-0 group-hover:w-full transition-all duration-200 ease-out" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Connect
              </h4>
              <ul className="space-y-3">
                {connectLinks.map(({ label, href, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        {label}
                        <ArrowUpRight
                          size={11}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors duration-200 relative group inline-block"
                      >
                        {label}
                        <span className="absolute -bottom-px left-0 h-px bg-[var(--foreground)] w-0 group-hover:w-full transition-all duration-200 ease-out" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Ayush Ghosh. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Built with Next.js &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
