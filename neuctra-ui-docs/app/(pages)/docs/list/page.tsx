"use client";

import React from "react";
import { List, Table } from "@neuctra/ui"; // Adjust import path as needed
import { Mail, User } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const ListDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for List component props
  const data = [
    {
      prop: "title",
      type: "string",
      default: "undefined",
      description: "Optional title displayed above the list.",
    },
    {
      prop: "titleIcon",
      type: "React.ReactNode",
      default: "undefined",
      description: "Icon element shown next to the title.",
    },
    {
      prop: "items",
      type: "ListItemType[]",
      default: "—",
      description: "Array of list items to render. See ListItemType below.",
    },
    {
      prop: "type",
      type: `"unordered" | "ordered" | "inline"`,
      default: `"unordered"`,
      description:
        "List style: unordered (bullets), ordered (numbers), or inline (horizontal).",
    },
    {
      prop: "bulletColor",
      type: "string",
      default: `"#2563eb"`,
      description: "Color of bullet points for unordered lists.",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"#111827"`,
      description: "Color of the list item text.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#fff"`,
      description: "Background color of the list container.",
    },
    {
      prop: "borderColor",
      type: "string",
      default: `"#e5e7eb"`,
      description: "Border color around the list container.",
    },
    {
      prop: "fontSize",
      type: "string",
      default: `"15px"`,
      description: "Font size for list items.",
    },
    {
      prop: "fontWeight",
      type: "string | number",
      default: "500",
      description: "Font weight for list item text.",
    },
    {
      prop: "borderRadius",
      type: "string",
      default: `"12px"`,
      description: "Border radius for the list container.",
    },
    {
      prop: "padding",
      type: "string",
      default: `"16px"`,
      description: "Padding inside the list container.",
    },
    {
      prop: "spacing",
      type: "string",
      default: `"12px"`,
      description: "Spacing between list items.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS class names for the container.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles for the container, merged last.",
    },
  ];

  // ListItemType interface description
  const listItemTypeDescription = `
interface ListItemType {
  text: string;                    // Text content of the list item
  icon?: React.ReactNode;          // Optional icon displayed before the text
  onClick?: () => void;            // Optional click handler for the item
  subItems?: ListItemType[];       // Optional nested sub-list items
}
  `;

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">List</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { List } from "@neuctra/ui";`}
        />
      </section>

      {/* Description */}
      <section className="mb-8">
        <p className="text-gray-300 leading-relaxed">
          The <code>List</code> component renders customizable lists with
          support for titles, icons, nested sub-items, and different display
          types (unordered, ordered, or inline). You can style colors, spacing,
          fonts, and borders easily via props.
        </p>
      </section>

      {/* ListItemType Interface */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ListItemType Interface</h2>
        <CodeBlock
          language="typescript"
          code={listItemTypeDescription.trim()}
        />
      </section>

      {/* Props Table */}
      <section className="mb-12">
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
          rowsPerPage={10}
          pagination={false}
          tableBorderRadius="12px"
          headerBorderRadius="12px"
          headerAlign="left"
          bodyAlign="left"
          sortable={false}
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

      {/* Basic Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="tsx"
          code={`<List
  title="User Contacts"
  titleIcon={<Mail />}
  items={[
    { text: "Alice", icon: <User />, onClick: () => alert("Alice clicked") },
    { text: "Bob", icon: <User /> },
    {
      text: "Support",
      icon: <Mail />,
      subItems: [
        { text: "Email Support" },
        { text: "Live Chat" },
      ],
    },
  ]}
  type="unordered"
  bulletColor="#10b981"
  textColor="#f3f4f6"
  backgroundColor="#111827"
  borderColor="#374151"
  fontSize="16px"
  fontWeight={600}
  borderRadius="8px"
  padding="20px"
  spacing="16px"
/>`}
          previewContent={
            <List
              title="User Contacts"
              titleIcon={<Mail />}
              items={[
                {
                  text: "Alice",
                  icon: <User className="h-5 w-5" />,
                  onClick: () => alert("Alice clicked"),
                },
                { text: "Bob", icon: <User className="h-5 w-5" /> },
                {
                  text: "Support",
                  icon: <Mail className="h-5 w-5" />,
                  subItems: [{ text: "Email Support" }, { text: "Live Chat" }],
                },
              ]}
              type="unordered"
              bulletColor="#10b981"
              textColor="#f3f4f6"
              backgroundColor="#111827"
              borderColor="#374151"
              fontSize="12px"
              fontWeight={600}
              borderRadius="8px"
              padding="20px"
              spacing="16px"
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<List
  items={["Home", "About", "Contact"].map(text => ({ text }))}
  type="inline"
  bulletColor="#ef4444"
  textColor="#f9fafb"
  backgroundColor="#1f2937"
  borderColor="#4b5563"
  fontSize="14px"
  spacing="24px"
/>`}
          previewContent={
            <List
              items={["Home", "About", "Contact"].map((text) => ({ text }))}
              type="inline"
              bulletColor="#ef4444"
              textColor="#f9fafb"
              backgroundColor="#1f2937"
              borderColor="#4b5563"
              fontSize="14px"
              spacing="24px"
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<List
  title="Steps"
  items={[
    { text: "Step 1: Initialize" },
    { text: "Step 2: Configure" },
    { text: "Step 3: Deploy" },
  ]}
  type="ordered"
  bulletColor="#3b82f6"
  textColor="#1e40af"
/>`}
          previewContent={
            <List
              title="Steps"
              items={[
                { text: "Step 1: Initialize" },
                { text: "Step 2: Configure" },
                { text: "Step 3: Deploy" },
              ]}
              type="ordered"
              bulletColor="#3b82f6"
              textColor="#1e40af"
            />
          }
          className="mb-8"
        />
      </section>

      {/* Behavior Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            The <code>List</code> supports nested sub-items rendered as nested
            unordered lists.
          </li>
          <li>
            Clicking a list item calls its <code>onClick</code> handler if
            provided.
          </li>
          <li>
            Inline lists render items horizontally with spacing and no bullets.
          </li>
          <li>
            Ordered lists use numeric markers; unordered use custom colored
            bullets.
          </li>
          <li>
            All colors, fonts, spacing, and borders can be customized via props.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ListDocs;
