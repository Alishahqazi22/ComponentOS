"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, ArrowRight, Package, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { COMPONENT_REGISTRY } from "@/registry";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = React.useState(initialQuery);

  const allComponents = Object.values(COMPONENT_REGISTRY);

  const results = React.useMemo(() => {
    if (!query.trim()) return allComponents.slice(0, 16);
    const q = query.toLowerCase();
    return allComponents.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, allComponents]);

  return (
    <div className="container max-w-screen-xl mx-auto py-12 px-4 space-y-8">
      <div className="space-y-3 max-w-xl">
        <Badge variant="outline">Catalog Search</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Search ComponentOS</h1>
        <p className="text-sm text-muted-foreground">Find UI primitives, animated cards, blocks, and CLI commands instantly.</p>
      </div>

      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Type to search components e.g. 'button', 'data table', 'glass'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 text-base rounded-xl shadow-sm"
          autoFocus
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Found {results.length} results</span>
          {query && <span>Query: "{query}"</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.category}/${item.slug}`}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-mono text-[10px]">{item.category}</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">v{item.version}</span>
                </div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="bg-muted px-2 py-0.5 rounded text-[10px]">npx componentos add {item.slug}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
