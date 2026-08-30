"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
}

export function NumberInput({
  value = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  className,
  disabled,
  ...props
}: NumberInputProps) {
  const [val, setVal] = React.useState(value);

  const updateVal = (newVal: number) => {
    const clamped = Math.min(max, Math.max(min, newVal));
    setVal(clamped);
    onChange?.(clamped);
  };

  return (
    <div className={cn("inline-flex items-center rounded-md border border-input shadow-sm", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-r-none border-r border-input"
        disabled={disabled || val <= min}
        onClick={() => updateVal(val - step)}
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <Input
        type="number"
        value={val}
        onChange={(e) => updateVal(Number(e.target.value))}
        className="h-9 border-0 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0"
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-l-none border-l border-input"
        disabled={disabled || val >= max}
        onClick={() => updateVal(val + step)}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
