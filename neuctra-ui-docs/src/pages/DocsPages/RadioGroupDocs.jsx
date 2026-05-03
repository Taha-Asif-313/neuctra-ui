"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import DocsFooter from "../../components/Docs/DocsFooter";
import { RadioGroup } from "@neuctra/ui";
import { Check, X, Lightbulb, Settings, Zap } from "lucide-react";

const options = [
  {
    label: "Option One",
    value: "one",
    description: "This is the first option",
  },
  {
    label: "Option Two",
    value: "two",
    description: "This is the second option",
  },
  {
    label: "Option Three",
    value: "three",
    description: "This is the third option",
  },
];

const optionsWithIcons = [
  {
    label: "Light Mode",
    value: "light",
    icon: <Lightbulb size={16} />,
    description: "Bright and clear",
  },
  {
    label: "Dark Mode",
    value: "dark",
    icon: <Settings size={16} />,
    description: "Easy on the eyes",
  },
  {
    label: "Auto Mode",
    value: "auto",
    icon: <Zap size={16} />,
    description: "Follows system",
  },
];

const RadioGroupDocs = () => {
  const [value, setValue] = useState("one");
  const [theme, setTheme] = useState("light");

  return (
    <>
      <Metadata
        title="RadioGroup Component — Neuctra UI"
        description="Fully customizable RadioGroup component with keyboard navigation, multiple sizes, orientations, and comprehensive styling control."
        keywords="RadioGroup React, headless radio group, Tailwind radio component, customizable radio buttons, keyboard navigation, accessible radio group"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              RadioGroup Component
            </h1>

            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">RadioGroup</span>{" "}
              component is a fully accessible and highly customizable selection
              control built with TypeScript and Tailwind CSS. It allows users to
              select a single option from a list with full keyboard navigation,
              rich content support, and complete styling flexibility.
            </p>

            <p className="text-sm text-gray-200 mt-3 leading-relaxed">
              Use <code>selectedValue</code> and <code>onChange</code> for
              controlled state, <code>orientation</code> for layout direction,
              and <code>size</code> for consistent scaling. You can also enhance
              options with <code>icon</code> and <code>description</code> for
              better UX clarity.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { RadioGroup } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple radio group. The component supports single
              selection with keyboard navigation, icons, and descriptions.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { useState } from 'react';
import { RadioGroup } from '@neuctra/ui';

function BasicExample() {
  const [value, setValue] = useState('option1');

  const options = [
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' }
  ];

  return (
    <RadioGroup
      options={options}
      selectedValue={value}
      onChange={setValue}
      label="Choose an option"
    />
  );
}`}
            />
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              What It Does
            </h2>

            <div className=" text-sm text-gray-200 space-y-3">
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Single Selection:</strong> Only one option can be
                  selected at a time.
                </div>
              </div>
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Keyboard Navigation:</strong> Arrow keys, Home/End,
                  Space/Enter support.
                </div>
              </div>
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Multiple Sizes:</strong> Small, medium, and large
                  variants.
                </div>
              </div>
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Flexible Layout:</strong> Vertical or horizontal
                  orientation.
                </div>
              </div>
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Rich Content:</strong> Support for icons,
                  descriptions, and custom styling.
                </div>
              </div>
              <div className="flex gap-3">
                <Check size={15} className={"text-primary"} />
                <div>
                  <strong>Fully Accessible:</strong> ARIA attributes, screen
                  reader support, focus management.
                </div>
              </div>
            </div>
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Import Component From Library
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
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Basic Usage
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              Create a simple radio group with options array. Each option needs
              a{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">
                label
              </code>{" "}
              and{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">
                value
              </code>
              .
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [value, setValue] = useState("one");

<RadioGroup
  options={[
    { label: "Option One", value: "one" },
    { label: "Option Two", value: "two" },
    { label: "Option Three", value: "three" }
  ]}
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

          {/* Rich Content */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Rich Content Support
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              Add icons and descriptions to make options more informative and
              visually appealing.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const optionsWithIcons = [
  {
    label: "Light Mode",
    value: "light",
    icon: <Lightbulb size={16} />,
    description: "Bright and clear interface"
  },
  {
    label: "Dark Mode",
    value: "dark",
    icon: <Settings size={16} />,
    description: "Easy on the eyes"
  },
  {
    label: "Auto Mode",
    value: "auto",
    icon: <Zap size={16} />,
    description: "Follows system preference"
  }
];

<RadioGroup
  options={optionsWithIcons}
  selectedValue={theme}
  onChange={setTheme}
/>`}
              previewContent={
                <RadioGroup
                  options={optionsWithIcons}
                  selectedValue={theme}
                  onChange={setTheme}
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">Sizes</h2>

            <p className="text-gray-200 text-sm mb-4">
              Choose from three size variants:{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">sm</code>,{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">md</code>{" "}
              (default), and{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">lg</code>.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<RadioGroup size="sm" options={options} selectedValue={value} onChange={setValue} />
<RadioGroup size="md" options={options} selectedValue={value} onChange={setValue} />
<RadioGroup size="lg" options={options} selectedValue={value} onChange={setValue} />`}
              previewContent={
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Small (sm)</p>
                    <RadioGroup
                      size="sm"
                      options={options}
                      selectedValue={value}
                      onChange={setValue}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Medium (md) - Default
                    </p>
                    <RadioGroup
                      size="md"
                      options={options}
                      selectedValue={value}
                      onChange={setValue}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Large (lg)</p>
                    <RadioGroup
                      size="lg"
                      options={options}
                      selectedValue={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              }
            />
          </section>

          {/* Orientation */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Orientation
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              Display options vertically (default) or horizontally using the{" "}
              <code className="bg-zinc-900 px-2 py-1 rounded text-xs">
                orientation
              </code>{" "}
              prop.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`// Vertical (default)
<RadioGroup
  orientation="vertical"
  options={options}
  selectedValue={value}
  onChange={setValue}
/>

// Horizontal
<RadioGroup
  orientation="horizontal"
  options={options}
  selectedValue={value}
  onChange={setValue}
/>`}
              previewContent={
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Vertical (default)
                    </p>
                    <RadioGroup
                      orientation="vertical"
                      options={options.slice(0, 3)}
                      selectedValue={value}
                      onChange={setValue}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Horizontal</p>
                    <RadioGroup
                      orientation="horizontal"
                      options={options.slice(0, 3)}
                      selectedValue={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              }
            />
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              States &amp; Validation
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              Handle disabled options, read-only mode, required fields, and
              error states.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const optionsWithDisabled = [
  { label: "Enabled Option", value: "enabled" },
  { label: "Disabled Option", value: "disabled", disabled: true },
  { label: "Another Enabled", value: "another" }
];

<RadioGroup
  options={optionsWithDisabled}
  selectedValue="enabled"
  disabled={false}
  readOnly={false}
  required={true}
  error="Please select an option"
/>`}
              previewContent={
                <div className="space-y-4">
                  <RadioGroup
                    options={[
                      { label: "Enabled Option", value: "enabled" },
                      {
                        label: "Disabled Option",
                        value: "disabled",
                        disabled: true,
                      },
                      { label: "Another Enabled", value: "another" },
                    ]}
                    selectedValue="enabled"
                    required={true}
                    error="Please select an option"
                  />
                </div>
              }
            />
          </section>

          {/* Keyboard Navigation */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Keyboard Navigation
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              Full keyboard support for accessibility and power users.
            </p>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-200 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="">Navigation:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        ↑
                      </kbd>{" "}
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        ↓
                      </kbd>{" "}
                      Move up/down
                    </li>
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        ←
                      </kbd>{" "}
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        →
                      </kbd>{" "}
                      Move left/right
                    </li>
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        Home
                      </kbd>{" "}
                      First option
                    </li>
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        End
                      </kbd>{" "}
                      Last option
                    </li>
                  </ul>
                </div>
                <div>
                  <strong className="">Selection:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        Space
                      </kbd>{" "}
                      Select focused option
                    </li>
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        Enter
                      </kbd>{" "}
                      Select focused option
                    </li>
                    <li>
                      <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">
                        Tab
                      </kbd>{" "}
                      Move to next focusable element
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <CodePreviewBlock
              language="tsx"
              code={`// Try keyboard navigation - focus this radio group and use arrow keys
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

          {/* Styling & Customization */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Styling &amp; Customization
            </h2>

            <p className="text-gray-200 text-sm mb-4">
              RadioGroup supports multiple styling layers so you can fully
              customize layout, structure, and selection state using Tailwind
              CSS classes.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}

  className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800"

  itemClassName="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 hover:bg-zinc-800 transition-all duration-200"

  labelClassName="text-white font-medium"
  descriptionClassName="text-zinc-400 text-xs"

  iconWrapperClassName="text-zinc-400"

  indicatorClassName="border border-zinc-600 bg-zinc-900"

  dotClassName="bg-primary"
/>`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
                  className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800"
                  itemClassName="bg-zinc-900/60 border !border-zinc-800 rounded-xl px-4 py-3 hover:bg-zinc-800 transition-all duration-200"
                  labelClassName="text-white font-medium"
                  descriptionClassName="text-zinc-400 text-xs"
                  iconWrapperClassName="text-zinc-400"
                  indicatorClassName="border border-zinc-600 bg-zinc-900"
                  dotClassName="bg-primary"
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
              All available props for the RadioGroup component.
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
                  {/* Core */}
                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Form field name for native radio grouping.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">Option[]</td>
                    <td className="p-3">required</td>
                    <td className="p-3">
                      List of radio options (label, value, description, icon,
                      disabled).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">selectedValue</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Currently selected option value.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(value: string) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when selection changes.</td>
                  </tr>

                  {/* State */}
                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables all options.</td>
                  </tr>

                  <tr>
                    <td className="p-3">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Prevents interaction but keeps UI active.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required for forms.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message below component.</td>
                  </tr>

                  {/* Config */}
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">Controls radio size.</td>
                  </tr>

                  <tr>
                    <td className="p-3">orientation</td>
                    <td className="p-3">"vertical" | "horizontal"</td>
                    <td className="p-3">"vertical"</td>
                    <td className="p-3">Layout direction.</td>
                  </tr>

                  <tr>
                    <td className="p-3">animationDuration</td>
                    <td className="p-3">number</td>
                    <td className="p-3">0.2</td>
                    <td className="p-3">Dot animation speed in seconds.</td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root container styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Each radio item wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">descriptionClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Description text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconWrapperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon container styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">indicatorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Outer radio circle styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dotClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inner selected dot styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">errorClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error message styling.</td>
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
                    <td className="p-3">Item inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Label inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">descriptionStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Description inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconWrapperStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon wrapper inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">indicatorStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Radio indicator inline styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dotStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Dot inline styles.</td>
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
              {/* Missing options */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<RadioGroup selectedValue="one" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    options array is required.
                  </p>
                </div>
              </div>

              {/* Wrong value handling */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<RadioGroup selectedValue="one" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Without onChange, selection will not update.
                  </p>
                </div>
              </div>

              {/* Wrong controlled usage */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>
                    {'<RadioGroup selectedValue="one" defaultValue="two" />'}
                  </code>
                  <p className="text-gray-400 text-xs mt-1">
                    Do not mix controlled and uncontrolled modes.
                  </p>
                </div>
              </div>

              {/* Correct */}
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>
                    {
                      "<RadioGroup options={options} selectedValue={value} onChange={setValue} />"
                    }
                  </code>
                  <p className="text-gray-400 text-xs mt-1">
                    Proper controlled usage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <div className="text-gray-200 space-y-3">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Use <code>orientation="horizontal"</code> for ratings,
                  pricing, or quick choices.
                </li>

                <li>
                  Add <code>icon</code> + <code>description</code> to improve
                  decision clarity.
                </li>

                <li>
                  Keep <code>selectedValue</code> controlled for predictable UI
                  state.
                </li>

                <li>
                  Use <code>readOnly</code> instead of disabling for preview
                  modes.
                </li>

                <li>
                  Use keyboard navigation — it's already built in (Arrow keys,
                  Enter, Space).
                </li>

                <li>
                  Prefer Tailwind via className props instead of inline styles
                  for scalability.
                </li>

                <li>
                  Skip disabled options automatically — no extra logic needed.
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default RadioGroupDocs;
