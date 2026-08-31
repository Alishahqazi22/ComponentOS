import { MetadataRoute } from "next";

const BASE_URL = "https://componentos.dev";

// Static pages of the site
const staticRoutes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/",                priority: 1.0, changeFrequency: "weekly"  },
  { url: "/components",      priority: 0.9, changeFrequency: "daily"   },
  { url: "/blocks",          priority: 0.8, changeFrequency: "weekly"  },
  { url: "/templates",       priority: 0.8, changeFrequency: "weekly"  },
  { url: "/themes",          priority: 0.7, changeFrequency: "weekly"  },
  { url: "/animation",       priority: 0.7, changeFrequency: "weekly"  },
  { url: "/categories",      priority: 0.7, changeFrequency: "weekly"  },
  { url: "/docs",            priority: 0.8, changeFrequency: "weekly"  },
  { url: "/search",          priority: 0.5, changeFrequency: "always"  },
  { url: "/changelog",       priority: 0.6, changeFrequency: "monthly" },
  { url: "/roadmap",         priority: 0.5, changeFrequency: "monthly" },
  { url: "/about",           priority: 0.4, changeFrequency: "monthly" },
  { url: "/examples",        priority: 0.6, changeFrequency: "weekly"  },
];

// Component categories used in /components/[category] routes
const componentCategories = [
  "micro",
  "layout",
  "form",
  "navigation",
  "feedback",
  "data-display",
  "overlay",
  "typography",
  "media",
  "animation",
];

// Known individual component slugs
const componentSlugs = [
  // Micro Primitives
  "button",
  "badge",
  "avatar",
  "spinner",
  "separator",
  "kbd",
  "tooltip",
  "progress",
  "slider",
  "switch",
  "checkbox",
  "radio-group",
  "input",
  "textarea",
  "label",
  "select",
  "icon-button",
  "input-group",

  // Layout
  "card",
  "container",
  "grid",
  "stack",
  "divider",
  "aspect-ratio",

  // Navigation
  "navbar",
  "sidebar",
  "breadcrumb",
  "tabs",
  "pagination",
  "dropdown-menu",
  "command-menu",
  "stepper",

  // Feedback
  "alert",
  "toast",
  "dialog",
  "sheet",
  "skeleton",
  "empty-state",

  // Data Display
  "table",
  "accordion",
  "collapsible",
  "popover",
  "code-viewer",

  // Typography & Media
  "spotlight-card",
  "terminal-demo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Build static page entries
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Build /components/[category] entries
  const categoryEntries: MetadataRoute.Sitemap = componentCategories.map((cat) => ({
    url: `${BASE_URL}/components/${cat}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Build individual component page entries
  const componentEntries: MetadataRoute.Sitemap = componentSlugs.map((slug) => ({
    url: `${BASE_URL}/components/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...componentEntries,
  ];
}
