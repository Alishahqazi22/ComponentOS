"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ArrowUpDown,
  Package,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COMPONENT_REGISTRY } from "@/registry";

function ComponentsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "popular";
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("q") || ""
  );
  const [animatedOnly, setAnimatedOnly] = React.useState(false);
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 24;

  const categories = [
    { slug: "all", label: "All Catalog" },
    { slug: "animated", label: "✨ Animated Motion" },
    { slug: "micro", label: "Micro Primitives" },
    { slug: "forms", label: "Form Controls" },
    { slug: "feedback", label: "Feedback & Modals" },
    { slug: "data-display", label: "Data Display" },
    { slug: "navigation", label: "Navigation Bars" },
    { slug: "cards", label: "3D & Glow Cards" },
    { slug: "ai", label: "AI Interface" },
    { slug: "ecommerce", label: "E-Commerce Suite" },
    { slug: "dashboard", label: "Dashboard Widgets" },
    { slug: "marketing", label: "Marketing Sections" },
    { slug: "auth", label: "Auth Forms" },
    { slug: "blocks", label: "Compound Blocks" },
    { slug: "templates", label: "Full Templates" },
  ];

  const registryItems = React.useMemo(
    () => Object.values(COMPONENT_REGISTRY),
    []
  );

  const filteredItems = React.useMemo(() => {
    return registryItems.filter((item) => {
      const matchesCategory =
        currentCategory === "all" || item.category === currentCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags &&
          item.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      const matchesAnimated = animatedOnly ? item.hasAnimated : true;
      return matchesCategory && matchesSearch && matchesAnimated;
    });
  }, [registryItems, currentCategory, searchQuery, animatedOnly]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (currentSort === "alphabetical") return a.title.localeCompare(b.title);
      if (currentSort === "recent")
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      return b.qualityScore - a.qualityScore;
    });
  }, [filteredItems, currentSort]);

  const totalPages = Math.ceil(sortedItems.length / pageSize) || 1;
  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, currentPage]);

  const setCategoryFilter = (slug: string) => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("category");
    else params.set("category", slug);
    router.push(`/components?${params.toString()}`);
  };

  const setSortOption = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`/components?${params.toString()}`);
  };

  const copyCliCommand = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`npx componentos add ${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{registryItems.length.toLocaleString()}+ Components Available</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Component Catalog
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Browse our enterprise taxonomy of static and Framer Motion animated components. Copy CLI installation commands or inspect live interactive previews.
          </p>
        </div>

        {/* Animated Filter Toggle */}
        <button
          onClick={() => {
            setAnimatedOnly(!animatedOnly);
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
            animatedOnly
              ? "bg-primary text-primary-foreground border-primary shadow-lg ring-2 ring-primary/30"
              : "bg-card border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>{animatedOnly ? "Showing Animated Only" : "Filter Animated FX"}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search 1,000+ components by name, category, or tag..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-background border border-border rounded-md px-2.5 py-1.5 outline-none font-medium text-xs"
          >
            <option value="popular">Popularity &amp; Score</option>
            <option value="recent">Recently Updated</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategoryFilter(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              currentCategory === cat.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {paginatedItems.length} of {sortedItems.length} matching components (Page {currentPage} of {totalPages})
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedItems.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3">
            <Package className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-lg">No components found</h3>
            <p className="text-xs text-muted-foreground">
              Try clearing your search query or selecting a different category filter.
            </p>
          </div>
        ) : (
          paginatedItems.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.category}/${item.slug}`}
              className="group rounded-xl border border-border bg-card p-5 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {item.category}
                  </Badge>
                  {item.hasAnimated && (
                    <Badge variant="success" className="text-[9px] gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> Motion FX
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors flex items-center gap-1.5 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span>WCAG AA • {item.license}</span>
                </div>
              </div>

              {/* CLI Command Box */}
              <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded truncate max-w-[170px]">
                  npx componentos add {item.slug}
                </span>
                <button
                  onClick={(e) => copyCliCommand(item.slug, e)}
                  className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  title="Copy CLI command"
                >
                  {copiedSlug === item.slug ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground">
          <div>Page {currentPage} of {totalPages} &bull; {sortedItems.length} items</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous Page
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComponentsCatalogPage() {
  return (
    <React.Suspense
      fallback={
        <div className="container py-20 text-center text-sm text-muted-foreground">
          Loading 1,000+ catalog components...
        </div>
      }
    >
      <ComponentsCatalogContent />
    </React.Suspense>
  );
}
