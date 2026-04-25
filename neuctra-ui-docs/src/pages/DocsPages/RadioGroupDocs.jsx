"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import Metadata from "../../MetaData";
import { RadioGroup } from "@neuctra/ui";
import { Check, X, Lightbulb, Settings, Zap } from "lucide-react";

const options = [
  { label: "Option One", value: "one", description: "This is the first option" },
  { label: "Option Two", value: "two", description: "This is the second option" },
  { label: "Option Three", value: "three", description: "This is the third option" },
];

const optionsWithIcons = [
  { label: "Light Mode", value: "light", icon: <Lightbulb size={16} />, description: "Bright and clear" },
  { label: "Dark Mode", value: "dark", icon: <Settings size={16} />, description: "Easy on the eyes" },
  { label: "Auto Mode", value: "auto", icon: <Zap size={16} />, description: "Follows system" },
];

const RadioGroupDocs = () => {
  const [value, setValue] = useState("one");
  const [theme, setTheme] = useState("light");
  const [size, setSize] = useState("md");
  const [orientation, setOrientation] = useState("vertical");
  const [customStyled, setCustomStyled] = useState("card");

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
            <p className="text-lg text-gray-200 leading-relaxed">
              A fully customizable and accessible radio group component supporting single selection, keyboard navigation, multiple sizes, orientations, and complete styling control. Built entirely with Tailwind CSS for maximum design flexibility.
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

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              What It Does
            </h2>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-300 space-y-3">
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Single Selection:</strong> Only one option can be selected at a time.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Keyboard Navigation:</strong> Arrow keys, Home/End, Space/Enter support.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Multiple Sizes:</strong> Small, medium, and large variants.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Flexible Layout:</strong> Vertical or horizontal orientation.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Rich Content:</strong> Support for icons, descriptions, and custom styling.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong>Fully Accessible:</strong> ARIA attributes, screen reader support, focus management.
                </div>
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <p className="text-gray-300 mb-4">
              Create a simple radio group with options array. Each option needs a <code className="bg-zinc-900 px-2 py-1 rounded text-xs">label</code> and <code className="bg-zinc-900 px-2 py-1 rounded text-xs">value</code>.
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Rich Content Support
            </h2>

            <p className="text-gray-300 mb-4">
              Add icons and descriptions to make options more informative and visually appealing.
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Sizes
            </h2>

            <p className="text-gray-300 mb-4">
              Choose from three size variants: <code className="bg-zinc-900 px-2 py-1 rounded text-xs">sm</code>, <code className="bg-zinc-900 px-2 py-1 rounded text-xs">md</code> (default), and <code className="bg-zinc-900 px-2 py-1 rounded text-xs">lg</code>.
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
                    <RadioGroup size="sm" options={options} selectedValue={value} onChange={setValue} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Medium (md) - Default</p>
                    <RadioGroup size="md" options={options} selectedValue={value} onChange={setValue} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Large (lg)</p>
                    <RadioGroup size="lg" options={options} selectedValue={value} onChange={setValue} />
                  </div>
                </div>
              }
            />
          </section>

          {/* Orientation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Orientation
            </h2>

            <p className="text-gray-300 mb-4">
              Display options vertically (default) or horizontally using the <code className="bg-zinc-900 px-2 py-1 rounded text-xs">orientation</code> prop.
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
                    <p className="text-sm text-gray-400 mb-2">Vertical (default)</p>
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              States &amp; Validation
            </h2>

            <p className="text-gray-300 mb-4">
              Handle disabled options, read-only mode, required fields, and error states.
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
                      { label: "Disabled Option", value: "disabled", disabled: true },
                      { label: "Another Enabled", value: "another" }
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Keyboard Navigation
            </h2>

            <p className="text-gray-300 mb-4">
              Full keyboard support for accessibility and power users.
            </p>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-300 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="text-primary">Navigation:</strong>
                  <ul className="mt-2 space-y-1">
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">↑</kbd> <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">↓</kbd> Move up/down</li>
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">←</kbd> <kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">→</kbd> Move left/right</li>
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">Home</kbd> First option</li>
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">End</kbd> Last option</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary">Selection:</strong>
                  <ul className="mt-2 space-y-1">
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">Space</kbd> Select focused option</li>
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">Enter</kbd> Select focused option</li>
                    <li><kbd className="bg-zinc-800 px-2 py-1 rounded text-xs">Tab</kbd> Move to next focusable element</li>
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Styling &amp; Customization
            </h2>

            <p className="text-gray-300 mb-4">
              RadioGroup has 8+ styling layers — customize at any level using Tailwind classes or inline styles.
            </p>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm text-gray-300 space-y-3 mb-4">
              <div>
                <strong className="text-primary">className / style:</strong> Root container
              </div>
              <div>
                <strong className="text-primary">itemClassName / itemStyle:</strong> Each radio item wrapper
              </div>
              <div>
                <strong className="text-primary">labelClassName / labelStyle:</strong> Label text
              </div>
              <div>
                <strong className="text-primary">descriptionClassName / descriptionStyle:</strong> Description text
              </div>
              <div>
                <strong className="text-primary">iconWrapperClassName / iconWrapperStyle:</strong> Icon container
              </div>
              <div>
                <strong className="text-primary">indicatorClassName / indicatorStyle:</strong> Radio circle border
              </div>
              <div>
                <strong className="text-primary">dotClassName / dotStyle:</strong> Inner selected dot
              </div>
              <div>
                <strong className="text-primary">glowClassName / glowStyle:</strong> Selection glow effect
              </div>
              <div>
                <strong className="text-primary">errorClassName / errorStyle:</strong> Error message
              </div>
            </div>

            <CodePreviewBlock
              language="tsx"
              code={`<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}
  className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-2xl"
  itemClassName="bg-zinc-800/50 border border-zinc-600 hover:bg-zinc-700/50 transition-all duration-200"
  labelClassName="text-white font-semibold"
  descriptionClassName="text-zinc-400"
  indicatorClassName="border-2 border-blue-400"
  dotClassName="bg-blue-400"
  glowClassName="border-blue-400/30"
/>`}
              previewContent={
                <RadioGroup
                  options={options}
                  selectedValue={value}
                  onChange={setValue}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-2xl"
                  itemClassName="bg-zinc-800/50 border border-zinc-600 hover:bg-zinc-700/50 transition-all duration-200"
                  labelClassName="text-white font-semibold"
                  descriptionClassName="text-zinc-400"
                  indicatorClassName="border-2 border-blue-400"
                  dotClassName="bg-blue-400"
                  glowClassName="border-blue-400/30"
                />
              }
            />
          </section>

          {/* Props Reference */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Reference
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">
                      Prop
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">
                      Type
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">
                      Default
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Core Props */}
                  <tr>
                    <td colSpan="4" className="bg-gray-900 px-4 py-2 text-white font-semibold">
                      Core Props
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>name</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      HTML name attribute for form integration
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>options</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>Option[]</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-red-400">
                      required
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Array of radio options with label, value, and optional description/icon/disabled
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>selectedValue</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Currently selected option value
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>onChange</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>(value: string) =&gt; void</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Callback fired when selection changes
                    </td>
                  </tr>

                  {/* State & Validation */}
                  <tr>
                    <td colSpan="4" className="bg-gray-900 px-4 py-2 text-white font-semibold">
                      State & Validation
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>disabled</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>false</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Disables all radio options
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>readOnly</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>false</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Makes component read-only (visual but not interactive)
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>required</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>false</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Marks the field as required for form validation
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>error</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Error message to display below the component
                    </td>
                  </tr>

                  {/* Configuration */}
                  <tr>
                    <td colSpan="4" className="bg-gray-900 px-4 py-2 text-white font-semibold">
                      Configuration
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>size</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>'sm' | 'md' | 'lg'</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>'md'</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Controls the overall size of radio options
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>orientation</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>'vertical' | 'horizontal'</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>'vertical'</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Layout direction of radio options
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>showGlow</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>true</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Whether to show glow effect on selected option
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>animationDuration</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>number</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>200</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Duration of selection animations in milliseconds
                    </td>
                  </tr>

                  {/* Styling — Tailwind Classes */}
                  <tr>
                    <td colSpan="4" className="bg-gray-900 px-4 py-2 text-white font-semibold">
                      Styling — Tailwind Classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>className</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Root container classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>itemClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Individual radio item container classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>labelClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Label text classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>descriptionClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Description text classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>iconWrapperClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Icon wrapper container classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>indicatorClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Radio indicator (outer ring) classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>dotClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Inner dot classes (when selected)
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>glowClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Glow effect classes
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>errorClassName</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Error message text classes
                    </td>
                  </tr>

                  {/* Inline Styles */}
                  <tr>
                    <td colSpan="4" className="bg-gray-900 px-4 py-2 text-white font-semibold">
                      Inline Styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>style</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Root container inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>itemStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Individual radio item inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>labelStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Label text inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>descriptionStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Description text inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>iconWrapperStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Icon wrapper inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>indicatorStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Radio indicator inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>dotStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Inner dot inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>glowStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Glow effect inline styles
                    </td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>errorStyle</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      <code>React.CSSProperties</code>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">
                      Error message inline styles
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
                <h3 className="text-lg font-semibold text-white mb-2">
                  Form Integration
                </h3>
                <p className="text-gray-300 mb-3">
                  Use RadioGroup in forms with proper validation and accessibility.
                </p>
                <CodePreviewBlock
                  language="tsx"
                  code={`import { RadioGroup } from 'neuctra-ui';
import { useState } from 'react';

function UserPreferencesForm() {
  const [theme, setTheme] = useState('light');
  const [errors, setErrors] = useState({});

  const themeOptions = [
    { label: 'Light', value: 'light', icon: '☀️' },
    { label: 'Dark', value: 'dark', icon: '🌙' },
    { label: 'System', value: 'system', icon: '💻' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme) {
      setErrors({ theme: 'Please select a theme' });
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        name="theme"
        options={themeOptions}
        selectedValue={theme}
        onChange={setTheme}
        required
        error={errors.theme}
        labelClassName="font-medium"
      />
      <button type="submit">Save Preferences</button>
    </form>
  );
}`}
                />
              </div>

              {/* Settings Panel */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Settings Panel
                </h3>
                <p className="text-gray-300 mb-3">
                  Create organized settings with descriptions and icons.
                </p>
                <CodePreviewBlock
                  language="tsx"
                  code={`import { RadioGroup } from 'neuctra-ui';
import { Settings, Shield, Zap } from 'lucide-react';

function PrivacySettings() {
  const [privacy, setPrivacy] = useState('friends');

  const privacyOptions = [
    {
      label: 'Public',
      value: 'public',
      icon: <Shield size={16} />,
      description: 'Anyone can see your profile'
    },
    {
      label: 'Friends Only',
      value: 'friends',
      icon: <Settings size={16} />,
      description: 'Only friends can see your profile'
    },
    {
      label: 'Private',
      value: 'private',
      icon: <Zap size={16} />,
      description: 'Only you can see your profile'
    }
  ];

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
      <RadioGroup
        options={privacyOptions}
        selectedValue={privacy}
        onChange={setPrivacy}
        size="lg"
        itemClassName="p-4 border rounded-lg hover:bg-gray-50"
        iconWrapperClassName="mr-3"
      />
    </div>
  );
}`}
                />
              </div>

              {/* Survey/Feedback */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Survey/Feedback
                </h3>
                <p className="text-gray-300 mb-3">
                  Collect ratings or feedback with clear visual options.
                </p>
                <CodePreviewBlock
                  language="tsx"
                  code={`import { RadioGroup } from 'neuctra-ui';

function SatisfactionSurvey() {
  const [rating, setRating] = useState('');

  const ratingOptions = [
    { label: 'Very Dissatisfied', value: '1', icon: '😞' },
    { label: 'Dissatisfied', value: '2', icon: '😐' },
    { label: 'Neutral', value: '3', icon: '😊' },
    { label: 'Satisfied', value: '4', icon: '😃' },
    { label: 'Very Satisfied', value: '5', icon: '😍' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        How satisfied are you with our service?
      </h3>
      <RadioGroup
        options={ratingOptions}
        selectedValue={rating}
        onChange={setRating}
        orientation="horizontal"
        size="sm"
        itemClassName="flex-1 text-center p-3 border rounded-lg hover:bg-blue-50"
        labelClassName="text-sm"
      />
    </div>
  );
}`}
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
                    Forgetting to provide options array
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - no options provided
<RadioGroup
  selectedValue="option1"
  onChange={setValue}
/>`}
                  />
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct - provide options array
<RadioGroup
  options={[
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ]}
  selectedValue="option1"
  onChange={setValue}
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <X size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-500">
                    Using selectedValue without onChange
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - selectedValue is read-only without onChange
<RadioGroup
  options={options}
  selectedValue="option1"
/>`}
                  />
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct - provide onChange to make it interactive
<RadioGroup
  options={options}
  selectedValue="option1"
  onChange={setSelectedValue}
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <X size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-500">
                    Not handling controlled vs uncontrolled state
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ❌ Wrong - mixing controlled/uncontrolled
function MyComponent() {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup
      options={options}
      selectedValue={value} // controlled
      defaultValue="option2" // ❌ don't use both
      onChange={setValue}
    />
  );
}`}
                  />
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct - use either controlled or uncontrolled
// Controlled (recommended for forms)
<RadioGroup
  options={options}
  selectedValue={value}
  onChange={setValue}
/>

// Uncontrolled (for simple cases)
<RadioGroup
  options={options}
  defaultValue="option1"
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-green-400">
                    Correct form integration with validation
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct - proper form integration
function MyForm() {
  const [selected, setSelected] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setErrors({ radio: 'Please select an option' });
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        name="my-radio"
        options={options}
        selectedValue={selected}
        onChange={(value) => {
          setSelected(value);
          setErrors({}); // Clear errors on change
        }}
        required
        error={errors.radio}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-green-400">
                    Proper keyboard navigation setup
                  </span>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Correct - keyboard navigation works automatically
<RadioGroup
  options={options}
  selectedValue={selected}
  onChange={setSelected}
  // No additional setup needed - arrow keys, space, enter work out of the box
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
                  <span>Use Tailwind classes for complete customization.</span> Combine
                  className, itemClassName, labelClassName, and indicatorClassName to achieve any
                  design without custom CSS.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Leverage keyboard navigation for accessibility.</span> Arrow keys,
                  Home/End, and Space/Enter work automatically — perfect for form-heavy interfaces.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Add rich content with icons and descriptions.</span> Use the icon and
                  description properties in options for more engaging radio groups.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Use orientation for different layouts.</span> Horizontal orientation
                  works great for ratings, vertical for longer option lists.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Combine with validation for better UX.</span> Add error messages with
                  the error prop for real-time form validation feedback.
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Control animation timing.</span> Adjust animationDuration for faster
                  or slower selection transitions (default 200ms).
                </div>
              </li>
              <li className="flex gap-3">
                <Lightbulb
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <span>Use dotClassName for brand colors.</span> Customize the selected dot
                  color with Tailwind utilities like dotClassName="bg-purple-500".
                </div>
              </li>
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
