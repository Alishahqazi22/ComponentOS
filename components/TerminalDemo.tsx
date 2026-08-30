"use client";

import * as React from "react";
import { Terminal, Copy, Check, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

export function TerminalDemo() {
  const [pkgManager, setPkgManager] = React.useState<PkgManager>("npm");
  const [selectedPreset, setSelectedPreset] = React.useState<string>("button");
  const [copied, setCopied] = React.useState(false);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([
    "✔ Found button@1.2.0 in ComponentOS registry",
    "✔ Resolving recursive dependencies...",
    "✔ Added components/ui/button.tsx",
    "✔ Updated package.json dependencies (class-variance-authority, lucide-react)",
    "",
    "Component installed successfully into local codebase."
  ]);

  const presets: Record<string, { cmd: string; output: string[] }> = {
    button: {
      cmd: "add button",
      output: [
        "✔ Found button@1.2.0 in ComponentOS registry",
        "✔ Resolving dependencies (class-variance-authority, clsx, tailwind-merge)...",
        "✔ Added components/ui/button.tsx",
        "✔ Configured @/lib/utils.ts helper",
        "",
        "Component installed successfully into your project."
      ]
    },
    "data-table": {
      cmd: "add data-table",
      output: [
        "✔ Found data-table@1.3.0",
        "✔ Resolving registry dependencies (button, badge, input, card)...",
        "✔ Added components/ui/button.tsx",
        "✔ Added components/ui/badge.tsx",
        "✔ Added components/ui/data-table.tsx",
        "✔ Installed lucide-react npm package",
        "",
        "Data Table compound component installed successfully."
      ]
    },
    dashboard: {
      cmd: "add dashboard",
      output: [
        "✔ Found template dashboard@2.0.0",
        "✔ Resolving multi-component dependency graph (sidebar, card, table, chart, badge, button)...",
        "✔ Added components/templates/dashboard.tsx",
        "✔ Added components/ui/card.tsx",
        "✔ Added components/ui/badge.tsx",
        "✔ Added components/ui/button.tsx",
        "",
        "Admin Dashboard full page template installed successfully."
      ]
    }
  };

  const getCommandString = () => {
    const subCmd = presets[selectedPreset]?.cmd || "add button";
    switch (pkgManager) {
      case "pnpm": return `pnpm dlx componentos ${subCmd}`;
      case "yarn": return `yarn dlx componentos ${subCmd}`;
      case "bun": return `bunx componentos ${subCmd}`;
      default: return `npx componentos ${subCmd}`;
    }
  };

  const handleRunCommand = (key: string) => {
    setSelectedPreset(key);
    setIsExecuting(true);
    setLogs(["Connecting to ComponentOS registry..."]);

    setTimeout(() => {
      setLogs(presets[key].output);
      setIsExecuting(false);
    }, 600);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(getCommandString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-border bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-slate-400 text-[11px] ml-2 flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" /> bash — componentos CLI
          </span>
        </div>

        {/* Package Manager Selection Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 text-[11px]">
          {(["npm", "pnpm", "yarn", "bun"] as PkgManager[]).map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`px-2 py-0.5 rounded font-mono transition-colors ${
                pkgManager === pm
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* Command Selector Buttons */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800/60 text-xs">
        <span className="text-slate-400 text-[11px] font-mono">Try CLI presets:</span>
        <button
          onClick={() => handleRunCommand("button")}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
            selectedPreset === "button" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
          }`}
        >
          add button
        </button>
        <button
          onClick={() => handleRunCommand("data-table")}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
            selectedPreset === "data-table" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
          }`}
        >
          add data-table
        </button>
        <button
          onClick={() => handleRunCommand("dashboard")}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
            selectedPreset === "dashboard" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
          }`}
        >
          add dashboard
        </button>
      </div>

      {/* Command Line & Copy Widget */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800/40 font-mono text-sm">
        <div className="flex items-center gap-2 text-cyan-400 overflow-x-auto">
          <span className="text-emerald-400">$</span>
          <span className="text-slate-100">{getCommandString()}</span>
        </div>
        <button
          onClick={copyCommand}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition-colors shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Output Stream */}
      <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 min-h-[160px] bg-slate-950/80">
        {isExecuting ? (
          <div className="flex items-center gap-2 text-cyan-400 py-4">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Fetching metadata & resolving dependencies from registry.componentos.dev...</span>
          </div>
        ) : (
          logs.map((line, idx) => (
            <div key={idx} className={line.startsWith("✔") ? "text-emerald-400 font-semibold" : ""}>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
