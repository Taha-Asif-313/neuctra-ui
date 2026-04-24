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

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
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
                  customIcon={(checked) => <span>{checked ? "✅" : "⬜"}</span>}
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
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Name attribute for checkbox inputs.</td>
                  </tr>

                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      List of checkbox options (label, value, disabled).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">Currently selected values.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(values: string[]) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when selection changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables all checkboxes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Prevents changing selection.</td>
                  </tr>

                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks inputs as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message shown below group.</td>
                  </tr>

                  {/* 🎨 Customization */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">containerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Container classes (same as wrapper, extended).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for each checkbox item.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for label wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for label text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for checkbox icon.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for error message.</td>
                  </tr>

                  {/* 🎨 Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">containerStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for items.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for labels.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for icon.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for error text.</td>
                  </tr>

                  {/* 🎨 Icons */}
                  <tr>
                    <td className="p-3">customIcon</td>
                    <td className="p-3">(checked, option) =&gt; ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom checkbox renderer.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">Size of checkbox icon.</td>
                  </tr>

                  {/* 🎯 Colors */}
                  <tr>
                    <td className="p-3">checkedColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Color when checked.</td>
                  </tr>

                  <tr>
                    <td className="p-3">uncheckedColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Color when unchecked.</td>
                  </tr>

                  <tr>
                    <td className="p-3">checkmarkColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">#ffffff</td>
                    <td className="p-3">Color of checkmark.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom text color.</td>
                  </tr>

                  {/* 🧠 Advanced */}
                  <tr>
                    <td className="p-3">renderItem</td>
                    <td className="p-3">
                      ({`{ option, checked, focused, toggle }`}) =&gt; ReactNode
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">Fully customize each checkbox item.</td>
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
