# Neuctra UI CLI

[![npm version](https://img.shields.io/npm/v/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)
[![npm downloads](https://img.shields.io/npm/dm/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)
[![License](https://img.shields.io/github/license/neuctra/ui.svg?style=flat-square)](https://github.com/neuctra/ui/blob/main/LICENSE)

The Neuctra UI CLI prepares a React project to use [Neuctra UI](https://neuctra.dev). It installs the component library, adds the theme styles and context, and connects the theme providers to your app.

## Requirements

- An existing React project with a `package.json`.
- Node.js and npm installed.
- A global CSS file for Tailwind styles. The CLI looks for common files such as `src/index.css`, `src/app.css`, `src/app/globals.css`, and `app/globals.css`.

The CLI supports Vite React, Next.js App Router, Remix, and React Router projects. It can generate JavaScript or TypeScript setup files.

## Set up Neuctra UI

Run the CLI from your project directory:

```bash
npx @neuctra/ui-cli init
```

The setup prompts let you choose:

1. **Framework:** Vite React, Next.js App Router, Remix, or React Router. The CLI detects a likely framework and selects it as the default.
2. **Language:** JavaScript or TypeScript. The CLI detects TypeScript from project files and uses it as the default when found.
3. **Primary color:** Choose Neuctra Green, Blue, Violet, Rose, Amber, Teal, or Custom. The custom option accepts a 3- or 6-digit hex color, such as `#2563eb`.

Use the up and down arrow keys to move through each selector, then press Enter to choose an option.

After you choose the options, the CLI installs `@neuctra/ui`, checks the React and Tailwind dependencies, writes the theme styles to the CSS file it found, creates the theme context, and connects the providers to the framework root where it can identify the expected file structure.

> **CSS file changes:** Setup replaces the selected CSS file with Neuctra UI's Tailwind v4 theme stylesheet. Save a copy of any existing custom CSS before running the command; you can add your styles back afterward.

## What setup creates

The generated context and provider files use `.jsx`/`.tsx` based on your language choice. The context is placed in the app source directory:

| Framework | Theme context location | Provider integration |
| --- | --- | --- |
| Vite React | `src/contexts/ThemeContext` | Wraps the detected `main` or `index` entry |
| Next.js App Router | `app/contexts/ThemeContext` or `src/app/contexts/ThemeContext` | Creates a client `Providers` component and connects it to the root layout |
| Remix | `app/contexts/ThemeContext` | Wraps the root route outlet with the providers |
| React Router | `app/contexts/ThemeContext` or `src/app/contexts/ThemeContext` | Wraps the root route outlet with the providers |

The CLI may not automatically connect providers if your project uses a custom root structure. In that case, it reports the file it could not update. You can connect the providers manually as shown below.

## Noninteractive setup

Pass options to skip the interactive selectors. This is useful in scripts and CI environments:

```bash
npx @neuctra/ui-cli init --framework=next --language=ts --primary-color=#2563eb --yes
```

Available values:

- `--framework=vite`, `--framework=next`, `--framework=remix`, or `--framework=react-router`
- `--language=js` or `--language=ts`
- `--primary-color=#RRGGBB` or a 3-digit hex value such as `#abc`
- `--yes` to skip prompts and use detected defaults for any omitted options

If no framework is detected and `--framework` is omitted, noninteractive setup defaults to Next.js App Router. The default language is JavaScript unless TypeScript files are detected. The default primary color is Neuctra Green (`#00c214`).

## Use Neuctra UI components

Import components from `@neuctra/ui` and use them in your React components:

```jsx
import { Button, Container, Input } from "@neuctra/ui";

export function Example() {
  return (
    <Container size="md" className="space-y-4 p-6">
      <Input placeholder="Your email" />
      <Button>Continue</Button>
    </Container>
  );
}
```

Use the component documentation for available components, properties, and examples: [Neuctra UI documentation](https://neuctra.dev).

## Use the theme context

The generated `useTheme` hook provides `isDark`, `toggleTheme`, and `setTheme`. Import it from the generated context file. The path depends on the framework; for example, in a Vite project:

```jsx
import { useTheme } from "./contexts/ThemeContext";

export function ThemeControl() {
  const { isDark, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {isDark ? "Dark" : "Light"}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
      <button onClick={() => setTheme("light")}>Use light theme</button>
    </div>
  );
}
```

The theme context reads a saved preference from local storage, otherwise it uses the system color preference. The generated CSS defines the light and dark color tokens and maps them to Tailwind v4 theme utilities such as `bg-background`, `text-foreground`, and `bg-primary`.

## Connect providers manually

If the CLI could not update your app root, import the generated `ThemeProvider` and Neuctra UI's `ToastProvider`, then wrap your app or route outlet. Adjust the context import path for your file location and framework:

```jsx
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "@neuctra/ui";

export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ToastProvider>
  );
}
```

For Vite, render your app inside `<AppProviders>`. For Next.js App Router, keep this provider component in a client component and place it inside the root layout's `<body>`. For Remix and React Router, wrap the root route's `<Outlet />`.

## CLI commands

```bash
npx @neuctra/ui-cli init     # Configure the current project
npx @neuctra/ui-cli --help   # Show command help
npx @neuctra/ui-cli --version
```

You can also install the CLI globally and use `neuctra-ui init`:

```bash
npm install --global @neuctra/ui-cli
neuctra-ui init
```

## Troubleshooting

### The CLI cannot find a CSS file

Create or rename your global stylesheet to a supported location, such as `src/index.css` for Vite or `app/globals.css` for Next.js, then run the setup again.

### Providers were not connected automatically

The project may use a custom entry or root route. Check the CLI output for the detected files, then wrap the app root with `ThemeProvider` from the generated `ThemeContext` and `ToastProvider` from `@neuctra/ui`. Make sure the provider imports use paths relative to the file where they appear.

### The selected theme color does not appear

Confirm the application imports the configured global CSS file. The selected primary color is written to the `--primary` and `--ring` CSS variables in both the light and dark theme blocks.

### Tailwind utilities from Neuctra UI do not appear

Confirm Tailwind CSS v4 is installed and configured for your framework, and that the global stylesheet is imported by the application. See the [Neuctra UI setup documentation](https://neuctra.dev) for framework-specific Tailwind configuration.

## Links

- [Neuctra UI documentation](https://neuctra.dev)
- [Neuctra UI on npm](https://www.npmjs.com/package/@neuctra/ui)
- [CLI on npm](https://www.npmjs.com/package/@neuctra/ui-cli)
- [GitHub repository and issue tracker](https://github.com/neuctra/ui)

## License

MIT. See the [LICENSE](LICENSE) file.
