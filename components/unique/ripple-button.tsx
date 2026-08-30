"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function RippleButton({
  className,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform active:scale-95",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 animate-ping pointer-events-none"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
    </button>
  );
}
