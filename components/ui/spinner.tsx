"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
}

export function Spinner({ size = "default", className, ...props }: SpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <div className={cn("inline-flex items-center justify-center text-primary", className)} {...props}>
      <Loader2 className={cn("animate-spin", sizeMap[size])} />
    </div>
  );
}
