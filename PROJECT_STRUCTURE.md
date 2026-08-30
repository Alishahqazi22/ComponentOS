# ComponentOS — Project Structure Specification

```
componentos/
├── apps/                       # Applications workspace
│   ├── web/                    # Main Next.js Web Platform (Showcase, Registry API, Docs, Admin, Dashboard)
│   │   ├── app/                # Next.js App Router routes
│   │   │   ├── page.tsx        # Homepage (Hero with interactive terminal, Features, Popular components)
│   │   │   ├── components/     # Catalog search & detail routes (/components, /components/[category]/[slug])
│   │   │   ├── blocks/         # Multi-component blocks (/blocks, /blocks/[slug])
│   │   │   ├── templates/      # Full page templates (/templates, /templates/[slug])
│   │   │   ├── themes/         # Custom visual theme generator & gallery
│   │   │   ├── docs/           # Documentation pages (/docs/installation, /docs/cli, etc.)
│   │   │   ├── changelog/      # Release notes & semantic version history
│   │   │   ├── dashboard/      # User dashboard (Favorites, Projects, Settings)
│   │   │   ├── admin/          # Authoring & Admin suite (Component management, publishing, audit logs)
│   │   │   ├── api/            # Server APIs (Search, Auth, Registry metadata, Admin endpoints)
│   │   │   └── registry/       # Public CLI registry JSON endpoints (/registry/[slug].json)
│   │   ├── components/         # Internal web application UI components (Header, Nav, CodeViewer, Playground, etc.)
│   │   ├── lib/                # Web utilities, database client, search indexer, auth config
│   │   └── public/             # Static assets, branding logos, diagrams
│   └── cli/                    # CLI Executable package (published as `componentos` or `@componentos/cli`)
│       ├── src/
│       │   ├── commands/       # CLI commands: init, add, remove, update, search, list
│       │   ├── utils/          # Framework detector, Tailwind configurer, package manager executor
│       │   ├── registry.ts     # Registry API fetcher & integrity checker
│       │   └── index.ts        # CLI entry point (Commander / Clack JS UI)
│       └── package.json
│
├── packages/                   # Shared internal packages & libraries
│   ├── database/               # Prisma schema, migrations, seed data, DB client
│   ├── registry-core/          # Registry Zod schemas, type definitions, dependency graph resolver
│   ├── ui/                     # Core React component primitives used by web & documentation
│   └── config/                 # Shared TypeScript, ESLint, and Tailwind configurations
│
├── registry/                   # Authoritative Component Registry Source Data
│   ├── foundations/            # Tokens, colors, typography, radii, shadows specs
│   ├── components/             # Individual primitives & composed controls (button, data-table, input, etc.)
│   │   ├── button/             # Source code, metadata.json, usage examples, variants, tests
│   │   ├── input/
│   │   └── data-table/
│   ├── blocks/                 # Multi-component blocks (login-block, dashboard-header, pricing-block)
│   ├── sections/               # Large page sections (saas-hero, ecommerce-hero, features-grid)
│   ├── templates/              # Complete page templates (admin-dashboard, saas-landing, ecommerce-product)
│   └── themes/                 # Design token themes (zinc, slate, violet, emerald, amber, rose)
│
├── tests/                      # Global end-to-end and integration test suites
│   ├── e2e/                    # Playwright / Cypress browser tests for web app
│   └── cli/                    # Integration tests verifying `componentos init` and `add` in target projects
│
├── ARCHITECTURE.md             # System architecture specification
├── PROJECT_STRUCTURE.md        # Folder structure reference
├── REGISTRY_SPECIFICATION.md   # Component registry JSON schema & rules
├── CLI_SPECIFICATION.md        # CLI workflow, config schema & commands
├── DATABASE_SCHEMA.md          # Prisma ORM schema & entity relational specifications
├── API_SPECIFICATION.md        # HTTP & REST API endpoints
├── COMPONENT_TAXONOMY.md       # Component level 1-5 catalog classification
├── DESIGN_SYSTEM.md            # Color tokens, typography, radii, spacing, accessibility guidelines
├── SECURITY.md                 # Registry verification, rate limiting, authentication & input rules
├── TESTING_STRATEGY.md         # Unit, integration, visual regression & CLI automated tests
├── DEPLOYMENT.md               # Production deployment guide (Vercel, Railway/Postgres, npm CLI)
└── package.json                # Monorepo workspace root configuration
```
