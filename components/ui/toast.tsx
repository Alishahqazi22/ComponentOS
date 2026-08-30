"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
}

export interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-card text-card-foreground shadow-xl animate-in slide-in-from-bottom-5 duration-300",
            t.type === "success" && "border-emerald-500/40 bg-emerald-500/5",
            t.type === "error" && "border-rose-500/40 bg-rose-500/5"
          )}
        >
          {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
          {t.type === "error" && <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />}
          {(!t.type || t.type === "info") && <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{t.title}</h4>
            {t.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.description}</p>}
          </div>
          <button onClick={() => onDismiss(t.id)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
