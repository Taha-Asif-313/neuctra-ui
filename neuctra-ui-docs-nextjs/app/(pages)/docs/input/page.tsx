"use client";

import React from "react";
import { Input, Table } from "@neuctra/ui"; // Adjust if needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Eye, EyeOff, Mail } from "lucide-react";

const InputDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Input component props
  const data = [
    { prop: "type", type: `"text" | "password" | "email" | "number" | "search" | "tel" | "url" | "textarea"`, default: `"text"`, description: "Input field type or textarea." },
    { prop: "placeholder", type: "string", default: `""`, description: "Placeholder text inside the input." },
    { prop: "label", type: "string", default: "—", description: "Label text displayed above the input." },
    { prop: "name", type: "string", default: `""`, description: "Name attribute for the input/textarea." },
    { prop: "value", type: "string", default: "—", description: "Controlled input value." },
    { prop: "defaultValue", type: "string", default: "—", description: "Initial uncontrolled value." },
    { prop: "onChange", type: `(name: string, value: string) => void`, default: "—", description: "Callback called on input change." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the input." },
    { prop: "readOnly", type: "boolean", default: "false", description: "Makes the input read-only." },
    { prop: "required", type: "boolean", default: "false", description: "Marks input as required." },
    { prop: "error", type: "string", default: "—", description: "Error message to display below input." },
    { prop: "success", type: "boolean", default: "false", description: "Shows input in success state." },
    { prop: "autoFocus", type: "boolean", default: "false", description: "Auto focuses the input on mount." },
    { prop: "iconLeft", type: "React.ReactNode", default: "—", description: "Icon rendered inside input on the left." },
    { prop: "iconRight", type: "React.ReactNode", default: "—", description: "Icon rendered inside input on the right (not for password toggle)." },
    { prop: "borderColor", type: "string", default: `"#ccc"`, description: "Input border color." },
    { prop: "focusBorderColor", type: "string", default: `"#2563eb"`, description: "Border color on input focus." },
    { prop: "hoverBorderColor", type: "string", default: `"#4b5563"`, description: "Border color on hover." },
    { prop: "backgroundColor", type: "string", default: `"#ffffff"`, description: "Input background color." },
    { prop: "textColor", type: "string", default: `"#111827"`, description: "Input text color." },
    { prop: "errorColor", type: "string", default: `"#dc2626"`, description: "Color for error text and border." },
    { prop: "successColor", type: "string", default: `"#16a34a"`, description: "Color for success border." },
    { prop: "labelColor", type: "string", default: `"#374151"`, description: "Color for the label text." },
    { prop: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Size of the input which affects padding and font size." },
    { prop: "radius", type: "string", default: `"6px"`, description: "Border radius of input." },
    { prop: "fontSize", type: "string", default: `"14px"`, description: "Font size of input text." },
    { prop: "rows", type: "number", default: 4, description: "Number of rows for textarea." },
    { prop: "cols", type: "number", default: "—", description: "Number of columns for textarea." },
    { prop: "maxLength", type: "number", default: "—", description: "Maximum allowed characters." },
    { prop: "resize", type: "boolean", default: "true", description: "Allows resizing of textarea if true." },
    { prop: "showCharacterCount", type: "boolean", default: "true", description: "Shows character count below textarea when maxLength is set." },
    { prop: "className", type: "string", default: "—", description: "Additional CSS classes for outer container." },
    { prop: "style", type: "React.CSSProperties", default: "—", description: "Inline styles for the input/textarea." },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Input</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Input } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Input
  label="Email Address"
  type="email"
  name="email"
  placeholder="Enter your email"
  labelColor="white"
  required
  onChange={(name, value) => console.log(name, value)}
  iconLeft={<Mail size={16} />}
  error="Invalid email address"
/>`}
          previewContent={
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              labelColor="white"
              required
              onChange={(name, value) => console.log(name, value)}
              iconLeft={<Mail size={16} />}
              error="Invalid email address"
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
        {/* <Table
          columns={columns}
          data={data}
          className="text-xs"
          sortable={false}
          rowsPerPage={15}
          pagination={false}
          tableBorderRadius="12px"
          headerBorderRadius="12px"
          headerAlign = "left"
          bodyAlign="left"
          colors={{
            headerBg: "rgba(2, 179, 20, 0.8)",
            headerText: "#fff",
            rowBg: "#011627",
            rowText: "white",
            borderColor: "transparent",
            hoverBg: "rgba(2, 179, 20, 0.15)",
            paginationBg: "rgba(2, 179, 20, 0.3)",
            paginationText: "#fff",
          }}
        /> */}
      </section>

      {/* Behavior and Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Component Behavior & Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Supports input types <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>search</code>, <code>tel</code>, <code>url</code>, and <code>textarea</code>.
          </li>
          <li>
            Password fields include a toggle button to show/hide the password using eye icons.
          </li>
          <li>
            Supports controlled and uncontrolled modes with <code>value</code> and <code>defaultValue</code>.
          </li>
          <li>
            Displays an error message and changes border color when <code>error</code> prop is set.
          </li>
          <li>
            Success state shows green border color when <code>success</code> is <code>true</code>.
          </li>
          <li>
            Shows character count below textarea when <code>showCharacterCount</code> and <code>maxLength</code> are enabled.
          </li>
          <li>
            Customizable colors, sizes, font, border radius, and padding via props.
          </li>
          <li>
            Left and right icons can be added inside the input.
          </li>
          <li>
            Inline styles and CSS class names are supported for further customization.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InputDocs;
