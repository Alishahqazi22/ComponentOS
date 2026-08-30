"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "Select or search...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filtered = React.useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-xs", className)}>
      <div
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm cursor-pointer hover:bg-accent/50"
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
      </div>

      {open && (
        <div className="absolute top-full mt-1 z-50 w-full rounded-md border border-border bg-popover p-1 shadow-lg animate-in fade-in-50">
          <Input
            placeholder="Search options..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-xs mb-1"
            autoFocus
          />
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-2 text-xs text-muted-foreground text-center">No options found.</div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-2 py-1.5 text-xs rounded cursor-pointer transition-colors",
                    opt.value === value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-accent"
                  )}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && <Check className="h-3.5 w-3.5 text-primary" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
