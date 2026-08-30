import * as React from "react";
import Link from "next/link";
import { Terminal, Shield, Sparkles, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 text-card-foreground py-12 px-4 mt-20">
      <div className="container max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-base">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-black text-xs">
              C
            </div>
            <span>ComponentOS</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The open component infrastructure for modern web applications. Copy source code directly into your codebase with 100% ownership and zero npm lock-in.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>MIT License • WCAG 2.2 AA Compliant</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Taxonomy</h4>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li><Link href="/components?category=micro" className="hover:text-foreground">Micro Primitives</Link></li>
            <li><Link href="/components?category=forms" className="hover:text-foreground">Form Primitives</Link></li>
            <li><Link href="/components?category=data-display" className="hover:text-foreground">Data Display</Link></li>
            <li><Link href="/components?category=ai" className="hover:text-foreground">AI Components</Link></li>
            <li><Link href="/blocks" className="hover:text-foreground">Multi-Component Blocks</Link></li>
            <li><Link href="/templates" className="hover:text-foreground">Page Templates</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">CLI & Registry</h4>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li><Link href="/docs/installation" className="hover:text-foreground">Quickstart Installation</Link></li>
            <li><Link href="/docs/cli" className="hover:text-foreground">CLI Command Suite</Link></li>
            <li><Link href="/docs/theming" className="hover:text-foreground">Design Token Specification</Link></li>
            <li><Link href="/changelog" className="hover:text-foreground">Changelog & Semantic Versioning</Link></li>
            <li><a href="https://registry.componentos.dev" target="_blank" rel="noreferrer" className="hover:text-foreground">Public Registry CDN API</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Community & Admin</h4>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li><Link href="/dashboard" className="hover:text-foreground">User Dashboard & Favorites</Link></li>
            <li><Link href="/admin" className="hover:text-foreground">Admin Publishing Portal</Link></li>
            <li><Link href="/docs/contributing" className="hover:text-foreground">Authoring Guidelines</Link></li>
            <li>
              <a href="https://github.com/componentos/componentos" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground">
                <Github className="h-3.5 w-3.5" /> GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container max-w-screen-2xl mx-auto border-t border-border/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 px-4">
        <p>© 2026 ComponentOS Platform. Designed for modern high-performance Web Apps.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Developers & Designers worldwide.
        </p>
      </div>
    </footer>
  );
}
