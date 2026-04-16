import React, { useState } from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import {
  ArrowRight,
  Component,
  Download,
  Palette,
  Rocket,
  Settings,
  Sparkles,
} from "lucide-react";

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("install");

  const tabData = {
    install: {
      title: "Install",
      icon: Download,
      description:
        "Add Neuctra UI to your React project using npm, yarn, or pnpm.",
      content: (
        <>
          <p className="text-gray-400">
            Start with a working React app, then install the UI library and
            Tailwind if your project does not already include it.
          </p>
          <CodeBlock language="bash" code={`npm install @neuctra/ui`} />
          <CodeBlock
            language="bash"
            code={`yarn add @neuctra/ui\npnpm add @neuctra/ui`}
          />
          <CodeBlock language="bash" code={`npm install -D tailwindcss`} />
        </>
      ),
    },

    config: {
      title: "Configuration",
      icon: Settings,
      description:
        "Set up Tailwind correctly so Neuctra UI components render styles properly.",
      content: (
        <>
          <p className="text-gray-400">
            The setup depends on your Tailwind version. Follow the correct
            option below:
          </p>

          {/* Tailwind v3 */}
          <p className="text-white font-semibold mt-4">
            Tailwind CSS v3 or below
          </p>

          <p className="text-gray-400">
            First, initialize Tailwind in your project:
          </p>

          <CodeBlock language="bash" code={`npx tailwindcss init -p`} />

          <p className="text-gray-400">This will create:</p>

          <ul className="text-gray-400 text-sm list-disc list-inside">
            <li>
              <code>tailwind.config.js</code> → Tailwind config file
            </li>
            <li>
              <code>postcss.config.js</code> → Required for Tailwind processing
            </li>
          </ul>

          <p className="text-gray-400 mt-3">
            Now update <code>tailwind.config.js</code> to include Neuctra UI:
          </p>

          <CodeBlock
            language="js"
            code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}", // ✅ required
  ],
  theme: { extend: {} },
  plugins: [],
}`}
          />

          <p className="text-gray-400">
            Then, in your main CSS file (usually <code>index.css</code> or{" "}
            <code>globals.css</code>), add:
          </p>

          <CodeBlock
            language="css"
            code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
          />

          {/* Tailwind v4 */}
          <p className="text-white font-semibold mt-6">
            Tailwind CSS v4 or above
          </p>

          <p className="text-gray-400">
            Tailwind v4 has a simpler setup. Open your main CSS file (e.g.{" "}
            <code>index.css</code> or <code>app.css</code>) and add:
          </p>

          <CodeBlock
            language="css"
            code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";`}
          />

          <p className="text-gray-500 text-sm">
            💡 No config file needed in Tailwind v4.
          </p>

          {/* No Tailwind */}
          <p className="text-white font-semibold mt-6">Not using Tailwind?</p>

          <p className="text-gray-400">
            You can still use Neuctra UI by importing the prebuilt CSS file in
            your entry file:
          </p>

          <CodeBlock
            language="js"
            code={`// main.jsx / main.tsx / App.jsx
import "@neuctra/ui/dist/ui.css";`}
          />

          <p className="text-gray-500 text-sm">
            💡 This is useful if you don’t want to configure Tailwind at all.
          </p>
        </>
      ),
    },

   theme: {
  title: "Theme",
  icon: Palette,
  description:
    "Set up a complete theming system with CSS variables, dark mode, and Tailwind integration.",
  content: (
    <>
      {/* ================= THEME VARIABLES ================= */}
      <CodeBlock
        language="css"
        code={`/* -----------------------------
   BASE THEME (LIGHT)
------------------------------*/
:root {
  /* Primary */
  --primary: #00c214;
  --primary-foreground: #ffffff;

  /* Background */
  --background: #ffffff;
  --foreground: #0f172a;

  /* Muted */
  --muted: #f1f5f9;
  --muted-foreground: #64748b;

  /* Accent */
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;

  /* Borders & Inputs */
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #0f172a;

  /* Semantic */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

/* -----------------------------
   DARK THEME (OVERRIDES ONLY)
------------------------------*/
.dark {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #0a0a0a;
  --foreground: #ffffff;

  --muted: #1f2937;
  --muted-foreground: #9ca3af;

  --accent: #1f2937;
  --accent-foreground: #ffffff;

  --border: #1f2937;
  --input: #1f2937;
  --ring: #ffffff;

  --destructive: #7f1d1d;
  --destructive-foreground: #ffffff;
}

/* -----------------------------
   SYSTEM DARK MODE (AUTO)
------------------------------*/
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ffffff;
  }
}`}
      />

      <p className="text-gray-400 mt-3">
        Define all your design tokens using CSS variables. This allows every
        component (buttons, cards, inputs) to stay consistent and easy to theme.
      </p>

      {/* ================= TAILWIND V4 ================= */}
      <CodeBlock
        language="css"
        code={`/* -----------------------------
   TAILWIND v4 THEME TOKENS
------------------------------*/
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

      <p className="text-gray-400 mt-2">
        Map your CSS variables into Tailwind tokens so you can use utility
        classes like{" "}
        <code className="text-white">bg-primary</code>,{" "}
        <code className="text-white">text-foreground</code>, and more.
      </p>

      {/* ================= SYSTEM THEME ================= */}
      <CodeBlock
        language="js"
        code={`// Apply system theme on load
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isDark) {
  document.documentElement.classList.add("dark");
}`}
      />

      {/* ================= TOGGLE ================= */}
      <CodeBlock
        language="js"
        code={`// Toggle dark mode manually
export const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};`}
      />

      {/* ================= PERSIST ================= */}
      <CodeBlock
        language="js"
        code={`// Save theme preference
const setTheme = (theme) => {
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Load theme on startup
const saved = localStorage.getItem("theme");

if (saved) {
  setTheme(saved);
}`}
      />

      <p className="text-gray-400 mt-2">
        This setup gives you a complete theming system with:
      </p>

      <ul className="text-gray-400 list-disc ml-5 mt-2 space-y-1">
        <li>Centralized design tokens</li>
        <li>Full light & dark theme support</li>
        <li>Automatic system theme detection</li>
        <li>Manual toggle support</li>
        <li>Persistent theme (localStorage)</li>
        <li>Seamless Tailwind v4 integration</li>
      </ul>
    </>
  ),
},

    usage: {
      title: "Usage",
      icon: Component,
      description:
        "Learn how to import and use Neuctra UI components in a React page.",
      content: (
        <>
          <CodeBlock
            language="tsx"
            code={`import { Button, Input, Dropdown } from '@neuctra/ui';

export default function App() {
 return (
   <main className="p-6 space-y-4">
     <Button onClick={() => alert('Hello')} className="rounded-xl shadow-lg">
       Primary
     </Button>
     <Input placeholder="Type here" />
     <Dropdown
       options={[
         { label: 'Yes', value: '1' },
         { label: 'No', value: '0' }
       ]}
       placeholder="Choose"
     />
   </main>
 );
}`}
          />
          <p className="text-gray-400">
            Use clear labels and accessible props like <code>aria-label</code>{" "}
            so the UI works well for keyboard and screen reader users.
          </p>
        </>
      ),
    },
  };
  const renderTabContent = () => tabData[activeTab].content;

  return (
    <>
      <Metadata
        title="Get Started — Neuctra UI"
        description="A step-by-step setup guide for installing, configuring, and using Neuctra UI with React and Tailwind."
      />

      <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-12">
        <div>
          {/* Header */}
          <header className="">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Get started with{" "}
              <span className="text-primary inline-flex items-center gap-2">
                Neuctra UI
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base mt-2 text-gray-200 leading-relaxed">
              Neuctra UI is a modern, developer-friendly component library built
              for React and powered by Tailwind CSS. It provides a collection of
              beautifully designed, accessible, and highly customizable UI
              components that help you build fast, scalable, and consistent
              interfaces with ease. From quick setup and flexible theming to
              reusable components and clean design patterns, Neuctra UI
              streamlines your workflow so you can focus on creating great user
              experiences instead of reinventing UI from scratch.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-white/10">
                <Settings className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-white text-sm font-semibold">Easy Setup</p>
                  <p className="text-gray-400 text-xs">
                    Get started in minutes with simple configuration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-white/10">
                <Palette className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-white text-sm font-semibold">
                    Custom Theming
                  </p>
                  <p className="text-gray-400 text-xs">
                    Fully customize colors, spacing, and styles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-white/10">
                <Component className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-white text-sm font-semibold">
                    Reusable UI
                  </p>
                  <p className="text-gray-400 text-xs">
                    Build faster with modern, reusable components.
                  </p>
                </div>
              </div>
            </div>
          </header>

          <section className="space-y-6 mt-8">
            <div className="flex flex-wrap gap-3">
              {Object.entries(tabData).map(([key, tab]) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-sm border ${
                      activeTab === key
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-zinc-900 text-gray-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.title}
                  </button>
                );
              })}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {tabData[activeTab].title}
              </h3>
              <p className="text-gray-400 mt-1 mb-4">
                {tabData[activeTab].description}
              </p>
              <div className="space-y-4">{renderTabContent()}</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
