# @neuctra/ui

A modern, customizable, and fully responsive React UI component library built with Tailwind CSS, TypeScript, and Vite.

> ⚡ Build production-ready, accessible interfaces faster with beautifully designed components.

---

## 🚀 Why Neuctra UI?

- ⚡ **Fast Development** — Prebuilt components with minimal setup
- 🎨 **Fully Customizable** — Tailwind + CSS variables powered theming
- ♿ **Accessible by Default** — Built with a11y best practices
- 🧩 **Composable API** — Flexible and scalable component patterns
- 🌙 **Dark Mode Ready** — Easy theme switching via CSS variables

---

## 📦 Installation

Install the library using your preferred package manager:

### npm
```bash
npm install @neuctra/ui
````

### yarn

```bash
yarn add @neuctra/ui
```

### pnpm

```bash
pnpm add @neuctra/ui
```

> ⚠️ Make sure Tailwind CSS is installed in your project.

---

## ⚙️ Tailwind Configuration

### Tailwind v3

```js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Tailwind v4

```css
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
```

---

## 🧱 Usage

Import and use components in your app:

```tsx
import { Button, Dropdown, Input } from '@neuctra/ui';

export default function App() {
  return (
    <main className="p-6 space-y-4">
      <Button onClick={() => alert('Hello')} className="rounded-xl shadow-lg">
        Primary
      </Button>

      <Input placeholder="Type here..." />

      <Dropdown
        options={[
          { label: 'Yes', value: '1' },
          { label: 'No', value: '0' }
        ]}
        placeholder="Choose"
      />
    </main>
  );
}
```

---

## 🎨 Theming

Every component is styled with semantic tokens. You define each token twice —
once on `:root` (light) and once on `.dark` (dark) — then map them into
Tailwind with `@theme`. Toggling the `dark` class on `<html>` (what
`<ThemeToggleButton />` does) switches the entire UI.

> 💡 Running `npx @neuctra/ui` (the CLI) generates this whole file for you.

```css
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";

/* dark: utilities must key off the .dark class, not the OS setting */
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
  --info: #2563eb;             --info-foreground: #eff6ff;
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

/* Map the variables into Tailwind utilities (bg-primary, text-foreground, …) */
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

---

## 🧩 Components

> 40+ components across every category

**Layout & Structure** — `Container`, `Card` (+ `CardHeader` / `CardBody` / `CardFooter`), `Divider`

**Typography & Media** — `Text`, `Image`, `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Kbd`

**Data Display** — `List`, `Table`, `Accordion`, `Stat`, `Timeline`, `EmptyState`, `Carousel`

**Feedback & Loading** — `ToastProvider` / `useToast`, `Callout`, `Progress`, `Skeleton`, `Spinner`

**Overlay** — `Modal`, `Drawer`, `Dropdown`, `Tooltip`, `Popover`

**Navigation** — `Tabs`, `Breadcrumb`, `Pagination`, `Stepper`

**Forms** — `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `NumberInput`, `Rating`, `TagInput`, `PinInput`, `FileUpload`, `DatePicker`, `Calendar`, `Toggle`, `ToggleGroup`

**Utilities & Theming** — `CopyButton`, `ThemeToggleButton`, `cn()` class-merge utility

---

## ⚡ Next.js / SSR Support

For Next.js (App Router), add styles in:

```css
@import 'tailwindcss';
@source '../node_modules/@neuctra/ui';
```

> Ensure interactive components use `"use client"`.

---

## 🚀 Production Checklist

* Run lint & type checks
* Build before deploy
* Configure environment variables
* Enable security headers (CSP, etc.)
* Monitor bundle size

```bash
npm run build
npm run preview
```

---

## 🛠 Troubleshooting

**Styles not applying?**
Ensure Tailwind includes:

```
./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}
```

**SSR errors?**
Wrap interactive components with `"use client"`

**Module not found?**

```bash
rm -rf node_modules package-lock.json && npm install
```

---

## 📚 Documentation

👉 [https://neuctra-ui.vercel.app](https://neuctra-ui.vercel.app)

---

## 🌐 Links

* GitHub: [https://github.com/Taha-Asif-313/neuctra-ui](https://github.com/Taha-Asif-313/neuctra-ui)
* NPM: [https://www.npmjs.com/package/@neuctra/ui](https://www.npmjs.com/package/@neuctra/ui)

---

## 📄 License

MIT © Taha Asif