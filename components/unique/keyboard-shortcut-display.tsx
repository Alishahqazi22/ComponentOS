"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KeyboardShortcutDisplayProps {
  keys: string[];
  description?: string;
}

export function KeyboardShortcutDisplay({ keys = ["⌘", "K"], description }: KeyboardShortcutDisplayProps) {
  return (
    <div className="inline-flex items-center gap-2">
      {description && <span className="text-xs text-muted-foreground font-medium">{description}</span>}
      <div className="flex items-center gap-1">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="inline-flex h-6 select-none items-center justify-center rounded border border-border bg-muted px-2 font-mono text-xs font-bold text-foreground shadow-xs"
          >
            {k}
          </kbd>
        ))}
      </div>
    </div>
  );
}
