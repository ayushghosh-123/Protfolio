"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();

  const handleSecretClick = (e: React.MouseEvent) => {
    if (e.altKey) {
      e.preventDefault();
      router.push('/admin');
    }
  };

  return (
    <footer className="bg-background text-foreground pt-20 pb-12 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          <div className="lg:col-span-5">
            <Link 
              href="/" 
              onClick={handleSecretClick}
              className="text-3xl font-black tracking-tighter text-foreground mb-4 block group"
            >
              A<span className="ml-1 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">GHOSH</span>
            </Link>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com/ayushghosh-123" className="text-[var(--muted)] hover:text-foreground transition-colors"><FaGithub size={18} /></a>
              <a href="https://www.linkedin.com/in/ayush-ghosh-9659772b0/" className="text-[var(--muted)] hover:text-foreground transition-colors"><FaLinkedin size={18} /></a>
              <a href="https://x.com/AyushGhosh30804" className="text-[var(--muted)] hover:text-foreground transition-colors"><FaTwitter size={18} /></a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Navigation</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/skills" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors">Skills</Link></li>
                <li><Link href="/projects" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors">Projects</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Connect</h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors">Contact</Link></li>
                <li><a href="mailto:ghosyayush910@gmail.com" className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-foreground transition-colors flex items-center gap-2">
                  Email <ArrowUpRight size={12} />
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
