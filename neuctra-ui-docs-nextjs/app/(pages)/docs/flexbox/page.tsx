"use client";

import React from "react";
import { Flexbox } from "@neuctra/ui"; // Adjust import path
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Calendar, Mail, User } from "lucide-react";

const FlexboxDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    {
      prop: "direction",
      type: `"row" | "column" | Partial<Record<'sm' | 'md' | 'lg', 'row' | 'column'>>`,
      default: `"row"`,
      description:
        "Flex direction — can be fixed or responsive by breakpoint.",
    },
    {
      prop: "align",
      type: `"flex-start" | "flex-end" | "center" | "stretch" | "baseline"`,
      default: `"center"`,
      description: "Aligns items vertically (cross-axis).",
    },
    {
      prop: "justify",
      type: `"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"`,
      default: `"space-between"`,
      description: "Justifies items horizontally (main-axis).",
    },
    {
      prop: "gap",
      type: "number | string",
      default: `16`,
      description: "Space between flex items.",
    },
    {
      prop: "padding",
      type: "number | string",
      default: `20`,
      description: "Padding inside the flex container.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"transparent"`,
      description: "Background color of the container.",
    },
    {
      prop: "width",
      type: "string",
      default: `"100%"`,
      description: "Width of the container.",
    },
    {
      prop: "maxWidth",
      type: "string",
      default: `"100%"`,
      description: "Maximum width of the container.",
    },
    {
      prop: "height",
      type: "string",
      default: `"auto"`,
      description: "Height of the container.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied last for custom tweaks.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "—",
      description: "Flex items to render inside the container.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Flexbox</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Flexbox } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Flexbox gap={20} padding={20}>
  <div className="bg-primary text-white p-4 rounded">Item 1</div>
  <div className="bg-primary text-white p-4 rounded">Item 2</div>
  <div className="bg-primary text-white p-4 rounded">Item 3</div>
</Flexbox>`}
          previewContent={
            <Flexbox gap={20} padding={20}>
              <div className="bg-primary text-white p-4 rounded">Item 1</div>
              <div className="bg-primary text-white p-4 rounded">Item 2</div>
              <div className="bg-primary text-white p-4 rounded">Item 3</div>
            </Flexbox>
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Flexbox</code> component provides a responsive, highly
          customizable flex container. It allows you to control direction,
          alignment, spacing, and background with full responsive support for
          mobile, tablet, and desktop breakpoints.
        </p>
      </section>

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th
                  key={key}
                  className="px-3 py-2 border border-primary font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">
                  {prop}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {type}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {def}
                </td>
                <td className="border border-primary px-3 py-2">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        {/* Horizontal Layout */}
        <CodePreviewBlock
          language="tsx"
          code={`<Flexbox direction="row" gap="12px">
  <Calendar className="h-8 w-8 text-primary" />
  <User className="h-8 w-8 text-primary" />
  <Mail className="h-8 w-8 text-primary" />
</Flexbox>`}
          previewContent={
            <Flexbox direction="row" gap="12px">
              <Calendar className="h-8 w-8 text-primary" />
              <User className="h-8 w-8 text-primary" />
              <Mail className="h-8 w-8 text-primary" />
            </Flexbox>
          }
          className="mb-8"
        />

        {/* Vertical Layout */}
        <CodePreviewBlock
          language="tsx"
          code={`<Flexbox direction="column" align="flex-start" gap={10}>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Flexbox>`}
          previewContent={
            <Flexbox direction="column" align="flex-start" gap={10}>
              <div>First</div>
              <div>Second</div>
              <div>Third</div>
            </Flexbox>
          }
          className="mb-8"
        />

        {/* Responsive Direction */}
        <CodePreviewBlock
          language="tsx"
          code={`<Flexbox direction={{ sm: "column", md: "row", lg: "row" }} gap={20}>
  <div className="bg-primary p-4 text-white rounded">Responsive 1</div>
  <div className="bg-primary p-4 text-white rounded">Responsive 2</div>
</Flexbox>`}
          previewContent={
            <Flexbox
              direction={{ sm: "column", md: "row", lg: "row" }}
              gap={20}
            >
              <div className="bg-primary p-4 text-white rounded">
                Responsive 1
              </div>
              <div className="bg-primary p-4 text-white rounded">
                Responsive 2
              </div>
            </Flexbox>
          }
        />
      </section>

      {/* Behavior */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Detects screen size and adjusts flex direction if{" "}
            <code>direction</code> is responsive.
          </li>
          <li>
            Maintains consistent spacing between items with the <code>gap</code>{" "}
            prop.
          </li>
          <li>
            Align and justify properties map directly to native CSS flexbox
            alignment options.
          </li>
          <li>
            Inline <code>style</code> prop overrides all computed styles for
            advanced customization.
          </li>
          <li>
            Padding and sizing props accept both numbers (in px) and any CSS
            length unit string.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default FlexboxDocs;
