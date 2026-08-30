"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Package, LayoutGrid, Sparkles, Terminal, Shield, Layers, Code2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { COMPONENT_REGISTRY } from "@/registry";

export default function CategoriesPage() {
  const allItems = Object.values(COMPONENT_REGISTRY);

  const categoryMap: Record<string, number> = {};
  allItems.forEach((item) => {
    categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
  });

  const categories = [
    { slug: "micro", title: "Micro Primitives", desc: "Buttons, badges, inputs, switches, avatars, tags, chips", icon: <Code2 className="h-6 w-6 text-primary" /> },
    { slug: "forms", title: "Form Primitives", desc: "Select, combobox, date pickers, OTP input, sliders", icon: <Layers className="h-6 w-6 text-purple-500" /> },
    { slug: "data-display", title: "Data Display", desc: "Data tables, kanban, timelines, cards, stats", icon: <LayoutGrid className="h-6 w-6 text-cyan-500" /> },
    { slug: "animated", title: "Animated & Motion", desc: "Spotlight cards, glow cards, shimmer text, marquee", icon: <Sparkles className="h-6 w-6 text-amber-500" /> },
    { slug: "advanced", title: "Advanced Components", desc: "Tree views, code blocks, terminal UI, steppers", icon: <Terminal className="h-6 w-6 text-emerald-500" /> },
    { slug: "ai", title: "AI Interfaces", desc: "AI chat assistant, prompt input, thinking indicators", icon: <Zap className="h-6 w-6 text-rose-500" /> },
    { slug: "blocks", title: "Compound Blocks", desc: "Multi-component production layout blocks", icon: <Package className="h-6 w-6 text-indigo-500" /> },
    { slug: "templates", title: "Page Templates", desc: "Full page templates for admin dashboards & SaaS", icon: <Shield className="h-6 w-6 text-blue-500" /> },
  ];

  return (
    <div className="container max-w-screen-xl mx-auto py-12 px-4 space-y-10">
      <div className="space-y-3">
        <Badge variant="outline">Taxonomy Overview</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Component Categories</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Explore ComponentOS components organized by UI role, complexity, and application tier.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const count = categoryMap[cat.slug] || 12;
          return (
            <Link key={cat.slug} href={`/components?category=${cat.slug}`}>
              <Card className="h-full p-6 hover:border-primary/50 transition-all hover:shadow-lg flex flex-col justify-between group cursor-pointer">
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-muted/60 w-fit group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{count} components</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
