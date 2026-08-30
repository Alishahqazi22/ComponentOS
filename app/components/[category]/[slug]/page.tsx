"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Copy,
  Check,
  Terminal,
  ArrowLeft,
  Package,
  Code2,
  Star,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { COMPONENT_REGISTRY } from "@/registry";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

// ─── Live Preview ────────────────────────────────────────────────────────────
function ComponentPreview({ slug }: { slug: string }) {
  const item = COMPONENT_REGISTRY[slug];
  const [variant, setVariant] = React.useState("default");
  const [size, setSize] = React.useState("default");
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [animated, setAnimated] = React.useState(true);
  const [viewport, setViewport] = React.useState<"100%" | "768px" | "390px">(
    "100%"
  );

  const preview = React.useMemo(() => {
    switch (slug) {
      case "button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant={variant as any} size={size as any} isLoading={loading} disabled={disabled}>
              Deploy Application
            </Button>
            <Button variant="outline" size={size as any} disabled={disabled}>
              Cancel
            </Button>
            <Button variant="ghost" size={size as any} disabled={disabled}>
              Learn More
            </Button>
            <Button variant="destructive" size={size as any} disabled={disabled}>
              Delete
            </Button>
          </div>
        );

      case "badge":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">MIT License</Badge>
            <Badge variant="success">Published</Badge>
            <Badge variant="warning">Deprecated</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        );

      case "avatar":
        return (
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">MK</AvatarFallback>
            </Avatar>
          </div>
        );

      case "input":
        return (
          <div className="w-full max-w-sm space-y-3">
            <Input type="text" placeholder="Default text input..." disabled={disabled} />
            <Input type="email" placeholder="Email address..." disabled={disabled} />
            <Input type="password" placeholder="Password..." disabled={disabled} />
            <Input type="text" placeholder="Error state..." error disabled={disabled} />
          </div>
        );

      case "switch":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch id="sw1" disabled={disabled} />
              <label htmlFor="sw1" className="text-sm font-medium">Auto Registry Sync</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="sw2" defaultChecked disabled={disabled} />
              <label htmlFor="sw2" className="text-sm font-medium">Dark Mode</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="sw3" disabled />
              <label htmlFor="sw3" className="text-sm font-medium text-muted-foreground">Disabled</label>
            </div>
          </div>
        );

      case "card":
        return (
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Enterprise Tier</CardTitle>
              <CardDescription>Custom registry deployment & SSO integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Includes 100% source ownership and CLI offline bundle support.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={variant as any}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        );

      case "dialog":
        return (
          <div className="p-6 rounded-xl border border-border bg-card shadow-xl max-w-sm w-full space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold">Confirm Publication</h3>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to publish button@1.2.0 to the public registry?
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Publish</Button>
            </div>
          </div>
        );

      case "data-table":
        return (
          <div className="w-full max-w-2xl">
            <DataTable
              data={[
                { id: 1, name: "button", category: "micro", installs: "14.2k", status: "Published" },
                { id: 2, name: "data-table", category: "data-display", installs: "9.8k", status: "Published" },
                { id: 3, name: "ai-chat", category: "blocks", installs: "5.1k", status: "Published" },
                { id: 4, name: "dashboard", category: "templates", installs: "6.3k", status: "Published" },
              ]}
              columns={[
                { key: "name", header: "Component", sortable: true },
                { key: "category", header: "Category", sortable: true },
                { key: "installs", header: "CLI Installs", sortable: true },
                {
                  key: "status",
                  header: "Status",
                  render: (row: any) => <Badge variant="success">{row.status}</Badge>,
                },
              ]}
              pageSize={3}
            />
          </div>
        );

      case "ai-chat":
        return (
          <div className="w-full max-w-xl space-y-0 rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary text-xs">✦</div>
              <div>
                <div className="text-sm font-semibold">ComponentOS Assistant</div>
                <div className="text-xs text-muted-foreground">Generative Component Architect</div>
              </div>
              <Badge variant="success" className="ml-auto text-[10px]">Active</Badge>
            </div>
            <div className="p-4 space-y-3 min-h-[120px]">
              <div className="flex gap-2">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted border border-border rounded-xl rounded-tl-none px-3 py-2 text-sm max-w-xs">
                  Hello! I can help you select and install components.
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-xl rounded-tr-none px-3 py-2 text-sm max-w-xs">
                  npx componentos add data-table
                </div>
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex gap-2 p-3 border-t border-border">
              <Input placeholder="Ask about components..." className="text-xs" />
              <Button size="sm">Send</Button>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="w-full border border-border rounded-xl overflow-hidden bg-background" style={{ height: 340 }}>
            <div className="flex h-full">
              <div className="w-40 bg-card border-r border-border p-3 flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-xs mb-3">
                  <div className="h-5 w-5 rounded bg-primary text-primary-foreground flex items-center justify-center font-black text-[10px]">C</div>
                  ComponentOS
                </div>
                {["Overview", "Components", "Authors", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-2 py-1.5 rounded text-[11px] font-medium cursor-pointer ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">Platform Overview</div>
                    <div className="text-[10px] text-muted-foreground">Registry metrics</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-7 px-2">Export</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Components", "128", "+14", "emerald"],
                    ["CLI Downloads", "48.2k", "+24%", "emerald"],
                    ["Uptime", "99.99%", "Stable", "cyan"],
                    ["Authors", "18", "Active", "amber"],
                  ].map(([label, val, sub, color]) => (
                    <Card key={label} className="p-2.5">
                      <div className="text-[10px] text-muted-foreground">{label}</div>
                      <div className="text-base font-bold mt-0.5">{val}</div>
                      <div className={`text-[10px] text-${color}-500 mt-0.5`}>{sub}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-4 p-6">
            <Button variant={variant as any} size={size as any} disabled={disabled}>
              {item?.title ?? slug}
            </Button>
            <p className="text-xs text-muted-foreground">Live preview for {item?.title ?? slug}</p>
          </div>
        );
    }
  }, [slug, variant, size, loading, disabled, item]);

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30 text-xs">
        <div className="flex items-center gap-1 bg-background p-0.5 rounded-md border border-border">
          {(
            [
              ["100%", "Desktop", <Monitor key="m" className="h-3.5 w-3.5" />],
              ["768px", "Tablet", <Tablet key="t" className="h-3.5 w-3.5" />],
              ["390px", "Mobile", <Smartphone key="s" className="h-3.5 w-3.5" />],
            ] as const
          ).map(([w, label, icon]) => (
            <button
              key={String(w)}
              onClick={() => setViewport(w)}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors font-medium ${
                viewport === w
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {item?.variants && item.variants.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Variant:</span>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="bg-background border border-border rounded px-2 py-1 outline-none text-xs"
              >
                {item.variants.map((v) => (
                  <option key={v.name} value={v.name}>{v.label}</option>
                ))}
              </select>
            </div>
          )}
          {item?.sizes && item.sizes.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Size:</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-background border border-border rounded px-2 py-1 outline-none text-xs"
              >
                {item.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          {["button", "input", "switch", "dialog"].includes(slug) && (
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="rounded h-3 w-3"
              />
              <span>Disabled</span>
            </label>
          )}
          {slug === "button" && (
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
                className="rounded h-3 w-3"
              />
              <span>Loading</span>
            </label>
          )}

          {/* Motion FX Switch */}
          <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20 hover:bg-primary/20 transition-colors">
            <input
              type="checkbox"
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
              className="rounded h-3.5 w-3.5"
            />
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Animated Motion</span>
          </label>
        </div>
      </div>

      {/* Preview Pane */}
      <div className="flex justify-center items-center bg-card/60 rounded-xl border border-border min-h-[240px] p-8 overflow-auto bg-[radial-gradient(circle_at_center,hsl(var(--muted)/0.4)_1px,transparent_1px)] bg-[size:20px_20px]">
        <div
          style={{ width: viewport }}
          className="flex items-center justify-center transition-all duration-300"
        >
          {preview}
        </div>
      </div>
    </div>
  );
}

// ─── Code Viewer ─────────────────────────────────────────────────────────────
function CodeViewer({ files }: { files: { path: string; content: string }[] }) {
  const [activeFile, setActiveFile] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(files[activeFile]?.content ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {files.map((f, i) => (
            <button
              key={f.path}
              onClick={() => setActiveFile(i)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
                activeFile === i
                  ? "bg-slate-800 text-slate-100 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.path.split("/").pop()}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 transition-colors shrink-0"
        >
          {copied ? (
            <><Check className="h-3 w-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
          ) : (
            <><Copy className="h-3 w-3" /><span>Copy</span></>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs text-slate-200 font-mono leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre">
        <code>{files[activeFile]?.content}</code>
      </pre>
    </div>
  );
}

// ─── Props Table ─────────────────────────────────────────────────────────────
function PropsTable({ props }: { props: { name: string; type: string; defaultValue?: string; description: string; required?: boolean }[] }) {
  if (!props || props.length === 0) return (
    <p className="text-xs text-muted-foreground italic">No prop definitions available.</p>
  );

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <table className="w-full text-xs text-left">
        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
          <tr>
            <th className="p-3">Prop</th>
            <th className="p-3">Type</th>
            <th className="p-3">Default</th>
            <th className="p-3">Required</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-muted/20">
              <td className="p-3 font-mono font-semibold text-primary">{p.name}</td>
              <td className="p-3 font-mono text-amber-500">{p.type}</td>
              <td className="p-3 font-mono text-muted-foreground">{p.defaultValue ?? "—"}</td>
              <td className="p-3">
                {p.required ? (
                  <Badge variant="destructive" className="text-[9px]">Required</Badge>
                ) : (
                  <Badge variant="outline" className="text-[9px]">Optional</Badge>
                )}
              </td>
              <td className="p-3 text-muted-foreground leading-relaxed">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Accessibility Guide ──────────────────────────────────────────────────────
function AccessibilityGuide({ info }: { info?: { keyboard: string; screenReader: string; ariaRoles: string[] } }) {
  if (!info) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">⌨️ Keyboard</h4>
        <p className="text-sm">{info.keyboard}</p>
      </div>
      <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">🔊 Screen Reader</h4>
        <p className="text-sm">{info.screenReader}</p>
      </div>
      <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">♿ ARIA Roles</h4>
        <div className="flex flex-wrap gap-1">
          {info.ariaRoles.map((role) => (
            <Badge key={role} variant="outline" className="font-mono text-[10px]">{role}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ComponentDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const rawCategory = params?.category;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : (rawSlug as string) || "";
  const category = Array.isArray(rawCategory) ? rawCategory[0] : (rawCategory as string) || "";

  const item = COMPONENT_REGISTRY[slug];

  const [pkgManager, setPkgManager] = React.useState<PkgManager>("npm");
  const [copied, setCopied] = React.useState(false);

  const getCmd = () => {
    switch (pkgManager) {
      case "pnpm": return `pnpm dlx componentos add ${slug}`;
      case "yarn": return `yarn dlx componentos add ${slug}`;
      case "bun": return `bunx componentos add ${slug}`;
      default: return `npx componentos add ${slug}`;
    }
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(getCmd());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!item) {
    return (
      <div className="container max-w-screen-md mx-auto py-24 text-center space-y-4 px-4">
        <Package className="h-12 w-12 text-muted-foreground mx-auto" />
        <h1 className="text-2xl font-bold">Component Not Found</h1>
        <p className="text-sm text-muted-foreground">
          The component <code className="font-mono bg-muted px-1.5 py-0.5 rounded">{slug}</code> does not exist in the registry.
        </p>
        <Link href="/components">
          <Button variant="outline" className="mt-4">← Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl mx-auto py-10 px-4 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/components" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Components
        </Link>
        <span>/</span>
        <span className="capitalize">{category}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{item.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-5 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[10px]">{item.category}</Badge>
          <Badge variant="outline" className="font-mono text-[10px]">v{item.version}</Badge>
          <span className="text-xs text-muted-foreground">Updated {item.updatedAt}</span>
          <span className="text-xs text-muted-foreground">• {item.license} License</span>
          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
            <Star className="h-3 w-3 fill-amber-500" />
            {item.qualityScore.toFixed(1)}
          </div>
          {item.isOfficial && (
            <Badge variant="success" className="text-[10px]">✓ Official</Badge>
          )}
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{item.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed mt-3">
            {item.description}
          </p>
        </div>

        {/* CLI Install Box */}
        <div className="max-w-2xl">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-lg font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Install via CLI
              </span>
              <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded border border-slate-800 text-[10px]">
                {(["npm", "pnpm", "yarn", "bun"] as PkgManager[]).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={`px-2 py-0.5 rounded transition-colors ${pkgManager === pm ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-100 overflow-x-auto">
                <span className="text-emerald-400 mr-2">$</span>{getCmd()}
              </span>
              <button
                onClick={copyCmd}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded border border-slate-700 transition-colors shrink-0"
              >
                {copied ? (
                  <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /><span>Copy</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" /> Live Preview & Playground
        </h2>
        <ComponentPreview slug={slug} />
      </section>

      {/* Dependencies */}
      {item.dependencies && item.dependencies.length > 0 && (
        <section className="p-4 rounded-xl border border-border bg-card space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            📦 NPM Package Dependencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.dependencies.map((pkg) => (
              <Badge key={pkg} variant="outline" className="font-mono text-xs">{pkg}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Registry Dependencies */}
      {item.registryDependencies && item.registryDependencies.length > 0 && (
        <section className="p-4 rounded-xl border border-border bg-card space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            🔗 ComponentOS Registry Dependencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.registryDependencies.map((dep) => (
              <Link key={dep} href={`/components/micro/${dep}`}>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {dep}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Usage Example */}
      {item.usageExample && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Usage Example</h2>
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
            {item.usageExample}
          </div>
        </section>
      )}

      {/* Source Code */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" /> Source Code
          </h2>
          <span className="text-xs text-muted-foreground">100% ownership — paste into your project</span>
        </div>
        <CodeViewer files={item.files} />
      </section>

      {/* Component API */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Component API / Props</h2>
        <PropsTable props={item.props} />
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Accessibility (WCAG 2.2 AA)</h2>
        <AccessibilityGuide info={item.accessibility} />
      </section>

      {/* Related Components */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-lg font-bold tracking-tight">Related Components</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.values(COMPONENT_REGISTRY)
            .filter(
              (c) =>
                c.slug !== slug &&
                (c.category === item.category ||
                  item.registryDependencies.includes(c.slug))
            )
            .slice(0, 4)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.category}/${c.slug}`}
                className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {c.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{c.category}</div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
