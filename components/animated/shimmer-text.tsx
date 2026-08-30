"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ShimmerText({ text = "ComponentOS Shimmer Text", className }: { text?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer font-bold text-2xl tracking-tight",
        className
      )}
    >
      {text}
    </span>
  );
}
