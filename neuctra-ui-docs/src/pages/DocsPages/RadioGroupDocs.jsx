"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { RadioGroup } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const options = [
  { label: "Option One", value: "one" },
  { label: "Option Two", value: "two" },
  { label: "Option Three", value: "three" },
];

const RadioGroupDocs = () => {
  const [value, setValue] = useState("one");

  return (
    <>
      <Metadata
        title="RadioGroup Component — Neuctra UI"
        description="A fully customizable, headless RadioGroup component with keyboard navigation, styling control, and render overrides."
        keywords="RadioGroup React, headless radio group, Tailwind radio component, customizable radio buttons, Neuctra UI"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              RadioGroup Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">RadioGroup</span>{" "}
              is a fully customizable and headless selection component. It
              supports keyboard navigation, complete styling control via
              className and style props, and even custom rendering using
              render props.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { RadioGroup } from "@neuctra/ui";`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
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
              code={`const [value, setValue] = useState("one");

<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}
/>`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
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
              code={`<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}
  itemClassName="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
  labelClassName="text-lg font-medium"
  iconClassName="border-2 border-primary"
  indicatorClassName="bg-primary"
/>`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
                  itemClassName="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
                  labelClassName="text-lg font-medium"
                  iconClassName="border-2 border-primary"
                  indicatorClassName="bg-primary"
                />
              }
            />
          </section>

          {/* Render Custom UI */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Render (Headless Mode)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}
  renderItem={({ option, checked, onSelect }) => (
    <div
      onClick={onSelect}
      className={\`p-4 rounded-xl border cursor-pointer transition
        \${checked ? "bg-primary text-white" : "bg-zinc-800"}\`}
    >
      {option.label}
    </div>
  )}
/>`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
                  renderItem={({ option, checked, onSelect }) => (
                    <div
                      onClick={onSelect}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        checked
                          ? "bg-primary text-white"
                          : "bg-zinc-800"
                      }`}
                    >
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
                    <td className="p-3">List of radio options.</td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValue</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Currently selected value.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(value: string) → void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when selection changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">renderItem</td>
                    <td className="p-3">function</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom render for each item.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style each item container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style label text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style outer radio icon.</td>
                  </tr>

                  <tr>
                    <td className="p-3">indicatorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style inner dot.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message display.</td>
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

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{`<RadioGroup options={[]} />`}</code>
                  <p className="text-gray-500 text-xs">
                    Always provide valid options.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{`renderItem without onSelect`}</code>
                  <p className="text-gray-500 text-xs">
                    Always call onSelect in custom UI.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{`use className for customization`}</code>
                  <p className="text-gray-500 text-xs">
                    Prefer className over inline styles when possible.
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

            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li>Use renderItem for full UI control (cards, pills, etc).</li>
              <li>Combine with grid/flex for layout systems.</li>
              <li>Use Tailwind dark classes for theme support.</li>
              <li>Keep accessibility intact with keyboard navigation.</li>
              <li>Use CSS variables for design system theming.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with React, Tailwind CSS & TypeScript.
          </footer>

        </div>
      </div>
    </>
  );
};

export default RadioGroupDocs;