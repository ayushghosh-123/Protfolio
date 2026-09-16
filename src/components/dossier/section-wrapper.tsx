"use client";

import { motion } from "framer-motion";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SectionWrapper({
  children,
  delay = 0,
  className = "",
}: SectionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`border-t border-[var(--hairline)] pt-12 sm:pt-14 ${className}`}
    >
      {children}
    </motion.div>
  );
}
