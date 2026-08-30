"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface CommandItem {
  id: string;
  label: string;
  category?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}

export function CommandMenu({ open, onOpenChange, items }: CommandMenuProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center px-4 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search components..."
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">No matching commands found.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action?.();
                  onOpenChange(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  {item.icon && <span className="text-muted-foreground group-hover:text-foreground">{item.icon}</span>}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.category && (
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
