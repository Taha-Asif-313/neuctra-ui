"use client";

import React from "react";
import { Drawer, DrawerButton } from "@neuctra/ui"; // Adjust import path as needed
import { X, Menu } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const DrawerDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const drawerButtonProps = [
    {
      prop: "label",
      type: "string",
      default: `"Open Drawer"`,
      description: "Text label inside the button.",
    },
    {
      prop: "icon",
      type: "React.ReactNode",
      default: "undefined",
      description: "Icon element to display inside the button.",
    },
    {
      prop: "iconPosition",
      type: `"left" | "right"`,
      default: `"left"`,
      description: "Position of the icon relative to the label.",
    },
    {
      prop: "onClick",
      type: "() => void",
      default: "undefined",
      description: "Click event handler for the button.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "{}",
      description: "Inline styles for the button.",
    },
  ];

  const drawerProps = [
    {
      prop: "open",
      type: "boolean",
      default: "false",
      description: "Controls whether the drawer is open or closed.",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "undefined",
      description: "Callback when drawer or overlay is clicked to close.",
    },
    {
      prop: "position",
      type: `"left" | "right" | "top" | "bottom"`,
      default: `"right"`,
      description: "Side from which the drawer slides in.",
    },
    {
      prop: "width",
      type: "string",
      default: `"300px"`,
      description: "Width of the drawer when positioned left or right.",
    },
    {
      prop: "height",
      type: "string",
      default: `"300px"`,
      description: "Height of the drawer when positioned top or bottom.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#fff"`,
      description: "Background color of the drawer panel.",
    },
    {
      prop: "transitionDuration",
      type: "number",
      default: "300",
      description: "Duration of the open/close animation in milliseconds.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "{}",
      description: "Inline styles for the drawer container.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "undefined",
      description: "Content inside the drawer.",
    },
    {
      prop: "showCloseButton",
      type: "boolean",
      default: "true",
      description: "Whether to show the close button inside the drawer.",
    },
    {
      prop: "closeButtonStyle",
      type: "React.CSSProperties",
      default: "{}",
      description: "Inline styles for the close button.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Drawer</span> &amp;{" "}
        <span className="text-primary">DrawerButton</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock language="typescript" code={`import { Drawer, DrawerButton } from "@neuctra/ui";`} />
      </section>

      {/* Basic Usage Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`import React, { useState } from "react";
import { Drawer, DrawerButton } from "@neuctra/ui";
import { Menu } from "lucide-react";

export default function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DrawerButton
        label="Open Drawer"
        icon={<Menu />}
        onClick={() => setOpen(true)}
      />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20 }}>
          <h2>Drawer Content</h2>
          <p>This is some content inside the drawer.</p>
        </div>
      </Drawer>
    </>
  );
}`}
          previewContent={
            <DrawerExample />
          }
        />
      </section>

      {/* DrawerButton Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">DrawerButton Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drawerButtonProps.map(({ prop, type, default: def, description }) => (
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

      {/* Drawer Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Drawer Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drawerProps.map(({ prop, type, default: def, description }) => (
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

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Drawer</code> component renders a sliding panel from any screen edge.
          It supports configurable position, size, background, and transition duration.
          A semi-transparent overlay covers the rest of the page when open, which can be
          clicked to close the drawer. An optional close button inside the drawer allows
          user to close it as well.
        </p>
        <p className="mt-4 text-gray-300 leading-relaxed">
          The <code>DrawerButton</code> is a styled button component to toggle the drawer,
          supporting icon display on either side, custom styles, and click handlers.
        </p>
      </section>

      {/* Behavior */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            When <code>open</code> is <code>true</code>, the drawer slides in from the specified <code>position</code>.
          </li>
          <li>
            The overlay darkens the page and intercepts clicks to close the drawer.
          </li>
          <li>
            When <code>open</code> becomes <code>false</code>, the drawer animates out before unmounting.
          </li>
          <li>
            The close button inside the drawer triggers <code>onClose</code> when clicked.
          </li>
          <li>
            You can customize drawer size with <code>width</code> and <code>height</code> depending on <code>position</code>.
          </li>
          <li>
            Transition duration controls animation speed for both drawer and overlay.
          </li>
        </ul>
      </section>
    </div>
  );
};

// Example component used in previewContent
const DrawerExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DrawerButton
        label="Open Drawer"
        icon={<Menu />}
        onClick={() => setOpen(true)}
      />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20,color:"black" }}>
          <h2>Drawer Content</h2>
          <p>This is some content inside the drawer.</p>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerDocs;
