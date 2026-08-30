"use client";

import * as React from "react";
import { Sparkles, Play, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShimmerText } from "@/components/animated/shimmer-text";
import { TypewriterText } from "@/components/animated/typewriter-text";
import { NumberCounter } from "@/components/animated/number-counter";
import { InfiniteMarquee } from "@/components/animated/infinite-marquee";
import { SpotlightCard } from "@/components/unique/spotlight-card";
import { GlowCard } from "@/components/unique/glow-card";
import { GlassCard } from "@/components/unique/glass-card";
import { MagneticButton } from "@/components/unique/magnetic-button";
import { RippleButton } from "@/components/unique/ripple-button";
import { FadeTransition, SlideTransition, ScaleTransition } from "@/components/transitions/transitions";

export default function AnimationPage() {
  const [activeTab, setActiveTab] = React.useState<"all" | "fx" | "text" | "transitions">("all");

  return (
    <div className="container max-w-screen-xl mx-auto py-12 px-4 space-y-10">
      <div className="space-y-3">
        <Badge variant="outline" className="gap-1">
          <Sparkles className="h-3 w-3 text-amber-500" /> Framer Motion Suite
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Animated & Motion FX Suite</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Explore smooth, spring-physics-driven animations, text reveals, glow cards, magnetic buttons, and transition components.
        </p>
      </div>

      <InfiniteMarquee />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard>
          <h3 className="font-bold text-lg">Spotlight Mouse Glow</h3>
          <p className="text-xs text-muted-foreground mt-1">Move cursor over card to trigger dynamic radial spotlight effect.</p>
        </SpotlightCard>

        <GlowCard>
          <h3 className="font-bold text-lg">Animated Neon Glow</h3>
          <p className="text-xs text-muted-foreground mt-1">Multi-color background gradient blur effect.</p>
        </GlowCard>

        <GlassCard>
          <h3 className="font-bold text-lg">Glassmorphism Card</h3>
          <p className="text-xs text-muted-foreground mt-1">Backdrop-filter backdrop blur overlay with subtle border highlight.</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card className="p-6 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Shimmer Text FX</span>
            <div className="mt-2"><ShimmerText text="ComponentOS Shimmer" /></div>
          </div>
        </Card>

        <Card className="p-6 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Typewriter FX</span>
            <div className="mt-2"><TypewriterText text="npx componentos add spotlight-card" /></div>
          </div>
        </Card>

        <Card className="p-6 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Animated Counter</span>
            <div className="mt-2"><NumberCounter from={1000} to={48290} /></div>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 justify-center items-center">
        <MagneticButton>Magnetic Motion Button</MagneticButton>
        <RippleButton>Ripple Click Effect</RippleButton>
      </div>
    </div>
  );
}
