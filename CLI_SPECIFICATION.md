# ComponentOS — CLI Specification

## 1. Overview
The `componentos` CLI (available via `npx componentos`) allows developers to initialize ComponentOS in their projects, discover items, and install components, blocks, sections, and templates directly as local source code.

## 2. Configuration Schema (`componentos.json`)
Running `componentos init` generates a local `componentos.json` configuration file in the user's project root:

```json
{
  "$schema": "https://componentos.dev/schemas/config.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "blocks": "@/components/blocks"
  },
  "registry": "https://componentos.dev/registry"
}
```

## 3. CLI Command Suite

### 3.1 `npx componentos init`
- **Purpose**: Detects project framework (Next.js App Router, Pages Router, Vite React), package manager (`npm`, `pnpm`, `yarn`, `bun`), Tailwind CSS setup, and path aliases (`tsconfig.json` / `jsconfig.json`).
- **Options**:
  - `-y, --yes`: Skip interactive prompts and accept auto-detected defaults.
  - `-c, --cwd <path>`: Specify working directory.
- **Workflow**:
  1. Inspect `package.json` & `tsconfig.json`.
  2. Create `@/lib/utils.ts` with `cn()` helper (combining `clsx` and `tailwind-merge`).
  3. Ensure base dependencies (`clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`) are present.
  4. Save `componentos.json`.

### 3.2 `npx componentos add [components...]`
- **Purpose**: Installs one or more components/blocks/templates by fetching metadata from the registry API.
- **Options**:
  - `-y, --yes`: Overwrite existing local component files without prompt.
  - `-o, --overwrite`: Automatically overwrite modified files.
  - `-a, --all`: Add all primitive components available in registry.
  - `-p, --path <path>`: Override destination installation directory.
- **Workflow**:
  1. Validate requested items against registry API.
  2. Resolve recursive `registryDependencies`.
  3. Resolve external `dependencies` (e.g. `@radix-ui/react-dialog`, `framer-motion`).
  4. Prompt before overwriting modified local files (unless `--yes` is specified).
  5. Download component source code files and write them into target directory.
  6. Execute package manager command (`npm install`, `pnpm add`, `bun add`) to install missing external packages.
  7. Print formatted completion report with file paths created.

### 3.3 `npx componentos update [component]`
- **Purpose**: Compares local file checksum/contents with registry version, displaying diff summary before upgrading.

### 3.4 `npx componentos remove [component]`
- **Purpose**: Safely removes specified component files after checking for usage in dependent local files.

### 3.5 `npx componentos list / search <query>`
- **Purpose**: Lists available categories and components directly in terminal with search filter.

## 4. Error Handling & Non-Interactive CI Mode
- Flag `--no-interactive` suppresses ANSI colors, spinners, and interactive prompts for seamless execution inside CI/CD pipelines.
- Helpful error messages for network timeouts, invalid component names, or missing Tailwind configurations.
