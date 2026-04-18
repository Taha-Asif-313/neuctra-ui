import React from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import {
  Settings,
  Palette,
  Code2,
  Moon,
  Sun,
  Paintbrush,
} from "lucide-react";

const FullSetupDocPage = () => {
  return (
    <>
      <Metadata
        title="Full Setup — Neuctra UI"
        description="Complete manual setup guide for Neuctra UI with Tailwind and theming."
      />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-12">
        <div className="space-y-10">

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">Full Setup</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Follow this manual setup guide to configure Neuctra UI step by step
              without using the CLI.
            </p>
          </div>

          {/* STEP 1 */}
          <Step
            icon={Settings}
            title="Step 1 — Install Dependencies"
            description="Install Neuctra UI and required Tailwind dependencies manually."
          >
            <CodeBlock language="bash" code={`npm install @neuctra/ui`} />

            <CodeBlock
              language="bash"
              code={`npm install -D tailwindcss postcss autoprefixer`}
            />

            <p className="text-gray-400 text-sm">
              This installs the UI library and required Tailwind tooling.
            </p>
          </Step>

          {/* STEP 2 */}
          <Step
            icon={Code2}
            title="Step 2 — Configure Tailwind"
            description="Initialize and configure Tailwind for your project."
          >
            <CodeBlock language="bash" code={`npx tailwindcss init -p`} />

            <CodeBlock
              language="js"
              code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`}
            />

            <p className="text-gray-400 text-sm">
              Make sure Neuctra UI is included in the content array.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Palette}
            title="Step 3 — Add Tailwind to CSS"
            description="Include Tailwind directives in your global CSS file."
          >
            <CodeBlock
              language="css"
              code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
            />

            <p className="text-gray-400 text-sm">
              Add this in <code>index.css</code> or <code>globals.css</code>.
            </p>
          </Step>

          {/* STEP 4 */}
          <Step
            icon={Paintbrush}
            title="Step 4 — Add Theme System"
            description="Define CSS variables for light and dark mode support."
          >
            <CodeBlock
              language="css"
              code={`:root {
  --primary: #00c214;
  --background: #ffffff;
  --foreground: #0f172a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ffffff;
}`}
            />

            <p className="text-gray-400 text-sm">
              These variables control all UI colors globally.
            </p>
          </Step>

          {/* STEP 5 */}
          <Step
            icon={Moon}
            title="Step 5 — Enable Dark Mode"
            description="Manually toggle dark mode using a simple script."
          >
            <CodeBlock
              language="js"
              code={`document.documentElement.classList.toggle("dark");`}
            />

            <p className="text-gray-400 text-sm">
              This adds or removes the <code>.dark</code> class on HTML.
            </p>
          </Step>

          {/* STEP 6 */}
          <Step
            icon={Sun}
            title="Step 6 — Persist Theme (Optional)"
            description="Save user theme preference in localStorage."
          >
            <CodeBlock
              language="js"
              code={`const setTheme = (theme) => {
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const saved = localStorage.getItem("theme");
if (saved) setTheme(saved);`}
            />

            <p className="text-gray-400 text-sm">
              This keeps theme consistent across page reloads.
            </p>
          </Step>

        </div>
      </div>
    </>
  );
};

/* STEP COMPONENT */
const Step = ({ icon: Icon, title, description, children }) => (
  <div className="p-5 space-y-4 border border-zinc-800 rounded-xl bg-zinc-900/40">
    <div className="flex items-center gap-3">
      <Icon className="text-primary" size={18} />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-gray-400 text-sm">{description}</p>

    <div className="space-y-3">{children}</div>
  </div>
);

export default FullSetupDocPage;