"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, Code2, Terminal, Sparkles, Puzzle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container max-w-screen-lg mx-auto py-12 px-4 space-y-10">
      <div className="space-y-3">
        <Badge variant="outline">Platform Mission</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">About ComponentOS</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          ComponentOS is the open component infrastructure designed to give engineering teams 100% code ownership, zero npm vendor lock-in, and instant CLI source code distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card space-y-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit"><Code2 className="h-6 w-6" /></div>
          <h3 className="text-lg font-bold">Raw Source Code Distribution</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unlike traditional monolithic UI libraries shipped as closed compiled npm packages, ComponentOS installs human-readable TypeScript files directly into your project repository.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card space-y-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 w-fit"><ShieldCheck className="h-6 w-6" /></div>
          <h3 className="text-lg font-bold">WCAG 2.2 AA Accessibility</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every component is constructed with semantic HTML5 tags, ARIA attributes, ring focus indicators, and keyboard accessibility out of the box.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-border bg-muted/30 text-center space-y-4">
        <h3 className="text-2xl font-bold">Ready to get started?</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">Initialize ComponentOS in your codebase with a single terminal command.</p>
        <div className="flex justify-center gap-3">
          <Link href="/docs/installation"><Button className="font-bold">Read Quickstart</Button></Link>
          <Link href="/components"><Button variant="outline">Browse Catalog</Button></Link>
        </div>
      </div>
    </div>
  );
}
