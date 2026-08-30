# ComponentOS — Registry Specification

## 1. Registry Architecture
The ComponentOS Registry serves as a distributed single-source-of-truth metadata & source code provider.
It hosts component specifications as JSON documents consumable by both the Web Application (for rendering previews, prop tables, code viewer) and the CLI (for local file generation and dependency resolution).

## 2. Component Metadata Schema (JSON)
Every registry item (component, primitive, block, section, template, theme) adheres to the following Zod-validated JSON format:

```json
{
  "$schema": "https://componentos.dev/schemas/registry-item.json",
  "name": "button",
  "type": "component",
  "category": "micro",
  "version": "1.0.0",
  "title": "Button Component",
  "description": "Interactive button component with multi-variant styling, sizes, loading states, and icon support.",
  "author": "ComponentOS Team",
  "license": "MIT",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "peerDependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "content": "import * as React from 'react';\n...",
      "type": "registry:ui",
      "target": "components/ui/button.tsx"
    }
  ],
  "variants": [
    { "name": "default", "label": "Default" },
    { "name": "destructive", "label": "Destructive" },
    { "name": "outline", "label": "Outline" },
    { "name": "secondary", "label": "Secondary" },
    { "name": "ghost", "label": "Ghost" },
    { "name": "link", "label": "Link" }
  ],
  "sizes": ["sm", "default", "lg", "icon"],
  "accessibility": {
    "keyboard": "Fully navigable via Space and Enter keys. Supports standard button focus states.",
    "screenReader": "Uses native HTML <button> tag with aria-disabled, aria-busy, and custom aria labels.",
    "ariaRoles": ["button"]
  },
  "props": [
    {
      "name": "variant",
      "type": "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      "defaultValue": "'default'",
      "description": "Visual style variant of the button."
    },
    {
      "name": "size",
      "type": "'sm' | 'default' | 'lg' | 'icon'",
      "defaultValue": "'default'",
      "description": "Size preset governing padding and font size."
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "defaultValue": "false",
      "description": "Triggers visual spinner and disables user interaction."
    }
  ]
}
```

## 3. Registry Dependency Resolution Algorithm
When an item has `registryDependencies` (e.g., a `data-table` requiring `checkbox`, `dropdown-menu`, `button`, and `pagination`), the registry resolver recursively traverses the dependency graph:

1. **Graph Construction**: Collect root requested item -> query registry for `registryDependencies` -> append child items into ordered map.
2. **Cycle Detection**: Track visitor path stack; throw `RegistryDependencyCycleError` if a cyclic reference is discovered.
3. **Topological Ordering**: Order installation sequence so primitives are installed prior to dependent blocks.
4. **Aggregate npm Dependencies**: Merge all external `dependencies` array items, stripping duplicate package references.

## 4. Item Taxonomy Types
- `primitive` / `component`: Atomic and composed controls added into `@/components/ui/`.
- `block`: Multi-component composed interface sections added into `@/components/blocks/`.
- `section`: Page layout sections added into `@/components/sections/`.
- `template`: Complete multi-file application views added into `@/app/` or `@/components/templates/`.
- `theme`: Design token CSS variable configurations added into `globals.css` / Tailwind theme config.
