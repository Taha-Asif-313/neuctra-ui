"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Monitor, Moon, Sun } from "lucide-react";
import {
  ThemeProvider,
  useTheme,
  ThemeToggleButton,
  Card,
  CardBody,
  Badge,
  ToggleGroup,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const themeProviderFaq = buildComponentFaq("ThemeProvider");

// In-memory storage so the previews never touch this site's saved theme.
const memoryStorage = (() => {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
})();

function HeaderToggle() {
  const { resolvedMode, toggle } = useTheme();
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Acme Dashboard</p>
          <p className="text-xs text-muted-foreground">Theme: {resolvedMode}</p>
        </div>
        <ThemeToggleButton context={{ isDark: resolvedMode === "dark", toggleTheme: toggle }} />
      </CardBody>
    </Card>
  );
}

function AppearanceSettings() {
  const { mode, resolvedMode, setMode } = useTheme();
  return (
    <Card className="w-full max-w-md">
      <CardBody className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Appearance</p>
            <p className="text-sm text-secondary">Choose how Acme looks on this device.</p>
          </div>
          <Badge variant="soft" text={resolvedMode} className="shrink-0" />
        </div>
        <ToggleGroup
          aria-label="Theme"
          fullWidth
          value={mode}
          onChange={(value) => value && setMode(value)}
          options={[
            { value: "light", label: "Light", icon: <Sun /> },
            { value: "dark", label: "Dark", icon: <Moon /> },
            { value: "system", label: "System", icon: <Monitor /> },
          ]}
        />
      </CardBody>
    </Card>
  );
}

function ControlledDemo() {
  const [mode, setMode] = useState("dark");
  return (
    <div className="w-full max-w-md space-y-3">
      <ThemeProvider mode={mode} onModeChange={setMode} applyTo="wrapper" storage={memoryStorage} storageKey="docs-controlled">
        <HeaderToggle />
      </ThemeProvider>
      <p className="text-xs text-muted-foreground">Parent state: {mode}</p>
    </div>
  );
}

function PropsTable({ rows }) {
  return (
    <div className="border border-zinc-800 rounded-xl overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-zinc-900 text-gray-200">
          <tr>
            <th scope="col" className="text-left p-3">Prop</th>
            <th scope="col" className="text-left p-3">Type</th>
            <th scope="col" className="text-left p-3">Default</th>
            <th scope="col" className="text-left p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 text-gray-300">
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const providerProps = [
  ["children", "ReactNode", "-", "Content that can call useTheme() (required)."],
  ["mode", '"light" | "dark" | "system"', "-", "Controlled mode. Omit to let the provider own it."],
  ["defaultMode", '"light" | "dark" | "system"', '"system"', "Initial mode in uncontrolled mode (a saved mode wins)."],
  ["onModeChange", "(mode: ThemeMode) => void", "-", "Fired whenever the mode should change."],
  ["storageKey", "string", '"neuctra-theme"', "Key used to persist the mode."],
  ["storage", "ThemeStorage", "window.localStorage", "Custom { getItem, setItem } storage adapter."],
  ["applyTo", '"document" | "wrapper"', '"document"', "Apply the theme to <html>, or only to this provider's wrapper."],
  ["attribute", '"class" | "data-theme" | "both"', '"class"', 'Mark dark mode with a "dark" class, a data-theme attribute, or both.'],
  ["disableTransitionOnChange", "boolean", "false", "Suppresses CSS transitions for the frame the theme switches."],
  ["className", "string", "-", 'Styles the wrapper (display: contents by default).'],
  ["style", "CSSProperties", "-", "Inline styles for the wrapper."],
];

const hookProps = [
  ["mode", '"light" | "dark" | "system"', "-", "The selected mode."],
  ["resolvedMode", '"light" | "dark"', "-", "The applied theme after resolving system against the OS preference."],
  ["setMode", "(mode: ThemeMode) => void", "-", "Selects and persists a mode."],
  ["toggle", "() => void", "-", "Switches between light and dark based on resolvedMode."],
];

const ThemeProviderDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ThemeProvider Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Light, dark and system theming for your whole app. Persists the
            choice, follows OS changes, syncs across tabs, and exposes a
            useTheme hook for toggles and settings screens.
          </p>
        </header>

        <section aria-labelledby="ThemeProvider-import">
          <h2 id="ThemeProvider-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ThemeProvider, useTheme } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="ThemeProvider-example-0">
          <h2 id="ThemeProvider-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            App Setup
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wrap your app once. The provider toggles the dark class on html,
            which your theme tokens (and Tailwind dark variants) key off.
          </p>
          <CodeBlock
            code={`// app/providers.jsx
"use client";
import { ThemeProvider } from "@neuctra/ui";

export default function Providers({ children }) {
  return (
    <ThemeProvider defaultMode="system" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}`}
          />
        </section>

        <section aria-labelledby="ThemeProvider-example-1">
          <h2 id="ThemeProvider-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Theme Toggle in a Header
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            useTheme pairs with ThemeToggleButton. This preview is scoped with
            applyTo="wrapper" and in-memory storage so it leaves the docs theme alone.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function HeaderToggle() {
  const { resolvedMode, toggle } = useTheme();
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Acme Dashboard</p>
          <p className="text-xs text-muted-foreground">Theme: {resolvedMode}</p>
        </div>
        <ThemeToggleButton context={{ isDark: resolvedMode === "dark", toggleTheme: toggle }} />
      </CardBody>
    </Card>
  );
}

<ThemeProvider defaultMode="dark" applyTo="wrapper" storage={memoryStorage}>
  <HeaderToggle />
</ThemeProvider>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ThemeProvider defaultMode="dark" applyTo="wrapper" storage={memoryStorage} storageKey="docs-toggle">
                  <HeaderToggle />
                </ThemeProvider>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ThemeProvider-example-2">
          <h2 id="ThemeProvider-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Appearance Settings
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A settings panel with Light, Dark and System, built on the Neuctra
            ToggleGroup segmented control. In System mode, resolvedMode follows
            the OS preference live.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function AppearanceSettings() {
  const { mode, resolvedMode, setMode } = useTheme();
  return (
    <Card className="w-full max-w-md">
      <CardBody className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Appearance</p>
            <p className="text-sm text-secondary">Choose how Acme looks on this device.</p>
          </div>
          <Badge variant="soft" text={resolvedMode} className="shrink-0" />
        </div>
        <ToggleGroup
          aria-label="Theme"
          fullWidth
          value={mode}
          onChange={(value) => value && setMode(value)}
          options={[
            { value: "light", label: "Light", icon: <Sun /> },
            { value: "dark", label: "Dark", icon: <Moon /> },
            { value: "system", label: "System", icon: <Monitor /> },
          ]}
        />
      </CardBody>
    </Card>
  );
}

<ThemeProvider applyTo="wrapper" storage={memoryStorage}>
  <AppearanceSettings />
</ThemeProvider>`}
            previewContent={
              <div className="w-full py-4">
                <ThemeProvider applyTo="wrapper" storage={memoryStorage} storageKey="docs-settings">
                  <AppearanceSettings />
                </ThemeProvider>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ThemeProvider-example-3">
          <h2 id="ThemeProvider-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Mode
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass mode and onModeChange to keep the theme in your own state, for
            example when it is stored on the user profile.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [mode, setMode] = useState("dark");

<div className="w-full max-w-md space-y-3">
  <ThemeProvider mode={mode} onModeChange={setMode} applyTo="wrapper" storage={memoryStorage}>
    <HeaderToggle />
  </ThemeProvider>
  <p className="text-xs text-muted-foreground">Parent state: {mode}</p>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ThemeProvider-props">
          <h2 id="ThemeProvider-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the ThemeProvider component.</p>
          <PropsTable rows={providerProps} />
        </section>

        <section aria-labelledby="useTheme-props">
          <h2 id="useTheme-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            useTheme Return Value
          </h2>
          <p className="text-sm text-gray-400 mb-4">useTheme() throws if called outside a ThemeProvider.</p>
          <PropsTable rows={hookProps} />
        </section>

        <section aria-labelledby="ThemeProvider-a11y">
          <h2 id="ThemeProvider-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>defaultMode="system" respects the user's OS color scheme and follows changes live.</li>
            <li>The provider sets color-scheme, so native controls and scrollbars match the theme.</li>
            <li>The theme is only applied after the saved choice is read, avoiding a light and dark flicker on load.</li>
            <li>Give theme toggles an accessible name (ThemeToggleButton does) and expose mode pickers as a labelled group, such as a ToggleGroup with aria-label="Theme" (each option reports aria-pressed).</li>
            <li>Make sure both palettes meet contrast requirements; the provider only switches between them.</li>
          </ul>
        </section>

        <ComponentFaq qa={themeProviderFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ThemeProviderDocs;
