# ComponentOS — API Specification

## 1. Public Registry API (CLI & Web consumption)

### `GET /registry/[slug].json`
- **Description**: Public fast JSON endpoint consumed directly by CLI during `npx componentos add <slug>`.
- **Response**:
```json
{
  "name": "button",
  "type": "component",
  "version": "1.0.0",
  "dependencies": ["class-variance-authority", "clsx", "tailwind-merge"],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ]
}
```

### `GET /api/components`
- **Description**: Returns components list supporting filtering, category sorting, search query parameters.
- **Query Params**:
  - `category`: Filter by category slug (e.g. `micro`, `forms`, `ecommerce`).
  - `type`: `primitive` | `block` | `section` | `template` | `theme`.
  - `q`: Search keyword.
  - `sort`: `popular` | `recent` | `alphabetical` | `quality`.
  - `page`, `limit`: Pagination params.

### `GET /api/components/[slug]`
- **Description**: Fetches detailed metadata for a component including current version, files, props API, accessibility rules, variants, and documentation.

### `GET /api/search`
- **Description**: Fast query endpoint powering the ⌘K Command Palette and Global Search bar.
- **Query Params**: `q` (search string).
- **Response**: Categorized search results (Components, Blocks, Documentation, Templates).

## 2. User & Dashboard API

### `POST /api/user/favorites`
- **Description**: Toggles favorite status for a component.

### `GET /api/user/collections`
- **Description**: Retrieves current user's saved component collections.

## 3. Admin & Publishing API

### `POST /api/admin/components`
- **Description**: Creates or updates a component definition in the registry.

### `POST /api/admin/components/[id]/publish`
- **Description**: Promotes a draft component version to `PUBLISHED` state, updating registry JSON endpoints and logging audit trail.

### `GET /api/admin/audit-logs`
- **Description**: Retrieves history of admin actions, component publishes, and registry modifications.
