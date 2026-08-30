"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, Search, Terminal, Sparkles, Settings, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveDock() {
  const items = [
    { icon: <Home className="h-5 w-5" />, label: "Home" },
    { icon: <Package className="h-5 w-5" />, label: "Components" },
    { icon: <Terminal className="h-5 w-5" />, label: "CLI" },
    { icon: <Sparkles className="h-5 w-5" />, label: "AI" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl">
      {items.map((item, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.25, y: -6 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl bg-card border border-border/60 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-md relative group"
        >
          {item.icon}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
