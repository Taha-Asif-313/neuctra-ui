"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { SwitchGroup } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const SwitchGroupDocs = () => {
  const [values, setValues] = useState(["react"]);

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  return (
    <>
      <Metadata
        title="Switch Group Component — Neuctra UI"
        description="Fully customizable Switch Group component with Tailwind-based styling, keyboard navigation, and full design system control."
        keywords="SwitchGroup, React switch toggle, UI library, Tailwind switch, multi select toggle"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Switch Group
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              A flexible and fully customizable switch group component. Built to
              follow your design system using Tailwind classes — no hardcoded
              colors, full control over layout, styling, and behavior.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>

            <CodeBlock
              language="tsx"
              code={`import { SwitchGroup } from "@neuctra/ui";`}
              previewContent={
                <SwitchGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                />
              }
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState([]);

<SwitchGroup
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" }
  ]}
  selectedValues={values}
  onChange={setValues}
/>`}
              previewContent={
                <SwitchGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                />
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  className="bg-zinc-900 p-4 rounded-xl"
  itemClassName="hover:bg-zinc-800 p-2 rounded"
  textClassName="text-sm font-medium text-blue-400"
  switchClassName="bg-green-500 data-[checked=true]:bg-blue-500"
/>`}
              previewContent={
                <SwitchGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                  className="bg-zinc-900 p-4 rounded-xl"
                  itemClassName="hover:bg-zinc-800 p-2 rounded"
                  textClassName="text-sm font-medium"
                  switchClassName="bg-zinc-700"
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Sizes
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup iconSize={16} />
<SwitchGroup iconSize={24} />`}
              previewContent={
                <div className="space-y-4">
                  <SwitchGroup
                    options={options}
                    selectedValues={values}
                    onChange={setValues}
                    iconSize={16}
                  />
                  <SwitchGroup
                    options={options}
                    selectedValues={values}
                    onChange={setValues}
                    iconSize={26}
                  />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">List of switch items.</td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">Controlled selected values.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(values) ⇒ void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback when values change.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">Size of the switch.</td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Each item wrapper styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">switchClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch background styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">thumbClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Thumb styling.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{`selectedValues="react"`}</code>
                  <p className="text-gray-500 text-xs">
                    Must be an array.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{`selectedValues={["react"]}`}</code>
                  <p className="text-gray-500 text-xs">
                    Correct usage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Pro Tips
            </h2>

            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Use Tailwind classes instead of inline colors.</li>
              <li>Control states via className instead of props.</li>
              <li>Combine with dark mode utilities.</li>
              <li>Keep design tokens consistent across components.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </footer>
        </div>
      </div>
    </>
  );
};

export default SwitchGroupDocs;