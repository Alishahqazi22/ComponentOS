"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onToggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
