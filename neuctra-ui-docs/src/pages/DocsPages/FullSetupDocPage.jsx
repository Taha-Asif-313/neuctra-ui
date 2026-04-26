import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { Settings, Palette, Code2, Moon, Sun, Paintbrush } from "lucide-react";
import { Container, Text } from "@neuctra/ui";

const FullSetupDocPage = () => {
  return (
    <>
      <Metadata
        title="Full Setup — Neuctra UI"
        description="Complete from-scratch setup guide for Neuctra UI with Vite and Tailwind CSS v4."
      />

      <div className="min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">Full Setup For <code className="text-primary" >@neuctra/ui</code></h1>
            <p className="text-zinc-200 mt-2 max-w-2xl">
              Follow this comprehensive from-scratch setup guide to configure
              Neuctra UI with Vite and Tailwind CSS v4 step by step.
            </p>
          </div>

          {/* STEP 0 */}
          <Step
            icon={Settings}
            title="Create Vite Project"
            description="Start with a fresh Vite React project."
          >
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
          </Step>

          {/* STEP 1 */}
          <Step
            icon={Settings}
            title="Step 1 — Install Dependencies"
            description="Install Neuctra UI and Tailwind CSS v4 with required packages."
          >
            <CodeBlock language="bash" code={`npm install @neuctra/ui`} />

            <CodeBlock
              language="bash"
              code={`npm install -D tailwindcss @tailwindcss/vite`}
            />

            <p className="text-zinc-200 text-sm">
              This installs the UI library and Tailwind CSS v4 with the Vite
              plugin. Note: No PostCSS or Autoprefixer needed with Tailwind v4.
            </p>
          </Step>

          {/* STEP 2 */}
          <Step
            icon={Code2}
            title="Step 2 — Configure Tailwind v4"
            description="Set up Tailwind CSS v4 using the Vite plugin approach (no config file needed)."
          >
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
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Palette}
            title="Step 3 — Add Tailwind CSS v4"
            description="Import Tailwind CSS v4 and configure content sources using the new syntax."
          >
            <CodeBlock
              language="css"
              code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
@source "./src/**/*.{js,ts,jsx,tsx}";`}
            />

            <p className="text-zinc-200 text-sm">
              Add this in your <code>src/index.css</code> or{" "}
              <code>src/globals.css</code>. The <code>@source</code> directive
              replaces the old content array configuration.
            </p>
          </Step>

          {/* STEP 4 */}
          <Step
            icon={Paintbrush}
            title="Step 4 — Add Theme System (Tailwind v4)"
            description="Define CSS variables and theme tokens using Tailwind v4's @theme syntax."
          >
            <CodeBlock
              language="css"
              code={`/* =============================
   THEME SYSTEM
============================= */
/* NEUCTRA_THEME_START */

/* LIGHT THEME */
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

  --destructive: #d40000;
  --destructive-foreground: #fafafa;
}

/* DARK THEME */
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

/* SYSTEM DARK MODE */
@media (prefers-color-scheme: dark) {
  :root {
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
}

/* NEUCTRA_THEME_END */

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
            title="Step 5 — Enable Dark Mode"
            description="Implement dark mode toggle with system preference detection."
          >
            <CodeBlock
              language="js"
              code={`// Dark mode toggle function
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", 
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
};

// Initialize theme on app load
const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  }
};

// Call on app initialization
initTheme();`}
            />

            <p className="text-zinc-200 text-sm">
              This handles dark mode with localStorage persistence and system
              preference detection. Call <code>initTheme()</code> when your app
              starts.
            </p>
          </Step>

          {/* STEP 6 */}
          <Step
            icon={Sun}
            title="Step 6 — Test Your Setup"
            description="Verify that Neuctra UI components are working correctly with Tailwind v4."
          >
            <Container className="space-y-5">
              {/* Title */}
              <div>
                <Text as="h1" size="2xl" weight={700} className="mb-4">
                  Neuctra UI Test
                </Text>

                <CodeBlock
                  language="jsx"
                  code={`import React from 'react';
import { Button, Input } from '@neuctra/ui';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto space-y-4">
        <Input placeholder="Test input" className="mb-4" />
        <Button className="w-full">
          Test Button
        </Button>
      </div>
    </div>
  );
}

export default App;`}
                />
              </div>

              {/* Description */}
              <Text size="sm" color="muted" className="leading-relaxed">
                Replace your <code>src/App.jsx</code> with this test code to
                verify everything works correctly.
              </Text>
            </Container>
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
      <Icon className="text-primary" size={18} />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-zinc-200 text-sm">{description}</p>

    <div className="space-y-3">{children}</div>
  </div>
);

export default FullSetupDocPage;
