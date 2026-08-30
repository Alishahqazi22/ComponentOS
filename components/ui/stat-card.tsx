"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "up",
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-4 space-y-2 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        {icon && <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-black tracking-tight">{value}</span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
              trend === "up" && "bg-emerald-500/10 text-emerald-600",
              trend === "down" && "bg-rose-500/10 text-rose-600",
              trend === "neutral" && "bg-muted text-muted-foreground"
            )}
          >
            {trend === "up" && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3 mr-0.5" />}
            {change}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </Card>
  );
}
