"use client";

import React from "react";
import { Button, Table } from "@neuctra/ui"; // Adjust import path as needed
import { ArrowRight, Calendar, Mail, Search, User } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const ButtonDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Button component props
  const data = [
    {
      prop: "children",
      type: "React.ReactNode",
      default: "—",
      description: "Content or label inside the button.",
    },
    {
      prop: "type",
      type: `"button" | "submit" | "reset"`,
      default: `"button"`,
      description: "HTML button type attribute.",
    },
    {
      prop: "onClick",
      type: "() => void",
      default: "undefined",
      description: "Click event handler function.",
    },
    {
      prop: "iconBefore",
      type: "React.ReactNode",
      default: "undefined",
      description: "Element or icon displayed before button text.",
    },
    {
      prop: "iconAfter",
      type: "React.ReactNode",
      default: "undefined",
      description: "Element or icon displayed after button text.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS classes for the button.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied last for custom tweaks.",
    },
    {
      prop: "fullWidth",
      type: "boolean",
      default: "false",
      description: "Makes button take full container width.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the button and reduces opacity.",
    },
    {
      prop: "loading",
      type: "boolean",
      default: "false",
      description: "Shows spinner and disables clicks during loading.",
    },
    {
      prop: "loadingText",
      type: "string",
      default: `"Loading..."`,
      description: "Text shown next to spinner when loading.",
    },
    {
      prop: "paddingHorizontal",
      type: "number",
      default: "30",
      description: "Horizontal padding in pixels.",
    },
    {
      prop: "paddingVertical",
      type: "number",
      default: "8",
      description: "Vertical padding in pixels.",
    },
    {
      prop: "fontSize",
      type: "string",
      default: `"16px"`,
      description: "Font size of the button text.",
    },
    {
      prop: "fontWeight",
      type: "string | number",
      default: "400",
      description: "Font weight of the button text.",
    },
    {
      prop: "borderRadius",
      type: "number",
      default: "6",
      description: "Border radius in pixels.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#02b314"`,
      description: "Background color of the button.",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"white"`,
      description: "Text color of the button.",
    },
    {
      prop: "borderColor",
      type: "string",
      default: `"transparent"`,
      description: "Border color of the button.",
    },
    {
      prop: "hoverBgColor",
      type: "string",
      default: `"transparent"`,
      description: "Background color on hover.",
    },
    {
      prop: "hoverTextColor",
      type: "string",
      default: `"black"`,
      description: "Text color on hover.",
    },
    {
      prop: "hoverBorderColor",
      type: "string",
      default: "undefined",
      description: "Border color on hover.",
    },
    {
      prop: "boxShadow",
      type: "string",
      default: `"0 1px 2px rgba(0, 0, 0, 0.05)"`,
      description: "CSS box-shadow property.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Button</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Button } from "@neuctra/ui";`}
        />
      </section>

      {/* Live Demo with Code */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="javascript"
          code={`<Button
  backgroundColor="var(--primary)"
  textColor="white"
  onClick={() => alert("Button Clicked!")}
  borderRadius={6}
  paddingHorizontal={30}
  paddingVertical={8}
  fontSize="14px"
  fontWeight={600}
  iconAfter={<ArrowRight className="h-5 w-5" />}
  hoverBgColor="transparent"
  hoverTextColor="white"
  hoverBorderColor="white"
>
  Get Started
</Button>`}
          previewContent={
            <Button
              backgroundColor="var(--primary)"
              textColor="white"
              onClick={() => alert("Button Clicked!")}
              borderRadius={6}
              paddingHorizontal={30}
              paddingVertical={8}
              fontSize="14px"
              fontWeight={600}
              iconAfter={<ArrowRight className="h-5 w-5" />}
              hoverBgColor="transparent"
              hoverTextColor="white"
              hoverBorderColor="white"
            >
              Get Started
            </Button>
          }
        />
      </section>

      {/* Component Description */}
      <section className="mb-16">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The <code>Button</code> component is a highly customizable React
          button designed to offer flexibility and ease of use. It supports
          inline styles for full control over padding, colors, typography, and
          layout. Key features include hover states, loading indicators, icons
          positioned before or after text, and full-width mode.
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

      {/* Usage Examples Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="javascript"
          code={`<Button onClick={() => alert("Clicked!")}>Click Me</Button>`}
          previewContent={
            <Button onClick={() => alert("Clicked!")}>Click Me</Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button fullWidth onClick={() => alert("Submitted!")}>
  Submit
</Button>`}
          previewContent={
            <Button fullWidth onClick={() => alert("Submitted!")}>
              Submit
            </Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button iconBefore={<Search />} iconAfter={<ArrowRight />}>
  Search
</Button>`}
          previewContent={
            <Button iconBefore={<Search />} iconAfter={<ArrowRight />}>
              Search
            </Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button loading loadingText="Processing...">
  Save
</Button>`}
          previewContent={
            <Button loading loadingText="Processing...">
              Save
            </Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button disabled onClick={() => alert("Won't fire")}>
  Disabled
</Button>`}
          previewContent={
            <Button disabled onClick={() => alert("Won't fire")}>
              Disabled
            </Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button
  backgroundColor="#007bff"
  hoverBgColor="#0056b3"
  paddingHorizontal={40}
  paddingVertical={12}
  borderRadius={50}
  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
>
  Custom Button
</Button>`}
          previewContent={
            <Button
              backgroundColor="#007bff"
              hoverBgColor="#0056b3"
              paddingHorizontal={40}
              paddingVertical={12}
              borderRadius={50}
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              Custom Button
            </Button>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="javascript"
          code={`<Button
  className="my-custom-class"
  style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
>
  Styled with class and inline styles
</Button>`}
          previewContent={
            <Button
              className="my-custom-class"
              style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Styled with class and inline styles
            </Button>
          }
        />
      </section>

      {/* Behavior Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            When <code>loading</code> is <code>true</code>, a spinner with{" "}
            <code>loadingText</code> appears and the button disables click
            events.
          </li>
          <li>
            Hovering changes the background, border, and text colors based on
            hover props.
          </li>
          <li>Disabled buttons reduce opacity and prevent interaction.</li>
          <li>
            Inline <code>style</code> overrides all other styles for custom
            tweaks.
          </li>
          <li>
            Padding, sizing, and typography are fully configurable without
            external CSS.
          </li>
        </ul>
      </section>

      {/* Spinner Animation Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spinner Animation</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto mb-4">
          <code>{`@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`}</code>
        </pre>
        <p>
          The spinner uses a simple CSS animation rotating the border to
          indicate a loading state.
        </p>
      </section>
    </div>
  );
};

export default ButtonDocs;
