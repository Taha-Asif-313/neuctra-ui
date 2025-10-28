"use client";

import React from "react";
import { Badge } from "@neuctra/ui"; // Adjust import path as needed
import { CheckCircle, Info, AlertCircle } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const BadgeDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Badge component props
  const data = [
    { prop: "text", type: "string", default: "undefined", description: "Text content inside the badge." },
    { prop: "color", type: "string", default: `"#2563eb"`, description: "Background color of the badge." },
    { prop: "textColor", type: "string", default: `"#fff"`, description: "Text color inside the badge." },
    { prop: "borderColor", type: "string", default: `"#2563eb"`, description: "Border color of the badge." },
    { prop: "icon", type: "React.ReactNode", default: "undefined", description: "Optional icon to display inside the badge." },
    { prop: "iconPosition", type: `"left" | "right"`, default: `"left"`, description: "Position of the icon relative to text." },
    { prop: "rounded", type: "boolean", default: "false", description: "If true, badge will have fully rounded corners." },
    { prop: "borderRadius", type: "string", default: `"6px" or '9999px' if rounded"`, description: "Custom border radius CSS value." },
    { prop: "borderWidth", type: "string", default: `"0"`, description: "Width of the badge border." },
    { prop: "fontSize", type: "string", default: `"14px"`, description: "Font size of the badge text." },
    { prop: "fontWeight", type: "number | string", default: "500", description: "Font weight of the badge text." },
    { prop: "horizontalPadding", type: "string", default: `"10px"`, description: "Horizontal padding inside the badge." },
    { prop: "verticalPadding", type: "string", default: `"6px"`, description: "Vertical padding inside the badge." },
    { prop: "margin", type: "string", default: `"0"`, description: "CSS margin around the badge." },
    { prop: "shadow", type: "string", default: `"0 1px 4px rgba(0, 0, 0, 0.1)"`, description: "CSS box-shadow for the badge." },
    { prop: "notificationDot", type: "boolean", default: "false", description: "If true, shows a small notification dot." },
    { prop: "dotColor", type: "string", default: `"#ef4444"`, description: "Color of the notification dot." },
    { prop: "count", type: "number | string", default: "undefined", description: "Number badge count shown as a red circle." },
    { prop: "pulse", type: "boolean", default: "false", description: "Adds a pulse animation effect to the notification dot." },
    { prop: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles to apply on the badge container." },
    { prop: "onClick", type: "() => void", default: "undefined", description: "Click event handler for the badge." },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Badge</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Badge } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="javascript"
          code={`<Badge text="New" />`}
          previewContent={<Badge text="New" />}
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Badge</code> component is a versatile UI element used to display small counts, labels, or status indicators.
          It supports text, icons, notification dots, and count badges with customizable styles including colors, padding, borders, and animations.
          It also supports click events and can be fully customized via inline styles.
        </p>
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

      {/* Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="tsx"
          code={`<Badge text="Info" color="#3b82f6" textColor="#fff" icon={<Info />} />`}
          previewContent={<Badge text="Info" color="#3b82f6" textColor="#fff" icon={<Info />} />}
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Badge text="Success" color="#22c55e" icon={<CheckCircle />} rounded />`}
          previewContent={<Badge text="Success" color="#22c55e" icon={<CheckCircle />} rounded />}
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Badge
  text="Warning"
  color="#fbbf24"
  textColor="#000"
  icon={<AlertCircle />}
  iconPosition="right"
  borderWidth="1px"
  borderColor="#f59e0b"
/>`}
          previewContent={
            <Badge
              text="Warning"
              color="#fbbf24"
              textColor="#000"
              icon={<AlertCircle />}
              iconPosition="right"
              borderWidth="1px"
              borderColor="#f59e0b"
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Badge text="Message" notificationDot dotColor="#ef4444" pulse />`}
          previewContent={<Badge text="Message" notificationDot dotColor="#ef4444" pulse />}
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Badge text="Count" count={7} />`}
          previewContent={<Badge text="Count" count={7} />}
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<Badge
  text="Clickable"
  onClick={() => alert("Badge clicked!")}
  color="#2563eb"
  cursor="pointer"
/>`}
          previewContent={
            <Badge
              text="Clickable"
              onClick={() => alert("Badge clicked!")}
              color="#2563eb"
              style={{ cursor: "pointer" }}
            />
          }
        />
      </section>

      {/* Behavior Details */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>The badge can display text, optionally accompanied by an icon positioned left or right.</li>
          <li>Rounded corners can be toggled with <code>rounded</code> or customized via <code>borderRadius</code>.</li>
          <li>Notification dot appears at the top-right, and can pulse if <code>pulse</code> is true.</li>
          <li>The <code>count</code> prop shows a red circular badge with the provided number or string.</li>
          <li>Supports click events via the <code>onClick</code> handler, turning the cursor pointer automatically.</li>
          <li>All styles can be overridden or extended using the <code>style</code> prop.</li>
        </ul>
      </section>

      {/* Pulse Animation Keyframes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pulse Animation CSS</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto mb-4">
          <code>{`@keyframes pulseAnim {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}`}</code>
        </pre>
        <p className="text-gray-300">
          The pulse animation smoothly scales and fades the notification dot to draw attention.
        </p>
      </section>
    </div>
  );
};

export default BadgeDocs;
