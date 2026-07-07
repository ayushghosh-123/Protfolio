"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgressBar
 * A slim bar at the top of the viewport that fills as the user scrolls.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: `${progress}%`,
        background: "var(--accent)",
        zIndex: 9999,
        transition: "width 0.05s linear",
        transformOrigin: "left",
        pointerEvents: "none",
      }}
    />
  );
}
