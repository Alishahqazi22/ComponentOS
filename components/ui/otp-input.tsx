"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function OTPInput({ length = 6, value = "", onChange, className }: OTPInputProps) {
  const [digits, setDigits] = React.useState<string[]>(
    Array.from({ length }, (_, i) => value[i] || "")
  );
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const lastChar = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    setDigits(newDigits);
    onChange?.(newDigits.join(""));

    if (lastChar && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-12 w-10 text-center text-lg font-bold rounded-md border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      ))}
    </div>
  );
}
