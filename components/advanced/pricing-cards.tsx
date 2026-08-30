"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PricingCards() {
  const tiers = [
    { name: "Free Community", price: "$0", features: ["100% Code Ownership", "Basic UI Primitives", "Community Support"], popular: false },
    { name: "Pro Ecosystem", price: "$29", features: ["Full 80+ Component Suite", "Advanced Data Tables", "Framer Motion FX", "Priority Updates"], popular: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
      {tiers.map((tier) => (
        <Card key={tier.name} className={`p-5 space-y-4 relative ${tier.popular ? "border-primary shadow-lg ring-1 ring-primary" : ""}`}>
          {tier.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
          <div>
            <h4 className="font-bold text-base">{tier.name}</h4>
            <div className="text-3xl font-extrabold mt-2">{tier.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {tier.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button variant={tier.popular ? "default" : "outline"} className="w-full text-xs font-bold">
            Get Started
          </Button>
        </Card>
      ))}
    </div>
  );
}
