"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-1 text-xs", className)}>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-8 px-2"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Prev
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === currentPage ? "default" : "ghost"}
          size="sm"
          onClick={() => onPageChange(p)}
          className="h-8 w-8 p-0"
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-8 px-2"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
