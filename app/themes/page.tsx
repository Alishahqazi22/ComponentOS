"use client";

import * as React from "react";
import { Palette, Copy, Check, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

type ColorTheme = "zinc" | "violet" | "emerald" | "amber" | "rose";

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = React.useState<ColorTheme>("zinc");
  const [radius, setRadius] = React.useState<string>("0.5rem");
  const [copied, setCopied] = React.useState(false);

  const themeCssVariables: Record<ColorTheme, string> = {
    zinc: `:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --ring: 240 5.9% 10%;
  --radius: ${radius};
}`,
    violet: `:root {
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 20% 98%;
  --ring: 262.1 83.3% 57.8%;
  --radius: ${radius};
}`,
    emerald: `:root {
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
  --ring: 142.1 76.2% 36.3%;
  --radius: ${radius};
}`,
    amber: `:root {
  --primary: 37.7 92.1% 50.2%;
  --primary-foreground: 48 96% 89%;
  --ring: 37.7 92.1% 50.2%;
  --radius: ${radius};
}`,
    rose: `:root {
  --primary: 346.8 77.2% 49.8%;
  --primary-foreground: 355.7 100% 97.3%;
  --ring: 346.8 77.2% 49.8%;
  --radius: ${radius};
}`
  };

  const copyCssTokens = () => {
    navigator.clipboard.writeText(themeCssVariables[activeTheme]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-screen-2xl mx-auto py-10 px-4 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Palette className="h-3.5 w-3.5" /> Design Token Engine
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Interactive Theme Generator</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Customize design tokens, primary color scales, and border radius. Copy generated CSS variables into your `globals.css`.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Theme Controls Column */}
        <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold">Theme Parameters</h2>

          {/* Color Preset Palette */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Primary Accent Color:</label>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setActiveTheme("zinc")}
                className={`h-10 rounded-lg bg-zinc-900 border-2 transition-all flex items-center justify-center ${activeTheme === "zinc" ? "border-primary ring-2 ring-primary/30" : "border-transparent"}`}
                title="Zinc"
              />
              <button
                onClick={() => setActiveTheme("violet")}
                className={`h-10 rounded-lg bg-violet-600 border-2 transition-all flex items-center justify-center ${activeTheme === "violet" ? "border-violet-500 ring-2 ring-violet-500/30" : "border-transparent"}`}
                title="Violet"
              />
              <button
                onClick={() => setActiveTheme("emerald")}
                className={`h-10 rounded-lg bg-emerald-600 border-2 transition-all flex items-center justify-center ${activeTheme === "emerald" ? "border-emerald-500 ring-2 ring-emerald-500/30" : "border-transparent"}`}
                title="Emerald"
              />
              <button
                onClick={() => setActiveTheme("amber")}
                className={`h-10 rounded-lg bg-amber-500 border-2 transition-all flex items-center justify-center ${activeTheme === "amber" ? "border-amber-500 ring-2 ring-amber-500/30" : "border-transparent"}`}
                title="Amber"
              />
              <button
                onClick={() => setActiveTheme("rose")}
                className={`h-10 rounded-lg bg-rose-600 border-2 transition-all flex items-center justify-center ${activeTheme === "rose" ? "border-rose-500 ring-2 ring-rose-500/30" : "border-transparent"}`}
                title="Rose"
              />
            </div>
          </div>

          {/* Radius Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Border Radius Preset:</label>
            <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
              {["0rem", "0.3rem", "0.5rem", "0.75rem"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`py-1.5 rounded border transition-colors ${radius === r ? "bg-primary text-primary-foreground font-bold border-primary" : "bg-muted text-muted-foreground hover:bg-accent"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Copy CSS Button */}
          <Button onClick={copyCssTokens} className="w-full gap-2">
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "CSS Variables Copied!" : "Copy Theme CSS Variables"}
          </Button>
        </div>

        {/* Live Styled Preview Box */}
        <div className={`md:col-span-2 space-y-4 theme-${activeTheme}`}>
          <h2 className="text-base font-bold">Live Theme Component Preview</h2>

          <div className="rounded-xl border border-border bg-card p-8 space-y-6 shadow-md transition-all">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary Action</Button>
              <Button variant="outline">Outline Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Badge variant="default">Theme Active</Badge>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <Input placeholder="Theme styled input field..." />
              <div className="flex items-center gap-3">
                <Switch id="theme-switch" defaultChecked />
                <label htmlFor="theme-switch" className="text-sm font-semibold">Enable Custom Token Preset</label>
              </div>
            </div>

            {/* Generated CSS Variables Display */}
            <div className="rounded-lg border border-border bg-slate-950 p-4 font-mono text-xs text-cyan-400 overflow-x-auto whitespace-pre">
              {themeCssVariables[activeTheme]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
