"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X, ChevronDown } from "lucide-react";
import { Select } from "@neuctra/ui";

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const SelectDocs = () => {
  return (
    <>
      <Metadata
        title="Select Component — Neuctra UI"
        description="Learn how to use the Select component in Neuctra UI — single & multi-select dropdown with icons, dark mode support, and custom styles."
        keywords="Neuctra UI Select, React select component, Tailwind select, dropdown, multi-select, React UI library"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Select Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Select</span>{" "}
              component provides a flexible dropdown input with support for
              single or multiple selection, icons, custom styles, and dark mode.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { Select } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Select options={sampleOptions} placeholder="Select an option" />`}
              previewContent={
                <Select
                  options={sampleOptions}
                  placeholder="Select an option"
                />
              }
            />
          </section>

          {/* Multi-Select */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Multi-Select Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Select
  options={sampleOptions}
  multiple
  placeholder="Select multiple options"
/>`}
              previewContent={
                <Select
                  options={sampleOptions}
                  multiple
                  placeholder="Select multiple options"
                />
              }
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>
            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Select
  options={sampleOptions}
  label="Custom Label"
  required
  prefixIcon={ChevronDown}
/>`}
                previewContent={
                  <Select
                    options={sampleOptions}
                    label="Custom Label"
                    required
                    prefixIcon={ChevronDown}
                  />
                }
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Select component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  {/* Basic */}
                  <tr>
                    <td className="p-3">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label displayed above the select.</td>
                  </tr>

                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Name attribute for form handling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">SelectOption[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">
                      Array of options (label, value, optional icon).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">value</td>
                    <td className="p-3">string | string[]</td>
                    <td className="p-3">undefined</td>
                    <td className="p-3">Controlled selected value(s).</td>
                  </tr>

                  <tr>
                    <td className="p-3">defaultValue</td>
                    <td className="p-3">string | string[]</td>
                    <td className="p-3">undefined</td>
                    <td className="p-3">
                      Initial value for uncontrolled usage.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onValueChange</td>
                    <td className="p-3">(value, name?) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback fired when value changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">placeholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Select..."</td>
                    <td className="p-3">
                      Placeholder text when no value is selected.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">multiple</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enable multi-select mode.</td>
                  </tr>

                  {/* States */}
                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables the select input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string | boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Error state or message.</td>
                  </tr>

                  <tr>
                    <td className="p-3">success</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Success state styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Helper text below the select.</td>
                  </tr>

                  {/* Icons */}
                  <tr>
                    <td className="p-3">labelIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed inside the label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">prefixIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Icon inside the trigger (left side).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">ChevronDown</td>
                    <td className="p-3">Icon for dropdown toggle.</td>
                  </tr>

                  {/* Customization */}
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
                    <td className="p-3">Additional container classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">triggerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for select trigger button.</td>
                  </tr>

                  <tr>
                    <td className="p-3">valueClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for selected value text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for dropdown menu.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for each option item.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for icons.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for helper/error text.</td>
                  </tr>

                  {/* Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">triggerStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for trigger.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for dropdown.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for items.</td>
                  </tr>

                  {/* Theme */}
                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">undefined</td>
                    <td className="p-3">
                      Force dark mode (defaults to system preference).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">primaryColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"var(--primary)"</td>
                    <td className="p-3">
                      Primary color for highlights and selection.
                    </td>
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
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Select value="unknown" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Ensure the value exists in the options array.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{"<Select multiple options={sampleOptions} />"}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Correct multi-select usage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <div className="text-gray-200 space-y-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Use multiple mode for tags or multi-selection forms.</li>
                <li>Combine with icons for better UX.</li>
                <li>Control darkMode to match page theme.</li>
                <li>Use onValueChange for controlled state management.</li>
                <li>Apply custom classes for styling flexibility.</li>
              </ul>
            </div>
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

export default SelectDocs;
