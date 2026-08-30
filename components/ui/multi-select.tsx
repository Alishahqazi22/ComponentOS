"use client";

import * as React from "react";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Option {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        onClick={() => setOpen(!open)}
        className="flex min-h-[38px] w-full flex-wrap items-center justify-between gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm cursor-pointer hover:bg-accent/50 focus-within:ring-1 focus-within:ring-ring"
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selected.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {selected.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <Badge key={val} variant="secondary" className="gap-1 text-xs">
                {opt?.label || val}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={(e) => removeOption(val, e)}
                />
              </Badge>
            );
          })}
        </div>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
      </div>

      {open && (
        <div className="absolute top-full mt-1 z-50 w-full max-h-60 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in-50">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-1.5 text-sm rounded cursor-pointer transition-colors",
                  isSelected ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 text-primary" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
