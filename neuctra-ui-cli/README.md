# Neuctra UI CLI

[![npm version](https://img.shields.io/npm/v/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)
[![npm downloads](https://img.shields.io/npm/dm/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)

Set up [Neuctra UI](https://ui.neuctra.com) in an existing React project with one command. The CLI installs the library, configures Tailwind CSS v4 for your bundler, merges the theme tokens into your global stylesheet without removing your own CSS, and wraps your app in `ThemeProvider` and `ToastProvider` with no theme flash on load.

```bash
npx @neuctra/ui-cli@latest init
```

## Requirements

- Node.js 18.18 or newer.
- An existing React project with a `package.json`. Supported: **Next.js App Router**, **Vite + React**, **React Router** (framework mode) and **Remix**.
- npm, pnpm, yarn or bun. The CLI detects the package manager from your lockfile.

No project yet? Create one first:

```bash
npx create-next-app@latest my-app        # Next.js
npm create vite@latest my-app -- --template react-ts   # Vite
```

## What `init` does

1. **Detects** your framework, language (TypeScript or JavaScript) and package manager, then asks for the framework, language and a primary brand color (or uses the defaults with `--yes`).
2. **Installs** `@neuctra/ui` and `lucide-react`, and makes sure React is 18 or newer.
3. **Sets up Tailwind CSS v4** for your bundler:
   - Vite, React Router and Remix: adds the `@tailwindcss/vite` plugin to `vite.config`.
   - Next.js: keeps the `@tailwindcss/turbopack` rule of Next.js 16 templates, or writes a v4 `postcss.config.mjs` (the old file is backed up).
   - Warns when a Tailwind v3 `tailwind.config.*` file is still present.
4. **Finds your global stylesheet**: the CSS file your app root already imports, or a conventional file. If there is none, it creates one and imports it.
5. **Merges the theme** into that stylesheet. Your own rules stay where they are:
   - `@import "tailwindcss";` and an `@source` line pointing at `node_modules/@neuctra/ui`, so Tailwind generates the library's classes;
   - `@custom-variant dark (&:where(.dark, .dark *));` so dark mode follows the `.dark` class;
   - a managed block between `/* NEUCTRA_THEME_START */` and `/* NEUCTRA_THEME_END */` with light and dark tokens, the `@theme` mapping (`bg-primary`, `text-foreground`, ...) and base body colors.

   Tailwind v3 `@tailwind` directives are replaced. The original file is saved once as `<file>.neuctra-backup`.
6. **Wraps your app** in `ThemeProvider` and `ToastProvider` from `@neuctra/ui`:

   | Framework | Where |
   |---|---|
   | Next.js App Router | creates `app/providers.tsx` and wraps `{children}` in `app/layout.tsx` |
   | Vite | wraps `<App />` in `src/main.tsx` (inside `StrictMode`) |
   | React Router / Remix | wraps `<Outlet />` in `app/root.tsx` |

7. **Prevents a theme flash**: adds a tiny inline script to `<head>` (the same as `getThemeScript()` from `@neuctra/ui`) that applies the saved or system theme before the first paint, and adds `suppressHydrationWarning` to `<html>`.

At the end it prints every file it changed and anything it could not do automatically.

### Re-running

Running `init` again is safe. It only replaces the managed theme block (for example to change the primary color), never duplicates imports or providers, and keeps the first backup.

### Projects set up with an older CLI

Older versions generated `contexts/ThemeContext.(jsx|tsx)`. If that file is unchanged, `init` turns it into a small wrapper around the library's `ThemeProvider` (keeping the saved theme), so existing imports such as `import { useTheme } from "./contexts/ThemeContext"` keep working. Customised context files are left alone and reported.

## Options

```bash
npx @neuctra/ui-cli@latest init [options]
```

| Option | Description |
|---|---|
| `-y`, `--yes` | Use the detected values and defaults; no prompts (also used automatically in CI or without a TTY) |
| `--framework <id>` | `next`, `vite`, `react-router` or `remix` |
| `--language <id>` | `ts` or `js` |
| `--primary-color <hex>` | Brand color, e.g. `#2563eb` (default `#00c214`). The text color on top of it is chosen automatically for contrast |
| `--css <path>` | Use this stylesheet instead of auto-detecting one |
| `--skip-install` | Do not install packages; print what to install instead |

Example for scripts and AI agents:

```bash
npx @neuctra/ui-cli@latest init --yes --framework next --language ts --primary-color=#0f766e
```

Set `NEUCTRA_CLI_VERBOSE=1` to see the package manager's output.

## After setup

```tsx
import { Button, Card, CardBody, ThemeToggleButton } from "@neuctra/ui";

export default function Page() {
  return (
    <main className="mx-auto max-w-xl space-y-6 p-8">
      <ThemeToggleButton />
      <Card variant="outline">
        <CardBody>
          <Button>Get started</Button>
        </CardBody>
      </Card>
    </main>
  );
}
```

`<ThemeToggleButton />` reads the `ThemeProvider` directly, so it needs no props. To read or change the theme yourself:

```tsx
import { useTheme } from "@neuctra/ui";

function ThemeMenu() {
  const { mode, resolvedMode, setMode, isDark, toggleTheme } = useTheme();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return <button onClick={() => setMode("system")}>Use system theme ({resolvedMode})</button>;
}
```

Change colors any time by editing the values inside the managed block in your CSS, or run `init` again with a new `--primary-color`.

## Troubleshooting

**Components have no styles.** Check that your app root imports the global CSS file, and that the `@source` path in it points from the CSS file's folder to `node_modules/@neuctra/ui`. Run `init` again to fix both.

**The page flashes light before turning dark.** The inline theme script is missing from `<head>`. Run `init` again, or add `getThemeScript()` from `@neuctra/ui` yourself.

**React warns about a hydration mismatch on `<html>`.** Add `suppressHydrationWarning` to the `<html>` element (the theme script changes its class before React hydrates).

**Providers were not added.** Your entry or root file has an unusual structure. The CLI tells you which file; wrap your app root in `<ThemeProvider><ToastProvider>…</ToastProvider></ThemeProvider>` from `@neuctra/ui`.

**Something went wrong.** Every file the CLI changed has a `.neuctra-backup` copy next to it.

## Commands

| Command | Description |
|---|---|
| `init` | Set up Neuctra UI in the current project |
| `-h`, `--help` | Show help |
| `-v`, `--version` | Show the version |

## Links

- Documentation: https://ui.neuctra.com/docs
- Full setup guide: https://ui.neuctra.com/docs/full-setup
- npm: https://www.npmjs.com/package/@neuctra/ui-cli

## License

MIT
