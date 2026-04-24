"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { SwitchGroup } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const SwitchGroupDocs = () => {
  const [values, setValues] = useState(["react"]);
  const [singleChecked, setSingleChecked] = useState(false);

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  return (
    <>
      <Metadata
        title="Switch Component — Neuctra UI"
        description="Fully customizable Switch component with single toggle and optional group functionality, built with Tailwind-based styling."
        keywords="Switch, SwitchGroup, React switch toggle, UI library, Tailwind switch, toggle, single switch, multi select toggle"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Switch
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              A flexible and fully customizable switch component that supports single toggles by default, with optional multi-select group functionality. Built to
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
                  label="Enable feature"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
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
              code={`const [checked, setChecked] = useState(false);

<SwitchGroup
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>`}
              previewContent={
                <SwitchGroup
                  label="Enable notifications"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
                />
              }
            />
          </section>

          {/* Group Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Group Mode
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState([]);

<SwitchGroup
  mode="group"
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" }
  ]}
  selectedValues={values}
  onChange={setValues}
/>`}
              previewContent={
                <SwitchGroup
                  mode="group"
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
  label="Custom styled switch"
  checked={checked}
  onCheckedChange={setChecked}
  className="bg-zinc-900 p-4 rounded-xl"
  labelClassName="hover:bg-zinc-800 p-2 rounded"
  textClassName="text-sm font-medium text-blue-400"
  switchClassName="bg-green-500"
/>`}
              previewContent={
                <SwitchGroup
                  label="Custom styled switch"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
                  className="bg-zinc-900 p-4 rounded-xl"
                  labelClassName="hover:bg-zinc-800 p-2 rounded"
                  textClassName="text-sm font-medium"
                  switchClassName="bg-zinc-700"
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup label="Small" iconSize={16} />
<SwitchGroup label="Large" iconSize={24} />`}
              previewContent={
                <div className="space-y-4">
                  <SwitchGroup
                    label="Small switch"
                    checked={singleChecked}
                    onCheckedChange={setSingleChecked}
                    iconSize={16}
                  />
                  <SwitchGroup
                    label="Large switch"
                    checked={singleChecked}
                    onCheckedChange={setSingleChecked}
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
                  {/* CORE */}
                  <tr>
                    <td className="p-3 font-mono">mode</td>
                    <td className="p-3">'single' | 'group'</td>
                    <td className="p-3">'single'</td>
                    <td className="p-3">Switch between single toggle or multi-select group.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Form field name.</td>
                  </tr>

                  {/* GROUP MODE */}
                  <tr>
                    <td className="p-3 font-mono">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">List of switch items (group mode).</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">Controlled selected values (group mode).</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onChange</td>
                    <td className="p-3">(values: string[]) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback when selection changes (group mode).</td>
                  </tr>

                  {/* SINGLE MODE */}
                  <tr>
                    <td className="p-3 font-mono">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text for single switch.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">checked</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Checked state (single mode).</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onCheckedChange</td>
                    <td className="p-3">(checked: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback when checked state changes (single mode).</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">Size of switch thumb.</td>
                  </tr>

                  {/* STATES */}
                  <tr>
                    <td className="p-3 font-mono">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables all interactions.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Prevents state changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message display.</td>
                  </tr>

                  {/* CLASS CUSTOMIZATION */}
                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper class.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Each item wrapper class.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label wrapper class.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text styling class.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">switchClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch track styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">thumbClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch thumb styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message styling.</td>
                  </tr>

                  {/* STYLE CUSTOMIZATION */}
                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">itemStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Item wrapper inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">switchStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch track inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">thumbStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch thumb inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">errorStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error text inline styles.</td>
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
                  <p className="text-gray-500 text-xs">Must be an array.</p>
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

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

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
