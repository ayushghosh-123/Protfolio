"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider
 * Implements butter-smooth inertia scrolling using Lenis.
 * Works perfectly on both desktop and mobile without position: fixed wrappers.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Update scroll progress and state on scroll if needed by other components
    // Lenis automatically hooks into the global scroll context

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}

