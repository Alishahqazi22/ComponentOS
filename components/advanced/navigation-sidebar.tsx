"use client";

import * as React from "react";
import { LayoutDashboard, Layers, Settings, Users, Package, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationSidebar() {
  const items = [
    { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, active: true },
    { label: "Components", icon: <Package className="h-4 w-4" /> },
    { label: "CLI Terminal", icon: <Terminal className="h-4 w-4" /> },
    { label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-56 p-3 rounded-xl border border-border bg-card space-y-4">
      <div className="flex items-center gap-2 font-black text-sm px-2">
        <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs">C</div>
        <span>ComponentOS</span>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left",
              item.active
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
