"use client";

import * as React from "react";
import { Pipette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

export function ColorPicker({ value = "#3b82f6", onChange, className }: ColorPickerProps) {
  const [color, setColor] = React.useState(value);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  const presets = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#ef4444", "#64748b"];

  return (
    <div className={cn("inline-flex flex-col gap-2 p-3 rounded-lg border border-border bg-card shadow-sm w-fit", className)}>
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 rounded-md border border-border overflow-hidden shrink-0 shadow-inner" style={{ backgroundColor: color }}>
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <Input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-8 font-mono text-xs w-28 uppercase"
        />
        <Pipette className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handleColorChange(p)}
            className={cn(
              "h-5 w-5 rounded-full border border-black/10 transition-transform hover:scale-110",
              color.toLowerCase() === p.toLowerCase() && "ring-2 ring-primary ring-offset-1"
            )}
            style={{ backgroundColor: p }}
          />
        ))}
      </div>
    </div>
  );
}
