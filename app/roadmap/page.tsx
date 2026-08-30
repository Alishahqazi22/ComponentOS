"use client";

import * as React from "react";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RoadmapPage() {
  const items = [
    { title: "v1.0.0 — Core Primitive Foundation", status: "Released", date: "Q2 2026", items: ["Button, Badge, Avatar, Card, Input, Switch, Dialog", "CLI Installer Package Resolver"] },
    { title: "v1.2.0 — Expanded Ecosystem & Animated Suite", status: "Current", date: "Q3 2026", items: ["80+ Essential, Advanced, & Unique Components", "Spotlight Cards, Bento Grids, Glassmorphism FX", "Configurable Framer Motion Transition Utilities", "Custom 404 & Instant Search Pages"] },
    { title: "v2.0.0 — Enterprise Governance & Visual Designer", status: "Upcoming", date: "Q4 2026", items: ["Visual Drag-and-Drop Canvas Component Inspector", "Automated Figma Component Sync API", "Custom Private Registry Server Hosting"] },
  ];

  return (
    <div className="container max-w-screen-lg mx-auto py-12 px-4 space-y-10">
      <div className="space-y-3">
        <Badge variant="outline">Product Evolution</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Platform Roadmap</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Track the development milestones, feature expansions, and version history of ComponentOS.
        </p>
      </div>

      <div className="space-y-6">
        {items.map((m, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={m.status === "Current" ? "default" : m.status === "Released" ? "success" : "secondary"}>
                  {m.status}
                </Badge>
                <span className="font-bold text-lg">{m.title}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{m.date}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              {m.items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
