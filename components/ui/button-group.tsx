"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "outline" | "secondary";
}

export function ButtonGroup({
  className,
  orientation = "horizontal",
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex rounded-md shadow-sm",
        orientation === "horizontal"
          ? "flex-row [&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:-ml-px"
          : "flex-col [&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none [&>button:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
