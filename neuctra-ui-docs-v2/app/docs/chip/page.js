"use client";

import React, { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Chip } from "@neuctra/ui";
import { Tag, Accessibility } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const chipFaq = buildComponentFaq("Chip", {
  variants: ["solid", "soft", "outline"],
  sizes: ["sm", "md", "lg"],
});

const propsTable = [
  {
    prop: "label",
    type: "ReactNode",
    default: "—",
    description: "Chip content (required)",
  },
  {
    prop: "variant",
    type: '"solid" | "soft" | "outline"',
    default: '"soft"',
    description: "Visual style",
  },
  {
    prop: "color",
    type: '"primary" | "neutral" | "destructive" | "success"',
    default: '"primary"',
    description: "Color palette drawn from the theme tokens",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Chip height, font and icon size scale together",
  },
  {
    prop: "icon",
    type: "ReactNode",
    default: "—",
    description: "Leading icon, auto-sized to the chip size",
  },
  {
    prop: "onRemove",
    type: "() => void",
    default: "—",
    description: "Renders a remove button and fires on click",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Dims the chip and disables the remove button",
  },
  {
    prop: "iconClassName",
    type: "string",
    default: "—",
    description: "Styles the leading icon wrapper.",
  },
  {
    prop: "labelClassName",
    type: "string",
    default: "—",
    description: "Styles the label text.",
  },
  {
    prop: "removeButtonClassName",
    type: "string",
    default: "—",
    description: "Styles the remove/dismiss button.",
  },
  {
    prop: "removeIconClassName",
    type: "string",
    default: "—",
    description: "Styles the icon inside the remove button.",
  },
];

const a11yNotes = [
  'The remove button gets an explicit aria-label ("Remove {label}") and a visible focus ring.',
  "Icons are aria-hidden; the text label is what screen readers announce.",
];

const RemovableDemo = () => {
  const [chips, setChips] = useState(["React", "Vue", "Svelte"]);
  return (
    <>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
        />
      ))}
      {chips.length === 0 && (
        <button
          className="text-xs text-primary underline"
          onClick={() => setChips(["React", "Vue", "Svelte"])}
        >
          Reset
        </button>
      )}
    </>
  );
};

const ChipDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Chip Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React chip component for tags and filters. Solid, soft and
            outline variants, four colors, three sizes, icons and removable
            state — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Chip-import">
          <h2
            id="Chip-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Chip } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Chip-example-0">
          <h2
            id="Chip-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Chip label="Design" />
<Chip label="Engineering" variant="outline" />
<Chip label="Marketing" variant="solid" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Chip label="Design" />
                <Chip label="Engineering" variant="outline" />
                <Chip label="Marketing" variant="solid" />
              </div>
            }
          />
        </section>

        {/* Colors & Sizes */}
        <section aria-labelledby="Chip-example-1">
          <h2
            id="Chip-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Colors & Sizes
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Chip label="Primary" color="primary" />
<Chip label="Neutral" color="neutral" />
<Chip label="Success" color="success" />
<Chip label="Destructive" color="destructive" />
<Chip label="Small" size="sm" />
<Chip label="Large" size="lg" icon={<Tag />} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Chip label="Primary" color="primary" />
                <Chip label="Neutral" color="neutral" />
                <Chip label="Success" color="success" />
                <Chip label="Destructive" color="destructive" />
                <Chip label="Small" size="sm" />
                <Chip label="Large" size="lg" icon={<Tag />} />
              </div>
            }
          />
        </section>

        {/* Removable */}
        <section aria-labelledby="Chip-example-2">
          <h2
            id="Chip-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Removable
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass onRemove to render an accessible remove button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [chips, setChips] = useState(["React", "Vue", "Svelte"]);

{chips.map((chip) => (
  <Chip
    key={chip}
    label={chip}
    onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
  />
))}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <RemovableDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Chip-props">
          <h2
            id="Chip-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Chip component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                {propsTable.map((row) => (
                  <tr key={row.prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {row.prop}
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-300">
                      {row.type}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {row.default ?? "—"}
                    </td>
                    <td className="p-3">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Chip-a11y">
          <h2
            id="Chip-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            {a11yNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={chipFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default ChipDocs;
