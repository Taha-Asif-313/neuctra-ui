import React from "react";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";

const GetStarted = () => {
  return (
    <>
      <Metadata
        title="Get Started — Neuctra UI"
        description="Get started with Neuctra UI — a modern, customizable React component library built with Tailwind CSS and TypeScript."
      />

      <div className="bg-zinc-950 font-primary text-gray-200 min-h-screen py-10">
        <div className="space-y-10 max-w-5xl mx-auto px-4">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Get started with <span className="text-primary">Neuctra</span> UI
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              A modern React component library powered by Tailwind CSS.
            </p>
          </header>

          {/* Install */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              1. Install
            </h2>
            <CodeBlock
              language="bash"
              code={`npm install @neuctra/ui`}
            />
          </section>

          {/* Tailwind v3 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              2. Tailwind CSS v3 or below
            </h2>
            <p className="text-gray-300 mb-3">
              Add Neuctra UI to your Tailwind config content paths:
            </p>
            <CodeBlock
              language="js"
              code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}" // ✅ required
  ],
  theme: {
    extend: {
      boxShadow: {
        material: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
    },
  },
  plugins: [],
}`}
            />
          </section>

          {/* Tailwind v4 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              3. Tailwind CSS v4 or above
            </h2>
            <p className="text-gray-300 mb-3">
              In your global CSS file:
            </p>
            <CodeBlock
              language="css"
              code={`@import "tailwindcss";
@source "../node_modules/@neuctra/ui";`}
            />
          </section>

          {/* Theme */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              4. Theme Setup
            </h2>
            <p className="text-gray-300 mb-3">
              Define your primary color using CSS variables:
            </p>
            <CodeBlock
              language="css"
              code={`:root {
  --primary: #00c214;
}`}
            />
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              5. Usage
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { Button } from "@neuctra/ui";

export default function App() {
  return (
    <Button>Click me</Button>
  );
}`}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default GetStarted;