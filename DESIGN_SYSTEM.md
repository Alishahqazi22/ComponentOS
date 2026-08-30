# ComponentOS — Design System Specification

## 1. Visual Philosophy
ComponentOS adheres to a modern, developer-centric design language:
- **Clean & Minimal**: High information density, clear typographic hierarchy, subtle single-pixel borders.
- **Theme Versatility**: Powered by CSS custom variables allowing seamless toggle between Light Mode, Dark Mode, and custom accent themes (Zinc, Slate, Violet, Emerald, Amber, Rose).
- **Subtle Elevation**: Shadow layers tuned for modern web applications (`shadow-sm`, `shadow-md`, `shadow-lg`).

## 2. Design Tokens (CSS Variables)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  --card: 0 0% 100%;
  --card-foreground: 224 71.4% 4.1%;
  --popover: 0 0% 100%;
  --popover-foreground: 224 71.4% 4.1%;
  --primary: 220.9 39.3% 11%;
  --primary-foreground: 210 20% 98%;
  --secondary: 220 14.3% 95.9%;
  --secondary-foreground: 220.9 39.3% 11%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  --accent: 220 14.3% 95.9%;
  --accent-foreground: 220.9 39.3% 11%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 20% 98%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 224 71.4% 4.1%;
  --radius: 0.5rem;
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 20% 98%;
  --card: 224 71.4% 4.1%;
  --card-foreground: 210 20% 98%;
  --popover: 224 71.4% 4.1%;
  --popover-foreground: 210 20% 98%;
  --primary: 210 20% 98%;
  --primary-foreground: 220.9 39.3% 11%;
  --secondary: 215 27.9% 16.9%;
  --secondary-foreground: 210 20% 98%;
  --muted: 215 27.9% 16.9%;
  --muted-foreground: 217.9 10.6% 64.9%;
  --accent: 215 27.9% 16.9%;
  --accent-foreground: 210 20% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 20% 98%;
  --border: 215 27.9% 16.9%;
  --input: 215 27.9% 16.9%;
  --ring: 216 12.2% 83.9%;
}
```

## 3. Accessibility Standard (WCAG 2.2 AA)
All primitives in ComponentOS enforce strict accessibility:
- **Keyboard Traversal**: Interactive elements (Buttons, Menus, Modals, Tabs, Comboboxes) support full arrow key, Tab, Space, and Escape keyboard navigation.
- **Focus Indicators**: High-contrast ring focus outlines (`focus-visible:ring-2 focus-visible:ring-ring`).
- **Semantic Structure**: Correct usage of `<button>`, `<nav>`, `<main>`, `<dialog>`, `role="status"`, `aria-expanded`, `aria-label`, `aria-controls`.
- **Screen Reader Support**: Live regions for toasts and notifications (`aria-live="polite"`).
