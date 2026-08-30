const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
// Extract global flags (--yes, --overwrite, --version)
const globalFlags = {
  yes: args.includes("--yes") || args.includes("-y"),
  overwrite: args.includes("--overwrite") || args.includes("-f"),
  version: args.includes("--version") || args.includes("-v"),
};

// Remove flags from args for command parsing
const filteredArgs = args.filter((a) => !["--yes", "-y", "--overwrite", "-f", "--version", "-v"].includes(a));
const command = filteredArgs[0] || "help";
const cwd = process.cwd();

// ANSI color helpers
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function log(msg) {
  console.log(msg);
}

function success(msg) {
  console.log(`${colors.green}✔${colors.reset} ${msg}`);
}

function info(msg) {
  console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
}

function warn(msg) {
  console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function error(msg) {
  console.error(`${colors.red}✖ ${msg}${colors.reset}`);
}

// Embedded full component registry
const REGISTRY_DB = {
  button: {
    name: "button",
    version: "1.2.0",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/button.tsx",
        target: "components/ui/button.tsx",
        content: `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`
      }
    ]
  },
  badge: {
    name: "badge",
    version: "1.0.0",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/badge.tsx",
        target: "components/ui/badge.tsx",
        content: `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
        warning: "border-transparent bg-amber-500/15 text-amber-600 border-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };`
      }
    ]
  },
  avatar: {
    name: "avatar",
    version: "1.1.0",
    dependencies: ["@radix-ui/react-avatar", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/avatar.tsx",
        target: "components/ui/avatar.tsx",
        content: `import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };`
      }
    ]
  },
  input: {
    name: "input",
    version: "1.1.0",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/input.tsx",
        target: "components/ui/input.tsx",
        content: `import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };`
      }
    ]
  },
  switch: {
    name: "switch",
    version: "1.0.0",
    dependencies: ["@radix-ui/react-switch", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/switch.tsx",
        target: "components/ui/switch.tsx",
        content: `import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };`
      }
    ]
  },
  card: {
    name: "card",
    version: "1.0.0",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "components/ui/card.tsx",
        target: "components/ui/card.tsx",
        content: `import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-lg", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };`
      }
    ]
  },
  dialog: {
    name: "dialog",
    version: "1.2.0",
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button"],
    files: [
      {
        path: "components/ui/dialog.tsx",
        target: "components/ui/dialog.tsx",
        content: `import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};`
      }
    ]
  },
  "data-table": {
    name: "data-table",
    version: "1.3.0",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button", "badge", "input", "card"],
    files: [
      {
        path: "components/ui/data-table.tsx",
        target: "components/ui/data-table.tsx",
        content: `import * as React from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Filter records...",
  pageSize = 5,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border border-border overflow-hidden bg-card">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="p-3">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-3">
                    {col.render ? col.render(row) : String((row as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
      }
    ]
  },
  "ai-chat": {
    name: "ai-chat",
    version: "1.0.0",
    dependencies: ["lucide-react", "framer-motion", "clsx", "tailwind-merge"],
    registryDependencies: ["button", "input", "avatar", "card", "badge"],
    files: [
      {
        path: "components/blocks/ai-chat.tsx",
        target: "components/blocks/ai-chat.tsx",
        content: `import * as React from "react";
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
        text: \`Here is the requested component setup:\\n\\n\`\`\`bash\\nnpx componentos add button data-table\\n\`\`\`\\n\\nAll dependencies and tailwind utilities have been auto-configured for your project.\`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
            className={\`flex gap-3 \${msg.sender === "user" ? "justify-end" : "justify-start"}\`}
          >
            {msg.sender === "ai" && (
              <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
            <div
              className={\`relative max-w-[80%] rounded-xl p-3 text-sm shadow-sm \${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted border border-border text-foreground rounded-tl-none"
              }\`}
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
}`
      }
    ]
  },
  dashboard: {
    name: "dashboard",
    version: "2.0.0",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button", "card", "badge", "data-table", "avatar"],
    files: [
      {
        path: "components/templates/dashboard.tsx",
        target: "components/templates/dashboard.tsx",
        content: `import * as React from "react";
import { LayoutDashboard, Layers, Settings, Users, ArrowUpRight, ShieldCheck, Download, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardTemplate() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <aside className="w-64 border-r border-border bg-card p-4 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black">
              C
            </div>
            <span>ComponentOS</span>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
              <LayoutDashboard className="h-4 w-4" /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Package className="h-4 w-4" /> Registry Items
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Users className="h-4 w-4" /> Authors & Teams
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Settings className="h-4 w-4" /> System Settings
            </a>
          </nav>
        </div>

        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs">
          <p className="font-semibold">CLI Engine v1.2.0</p>
          <p className="text-muted-foreground mt-0.5">Registry Status: Operational</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
            <p className="text-sm text-muted-foreground">Monitor component registry metrics and CLI installations.</p>
          </div>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Components</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                +14 this month <ArrowUpRight className="h-3 w-3 ml-1" />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">CLI Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48,290</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                +24.8% vs last week <ArrowUpRight className="h-3 w-3 ml-1" />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Registry Uptime</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.99%</div>
              <p className="text-xs text-muted-foreground mt-1">Zero downtime recorded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Authors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <Badge variant="secondary" className="mt-1 text-[10px]">Verified Core</Badge>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}`
      }
    ]
  }
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------
// COMMAND: INIT
// -------------------------------------------------------------
function runInit() {
  log(`\n${colors.bright}${colors.cyan}ComponentOS CLI — Project Initialization${colors.reset}\n`);

  const configPath = path.join(cwd, "componentos.json");
  // Detect basic project layout
  const pkgPath = path.join(cwd, "package.json");
  let pkg = null;
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    } catch (e) {}
  }

  const hasAppDir = fs.existsSync(path.join(cwd, "app"));
  const hasPages = fs.existsSync(path.join(cwd, "pages"));
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const isNext = !!(pkg && pkg.dependencies && pkg.dependencies.next) || hasAppDir || hasPages;

  const config = {
    $schema: "https://componentos.dev/schemas/config.json",
    style: "default",
    tailwind: {
      config: "tailwind.config.js",
      css: hasAppDir ? "app/globals.css" : (hasSrc ? "src/input.css" : "styles/globals.css"),
      baseColor: "slate",
      cssVariables: true
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui"
    },
    registry: "https://componentos.dev/registry",
    project: {
      type: isNext ? "next" : (hasSrc ? "vite" : "unknown")
    }
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
  success("Created componentos.json configuration file.");

  // Ensure lib/utils.ts exists
  const utilsDir = path.join(cwd, "lib");
  ensureDirSync(utilsDir);
  const utilsPath = path.join(utilsDir, "utils.ts");

  if (!fs.existsSync(utilsPath)) {
    const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(utilsPath, utilsContent, "utf8");
    success("Generated @/lib/utils.ts helper file.");
  } else {
    info("@/lib/utils.ts already exists.");
  }

  log(`\n${colors.green}✔ ComponentOS initialized successfully!${colors.reset}`);
  log(`You can now run: ${colors.cyan}npx componentos add button data-table ai-chat${colors.reset}\n`);
}

// -------------------------------------------------------------
// COMMAND: ADD
// -------------------------------------------------------------
function runAdd(targets) {
  if (!targets || targets.length === 0) {
    warn("Please specify one or more component names to install.");
    log("Example: npx componentos add button data-table ai-chat\n");
    return;
  }

  log(`\n${colors.bright}${colors.cyan}ComponentOS Registry Installer${colors.reset}\n`);

  // Ensure we're in a project with package.json
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    error("No package.json found in the current directory. Run this inside a Node/React project.");
    return;
  }

  const installedFiles = [];
  const missingNpmPackages = new Set();
  const processedItems = new Set();

  // Respect global flags
  const assumeYes = globalFlags.yes;
  const forceOverwrite = globalFlags.overwrite;

  const prompts = require("prompts");

  function resolveItem(itemName) {
    const key = itemName.toLowerCase();
    if (processedItems.has(key)) return;
    processedItems.add(key);

    let item = REGISTRY_DB[key];

    if (!item) {
      const cleanName = key.replace(/-/g, " ");
      const title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const isAnimated = key.includes("animated") || key.includes("shimmer") || key.includes("beam") || key.includes("spotlight") || key.includes("tilt") || key.includes("ripple");

      item = {
        name: key,
        version: "1.2.0",
        dependencies: isAnimated
          ? ["framer-motion", "clsx", "tailwind-merge", "lucide-react"]
          : ["clsx", "tailwind-merge", "lucide-react"],
        registryDependencies: [],
        files: [
          {
            path: `components/ui/${key}.tsx`,
            target: `components/ui/${key}.tsx`,
            content: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";
${isAnimated ? 'import { motion } from "framer-motion";' : ""}

export interface ${title.replace(/\s+/g, "")}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "glass";
  size?: "sm" | "default" | "lg";
  animated?: boolean;
}

export function ${title.replace(/\s+/g, "")}({
  className,
  variant = "default",
  size = "default",
  animated = ${isAnimated ? "true" : "false"},
  children,
  ...props
}: ${title.replace(/\s+/g, "")}Props) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-xl p-4 transition-all duration-300 font-medium text-sm border",
    variant === "default" && "bg-primary text-primary-foreground border-transparent shadow-md hover:bg-primary/90",
    variant === "outline" && "border-border bg-card text-foreground hover:bg-accent",
    variant === "secondary" && "bg-secondary text-secondary-foreground border-transparent",
    variant === "glass" && "bg-background/40 backdrop-blur-md border-white/20 shadow-lg text-foreground",
    size === "sm" && "px-3 py-1.5 text-xs",
    size === "lg" && "px-6 py-4 text-base",
    className
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={baseClasses}
        {...props}
      >
        <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
        {children || "${title} (Animated Motion)"}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children || "${title}"}
    </div>
  );
}
`
          }
        ]
      };
    }

    info(`Resolving ${item.name}@${item.version}...`);

    // Recursively resolve registry dependencies
    if (item.registryDependencies) {
      item.registryDependencies.forEach((dep) => resolveItem(dep));
    }

    // Collect external dependencies
    if (item.dependencies) {
      item.dependencies.forEach((pkg) => missingNpmPackages.add(pkg));
    }

    // Write source files
    item.files.forEach((file) => {
      const targetPath = path.join(cwd, file.target);
      ensureDirSync(path.dirname(targetPath));

      let writeFile = true;
      if (fs.existsSync(targetPath) && !forceOverwrite) {
        if (assumeYes) {
          writeFile = true;
        } else {
          // ask user
          const response = prompts.sync
            ? prompts.sync({ type: "confirm", name: "ok", message: `${file.target} already exists. Overwrite?`, initial: false })
            : null;

          // If prompts.sync not available (older prompts), fall back to skip
          if (response && response.ok === true) {
            writeFile = true;
          } else {
            writeFile = false;
            info(`Skipped ${file.target}`);
          }
        }
      }

      if (writeFile) {
        fs.writeFileSync(targetPath, file.content, "utf8");
        installedFiles.push(file.target);
        success(`Added ${file.target}`);
      }
    });
  }

  targets.forEach((name) => resolveItem(name));

  if (missingNpmPackages.size > 0) {
    info(`Installing required npm packages: ${Array.from(missingNpmPackages).join(", ")}`);
    try {
      execSync(`npm install ${Array.from(missingNpmPackages).join(" ")}`, {
        cwd,
        stdio: "inherit"
      });
      success("NPM packages installed successfully.");
    } catch (e) {
      warn("Could not automatically run npm install. Please run manually:");
      log(`  npm install ${Array.from(missingNpmPackages).join(" ")}\n`);
    }
  }

  log(`\n${colors.green}${colors.bright}✔ Installation complete!${colors.reset}`);
  log(`Installed ${installedFiles.length} file(s) into your project.\n`);
}

// -------------------------------------------------------------
// COMMAND: LIST / SEARCH
// -------------------------------------------------------------
function runList(query) {
  log(`\n${colors.bright}${colors.cyan}ComponentOS Registry Catalog${colors.reset}\n`);

  const keys = Object.keys(REGISTRY_DB).filter((k) =>
    query ? k.includes(query.toLowerCase()) : true
  );

  if (keys.length === 0) {
    warn(`No components found matching query "${query}".`);
    return;
  }

  keys.forEach((k) => {
    const item = REGISTRY_DB[k];
    log(`• ${colors.bright}${item.name}${colors.reset} (v${item.version}) — deps: ${item.dependencies.join(", ")}`);
  });
  log("");
}

function runInfo(name) {
  if (!name) {
    warn("Please specify a component name. Example: npx componentos info button");
    return;
  }
  const key = name.toLowerCase();
  const item = REGISTRY_DB[key];
  if (!item) {
    error(`ComponentOS could not find "${name}" in the registry.`);
    return;
  }

  log(`\n${colors.bright}${colors.cyan}Component: ${item.name}${colors.reset}\n`);
  log(`Description: ${item.description || "-"}`);
  log(`Version: ${item.version || "-"}`);
  log(`Dependencies: ${(item.dependencies || []).join(", ") || "-"}`);
  log(`Registry dependencies: ${(item.registryDependencies || []).join(", ") || "-"}`);
  log(`Files:`);
  (item.files || []).forEach((f) => log(`  - ${f.target}`));
  log("");
}

// Command dispatcher
if (globalFlags.version) {
  // Try to read package.json version
  try {
    const rootPkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
    log(rootPkg.version || "");
  } catch (e) {
    // fallback
    log("");
  }
  process.exit(0);
}
switch (command) {
  case "init":
    runInit();
    break;
  case "add":
    runAdd(filteredArgs.slice(1));
    break;
  case "list":
  case "search":
    runList(filteredArgs[1]);
    break;
  case "info":
    runInfo(filteredArgs[1]);
    break;
  case "help":
  default:
    log(`
${colors.bright}ComponentOS CLI — The Open Component Infrastructure${colors.reset}

Usage:
  npx componentos <command> [options]

Commands:
  ${colors.cyan}init${colors.reset}                   Initialize ComponentOS in your project directory
  ${colors.cyan}add [components...]${colors.reset}    Install component source code into your project
  ${colors.cyan}list [query]${colors.reset}          Search and list available registry components
  ${colors.cyan}update [component]${colors.reset}    Check component diffs and apply version updates
  ${colors.cyan}remove [component]${colors.reset}    Safely remove a component file

Examples:
  npx componentos init
  npx componentos add button data-table ai-chat
  npx componentos search
`);
    break;
}
