# ComponentOS — Testing Strategy Specification

## 1. Overview
ComponentOS uses a multi-tier testing pipeline ensuring component render validity, CLI installation accuracy, accessibility compliance, and build integrity.

```
┌──────────────────────────────────────────────────────────┐
│                     Testing Pipeline                     │
├──────────────────────────────────────────────────────────┤
│ 1. Unit Tests          (Vitest / Jest for Primitives)    │
│ 2. Registry Tests      (Zod Schema & Dep Validation)     │
│ 3. CLI E2E Tests       (Simulated `init` & `add` runs)   │
│ 4. Visual & UI Tests   (Playwright Component Snapshots)  │
│ 5. Accessibility Tests (Axe-core automated WCAG auditing)│
└──────────────────────────────────────────────────────────┘
```

## 2. Testing Layers

### 2.1 Unit & Component Rendering Tests
- Test button variants, loading spinner toggles, input validation states, data table sorting, and modal triggers using React Testing Library.

### 2.2 Registry Validation Pipeline
- Automated script validates that every component JSON file in `registry/` parses cleanly, references valid external packages, contains valid source code syntax, and includes required accessibility documentation.

### 2.3 CLI Integration E2E Tests
- Script runs `componentos init` in a isolated scratch test directory.
- Executes `componentos add button data-table dashboard` and asserts:
  - Files are written to expected paths (`components/ui/button.tsx`, etc.).
  - `@/lib/utils.ts` is generated correctly.
  - Dependencies are updated in `package.json`.
  - TypeScript compiles without errors.

### 2.4 Accessibility Auditing
- Automated `axe-core` tests scan rendered component previews for contrast ratios, ARIA roles, and focus traps.
