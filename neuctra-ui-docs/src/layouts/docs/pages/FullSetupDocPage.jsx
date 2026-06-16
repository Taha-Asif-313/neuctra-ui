import { createElement } from "react";
import CodeBlock from "../components/CodeBlock";
import Metadata from "../../../MetaData";
import { Settings, Code2, Moon, Sun, Paintbrush } from "lucide-react";
import { Container, Text } from "@neuctra/ui";

const FullSetupDocPage = () => {
  return (
    <>
      <Metadata
        title="Neuctra UI Full Setup Guide - React Frameworks + Tailwind CSS v4 Installation"
        description="Complete step-by-step setup guide for Neuctra UI. Learn how to configure Vite, Next.js, Remix, install Tailwind CSS v4, set up theme variables, enable dark mode, and verify your React project is ready for production."
        keywords="neuctra ui setup, react ui library setup, vite tailwind css v4 setup, nextjs tailwind css v4 setup, remix tailwind css v4 setup, install neuctra ui, tailwind v4 react setup, react component library setup guide, dark mode setup react, ui kit installation guide, modern react ui framework"
      />

      <div className="min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Full Setup For <code className="text-primary">@neuctra/ui</code>
            </h1>
            <p className="text-zinc-200 mt-2 max-w-2xl">
              Follow this comprehensive from-scratch setup guide to configure
              Neuctra UI with Vite, Next.js, Remix, and Tailwind CSS v4 step by
              step.
            </p>
          </div>

          {/* STEP 0 */}
          <Step
            icon={Settings}
            title="Step 0 — Create React Project"
            description="Start with a fresh React project using Vite, Next.js, or Remix."
          >
            <FrameworkTitle>Vite React</FrameworkTitle>
            <CodeBlock
              language="bash"
              code={`npm create vite@latest my-neuctra-app -- --template react`}
            />

            <CodeBlock
              language="bash"
              code={`cd my-neuctra-app
npm install`}
            />

            <p className="text-zinc-200 text-sm">
              This creates a new React project with Vite and installs initial
              dependencies.
            </p>

            <FrameworkTitle>Next.js React</FrameworkTitle>
            <CodeBlock
              language="bash"
              code={`npx create-next-app@latest my-neuctra-app`}
            />

            <CodeBlock
              language="bash"
              code={`cd my-neuctra-app
npm install`}
            />

            <p className="text-zinc-200 text-sm">
              This creates a new React project with Next.js and installs initial
              dependencies.
            </p>

            <FrameworkTitle>Remix React</FrameworkTitle>
            <CodeBlock
              language="bash"
              code={`npx create-remix@latest my-neuctra-app`}
            />

            <CodeBlock
              language="bash"
              code={`cd my-neuctra-app
npm install`}
            />

            <p className="text-zinc-200 text-sm">
              This creates a new React project with Remix and installs initial
              dependencies.
            </p>
          </Step>

          {/* STEP 1 */}
          <Step
            icon={Settings}
            title="Step 1 — Install Dependencies"
            description="Install Neuctra UI and Tailwind CSS v4 with required packages."
          >
            <CodeBlock language="bash" code={`npm install @neuctra/ui`} />

            <FrameworkTitle>Vite or Remix</FrameworkTitle>
            <CodeBlock
              language="bash"
              code={`npm install -D tailwindcss @tailwindcss/vite`}
            />

            <p className="text-zinc-200 text-sm">
              This installs the UI library and Tailwind CSS v4 with the Vite
              plugin. Note: No PostCSS or Autoprefixer needed with Tailwind v4.
            </p>

            <FrameworkTitle>Next.js</FrameworkTitle>
            <CodeBlock
              language="bash"
              code={`npm install -D tailwindcss @tailwindcss/postcss`}
            />

            <p className="text-zinc-200 text-sm">
              This installs the UI library and Tailwind CSS v4 with the PostCSS
              plugin used by Next.js.
            </p>
          </Step>

          {/* STEP 2 */}
          <Step
            icon={Code2}
            title="Step 2 — Configure Tailwind v4"
            description="Set up Tailwind CSS v4 for your React framework."
          >
            <FrameworkTitle>Vite</FrameworkTitle>
            <CodeBlock
              language="js"
              code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});`}
            />

            <p className="text-zinc-200 text-sm">
              Replace your <code>vite.config.js</code> content with this.
              Tailwind v4 uses the Vite plugin instead of separate config files.
            </p>

            <FrameworkTitle>Next.js</FrameworkTitle>
            <CodeBlock
              language="js"
              code={`const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
            />

            <p className="text-zinc-200 text-sm">
              Add this to <code>postcss.config.mjs</code> in your Next.js
              project. Tailwind v4 uses the PostCSS plugin for Next.js.
            </p>

            <FrameworkTitle>Remix</FrameworkTitle>
            <CodeBlock
              language="ts"
              code={`import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    remix(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});`}
            />

            <p className="text-zinc-200 text-sm">
              Add the Tailwind v4 Vite plugin to your Remix{" "}
              <code>vite.config.ts</code> or <code>vite.config.js</code> file.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Code2}
            title="Step 3 — Import Global CSS"
            description="Load Tailwind CSS and Neuctra UI sources in the main stylesheet for your React framework."
          >
            <FrameworkTitle>Vite</FrameworkTitle>
            <p className="text-zinc-200 text-sm">
              Use <code>src/index.css</code> or the CSS file imported in{" "}
              <code>main.jsx</code> / <code>main.tsx</code>.
            </p>

            <FrameworkTitle>Next.js</FrameworkTitle>
            <p className="text-zinc-200 text-sm">
              Use <code>app/globals.css</code> and import it from your root{" "}
              <code>app/layout.jsx</code> / <code>app/layout.tsx</code>.
            </p>

            <FrameworkTitle>Remix</FrameworkTitle>
            <p className="text-zinc-200 text-sm">
              Use <code>app/tailwind.css</code>, <code>app/root.css</code>, or
              the global CSS file imported from <code>app/root.jsx</code> /{" "}
              <code>app/root.tsx</code>.
            </p>

            <CodeBlock
              language="css"
              code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";`}
            />
          </Step>

          {/* STEP 4 */}
          <Step
            icon={Paintbrush}
            title="Step 4 — Add Theme System (Tailwind v4)"
            description="Define CSS variables and theme tokens using Tailwind v4's @theme syntax."
          >
            <CodeBlock
              language="css"
              code={`@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
@source "./src/**/*.{js,ts,jsx,tsx}";
@source "./app/**/*.{js,ts,jsx,tsx}";

/* =============================
   BASE GLOBAL STYLES
============================= */

body {
  font-family: "Poppins", sans-serif;
}

button {
  cursor: pointer;
}

/* ===== Custom Scrollbar ===== */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary);
}

/* Add light or dark theme variables here */
/* you can select only one theme or both, depending on your needs */
/* If you want dark theme remove root and add .dark class to your body or html element */

:root {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #ffffff;
  --foreground: #09090b;

  --muted: #f4f4f5;
  --muted-foreground: #71717a;

  --accent: #e4e4e7;
  --accent-foreground: #09090b;

  --border: #e4e4e7;
  --input: #f4f4f5;
  --ring: #a1a1aa;

  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

.dark {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #09090b;
  --foreground: #fafafa;

  --muted: #27272a;
  --muted-foreground: #a1a1aa;

  --accent: #18181b;
  --accent-foreground: #fafafa;

  --border: #27272a;
  --input: #18181b;
  --ring: #3f3f46;

  --destructive: #d40000;
  --destructive-foreground: #fafafa;
}

/* =============================
   TAILWIND TOKENS
============================= */
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
}`}
            />

            <p className="text-zinc-200 text-sm">
              The <code>@theme</code> block maps CSS variables to Tailwind's
              color system. This replaces the old theme.extend approach.
            </p>
          </Step>

{/* STEP 5 */}
<Step
  icon={Moon}
  title="Step 5 — Create Theme Context"
  description="Create a global theme context to manage light and dark mode across your entire application."
>
  <CodeBlock
    language="jsx"
    code={`"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      applyTheme(dark);
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setIsDark(systemDark);
      applyTheme(systemDark);
    }
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark;

    setIsDark(newDark);
    applyTheme(newDark);

    localStorage.setItem(
      "theme",
      newDark ? "dark" : "light"
    );
  };

  const setTheme = (theme) => {
    const dark = theme === "dark";

    setIsDark(dark);
    applyTheme(dark);

    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeProvider"
    );
  }

  return context;
};`}
  />

  <p className="text-zinc-200 text-sm">
    Create a <code>ThemeContext.jsx</code> file and add this code. It
    automatically detects system preferences, saves theme selection in
    localStorage, and applies the <code>dark</code> class to your HTML
    element.
  </p>
</Step>

{/* STEP 6 */}
<Step
  icon={Settings}
  title="Step 6 — Wrap Your Application"
  description="Wrap your application with ThemeProvider so theme state can be accessed anywhere."
>
  <FrameworkTitle>Vite</FrameworkTitle>
  <CodeBlock
    language="jsx"
    code={`import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`}
  />

  <p className="text-zinc-200 text-sm">
    Wrap your root application with <code>ThemeProvider</code> inside
    <code>main.jsx</code> or <code>main.tsx</code>. This makes theme
    controls available throughout your application.
  </p>

  <FrameworkTitle>Next.js App Router</FrameworkTitle>
  <CodeBlock
    language="jsx"
    code={`"use client";

import { ThemeProvider } from "../context/ThemeContext";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}`}
  />

  <CodeBlock
    language="jsx"
    code={`import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}`}
  />

  <p className="text-zinc-200 text-sm">
    Wrap your Next.js root layout with <code>ThemeProvider</code> through a
    client <code>Providers</code> component.
  </p>

  <FrameworkTitle>Remix</FrameworkTitle>
  <CodeBlock
    language="jsx"
    code={`import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}
  />

  <p className="text-zinc-200 text-sm">
    Wrap your Remix root route with <code>ThemeProvider</code> so all nested
    routes can access theme controls.
  </p>
</Step>

{/* STEP 7 */}
<Step
  icon={Sun}
  title="Step 7 — Add Theme Toggle"
  description="Use the built-in Neuctra UI ThemeToggle component to switch between light and dark modes."
>
  <CodeBlock
    language="jsx"
    code={`import { ThemeToggleButton } from "@neuctra/ui";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const theme = useTheme();

  return (
    <div className="p-10">
      <ThemeToggleButton context={theme} />
    </div>
  );
}`}
  />

  <p className="text-zinc-200 text-sm">
    Neuctra UI includes a ready-made theme toggle component. Simply pass
    the theme context returned from <code>useTheme()</code> to the
    <code>ThemeToggleButton</code> component.
  </p>
</Step>

{/* STEP 8 */}
<Step
  icon={Code2}
  title="Step 8 — Verify Theme Setup"
  description="Test that your theme system and Neuctra UI components are working correctly."
>
  <CodeBlock
    language="jsx"
    code={`import { Button, Input } from "@neuctra/ui";
import { ThemeToggleButton } from "@neuctra/ui";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const theme = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto space-y-4">
        <ThemeToggleButton context={theme} />

        <Input placeholder="Test input" />

        <Button className="w-full">
          Test Button
        </Button>
      </div>
    </div>
  );
}`}
  />

  <p className="text-zinc-200 text-sm">
    If the background, text colors, and ThemeToggleButton switch correctly
    between light and dark mode, your theme setup is complete.
  </p>
</Step>

          {/* TROUBLESHOOTING */}
          <Container className="border-t border-border pt-5 space-y-8">
            <Text as="h2" size="2xl" weight={700}>
              Troubleshooting
            </Text>

            <div className="space-y-8">
              {/* 1 */}
              <div>
                <Text as="h3" size="lg" weight={600} className="mb-2">
                  Tailwind classes not working
                </Text>

                <Text size="sm" color="muted" className="mb-3">
                  Ensure you've imported Tailwind CSS correctly in your main CSS
                  file:
                </Text>

                <CodeBlock
                  language="css"
                  code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
@source "./src/**/*.{js,ts,jsx,tsx}";`}
                />
              </div>

              {/* 2 */}
              <div>
                <Text as="h3" size="lg" weight={600} className="mb-2">
                  Build errors with Vite
                </Text>

                <Text size="sm" color="muted" className="mb-3">
                  Make sure your vite config includes the Tailwind plugin:
                </Text>

                <CodeBlock
                  language="js"
                  code={`import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
                />
              </div>

              {/* 3 */}
              <div>
                <Text
                  as="h3"
                  size="lg"
                  weight={600}
                  className="mb-2"
                  id="theme-colors"
                  data-section="theme"
                >
                  Theme colors not applying
                </Text>

                <Text
                  size="sm"
                  color="muted"
                  className="mb-3"
                  aria-describedby="theme-colors"
                >
                  Verify your <code>@theme</code> block is properly configured.
                  All CSS variables support full passthrough via{" "}
                  <code>{"...rest"}</code> in your component system.
                </Text>

                <CodeBlock
                  language="css"
                  code={`@theme {
  --color-primary: var(--primary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}`}
                />
              </div>

              {/* 4 */}
              <div>
                <Text
                  as="h3"
                  size="lg"
                  weight={600}
                  className="mb-2"
                  id="dark-mode"
                  data-section="dark-mode"
                >
                  Dark mode not switching
                </Text>

                <Text
                  size="sm"
                  color="muted"
                  className="mb-3"
                  aria-describedby="dark-mode"
                >
                  Check that your CSS has both <code>:root</code> and{" "}
                  <code>.dark</code> variables. These values are fully
                  extensible via <code>{"...rest"}</code> props in your theme
                  system.
                </Text>

                <CodeBlock
                  language="css"
                  code={`:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ffffff;
}`}
                />
              </div>

              {/* 5 — IMPORTANT NOTE */}
              <div className="pt-4 border-t border-border">
                <Text as="h3" size="lg" weight={600} className="mb-2">
                  UI not styled / Tailwind not installed
                </Text>

                <Text size="sm" color="muted" className="mb-3">
                  If you're not using Tailwind CSS, import the Neuctra UI
                  stylesheet directly in your main entry file:
                </Text>

                <CodeBlock
                  language="js"
                  code={`import "@neuctra/ui/dist/ui.css";`}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

/* STEP COMPONENT */
const Step = ({ icon: Icon, title, description, children }) => (
  <div className=" space-y-4">
    <div className="flex items-center gap-3">
      {createElement(Icon, { className: "text-primary", size: 18 })}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-zinc-200 text-sm">{description}</p>

    <div className="space-y-3">{children}</div>
  </div>
);

const FrameworkTitle = ({ children }) => (
  <h3 className="pt-2 text-sm font-semibold text-primary">{children}</h3>
);

export default FullSetupDocPage;
