"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";

export function ImageComparison() {
  const [sliderPos, setSliderPos] = React.useState(50);

  return (
    <div className="relative w-full max-w-lg h-64 rounded-xl border border-border overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-950 flex items-center justify-center text-white font-bold text-lg">
        Dark Theme Mode
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-indigo-100 flex items-center justify-center text-slate-900 font-bold text-lg overflow-hidden border-r-2 border-primary"
        style={{ width: `${sliderPos}%` }}
      >
        Light Theme Mode
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
      />
    </div>
  );
}
