import * as React from "react";
import { Send, Bot, User, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  model?: string;
}

export function AIChatBlock() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am ComponentOS AI. How can I help you construct or customize your component ecosystem today?",
      timestamp: "10:42 AM",
      model: "ComponentOS Turbo 3.5"
    }
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Here is the requested component setup:\n\nnpx componentos add button data-table\n\nAll dependencies and tailwind utilities have been auto-configured for your project.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        model: "ComponentOS Turbo 3.5"
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[520px] w-full max-w-2xl rounded-xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">ComponentOS Assistant</h4>
            <p className="text-xs text-muted-foreground">Generative Component Architect</p>
          </div>
        </div>
        <Badge variant="success" className="text-[10px]">Connected</Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
            <div
              className={`relative max-w-[80%] rounded-xl p-3 text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted border border-border text-foreground rounded-tl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-border/40 text-[10px] text-muted-foreground">
                <span>{msg.timestamp}</span>
                {msg.sender === "ai" && (
                  <button
                    onClick={() => copyText(msg.id, msg.text)}
                    className="hover:text-foreground flex items-center gap-1"
                  >
                    {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </button>
                )}
              </div>
            </div>
            {msg.sender === "user" && (
              <Avatar className="h-8 w-8 bg-secondary text-secondary-foreground">
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
            <Bot className="h-4 w-4 animate-bounce text-primary" />
            ComponentOS AI is crafting component definition...
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border bg-background flex gap-2">
        <Input
          placeholder="Ask AI to generate a component or layout..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}