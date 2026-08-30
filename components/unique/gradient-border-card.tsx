"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GradientBorderCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-[1.5px] rounded-2xl bg-gradient-to-tr from-primary via-purple-500 to-cyan-500 shadow-md", className)} {...props}>
      <div className="rounded-[14px] bg-card p-6 text-card-foreground">
        {children}
      </div>
    </div>
  );
}
