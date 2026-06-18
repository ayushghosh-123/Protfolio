"use client";

import { motion } from "framer-motion";

export default function ThemeProvider({ 
  children,
  ...props 
}: { 
  children: React.ReactNode,
  [key: string]: any 
}) {
  // We can add global motion or theme logic here if needed
  // For now, it's a simple wrapper to ensure client-side rendering for motion components
  return (
    <div {...props}>
      {children}
    </div>
  );
}
