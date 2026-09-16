"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-6 w-28 text-[11px] font-mono text-[var(--text-tertiary)] flex items-center justify-end">
        [ MODE: DARK ]
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono tracking-wider border border-[var(--hairline)] hover:border-[var(--hairline-bright)] rounded text-[var(--text-secondary)] hover:text-[#4BC16B] transition-colors duration-150 cursor-pointer select-none bg-[var(--surface)]"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
          isDark ? "bg-[#4BC16B]" : "bg-[#2E8B46]"
        }`}
        aria-hidden="true"
      />
      <span>[ MODE: {isDark ? "DARK" : "LIGHT"} ]</span>
    </button>
  );
}
