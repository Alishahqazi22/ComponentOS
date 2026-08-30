export type ComponentCategory =
  | "foundation"
  | "micro"
  | "forms"
  | "navigation"
  | "feedback"
  | "data-display"
  | "media"
  | "cards"
  | "advanced"
  | "ecommerce"
  | "dashboard"
  | "marketing"
  | "auth"
  | "ai"
  | "animated"
  | "blocks"
  | "sections"
  | "templates"
  | "themes";

export type ComponentType =
  | "primitive"
  | "component"
  | "block"
  | "section"
  | "template"
  | "theme";

export interface ComponentFile {
  path: string;
  content: string;
  target: string;
  type?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentVariant {
  name: string;
  label: string;
  description?: string;
}

export interface AccessibilityInfo {
  keyboard: string;
  screenReader: string;
  ariaRoles: string[];
}

export interface RegistryItem {
  name: string;
  title: string;
  slug: string;
  version: string;
  description: string;
  type: ComponentType;
  category: ComponentCategory;
  author: string;
  license: string;
  qualityScore: number;
  isOfficial: boolean;
  updatedAt: string;
  dependencies: string[];
  peerDependencies?: string[];
  registryDependencies: string[];
  files: ComponentFile[];
  variants?: ComponentVariant[];
  sizes?: string[];
  props: ComponentProp[];
  accessibility: AccessibilityInfo;
  usageExample?: string;
  previewComponentKey?: string;
  hasAnimated?: boolean;
  tags?: string[];
  complexity?: "beginner" | "intermediate" | "advanced";
  isNew?: boolean;
  isPopular?: boolean;
}
