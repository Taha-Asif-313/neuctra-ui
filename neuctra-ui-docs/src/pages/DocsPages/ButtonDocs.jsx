"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Button } from "@neuctra/ui";
import { Rocket, Zap } from "lucide-react";

const ButtonDocs = () => {
  const propsData = [
    { prop: "children", type: "React.ReactNode", default: "—", description: "Content inside the button." },
    { prop: "type", type: `"button" | "submit" | "reset"`, default: `"button"`, description: "HTML button type." },
    { prop: "onClick", type: "() => void", default: "undefined", description: "Callback fired when the button is clicked." },
    { prop: "iconBefore", type: "React.ReactNode", default: "undefined", description: "Icon rendered before the text." },
    { prop: "iconAfter", type: "React.ReactNode", default: "undefined", description: "Icon rendered after the text." },
    { prop: "className", type: "string", default: `""`, description: "Custom Tailwind or CSS classes." },
    { prop: "style", type: "CSSProperties", default: "undefined", description: "Inline styles applied to the button." },
    { prop: "fullWidth", type: "boolean", default: "false", description: "Button takes full container width." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the button." },
    { prop: "loading", type: "boolean", default: "false", description: "Shows spinner and disables interaction." },
    { prop: "loadingText", type: "string", default: `"Loading..."`, description: "Text displayed during loading state." },
    { prop: "darkMode", type: "boolean", default: "false", description: "Uses dark theme colors." },
    { prop: "baseColor", type: "string", default: "undefined", description: "Custom base color for theme." },
    { prop: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Button size." },
    { prop: "rounded", type: "boolean", default: "true", description: "Enable rounded corners." },
  ];

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white flex items-center gap-2">
            <Rocket className="text-primary w-8 h-8" />
            Button Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Button</span>{" "}
            component is fully customizable and theme-aware, supporting icons, 
            sizes, loading states, full-width layout, rounded corners, and custom colors.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
          <CodePreviewBlock
            language="tsx"
            code={`<Button>Click Me</Button>
<Button iconBefore={<Rocket />}>Launch</Button>
<Button iconAfter={<Zap />}>Energy</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
            previewContent={
              <div className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <Button>Click Me</Button>
                <Button iconBefore={<Rocket />}>Launch</Button>
                <Button iconAfter={<Zap />}>Energy</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Available Props</h2>
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse border border-zinc-800 text-gray-300">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">Prop</th>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">Type</th>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">Default</th>
                  <th className="border border-zinc-800 px-4 py-2 text-left text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsData.map(({ prop, type, default: def, description }) => (
                  <tr key={prop}>
                    <td className="border border-zinc-800 px-4 py-2 font-medium text-white">{prop}</td>
                    <td className="border border-zinc-800 px-4 py-2 font-mono text-primary">{type}</td>
                    <td className="border border-zinc-800 px-4 py-2 font-mono text-gray-400">{def}</td>
                    <td className="border border-zinc-800 px-4 py-2">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Variants & Colors */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Variants & Colors</h2>
          <p className="text-gray-300 mb-4">
            Buttons can use different colors, dark mode, and rounded styles.
          </p>
          <CodePreviewBlock
            language="tsx"
            code={`<Button baseColor="#2563eb">Primary</Button>
<Button baseColor="#16a34a" rounded={false}>Success</Button>
<Button darkMode baseColor="#dc2626">Danger (Dark)</Button>`}
            previewContent={
              <div className="flex flex-wrap gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <Button baseColor="#2563eb">Primary</Button>
                <Button baseColor="#16a34a" rounded={false}>Success</Button>
                <Button darkMode baseColor="#dc2626">Danger (Dark)</Button>
              </div>
            }
          />
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

export default ButtonDocs;
