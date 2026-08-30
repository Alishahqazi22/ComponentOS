# ComponentOS — Architecture Specification

## 1. System Overview
ComponentOS is an open component infrastructure platform designed for high-performance modern web applications. Inspired by the source-distribution philosophy of shadcn/ui, ComponentOS delivers component primitives, compound blocks, design sections, complete page templates, and design themes directly into developers' codebases via a CLI tool and a versioned component registry API.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             ComponentOS                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────┐             ┌────────────────────────────┐  │
│  │   ComponentOS Web App   │             │   ComponentOS Registry API │  │
│  │  (Next.js App Router)   │             │  (JSON Schemas & Source)   │  │
│  └────────────┬────────────┘             └─────────────┬──────────────┘  │
│               │                                        │                 │
│               ▼                                        ▼                 │
│  ┌─────────────────────────┐             ┌────────────────────────────┐  │
│  │   PostgreSQL + Prisma   │             │      ComponentOS CLI       │  │
│  │   (Database & Metadata) │             │    (Node / npx CLI Tool)   │  │
│  └─────────────────────────┘             └─────────────┬──────────────┘  │
│                                                        │                 │
│                                                        ▼                 │
│                                          ┌────────────────────────────┐  │
│                                          │    Target User Project     │  │
│                                          │  (Local Code Ownership)    │  │
│                                          └────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Pillars

### 2.1 Source-Based Component Distribution
ComponentOS operates on a zero-lock-in source distribution architecture:
- Components are stored as raw source files with typed metadata schemas in the central registry.
- When requested via `npx componentos add <name>`, the CLI fetches the target component tree, resolves internal registry dependencies and npm package dependencies, and writes formatted source code into the user's project directory (e.g., `@/components/ui/button.tsx`).
- Developers own 100% of the installed code and can modify, extend, or re-theme components locally without external library constraints.

### 2.2 Hierarchical Component Taxonomy
The registry structures UI elements into 5 distinct levels:
1. **Foundations**: Design tokens, color scales, typography rules, spacing standards, radii, shadows.
2. **Micro / Primitives**: Atomic UI controls (Buttons, Badges, Tooltips, Inputs, Switches, Avatars).
3. **Form / Data / Navigation / Feedback / Media Primitives**: Composed functional elements (Data Tables, Comboboxes, Command Menus, Media Players, Modals).
4. **Blocks & Sections**: Multi-component compound interfaces (Hero Sections, Pricing Tables, Cart Drawers, AI Chat Panels, Kanban Boards).
5. **Page Templates**: Full page implementations (SaaS Landing Page, Admin Dashboard, Ecommerce Product Page, Authentication Suite).

### 2.3 Single Source of Truth Registry Model
- Every component definition (`registry/components/<name>.json`) acts as the single source of truth for:
  - Web site interactive previews & live documentation.
  - Code syntax highlighters & interactive props table generation.
  - CLI resolution, file generation, and dependency installation.
  - Schema validation, semantic versioning, and changelog generation.

## 3. High-Level System Components

### 3.1 Web Application (`apps/web` or root Next.js App)
- **Framework**: Next.js (App Router, Server Components, Route Handlers).
- **Styling**: Tailwind CSS + CSS variables for customizable design tokens.
- **State Management**: React state + URL search params for filtering, discovery, and live component playground configuration.
- **Icons & Motion**: Lucide Icons, Framer Motion for responsive visual feedback.
- **Documentation Engine**: Custom Markdown / MDX renderer supporting live code view, syntax highlighting, copy-to-clipboard, tabs, and prop inspection.

### 3.2 ComponentOS CLI (`packages/cli` or CLI runner)
- **CLI Commands**:
  - `componentos init`: Framework detection, Tailwind setup, path aliases detection, creation of `componentos.json`.
  - `componentos add [items...]`: Dependency resolution, component retrieval, AST/formatting write, npm package installer.
  - `componentos update [items...]`: Diff comparison between local component and registry version.
  - `componentos remove [items...]`: Usage check, safety prompts, file deletion.
  - `componentos search <query>`: Terminal-based search across registry components.

### 3.3 Database & API Layer
- **Database**: PostgreSQL with Prisma ORM.
- **Schema Entities**: Users, Components, ComponentVersions, ComponentFiles, Categories, Blocks, Templates, Themes, Dependencies, Installations, AuditLogs.
- **Registry Endpoint**: `/registry/[name].json` & `/api/registry/[name]` delivering optimized JSON specs for CLI consumption.

### 3.4 Admin & Publishing Portal (`/admin`)
- Component lifecycle management: Draft → Review → Published → Deprecated.
- Interactive component editor, version release manager, audit logs, and registry validation checks.
