"use client";

import { useEffect, useRef } from "react";

/**
 * SmoothScrollProvider
 * Implements butter-smooth inertia scrolling using rAF interpolation.
 * No external deps — pure CSS + requestAnimationFrame.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices where smooth scroll makes sense
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const container = containerRef.current;
    if (!container) return;

    // Set the fake body height so native scrollbar still works
    const setHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };
    setHeight();

    const ro = new ResizeObserver(setHeight);
    ro.observe(container);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const ease = 0.092; // lower = smoother / more inertia

    const onScroll = () => {
      targetY.current = window.scrollY;
    };

    const render = () => {
      currentY.current = lerp(currentY.current, targetY.current, ease);

      // Sub-pixel: only apply transform when delta is meaningful
      const diff = Math.abs(targetY.current - currentY.current);
      if (diff > 0.05) {
        container.style.transform = `translateY(${-currentY.current}px)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      ro.disconnect();
      document.body.style.height = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
