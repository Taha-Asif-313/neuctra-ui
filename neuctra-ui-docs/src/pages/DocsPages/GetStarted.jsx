import React, { useState } from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { Component, Download, Palette, Settings } from "lucide-react";

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("install");

const tabData = {
  install: {
    title: "Install",
    icon: Download,
    description:
      "Install Neuctra UI in your project with npm, yarn, or pnpm.",
    content: (
      <>
        <p className="text-gray-400">
          Install @neuctra/ui and Tailwind dependencies with your preferred package manager.
        </p>
        <CodeBlock language="bash" code={`npm install @neuctra/ui`} />
        <CodeBlock language="bash" code={`yarn add @neuctra/ui\npnpm add @neuctra/ui`} />
        <CodeBlock
          language="bash"
          code={`npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`}
        />
      </>
    ),
  },

  config: {
    title: "Configuration",
    icon: Settings,
    description:
      "Configure Tailwind and include Neuctra UI in scan paths.",
    content: (
      <>
        <p className="text-gray-400">
          Tailwind v3 requires content includes @neuctra/ui. Tailwind v4 requires source import.
        </p>
        <CodeBlock
          language="js"
          code={`export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}`}
        />
        <CodeBlock
          language="css"
          code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";`}
        />
      </>
    ),
  },

  theme: {
    title: "Theme",
    icon: Palette,
    description:
      "Use CSS variables for fast theme switching and dark mode.",
    content: (
      <>
        <CodeBlock
          language="css"
          code={`:root {
  --primary: #00c214;
  --primary-content: #ffffff;
}
[data-theme='dark'] {
  --primary: #1fb6ff;
  --primary-content: #0f172a;
}`}
        />
        <p className="text-gray-400">
          Expanded design tokens give visual consistency and easy brand updates.
        </p>
      </>
    ),
  },

  usage: {
    title: "Usage",
    icon: Component,
    description:
      "Component usage examples and accessibility-friendly patterns.",
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
          Use attributes like <code>aria-label</code> and keyboard props for accessible controls.
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
        description="Complete production guide to install, configure, and ship Neuctra UI with Vite, Next.js, React (CRA), Tailwind, and TypeScript."
      />

      <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-12">
        <div className="space-y-14 max-w-5xl mx-auto px-4">
          
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white">
              Get started with{" "}
              <span className="text-primary">Neuctra UI</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Production-level onboarding for Neuctra UI. This guide includes
              all supported setups, Tailwind configuration, theme customization,
              deployment readiness, and common troubleshooting.
            </p>
          </header>

          <section className="space-y-6">
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
              <h3 className="text-2xl font-bold text-white">{tabData[activeTab].title}</h3>
              <p className="text-gray-400 mt-1 mb-4">{tabData[activeTab].description}</p>
              <div className="space-y-4">{renderTabContent()}</div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">0. Prerequisites</h2>
            <ul className="grid gap-2 sm:grid-cols-2 list-inside text-gray-400">
              <li className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">Node.js 18+, npm 10+ (or Yarn/pnpm)</li>
              <li className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">React 18+ with modern hooks</li>
              <li className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">TypeScript (optional but recommended)</li>
              <li className="rounded-lg bg-zinc-900 p-3 border border-zinc-800">Git + dependable lockfile</li>
            </ul>
          </section>
          {/* ================= NEXT.JS + SSR ================= */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">6. Next.js / SSR Setup</h2>
            <p className="text-gray-400">For Next.js App Router, add global styles in <code>app/globals.css</code>:</p>
            <CodeBlock
              language="css"
              code={`@import 'tailwindcss';
@source '../node_modules/@neuctra/ui';
`}
            />
            <p className="text-gray-400">Ensure client components use `use client`; e.g. app/components/ButtonDemo.tsx.</p>
          </section>

          {/* ================= PRODUCTION ================= */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">7. Production Checklist</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Run lint + type checks: <code>npm run lint</code>, <code>npm run typecheck</code></li>
              <li>Build in CI: <code>npm run build</code></li>
              <li>Set environment variables per platform (<code>.env.production</code>)</li>
              <li>Use secure headers and CSP with your host (Vercel/Netlify/Cloudflare)</li>
              <li>Monitor bundle size (e.g., <code>npm run build -- --profile</code>)</li>
            </ul>
            <CodeBlock
              language="bash"
              code={`npm run build
npm run preview # sanity check local prod output`}
            />
          </section>

          {/* ================= TROUBLESHOOT ================= */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">8. Troubleshooting & FAQs</h2>
            <div className="text-gray-400 space-y-2">
              <p><strong>Empty CSS / missing classes?</strong> Ensure Tailwind content includes <code>{"./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}"}</code> and re-run build.</p>
              <p><strong>Component throws only on SSR?</strong> Wrap interactive UI in client component (`use client`) and avoid direct DOM operations in server components.</p>
              <p><strong>TypeScript issue around `@neuctra/ui`?</strong> Ensure <code>skipLibCheck</code> is false and install <code>@types/react</code> for your react version.</p>
              <p><strong>Cannot find module `@neuctra/ui`?</strong> Reinstall with lockfile: <code>rm -rf node_modules package-lock.json && npm install</code>.</p>
            </div>
          </section>

          {/* ================= NEXT STEPS ================= */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">9. Next Steps</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Read component docs for Button, Input, Table, and Modal.</li>
              <li>Implement design tokens in global CSS variables.</li>
              <li>Create production Redux/Zustand + API integration flows.</li>
              <li>Set up end-to-end tests (Cypress, Playwright).</li>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
};

export default GetStarted;