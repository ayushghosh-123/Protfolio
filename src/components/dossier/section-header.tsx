import React from "react";

interface SectionHeaderProps {
  number: string;
  label: string;
  className?: string;
}

export default function SectionHeader({ number, label, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 select-none ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)] shrink-0">
        [ {number} ] {label}
      </span>
      <div className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
    </div>
  );
}
