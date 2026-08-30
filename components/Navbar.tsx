"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Terminal, Moon, Sun, Github, Layers, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export function Navbar({ onOpenCommandPalette, onToggleTheme, isDark }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/components", label: "Components" },
    { href: "/categories", label: "Categories" },
    { href: "/animation", label: "Animation" },
    { href: "/blocks", label: "Blocks" },
    { href: "/templates", label: "Templates" },
    { href: "/examples", label: "Examples" },
    { href: "/docs", label: "Docs" },
    { href: "/changelog", label: "Changelog" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight hover:opacity-90 transition-opacity">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs shadow-sm">
              C
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-extrabold">
              ComponentOS
            </span>
            <span className="hidden sm:inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              v1.2.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2">
          {/* ⌘K Search Command Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 rounded-md border border-input bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-48 md:w-60 justify-between shadow-xs"
          >
            <span className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" />
              Search components...
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* External GitHub */}
          <a
            href="https://github.com/Alishahqazi22/ComponentOS.git"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="flex w-full items-center justify-between rounded-md border border-input bg-muted/40 px-3 py-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" />
              Search components...
            </span>
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>

          <nav className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-accent text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
