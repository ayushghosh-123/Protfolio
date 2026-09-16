"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [timeString, setTimeString] = useState<string>("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeString(formatted);
      } catch {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        setTimeString(`${hh}:${mm}:${ss}`);
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerSecretUpload = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-secret-upload"));
    }
  };

  return (
    <footer
      role="status"
      aria-live="off"
      className="fixed bottom-0 left-0 right-0 z-50 h-9 px-4 sm:px-6 bg-[var(--status-bg)] backdrop-blur-md border-t border-[var(--hairline)] flex items-center justify-between text-[11px] font-mono tracking-wider select-none"
    >
      {/* Left: Pulsing Green Dot + READY (Interactive secret upload trigger) */}
      <button
        type="button"
        onClick={triggerSecretUpload}
        className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[#4BC16B] transition-colors duration-150 cursor-pointer group focus:outline-none"
        title="[SYS] Click to open classified upload console"
        aria-label="Secret upload console trigger"
      >
        <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4BC16B] opacity-75 group-hover:scale-125 transition-transform" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4BC16B]" />
        </span>
        <span className="font-semibold tracking-[0.15em] text-[11px]">
          READY
        </span>
        <span className="text-[var(--text-tertiary)] hidden sm:inline-block">—</span>
        <span className="text-[var(--text-tertiary)] hidden sm:inline-block tracking-normal group-hover:text-[var(--text-secondary)]">
          SYS.OPERATIONAL
        </span>
        <span className="text-[10px] text-[#4BC16B] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline ml-1">
          [⌖ UPLINK]
        </span>
      </button>

      {/* Right: Live IST Clock + Location (mobile drops location) + Secret trigger icon */}
      <div className="flex items-center gap-3 tabular-nums text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[var(--text-primary)]">{timeString}</span>
          <span className="text-[10px] text-[var(--text-tertiary)] tracking-widest font-mono">IST</span>
        </div>

        <span className="text-[var(--text-tertiary)] hidden sm:inline-block" aria-hidden="true">
          /
        </span>

        {/* Dropped on mobile per prompt specifications; crosshair icon also triggers secret upload */}
        <button
          type="button"
          onClick={triggerSecretUpload}
          className="hidden sm:flex items-center gap-1 text-[var(--text-tertiary)] hover:text-[#4BC16B] tracking-wider transition-colors duration-150 cursor-pointer focus:outline-none"
          title="[SYS] Uplink terminal"
        >
          <span className="text-[#4BC16B]" aria-hidden="true">⌖</span>
          <span>WEST BENGAL, INDIA</span>
        </button>
      </div>
    </footer>
  );
}
