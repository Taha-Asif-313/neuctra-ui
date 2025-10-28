"use client";

import React from "react";
import { GridView } from "@neuctra/ui"; // Adjust import path
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Calendar, User, Mail } from "lucide-react";

const GridViewDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    {
      prop: "columns",
      type: "number | Partial<Record<'sm' | 'md' | 'lg', number>>",
      default: `{ sm: 1, md: 2, lg: 3 }`,
      description:
        "Number of columns or a responsive configuration object keyed by screen size.",
    },
    {
      prop: "gap",
      type: "string",
      default: `"16px"`,
      description: "Spacing between grid items.",
    },
    {
      prop: "padding",
      type: "string",
      default: `"20px"`,
      description: "Padding inside the grid container.",
    },
    {
      prop: "alignItems",
      type: `"start" | "center" | "end" | "stretch"`,
      default: `"stretch"`,
      description: "Vertical alignment of grid items.",
    },
    {
      prop: "justifyItems",
      type: `"start" | "center" | "end" | "stretch"`,
      default: `"stretch"`,
      description: "Horizontal alignment of grid items.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"transparent"`,
      description: "Background color of the grid container.",
    },
    {
      prop: "width",
      type: "string",
      default: `"100%"`,
      description: "Width of the grid container.",
    },
    {
      prop: "maxWidth",
      type: "string",
      default: `"100%"`,
      description: "Maximum width of the grid container.",
    },
    {
      prop: "height",
      type: "string",
      default: `"auto"`,
      description: "Height of the grid container.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "—",
      description: "Grid items to display inside the container.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied last for custom tweaks.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">GridView</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { GridView } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<GridView columns={{ sm: 1, md: 2, lg: 4 }} gap="20px" padding="16px">
  <div className="bg-primary text-white p-4 rounded">Item 1</div>
  <div className="bg-primary text-white p-4 rounded">Item 2</div>
  <div className="bg-primary text-white p-4 rounded">Item 3</div>
  <div className="bg-primary text-white p-4 rounded">Item 4</div>
</GridView>`}
          previewContent={
            <GridView columns={{ sm: 1, md: 2, lg: 4 }} gap="20px" padding="16px">
              <div className="bg-primary text-white p-4 rounded">Item 1</div>
              <div className="bg-primary text-white p-4 rounded">Item 2</div>
              <div className="bg-primary text-white p-4 rounded">Item 3</div>
              <div className="bg-primary text-white p-4 rounded">Item 4</div>
            </GridView>
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>GridView</code> component is a responsive grid layout that
          automatically adjusts the number of columns based on the viewport
          size. It supports both a fixed column count or a responsive mapping
          for small (<code>sm</code>), medium (<code>md</code>), and large
          (<code>lg</code>) screens.
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
              <tr
                key={prop}
                className="even:bg-zinc-800 odd:bg-zinc-900"
              >
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

        <CodePreviewBlock
          language="tsx"
          code={`<GridView columns={3} gap="12px">
  <div className="bg-primary text-white p-4 rounded">A</div>
  <div className="bg-primary text-white p-4 rounded">B</div>
  <div className="bg-primary text-white p-4 rounded">C</div>
</GridView>`}
          previewContent={
            <GridView columns={3} gap="12px">
              <div className="bg-primary text-white p-4 rounded">A</div>
              <div className="bg-primary text-white p-4 rounded">B</div>
              <div className="bg-primary text-white p-4 rounded">C</div>
            </GridView>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<GridView columns={{ sm: 1, md: 2, lg: 3 }} alignItems="center" justifyItems="center">
  <Calendar className="h-12 w-12 text-primary" />
  <User className="h-12 w-12 text-primary" />
  <Mail className="h-12 w-12 text-primary" />
</GridView>`}
          previewContent={
            <GridView
              columns={{ sm: 1, md: 2, lg: 3 }}
              alignItems="center"
              justifyItems="center"
            >
              <Calendar className="h-12 w-12 text-primary" />
              <User className="h-12 w-12 text-primary" />
              <Mail className="h-12 w-12 text-primary" />
            </GridView>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<GridView backgroundColor="#1e1e1e" padding="30px" gap="24px">
  <div className="bg-primary p-6 rounded">Custom Background</div>
  <div className="bg-primary p-6 rounded">Dark Theme</div>
</GridView>`}
          previewContent={
            <GridView backgroundColor="#1e1e1e" padding="30px" gap="24px">
              <div className="bg-primary p-6 rounded">Custom Background</div>
              <div className="bg-primary p-6 rounded">Dark Theme</div>
            </GridView>
          }
        />
      </section>

      {/* Behavior */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Automatically detects screen size and applies the correct column
            count based on the <code>columns</code> prop.
          </li>
          <li>
            Uses <code>grid-template-columns</code> with equal-width columns.
          </li>
          <li>
            Works seamlessly with inline styles or Tailwind classes for item
            customization.
          </li>
          <li>
            Responsive resizing happens instantly on window resize events.
          </li>
          <li>
            All styles can be overridden via the <code>style</code> prop.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default GridViewDocs;
