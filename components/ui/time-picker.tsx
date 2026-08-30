"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

export function TimePicker({ value = "12:00", onChange, className }: TimePickerProps) {
  const [selected, setSelected] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={cn("relative inline-flex items-center w-full max-w-xs", className)}>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal h-9",
          !selected && "text-muted-foreground"
        )}
      >
        <Clock className="mr-2 h-4 w-4" />
        {selected ? selected : "Select time..."}
      </Button>
      <input
        type="time"
        value={selected}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
    </div>
  );
}
