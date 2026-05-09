"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/docs/CodePreviewBlock";
import CodeBlock from "../../components/docs/CodeBlock";
import Metadata from "../../MetaData";
import { Switch } from "@neuctra/ui";
import { Check, X } from "lucide-react";
import DocsFooter from "../../components/docs/DocsFooter";

const SwitchDocs = () => {
  const [values, setValues] = useState(["react"]);
  const [singleChecked, setSingleChecked] = useState(false);
  const [styledDemo, setStyledDemo] = useState(false);

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  return (
    <>
      <Metadata
        title="Switch Component — Neuctra UI"
        description="A fully customizable Switch component supporting single toggle and group multi-select modes with keyboard navigation and Tailwind-based styling."
        keywords="Switch, Toggle, React Switch, UI Component, Tailwind Switch, Multi Switch, Form Controls"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Switch Component
            </h1>

            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">Switch</span>{" "}
              component is a flexible UI primitive built with TypeScript that
              supports both{" "}
              <span className="text-primary font-medium">single toggle</span>{" "}
              and{" "}
              <span className="text-primary font-medium">
                group multi-select
              </span>{" "}
              modes. It is designed for modern design systems with full
              customization support, accessibility, and group keyboard
              navigation.
            </p>

            <p className="text-sm text-gray-200 mt-3 leading-relaxed">
              Use <code>mode="single"</code> for simple on/off toggles like
              settings or preferences, and <code>mode="group"</code> for
              multi-select options like permissions or filters. Control state
              using <code>checked</code> and <code>selectedValues</code>, and
              customize size using <code>iconSize</code>.
            </p>
          </header>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Overview
            </h2>

            <p className="text-sm text-accent-foreground leading-relaxed">
              Switch works in two modes: <code>single</code> for simple on/off
              toggles and <code>group</code> for multi-select switch lists. It
              supports controlled state management, group keyboard navigation,
              disabled/readOnly states, error handling, and highly customizable
              styling through Tailwind or inline styles.
            </p>

            <p className="text-sm text-accent-foreground mt-3 leading-relaxed">
              Use <code>single</code> mode for settings like notifications or
              themes, and <code>group</code> mode for selecting multiple options
              such as features, permissions, or preferences.
            </p>
          </section>

          {/* Option Structure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Option Structure
            </h2>
            <p className="text-gray-300 mb-4">
              Group mode receives an <code>options</code> array. Each option
              needs a display <code>label</code> and a string{" "}
              <code>value</code>.
            </p>
            <CodeBlock
              language="ts"
              code={`type SwitchOption = {
  label: string;
  value: string;
};`}
            />
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>

            <CodeBlock code={`import { Switch } from "@neuctra/ui";`} />

            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              The Switch component supports both single and group modes. No
              extra setup is required — just import and start using it.
            </p>
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple switch. The component supports both single toggle
              and group multi-select modes with full customization.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Switch } from '@neuctra/ui';

function BasicExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      mode="single"
      label="Enable notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Group Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Use <code>mode="group"</code> when several independent switches
              should be controlled as a string array.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Switch } from '@neuctra/ui';

function SwitchGroupExample() {
  const [selectedValues, setSelectedValues] = useState(['email']);

  const options = [
    { label: 'Email alerts', value: 'email' },
    { label: 'SMS alerts', value: 'sms' },
    { label: 'Product updates', value: 'updates' }
  ];

  return (
    <Switch
      mode="group"
      name="notifications"
      options={options}
      selectedValues={selectedValues}
      onChange={setSelectedValues}
    />
  );
}`}
            />
          </section>

          {/* Single Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Single Mode
            </h2>

            <p className="text-gray-200 mb-4">
              Default mode for simple on/off toggles.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [checked, setChecked] = useState(false);

<Switch
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>`}
              previewContent={
                <Switch
                  label="Enable notifications"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
                />
              }
            />
          </section>

          {/* Group Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Group Mode
            </h2>

            <p className="text-gray-200 mb-4">
              Multi-select switch group using <code>mode="group"</code>.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState(["react"]);

<Switch
  name="frameworks"
  mode="group"
  options={options}
  selectedValues={values}
  onChange={setValues}
/>`}
              previewContent={
                <Switch
                  name="frameworks"
                  mode="group"
                  options={options}
                  selectedValues={values}
                  onChange={setValues}
                />
              }
            />
          </section>

          {/* Disabled & ReadOnly */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Disabled & ReadOnly
            </h2>

            <p className="text-sm text-gray-200 mb-4 leading-relaxed">
              Use <code>disabled</code> to completely block interaction and dim
              the UI. Use <code>readOnly</code> when you want to display the
              current state but prevent any changes.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`// Disabled (no interaction)
<Switch
  label="Disabled switch"
  checked={false}
  disabled
/>

// ReadOnly (visible but not editable)
<Switch
  label="Read only switch"
  checked={true}
  readOnly
/>`}
              previewContent={
                <div className="space-y-4">
                  <Switch label="Disabled switch" checked={false} disabled />

                  <Switch label="Read only switch" checked={true} readOnly />
                </div>
              }
            />
          </section>

          {/* Error State */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Error State
            </h2>

            <p className="text-sm text-gray-200 mb-4 leading-relaxed">
              Display validation feedback using the <code>error</code> prop.
              This is useful in forms when a required toggle has not been
              enabled.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Switch
  label="Accept Terms"
  checked={false}
  error="You must accept the terms to continue"
/>`}
              previewContent={
                <Switch
                  label="Accept Terms"
                  checked={false}
                  error="You must accept the terms to continue"
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Sizes (iconSize)
            </h2>

            <p className="text-sm text-gray-200 mb-4 leading-relaxed">
              Control the overall size of the switch using <code>iconSize</code>
              . This adjusts both the track and thumb proportionally.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Switch label="Small" iconSize={16} />
<Switch label="Default" iconSize={20} />
<Switch label="Large" iconSize={26} />`}
              previewContent={
                <div className="space-y-4">
                  <Switch label="Small" iconSize={16} />
                  <Switch label="Default" iconSize={20} />
                  <Switch label="Large" iconSize={26} />
                </div>
              }
            />
          </section>

          {/* Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Styling & Customization
            </h2>

            <p className="text-gray-200 mb-4 text-sm leading-relaxed">
              The Switch component exposes multiple styling layers. You can
              customize the track, thumb, label, and layout using Tailwind
              classes or inline styles.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Switch
  label="Custom styled switch"
  checked={styledDemo}
  onCheckedChange={setStyledDemo}
  className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
  labelClassName="hover:bg-zinc-800 p-3 rounded transition"
  textClassName="text-sm font-semibold text-blue-300"
  switchClassName="bg-blue-600"
  thumbClassName="shadow-lg"
/>`}
              previewContent={
                <Switch
                  label="Custom styled switch"
                  checked={styledDemo}
                  onCheckedChange={setStyledDemo}
                  className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
                  labelClassName="hover:bg-zinc-800 p-3 rounded transition"
                  textClassName="text-sm font-semibold text-blue-300"
                  switchClassName="bg-blue-600"
                  thumbClassName="shadow-lg"
                />
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

            <p className="text-gray-400 mb-3">
              All available props for the Switch component.
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

                <tbody className="divide-y divide-zinc-800 text-gray-200">
                  {/* Mode */}
                  <tr>
                    <td className="p-3">mode</td>
                    <td className="p-3">"single" | "group"</td>
                    <td className="p-3">"single"</td>
                    <td className="p-3">
                      Controls single toggle or multi-switch group mode.
                    </td>
                  </tr>

                  {/* Single mode */}
                  <tr>
                    <td className="p-3">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label for single switch mode.</td>
                  </tr>

                  <tr>
                    <td className="p-3">checked</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Controlled state for single switch.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onCheckedChange</td>
                    <td className="p-3">(checked: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Triggered when single switch toggles.
                    </td>
                  </tr>

                  {/* Group mode */}
                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">{`{ label: string; value: string }[]`}</td>
                    <td className="p-3">—</td>
                    <td className="p-3">List of switches in group mode.</td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">
                      Currently selected values in group mode.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(values: string[]) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Triggered when group selection changes.
                    </td>
                  </tr>

                  {/* State */}
                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables interaction.</td>
                  </tr>

                  <tr>
                    <td className="p-3">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Prevents changes but keeps UI interactive.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Error message displayed below switches.
                    </td>
                  </tr>

                  {/* Config */}
                  <tr>
                    <td className="p-3">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">
                      Base switch size in pixels. The track and thumb scale
                      from this value.
                    </td>
                  </tr>

                  {/* Form */}
                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Form field name attribute.</td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Each switch row container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label wrapper styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">switchClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch track styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">thumbClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Thumb styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error text styling.</td>
                  </tr>

                  {/* Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Row inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label container styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">switchStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Track inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">thumbStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Thumb inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message styles.</td>
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

            <div className="space-y-4 text-sm text-gray-200">
              {/* wrong group type */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>selectedValues="react"</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Must be an array: string[]
                  </p>
                </div>
              </div>

              {/* mixing modes */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>mode="group" + checked</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Do not mix single-mode props with group mode
                  </p>
                </div>
              </div>

              {/* missing handler */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>group without onChange</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Group mode requires onChange to update state
                  </p>
                </div>
              </div>

              {/* correct */}
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>controlled usage</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Always control state for predictable UI behavior
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Pro Tips</h2>

            <ul className="space-y-3 text-gray-200 list-disc list-inside">
              <li>
                Use <code>mode="group"</code> for settings panels, permissions,
                filters.
              </li>

              <li>
                Use <code>iconSize</code> to scale switch without touching CSS.
              </li>

              <li>
                Combine <code>switchClassName</code> + Tailwind gradients for
                modern UI.
              </li>

              <li>
                Use <code>readOnly</code> for display-only preference screens.
              </li>

              <li>
                Use <code>error</code> for inline validation instead of external
                messages.
              </li>

              <li>
                Prefer controlled state (checked / selectedValues) for
                consistency.
              </li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default SwitchDocs;
