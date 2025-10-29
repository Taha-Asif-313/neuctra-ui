"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Text } from "@neuctra/ui";

const TextDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Text Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Text</span>{" "}
            component provides a flexible, theme-aware way to render text
            elements with responsive sizes, dynamic colors, and dark mode
            support. It supports any valid HTML text tag using the{" "}
            <code className="text-primary font-mono">as</code> prop.
          </p>
        </header>

        {/* Example Preview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>

          {/* Live Preview */}
          <CodePreviewBlock
            language="jsx"
            code={`import { Text } from "@neuctra/ui";

export default function Example() {
  return (
    <>
      <Text as="h1" size="2xl" weight="bold" color="primary">
        Welcome to Neuctra UI 🚀
      </Text>
      <Text as="p" size="md" color="muted">
        Build beautiful, modern interfaces effortlessly using Neuctra’s React + Tailwind components.
      </Text>
    </>
  );
}`}
            previewContent={
              <div className="space-y-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <Text as="h1" size="2xl" weight="bold" color="var(--primary)">
                  Welcome to Neuctra UI 🚀
                </Text>
                <Text as="p" size="md" color="muted">
                  Build beautiful, modern interfaces effortlessly using
                  Neuctra’s React + Tailwind components.
                </Text>
              </div>
            }
          />
        </section>

        {/* Props Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Available Props
          </h2>
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse border border-zinc-800 text-gray-300">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">
                    Prop
                  </th>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">
                    Type
                  </th>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "as",
                    type: "HTML Tag",
                    desc: "The element type to render (e.g. 'p', 'h1', 'span').",
                  },
                  {
                    name: "color",
                    type: "string",
                    desc: "Text color (supports theme colors like 'primary', 'muted').",
                  },
                  {
                    name: "size",
                    type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string`,
                    desc: "Font size (or any custom CSS size value).",
                  },
                  {
                    name: "weight",
                    type: "CSS fontWeight",
                    desc: "Font weight (e.g. 400, 600, bold).",
                  },
                  {
                    name: "align",
                    type: "CSS textAlign",
                    desc: "Text alignment (e.g. left, center, right).",
                  },
                  {
                    name: "italic",
                    type: "boolean",
                    desc: "Applies italic style.",
                  },
                  {
                    name: "underline",
                    type: "boolean",
                    desc: "Adds underline decoration.",
                  },
                  {
                    name: "strikethrough",
                    type: "boolean",
                    desc: "Adds line-through style.",
                  },
                  {
                    name: "truncate",
                    type: "boolean",
                    desc: "Truncates overflow text with ellipsis.",
                  },
                  {
                    name: "hoverable",
                    type: "boolean",
                    desc: "Adds hover fade animation.",
                  },
                  {
                    name: "darkMode",
                    type: "boolean",
                    desc: "Uses dark palette variant.",
                  },
                  {
                    name: "baseColor",
                    type: "string",
                    desc: "Custom base color for palette generation.",
                  },
                ].map((prop) => (
                  <tr key={prop.name}>
                    <td className="border border-zinc-800 px-4 py-2 font-medium text-white">
                      {prop.name}
                    </td>
                    <td className="border border-zinc-800 px-4 py-2 text-primary font-mono">
                      {prop.type}
                    </td>
                    <td className="border border-zinc-800 px-4 py-2">
                      {prop.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Theming Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Theme Colors
          </h2>
          <p className="text-gray-300 mb-3">
            You can define a <code className="text-primary">baseColor</code> prop
            to automatically generate a palette for both light and dark modes.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Text baseColor="#00c214" color="primary" size="xl" weight="bold">
  Themed Text Example
</Text>`}
            previewContent={
              <Text baseColor="#00c214" color="primary" size="xl" weight="bold">
                Themed Text Example
              </Text>
            }
          />
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">JavaScript</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TextDocs;
