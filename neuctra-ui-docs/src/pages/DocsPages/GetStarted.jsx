import React from "react";
import CodeBlock from "../../components/Docs/CodeBlock";

const GetStarted = () => {
  return (
    <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-10">
      <div className="space-y-10 max-w-5xl mx-auto px-4">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Get started with{" "}
            <span className="text-primary font-semibold">Neuctra</span> UI
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            A modern, customizable <span className="text-primary">React</span>{" "}
            component library (
            <span className="text-primary">Tailwind CSS</span> +{" "}
            <span className="text-primary">TypeScript</span>) designed for
            building scalable and maintainable user interfaces.
          </p>
        </header>

        {/* Prerequisites */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Prerequisites
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>
              <span className="text-primary font-semibold">Node.js</span> (LTS
              recommended) and a package manager like npm, yarn, or pnpm.
            </li>
            <li>
              A <span className="text-primary font-semibold">React</span>{" "}
              project — frameworks like Next.js or build tools like Vite work
              best.
            </li>
            <li>
              <span className="text-primary font-semibold">Tailwind CSS v4</span>{" "}
              for modern, config-free utility-first styling.
            </li>
          </ul>
        </section>

        {/* Install */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">1. Install</h2>
          <CodeBlock
            language="bash"
            code={`# npm
npm install @neuctra/ui tailwindcss

# yarn
yarn add @neuctra/ui tailwindcss

# pnpm
pnpm add @neuctra/ui tailwindcss

# bun
bun add @neuctra/ui tailwindcss`}
          />
        </section>

        {/* Tailwind setup - Vite */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            2. Setup Tailwind (Vite + React)
          </h2>
          <CodeBlock
            language="bash"
            code={`npm create vite@latest my-app --template react
cd my-app
npm install tailwindcss`}
          />
          <p className="mt-4 mb-3 text-gray-300 max-w-xl">
            In <code className="text-primary font-mono">index.css</code>, import
            Tailwind’s new layer directives:
          </p>
          <CodeBlock
            language="css"
            code={`@import "tailwindcss";

@theme {
  --color-primary: #00c214;
  --color-secondary: #ec4899;
}`}
          />
          <p className="text-gray-400 mt-2 text-sm">
            That’s it — no <code>tailwind.config.js</code> needed in Tailwind v4!
          </p>
        </section>

        {/* Theming */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">3. Theming</h2>
          <p className="text-gray-300 mb-4">
            The <code className="text-primary">@neuctra/ui</code> library uses
            Tailwind CSS variables for theme customization. Add or override them
            inside your `@theme` block:
          </p>
          <CodeBlock
            language="css"
            code={`@theme {
  --color-primary: #00c214;
  --color-secondary: #ec4899;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary: #60a5fa;
    --color-secondary: #f472b6;
  }
}`}
          />
        </section>

        {/* Usage */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">4. Usage</h2>
          <p className="text-gray-300 mb-3">
            Import and use any Neuctra UI component directly:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { Button, Modal, Table } from "@neuctra/ui";

export default function App() {
  return (
    <div className="p-10">
      <Button variant="primary">Get Started</Button>
    </div>
  );
}`}
          />
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            5. Troubleshooting
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>Ensure you’re using Tailwind CSS v4 or newer.</li>
            <li>
              Add <code>@import "tailwindcss";</code> at the top of your CSS.
            </li>
            <li>Restart the dev server after installing dependencies.</li>
            <li>Make sure PostCSS is automatically configured (Vite does this).</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS v4</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GetStarted;
