"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function InfiniteMarquee({
  items = ["Button", "DataTable", "AIChat", "KanbanBoard", "SpotlightCard", "BentoGrid", "InteractiveDock"],
  speed = 25,
  className,
}: {
  items?: string[];
  speed?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden w-full py-3 bg-muted/40 border-y border-border/40 select-none", className)}>
      <div className="flex w-max gap-8 animate-marquee">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground">
            <span className="text-primary">✦</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}
