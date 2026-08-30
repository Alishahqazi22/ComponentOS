"use client";

import * as React from "react";
import { Check, Clock, GitCommit } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  status?: "completed" | "current" | "upcoming";
}

export interface TimelineProps {
  events?: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  const items: TimelineEvent[] = events || [
    { id: "1", title: "CLI Release v1.2.0", timestamp: "2 hours ago", description: "Added support for procedural catalog generation.", status: "completed" },
    { id: "2", title: "Radix UI Primitives Update", timestamp: "1 day ago", description: "Upgraded dialog, select, and switch components.", status: "completed" },
    { id: "3", title: "Tailwind v3.4 Tokens", timestamp: "3 days ago", description: "Configured CSS variables and dark mode support.", status: "completed" },
  ];

  return (
    <div className={cn("relative border-l-2 border-border ml-4 space-y-6 py-2", className)}>
      {items.map((item) => (
        <div key={item.id} className="relative pl-6">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground">
            <GitCommit className="h-3 w-3" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span>{item.title}</span>
              <span className="text-muted-foreground font-mono font-normal">({item.timestamp})</span>
            </div>
            {item.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
