import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "ComponentOS — The Open Component Infrastructure",
  description: "Production-ready open component infrastructure platform inspired by shadcn/ui. Source-based distribution, CLI ecosystem, and rich component taxonomy.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
