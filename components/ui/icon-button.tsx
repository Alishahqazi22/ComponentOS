"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className, size = "icon", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("shrink-0", className)}
        aria-label={label}
        {...props}
      >
        {icon}
        {children && <span className="sr-only">{children}</span>}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";
