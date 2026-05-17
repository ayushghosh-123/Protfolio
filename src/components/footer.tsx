"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleSecretClick = (e: React.MouseEvent) => {
    // If Alt key is held down during click, go to admin
    if (e.altKey) {
      e.preventDefault();
      router.push('/admin');
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div>
            <Link 
              href="/" 
              onClick={handleSecretClick}
              className="text-5xl font-black tracking-tighter text-white mb-6 block cursor-pointer select-none"
            >
              A<span className="text-[#FF5722]">G</span>
            </Link>
            <p className="text-gray-500 max-w-xs font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
              Modern digital experiences crafted with precision and bold aesthetics.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <Link href="/about" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">About</Link>
            <Link href="/skills" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">Skills</Link>
            <Link href="/projects" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">Projects</Link>
            <Link href="/blog" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">Blog</Link>
            <Link href="/contact" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
