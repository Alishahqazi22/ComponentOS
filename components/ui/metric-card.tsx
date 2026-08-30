"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface MetricCardProps {
  label: string;
  metric: string | number;
  subtext?: string;
  statusColor?: "emerald" | "blue" | "amber" | "rose";
  className?: string;
}

export function MetricCard({
  label,
  metric,
  subtext,
  statusColor = "emerald",
  className,
}: MetricCardProps) {
  const borderColors = {
    emerald: "border-l-emerald-500",
    blue: "border-l-blue-500",
    amber: "border-l-amber-500",
    rose: "border-l-rose-500",
  };

  return (
    <Card className={cn("p-4 border-l-4 shadow-xs space-y-1", borderColors[statusColor], className)}>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-xl font-bold tracking-tight">{metric}</p>
      {subtext && <p className="text-[11px] text-muted-foreground">{subtext}</p>}
    </Card>
  );
}
