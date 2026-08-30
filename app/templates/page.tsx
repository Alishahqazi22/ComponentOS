"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutGrid, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardTemplate } from "@/components/templates/dashboard";

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded border border-border">
        {command}
      </span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

const templatesList = [
  {
    slug: "dashboard",
    title: "Admin Dashboard Page Template",
    category: "templates",
    description:
      "Includes collapsible sidebar, metric overview cards, data grid, and status indicators. Wired for real API data out of the box.",
    features: ["Sidebar Nav", "Metric Cards", "Data Grid", "Status Badges"],
    component: <DashboardTemplate />,
  },
];

export default function TemplatesPage() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <LayoutGrid className="h-3.5 w-3.5" /> Full Application Templates
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Complete Page Templates
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Full page architecture templates for dashboards, landing pages,
          ecommerce, and auth suites. Installed via CLI directly into your App
          Router page routes.
        </p>
      </div>

      {/* Template cards */}
      <div className="space-y-12">
        {templatesList.map((tmpl) => (
          <div
            key={tmpl.slug}
            className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-lg"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold">{tmpl.title}</h2>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {tmpl.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                  {tmpl.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tmpl.features.map((f) => (
                    <Badge key={f} variant="outline" className="text-[10px]">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <CopyableCommand
                  command={`npx componentos add ${tmpl.slug}`}
                />
                <Link href={`/components/templates/${tmpl.slug}`}>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Inspect Source
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live Render */}
            <div className="border border-border rounded-lg overflow-hidden h-[540px]">
              {tmpl.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
