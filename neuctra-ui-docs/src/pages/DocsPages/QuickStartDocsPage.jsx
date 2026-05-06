import React from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import {
  Terminal,
  Palette,
  Lightbulb,
  AlertTriangle,
  Check,
} from "lucide-react";

const QuickStartDocsPage = () => {
  return (
    <>
      <Metadata
        title="Quick Start — React UI Library for SaaS | Neuctra UI"
        description="Quick start guide for Neuctra UI - the React UI library for SaaS applications. Set up Tailwind React components for SaaS dashboard UI instantly."
      />

      <div className="bg-transparent text-white min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">Quick Start For <code className="text-primary" >@neuctra/ui</code></h1>
            <p className="text-gray-200 mt-2">
              The fastest way to set up Neuctra UI is using the CLI. It
              installs, configures, and prepares everything automatically for your SaaS applications.
              Perfect for building SaaS dashboard UI with Tailwind React components.
            </p>
          </div>

          {/* STEP 1 */}
          <Step
            icon={Terminal}
            title="Step 1 — Initialize with CLI"
            description="Run the CLI command to install Neuctra UI and auto-configure your project."
          >
            <CodeBlock
              language="bash"
              code={`npx @neuctra/ui-cli@latest init`}
            />

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
              code={`@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
@import "tailwindcss";
@source "../node_modules/@neuctra/ui";

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

/* =============================
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
}
`}
            />

            <p className="text-gray-200 flex items-center gap-2 text-sm">
              <Lightbulb size={14} /> All colors are controlled via CSS
              variables. Change them to match your brand instantly.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Lightbulb}
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
            icon={Lightbulb}
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
            icon={Lightbulb}
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
