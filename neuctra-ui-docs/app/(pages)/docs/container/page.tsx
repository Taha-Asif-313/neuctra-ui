"use client";

import React from "react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Container, Text } from "@neuctra/ui"; // Adjust path as needed

const ContainerDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "display", type: `ResponsiveProp<"block" | "flex" | "grid" | "inline-block">`, default: `{ sm: "block", md: "flex", lg: "grid" }`, description: "CSS display property, responsive by breakpoint." },
    { prop: "flexDirection", type: `ResponsiveProp<"row" | "column" | "row-reverse" | "column-reverse">`, default: `{ sm: "column", md: "row", lg: "row" }`, description: "Flex direction for flex layouts." },
    { prop: "justifyContent", type: `ResponsiveProp<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">`, default: `{ sm: "flex-start", md: "center", lg: "space-between" }`, description: "Justify content for flex/grid layouts." },
    { prop: "alignItems", type: `ResponsiveProp<"flex-start" | "center" | "flex-end" | "stretch" | "baseline">`, default: `{ sm: "stretch", md: "center", lg: "center" }`, description: "Align items vertically for flex/grid layouts." },
    { prop: "gridTemplateColumns", type: "ResponsiveProp<string>", default: `{ sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }`, description: "Grid column template." },
    { prop: "gridTemplateRows", type: "ResponsiveProp<string>", default: `{ sm: "auto", md: "auto", lg: "auto" }`, description: "Grid row template." },
    { prop: "gap", type: "ResponsiveProp<string>", default: `{ sm: "10px", md: "20px", lg: "30px" }`, description: "Gap between grid or flex items." },
    { prop: "rowGap", type: "ResponsiveProp<string>", default: "undefined", description: "Row gap for grid/flex layouts." },
    { prop: "columnGap", type: "ResponsiveProp<string>", default: "undefined", description: "Column gap for grid/flex layouts." },
    { prop: "width", type: "ResponsiveProp<string>", default: `{ sm: "100%", md: "90%", lg: "80%" }`, description: "Element width." },
    { prop: "maxWidth", type: "ResponsiveProp<string>", default: `{ sm: "100%", md: "800px", lg: "1200px" }`, description: "Max width of the container." },
    { prop: "height", type: "ResponsiveProp<string>", default: `{ sm: "auto", md: "auto", lg: "auto" }`, description: "Element height." },
    { prop: "padding", type: "ResponsiveProp<string>", default: `{ sm: "10px", md: "20px", lg: "40px" }`, description: "Padding inside container." },
    { prop: "margin", type: "ResponsiveProp<string>", default: `{ sm: "0 auto", md: "0 auto", lg: "0 auto" }`, description: "Margin around container." },
    { prop: "textAlign", type: `ResponsiveProp<"left" | "center" | "right">`, default: `{ sm: "left", md: "center", lg: "center" }`, description: "Text alignment." },
    { prop: "backgroundColor", type: "string", default: `"#fff"`, description: "Background color." },
    { prop: "border", type: "ResponsiveProp<string>", default: `{ sm: "none", md: "1px solid #ddd", lg: "2px solid #ccc" }`, description: "Border style." },
    { prop: "borderRadius", type: "ResponsiveProp<string>", default: `{ sm: "0", md: "8px", lg: "12px" }`, description: "Border radius." },
    { prop: "boxShadow", type: "ResponsiveProp<string>", default: `{ sm: "none", md: "0 4px 6px rgba(0,0,0,0.1)", lg: "0 6px 10px rgba(0,0,0,0.15)" }`, description: "Box shadow style." },
    { prop: "overflow", type: `ResponsiveProp<"visible" | "hidden" | "scroll" | "auto">`, default: `{ sm: "visible", md: "hidden", lg: "auto" }`, description: "Overflow behavior." },
    { prop: "children", type: "React.ReactNode", default: "—", description: "Content inside container." },
    { prop: "className", type: "string", default: "undefined", description: "Additional CSS classes." },
    { prop: "style", type: "CSSProperties", default: "undefined", description: "Inline styles." },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Container</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Container } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Container>
  <Text>This is inside a container</Text>
</Container>`}
          previewContent={
            <Container>
              <Text>This is inside a container</Text>
            </Container>
          }
        />
      </section>

      {/* Responsive Layout */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Responsive Layout Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Container
  display={{ sm: "block", md: "flex" }}
  flexDirection={{ sm: "column", md: "row" }}
  gap={{ sm: "10px", md: "20px" }}
  padding={{ sm: "10px", md: "20px" }}
  backgroundColor="#f9fafb"
>
  <div className="bg-blue-200 p-4">Item 1</div>
  <div className="bg-blue-300 p-4">Item 2</div>
  <div className="bg-blue-400 p-4">Item 3</div>
</Container>`}
          previewContent={
            <Container
              display={{ sm: "block", md: "flex" }}
              flexDirection={{ sm: "column", md: "row" }}
              gap={{ sm: "10px", md: "20px" }}
              padding={{ sm: "10px", md: "20px" }}
              backgroundColor="#f9fafb"
            >
              <div className="bg-blue-200 p-4">Item 1</div>
              <div className="bg-blue-300 p-4">Item 2</div>
              <div className="bg-blue-400 p-4">Item 3</div>
            </Container>
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
          <li>Fully responsive via <code>ResponsiveProp</code> type for each property.</li>
          <li>Adapts styles dynamically based on window size (<code>sm</code>, <code>md</code>, <code>lg</code> breakpoints).</li>
          <li>Supports both flexbox and CSS grid layouts.</li>
          <li>All style props merge into inline styles for maximum customization.</li>
          <li>Maintains consistent padding, margin, and sizing across breakpoints.</li>
          <li>Can be combined with Tailwind CSS utility classes via <code>className</code>.</li>
        </ul>
      </section>
    </div>
  );
};

export default ContainerDocs;
