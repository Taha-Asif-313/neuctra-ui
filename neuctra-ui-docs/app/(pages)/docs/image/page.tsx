"use client";

import React from "react";
import { Table } from "@neuctra/ui"; // Adjust import path if needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Image } from "@neuctra/ui"; // Adjust import path as needed
import { User } from "lucide-react";

const ImageDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "src", type: "string", default: "undefined", description: "Image source URL." },
    { prop: "alt", type: "string", default: `"Image"`, description: "Alt text for accessibility." },
    { prop: "width", type: "string", default: `"100%"`, description: "Width of the image/container." },
    { prop: "height", type: "string", default: `"auto"`, description: "Height of the image/container." },
    { prop: "borderRadius", type: "string", default: `"8px"`, description: "Border radius CSS value." },
    { prop: "borderColor", type: "string", default: `"transparent"`, description: "Border color." },
    { prop: "borderStyle", type: `"solid" | "dashed" | "dotted" | "double" | "none"`, default: `"solid"`, description: "Border style." },
    { prop: "borderWidth", type: "string", default: `"0px"`, description: "Border width." },
    { prop: "shadow", type: "boolean", default: "false", description: "Apply default box shadow." },
    { prop: "boxShadow", type: "string", default: "undefined", description: "Custom box shadow CSS." },
    { prop: "opacity", type: "number", default: "1", description: "Image opacity (0 to 1)." },
    { prop: "objectFit", type: `"cover" | "contain" | "fill" | "none" | "scale-down"`, default: `"cover"`, description: "CSS object-fit property." },
    { prop: "overlayText", type: "string", default: "undefined", description: "Text displayed as an overlay." },
    { prop: "overlayColor", type: "string", default: `"rgba(0, 0, 0, 0.5)"`, description: "Overlay background color." },
    { prop: "svgIcon", type: "React.ReactNode", default: "undefined", description: "Render SVG icon instead of an image." },
    { prop: "responsive", type: "boolean", default: "false", description: "Make image/container width 100%." },
    { prop: "padding", type: "string", default: "undefined", description: "Padding CSS." },
    { prop: "margin", type: "string", default: "undefined", description: "Margin CSS." },
    { prop: "lazyLoad", type: "boolean", default: "false", description: "Use lazy loading for image." },
    { prop: "hoverOpacity", type: "number", default: "undefined", description: "Opacity on hover." },
    { prop: "hoverShadow", type: "boolean", default: "false", description: "Apply shadow on hover." },
    { prop: "hoverScale", type: "number", default: "undefined", description: "Scale factor on hover." },
    { prop: "hoverRotate", type: "number", default: "undefined", description: "Rotation degrees on hover." },
    { prop: "transitionDuration", type: "string", default: `"0.3s"`, description: "CSS transition duration." },
    { prop: "overflow", type: `"hidden" | "scroll" | "auto" | "visible" | "x" | "y"`, default: `"hidden"`, description: "Overflow CSS of container." },
    { prop: "className", type: "string", default: "undefined", description: "Additional CSS classes." },
    { prop: "style", type: "React.CSSProperties", default: "undefined", description: "Inline styles override." },
    { prop: "onClick", type: "(event: React.MouseEvent<HTMLDivElement | HTMLImageElement>) => void", default: "undefined", description: "Click event handler." },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Image</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock language="typescript" code={`import { Image } from "@neuctra/ui";`} />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Image
  src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
  alt="Sample Image"
  width="300px"
  height="200px"
  borderRadius="12px"
  shadow
/>`}
          previewContent={
            <Image
              src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              alt="Sample Image"
              width="300px"
              height="200px"
              borderRadius="12px"
              shadow
            />
          }
        />
      </section>

      {/* Usage with overlay and hover */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Overlay & Hover Effects</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Image
  src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
  alt="With Overlay"
  width="300px"
  height="200px"
  overlayText="Sample Overlay"
  overlayColor="rgba(0, 0, 0, 0.6)"
  hoverOpacity={0.8}
  hoverShadow
  hoverScale={1.05}
/>`}
          previewContent={
            <Image
              src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              alt="With Overlay"
              width="300px"
              height="200px"
              overlayText="Sample Overlay"
              overlayColor="rgba(0, 0, 0, 0.6)"
              hoverOpacity={0.8}
              hoverShadow
              hoverScale={1.05}
            />
          }
        />
      </section>

      {/* Usage with SVG Icon */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Using SVG Icon Instead of Image</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Image
  svgIcon={<User className="w-16 h-16 text-gray-400" />}
  width="100px"
  height="100px"
/>`}
          previewContent={
            <Image
              svgIcon={<User className="w-16 h-16 text-gray-400" />}
              width="100px"
              height="100px"
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
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Supports hover effects: opacity, shadow, scale, and rotation.</li>
          <li>Optional overlay text with customizable background color.</li>
          <li>Renders an SVG icon instead of an image if <code>svgIcon</code> is provided.</li>
          <li>Supports responsive sizing.</li>
          <li>Click handler on container or image.</li>
          <li>Lazy loading enabled optionally.</li>
          <li>Customizable border styles and box shadow.</li>
        </ul>
      </section>
    </div>
  );
};

export default ImageDocs;
