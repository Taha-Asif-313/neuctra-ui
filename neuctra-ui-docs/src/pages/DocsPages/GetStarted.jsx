import React from "react";

import CodeBlock from "../../components/Docs/CodeBlock";
import { Text } from "@neuctra/ui";

const GetStarted = () => {
  return (
    <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-10">
    
      <Text color="var(--primary)" hoverable>Normal paragraph text</Text>

      <Text as="a" href="mailto:hello@example.com" color="primary" hoverable>
        Contact us
      </Text>
    
      <Text baseColor="#00c214" darkMode size="lg" weight={700}>
        Green-themed large text (dark mode)
      </Text>
   
      <Text
        as="button"
        onClick={() => alert("clicked")}
        className="px-4 py-2 rounded"
        hoverable
      >
        Click me
      </Text>
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
              <span className="text-primary font-semibold">Tailwind CSS</span>{" "}
              for utility-first styling and seamless theming (optional but
              recommended).
            </li>
          </ul>
        </section>

        {/* Tailwind + React */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Why use Tailwind CSS with React?
          </h2>
          <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
            Tailwind CSS provides a utility-first CSS framework that enables
            rapid UI development with minimal custom CSS. When combined with
            React’s component-based architecture, it allows for highly reusable
            and consistent interfaces.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>Highly customizable with utility classes.</li>
            <li>Improved developer productivity and faster prototyping.</li>
            <li>Seamless theming and dark mode support.</li>
            <li>Extensive plugin ecosystem.</li>
          </ul>
        </section>

        {/* Install */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">1. Install</h2>
          <CodeBlock
            language="bash"
            code={`# npm
npm install @neuctra/ui

# yarn
yarn add @neuctra/ui

# pnpm
pnpm add @neuctra/ui

# bun
bun add @neuctra/ui`}
          />
        </section>

        {/* Tailwind setup - Vite */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            2. Tailwind setup — Vite React
          </h2>
          <CodeBlock
            language="bash"
            code={`npm create vite@latest my-app --template react
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
          />
          <p className="mt-4 mb-3 text-gray-300 max-w-xl">
            Update your{" "}
            <code className="text-primary font-mono">tailwind.config.js</code>:
          </p>
          <CodeBlock
            language="javascript"
            code={`module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
};`}
          />

          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">
            Import Tailwind
          </h3>
          <CodeBlock language="css" code={`@import "tailwindcss";`} />
        </section>

        {/* Theming */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">3. Theming</h2>
          <p className="text-gray-300 mb-4">
            The <code className="text-primary">@neuctra/ui</code> library uses
            Tailwind CSS variables for easy theming:
          </p>
          <CodeBlock
            language="css"
            code={`:root {
  --primary: #00c214;
  --secondary: #ec4899;
}

.dark {
  --primary: #60a5fa;
  --secondary: #f472b6;
}`}
          />
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            5. Troubleshooting
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>Ensure all Tailwind paths are configured.</li>
            <li>CSS variables must be global.</li>
            <li>Check dependency versions.</li>
            <li>Inspect styles with dev tools for conflicts.</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GetStarted;
