import React from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import {
  Terminal,
  Palette,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Check,
} from "lucide-react";

const QuickStartDocsPage = () => {
  return (
    <>
      <Metadata
        title="Quick Start — Neuctra UI"
        description="Set up Neuctra UI instantly using the CLI."
      />

      <div className="bg-transparent text-white min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">Quick Start</h1>
            <p className="text-gray-200 mt-2">
              The fastest way to set up Neuctra UI is using the CLI. It
              installs, configures, and prepares everything automatically.
            </p>
          </div>

          {/* STEP 1 */}
          <Step
            icon={Terminal}
            title="Step 1 — Initialize with CLI"
            description="Run the CLI command to install Neuctra UI and auto-configure your project."
          >
            <CodeBlock language="bash" code={`npx @neuctra/ui-cli init`} />

            <p className="text-gray-200 text-sm">This command will:</p>

            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>
                Install <code>@neuctra/ui</code>
              </li>
              <li>Detect your CSS file automatically</li>
              <li>Inject Tailwind + theme config</li>
              <li>Create ThemeContext</li>
              <li>Wrap your app with ThemeProvider</li>
            </ul>
          </Step>

          {/* STEP 2 */}
          <Step
            icon={Palette}
            title="Step 2 — Customize Your Theme"
            description="Edit your main CSS file to control colors and design tokens."
          >
            <p className="text-gray-200">Open your main CSS file:</p>

            <ul className="text-gray-200 text-sm list-disc ml-5">
              <li>
                <code>index.css</code>
              </li>
              <li>
                <code>globals.css</code>
              </li>
              <li>
                <code>app.css</code>
              </li>
            </ul>

            <CodeBlock
              language="css"
              code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";


/* NEUCTRA_THEME_START */

/* =============================
   BASE THEME (LIGHT)
============================= */
:root {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --primary-soft: color-mix(in srgb, var(--primary) 10%, white);
  --primary-muted: color-mix(in srgb, var(--primary) 20%, white);
  --primary-border: color-mix(in srgb, var(--primary) 30%, white);
  --primary-ring: color-mix(in srgb, var(--primary) 50%, transparent);

  --background: #ffffff;
  --foreground: #0f172a;

  --muted: color-mix(in srgb, var(--primary) 6%, #f1f5f9);
  --muted-foreground: #64748b;

  --accent: color-mix(in srgb, var(--primary) 8%, #f1f5f9);
  --accent-foreground: #0f172a;

  --border: color-mix(in srgb, var(--primary) 12%, #e2e8f0);
  --input: #e2e8f0;
  --ring: color-mix(in srgb, var(--primary) 60%, transparent);

  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

/* =============================
   DARK THEME
============================= */
.dark {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #0a0a0a;
  --foreground: #ffffff;

  --primary-soft: color-mix(in srgb, var(--primary) 15%, black);
  --primary-muted: color-mix(in srgb, var(--primary) 25%, black);
  --primary-border: color-mix(in srgb, var(--primary) 35%, black);

  --muted: #1f2937;
  --muted-foreground: #9ca3af;

  --accent: #1f2937;
  --accent-foreground: #ffffff;

  --border: color-mix(in srgb, var(--primary) 20%, #1f2937);
  --input: #1f2937;
  --ring: color-mix(in srgb, var(--primary) 60%, transparent);

  --destructive: #7f1d1d;
  --destructive-foreground: #ffffff;
}

/* =============================
   SYSTEM DARK MODE
============================= */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ffffff;
  }
}

/* =============================
   TAILWIND v4 THEME TOKENS
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
}

/* NEUCTRA_THEME_END */
`}
            />

            <p className="text-gray-200 flex items-center gap-2 text-sm">
              <Lightbulb size={14} /> All colors are controlled via CSS
              variables. Change them to match your brand instantly.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Sparkles}
            title="Step 3 — Providers (Auto Configured)"
            description="The CLI automatically sets up required providers in your main React entry file."
          >
            <CodeBlock
              language="tsx"
              code={`// These providers are automatically added by the CLI
// No manual setup required

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "./contexts/ThemeContext"; // adjust path if needed
import { ToastProvider } from "@neuctra/ui";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ToastProvider>
  </StrictMode>
);`}
            />

            <p className="text-gray-200 text-sm">
              The CLI automatically wraps your app with:
            </p>

            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>
                <code>ThemeProvider</code> → Handles dark/light mode, system
                sync, and persistence
              </li>
              <li>
                <code>ToastProvider</code> → Enables toast notifications
                globally
              </li>
            </ul>

            <p className="text-yellow-400 flex items-center gap-2 text-sm mt-2">
              <AlertTriangle size={14} /> Avoid adding these providers manually
              again to prevent duplicate wrappers.
            </p>
          </Step>

          {/* STEP 4 */}
          <Step
            icon={Sparkles}
            title="Step 4 — Use Theme Toggle"
            description="Dark mode is already configured. Just use the hook."
          >
            <CodeBlock
              language="tsx"
              code={`import { useTheme } from "./contexts/ThemeContext"; // adjust path if contexts folder is located elsewhere

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}`}
            />

            <p className="text-gray-200 text-sm">
              Theme state is automatically:
            </p>

            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>Synced with system preference</li>
              <li>Saved in localStorage</li>
              <li>
                Applied via <code>.dark</code> class
              </li>
            </ul>
          </Step>

          {/* STEP 5 */}
          <Step
            icon={Sparkles}
            title="Step 5 — Show Toast Notifications"
            description="Trigger beautiful toast notifications anywhere in your app using the useToast hook."
          >
            <CodeBlock
              language="tsx"
              code={`import { useToast } from "@neuctra/ui";

export function Example() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast.success("Saved successfully!")}>
      Show Toast
    </button>
  );
}`}
            />

            <p className="text-gray-200 text-sm">
              You can use simple or styled toast methods:
            </p>

            <CodeBlock
              language="tsx"
              code={`toast("Hello world!");

toast.success("Saved!");
toast.error("Something went wrong!");
toast.warning("Be careful!");
toast.info("Some information");`}
            />

            <p className="text-gray-200 text-sm">
              Or use the advanced API for full control:
            </p>

            <CodeBlock
              language="tsx"
              code={`toast({
  type: "success",
  title: "Success!",
  description: "Your changes have been saved.",
  duration: 5000,
});`}
            />

            <p className="text-green-500 flex items-center gap-2 text-sm mt-2">
              <Check size={14} /> Toast system is already enabled via{" "}
              <code>ToastProvider</code>
            </p>
          </Step>
        </div>
      </div>
    </>
  );
};

const Step = ({ icon: Icon, title, description, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Icon className="text-primary" size={18} />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-gray-200 text-sm">{description}</p>

    <div className="space-y-3">{children}</div>
  </div>
);

export default QuickStartDocsPage;
