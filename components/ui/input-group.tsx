"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function InputGroup({ prefix, suffix, className, children, ...props }: InputGroupProps) {
  return (
    <div className={cn("relative flex items-center w-full", className)} {...props}>
      {prefix && (
        <span className="absolute left-3 flex items-center pointer-events-none text-muted-foreground text-sm">
          {prefix}
        </span>
      )}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              child.props.className,
              prefix && "pl-9",
              suffix && "pr-9"
            ),
          });
        }
        return child;
      })}
      {suffix && (
        <span className="absolute right-3 flex items-center pointer-events-none text-muted-foreground text-sm">
          {suffix}
        </span>
      )}
    </div>
  );
}
