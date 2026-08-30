"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GitDiffViewer() {
  const diffLines = [
    { type: "header", text: "@@ -14,6 +14,8 @@ export interface ButtonProps" },
    { type: "context", text: "  variant?: 'default' | 'outline';" },
    { type: "deleted", text: "- isLoading?: boolean;" },
    { type: "added", text: "+ isLoading?: boolean;" },
    { type: "added", text: "+ animated?: boolean;" },
    { type: "context", text: "}" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-border bg-slate-950 p-4 font-mono text-xs shadow-lg space-y-1">
      <div className="text-[10px] text-slate-400 font-bold pb-2 mb-2 border-b border-slate-800 flex justify-between">
        <span>components/ui/button.tsx</span>
        <span className="text-emerald-400">+2</span> <span className="text-rose-400">-1</span>
      </div>
      {diffLines.map((line, i) => (
        <div
          key={i}
          className={cn(
            "px-2 py-0.5 rounded leading-relaxed",
            line.type === "header" && "text-purple-400 bg-purple-950/30",
            line.type === "added" && "text-emerald-400 bg-emerald-950/40",
            line.type === "deleted" && "text-rose-400 bg-rose-950/40",
            line.type === "context" && "text-slate-300"
          )}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}
