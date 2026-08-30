"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export interface SpotlightcardProps {
  variant?: "default" | "outline" | "secondary" | "glass";
  size?: "sm" | "default" | "lg";
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export function Spotlightcard({
  className,
  variant = "default",
  size = "default",
  animated = true,
  children,
  onClick,
  style,
}: SpotlightcardProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-xl p-4 transition-all duration-300 font-medium text-sm border cursor-pointer",
    variant === "default" && "bg-primary text-primary-foreground border-transparent shadow-md hover:bg-primary/90",
    variant === "outline" && "border-border bg-card text-foreground hover:bg-accent",
    variant === "secondary" && "bg-secondary text-secondary-foreground border-transparent",
    variant === "glass" && "bg-background/40 backdrop-blur-md border-white/20 shadow-lg text-foreground",
    size === "sm" && "px-3 py-1.5 text-xs",
    size === "lg" && "px-6 py-4 text-base",
    className
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={baseClasses}
        onClick={onClick as any}
        style={style}
      >
        <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
        {children || "Spotlight card (Animated Motion)"}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick} style={style}>
      {children || "Spotlight card"}
    </div>
  );
}
