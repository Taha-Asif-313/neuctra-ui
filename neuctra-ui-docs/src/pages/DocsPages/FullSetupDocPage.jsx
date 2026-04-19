import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { Settings, Palette, Code2, Moon, Sun, Paintbrush } from "lucide-react";

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
            <h1 className="text-4xl font-bold text-white">Full Setup</h1>
            <p className="text-zinc-200 mt-2 max-w-2xl">
              Follow this comprehensive from-scratch setup guide to configure Neuctra UI with Vite and Tailwind CSS v4 step by step.
            </p>
          </div>

          {/* STEP 0 */}
          <Step
            icon={Settings}
            title="Step 0 — Create Vite Project"
            description="Start with a fresh Vite React project."
          >
            <CodeBlock language="bash" code={`npm create vite@latest my-neuctra-app -- --template react`} />

            <CodeBlock
              language="bash"
              code={`cd my-neuctra-app
npm install`}
            />

            <p className="text-zinc-200 text-sm">
              This creates a new React project with Vite and installs initial dependencies.
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
              This installs the UI library and Tailwind CSS v4 with the Vite plugin. Note: No PostCSS or Autoprefixer needed with Tailwind v4.
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
              Replace your <code>vite.config.js</code> content with this. Tailwind v4 uses the Vite plugin instead of separate config files.
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
              Add this in your <code>src/index.css</code> or <code>src/globals.css</code>. The <code>@source</code> directive replaces the old content array configuration.
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
              code={`/* CSS Variables for theming */
:root {
  --primary: #00c214;
  --background: #ffffff;
  --foreground: #0f172a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ffffff;
}

/* Tailwind v4 theme tokens */
@theme {
  --color-primary: var(--primary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}`}
            />

            <p className="text-zinc-200 text-sm">
              The <code>@theme</code> block maps CSS variables to Tailwind's color system. This replaces the old theme.extend approach.
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
              This handles dark mode with localStorage persistence and system preference detection. Call <code>initTheme()</code> when your app starts.
            </p>
          </Step>

          {/* STEP 6 */}
          <Step
            icon={Sun}
            title="Step 6 — Test Your Setup"
            description="Verify that Neuctra UI components are working correctly with Tailwind v4."
          >
            <CodeBlock
              language="jsx"
              code={`import React from 'react';
import { Button, Card, Input } from '@neuctra/ui';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto space-y-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Neuctra UI Test</h1>
          <Input placeholder="Test input" className="mb-4" />
          <Button className="w-full">
            Test Button
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default App;`}
            />

            <p className="text-zinc-200 text-sm">
              Replace your <code>src/App.jsx</code> with this test code to verify everything works correctly.
            </p>
          </Step>

          {/* TROUBLESHOOTING */}
          <div className="border-t border-gray-800 pt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Troubleshooting</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tailwind classes not working</h3>
                <p className="text-zinc-200 text-sm mb-2">
                  Ensure you've imported Tailwind CSS correctly in your main CSS file:
                </p>
                <CodeBlock
                  language="css"
                  code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";
@source "./src/**/*.{js,ts,jsx,tsx}";`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Build errors with Vite</h3>
                <p className="text-zinc-200 text-sm mb-2">
                  Make sure your vite.config.js includes the Tailwind plugin:
                </p>
                <CodeBlock
                  language="js"
                  code={`import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Theme colors not applying</h3>
                <p className="text-zinc-200 text-sm mb-2">
                  Verify your @theme block is properly configured with CSS variables:
                </p>
                <CodeBlock
                  language="css"
                  code={`@theme {
  --color-primary: var(--primary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Dark mode not switching</h3>
                <p className="text-zinc-200 text-sm mb-2">
                  Check that your CSS has both :root and .dark theme definitions:
                </p>
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
            </div>
          </div>
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
