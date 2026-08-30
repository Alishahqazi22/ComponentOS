"use client";

import * as React from "react";
import { Copy, Check, FileCode, Search, Eye } from "lucide-react";
import { ComponentFile } from "@/lib/types";

interface CodeViewerProps {
  files: ComponentFile[];
}

export function CodeViewer({ files }: CodeViewerProps) {
  const [activeFileIndex, setActiveFileIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  if (!files || files.length === 0) return null;
  const currentFile = files[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentFile.content.split("\n");

  return (
    <div className="w-full rounded-xl border border-border bg-slate-950 text-slate-100 shadow-xl overflow-hidden font-mono text-xs">
      {/* File Tabs & Actions Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 gap-2">
        {/* File Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setActiveFileIndex(idx)}
              className={`px-3 py-1.5 rounded-t-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                activeFileIndex === idx
                  ? "bg-slate-950 text-cyan-400 border-t-2 border-cyan-400 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>{file.path.split("/").pop()}</span>
            </button>
          ))}
        </div>

        {/* Copy & Search Actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-slate-200 placeholder:text-slate-500 outline-none w-28 focus:w-40 transition-all"
            />
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area with Line Numbers */}
      <div className="max-h-[460px] overflow-y-auto p-4 leading-relaxed font-mono text-xs">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const matchesSearch = searchQuery && line.toLowerCase().includes(searchQuery.toLowerCase());

              return (
                <tr
                  key={index}
                  className={`hover:bg-slate-900/60 transition-colors ${
                    matchesSearch ? "bg-amber-500/20 text-amber-200 font-semibold" : ""
                  }`}
                >
                  <td className="w-10 select-none text-right pr-4 text-slate-600 text-[11px]">
                    {lineNumber}
                  </td>
                  <td className="whitespace-pre text-slate-200">
                    {line}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
