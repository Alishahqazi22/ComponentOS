"use client";

import * as React from "react";
import Link from "next/link";
import { Layers, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIChatBlock } from "@/components/blocks/ai-chat";

const blocksList = [
  {
    slug: "ai-chat",
    title: "AI Chat Interface Block",
    category: "ai",
    description:
      "Generative AI conversational panel with prompt input, code snippet renderer, model selector, and token usage tracker. Install once, own the full source.",
    dependencies: ["button", "input", "avatar", "badge"],
  },
];

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

export default function BlocksPage() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <Layers className="h-3.5 w-3.5" /> Compound Blocks
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Multi-Component Interface Blocks
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Higher-level composed sections combining primitives into functional
          app features. Install via CLI to automatically resolve all
          sub-component dependencies.
        </p>
      </div>

      {/* Block cards */}
      <div className="space-y-12">
        {blocksList.map((block) => (
          <div
            key={block.slug}
            className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-md"
          >
            {/* Block Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold">{block.title}</h2>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {block.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                  {block.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {block.dependencies.map((dep) => (
                    <Link key={dep} href={`/components/micro/${dep}`}>
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] hover:bg-primary/10 cursor-pointer transition-colors"
                      >
                        {dep}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <CopyableCommand
                  command={`npx componentos add ${block.slug}`}
                />
                <Link href={`/components/ai/${block.slug}`}>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Inspect Source
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live Render */}
            <div className="flex justify-center p-6 bg-muted/20 rounded-lg border border-border overflow-x-auto">
              <AIChatBlock />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
