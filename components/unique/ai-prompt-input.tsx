"use client";

import * as React from "react";
import { Sparkles, Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AIPromptInput({ onSend }: { onSend?: (prompt: string) => void }) {
  const [text, setText] = React.useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend?.(text);
    setText("");
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-3 shadow-xl focus-within:ring-2 focus-within:ring-primary/40 transition-all space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
        placeholder="Ask ComponentOS AI to generate UI primitives or layout templates..."
        className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-muted-foreground min-h-[60px]"
      />
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="p-1 rounded-md bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-mono text-[10px]">ComponentOS Turbo 3.5</span>
        </div>
        <Button size="sm" onClick={handleSend} className="h-8 px-3 gap-1 text-xs">
          <span>Send</span> <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
