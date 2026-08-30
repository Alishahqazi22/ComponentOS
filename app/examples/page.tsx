"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Layout, Terminal, Sparkles, Shield, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIChatBlock } from "@/components/blocks/ai-chat";
import { DashboardTemplate } from "@/components/templates/dashboard";

export default function ExamplesPage() {
  return (
    <div className="container max-w-screen-xl mx-auto py-12 px-4 space-y-12">
      <div className="space-y-3">
        <Badge variant="outline">Real-World Applications</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Production Examples</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          See how ComponentOS UI primitives, compound blocks, and page templates combine to create real-world web applications.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">1. Generative AI Chat Assistant Interface</h2>
          <p className="text-xs text-muted-foreground">Built using Button, Input, Avatar, Badge, and Framer Motion streaming response state.</p>
          <div className="border border-border rounded-xl p-4 bg-muted/20 flex justify-center">
            <AIChatBlock />
          </div>
        </div>

        <div className="space-y-4 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold tracking-tight">2. Admin Dashboard & Metrics Platform</h2>
          <p className="text-xs text-muted-foreground">Built using Card, StatCard, DataTable, Badge, and NavigationSidebar.</p>
          <div className="border border-border rounded-xl overflow-hidden shadow-2xl h-[480px]">
            <DashboardTemplate />
          </div>
        </div>
      </div>
    </div>
  );
}
