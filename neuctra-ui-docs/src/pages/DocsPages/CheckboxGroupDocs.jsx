"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { CheckboxGroup } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const CheckboxDocs = () => {
  const [values, setValues] = useState(["react"]);

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  return (
    <>
      <Metadata
        title="Checkbox Group Component — Neuctra UI"
        description="Customizable Checkbox Group component with full control over styles, icons, and rendering."
        keywords="CheckboxGroup, React checkbox, UI library, Tailwind checkbox, multi select"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Checkbox Group
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              A fully customizable checkbox group component with support for
              custom rendering, icons, dark mode, and complete style overrides.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { CheckboxGroup } from "@neuctra/ui";`}
              previewContent={
                <CheckboxGroup
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
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState([]);

<CheckboxGroup
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" }
  ]}
  selectedValues={values}
  onChange={setValues}
/>`}
              previewContent={
                <CheckboxGroup
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
              code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  className="bg-zinc-900 p-4 rounded-xl"
  itemClassName="hover:bg-zinc-800 p-2 rounded"
  textClassName="text-sm font-medium"
/>`}
              previewContent={
                <CheckboxGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                  className="bg-zinc-900 p-4 rounded-xl"
                  itemClassName="hover:bg-zinc-800 p-2 rounded"
                  textClassName="text-sm font-medium"
                />
              }
            />
          </section>

          {/* Custom Icon */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Icon
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  customIcon={(checked) =>
    checked ? "✅" : "⬜"
  }
/>`}
              previewContent={
                <CheckboxGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                  customIcon={(checked) => (
                    <span>{checked ? "✅" : "⬜"}</span>
                  )}
                />
              }
            />
          </section>

          {/* Render Override */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Render (Advanced)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  renderItem={({ option, checked, toggle }) => (
    <div
      onClick={toggle}
      className="flex gap-3 p-2 border rounded cursor-pointer"
    >
      <span>{checked ? "✔" : "○"}</span>
      {option.label}
    </div>
  )}
/>`}
              previewContent={
                <CheckboxGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                  renderItem={({ option, checked, toggle }) => (
                    <div
                      onClick={toggle}
                      className="flex gap-3 p-2 border border-zinc-700 rounded cursor-pointer"
                    >
                      <span>{checked ? "✔" : "○"}</span>
                      {option.label}
                    </div>
                  )}
                />
              }
            />
          </section>

          {/* Dark Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Dark Mode
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  darkMode
/>`}
              previewContent={
                <CheckboxGroup
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                  darkMode
                />
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
                <thead className="bg-zinc-900">
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
                    <td className="p-3">List of checkbox options.</td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">Selected values.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(values) ⇒ void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered on selection change.</td>
                  </tr>

                  <tr>
                    <td className="p-3">customIcon</td>
                    <td className="p-3">function</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom checkbox UI.</td>
                  </tr>

                  <tr>
                    <td className="p-3">renderItem</td>
                    <td className="p-3">function</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Full control over item rendering.</td>
                  </tr>

                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enable dark styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom container classes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mistakes */}
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
                    Must be an array, not string.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{`selectedValues={["react"]}`}</code>
                  <p className="text-gray-500 text-xs">Correct usage.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with React, Tailwind & TypeScript.
          </footer>
        </div>
      </div>
    </>
  );
};

export default CheckboxDocs;