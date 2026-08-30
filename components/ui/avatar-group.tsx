"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface AvatarGroupItem {
  src?: string;
  name: string;
  fallback: string;
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn("flex items-center -space-x-2 overflow-hidden", className)}>
      {visible.map((av, idx) => (
        <Avatar key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-background hover:z-10 transition-transform hover:scale-110">
          {av.src && <AvatarImage src={av.src} alt={av.name} />}
          <AvatarFallback className="text-xs font-semibold">{av.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-bold text-muted-foreground ring-2 ring-background">
          +{remaining}
        </div>
      )}
    </div>
  );
}
