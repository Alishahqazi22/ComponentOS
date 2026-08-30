"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({
  value = 65,
  size = 64,
  strokeWidth = 6,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary fill-transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary fill-transparent transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-bold font-mono">{Math.round(value)}%</span>
    </div>
  );
}
