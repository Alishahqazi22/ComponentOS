"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5",
        success: "border-emerald-500/50 text-emerald-600 bg-emerald-500/5 [&>svg]:text-emerald-600",
        warning: "border-amber-500/50 text-amber-600 bg-amber-500/5 [&>svg]:text-amber-600",
        info: "border-blue-500/50 text-blue-600 bg-blue-500/5 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

export function Alert({ className, variant, icon, children, ...props }: AlertProps) {
  const defaultIcon = {
    default: <Info className="h-4 w-4" />,
    destructive: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  }[variant || "default"];

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon || defaultIcon}
      {children}
    </div>
  );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-semibold leading-none tracking-tight text-sm", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn("text-xs opacity-90 leading-relaxed", className)} {...props} />;
}
