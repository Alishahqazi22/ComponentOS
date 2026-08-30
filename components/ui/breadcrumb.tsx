"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1.5 text-xs text-muted-foreground", className)}>
      <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-foreground truncate">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground transition-colors truncate">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
