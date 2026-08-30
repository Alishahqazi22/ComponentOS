"use client";

import * as React from "react";
import Link from "next/link";
import { Star, FolderPlus, Settings, Package, ArrowRight, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { COMPONENT_REGISTRY } from "@/registry";

export default function UserDashboardPage() {
  const [favorites, setFavorites] = React.useState<string[]>(["button", "data-table", "ai-chat"]);

  const removeFavorite = (slug: string) => {
    setFavorites((prev) => prev.filter((s) => s !== slug));
  };

  const favoriteItems = favorites.map((slug) => COMPONENT_REGISTRY[slug]).filter(Boolean);

  return (
    <div className="container max-w-screen-xl mx-auto py-10 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Developer Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your bookmarked components, custom collections, and registry preferences.</p>
        </div>
        <Link href="/components">
          <Button size="sm">Explore Components</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Column: Favorites & Collections */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Favorite Components
                </CardTitle>
                <CardDescription className="text-xs">Quick access to your frequently installed components.</CardDescription>
              </div>
              <Badge variant="secondary">{favorites.length} saved</Badge>
            </CardHeader>
            <CardContent>
              {favoriteItems.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-6 text-center">No favorite components saved yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {favoriteItems.map((item) => (
                    <div key={item.slug} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link href={`/components/${item.category}/${item.slug}`} className="font-bold text-sm hover:underline">
                            {item.title}
                          </Link>
                          <Badge variant="outline" className="font-mono text-[10px]">{item.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded text-muted-foreground hidden sm:inline">
                          npx componentos add {item.slug}
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFavorite(item.slug)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column: Settings & Collections */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <FolderPlus className="h-4 w-4 text-primary" /> My Collections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">SaaS Stack Setup</h4>
                  <p className="text-muted-foreground text-[10px]">Button, Card, Data Table, Dialog</p>
                </div>
                <Badge variant="outline">4 items</Badge>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">AI Conversational Suite</h4>
                  <p className="text-muted-foreground text-[10px]">AI Chat Block, Avatar, Input</p>
                </div>
                <Badge variant="outline">3 items</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
