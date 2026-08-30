"use client";

import * as React from "react";
import { UploadCloud, File, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({ onFilesSelected, maxFiles = 3, accept, className }: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).slice(0, maxFiles);
      setFiles(selected);
      onFilesSelected?.(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const dropped = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles(dropped);
      onFilesSelected?.(dropped);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected?.(updated);
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center",
          isDragging
            ? "border-primary bg-primary/10 scale-[0.99]"
            : "border-border bg-card hover:bg-accent/40"
        )}
      >
        <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max {maxFiles} files)</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/30 text-xs">
              <div className="flex items-center gap-2 truncate">
                <File className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium truncate">{file.name}</span>
                <span className="text-muted-foreground font-mono">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
