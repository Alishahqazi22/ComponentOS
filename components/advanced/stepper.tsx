"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps?: StepItem[];
  currentStep?: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({
  steps = [
    { id: 1, title: "Initialize CLI", description: "npx componentos init" },
    { id: 2, title: "Select Components", description: "npx componentos add button" },
    { id: 3, title: "Build Application", description: "Import & customize" },
  ],
  currentStep = 2,
  onStepClick,
}: StepperProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      {steps.map((step, idx) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div
            key={step.id}
            onClick={() => onStepClick?.(step.id)}
            className={cn(
              "flex items-center gap-3 cursor-pointer group flex-1",
              idx < steps.length - 1 && "sm:after:content-[''] sm:after:flex-1 sm:after:h-px sm:after:bg-border sm:after:mx-2"
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all",
                isCompleted && "bg-emerald-500 text-white",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <div>
              <p className="text-xs font-semibold">{step.title}</p>
              {step.description && <p className="text-[11px] text-muted-foreground">{step.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
