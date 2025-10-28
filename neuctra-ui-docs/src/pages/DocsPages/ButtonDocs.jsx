// src/pages/docs/ButtonDocs.jsx
import React from "react";


import { Button } from "@neuctra/ui"; // Adjust import path
import { Rocket, Zap } from "lucide-react";
import CodeBlock from "../../components/Docs/CodeBlock";

const ButtonDocs = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "children", type: "React.ReactNode", default: "—", description: "Content inside the button." },
    { prop: "variant", type: `"primary" | "secondary" | "outline" | "ghost"`, default: `"primary"`, description: "Visual style of the button." },
    { prop: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Size of the button." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disable button interactions." },
    { prop: "onClick", type: "() => void", default: "undefined", description: "Click event handler." },
    { prop: "loading", type: "boolean", default: "false", description: "Show loading state with spinner." },
    { prop: "fullWidth", type: "boolean", default: "false", description: "Make the button take full container width." },
    { prop: "className", type: "string", default: `""`, description: "Custom CSS classes." },
    { prop: "iconLeft", type: "React.ReactNode", default: "undefined", description: "Icon displayed before the text." },
    { prop: "iconRight", type: "React.ReactNode", default: "undefined", description: "Icon displayed after the text." },
  ];

  const basicCode = `<Button>
  Click Me
</Button>`;

  const styledCode = `<Button
  variant="secondary"
  size="lg"
  iconLeft={<Rocket />}
  iconRight={<Zap />}
  onClick={() => alert('Button clicked!')}
>
  Launch
</Button>`;

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="flex items-center gap-2 text-4xl font-bold mb-8">
        <Rocket className="w-8 h-8 text-purple-400" />
        Button Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Button } from "@neuctra/ui";`}
        />
      </section>

 

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">{prop}</td>
                <td className="border border-primary px-3 py-2 font-mono">{type}</td>
                <td className="border border-primary px-3 py-2 font-mono">{def}</td>
                <td className="border border-primary px-3 py-2">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Behavior */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Notes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Supports multiple variants and sizes.</li>
          <li>Hover, active, and disabled states handled internally.</li>
          <li>Optional icons can be added on left or right.</li>
          <li>Supports loading state with spinner.</li>
          <li>Can be rendered as full-width button.</li>
          <li>Fully customizable via <code>className</code> or style props.</li>
        </ul>
      </section>
    </div>
  );
};

export default ButtonDocs;
