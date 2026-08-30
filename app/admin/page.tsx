"use client";

import * as React from "react";
import { ShieldCheck, Plus, Package, Check, RefreshCw, Layers, History, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { COMPONENT_REGISTRY } from "@/registry";

export default function AdminPage() {
  const [items, setItems] = React.useState(Object.values(COMPONENT_REGISTRY));
  const [newSlug, setNewSlug] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("micro");
  const [auditLogs, setAuditLogs] = React.useState<string[]>([
    "Published button@1.2.0 to public registry endpoint",
    "Published data-table@1.3.0 with sorting & pagination features",
    "Published ai-chat@1.0.0 compound block"
  ]);

  const handlePublish = () => {
    if (!newSlug || !newTitle) return;
    const newItem = {
      slug: newSlug.toLowerCase().replace(/\s+/g, "-"),
      name: newSlug.toLowerCase(),
      title: newTitle,
      version: "1.0.0",
      description: "Custom authored component added via Admin Portal.",
      type: "component" as const,
      category: newCategory as any,
      author: "Admin User",
      license: "MIT",
      qualityScore: 5.0,
      isOfficial: true,
      updatedAt: new Date().toISOString().split("T")[0],
      dependencies: ["clsx", "tailwind-merge"],
      registryDependencies: [],
      files: [
        {
          path: `components/ui/${newSlug}.tsx`,
          target: `components/ui/${newSlug}.tsx`,
          content: `export function ${newTitle.replace(/\s+/g, "")}() { return <div>${newTitle} Component</div>; }`
        }
      ],
      props: [],
      accessibility: {
        keyboard: "Keyboard navigable",
        screenReader: "Semantic HTML element",
        ariaRoles: ["region"]
      }
    };

    setItems((prev) => [newItem, ...prev]);
    setAuditLogs((prev) => [`Published ${newItem.name}@1.0.0 to public registry`, ...prev]);
    setNewSlug("");
    setNewTitle("");
  };

  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Registry Governance & Admin
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">ComponentOS Admin Suite</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Component Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <UploadCloud className="h-4 w-4 text-primary" /> Publish New Registry Component
              </CardTitle>
              <CardDescription className="text-xs">Add a new component specification directly into the versioned registry.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Component Slug:</label>
                <Input
                  placeholder="e.g. status-bar"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Title:</label>
                <Input
                  placeholder="e.g. Status Bar"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 outline-none"
                >
                  <option value="micro">Micro Primitives</option>
                  <option value="forms">Form Controls</option>
                  <option value="data-display">Data Display</option>
                  <option value="ai">AI Components</option>
                  <option value="blocks">Compound Blocks</option>
                </select>
              </div>

              <Button onClick={handlePublish} className="w-full font-bold">
                Publish to Registry
              </Button>
            </CardContent>
          </Card>

          {/* Audit Logs Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" /> Audit Trail Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-2 rounded bg-muted/40 text-muted-foreground">
                  ✔ {log}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Existing Components Registry Table */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registered Catalog Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border text-xs">
                {items.slice(0, 20).map((comp) => (
                  <div key={comp.slug} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{comp.title}</span>
                        <Badge variant="secondary" className="font-mono text-[10px]">{comp.category}</Badge>
                        <Badge variant="outline" className="font-mono text-[10px]">v{comp.version}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-0.5 line-clamp-1">{comp.description}</p>
                    </div>
                    <Badge variant="success">Published</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
