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

Customize your design system using CSS variables:

```css
:root {
  --primary: #00c214;
  --primary-content: #ffffff;
}

[data-theme='dark'] {
  --primary: #1fb6ff;
  --primary-content: #0f172a;
}
```

> 💡 Easily extend tokens for colors, spacing, radius, and more.

---

## 🧩 Components

> Growing component ecosystem

* `Button`
* `Input`
* `TextArea`
* `Dropdown`
* `Accordion`
* `Drawer`
* `Alert`
* `AudioPlayer`
* `VideoPlayer`
* More coming soon...

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