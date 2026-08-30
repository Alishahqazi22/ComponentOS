"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Terminal,
  Settings,
  Palette,
  Code2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Zap,
  Layers,
  FileCode,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FrameworkTab = "nextjs" | "vite" | "remix" | "astro";

export default function DocsPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const currentSlug = Array.isArray(rawSlug) ? rawSlug[0] : (typeof rawSlug === "string" ? rawSlug : "installation");

  const [framework, setFramework] = React.useState<FrameworkTab>("nextjs");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const docNav = [
    {
      slug: "installation",
      title: "Quickstart Installation",
      icon: <Terminal className="h-4 w-4" />,
    },
    {
      slug: "cli",
      title: "CLI Command Reference",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      slug: "configuration",
      title: "Project Configuration",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      slug: "theming",
      title: "Theme & Design Tokens",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      slug: "animation",
      title: "Motion & Animation FX",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      slug: "components",
      title: "Taxonomy & Governance",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      slug: "contributing",
      title: "Authoring & Publishing",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
  ];

  const renderDocContent = () => {
    switch (currentSlug) {
      case "cli":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                CLI Manual
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                CLI Command Suite Reference
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                The <code className="font-mono text-primary">componentos</code>{" "}
                CLI automates initialization, recursive dependency graph resolution, local component file generation, and theme configuration.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base font-mono text-primary">
                    npx componentos init
                  </h3>
                  <Badge variant="secondary">Setup Command</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Initializes your project workspace by analyzing Tailwind CSS variables, path aliases (<code className="font-mono">@/components</code>), creating <code className="font-mono">componentos.json</code>, and adding <code className="font-mono">@/lib/utils.ts</code> with the <code className="font-mono">cn()</code> helper.
                </p>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-cyan-400 flex items-center justify-between">
                  <span>$ npx componentos init</span>
                  <button
                    onClick={() => copyText("init", "npx componentos init")}
                    className="text-slate-400 hover:text-slate-100"
                  >
                    {copiedId === "init" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base font-mono text-primary">
                    npx componentos add [component-names...] [--animated]
                  </h3>
                  <Badge variant="secondary">Install Command</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Downloads component TSX source code, recursively resolves sub-component dependencies, installs missing npm packages (<code className="font-mono">framer-motion</code>, <code className="font-mono">lucide-react</code>, <code className="font-mono">clsx</code>), and formats code for your local project. Pass <code className="font-mono">--animated</code> to convert simple components into Framer Motion spring components!
                </p>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-cyan-400 flex items-center justify-between">
                  <span>$ npx componentos add button data-table --animated</span>
                  <button
                    onClick={() =>
                      copyText(
                        "add",
                        "npx componentos add button data-table --animated"
                      )
                    }
                    className="text-slate-400 hover:text-slate-100"
                  >
                    {copiedId === "add" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base font-mono text-primary">
                    npx componentos search &lt;query&gt;
                  </h3>
                  <Badge variant="secondary">Query Command</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Searches the 1000+ ComponentOS registry directly inside your terminal by keyword, category, or tag.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base font-mono text-primary">
                    npx componentos list [--category &lt;name&gt;]
                  </h3>
                  <Badge variant="secondary">Discovery Command</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prints an interactive ASCII grid list of all registered primitives, animated blocks, and templates.
                </p>
              </div>
            </div>
          </div>
        );

      case "configuration":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Schema Spec
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Workspace Config (<code className="font-mono">componentos.json</code>)
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                The <code className="font-mono text-primary">componentos.json</code> file configures path aliases, Tailwind CSS CSS variable maps, and registry endpoint mirrors.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-slate-950 p-6 font-mono text-xs text-slate-200 overflow-x-auto space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                <span>componentos.json</span>
                <button
                  onClick={() =>
                    copyText(
                      "config",
                      `{
  "$schema": "https://componentos.dev/schemas/config.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "blocks": "@/components/blocks"
  },
  "animation": {
    "defaultEngine": "framer-motion",
    "springStiffness": 400,
    "springDamping": 25
  },
  "registry": "https://componentos.dev/registry"
}`
                    )
                  }
                  className="text-slate-400 hover:text-slate-100"
                >
                  {copiedId === "config" ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <pre className="text-slate-200">
{`{
  "$schema": "https://componentos.dev/schemas/config.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "blocks": "@/components/blocks"
  },
  "animation": {
    "defaultEngine": "framer-motion",
    "springStiffness": 400,
    "springDamping": 25
  },
  "registry": "https://componentos.dev/registry"
}`}
              </pre>
            </div>
          </div>
        );

      case "theming":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Design Tokens
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Theme System &amp; Design Tokens
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                ComponentOS features dynamic CSS HSL variables powering light mode, dark mode, and custom color presets (Zinc, Slate, Violet, Emerald, Amber, Rose).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-bold text-base">Dark Mode Configuration</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tailwind CSS <code className="font-mono">darkMode: [&quot;class&quot;]</code> strategy controls dark theme variables seamlessly without page reloads.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-bold text-base">Border Radius Matrix</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Global <code className="font-mono">--radius</code> tokens customize corner rounding across buttons, cards, dialogs, and inputs simultaneously.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/themes">
                <Button className="gap-2">
                  <Palette className="h-4 w-4" /> Open Interactive Theme Generator
                </Button>
              </Link>
            </div>
          </div>
        );

      case "animation":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Framer Motion FX
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Motion Engine &amp; Animated Components
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Transform standard static components into spring-physics animated components using Framer Motion micro-interactions, hover gestures, and page entrance animations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Animated Component Conversion
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every component in ComponentOS contains an <code className="font-mono">animated={"{true}"}</code> prop option that dynamically injects Framer Motion spring physics (<code className="font-mono">whileHover</code>, <code className="font-mono">whileTap</code>, <code className="font-mono">AnimatePresence</code>).
                </p>

                <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
{`import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AnimatedButtonDemo() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg"
    >
      ✨ Hover Me For Spring FX
    </motion.button>
  );
}`}
                </div>
              </div>
            </div>
          </div>
        );

      case "components":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Governance
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Taxonomy &amp; Component Governance
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                ComponentOS categorizes 1000+ components into strict architectural layers: Foundation, Micro Primitives, Form Controls, Navigation, Data Display, Cards, AI, Animated, Blocks, and Templates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <h4 className="font-bold text-primary">Micro Primitives</h4>
                <p className="text-muted-foreground">Buttons, Badges, Avatars, Switches, Inputs, Status Dots.</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <h4 className="font-bold text-primary">Compound Blocks</h4>
                <p className="text-muted-foreground">AI Chat Panels, Data Grids, Metric Counters, Pricing Cards.</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <h4 className="font-bold text-primary">Page Templates</h4>
                <p className="text-muted-foreground">Admin Dashboard Layouts, SaaS Landing Pages, Auth Suites.</p>
              </div>
            </div>
          </div>
        );

      case "contributing":
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Authoring Guide
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Authoring &amp; Publishing Components
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Submit enterprise components to the registry or host an internal private component registry server.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h3 className="font-bold text-lg">Publishing Workflow</h3>
              <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside">
                <li>Create component TSX file in <code className="font-mono">components/ui/</code>.</li>
                <li>Add WCAG 2.2 AA accessibility aria attributes.</li>
                <li>Register JSON entry in <code className="font-mono">registry/index.ts</code> or test via Admin Portal.</li>
              </ul>
              <div className="pt-2">
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Open Admin Publishing Suite →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );

      case "installation":
      default:
        return (
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-2">
                Setup Guide
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Quickstart Installation Guide
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                ComponentOS operates on a zero-lock-in source distribution architecture. Copy TSX files directly into your codebase in seconds.
              </p>
            </div>

            {/* Framework Tabs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-2 text-xs font-semibold">
                {(["nextjs", "vite", "remix", "astro"] as FrameworkTab[]).map(
                  (fw) => (
                    <button
                      key={fw}
                      onClick={() => setFramework(fw)}
                      className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${
                        framework === fw
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {fw}
                    </button>
                  )
                )}
              </div>

              {/* Step 1 */}
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    1
                  </span>
                  Initialize ComponentOS CLI
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-border bg-slate-950 px-4 py-3 font-mono text-xs text-cyan-400">
                  <span>$ npx componentos init</span>
                  <button
                    onClick={() => copyText("step1", "npx componentos init")}
                    className="text-slate-400 hover:text-slate-100"
                  >
                    {copiedId === "step1" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    2
                  </span>
                  Add Desired Components or Animated Motion FX
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-border bg-slate-950 px-4 py-3 font-mono text-xs text-slate-200">
                  <span>$ npx componentos add button data-table --animated</span>
                  <button
                    onClick={() =>
                      copyText(
                        "step2",
                        "npx componentos add button data-table --animated"
                      )
                    }
                    className="text-slate-400 hover:text-slate-100"
                  >
                    {copiedId === "step2" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="space-y-1.5 border-r border-border/60 pr-4 hidden md:block">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-3">
            Documentation Index
          </h4>
          {docNav.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                currentSlug === item.slug
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </aside>

        {/* Content Area */}
        <main className="md:col-span-3 space-y-6">{renderDocContent()}</main>
      </div>
    </div>
  );
}
