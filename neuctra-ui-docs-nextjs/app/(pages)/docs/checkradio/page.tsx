"use client";

import React from "react";
import { CheckRadio } from "@neuctra/ui"; // Adjust import path as needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const CheckRadioDocs: React.FC = () => {
  // Table columns for props
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Props data
  const data = [
    {
      prop: "type",
      type: `"checkbox" | "radio"`,
      default: "—",
      description: "Specifies input type, checkbox or radio.",
    },
    {
      prop: "name",
      type: "string",
      default: "undefined",
      description:
        "Name attribute, required for radio groups to link options together.",
    },
    {
      prop: "options",
      type: "Option[]",
      default: "—",
      description: "Array of option objects with label and value.",
    },
    {
      prop: "selectedValues",
      type: "string | string[]",
      default: "undefined",
      description:
        "Controlled selected value(s). Array for checkboxes, string for radio.",
    },
    {
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "undefined",
      description: "Callback fired when selection changes.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all inputs and lowers opacity.",
    },
    {
      prop: "readOnly",
      type: "boolean",
      default: "false",
      description: "Prevents changes but does not disable inputs.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks inputs as required for form validation.",
    },
    {
      prop: "error",
      type: "string",
      default: "undefined",
      description: "Error message displayed below inputs.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS classes on the container div.",
    },
    {
      prop: "customIcon",
      type: "(checked: boolean) => React.ReactNode",
      default: "undefined",
      description: "Render prop to customize checkbox/radio icon.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to container div.",
    },
    {
      prop: "labelStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to each option label.",
    },
    {
      prop: "iconSize",
      type: "number",
      default: "20",
      description: "Size in pixels of checkbox/radio icon.",
    },
    {
      prop: "iconCheckedBgColor",
      type: "string",
      default: `"#2563eb"`,
      description: "Background color of checked icon.",
    },
    {
      prop: "iconUncheckedBorderColor",
      type: "string",
      default: `"#9ca3af"`,
      description: "Border color of unchecked icon.",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"#374151"`,
      description: "Color of option label text.",
    },
    {
      prop: "errorStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles applied to error text.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">CheckRadio</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock language="typescript" code={`import { CheckRadio } from "@neuctra/ui";`} />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<CheckRadio
  type="checkbox"
  options={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ]}
  selectedValues={["a"]}
  onChange={(vals) => console.log(vals)}
/>`}
          previewContent={
            <CheckRadio
              type="checkbox"
              options={[
                { label: "Option A", value: "a" },
                { label: "Option B", value: "b" },
              ]}
              selectedValues={["a"]}
              onChange={(vals) => alert(JSON.stringify(vals))}
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

      {/* Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="tsx"
          code={`<CheckRadio
  type="radio"
  name="fruits"
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]}
  selectedValues="banana"
  onChange={(val) => console.log(val)}
/>`}
          previewContent={
            <CheckRadio
              type="radio"
              name="fruits"
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
              ]}
              selectedValues="banana"
              onChange={(val) => console.log(val)}
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<CheckRadio
  type="checkbox"
  options={[
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ]}
  selectedValues={["red", "blue"]}
  onChange={(vals) => console.log(vals)}
  disabled
  error="Selection disabled"
/>`}
          previewContent={
            <CheckRadio
              type="checkbox"
              options={[
                { label: "Red", value: "red" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ]}
              selectedValues={["red", "blue"]}
              onChange={(vals) => alert(JSON.stringify(vals))}
              disabled
              error="Selection disabled"
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<CheckRadio
  type="checkbox"
  options={[
    { label: "Custom Icon 1", value: "c1" },
    { label: "Custom Icon 2", value: "c2" },
  ]}
  customIcon={(checked) =>
    checked ? (
      <span style={{ color: "green" }}>✔</span>
    ) : (
      <span style={{ color: "red" }}>✘</span>
    )
  }
/>`}
          previewContent={
            <CheckRadio
              type="checkbox"
              options={[
                { label: "Custom Icon 1", value: "c1" },
                { label: "Custom Icon 2", value: "c2" },
              ]}
              customIcon={(checked) =>
                checked ? (
                  <span style={{ color: "green" }}>✔</span>
                ) : (
                  <span style={{ color: "red" }}>✘</span>
                )
              }
            />
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>CheckRadio</code> component renders a group of checkboxes or
          radio buttons with customizable styling and behavior. It supports
          controlled selection, custom icons, disabled/read-only states, and
          error messaging.
        </p>
      </section>

      {/* Behavior */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            For checkboxes, multiple options can be selected. The
            <code>selectedValues</code> prop expects an array of strings.
          </li>
          <li>
            For radio buttons, only one option can be selected. The
            <code>selectedValues</code> prop expects a single string value.
          </li>
          <li>
            The <code>onChange</code> callback receives updated selection(s) when
            user interacts.
          </li>
          <li>
            Disabled inputs are styled with reduced opacity and prevent user
            interaction.
          </li>
          <li>
            Custom icons can be provided via <code>customIcon</code> prop for full
            control over checkbox/radio visuals.
          </li>
          <li>
            Error messages display below the options with red text styling.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CheckRadioDocs;
