"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function AuroraCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-slate-950 p-6 text-white shadow-2xl space-y-3",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-[100%] opacity-30 animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
