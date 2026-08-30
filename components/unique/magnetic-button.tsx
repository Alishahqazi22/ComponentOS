"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export function MagneticButton({ className, children, ...props }: ButtonProps) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setPos({ x, y });
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-sm text-primary-foreground shadow-lg hover:shadow-primary/25 transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
