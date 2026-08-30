"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GitHubContributionGraph() {
  const weeks = 16;
  const daysPerWeek = 7;
  const levels = ["bg-muted", "bg-emerald-950/60", "bg-emerald-700/80", "bg-emerald-500", "bg-emerald-400"];

  const grid = Array.from({ length: weeks * daysPerWeek }, (_, i) => ({
    id: i,
    level: (i * 3 + 7) % 5,
  }));

  return (
    <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-3 w-fit">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>Component Repository Commits</span>
        <span className="text-muted-foreground font-mono text-[10px]">1,420 commits this year</span>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {grid.map((cell) => (
          <div
            key={cell.id}
            className={cn("h-3 w-3 rounded-xs transition-colors hover:scale-125", levels[cell.level])}
          />
        ))}
      </div>
    </div>
  );
}
