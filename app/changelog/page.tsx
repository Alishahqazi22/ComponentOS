import * as React from "react";
import { GitCommit, Sparkles, CheckCircle2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v1.2.0",
      date: "August 2026",
      title: "CLI Recursive Dependency Resolution & AI Chat Block",
      added: [
        "Added `ai-chat` compound block featuring generative prompt input and code renderer.",
        "Added recursive CLI dependency resolution (`npx componentos add dashboard` automatically resolves buttons, cards, tables).",
        "Added WCAG 2.2 AA accessibility verification badges on component pages."
      ],
      improved: [
        "Faster CLI registry resolution with ETag HTTP header caching.",
        "Enhanced dark mode code viewer syntax highlighting."
      ]
    },
    {
      version: "v1.0.0",
      date: "July 2026",
      title: "Initial ComponentOS Registry Platform Launch",
      added: [
        "Launched ComponentOS web application showcase and CLI tool (`npx componentos init`, `add`).",
        "Added Micro Primitives (Button, Badge, Avatar), Form Controls (Input, Switch), and Data Display (Data Table, Card).",
        "Added interactive theme generator supporting Zinc, Slate, Violet, Emerald, Amber, and Rose tokens."
      ]
    }
  ];

  return (
    <div className="container max-w-screen-lg mx-auto py-10 px-4 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Version History & Changelog</h1>
        <p className="text-sm text-muted-foreground">
          Track component updates, CLI releases, bug fixes, and semantic version updates.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
        {releases.map((rel) => (
          <div key={rel.version} className="relative pl-10 space-y-3">
            <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background" />

            <div className="flex items-center gap-2">
              <Badge variant="default" className="font-mono">{rel.version}</Badge>
              <span className="text-xs text-muted-foreground">{rel.date}</span>
            </div>

            <h2 className="text-xl font-bold">{rel.title}</h2>

            {rel.added && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Added</h4>
                <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  {rel.added.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {rel.improved && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">Improved</h4>
                <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  {rel.improved.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
