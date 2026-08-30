"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Package, Layers, FileText, Palette, Command, X, ArrowRight } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/registry";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const registryItems = Object.values(COMPONENT_REGISTRY);

  const filteredItems = registryItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150">
      <div className="w-full max-w-xl rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border bg-muted/30">
          <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a component name or category (e.g., button, data-table, ai-chat)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-accent text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/40 text-xs">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No component matches found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredItems.slice(0, 20).map((item) => (
              <button
                key={item.slug}
                onClick={() => handleSelect(`/components/${item.category}/${item.slug}`)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent hover:text-accent-foreground text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-background px-1 py-0.5 rounded border">↵</kbd> select</span>
            <span><kbd className="font-mono bg-background px-1 py-0.5 rounded border">esc</kbd> close</span>
          </div>
          <span>ComponentOS Registry Search Engine</span>
        </div>
      </div>
    </div>
  );
}
