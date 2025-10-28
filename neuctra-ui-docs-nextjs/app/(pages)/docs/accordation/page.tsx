"use client";

import React from "react";
import { Accordation } from "@neuctra/ui"; // Adjust import path as needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const AccordationDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Accordation component props
  const data = [
    {
      prop: "items",
      type: "AccordationItem[]",
      default: "—",
      description: "Array of Accordation items with title and content.",
    },
    {
      prop: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Allows multiple sections to be open simultaneously.",
    },
    {
      prop: "defaultOpenIndex",
      type: "number[]",
      default: "[]",
      description: "Indexes of sections opened by default.",
    },
    {
      prop: "borderColor",
      type: "string",
      default: `"#d1d5db"`,
      description: "Border color of each Accordation item.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#ffffff"`,
      description: "Background color of the Accordation headers.",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"#111827"`,
      description: "Text color of the Accordation headers.",
    },
    {
      prop: "hoverBgColor",
      type: "string",
      default: `"#f3f4f6"`,
      description: "Background color of header on hover.",
    },
    {
      prop: "hoverTextColor",
      type: "string",
      default: `"#111827"`,
      description: "Text color of header on hover.",
    },
    {
      prop: "paddingVertical",
      type: "string",
      default: `"16px"`,
      description: "Vertical padding inside header buttons.",
    },
    {
      prop: "paddingHorizontal",
      type: "string",
      default: `"16px"`,
      description: "Horizontal padding inside header buttons.",
    },
    {
      prop: "margin",
      type: "string",
      default: `"12px 0"`,
      description: "Margin between Accordation items.",
    },
    {
      prop: "iconOpen",
      type: "React.ReactNode",
      default: `"−"`,
      description: "Icon shown when section is open.",
    },
    {
      prop: "iconClose",
      type: "React.ReactNode",
      default: `"+"`,
      description: "Icon shown when section is closed.",
    },
    {
      prop: "transitionDuration",
      type: "string",
      default: `"300ms"`,
      description: "Duration of open/close animation.",
    },
    {
      prop: "borderRadius",
      type: "string",
      default: `"8px"`,
      description: "Border radius of each Accordation item.",
    },
    {
      prop: "shadow",
      type: "string",
      default: `"0 2px 8px rgba(0, 0, 0, 0.05)"`,
      description: "Box shadow of Accordation items.",
    },
    {
      prop: "contentPadding",
      type: "string",
      default: `"16px"`,
      description: "Padding inside the content area.",
    },
    {
      prop: "fontSize",
      type: "string",
      default: `"16px"`,
      description: "Font size of header text.",
    },
    {
      prop: "fontWeight",
      type: "string",
      default: `"600"`,
      description: "Font weight of header text.",
    },
    {
      prop: "iconSize",
      type: "string",
      default: `"18px"`,
      description: "Size of open/close icons.",
    },
    {
      prop: "contentFontSize",
      type: "string",
      default: `"14px"`,
      description: "Font size of content text.",
    },
    {
      prop: "contentFontWeight",
      type: "string",
      default: `"400"`,
      description: "Font weight of content text.",
    },
    {
      prop: "contentBackgroundColor",
      type: "string",
      default: `"#ffffff"`,
      description: "Background color of content area.",
    },
    {
      prop: "contentTextColor",
      type: "string",
      default: `"#111827"`,
      description: "Text color of content area.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS classes for Accordation container.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to Accordation container.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Accordation</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Accordation } from "@neuctra/ui";`}
        />
      </section>

      {/* Live Demo with Code */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Accordation
  items={[
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: <div>Custom React node content</div> },
    { title: "Section 3", content: "Content for section 3" },
  ]}
/>`}
          previewContent={
            <Accordation
              items={[
                { title: "Section 1", content: "Content for section 1" },
                { title: "Section 2", content: <div>Custom React node content</div> },
                { title: "Section 3", content: "Content for section 3" },
              ]}
            />
          }
        />
      </section>

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">
                  {label}
                </th>
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

      {/* Usage Examples Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="tsx"
          code={`<Accordation
  items={[
    { title: "FAQ 1", content: "Answer to FAQ 1" },
    { title: "FAQ 2", content: "Answer to FAQ 2" },
  ]}
  allowMultiple
  defaultOpenIndex={[0]}
/>`}
          previewContent={
            <Accordation
              items={[
                { title: "FAQ 1", content: "Answer to FAQ 1" },
                { title: "FAQ 2", content: "Answer to FAQ 2" },
              ]}
              allowMultiple
              defaultOpenIndex={[0]}
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Accordation
  items={[
    { title: "Custom Icons", content: "Using custom open and close icons" },
  ]}
  iconOpen={<span>−</span>}
  iconClose={<span>+</span>}
/>`}
          previewContent={
            <Accordation
              items={[
                { title: "Custom Icons", content: "Using custom open and close icons" },
              ]}
              iconOpen={<span>−</span>}
              iconClose={<span>+</span>}
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Accordation
  items={[
    { title: "Styled Accordation", content: "With custom colors and shadows" },
  ]}
  backgroundColor="#1f2937"
  textColor="#f9fafb"
  hoverBgColor="#374151"
  hoverTextColor="#d1d5db"
  borderColor="#4b5563"
  shadow="0 4px 12px rgba(0, 0, 0, 0.3)"
  borderRadius="12px"
/>`}
          previewContent={
            <Accordation
              items={[
                { title: "Styled Accordation", content: "With custom colors and shadows" },
              ]}
              backgroundColor="#1f2937"
              textColor="#f9fafb"
              hoverBgColor="#374151"
              hoverTextColor="#d1d5db"
              borderColor="#4b5563"
              shadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              borderRadius="12px"
            />
          }
        />
      </section>

      {/* Component Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Accordation</code> component allows you to display collapsible
          sections of content with customizable styles and behavior. You can
          configure whether multiple sections can be open at once, customize
          colors, padding, icons, fonts, and transitions. The component
          supports React nodes for flexible content inside each section.
        </p>
      </section>

      {/* Behavior Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Clicking on a header toggles its content open or closed.
          </li>
          <li>
            If <code>allowMultiple</code> is <code>false</code>, only one section
            can be open at a time.
          </li>
          <li>
            Smooth height transitions are applied for content expansion/collapse.
          </li>
          <li>
            Hovering over headers changes background and text colors.
          </li>
          <li>
            Supports custom icons for open/close states.
          </li>
          <li>
            Inline <code>style</code> and <code>className</code> allow further
            customization.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AccordationDocs;
