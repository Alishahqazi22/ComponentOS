# ComponentOS — Deployment Specification

## 1. Web Application Deployment (Next.js)
- **Target Host**: Vercel / Railway / AWS.
- **Environment Variables**:
  - `DATABASE_URL`: PostgreSQL connection string.
  - `NEXTAUTH_SECRET`: Secret key for authentication sessions.
  - `NEXT_PUBLIC_APP_URL`: Production domain URL (e.g. `https://componentos.dev`).
  - `NEXT_PUBLIC_REGISTRY_URL`: Registry URL (e.g. `https://componentos.dev/registry`).

## 2. CLI Package Distribution
- **Package Name**: `componentos` (or `@componentos/cli`).
- **NPM Publishing**: Built with `tsup` into optimized ESM/CJS binaries. Published with `bin` mapping to `./dist/index.js`.
- **Executable Usage**: `npx componentos init` / `npx componentos add <name>`.

## 3. Registry CDN & Static Mirroring
- Registry JSON endpoints (e.g., `https://componentos.dev/registry/button.json`) can be cached at Cloudflare / Vercel Edge Network CDN with standard HTTP ETag headers for ultra-fast CLI resolution.
