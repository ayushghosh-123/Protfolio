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
    <footer className="bg-[#0A0A0A] text-white pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          
          <div className="lg:col-span-5">
            <Link 
              href="/" 
              onClick={handleSecretClick}
              className="text-4xl font-black tracking-tighter text-white mb-8 block group"
            >
              A<span className="text-primary group-hover:text-accent transition-colors">GHOSH</span>
            </Link>
            <div className="flex gap-6">
              <a href="https://github.com/ayushghosh-123" className="text-zinc-600 hover:text-white transition-colors"><FaGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/ayush-ghosh-9659772b0/" className="text-zinc-600 hover:text-white transition-colors"><FaLinkedin size={20} /></a>
              <a href="https://x.com/AyushGhosh30804" className="text-zinc-600 hover:text-white transition-colors"><FaTwitter size={20} /></a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Navigation</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/skills" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Skills</Link></li>
                <li><Link href="/projects" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Projects</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Connect</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                <li><a href="mailto:ghosyayush910@gmail.com" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
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
