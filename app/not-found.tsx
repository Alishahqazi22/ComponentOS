"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Search, Sparkles, Terminal, Layers, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const suggestedComponents = [
    { label: "Button", href: "/components/micro/button" },
    { label: "Data Table", href: "/components/data-display/data-table" },
    { label: "AI Chat Block", href: "/components/blocks/ai-chat" },
    { label: "Spotlight Card", href: "/components/animated/spotlight-card" },
    { label: "Kanban Board", href: "/components/advanced/kanban-board" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center space-y-8">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-20 pointer-events-none" />
        <div className="relative font-black text-8xl sm:text-9xl tracking-tighter bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
          404
        </div>
      </div>

      <div className="space-y-3 max-w-md">
        <Badge variant="outline" className="text-xs font-mono">
          Page Not Found
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Destination Lost in Space
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The component, documentation section, or page route you are trying to access does not exist or has been moved.
        </p>
      </div>

      {/* Instant Search Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-md relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search components, docs, or CLI commands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-24 h-11 text-sm shadow-sm"
        />
        <Button type="submit" size="sm" className="absolute right-1.5 h-8 px-3 text-xs font-semibold">
          Search
        </Button>
      </form>

      {/* Suggested Quick Links */}
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Suggested Components</span>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedComponents.map((item) => (
            <Link key={item.label} href={item.href}>
              <Badge variant="secondary" className="hover:bg-accent cursor-pointer transition-colors px-3 py-1 text-xs">
                {item.label}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
        <Link href="/">
          <Button className="gap-2 font-bold">
            <Home className="h-4 w-4" /> Return Home
          </Button>
        </Link>
        <Link href="/components">
          <Button variant="secondary" className="gap-2">
            <Package className="h-4 w-4" /> Browse Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
}
