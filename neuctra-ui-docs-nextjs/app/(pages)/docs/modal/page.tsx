"use client";

import React, { useState } from "react";
import { Modal } from "@neuctra/ui"; // Adjust import path as needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { X } from "lucide-react";

const ModalDocs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Define columns for props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Modal component props
  const data = [
    {
      prop: "isOpen",
      type: "boolean",
      default: "false",
      description:
        "Controls visibility of the modal. When false, modal is not rendered.",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "undefined",
      description: "Callback function triggered to close the modal.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "undefined",
      description: "Content to be rendered inside the modal.",
    },
    {
      prop: "overlayStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to the overlay backdrop.",
    },
    {
      prop: "modalStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to the modal container.",
    },
    {
      prop: "closeButtonStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to the modal close button.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Modal</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { Modal } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`
import React, { useState } from "react";
import { Modal } from "@neuctra/ui";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello from Modal!</h2>
        <p>This is modal content.</p>
      </Modal>
    </>
  );
}`}
          previewContent={
            <>
              <button
                className="bg-primary px-8 py-2 text-sm rounded"
                onClick={() => setIsOpen(true)}
              >
                Open Modal
              </button>
              <Modal modalStyle={{color:"black"}} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>Hello from Modal!</h2>
                <p>This is modal content.</p>
              </Modal>
            </>
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>Modal</code> component displays content in a centered
          overlay dialog, blocking interaction with the rest of the page. It
          includes an optional close button, customizable overlay and modal
          container styles, and closes when clicking outside the modal or
          pressing the close button.
        </p>
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

      {/* Behavior Details */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            When <code>isOpen</code> is <code>false</code>, the modal does not
            render in the DOM.
          </li>
          <li>
            Clicking on the overlay outside the modal triggers{" "}
            <code>onClose</code> to close the modal.
          </li>
          <li>
            Clicking inside the modal content does not close the modal (event
            propagation is stopped).
          </li>
          <li>
            The close button is located at the top-right corner, and uses the{" "}
            <code>X</code> icon from <code>lucide-react</code>.
          </li>
          <li>
            Inline styles can be customized for the overlay, modal container,
            and close button using <code>overlayStyle</code>,{" "}
            <code>modalStyle</code>, and <code>closeButtonStyle</code> props
            respectively.
          </li>
          <li>
            The modal container supports scrolling if content height exceeds
            viewport height.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ModalDocs;
