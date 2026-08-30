"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function HoverCard({ trigger, content, className }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {trigger}
      {open && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-64 rounded-xl border border-border bg-popover p-4 shadow-xl animate-in fade-in-50 zoom-in-95",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
