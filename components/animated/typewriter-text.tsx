"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function TypewriterText({ text = "Build faster with ComponentOS UI primitives.", speed = 50, className }: { text?: string; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = React.useState("");

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={cn("font-mono text-sm font-semibold tracking-tight text-primary", className)}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
