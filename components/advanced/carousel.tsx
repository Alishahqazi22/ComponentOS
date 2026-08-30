"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Carousel() {
  const slides = [
    { title: "Essential Primitives", desc: "Buttons, inputs, dialogs & badges" },
    { title: "Advanced Components", desc: "Data tables, kanban boards & steppers" },
    { title: "Unique FX Cards", desc: "Spotlight cards, glass cards & bento grids" },
  ];
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="relative w-full max-w-md p-6 rounded-2xl border border-border bg-card shadow-lg text-center space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">{slides[current].title}</h3>
        <p className="text-xs text-muted-foreground">{slides[current].desc}</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-muted"}`}
            />
          ))}
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
