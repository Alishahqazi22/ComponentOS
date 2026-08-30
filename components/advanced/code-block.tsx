"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  showCopy = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-xl border border-border bg-slate-950 p-4 font-mono text-xs text-slate-100 shadow-lg overflow-x-auto", className)}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
        <span className="uppercase">{language}</span>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
      <pre className="leading-relaxed">{code}</pre>
    </div>
  );
}
