"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { SwitchGroup } from "@neuctra/ui";
import { Check, X, Lightbulb } from "lucide-react";

const SwitchGroupDocs = () => {
  const [values, setValues] = useState(["react"]);
  const [singleChecked, setSingleChecked] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [customStyled, setCustomStyled] = useState(false);

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
              Switch Group Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              A flexible and fully customizable switch component supporting both
              single toggles and multi-select groups. Built entirely with
              Tailwind CSS — no hardcoded colors or styles. Fully keyboard
              accessible with dark mode support.
            </p>
          </header>

          {/* Installation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Installation
            </h2>

            <CodeBlock
              language="bash"
              code={`npm install @neuctra/ui
# or
yarn add @neuctra/ui
# or
pnpm add @neuctra/ui`}
            />
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Import Component
            </h2>

            <CodeBlock
              language="tsx"
              code={`import { SwitchGroup } from "@neuctra/ui";`}
              previewContent={
                <SwitchGroup
                  label="Enable notifications"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
                />
              }
            />
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              What It Does
            </h2>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-300 space-y-3">
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <span>Single Mode:</span> Default behavior — renders a single
                  labeled toggle switch.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <span>Group Mode:</span> Multi-select switches from an options
                  list.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <span>Keyboard Navigation:</span> Arrow keys to navigate,
                  Space/Enter to toggle (group mode).
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <span>Fully Customizable:</span> Control layout, colors, sizes
                  via Tailwind classes or inline styles.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <span>Accessible:</span> ARIA attributes, keyboard support,
                  screen reader friendly.
                </div>
              </div>
            </div>
          </section>

          {/* Single Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Single Mode (Default)
            </h2>

            <p className="text-gray-300 mb-4">
              Renders a single toggle switch with a label. Perfect for on/off
              controls like notifications, dark mode, etc.
            </p>

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

            <p className="text-gray-300 mb-4">
              Enable multi-select by setting{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">
                mode="group"
              </code>{" "}
              and providing options. Each switch toggles independently.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState(["react"]);

<SwitchGroup
  mode="group"
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" }
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

          {/* Disabled & Error States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Disabled &amp; Error States
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup
  label="Disabled switch"
  checked={false}
  disabled={true}
/>

<SwitchGroup
  label="Required field"
  checked={false}
  required={true}
  error="Please enable this option"
/>`}
              previewContent={
                <div className="space-y-4">
                  <SwitchGroup
                    label="Disabled switch"
                    checked={false}
                    disabled={true}
                  />

                  <SwitchGroup
                    label="Required field"
                    checked={false}
                    required={true}
                    error="Please enable this option"
                  />
                </div>
              }
            />
          </section>

          {/* Keyboard Navigation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Keyboard Navigation
            </h2>

            <p className="text-gray-300 mb-4">
              In <span>group mode</span>, navigate with arrow keys and toggle
              with Space or Enter. Single mode follows standard HTML checkbox
              behavior.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`// Group mode (focus and use arrow keys to navigate)
<SwitchGroup
  mode="group"
  options={[
    { label: "TypeScript", value: "ts" },
    { label: "JavaScript", value: "js" },
    { label: "Python", value: "py" }
  ]}
  selectedValues={selected}
  onChange={setSelected}
/>

// Keyboard shortcuts:
// ↑ ← : Move to previous option
// ↓ → : Move to next option
// Space / Enter : Toggle current option`}
              previewContent={
                <SwitchGroup
                  mode="group"
                  options={[
                    { label: "TypeScript", value: "ts" },
                    { label: "JavaScript", value: "js" },
                    { label: "Python", value: "py" },
                  ]}
                  selectedValues={values}
                  onChange={setValues}
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>

            <p className="text-gray-300 mb-4">
              Control switch size using the{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">
                iconSize
              </code>{" "}
              prop. This controls the thumb diameter.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup label="Small (16px)" iconSize={16} />
<SwitchGroup label="Default (20px)" iconSize={20} />
<SwitchGroup label="Large (26px)" iconSize={26} />`}
              previewContent={
                <div className="space-y-4">
                  <SwitchGroup
                    label="Small (16px)"
                    checked={singleChecked}
                    onCheckedChange={setSingleChecked}
                    iconSize={16}
                  />
                  <SwitchGroup
                    label="Default (20px)"
                    checked={singleChecked}
                    onCheckedChange={setSingleChecked}
                    iconSize={20}
                  />
                  <SwitchGroup
                    label="Large (26px)"
                    checked={singleChecked}
                    onCheckedChange={setSingleChecked}
                    iconSize={26}
                  />
                </div>
              }
            />
          </section>

          {/* Styling & Customization */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Styling &amp; Customization
            </h2>

            <p className="text-gray-300 mb-4">
              Switch has multiple styling layers — customize at any level using
              Tailwind classes or inline styles.
            </p>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-300 space-y-3 mb-4">
              <div>
                <span className="text-primary">className / style:</span> Root
                wrapper
              </div>
              <div>
                <span className="text-primary">itemClassName / itemStyle:</span>{" "}
                Each switch item (single/group)
              </div>
              <div>
                <span className="text-primary">
                  labelClassName / labelStyle:
                </span>{" "}
                Label wrapper container
              </div>
              <div>
                <span className="text-primary">textClassName / textStyle:</span>{" "}
                Label text
              </div>
              <div>
                <span className="text-primary">
                  switchClassName / switchStyle:
                </span>{" "}
                Switch track (background)
              </div>
              <div>
                <span className="text-primary">
                  thumbClassName / thumbStyle:
                </span>{" "}
                Switch thumb (toggle button)
              </div>
              <div>
                <span className="text-primary">
                  errorClassName / errorStyle:
                </span>{" "}
                Error message text
              </div>
            </div>

            <CodePreviewBlock
              language="tsx"
              code={`<SwitchGroup
  label="Fully styled switch"
  checked={checked}
  onCheckedChange={setChecked}
  className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
  labelClassName="hover:bg-zinc-800 p-3 rounded transition"
  textClassName="text-sm font-semibold text-blue-300"
  switchClassName="bg-gradient-to-r from-blue-600 to-blue-500"
  thumbClassName="shadow-lg"
/>`}
              previewContent={
                <SwitchGroup
                  label="Custom styled switch"
                  checked={customStyled}
                  onCheckedChange={setCustomStyled}
                  className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
                  labelClassName="hover:bg-zinc-800 p-3 rounded transition"
                  textClassName="text-sm font-semibold text-blue-300"
                  switchClassName="bg-blue-600"
                  thumbClassName="shadow-lg"
                />
              }
            />
          </section>

          {/* Props Reference */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Reference
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
                  {/* 🎯 MODE & DATA */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Mode &amp; Selection
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">mode</td>
                    <td className="p-3">'single' | 'group'</td>
                    <td className="p-3">'single'</td>
                    <td className="p-3">
                      Single toggle or multi-select group.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Form field name attribute.</td>
                  </tr>

                  {/* 📋 GROUP MODE PROPS */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Group Mode Props
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      List of switch items: {`{ label, value, disabled? }`}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">
                      Currently selected/enabled switches.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onChange</td>
                    <td className="p-3">(values: string[]) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Fired when selection changes.</td>
                  </tr>

                  {/* 🎚️ SINGLE MODE PROPS */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Single Mode Props
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text for the switch.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">checked</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Is switch enabled/checked.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onCheckedChange</td>
                    <td className="p-3">(checked: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Fired when toggle state changes.</td>
                  </tr>

                  {/* 🚫 STATE PROPS */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      State &amp; Validation
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Disables all switches, prevents interaction.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Visual only — prevents any changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required in forms.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message shown below switches.</td>
                  </tr>

                  {/* 🎨 CLASS CUSTOMIZATION */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Styling — Tailwind Classes
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper Tailwind classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Each item/label wrapper classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label container wrapper classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text styling classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">switchClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch track (background) classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">thumbClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Switch thumb (toggle button) classes.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message styling classes.</td>
                  </tr>

                  {/* 🎨 INLINE STYLES */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Styling — Inline Styles
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">itemStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Item inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">labelStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">switchStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Track inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">thumbStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Thumb inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">errorStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error text inline styles.</td>
                  </tr>

                  {/* ⚙️ CONFIG */}
                  <tr className="bg-zinc-950">
                    <td
                      colSpan={4}
                      className="p-2 font-semibold text-primary text-xs uppercase"
                    >
                      Configuration
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">
                      Thumb diameter in pixels (affects track width too).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Patterns */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Patterns
            </h2>

            <div className="space-y-6">
              {/* Form Integration */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Form Integration</h3>
                <CodeBlock
                  language="tsx"
                  code={`<form onSubmit={(e) => {
  e.preventDefault();
  const checked = formRef.current.elements['newsletter'].checked;
  console.log("Newsletter:", checked);
}}>
  <SwitchGroup
    name="newsletter"
    label="Subscribe to newsletter"
    checked={subscribed}
    onCheckedChange={setSubscribed}
    required
  />
  <button type="submit">Submit</button>
</form>`}
                />
              </div>

              {/* Controlled with Validation */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Controlled with Validation
                </h3>
                <CodeBlock
                  language="tsx"
                  code={`const [agreed, setAgreed] = useState(false);
const [error, setError] = useState("");

const handleSubmit = () => {
  if (!agreed) {
    setError("You must agree to continue");
    return;
  }
  setError("");
  // Submit...
};

<SwitchGroup
  label="I agree to Terms &amp; Conditions"
  checked={agreed}
  onCheckedChange={setAgreed}
  error={error}
/>`}
                />
              </div>

              {/* Read-Only Display */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Read-Only Display
                </h3>
                <CodeBlock
                  language="tsx"
                  code={`// Show current settings without allowing changes
<SwitchGroup
  mode="group"
  options={permissions}
  selectedValues={userPermissions}
  disabled={true}
  readOnly={true}
/>`}
                />
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <X size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-500">
                    Using string instead of array for selectedValues
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - must be array
selectedValues="react"`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <X size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-500">
                    Using selectedValues in single mode
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - use checked/onCheckedChange in single mode
mode="single"
selectedValues={[...]}
onChange={...}`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <X size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-500">
                    Forgetting to provide onChange in group mode
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - no way to update state
<SwitchGroup
  mode="group"
  options={options}
  selectedValues={values}
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-green-400">
                    Correct usage - group mode
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct
<SwitchGroup
  mode="group"
  options={options}
  selectedValues={["react", "vue"]}
  onChange={setValues}
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-green-400">
                    Correct usage - single mode
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct
<SwitchGroup
  label="Enable feature"
  checked={true}
  onCheckedChange={setChecked}
/>`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Pro Tips</h2>

            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Use Tailwind classes for styling.</span> Combine
                  className, switchClassName, and thumbClassName to achieve any
                  design without needing custom CSS.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Keyboard navigation for UX.</span> Group mode
                  automatically supports arrow keys — perfect for form-heavy
                  interfaces.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Combine with validation.</span> Add error messages with
                  the error prop for real-time form validation feedback.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Use disabled vs readOnly wisely.</span> disabled
                  prevents interaction entirely; readOnly allows viewing but not
                  changing.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Control track color with switchClassName.</span> Use
                  bg-* Tailwind utilities to match your theme:
                  switchClassName="bg-green-600"
                </div>
              </li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-border text-sm text-muted-foreground">
            Built with React, Tailwind CSS &amp; TypeScript.
          </footer>
        </div>
      </div>
    </>
  );
};

export default SwitchGroupDocs;
