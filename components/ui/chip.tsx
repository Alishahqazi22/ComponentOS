"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  avatar?: React.ReactNode;
  onDelete?: () => void;
  variant?: "default" | "outline" | "secondary";
}

export function Chip({
  label,
  avatar,
  onDelete,
  variant = "default",
  className,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors shadow-xs",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border border-border bg-background text-foreground",
        className
      )}
      {...props}
    >
      {avatar && <span className="-ml-1 shrink-0">{avatar}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full p-0.5 hover:bg-black/10 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
