"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: "left" | "right" | "bottom" | "top";
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  position = "right",
  title,
  description,
  children,
}: DrawerProps) {
  if (!open) return null;

  const positionClasses = {
    right: "right-0 top-0 bottom-0 w-80 sm:w-96 border-l",
    left: "left-0 top-0 bottom-0 w-80 sm:w-96 border-r",
    top: "top-0 left-0 right-0 h-80 border-b",
    bottom: "bottom-0 left-0 right-0 h-80 border-t",
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0"
      />
      <div
        className={cn(
          "fixed z-50 bg-card p-6 shadow-2xl transition-transform animate-in fade-in-0 duration-300 border-border flex flex-col justify-between",
          positionClasses[position]
        )}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              {title && <h3 className="text-lg font-bold tracking-tight">{title}</h3>}
              {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 hover:opacity-100 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="py-4 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
