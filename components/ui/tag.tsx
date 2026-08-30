"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "default" | "blue" | "green" | "purple" | "amber" | "rose";
}

export function Tag({ color = "default", className, children, ...props }: TagProps) {
  const colorMap = {
    default: "bg-muted text-muted-foreground border-border",
    blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold font-mono tracking-tight transition-colors",
        colorMap[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
