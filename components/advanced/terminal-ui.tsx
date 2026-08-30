"use client";

import * as React from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function TerminalUI() {
  return (
    <div className="w-full max-w-xl rounded-xl border border-border bg-slate-950 p-4 text-xs font-mono text-slate-200 shadow-2xl space-y-2">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-500" />
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[11px] text-slate-400 font-semibold ml-2 flex items-center gap-1">
          <TerminalIcon className="h-3 w-3" /> zsh — componentos-cli
        </span>
      </div>
      <div className="text-emerald-400">$ npx componentos add button data-table</div>
      <div className="text-slate-400">ℹ Resolving dependencies for button@1.2.0...</div>
      <div className="text-emerald-400">✔ Created components/ui/button.tsx</div>
      <div className="text-emerald-400">✔ Created components/ui/data-table.tsx</div>
      <div className="text-slate-300 font-bold mt-2">✔ Installation complete!</div>
    </div>
  );
}
