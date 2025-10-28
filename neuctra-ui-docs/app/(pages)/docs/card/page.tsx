"use client";

import React from "react";
import { Card } from "@neuctra/ui";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const CardDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    // Core Props
    {
      prop: "as",
      type: "ElementType",
      default: '"div"',
      description: "Render as different HTML element (section, article, etc.)",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "—",
      description: "Content inside the card",
    },
    {
      prop: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes",
    },
    {
      prop: "style",
      type: "CSSProperties",
      default: "{}",
      description: "Inline styles merged with internal styles",
    },

    // Background
    {
      prop: "background",
      type: "string",
      default: '"#fff"',
      description: "Background color fallback",
    },
    {
      prop: "backgroundImage",
      type: "string",
      default: "—",
      description: "URL for background image",
    },
    {
      prop: "backgroundSize",
      type: "string",
      default: '"cover"',
      description: "CSS background-size property",
    },
    {
      prop: "backgroundPosition",
      type: "string",
      default: '"center"',
      description: "CSS background-position property",
    },
    {
      prop: "backgroundRepeat",
      type: "string",
      default: '"no-repeat"',
      description: "CSS background-repeat property",
    },
    {
      prop: "backgroundGradient",
      type: "string",
      default: "—",
      description: "CSS gradient background",
    },
    {
      prop: "backgroundBlendMode",
      type: "string",
      default: "—",
      description: "CSS background-blend-mode property",
    },

    // Colors
    {
      prop: "textColor",
      type: "string",
      default: '"#000"',
      description: "Text color inside the card",
    },
    {
      prop: "hoverStyles",
      type: "CSSProperties",
      default: "{}",
      description: "Styles applied on hover",
    },
    {
      prop: "activeStyles",
      type: "CSSProperties",
      default: "{}",
      description: "Styles applied when active/clicked",
    },

    // Borders & Shadows
    {
      prop: "borderRadius",
      type: "string | number",
      default: "12",
      description: "Border radius of the card",
    },
    {
      prop: "border",
      type: "string",
      default: '"none"',
      description: "Border styling",
    },
    {
      prop: "boxShadow",
      type: "string",
      default: '"0 4px 12px rgba(0,0,0,0.1)"',
      description: "Box shadow styling",
    },
    {
      prop: "hoverShadow",
      type: "string",
      default: "—",
      description: "Shadow applied on hover",
    },
    {
      prop: "transition",
      type: "string",
      default: '"all 0.2s ease"',
      description: "CSS transition property",
    },

    // Layout
    {
      prop: "display",
      type: "string",
      default: '"flex"',
      description: "CSS display property",
    },
    {
      prop: "flexDirection",
      type: "string",
      default: '"column"',
      description: "Flex direction",
    },
    {
      prop: "justifyContent",
      type: "string",
      default: '"flex-start"',
      description: "Flex justify-content",
    },
    {
      prop: "alignItems",
      type: "string",
      default: '"stretch"',
      description: "Flex align-items",
    },
    {
      prop: "gap",
      type: "string | number",
      default: "16",
      description: "Gap between children",
    },

    // Sizing
    {
      prop: "width",
      type: "string | number",
      default: "—",
      description: "Width of the card",
    },
    {
      prop: "maxWidth",
      type: "string | number",
      default: '"100%"',
      description: "Maximum width",
    },
    {
      prop: "height",
      type: "string | number",
      default: "—",
      description: "Height of the card",
    },
  ];

  const basicExample = `<Card>
  <h3>Basic Card</h3>
  <p>Simple content container</p>
</Card>`;

  const styledExample = `<Card
  background="#f8fafc"
  textColor="#1e293b"
  padding={24}
  borderRadius={16}
  boxShadow="0 4px 6px rgba(0,0,0,0.1)"
>
  <h3>Styled Card</h3>
  <p>With custom background and shadow</p>
</Card>`;

  const imageExample = `<Card
  backgroundImage="/path/to/image.jpg"
  padding={32}
  textColor="#ffffff"
  background="rgba(0,0,0,0.7)"
  backgroundBlendMode="multiply"
>
  <h3>Image Background</h3>
  <p>With overlay effect</p>
</Card>`;

  return (
    <div className="py-10 max-w-5xl mx-auto bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Card</span> Component Documentation
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Card } from "@neuctra/ui";`}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>

        <h3 className="text-xl font-semibold mb-3">Basic Card</h3>
        <CodePreviewBlock
          language="tsx"
          code={basicExample}
          previewContent={
            <Card>
              <h3 className="text-lg font-medium">Basic Card</h3>
              <p className="text-sm">Simple content container</p>
            </Card>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Styled Card</h3>
        <CodePreviewBlock
          language="tsx"
          code={styledExample}
          previewContent={
            <Card
              background="#f8fafc"
              textColor="#1e293b"
              padding={24}
              borderRadius={16}
              boxShadow="0 4px 6px rgba(0,0,0,0.1)"
            >
              <h3 className="text-lg font-medium">Styled Card</h3>
              <p className="text-sm">With custom background and shadow</p>
            </Card>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Image Background</h3>
        <CodePreviewBlock
          language="tsx"
          code={imageExample}
          previewContent={
            <Card
              backgroundImage="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3"
              padding={32}
              textColor="#ffffff"
              background="rgba(0,0,0,0.7)"
              backgroundBlendMode="multiply"
              style={{ backgroundSize: "cover" }}
            >
              <h3 className="text-lg font-medium">Image Background</h3>
              <p className="text-sm">With overlay effect</p>
            </Card>
          }
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                {columns.map(({ label, key }) => (
                  <th key={key} className="px-4 py-3 border border-primary">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ prop, type, default: def, description }) => (
                <tr
                  key={prop}
                  className="border-b border-zinc-700 hover:bg-zinc-800"
                >
                  <td className="px-4 py-3 font-mono">{prop}</td>
                  <td className="px-4 py-3 font-mono">{type}</td>
                  <td className="px-4 py-3 font-mono">{def}</td>
                  <td className="px-4 py-3">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Polymorphic component (render as any HTML element)</li>
          <li>Extensive styling options with sensible defaults</li>
          <li>Background image support with blending modes</li>
          <li>Flexbox layout controls</li>
          <li>Hover and active state styling</li>
          <li>Fully typed with TypeScript</li>
          <li>Responsive design ready</li>
        </ul>
      </section>
    </div>
  );
};

export default CardDocs;
