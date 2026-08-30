import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Code2,
  Package,
  CheckCircle,
  Puzzle,
  Download,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TerminalDemo } from "@/components/TerminalDemo";
import { COMPONENT_REGISTRY } from "@/registry";

export default function HomePage() {
  const featuredSlugs = ["button", "badge", "avatar", "input", "switch", "card", "dialog", "data-table", "ai-chat"];
  const featuredComponents = featuredSlugs
    .map((slug) => COMPONENT_REGISTRY[slug])
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/20">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container max-w-screen-xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ComponentOS CLI v1.2.0 is Live</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Build Faster With{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Production-Ready
            </span>{" "}
            Components
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The open component infrastructure for modern web apps. Copy source code directly into your project terminal via CLI with 100% code ownership and zero npm lock-in.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/components">
              <Button size="lg" className="h-11 px-8 gap-2 font-semibold">
                Browse Catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-11 px-8 gap-2">
                <Terminal className="h-4 w-4" /> Documentation
              </Button>
            </Link>
          </div>

          {/* Interactive Terminal Showcase */}
          <div className="w-full pt-8">
            <TerminalDemo />
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY & PILLARS */}
      <section className="py-20 px-4 bg-muted/10 border-b border-border">
        <div className="container max-w-screen-xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Source Distribution Architecture</h2>
            <p className="text-sm text-muted-foreground">
              Components are delivered as raw, formatted TypeScript files into your local codebase. You own the code completely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">100% Code Ownership</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The component source code lives directly inside your `@/components/ui/` folder. Modify styles, add business rules, or re-theme without vendor constraints.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all space-y-3">
              <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500 w-fit">
                <Puzzle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Recursive CLI Dependency Resolver</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Running `npx componentos add dashboard` automatically resolves dependent primitives (cards, data tables, buttons) and installs missing npm packages seamlessly.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all space-y-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">WCAG 2.2 AA Accessibility</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every primitive is built using semantic HTML5, aria roles, visual ring focus outlines, and screen reader announcements out of the box.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COMPONENTS SHOWCASE */}
      <section className="py-20 px-4">
        <div className="container max-w-screen-xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Starter Catalog</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Featured Primitives & Compound Blocks</h2>
            </div>
            <Link href="/components" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All Components <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredComponents.map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.category}/${item.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {item.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      v{item.version}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="bg-muted px-2 py-0.5 rounded text-[10px]">
                    npx componentos add {item.slug}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 bg-primary text-primary-foreground border-t border-border">
        <div className="container max-w-screen-lg mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to transform your UI architecture?</h2>
          <p className="text-sm sm:text-base opacity-90 max-w-xl mx-auto">
            Initialize ComponentOS in your existing Next.js project with a single CLI command.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/docs/installation">
              <Button variant="secondary" size="lg" className="font-bold">
                Read Installation Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
