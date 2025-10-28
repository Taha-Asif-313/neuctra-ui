"use client";

import React from "react";
import { Table } from "@neuctra/ui"; // Adjust import if needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Text } from "@neuctra/ui"; // Adjust path as needed
import { Mail, User } from "lucide-react";

const TextDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "as", type: "keyof JSX.IntrinsicElements", default: `"p"`, description: "HTML element or React tag to render as." },
    { prop: "children", type: "React.ReactNode", default: "—", description: "Content inside the text element." },
    { prop: "className", type: "string", default: `""`, description: "Additional CSS classes." },
    { prop: "color", type: "string", default: `"#333"`, description: "Text color." },
    { prop: "bgColor", type: "string", default: "undefined", description: "Background color." },
    { prop: "fontSize", type: "string", default: `"16px"`, description: "Font size." },
    { prop: "fontWeight", type: `"normal" | "bold" | "lighter" | "bolder" | number`, default: `"normal"`, description: "Font weight or keyword." },
    { prop: "textAlign", type: `"left" | "center" | "right" | "justify"`, default: `"left"`, description: "Text alignment." },
    { prop: "textTransform", type: `"uppercase" | "lowercase" | "capitalize" | "none"`, default: `"none"`, description: "Text transformation." },
    { prop: "lineHeight", type: "string", default: `"normal"`, description: "Line height CSS value." },
    { prop: "letterSpacing", type: "string", default: `"normal"`, description: "Letter spacing CSS value." },
    { prop: "maxWidth", type: "string", default: "undefined", description: "Maximum width of the element." },
    { prop: "padding", type: "string", default: "undefined", description: "Padding CSS value." },
    { prop: "margin", type: "string", default: "undefined", description: "Margin CSS value." },
    { prop: "borderRadius", type: "string", default: "undefined", description: "Border radius CSS value." },
    { prop: "boxShadow", type: "string", default: "undefined", description: "Box shadow CSS value." },
    { prop: "shadowColor", type: "string", default: `"rgba(0,0,0,0.1)"`, description: "Shadow color used if boxShadow is undefined." },
    { prop: "wordBreak", type: `"normal" | "break-word" | "break-all" | "keep-all"`, default: `"normal"`, description: "Word break CSS property." },
    { prop: "italic", type: "boolean", default: "false", description: "Whether text is italic." },
    { prop: "bold", type: "boolean", default: "false", description: "Whether text is bold." },
    { prop: "underline", type: "boolean", default: "false", description: "Underline the text." },
    { prop: "strikethrough", type: "boolean", default: "false", description: "Strike through the text." },
    { prop: "selectable", type: "boolean", default: "true", description: "Allow text selection." },
    { prop: "truncate", type: "boolean", default: "false", description: "Truncate overflowed text with ellipsis." },
    { prop: "hoverColor", type: "string", default: "undefined", description: "Text color on hover." },
    { prop: "hoverBgColor", type: "string", default: "undefined", description: "Background color on hover." },
    { prop: "hoverTextDecoration", type: `"underline" | "line-through" | "none"`, default: "undefined", description: "Text decoration on hover." },
    { prop: "activeColor", type: "string", default: "undefined", description: "Text color when active (mouse down)." },
    { prop: "activeBgColor", type: "string", default: "undefined", description: "Background color when active (mouse down)." },
    { prop: "transitionDuration", type: "string", default: `"0.25s"`, description: "CSS transition duration for hover/active." },
    { prop: "onClick", type: "() => void", default: "undefined", description: "Click event handler." },
    { prop: "href", type: "string", default: "undefined", description: "If set, renders an anchor tag with this href." },
    { prop: "target", type: `"_blank" | "_self" | "_parent" | "_top"`, default: "undefined", description: "Target attribute for anchor tag." },
    { prop: "rel", type: "string", default: "undefined", description: "Rel attribute for anchor tag." },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Text</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Text } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Text>
  This is a basic text paragraph.
</Text>`}
          previewContent={
            <Text>
              This is a basic text paragraph.
            </Text>
          }
        />
      </section>

      {/* Usage with styles and interaction */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Styled & Interactive Text</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Text
  as="a"
  href="mailto:example@domain.com"
  color="#0070f3"
  underline
  hoverColor="#0051a2"
  onClick={() => alert('Email clicked!')}
>
  Contact Us <Mail className="inline-block ml-1" />
</Text>`}
          previewContent={
            <Text
              as="a"
              href="mailto:example@domain.com"
              color="#0070f3"
              underline
              hoverColor="#0051a2"
              onClick={() => alert("Email clicked!")}
              className="inline-flex items-center gap-1"
            >
              Contact Us <Mail className="h-5 w-5" />
            </Text>
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
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Supports rendering as any HTML element via <code>as</code> prop.</li>
          <li>Automatically renders anchor (<code>a</code>) tag if <code>href</code> is provided.</li>
          <li>Hover and active styles applied inline via mouse event handlers.</li>
          <li>Supports rich text styles like italic, bold, underline, strikethrough.</li>
          <li>Handles text truncation with ellipsis using <code>truncate</code>.</li>
          <li>Customizable with full CSS control via props.</li>
          <li>Text is selectable by default, can be disabled with <code>selectable</code>.</li>
        </ul>
      </section>
    </div>
  );
};

export default TextDocs;
