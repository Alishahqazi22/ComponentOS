"use client";

import * as React from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { RegistryItem } from "@/lib/types";

interface ComponentPlaygroundProps {
  item: RegistryItem;
}

export function ComponentPlayground({ item }: ComponentPlaygroundProps) {
  const [selectedVariant, setSelectedVariant] = React.useState<string>("default");
  const [selectedSize, setSelectedSize] = React.useState<string>("default");
  const [isLoadingState, setIsLoadingState] = React.useState(false);
  const [isDisabledState, setIsDisabledState] = React.useState(false);
  const [viewportWidth, setViewportWidth] = React.useState<"100%" | "768px" | "390px">("100%");

  const renderComponentPreview = () => {
    switch (item.slug) {
      case "button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant={selectedVariant as any} size={selectedSize as any} isLoading={isLoadingState} disabled={isDisabledState}>
              Deploy Application
            </Button>
            <Button variant="outline" size={selectedSize as any} disabled={isDisabledState}>Cancel</Button>
            <Button variant="ghost" size={selectedSize as any} disabled={isDisabledState}>Learn More</Button>
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
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User Avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        );

      case "input":
        return (
          <div className="w-full max-w-sm space-y-3">
            <Input type="text" placeholder="Default text input..." disabled={isDisabledState} error={selectedVariant === "destructive"} />
            <Input type="email" placeholder="Email address..." disabled={isDisabledState} />
            <Input type="password" placeholder="Password..." disabled={isDisabledState} />
          </div>
        );

      case "switch":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch id="demo-switch-1" disabled={isDisabledState} />
              <label htmlFor="demo-switch-1" className="text-sm font-medium">Automatic Registry Sync</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-switch-2" defaultChecked disabled={isDisabledState} />
              <label htmlFor="demo-switch-2" className="text-sm font-medium">Dark Mode</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-switch-3" disabled />
              <label htmlFor="demo-switch-3" className="text-sm font-medium text-muted-foreground">Disabled Option</label>
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
              <p className="text-sm text-muted-foreground">Includes 100% source ownership and CLI offline bundle support.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={selectedVariant as any}>Get Started</Button>
            </CardFooter>
          </Card>
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
                { key: "status", header: "Status", render: (row: any) => <Badge variant="success">{row.status}</Badge> }
              ]}
              pageSize={3}
            />
          </div>
        );

      case "dialog":
        return (
          <div className="flex flex-wrap gap-3">
            <div className="p-6 rounded-xl border border-border bg-card shadow-lg max-w-sm w-full space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Confirm Publication</h3>
                <p className="text-sm text-muted-foreground mt-1">Are you sure you want to publish button@1.2.0 to the public registry?</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Publish</Button>
              </div>
            </div>
          </div>
        );

      case "ai-chat":
        return (
          <div className="w-full max-w-2xl space-y-2 rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary text-xs">✦</div>
              <div>
                <div className="text-sm font-semibold">ComponentOS Assistant</div>
                <div className="text-xs text-muted-foreground">Generative Component Architect</div>
              </div>
              <Badge variant="success" className="ml-auto text-[10px]">Active</Badge>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted border border-border rounded-xl rounded-tl-none px-3 py-2 text-sm max-w-xs">
                  Hello! I can help you select and install components for your project.
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-xl rounded-tr-none px-3 py-2 text-sm max-w-xs">
                  npx componentos add data-table
                </div>
                <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex gap-2 p-3 border-t border-border">
              <Input placeholder="Ask anything about components..." className="text-xs" />
              <Button size="sm" className="shrink-0">Send</Button>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="w-full border border-border rounded-xl overflow-hidden" style={{ height: "360px" }}>
            <div className="flex h-full">
              <div className="w-44 bg-card border-r border-border p-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 font-bold text-sm mb-3">
                  <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-black text-xs">C</div>
                  ComponentOS
                </div>
                {["Overview","Components","Authors","Settings"].map((item, i) => (
                  <div key={item} className={`px-2 py-1.5 rounded text-xs font-medium ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"}`}>{item}</div>
                ))}
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">Platform Overview</div>
                    <div className="text-xs text-muted-foreground">Registry metrics</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-7">Export</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[["Components","128","+14","emerald"],["CLI Downloads","48.2k","+24%","emerald"],["Uptime","99.99%","Stable","cyan"],["Authors","18","Active","amber"]].map(([label, val, sub, color]) => (
                    <Card key={label} className="p-3">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="text-lg font-bold mt-0.5">{val}</div>
                      <div className={`text-xs text-${color}-500 mt-0.5`}>{sub}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "spotlight-card":
        return (
          <div className="p-6 rounded-2xl border border-border bg-card shadow-lg max-w-sm space-y-2 text-center">
            <div className="text-sm font-bold">Spotlight FX Card</div>
            <p className="text-xs text-muted-foreground">Hover to reveal interactive radial mouse spotlight.</p>
          </div>
        );

      case "kanban-board":
        return (
          <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
            <div className="p-3 rounded-lg border border-border bg-muted/40 space-y-2">
              <div className="text-xs font-bold">To Do (2)</div>
              <div className="p-2 rounded bg-card text-xs border border-border">OTP Input Primitive</div>
              <div className="p-2 rounded bg-card text-xs border border-border">Color Picker API</div>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/40 space-y-2">
              <div className="text-xs font-bold">In Progress (1)</div>
              <div className="p-2 rounded bg-card text-xs border border-border">Framer Motion FX</div>
            </div>
          </div>
        );

      case "stepper":
        return (
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-primary"><span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span> Init CLI</div>
            <div className="h-0.5 w-8 bg-primary" />
            <div className="flex items-center gap-1.5 text-primary"><span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span> Install</div>
            <div className="h-0.5 w-8 bg-muted" />
            <div className="flex items-center gap-1.5 text-muted-foreground"><span className="h-6 w-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</span> Build</div>
          </div>
        );

      case "shimmer-text":
        return (
          <span className="font-bold text-2xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-pulse">
            ComponentOS Shimmer FX
          </span>
        );

      case "bento-grid":
        return (
          <div className="grid grid-cols-2 gap-2 w-full max-w-md">
            <div className="p-4 rounded-xl border border-border bg-card col-span-2 text-xs font-bold">Featured Primitive Stack</div>
            <div className="p-3 rounded-xl border border-border bg-card text-xs">Accessibility AA</div>
            <div className="p-3 rounded-xl border border-border bg-card text-xs">CLI Powered</div>
          </div>
        );

      case "glass-card":
        return (
          <div className="p-6 rounded-2xl border border-white/20 bg-background/40 backdrop-blur-xl text-center space-y-1 shadow-2xl">
            <div className="text-sm font-bold">Glassmorphism UI</div>
            <div className="text-xs text-muted-foreground">Backdrop filter & translucent border</div>
          </div>
        );

      case "ai-prompt-input":
        return (
          <div className="w-full max-w-md p-3 rounded-xl border border-primary/30 bg-card space-y-2">
            <div className="text-xs text-muted-foreground">Ask AI to generate a component...</div>
            <div className="flex justify-between items-center pt-2 border-t border-border text-[10px]">
              <span className="text-primary font-bold">✦ ComponentOS AI</span>
              <Button size="sm" className="h-6 text-[10px] px-2">Submit</Button>
            </div>
          </div>
        );

      case "code-block":
        return (
          <div className="w-full max-w-md p-3 rounded-xl border border-border bg-slate-950 font-mono text-xs text-slate-200">
            <span className="text-emerald-400">$ npx componentos add button</span>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-4">
            <Button variant={selectedVariant as any} size={selectedSize as any} disabled={isDisabledState}>
              {item.title}
            </Button>
            <p className="text-xs text-muted-foreground">Live interactive preview for {item.title}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30 text-xs">
        {/* Viewport selector */}
        <div className="flex items-center gap-1 bg-background p-1 rounded-md border border-border">
          {([["100%","Desktop",<Monitor key="m" className="h-3.5 w-3.5"/>],["768px","768px",<Tablet key="t" className="h-3.5 w-3.5"/>],["390px","390px",<Smartphone key="s" className="h-3.5 w-3.5"/>]] as const).map(([w, label, icon]) => (
            <button
              key={String(w)}
              onClick={() => setViewportWidth(w)}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors font-medium ${viewportWidth === w ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {item.variants && item.variants.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Variant:</span>
              <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} className="bg-background border border-border rounded px-2 py-1 outline-none text-xs">
                {item.variants.map((v) => <option key={v.name} value={v.name}>{v.label}</option>)}
              </select>
            </div>
          )}
          {item.sizes && item.sizes.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Size:</span>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="bg-background border border-border rounded px-2 py-1 outline-none text-xs">
                {item.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
          {["button","input","switch"].includes(item.slug) && (
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={isDisabledState} onChange={(e) => setIsDisabledState(e.target.checked)} className="rounded border-input h-3 w-3" />
              <span>Disabled</span>
            </label>
          )}
          {item.slug === "button" && (
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={isLoadingState} onChange={(e) => setIsLoadingState(e.target.checked)} className="rounded border-input h-3 w-3" />
              <span>Loading</span>
            </label>
          )}
        </div>
      </div>

      {/* Preview Pane */}
      <div className="flex justify-center items-center bg-card rounded-xl border border-border min-h-[240px] p-8 overflow-auto">
        <div style={{ width: viewportWidth }} className="flex items-center justify-center transition-all duration-300">
          {renderComponentPreview()}
        </div>
      </div>
    </div>
  );
}
