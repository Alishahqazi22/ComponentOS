"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function NumberCounter({ from = 0, to = 48290, duration = 2000, className }: { from?: number; to?: number; duration?: number; className?: string }) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let start = 0;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (to - from) / steps;

    const timer = setInterval(() => {
      start++;
      setCount((prev) => {
        const next = prev + increment;
        if (start >= steps) {
          clearInterval(timer);
          return to;
        }
        return Math.floor(next);
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <span className={cn("font-bold text-3xl font-mono tracking-tight text-foreground", className)}>
      {count.toLocaleString()}
    </span>
  );
}
