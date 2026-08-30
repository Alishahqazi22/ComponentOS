"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("inline-block w-px h-full bg-border self-stretch mx-2", className)} {...props} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center w-full my-4", className)} {...props}>
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs font-mono uppercase text-muted-foreground">{label}</span>
        <div className="flex-1 border-t border-border" />
      </div>
    );
  }

  return <div className={cn("w-full border-t border-border my-4", className)} {...props} />;
}
