"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  name?: string;
}

export function RadioGroup({ options, value, onChange, className, name = "radio-group" }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn("space-y-2", className)}>
      {options.map((opt) => {
        const isChecked = opt.value === value;
        return (
          <label
            key={opt.value}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
              isChecked
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border bg-card hover:bg-accent/40"
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange?.(opt.value)}
              className="sr-only"
            />
            <div className={cn("h-4 w-4 rounded-full border border-primary flex items-center justify-center mt-0.5 shrink-0", isChecked && "bg-primary")}>
              {isChecked && <Circle className="h-2 w-2 text-primary-foreground fill-current" />}
            </div>
            <div>
              <div className="text-sm font-semibold">{opt.label}</div>
              {opt.description && <div className="text-xs text-muted-foreground mt-0.5">{opt.description}</div>}
            </div>
          </label>
        );
      })}
    </div>
  );
}
