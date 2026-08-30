"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export function MagneticButton({ className, children, onClick, disabled, type = "button", style }: MagneticButtonProps) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setPos({ x, y });
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick as any}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-sm text-primary-foreground shadow-lg hover:shadow-primary/25 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={style}
    >
      {children}
    </motion.button>
  );
}
