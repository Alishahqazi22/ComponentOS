"use client";

import * as React from "react";
import { Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface KanbanCard {
  id: string;
  title: string;
  tag?: string;
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export function KanbanBoard() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>([
    {
      id: "todo",
      title: "To Do",
      cards: [
        { id: "1", title: "Add OTP Input Primitive", tag: "Forms" },
        { id: "2", title: "Design System Tokens", tag: "Foundation" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [
        { id: "3", title: "Framer Motion Integration", tag: "Animation" },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        { id: "4", title: "CLI Package Resolver", tag: "CLI" },
      ],
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {columns.map((col) => (
        <div key={col.id} className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-xs">
          <div className="flex items-center justify-between font-bold text-sm">
            <span className="flex items-center gap-2">
              {col.title}
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-mono">
                {col.cards.length}
              </span>
            </span>
            <button className="text-muted-foreground hover:text-foreground">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {col.cards.map((card) => (
              <div
                key={card.id}
                className="p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-all shadow-xs space-y-2 cursor-grab"
              >
                <div className="text-xs font-semibold">{card.title}</div>
                {card.tag && (
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {card.tag}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
