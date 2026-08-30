"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GlowCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative group rounded-2xl p-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-xl", className)} {...props}>
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 opacity-30 blur-lg group-hover:opacity-75 transition duration-500" />
      <div className="relative rounded-2xl bg-card p-6 text-card-foreground space-y-2">
        {children}
      </div>
    </div>
  );
}
