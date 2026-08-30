"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export interface SplitButtonProps extends Omit<ButtonProps, "onClick"> {
  label: string;
  onMainClick?: () => void;
  options?: { label: string; action: () => void }[];
}

export function SplitButton({
  label,
  onMainClick,
  options = [],
  variant = "default",
  size = "default",
  className,
  ...props
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-flex rounded-md shadow-sm", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={onMainClick}
        className="rounded-r-none border-r border-background/20"
        {...props}
      >
        {label}
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-l-none px-2"
        aria-label="More options"
        {...props}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      {isOpen && options.length > 0 && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-md border border-border bg-card p-1 shadow-lg animate-in fade-in-50 zoom-in-95">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                opt.action();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs font-medium rounded hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
