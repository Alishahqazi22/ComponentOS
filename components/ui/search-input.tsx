"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "@/components/ui/input";

export interface SearchInputProps extends InputProps {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, placeholder = "Search...", ...props }, ref) => {
    const isClearable = Boolean(value);

    return (
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn("pl-9 pr-9", className)}
          {...props}
        />
        {isClearable && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
