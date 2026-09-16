import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default function DossierHeader() {
  return (
    <header className="pt-8 pb-4 mb-8 flex items-center justify-between text-[11px] font-mono tracking-wider text-[var(--text-tertiary)] border-b border-[var(--hairline)]">
      <div className="flex items-center gap-2">
        <span className="text-[#4BC16B] font-semibold tracking-[0.2em]">DOSSIER</span>
        <span className="text-[var(--hairline-bright)]">/</span>
        <span className="hidden sm:inline-block">CONFIDENTIAL</span>
        <span className="hidden sm:inline-block text-[var(--hairline-bright)]">/</span>
        <Link
          href="/admin"
          className="text-[var(--text-secondary)] hover:text-[#4BC16B] transition-colors duration-150"
          title="Admin Control Center"
        >
          REF: AG-2026-REL
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
