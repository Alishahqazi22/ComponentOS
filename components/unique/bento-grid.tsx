"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 w-full auto-rows-[180px]", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  header,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div>{header}</div>
      <div className="space-y-1 relative z-10">
        {icon && <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-2">{icon}</div>}
        <h4 className="font-bold text-base group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
