"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function JSONViewer({ data }: { data?: any }) {
  const sampleData = data || {
    name: "button",
    version: "1.2.0",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    author: "ComponentOS Team",
    isOfficial: true,
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-md overflow-x-auto">
      <pre>{JSON.stringify(sampleData, null, 2)}</pre>
    </div>
  );
}
