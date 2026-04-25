"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { CheckboxGroup } from "@neuctra/ui";
import { Check, X } from "lucide-react";

const CheckboxDocs = () => {
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
        title="Checkbox Group Component — Neuctra UI"
        description="Fully customizable Checkbox Group component with single and group modes, custom rendering, keyboard navigation, and complete style control."
        keywords="CheckboxGroup, React checkbox, checkbox component, multi select, form controls"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-foreground">
              Checkbox Group Component
            </h1>
            <p className="text-sm text-accent-foreground leading-relaxed">
              A flexible <span className="font-semibold text-primary">checkbox</span> component supporting both single toggles and
              multi-select groups. Features keyboard navigation, custom
              rendering, comprehensive styling options, and accessible defaults.
            </p>
          </header>

          {/* Installation */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Installation
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Install the package once and import the component where you need it.
            </p>
            <CodeBlock language="bash" code={`npm install @neuctra/ui`} />
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Import
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { CheckboxGroup } from "@neuctra/ui";`}
            />
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Overview
            </h2>
            <p className="text-sm text-accent-foreground leading-relaxed">
              CheckboxGroup works in two modes: <code>group</code> for
              multi-select lists and <code>single</code> for simple yes/no
              toggles. Both modes support full keyboard navigation, custom icons,
              disabled states, error messages, and unrestricted styling.
            </p>
          </section>

          {/* Single Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Single Mode
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Use <code>mode="single"</code> for a simple on/off checkbox. Track
              state with <code>checked</code> and <code>onCheckedChange</code>.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [checked, setChecked] = useState(false);

<CheckboxGroup
  mode="single"
  label="I agree to the terms"
  checked={checked}
  onCheckedChange={setChecked}
/>`}
              previewContent={
                <CheckboxGroup
                  mode="single"
                  label="I agree to the terms"
                  checked={singleChecked}
                  onCheckedChange={setSingleChecked}
                />
              }
            />
          </section>

          {/* Group Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Group Mode (Default)
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Use <code>mode="group"</code> (or omit it) to display a list of
              checkboxes with multi-select behavior. Pass <code>options</code>,
              track selections with <code>selectedValues</code> and
              <code>onChange</code>.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [values, setValues] = useState(["react"]);

<CheckboxGroup
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
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

          {/* Disabled & Error States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Disabled & Error States
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Disable the entire group or individual options, and show error
              messages below the component.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<CheckboxGroup
  options={[
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled", disabled: true },
  ]}
  selectedValues={["enabled"]}
  onChange={() => {}}
  error="At least one option is required"
/>`}
              previewContent={
                <CheckboxGroup
                  options={[
                    { label: "Enabled", value: "enabled" },
                    { label: "Disabled", value: "disabled", disabled: true },
                  ]}
                  selectedValues={["enabled"]}
                  onChange={() => {}}
                  error="At least one option is required"
                />
              }
            />
          </section>

          {/* Keyboard Navigation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Keyboard Navigation
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Built-in keyboard support for group mode: use arrow keys to
              navigate, space or enter to toggle, and tab to focus/blur.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-sm text-accent-foreground">
              <li>
                <code>↑ ↓</code> — Navigate between items
              </li>
              <li>
                <code>← →</code> — Navigate between items
              </li>
              <li>
                <code>Space / Enter</code> — Toggle current item
              </li>
              <li>
                <code>Tab</code> — Move focus out of the group
              </li>
            </ul>
          </section>

          {/* Custom Rendering */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Custom Rendering
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Use <code>renderItem</code> to completely customize each checkbox
              entry. Useful for building card grids, complex UIs, or branded
              checkboxes.
            </p>

            <CodeBlock
              language="tsx"
              code={`<CheckboxGroup
  options={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ]}
  selectedValues={values}
  onChange={setValues}
  renderItem={({ option, checked, toggle }) => (
    <div
      onClick={toggle}
      className={clsx(
        "p-3 border rounded cursor-pointer transition",
        checked ? "bg-blue-50 border-blue-500" : "bg-white border-gray-300"
      )}
    >
      <div className="font-medium">{option.label}</div>
      <div className="text-sm text-gray-600">Details about {option.label}</div>
    </div>
  )}
/>`}
            />
          </section>

          {/* Styling & Customization */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Styling & Customization
            </h2>
            <p className="text-sm text-accent-foreground mb-3 leading-relaxed">
              Complete control over appearance via Tailwind classes, inline
              styles, and custom icons.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  Styling Layers
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-accent-foreground">
                  <li>
                    <code>className / containerClassName</code> — wrapper styles
                  </li>
                  <li>
                    <code>itemClassName / labelClassName</code> — per-item
                    wrapper
                  </li>
                  <li>
                    <code>textClassName</code> — label text styling
                  </li>
                  <li>
                    <code>iconClassName / iconSize</code> — checkbox icon
                  </li>
                  <li>
                    <code>errorClassName</code> — error message styling
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="tsx"
                code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  className="space-y-3 p-4"
  itemClassName="hover:bg-gray-50 px-2 py-1 rounded"
  textClassName="text-blue-600 font-semibold"
  iconSize={24}
  iconClassName="bg-blue-100 border-blue-500"
/>`}
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Props Reference
            </h2>

            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-accent text-foreground">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border text-accent-foreground">
                  {/* Mode & State */}
                  <tr>
                    <td className="p-3">mode</td>
                    <td className="p-3">"single" | "group"</td>
                    <td className="p-3">"group"</td>
                    <td className="p-3">Single toggle or multi-select list.</td>
                  </tr>

                  {/* Single Mode Props */}
                  <tr>
                    <td className="p-3">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text in single mode.</td>
                  </tr>

                  <tr>
                    <td className="p-3">checked</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Checked state in single mode.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onCheckedChange</td>
                    <td className="p-3">(checked: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Called when toggled in single mode.</td>
                  </tr>

                  {/* Group Mode Props */}
                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">
                      List of options with label, value, disabled.
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
                    <td className="p-3">Called when selection changes.</td>
                  </tr>

                  {/* Common Props */}
                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">HTML name attribute for form submission.</td>
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
                    <td className="p-3">Prevents selection changes (display only).</td>
                  </tr>

                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks inputs as required for validation.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message displayed below the group.</td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper container classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">containerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Override wrapper classes.</td>
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
                    <td className="p-3">Classes for checkbox icon/box.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for error message.</td>
                  </tr>

                  {/* Inline Styles */}
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

                  {/* Icons & Rendering */}
                  <tr>
                    <td className="p-3">customIcon</td>
                    <td className="p-3">(checked, option?) =&gt; ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom checkbox icon renderer.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">Icon size in pixels.</td>
                  </tr>

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

          {/* Common Patterns */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Common Patterns
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Form Integration
                </h3>
                <CodeBlock
                  language="tsx"
                  code={`<form onSubmit={(e) => {
  e.preventDefault();
  console.log(values);
}}>
  <CheckboxGroup
    name="frameworks"
    options={options}
    selectedValues={values}
    onChange={setValues}
    required
  />
  <button type="submit">Submit</button>
</form>`}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Controlled with Validation
                </h3>
                <CodeBlock
                  language="tsx"
                  code={`<CheckboxGroup
  options={options}
  selectedValues={values}
  onChange={setValues}
  error={values.length === 0 ? "Select at least one" : ""}
  required
/>`}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Read-Only Display
                </h3>
                <CodeBlock
                  language="tsx"
                  code={`<CheckboxGroup
  options={options}
  selectedValues={["react", "vue"]}
  onChange={() => {}}
  readOnly
/>`}
                />
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"selectedValues=\"react\""}</code>
                  <p className="text-accent-foreground text-xs mt-1">
                    Must be an array. Use <code>["react"]</code> instead.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"mode=\"single\" + selectedValues"}</code>
                  <p className="text-accent-foreground text-xs mt-1">
                    Use <code>checked</code> and <code>onCheckedChange</code> in
                    single mode.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{"selectedValues={['react', 'vue']}"}</code>
                  <p className="text-accent-foreground text-xs mt-1">
                    Correct: array of values.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>
                    {"mode=\"single\" checked={true} onCheckedChange={...}"}
                  </code>
                  <p className="text-accent-foreground text-xs mt-1">
                    Use correct props for single mode.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-border text-sm text-accent-foreground">
            Built with React, Tailwind CSS &amp; TypeScript.
          </footer>
        </div>
      </div>
    </>
  );
};

export default CheckboxDocs;
