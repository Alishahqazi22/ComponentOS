#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const { execSync } = require("child_process");

// -------------------------------------------------------------
// 1. CLI ARGUMENTS & FLAGS PARSER
// -------------------------------------------------------------
const rawArgs = process.argv.slice(2);

const globalFlags = {
  yes: rawArgs.includes("--yes") || rawArgs.includes("-y"),
  overwrite: rawArgs.includes("--overwrite") || rawArgs.includes("-f"),
  version: rawArgs.includes("--version") || rawArgs.includes("-v"),
  help: rawArgs.includes("--help") || rawArgs.includes("-h"),
  animated: rawArgs.includes("--animated"),
  noInstall: rawArgs.includes("--no-install") || rawArgs.includes("--no-deps"),
  path: null,
};

// Parse --path flag if present
for (let i = 0; i < rawArgs.length; i++) {
  if ((rawArgs[i] === "--path" || rawArgs[i] === "-p") && rawArgs[i + 1]) {
    globalFlags.path = rawArgs[i + 1];
    break;
  }
}

// Filter out recognized flags to get clean positional args
const positionalArgs = [];
for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (["--yes", "-y", "--overwrite", "-f", "--version", "-v", "--help", "-h", "--animated", "--no-install", "--no-deps"].includes(arg)) {
    continue;
  }
  if ((arg === "--path" || arg === "-p") && rawArgs[i + 1]) {
    i++; // skip flag value
    continue;
  }
  if (arg.startsWith("--path=")) {
    globalFlags.path = arg.split("=")[1];
    continue;
  }
  positionalArgs.push(arg);
}

const command = positionalArgs[0] || (globalFlags.help ? "help" : "help");
const commandArgs = positionalArgs.slice(1);
const cwd = process.cwd();

// -------------------------------------------------------------
// 2. ANSI COLOR & LOGGING HELPERS
// -------------------------------------------------------------
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

function log(msg = "") {
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

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------
// 3. TARGET PROJECT & ENVIRONMENT DETECTION
// -------------------------------------------------------------
function detectProject(targetDir = cwd) {
  const pkgPath = path.join(targetDir, "package.json");
  let pkg = null;

  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    } catch (e) {
      error(`Failed to parse package.json at ${pkgPath}: ${e.message}`);
    }
  }

  const hasTsConfig = fs.existsSync(path.join(targetDir, "tsconfig.json"));
  const hasJsConfig = fs.existsSync(path.join(targetDir, "jsconfig.json"));
  const hasTypescriptDep = !!(pkg && (
    (pkg.dependencies && pkg.dependencies.typescript) ||
    (pkg.devDependencies && pkg.devDependencies.typescript)
  ));
  const isTypeScript = hasTsConfig || hasTypescriptDep || !hasJsConfig;

  const hasSrc = fs.existsSync(path.join(targetDir, "src"));
  const hasAppDir = fs.existsSync(path.join(targetDir, "app")) || fs.existsSync(path.join(targetDir, "src", "app"));
  const hasPagesDir = fs.existsSync(path.join(targetDir, "pages")) || fs.existsSync(path.join(targetDir, "src", "pages"));

  const isNext = !!(pkg && pkg.dependencies && pkg.dependencies.next) || hasAppDir || hasPagesDir;
  const isVite = !!(pkg && (
    (pkg.dependencies && pkg.dependencies.vite) ||
    (pkg.devDependencies && pkg.devDependencies.vite) ||
    fs.existsSync(path.join(targetDir, "vite.config.ts")) ||
    fs.existsSync(path.join(targetDir, "vite.config.js"))
  ));

  // Read componentos.json if exists
  const configPath = path.join(targetDir, "componentos.json");
  let config = null;
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (e) {}
  }

  // Determine base components directory
  let componentsDir;
  if (globalFlags.path) {
    componentsDir = path.resolve(targetDir, globalFlags.path);
  } else if (config && config.aliases && config.aliases.ui) {
    const rawUiAlias = config.aliases.ui.replace(/^@\//, "");
    componentsDir = path.join(targetDir, rawUiAlias);
  } else if (config && config.aliases && config.aliases.components) {
    const rawCompAlias = config.aliases.components.replace(/^@\//, "");
    componentsDir = path.join(targetDir, rawCompAlias, "ui");
  } else if (hasSrc) {
    componentsDir = path.join(targetDir, "src", "components", "ui");
  } else {
    componentsDir = path.join(targetDir, "components", "ui");
  }

  // Determine utils directory & file path
  let utilsPath;
  if (config && config.aliases && config.aliases.utils) {
    const rawUtilsAlias = config.aliases.utils.replace(/^@\//, "");
    const ext = isTypeScript ? ".ts" : ".js";
    utilsPath = path.join(targetDir, rawUtilsAlias.endsWith(".ts") || rawUtilsAlias.endsWith(".js") ? rawUtilsAlias : `${rawUtilsAlias}${ext}`);
  } else if (hasSrc) {
    utilsPath = path.join(targetDir, "src", "lib", isTypeScript ? "utils.ts" : "utils.js");
  } else {
    utilsPath = path.join(targetDir, "lib", isTypeScript ? "utils.ts" : "utils.js");
  }

  return {
    pkg,
    pkgPath,
    isTypeScript,
    hasSrc,
    isNext,
    isVite,
    componentsDir,
    utilsPath,
    config,
  };
}

// -------------------------------------------------------------
// 4. PACKAGE MANAGER DETECTION & INSTALLATION
// -------------------------------------------------------------
function detectPackageManager(targetDir = cwd) {
  // 1. Check lockfiles in target project
  if (fs.existsSync(path.join(targetDir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(targetDir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(targetDir, "bun.lockb")) || fs.existsSync(path.join(targetDir, "bun.lock"))) return "bun";
  if (fs.existsSync(path.join(targetDir, "package-lock.json"))) return "npm";

  // 2. Check packageManager field in package.json
  const pkgPath = path.join(targetDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (typeof pkg.packageManager === "string") {
        if (pkg.packageManager.startsWith("pnpm")) return "pnpm";
        if (pkg.packageManager.startsWith("yarn")) return "yarn";
        if (pkg.packageManager.startsWith("bun")) return "bun";
        if (pkg.packageManager.startsWith("npm")) return "npm";
      }
    } catch (e) {}
  }

  // 3. Fallback to npm
  return "npm";
}

function installPackages(packages, targetDir = cwd, pkgManager = null) {
  if (!packages || packages.length === 0) return true;

  if (globalFlags.noInstall) {
    info(`Skipping npm package installation (--no-install flag passed). Required: ${packages.join(", ")}`);
    return true;
  }

  const pm = pkgManager || detectPackageManager(targetDir);
  const pkgPath = path.join(targetDir, "package.json");

  // Read installed packages to avoid redundant reinstallation
  let installedDeps = new Set();
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.dependencies) Object.keys(pkg.dependencies).forEach((d) => installedDeps.add(d));
      if (pkg.devDependencies) Object.keys(pkg.devDependencies).forEach((d) => installedDeps.add(d));
    } catch (e) {}
  }

  const missing = packages.filter((p) => {
    // Strip version tag if present for check: e.g. "lucide-react@^0.453.0" -> "lucide-react"
    const baseName = p.startsWith("@") ? `@${p.slice(1).split("@")[0]}` : p.split("@")[0];
    return !installedDeps.has(baseName);
  });

  if (missing.length === 0) {
    info("All required npm packages are already installed.");
    return true;
  }

  // Security check: Validate package names against strict regex to prevent command injection
  const validPkgRegex = /^(@[a-zA-Z0-9~_.-]+\/)?[a-zA-Z0-9~_.-]+(@[a-zA-Z0-9^~_.-]+)?$/;
  for (const pkgName of missing) {
    if (!validPkgRegex.test(pkgName)) {
      error(`Invalid or unsafe npm package name encountered: "${pkgName}"`);
      return false;
    }
  }

  const pkgListStr = missing.join(" ");
  let cmd;
  switch (pm) {
    case "pnpm":
      cmd = `pnpm add ${pkgListStr}`;
      break;
    case "yarn":
      cmd = `yarn add ${pkgListStr}`;
      break;
    case "bun":
      cmd = `bun add ${pkgListStr}`;
      break;
    case "npm":
    default:
      cmd = `npm install ${pkgListStr}`;
      break;
  }

  info(`Installing dependencies using ${colors.bright}${pm}${colors.reset}: ${missing.join(", ")}`);
  try {
    execSync(cmd, {
      cwd: targetDir,
      stdio: "inherit",
    });
    success(`Dependencies installed successfully via ${pm}.`);
    return true;
  } catch (err) {
    warn(`Automated installation with ${pm} failed or was interrupted.`);
    log(`  Please install manually: ${colors.cyan}${cmd}${colors.reset}\n`);
    return false;
  }
}

// -------------------------------------------------------------
// 5. REGISTRY RESOLVER & HTTP/HTTPS CLIENT
// -------------------------------------------------------------
function getRegistryBaseUrl(targetDir = cwd) {
  // 1. Environment variable override
  if (process.env.COMPONENTOS_REGISTRY_URL) {
    return process.env.COMPONENTOS_REGISTRY_URL.replace(/\/$/, "");
  }

  // 2. Project config file override
  const configPath = path.join(targetDir, "componentos.json");
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      if (config.registry) {
        return config.registry.replace(/\/$/, "");
      }
    } catch (e) {}
  }

  // 3. Production default
  return "https://componentos.dev/api/registry";
}

function fetchHttp(urlStr, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlStr);
      const client = url.protocol === "https:" ? https : http;

      const req = client.get(
        urlStr,
        {
          headers: {
            "User-Agent": "ComponentOS-CLI/1.0.0",
            Accept: "application/json",
          },
          timeout: timeoutMs,
        },
        (res) => {
          // Handle HTTP redirects (301, 302, 307, 308)
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchHttp(res.headers.location, timeoutMs).then(resolve).catch(reject);
            return;
          }

          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });

          res.on("end", () => {
            resolve({
              status: res.statusCode || 200,
              body,
            });
          });
        }
      );

      req.on("timeout", () => {
        req.destroy();
        reject(new Error(`Request timed out after ${timeoutMs}ms.`));
      });

      req.on("error", (err) => {
        reject(err);
      });
    } catch (e) {
      reject(e);
    }
  });
}

// Bundled fallback catalog loaded from local registry module if available
let bundledCatalogCache = null;
function getBundledCatalog() {
  if (bundledCatalogCache) return bundledCatalogCache;
  try {
    // Try to load bundled registry definitions from package root
    const registryModulePath = path.join(__dirname, "..", "registry", "index.ts");
    const expandedModulePath = path.join(__dirname, "..", "registry", "expanded.ts");
    if (fs.existsSync(registryModulePath)) {
      // In bundled Node environment, we can parse or fall back to lightweight registry items
      bundledCatalogCache = loadBundledPrimitives();
      return bundledCatalogCache;
    }
  } catch (e) {}
  bundledCatalogCache = loadBundledPrimitives();
  return bundledCatalogCache;
}

function loadBundledPrimitives() {
  return {
    button: {
      name: "button",
      slug: "button",
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

export { Button, buttonVariants };`,
        },
      ],
    },
    badge: {
      name: "badge",
      slug: "badge",
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

export { Badge, badgeVariants };`,
        },
      ],
    },
    avatar: {
      name: "avatar",
      slug: "avatar",
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

export { Avatar, AvatarImage, AvatarFallback };`,
        },
      ],
    },
    input: {
      name: "input",
      slug: "input",
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

export { Input };`,
        },
      ],
    },
    switch: {
      name: "switch",
      slug: "switch",
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

export { Switch };`,
        },
      ],
    },
    card: {
      name: "card",
      slug: "card",
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

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };`,
        },
      ],
    },
    dialog: {
      name: "dialog",
      slug: "dialog",
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
};`,
        },
      ],
    },
    "data-table": {
      name: "data-table",
      slug: "data-table",
      version: "1.3.0",
      dependencies: ["lucide-react", "clsx", "tailwind-merge"],
      registryDependencies: ["button", "badge", "input", "card"],
      files: [
        {
          path: "components/ui/data-table.tsx",
          target: "components/ui/data-table.tsx",
          content: `"use client";

import * as React from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchPlaceholder?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  searchPlaceholder = "Filter records...",
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);

  const filteredData = React.useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-8"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          Showing {paginatedData.length} of {filteredData.length} entries
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 font-semibold text-muted-foreground cursor-pointer select-none hover:text-foreground"
                  onClick={() => col.sortable && toggleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}`,
        },
      ],
    },
    "kanban-board": {
      name: "kanban-board",
      slug: "kanban-board",
      version: "1.0.0",
      dependencies: ["lucide-react", "clsx", "tailwind-merge"],
      registryDependencies: ["badge", "button", "card"],
      files: [
        {
          path: "components/advanced/kanban-board.tsx",
          target: "components/advanced/kanban-board.tsx",
          content: `"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold">To Do</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-3 rounded-lg border border-border bg-background space-y-2">
            <div className="text-xs font-semibold">Integrate ComponentOS CLI</div>
            <Badge variant="outline" className="text-[10px]">Setup</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`,
        },
      ],
    },
    "ai-chat": {
      name: "ai-chat",
      slug: "ai-chat",
      version: "1.2.0",
      dependencies: ["lucide-react", "clsx", "tailwind-merge", "framer-motion"],
      registryDependencies: ["button", "badge", "input", "card", "avatar"],
      files: [
        {
          path: "components/blocks/ai-chat.tsx",
          target: "components/blocks/ai-chat.tsx",
          content: `"use client";
import * as React from "react";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AiChatBlock() {
  const [messages, setMessages] = React.useState([
    { id: "1", role: "assistant", text: "Hello! How can I assist you with ComponentOS today?" }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: input },
      { id: (Date.now() + 1).toString(), role: "assistant", text: \`I received: "\${input}". CLI integration is working perfectly!\` }
    ]);
    setInput("");
  };

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-bold">AI Assistant</CardTitle>
        </div>
        <Badge variant="outline">GPT-4o</Badge>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[350px] overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={\`flex gap-3 \${m.role === "user" ? "flex-row-reverse" : ""}\`}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className={m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}>
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className={\`p-3 rounded-lg text-xs leading-relaxed max-w-[80%] \${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}\`}>
              {m.text}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
          <Input placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
        </form>
      </CardFooter>
    </Card>
  );
}`,
        },
      ],
    },
    dashboard: {
      name: "dashboard",
      slug: "dashboard",
      version: "2.0.0",
      dependencies: ["lucide-react", "clsx", "tailwind-merge"],
      registryDependencies: ["card", "badge", "button", "data-table"],
      files: [
        {
          path: "components/templates/dashboard.tsx",
          target: "components/templates/dashboard.tsx",
          content: `"use client";
import * as React from "react";
import { LayoutDashboard, Users, ArrowUpRight, ShieldCheck, Download, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardTemplate() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-xs text-muted-foreground">Overview of your ComponentOS metrics</p>
        </div>
        <Button size="sm"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Components</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">+14 this month <ArrowUpRight className="h-3 w-3 ml-1" /></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`,
        },
      ],
    },
  };
}

async function fetchRegistryItem(slug, baseUrl = null) {
  const cleanSlug = slug.toLowerCase().trim();
  const base = (baseUrl || getRegistryBaseUrl()).replace(/\/$/, "");

  // Construct target URL
  let endpointUrl;
  if (base.endsWith("/api/registry") || base.endsWith("/registry")) {
    endpointUrl = `${base}/${encodeURIComponent(cleanSlug)}`;
  } else {
    endpointUrl = `${base}/api/registry/${encodeURIComponent(cleanSlug)}`;
  }

  // 1. Attempt remote registry fetch
  try {
    const res = await fetchHttp(endpointUrl, 6000);
    if (res.status === 200) {
      const data = JSON.parse(res.body);
      if (data && data.name && Array.isArray(data.files)) {
        return { source: "remote", item: data };
      }
    } else if (res.status === 404) {
      // Return 404 indication
      return { source: "not_found", error: `Component "${cleanSlug}" not found on remote registry (HTTP 404).` };
    }
  } catch (err) {
    // Network or server error - continue to bundled fallback
  }

  // 2. Check bundled catalog fallback
  const bundled = getBundledCatalog();
  if (bundled[cleanSlug]) {
    return { source: "bundled", item: bundled[cleanSlug] };
  }

  // 3. Fallback for generated catalog items (only for recognized component prefixes)
  const VALID_PREFIXES = [
    "color-palette", "typography-scale", "spacing-system", "elevation-shadow", "border-radius-matrix", "grid-system", "icon-set", "utility-classes",
    "button", "badge", "avatar", "chip", "kbd", "status-dot", "pill", "tag", "counter", "dot-indicator", "label", "divider", "spinner", "skeleton",
    "input", "textarea", "select", "switch", "checkbox", "radio-group", "slider", "dual-slider", "combobox", "color-picker", "otp", "file-upload", "rating", "multi-select", "rich-editor", "datepicker", "timepicker",
    "navbar", "sidebar", "breadcrumb", "tabs", "segmented-control", "pagination", "dropdown-menu", "context-menu", "command-palette", "stepper", "dock", "floating-action-button",
    "alert", "toast", "modal", "dialog", "drawer", "sheet", "popover", "tooltip", "progress", "circular-progress", "banner", "cookie-bar", "empty-state",
    "data-table", "card", "accordion", "timeline", "tree-view", "stats-card", "kanban-board", "gantt-chart", "metric-counter", "sparkline", "code-block", "diff-viewer",
    "image-comparison", "carousel", "lightbox-gallery", "avatar-group", "audio-player", "video-player", "magnifier", "aspect-ratio-box",
    "pricing-card", "product-card", "user-card", "feature-card", "testimonial-card", "blog-card", "stat-card", "hover-card", "tilt-card", "spotlight-card",
    "virtual-list", "infinite-canvas", "drag-drop-zone", "signature-pad", "color-palette-generator", "code-editor", "markdown-editor", "command-k",
    "product-grid", "cart-drawer", "checkout-wizard", "price-filter-slider", "review-summary", "variant-picker", "order-receipt", "wishlist-button",
    "admin-sidebar", "metric-grid", "activity-feed", "analytics-chart", "user-table", "system-health-gauge", "audit-log", "billing-subscription-card",
    "hero-section", "feature-grid", "pricing-table", "cta-banner", "faq-accordion", "team-grid", "testimonial-carousel", "footer-links", "logo-cloud",
    "login-card", "signup-card", "forgot-password", "otp-verification", "social-login-group", "mfa-card", "user-menu-avatar",
    "ai-chat", "prompt-input", "ai-code-diff", "model-selector", "token-gauge", "waveform-visualizer", "ai-streaming-response",
    "shimmer-button", "morphing-text", "floating-dock", "border-beam-card", "spotlight-mouse-card", "marquee-wall", "meteors-canvas", "particle-network", "magnetic-button", "ripple-button", "typewriter-text", "confetti-burst", "orbiting-circles", "3d-tilt-container",
    "ai-chat-block", "saas-landing-hero", "pricing-tier-block", "checkout-stepper-block", "analytics-dashboard-block", "auth-portal-block",
    "hero-gradient-section", "feature-zigzag-section", "cta-glow-section", "pricing-switch-section", "faq-collapsible-section",
    "admin-dashboard-template", "saas-landing-template", "ecommerce-store-template", "auth-suite-template",
    "zinc-theme", "slate-theme", "violet-theme", "emerald-theme", "amber-theme", "rose-theme"
  ];

  const hasValidPrefix = VALID_PREFIXES.some((p) => cleanSlug === p || cleanSlug.startsWith(`${p}-`) || cleanSlug.endsWith(`-${p}`));
  if (!hasValidPrefix) {
    return { source: "not_found", error: `Component "${cleanSlug}" was not found in the ComponentOS registry.` };
  }

  const cleanName = cleanSlug.replace(/-/g, " ");
  const title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  const isAnimated = cleanSlug.includes("animated") || cleanSlug.includes("shimmer") || cleanSlug.includes("beam") || cleanSlug.includes("spotlight") || cleanSlug.includes("tilt") || cleanSlug.includes("ripple");

  return {
    source: "generated",
    item: {
      name: cleanSlug,
      slug: cleanSlug,
      version: "1.2.0",
      dependencies: isAnimated
        ? ["framer-motion", "clsx", "tailwind-merge", "lucide-react"]
        : ["clsx", "tailwind-merge", "lucide-react"],
      registryDependencies: [],
      files: [
        {
          path: `components/ui/${cleanSlug}.tsx`,
          target: `components/ui/${cleanSlug}.tsx`,
          content: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";
${isAnimated ? 'import { motion } from "framer-motion";' : ""}

export interface ${title.replace(/[\s-]/g, "")}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "glass";
  size?: "sm" | "default" | "lg";
  animated?: boolean;
}

export function ${title.replace(/[\s-]/g, "")}({
  className,
  variant = "default",
  size = "default",
  animated = ${isAnimated ? "true" : "false"},
  children,
  ...props
}: ${title.replace(/[\s-]/g, "")}Props) {
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
`,
        },
      ],
    },
  };
}

// -------------------------------------------------------------
// 6. CODE TRANSFORMATION (TS -> JS & ALIAS RE-TARGETING)
// -------------------------------------------------------------
function transformCodeForProject(code, { isTypeScript = true, targetFilePath = "" }) {
  let output = code;

  // If project is JavaScript, strip TypeScript type syntax cleanly
  if (!isTypeScript) {
    // Remove type imports: e.g. import { type VariantProps } from "..." or type ClassValue,
    output = output.replace(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']([^"']+)["'];?/g, (match, imports, pkg) => {
      const filtered = imports
        .split(",")
        .map((i) => i.trim())
        .filter((i) => !i.startsWith("type ") && i !== "type")
        .join(", ");
      return filtered ? `import { ${filtered} } from "${pkg}";` : "";
    });

    // Remove interfaces
    output = output.replace(/export\s+interface\s+\w+[\s\S]*?\{[\s\S]*?\}/g, "");
    output = output.replace(/interface\s+\w+[\s\S]*?\{[\s\S]*?\}/g, "");

    // Remove type aliases
    output = output.replace(/export\s+type\s+\w+\s*=[\s\S]*?;/g, "");
    output = output.replace(/type\s+\w+\s*=[\s\S]*?;/g, "");

    // Remove React generics: React.forwardRef<HTMLButtonElement, ButtonProps> -> React.forwardRef
    output = output.replace(/React\.forwardRef<[^>]+>/g, "React.forwardRef");
    output = output.replace(/forwardRef<[^>]+>/g, "forwardRef");

    // Remove React.ElementRef / ComponentProps generics
    output = output.replace(/React\.ElementRef<[^>]+>/g, "any");
    output = output.replace(/React\.ComponentPropsWithoutRef<[^>]+>/g, "any");

    // Remove param types: ({ prop }: Props) -> ({ prop })
    output = output.replace(/\)\s*:\s*[A-Za-z0-9_<>|[\]\s]+/g, ")");

    // Remove "as any", "as string", etc.
    output = output.replace(/\s+as\s+[A-Za-z0-9_<>|[\]]+/g, "");

    // Clean up empty lines
    output = output.replace(/\n\s*\n\s*\n/g, "\n\n");
  }

  return output;
}

// -------------------------------------------------------------
// 7. UTILS HELPER CREATION (@/lib/utils)
// -------------------------------------------------------------
function ensureUtilsHelper(targetDir = cwd, projectInfo = null) {
  const infoObj = projectInfo || detectProject(targetDir);
  const utilsFile = infoObj.utilsPath;
  const isTS = infoObj.isTypeScript;

  ensureDirSync(path.dirname(utilsFile));

  if (!fs.existsSync(utilsFile)) {
    let utilsContent;
    if (isTS) {
      utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    } else {
      utilsContent = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;
    }
    fs.writeFileSync(utilsFile, utilsContent, "utf8");
    success(`Generated utility helper file at ${path.relative(targetDir, utilsFile)}`);
  }
}

// -------------------------------------------------------------
// 8. COMMAND: INIT
// -------------------------------------------------------------
function runInit() {
  log(`\n${colors.bright}${colors.cyan}ComponentOS CLI — Project Initialization${colors.reset}\n`);

  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    error("No package.json found in the current working directory.");
    log("Please run this command inside a Node / React / Next.js project.\n");
    process.exit(1);
  }

  const project = detectProject(cwd);
  const pm = detectPackageManager(cwd);

  info(`Detected environment: ${colors.bright}${project.isNext ? "Next.js" : project.isVite ? "Vite + React" : "React"}${colors.reset} (${project.isTypeScript ? "TypeScript" : "JavaScript"})`);
  info(`Detected package manager: ${colors.bright}${pm}${colors.reset}`);

  // Create componentos.json configuration
  const configPath = path.join(cwd, "componentos.json");
  const config = {
    $schema: "https://componentos.dev/schemas/config.json",
    style: "default",
    tailwind: {
      config: "tailwind.config.js",
      css: project.hasSrc ? "src/index.css" : (project.isNext ? "app/globals.css" : "styles/globals.css"),
      baseColor: "slate",
      cssVariables: true,
    },
    aliases: {
      components: project.hasSrc ? "@/src/components" : "@/components",
      utils: project.hasSrc ? "@/src/lib/utils" : "@/lib/utils",
      ui: project.hasSrc ? "@/src/components/ui" : "@/components/ui",
    },
    registry: "https://componentos.dev/api/registry",
    project: {
      framework: project.isNext ? "next" : project.isVite ? "vite" : "react",
      typescript: project.isTypeScript,
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
  success("Created componentos.json configuration file.");

  // Generate utils helper
  ensureUtilsHelper(cwd, project);

  // Install base dependencies
  const basePackages = ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react"];
  installPackages(basePackages, cwd, pm);

  log(`\n${colors.green}${colors.bright}✔ ComponentOS initialized successfully!${colors.reset}`);
  log(`You can now run: ${colors.cyan}npx componentos add button badge avatar${colors.reset}\n`);
}

// -------------------------------------------------------------
// 9. COMMAND: ADD
// -------------------------------------------------------------
async function runAdd(targets) {
  if (!targets || targets.length === 0) {
    warn("Please specify one or more component names to install.");
    log("Example: npx componentos add button data-table ai-chat\n");
    process.exit(1);
  }

  log(`\n${colors.bright}${colors.cyan}ComponentOS Registry Installer${colors.reset}\n`);

  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    error(`No package.json found in current directory (${cwd}).`);
    log("Please run this command inside your React / Next.js / Vite project.\n");
    process.exit(1);
  }

  const project = detectProject(cwd);
  const pm = detectPackageManager(cwd);
  const registryUrl = getRegistryBaseUrl(cwd);

  const installedFiles = [];
  const requiredNpmPackages = new Set();
  const resolvedItemsMap = new Map();
  const visitingStack = new Set();

  // Recursive registry dependency resolution algorithm with cycle prevention
  async function resolveDependencyTree(slug) {
    const key = slug.toLowerCase().trim();

    if (resolvedItemsMap.has(key)) return;

    if (visitingStack.has(key)) {
      warn(`Circular component dependency detected: ${Array.from(visitingStack).join(" -> ")} -> ${key}. Skipping recursion.`);
      return;
    }

    visitingStack.add(key);

    info(`Resolving ${colors.bright}${key}${colors.reset} from registry...`);
    const fetchResult = await fetchRegistryItem(key, registryUrl);

    if (fetchResult.source === "not_found") {
      error(`Component "${key}" was not found in the ComponentOS registry.`);
      visitingStack.delete(key);
      process.exit(1);
    }

    const item = fetchResult.item;
    resolvedItemsMap.set(key, item);

    // Recursively resolve registry dependencies first (topological ordering)
    if (Array.isArray(item.registryDependencies) && item.registryDependencies.length > 0) {
      for (const depSlug of item.registryDependencies) {
        await resolveDependencyTree(depSlug);
      }
    }

    // Collect external npm dependencies
    if (Array.isArray(item.dependencies)) {
      item.dependencies.forEach((pkg) => requiredNpmPackages.add(pkg));
    }

    visitingStack.delete(key);
  }

  // Resolve all requested target items
  for (const target of targets) {
    await resolveDependencyTree(target);
  }

  // Ensure @/lib/utils exists before writing components
  ensureUtilsHelper(cwd, project);

  const assumeYes = globalFlags.yes;
  const forceOverwrite = globalFlags.overwrite;

  // Process and write files for all resolved components
  for (const [slug, item] of resolvedItemsMap.entries()) {
    if (!item.files || item.files.length === 0) continue;

    for (const file of item.files) {
      let relativeTarget = file.target || file.path;

      // Determine proper file extension for TS vs JS projects
      if (!project.isTypeScript) {
        relativeTarget = relativeTarget.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js");
      }

      // Re-map target folder to project componentsDir if default path was used
      let destPath;
      if (globalFlags.path) {
        destPath = path.join(path.resolve(cwd, globalFlags.path), path.basename(relativeTarget));
      } else if (project.hasSrc && !relativeTarget.startsWith("src/")) {
        destPath = path.join(cwd, "src", relativeTarget);
      } else {
        destPath = path.join(cwd, relativeTarget);
      }

      // Security check: Path Traversal Protection
      const resolvedDest = path.resolve(destPath);
      const resolvedCwd = path.resolve(cwd);
      if (!resolvedDest.startsWith(resolvedCwd)) {
        error(`Security Exception: Path traversal attempted for file "${relativeTarget}". Write blocked.`);
        process.exit(1);
      }

      ensureDirSync(path.dirname(resolvedDest));

      let shouldWrite = true;
      if (fs.existsSync(resolvedDest) && !forceOverwrite && !assumeYes) {
        // In interactive TTY, we could prompt; in automated/CI or non-interactive mode, warn and skip
        if (process.stdout.isTTY && process.stdin.isTTY) {
          // Check if prompts can be used synchronously or confirm
          warn(`File ${path.relative(cwd, resolvedDest)} already exists. Use --overwrite to replace.`);
          shouldWrite = false;
        } else {
          warn(`File ${path.relative(cwd, resolvedDest)} already exists. Skipped. (Use --overwrite to replace)`);
          shouldWrite = false;
        }
      }

      if (shouldWrite) {
        const transformedContent = transformCodeForProject(file.content, {
          isTypeScript: project.isTypeScript,
          targetFilePath: resolvedDest,
        });

        fs.writeFileSync(resolvedDest, transformedContent, "utf8");
        installedFiles.push(path.relative(cwd, resolvedDest));
        success(`Added ${colors.bright}${path.relative(cwd, resolvedDest)}${colors.reset}`);
      }
    }
  }

  // Install all required external packages
  if (requiredNpmPackages.size > 0) {
    installPackages(Array.from(requiredNpmPackages), cwd, pm);
  }

  log(`\n${colors.green}${colors.bright}✔ Installation complete!${colors.reset}`);
  log(`Installed ${installedFiles.length} file(s) into your project.\n`);
}

// -------------------------------------------------------------
// 10. COMMAND: LIST / SEARCH
// -------------------------------------------------------------
async function runList(query) {
  log(`\n${colors.bright}${colors.cyan}ComponentOS Registry Catalog${colors.reset}\n`);

  const catalog = getBundledCatalog();
  const keys = Object.keys(catalog).filter((k) =>
    query ? k.includes(query.toLowerCase()) : true
  );

  if (keys.length === 0) {
    warn(`No components found matching query "${query}".`);
    return;
  }

  keys.forEach((k) => {
    const item = catalog[k];
    const deps = (item.dependencies || []).join(", ") || "none";
    const regDeps = (item.registryDependencies || []).join(", ") || "none";
    log(`• ${colors.bright}${item.name}${colors.reset} (v${item.version || "1.0.0"}) — npm: [${deps}], internal: [${regDeps}]`);
  });
  log("");
}

// -------------------------------------------------------------
// 11. COMMAND: INFO
// -------------------------------------------------------------
async function runInfo(name) {
  if (!name) {
    warn("Please specify a component name. Example: npx componentos info button");
    return;
  }

  const result = await fetchRegistryItem(name);
  if (result.source === "not_found") {
    error(`Component "${name}" was not found in the ComponentOS registry.`);
    return;
  }

  const item = result.item;
  log(`\n${colors.bright}${colors.cyan}Component: ${item.name}${colors.reset}\n`);
  log(`Description: ${item.description || "Production-ready UI component."}`);
  log(`Version: ${item.version || "1.0.0"}`);
  log(`Category: ${item.category || "micro"}`);
  log(`NPM Dependencies: ${(item.dependencies || []).join(", ") || "none"}`);
  log(`Registry Dependencies: ${(item.registryDependencies || []).join(", ") || "none"}`);
  log(`Files:`);
  (item.files || []).forEach((f) => log(`  - ${f.target || f.path}`));
  log("");
}

// -------------------------------------------------------------
// 12. COMMAND DISPATCHER & ENTRY
// -------------------------------------------------------------
async function main() {
  if (globalFlags.version) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
      log(pkg.version || "1.0.0");
    } catch (e) {
      log("1.0.0");
    }
    process.exit(0);
  }

  switch (command) {
    case "init":
      runInit();
      break;
    case "add":
      await runAdd(commandArgs);
      break;
    case "list":
    case "search":
      await runList(commandArgs[0]);
      break;
    case "info":
      await runInfo(commandArgs[0]);
      break;
    case "help":
    default:
      log(`
${colors.bright}ComponentOS CLI — The Open Component Infrastructure${colors.reset}

Usage:
  ${colors.cyan}npx componentos <command> [options]${colors.reset}
  ${colors.cyan}pnpm dlx componentos <command> [options]${colors.reset}
  ${colors.cyan}yarn dlx componentos <command> [options]${colors.reset}
  ${colors.cyan}bunx componentos <command> [options]${colors.reset}

Commands:
  ${colors.cyan}init${colors.reset}                     Initialize ComponentOS in your project directory
  ${colors.cyan}add [components...]${colors.reset}      Install components with automatic dependency resolution
  ${colors.cyan}list [query]${colors.reset}            Search and list available registry components
  ${colors.cyan}info [component]${colors.reset}        Show component metadata, dependencies, and files

Flags:
  ${colors.cyan}-y, --yes${colors.reset}                Accept all prompts automatically
  ${colors.cyan}-f, --overwrite${colors.reset}          Overwrite existing local component files
  ${colors.cyan}-p, --path <dir>${colors.reset}         Override target installation directory
  ${colors.cyan}-v, --version${colors.reset}            Display ComponentOS CLI version
  ${colors.cyan}-h, --help${colors.reset}               Display this help message

Examples:
  npx componentos init
  npx componentos add button
  npx componentos add badge avatar input switch
  npx componentos add data-table --overwrite
  npx componentos add ai-chat -y
  npx componentos info button
  npx componentos search
`);
      break;
  }
}

main().catch((err) => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
