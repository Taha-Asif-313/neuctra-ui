# @neuctra/ui

A React component library built with Tailwind CSS v4 and TypeScript: 76 exported
components and subcomponents across forms, layout, data display, overlays, navigation,
and feedback, all styled through a single semantic color-token system so an app's light
and dark theme apply automatically without per-component work.

This document explains the whole package: what it ships, how theming works underneath,
every category of component, the machine-readable registry it includes, and how to set
it up and troubleshoot it.

---

## 1. What this package is

`@neuctra/ui` is a compiled, tree-shakeable component library. You install it, style
your project's CSS with a small set of theme variables (once, manually or via the
companion CLI), and import components the same way you would from any other library:

```tsx
import { Button, Input } from "@neuctra/ui";
```

Every component ships as compiled JavaScript (ESM and CommonJS) plus `.d.ts` type
declarations, so it works in a plain Vite/CRA app, in Next.js (App Router or Pages
Router), and with either `import` or `require`.

The library does not ship a fixed color palette baked into components. Instead, every
component reads CSS custom properties (`--primary`, `--background`, `--border`, and so
on) through Tailwind classes like `bg-primary` or `text-foreground`. You define those
variables once for your project, and every component in the library automatically
matches — including your own custom components, if you use the same classes.

---

## 2. Installation

```bash
npm install @neuctra/ui
```

```bash
yarn add @neuctra/ui
```

```bash
pnpm add @neuctra/ui
```

Tailwind CSS must be installed in your project separately — this package supplies
components and a small stylesheet of keyframe animations, not a Tailwind installation.

---

## 3. Fastest setup: the CLI

The companion package `@neuctra/ui-cli` generates the entire theme stylesheet described
in section 4 for you, so you do not have to copy CSS by hand:

```bash
npx @neuctra/ui-cli
```

It writes the token definitions, the `@theme` mapping, and the `@custom-variant dark`
declaration into your project's CSS file, wraps your app root so `ThemeToggleButton`
works out of the box, and confirms Tailwind is scanning `node_modules/@neuctra/ui`. Run
this first on a new project, then skip straight to section 5 (Usage).

If you would rather understand and control every line of the generated CSS yourself,
continue reading section 4 and copy it manually.

---

## 4. Tailwind configuration

### Tailwind v4

```css
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
```

`@source` is what makes Tailwind's v4 JIT scanner look inside the library's compiled
output for class names to generate. Without it, classes used only inside `@neuctra/ui`
components (not in your own source) will not exist in your final CSS.

### Tailwind v3

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}",
  ],
};
```

Same purpose as `@source` above, expressed the v3 way.

---

## 5. Usage

```tsx
import { Button, Dropdown, Input } from "@neuctra/ui";

export default function App() {
  return (
    <main className="p-6 space-y-4">
      <Button onClick={() => alert("Hello")} className="rounded-xl shadow-lg">
        Primary
      </Button>

      <Input placeholder="Type here..." />

      <Dropdown
        options={[
          { label: "Yes", value: "1" },
          { label: "No", value: "0" },
        ]}
        placeholder="Choose"
      />
    </main>
  );
}
```

Every component accepts a `className`, and consumer `className` always wins over the
component's internal defaults (the library merges classes with `tailwind-merge`
internally, so `<Button className="px-2">` correctly overrides the default padding
instead of both classes fighting in the compiled CSS).

---

## 6. Theming, in depth

This is the part of the library worth understanding properly, because every component's
visual appearance is downstream of it.

### The token system

Each semantic concept — primary brand color, page background, body text, a card
surface, a destructive action, a success state — is one CSS custom property, defined
twice: once under `:root` (light mode) and once under `.dark` (dark mode). Tailwind's
`@theme` block then maps each variable to a utility class name, so `bg-primary` in any
component's markup resolves to whichever value is currently active.

```css
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";

/* dark: utilities must key off the .dark class, not the OS color-scheme setting */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --primary: #00c214;          --primary-foreground: #ffffff;
  --background: #ffffff;       --foreground: #09090b;
  --muted: #f4f4f5;            --muted-foreground: #71717a;
  --accent: #e4e4e7;           --accent-foreground: #09090b;
  --border: #e4e4e7;           --input: #f4f4f5;         --ring: #a1a1aa;
  --destructive: #d40000;      --destructive-foreground: #fafafa;
  --card: #ffffff;             --card-foreground: #09090b;
  --popover: #ffffff;          --popover-foreground: #09090b;
  --success: #16a34a;          --success-foreground: #fafafa;
  --warning: #d97706;          --warning-foreground: #fafafa;
  --info: #2563eb;             --info-foreground: #fafafa;
}

.dark {
  --primary: #00c214;          --primary-foreground: #ffffff;
  --background: #09090b;       --foreground: #fafafa;
  --muted: #27272a;            --muted-foreground: #a1a1aa;
  --accent: #18181b;           --accent-foreground: #fafafa;
  --border: #27272a;           --input: #18181b;         --ring: #3f3f46;
  --destructive: #e7000b;      --destructive-foreground: #fafafa;
  --card: #09090b;             --card-foreground: #fafafa;
  --popover: #18181b;          --popover-foreground: #fafafa;
  --success: #22c55e;          --success-foreground: #052e16;
  --warning: #f59e0b;          --warning-foreground: #451a03;
  --info: #3b82f6;             --info-foreground: #eff6ff;
}

/* Map the variables into Tailwind utilities: bg-primary, text-foreground, ... */
@theme {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

### Why two blocks instead of one

`:root` holds the values active by default. `.dark` holds the values that take over
the moment the `dark` class is present on `<html>` (or any ancestor). `@custom-variant
dark` tells Tailwind that any `dark:` utility should be gated on that class, not on the
operating system's `prefers-color-scheme` — this matters because it means dark mode is
something your app controls (a button, a stored preference), not something the browser
decides for you.

### Every token and what it is for

| Token | Pairs with | Used for |
|---|---|---|
| `primary` | `primary-foreground` | Brand color: primary buttons, active states, links, focus accents |
| `background` / `foreground` | — | Page background and default body text |
| `muted` | `muted-foreground` | Subtle surfaces: skeletons, disabled fills, secondary text |
| `accent` | `accent-foreground` | Hover/active backgrounds for interactive rows and menu items |
| `border` | — | Default border color for inputs, cards, dividers |
| `input` | — | Form control backgrounds |
| `ring` | — | Focus ring color |
| `card` | `card-foreground` | Card and panel surfaces, distinct from the page background |
| `popover` | `popover-foreground` | Dropdowns, popovers, tooltips, menus |
| `destructive` | `destructive-foreground` | Errors, delete or danger actions, invalid form states |
| `success` | `success-foreground` | Confirmation, online status, valid form states |
| `warning` | `warning-foreground` | Caution states, pending status, non-blocking alerts |
| `info` | `info-foreground` | Neutral notices, informational banners and badges |

The rule that keeps this coherent: every component in the library, and any component
you write yourself, should reach for one of these class names (`bg-card`,
`text-destructive`, `border-border`, and so on) instead of a raw Tailwind palette class
(`bg-blue-500`) or an inline hex value. A raw color is fixed in both themes; a token
follows whichever theme is active.

### Switching themes at runtime

```tsx
import { useState } from "react";
import { ThemeToggleButton } from "@neuctra/ui";

function Header() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return <ThemeToggleButton context={{ isDark, toggleTheme }} />;
}
```

`ThemeToggleButton` is presentational only — it renders the switch and calls whatever
`toggleTheme` you give it. The actual mechanism is the one line that toggles the `dark`
class on `document.documentElement`; everything else in the library reacts to that
automatically because of the CSS above.

---

## 7. Components

76 exported components and subcomponents across every category below, plus the `cn`
utility.

**Layout** — `Container`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Divider`

**Typography** — `Text`, `Kbd`

**Forms** — `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`,
`NumberInput`, `Rating`, `TagInput`, `PinInput`, `FileUpload`, `DatePicker`, `Calendar`,
`Toggle`, `ToggleGroup`

**Actions** — `Button`, `CopyButton`, `ThemeToggleButton`

**Data Display** — `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Image`, `List`,
`ListItem`, `Table`, `THead`, `TBody`, `TRow`, `TH`, `TD`, `Stat`, `Timeline`,
`Carousel`, `Accordion`

**Feedback** — `ToastProvider`, `useToast`, `Callout`, `Progress`, `Skeleton`,
`Spinner`, `EmptyState`

**Overlay** — `Modal`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`,
`ModalButton`, `ModalTriggerButton`, `Drawer`, `DrawerContent`, `DrawerHeader`,
`DrawerBody`, `DrawerFooter`, `DrawerButton`, `DrawerTriggerButton`, `Dropdown`,
`Popover`, `Tooltip`

**Navigation** — `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel`, `Breadcrumb`,
`Pagination`, `Stepper`

**Utilities** — `cn` (a `clsx` + `tailwind-merge` helper: combines conditional class
strings and resolves conflicts so the last conflicting class wins, exactly like
`className` overrides on any component in this library)

Every component and subcomponent above has its own exported TypeScript props interface
(for example `ButtonProps`, `ModalContentProps`, `TagInputProps`) — import it directly
if you are wrapping a component or writing a typed prop-drilling layer:

```tsx
import type { ButtonProps } from "@neuctra/ui";
```

Full prop tables, every variant, and live interactive examples for each component are
in the documentation site (section 12).

---

## 8. The component registry

Alongside the compiled library, this package ships `registry/components.json` — a
generated, machine-readable description of the entire public API: every component's
props with their types, whether each is required, its default value, its description,
and one real usage example. It is generated directly from the TypeScript source (not
written by hand), so it cannot drift out of sync with what the components actually
accept.

```bash
node -e "console.log(require('@neuctra/ui/registry/components.json').components.length)"
```

This exists for tooling that needs to know the library's API without parsing source
files or relying on a model's memory of it — most directly, the
[`@neuctra/ui-mcp`](../neuctra-ui-mcp) package, which serves this same data to AI coding
assistants (Claude Code, Cursor, and similar tools) over the Model Context Protocol, so
they write code against real prop names and defaults instead of guessing. You can also
read the file directly in your own scripts, or paste relevant sections into an AI chat
as context.

If you are working in this repository and change a component's props, regenerate it
before publishing:

```bash
npm run registry:generate
```

This also runs automatically as part of `prepublishOnly`, so a normal `npm publish`
keeps it current without remembering the step by hand.

---

## 9. TypeScript

The package is written in TypeScript and ships `.d.ts` declarations for every export.
No `@types/@neuctra/ui` package is needed or exists — types come from the package
itself via the `types` field in its `package.json`.

---

## 10. Next.js and server-side rendering

Every interactive component's source file is marked `"use client"`, and the build
process preserves that directive in the compiled output (Vite's bundler would otherwise
strip it when concatenating files into a single chunk, which is a common cause of
"cannot use hooks in a Server Component" errors with other libraries built this way).
You can import and use components directly inside a Next.js App Router client component
without adding your own `"use client"` re-export wrapper.

CSS setup is identical to section 4 — add the same `@import` and `@source` (or Tailwind
v3 `content` entry) to whichever global stylesheet your Next.js app already loads.

---

## 11. Production checklist

```bash
npm run typecheck
npm run build
```

- Run type checking and the build before every deploy; `prepublishOnly` already runs
  both automatically when publishing this package itself.
- Confirm `@source` (or the Tailwind v3 `content` glob) actually resolves to
  `node_modules/@neuctra/ui` in your deployed build, not just locally — a common CI
  failure mode is a `.dockerignore` or build-cache rule that excludes `node_modules`
  paths matched by pattern.
- If you support both light and dark mode, verify both `:root` and `.dark` blocks
  exist in your shipped CSS — a common breakage is defining only one and assuming the
  other falls back correctly (it does not; each token needs an explicit value in both
  blocks).

---

## 12. Troubleshooting

**Styles are not applying, or a component looks unstyled.**
Confirm your Tailwind config actually scans this package:
```
./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}
```
for Tailwind v3, or `@source "../node_modules/@neuctra/ui";` for v4. This is the single
most common setup issue — the component's classes exist in the compiled bundle, but
Tailwind never generated CSS for them because it never looked there.

**Colors look the same in light and dark mode, or dark mode does not toggle anything.**
Check that both the `:root` and `.dark` blocks in section 6 are present, and that
`@custom-variant dark (&:where(.dark, .dark *));` is declared. Without the
`@custom-variant` line, Tailwind's default `dark:` behavior keys off the operating
system's color scheme instead of the `.dark` class this library expects.

**Server-side rendering errors ("useState is not a function", hydration mismatches).**
Confirm the component is being rendered inside a Client Component boundary in
Next.js App Router — see section 10.

**"Module not found" or resolution errors after upgrading.**
```bash
rm -rf node_modules package-lock.json && npm install
```

---

## 13. Documentation

Full interactive documentation with every prop, variant, and live example:
https://neuctra-ui.vercel.app

---

## 14. Related packages

- [`@neuctra/ui-cli`](https://www.npmjs.com/package/@neuctra/ui-cli) — scaffolds the
  theme CSS from section 6 into a new or existing project.
- [`@neuctra/ui-mcp`](../neuctra-ui-mcp) — serves this package's component registry to
  AI coding assistants over the Model Context Protocol.

---

## 15. Links

- GitHub: https://github.com/Taha-Asif-313/neuctra-ui
- npm: https://www.npmjs.com/package/@neuctra/ui

---

## 16. License

MIT (C) Taha Asif
