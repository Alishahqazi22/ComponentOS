"use client";

import * as React from "react";
import { Sparkles, Terminal, Code2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FeatureGrid() {
  const features = [
    { title: "CLI Installation", icon: <Terminal className="h-5 w-5 text-primary" />, desc: "One command delivers raw source files to your repository." },
    { title: "Framer Motion", icon: <Sparkles className="h-5 w-5 text-purple-500" />, desc: "Built-in spring physics and accessible motion primitives." },
    { title: "TypeScript Native", icon: <Code2 className="h-5 w-5 text-cyan-500" />, desc: "Strictly typed prop interfaces with IDE auto-complete." },
    { title: "WCAG 2.2 AA", icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, desc: "Keyboard navigable and screen reader tested." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {features.map((f) => (
        <Card key={f.title} className="p-4 space-y-2 hover:shadow-md transition-shadow">
          <div className="p-2 rounded-lg bg-muted/60 w-fit">{f.icon}</div>
          <h4 className="font-bold text-sm">{f.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
        </Card>
      ))}
    </div>
  );
}
