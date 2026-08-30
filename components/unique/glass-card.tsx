"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 bg-background/40 p-6 shadow-2xl backdrop-blur-xl transition-all hover:bg-background/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
