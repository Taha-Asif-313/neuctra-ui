"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@neuctra/ui";
import CodeBlock from "../../components/docs/CodeBlock";
import CodePreviewBlock from "../../components/docs/CodePreviewBlock";

const GetStartedPage: React.FC = () => {
  return (
    <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-10">
      <div className="space-y-10 max-w-5xl mx-auto">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Get started with{" "}
            <span className="text-primary font-semibold">Neuctra</span> Ui
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
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

        {/* Why Tailwind CSS with React */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Why use Tailwind CSS with React?
          </h2>
          <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
            Tailwind CSS provides a utility-first CSS framework that enables
            rapid UI development with minimal custom CSS. When combined with
            React’s component-based architecture, it allows for highly reusable,
            customizable, and maintainable user interfaces. Using Tailwind with
            React reduces CSS bloat, improves development speed, and enforces
            consistency across your project.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>Highly customizable design with utility classes.</li>
            <li>Improved developer productivity and faster prototyping.</li>
            <li>Seamless theming and dark mode support.</li>
            <li>Great community support and extensive plugin ecosystem.</li>
          </ul>
        </section>

        {/* 1. Install */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">1. Install</h2>
          <CodeBlock
            language="bash"
            theme="night-owl"
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

        {/* 2. Tailwind Setup - Next.js */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            2. Tailwind setup — Next.js
          </h2>
          <CodeBlock
            language="bash"
            theme="night-owl"
            code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
          />
          <p className="mt-4 mb-3 text-gray-300 max-w-xl">
            Update{" "}
            <code className="text-primary font-mono">tailwind.config.js</code>{" "}
            to include your project paths:
          </p>
          <CodeBlock
            language="javascript"
            theme="night-owl"
            code={`module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        </section>

        {/* 3. Tailwind Setup - Vite React */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            3. Tailwind setup — Vite React
          </h2>
          <CodeBlock
            language="bash"
            theme="night-owl"
            code={`npm create vite@latest my-app --template react
cd my-app

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
          />
          <p className="mt-4 mb-3 text-gray-300 max-w-xl">
            Update{" "}
            <code className="text-primary font-mono">tailwind.config.js</code>{" "}
            to scan your files:
          </p>
          <CodeBlock
            language="javascript"
            theme="night-owl"
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

          {/* New Step 3: Configure the Vite plugin */}
          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">
            Configure the Vite plugin
          </h3>
          <p className="text-gray-300 max-w-xl mb-3">
            Add the{" "}
            <code className="text-primary font-mono">@tailwindcss/vite</code>{" "}
            plugin to your Vite configuration:
          </p>
          <CodeBlock
            language="typescript"
            theme="night-owl"
            code={`// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})`}
          />

          {/* New Step 4: Import Tailwind CSS */}
          <h3 className="text-xl font-semibold mt-8 mb-3 text-white">
            Import Tailwind CSS
          </h3>
          <p className="text-gray-300 max-w-xl mb-3">
            Add an <code className="text-primary font-mono">@import</code>{" "}
            statement to your main CSS file to import Tailwind CSS:
          </p>
          <CodeBlock
            language="css"
            theme="night-owl"
            code={`@import "tailwindcss";`}
          />
        </section>

        {/* 4. Theming */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">4. Theming</h2>
          <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
            The <code className="text-primary">@neuctra/ui</code> library uses
            tailwind CSS variables to make theming easy and dynamic. Define your
            colors in a global CSS file to control the look and feel of your app
            consistently:
          </p>
          <CodeBlock
            language="css"
            theme="night-owl"
            code={`:root {
  --primary: #3b82f6; /* Tailwind blue-500 */
  --secondary: #ec4899; /* Tailwind pink-500 */
}

.dark {
  --primary: #60a5fa;
  --secondary: #f472b6;
}`}
          />
          <p className="text-gray-300 max-w-4xl mt-4 leading-relaxed">
            For example, you can add a new color to your project by defining a
            theme variable like --color-primary
          </p>
          <CodeBlock
            language="css"
            theme="night-owl"
            code={`@import "tailwindcss";

@theme {
  --color-primary: oklch(0.72 0.11 178);
}`}
          />
        </section>

        {/* 5. Benefits of using @neuctra/ui */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            5. Why choose <span className="text-primary">@neuctra/ui</span>?
          </h2>
          <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
            <span className="text-primary">@neuctra/ui</span> is a modern React
            component library designed with Tailwind CSS and TypeScript to help
            developers build beautiful, accessible, and customizable UI faster.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>Fully customizable components with flexible styling props.</li>
            <li>Built-in support for icons and responsive design.</li>
            <li>Lightweight and minimal CSS for faster load times.</li>
            <li>
              TypeScript support for better developer experience and error
              checking.
            </li>
            <li>Easy theming via CSS variables.</li>
          </ul>
        </section>

        {/* 6. Example usage */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            6. Example usage
          </h2>
          <CodePreviewBlock
            code={`import { Button } from "@neuctra/ui";
import { ArrowRight } from "lucide-react";

export default function Demo() {
  return (
    <Button
      backgroundColor="var(--primary)"
      textColor="white"
      onClick={() => alert("Hello")}
      iconAfter={<ArrowRight className="h-4 w-4" />}
    >
      Click Me
    </Button>
  );
}`}
            previewContent={
              <Button
                backgroundColor="var(--primary)"
                textColor="white"
                hoverTextColor="white"
                onClick={() => alert("Hello")}
                iconAfter={<ArrowRight className="h-4 w-4" />}
              >
                Click Me
              </Button>
            }
            language="javascript"
          />
        </section>

        {/* 7. Troubleshooting */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            7. Troubleshooting
          </h2>
          <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
            If you encounter issues with Tailwind CSS or the{" "}
            <code>@neuctra/ui</code> library, consider the following tips:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 max-w-xl">
            <li>
              Ensure your <code>tailwind.config.js</code> includes all relevant
              content paths.
            </li>
            <li>
              Verify that CSS variables are properly defined and loaded
              globally.
            </li>
            <li>
              Check your project dependencies and versions for compatibility.
            </li>
            <li>
              Use browser dev tools to inspect applied styles and debug
              specificity issues.
            </li>
            <li>
              Consult the official Tailwind and React documentation for updates
              and best practices.
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400 max-w-4xl mx-auto">
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

export default GetStartedPage;
