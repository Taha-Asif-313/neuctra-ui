"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X, Lightbulb, User } from "lucide-react";
import { Select } from "@neuctra/ui";
import DocsFooter from "../../components/Docs/DocsFooter";

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const userOptions = [
  {
    label: "John Doe",
    value: "john",
    icon: <User size={16} />,
    description: "Senior Developer",
  },
  {
    label: "Jane Smith",
    value: "jane",
    icon: <User size={16} />,
    description: "Product Manager",
  },
  {
    label: "Alex Carter",
    value: "alex",
    icon: <User size={16} />,
    description: "Design Lead",
  },
];

const SelectDocs = () => {
  const [basicValue, setBasicValue] = useState("");
  const [multiValue, setMultiValue] = useState([]);
  const [iconValue, setIconValue] = useState("");

  return (
    <>
      <Metadata
        title="Select Component — Tailwind React Components for SaaS | Neuctra UI"
        description="Select component for SaaS applications - React dropdown with Tailwind CSS. Perfect for SaaS dashboard UI with single/multi-select, searchable lists, and rich content."
        keywords="Tailwind React components for SaaS apps, React UI library for SaaS, SaaS dashboard UI React Tailwind, Neuctra UI Select, React select component, Tailwind select, dropdown, multi-select, searchable select, React UI library, keyboard navigation"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Select Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Select</span>{" "}
              component provides a modern, accessible dropdown input with
              support for single or multiple selection, icons, enhanced keyboard
              navigation, smooth animations, and extensive customization
              options.
            </p>
          </header>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Overview</h2>
            <p className="text-gray-300 mb-4">
              The Select component offers modern UX patterns with:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mb-6">
              <li>
                Keyboard navigation with Arrow keys, Home, End, Enter, and
                Escape
              </li>
              <li>Smooth animations with Framer Motion</li>
              <li>Multiple size variants (sm/md/lg)</li>
              <li>
                Comprehensive accessibility (ARIA attributes, screen reader
                support)
              </li>
              <li>Rich content support (icons, custom styling)</li>
              <li>Controlled and uncontrolled modes</li>
              <li>Extensive customization layers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Option Structure
            </h2>

            <p className="text-gray-300 mb-4">
              Each option in the Select component follows a structured format.
              You can enhance options with icons, descriptions, and even attach
              custom click handlers for advanced behaviors.
            </p>

            <CodeBlock
              language="ts"
              code={`type SelectOption = {
  label: string; // Display text
  value: string; // Unique value
  icon?: React.ReactNode; // Optional icon
  description?: string; // Optional secondary text
  onClick?: (option, event) => void; // Custom click handler
};`}
            />

            <div className="mt-4 text-sm text-gray-400 space-y-2">
              <p>
                <strong className="text-white">onClick:</strong> Trigger custom
                logic when an option is clicked (e.g., navigation, analytics,
                actions).
              </p>
              <p>
                Note: The <code>onClick</code> runs <strong>before</strong>{" "}
                selection logic.
              </p>
            </div>
          </section>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              language="javascript"
              code={`import { Select } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple select dropdown. The component supports both
              controlled and uncontrolled modes.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Select } from '@neuctra/ui';

function BasicExample() {
  const [value, setValue] = useState('');

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  return (
    <Select
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Choose an option"
    />
  );
}`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple select dropdown. The component supports both
              controlled and uncontrolled modes.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Select } from '@neuctra/ui';

function BasicExample() {
  const [value, setValue] = useState('');

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  return (
    <Select
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Choose an option"
    />
  );
}`}
              previewContent={
                <Select
                  options={sampleOptions}
                  value={basicValue}
                  onValueChange={setBasicValue}
                  placeholder="Choose an option"
                />
              }
            />
          </section>

          {/* Multi-Select */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Multi-Select Mode
            </h2>
            <p className="text-gray-300 mb-4">
              Enable multiple selection by setting the <code>multiple</code>{" "}
              prop to <code>true</code>. The component handles arrays of values
              automatically.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Select } from '@neuctra/ui';

function MultiSelectExample() {
  const [values, setValues] = useState([]);

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' }
  ];

  return (
    <Select
      options={options}
      value={values}
      onValueChange={setValues}
      multiple
      placeholder="Select frameworks"
    />
  );
}`}
              previewContent={
                <Select
                  options={[
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue" },
                    { label: "Angular", value: "angular" },
                    { label: "Svelte", value: "svelte" },
                  ]}
                  value={multiValue}
                  onValueChange={setMultiValue}
                  multiple
                  placeholder="Select frameworks"
                />
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Option Click Actions
            </h2>

            <p className="text-gray-300 mb-4">
              You can attach custom click handlers to individual options for
              advanced behaviors like logging, navigation, or triggering modals.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const options = [
  {
    label: "Edit",
    value: "edit",
    onClick: () => console.log("Edit clicked"),
  },
  {
    label: "Delete",
    value: "delete",
    onClick: () => console.log("Delete clicked"),
  },
];

<Select options={options} />`}
              previewContent={
                <Select
                  options={[
                    {
                      label: "Edit",
                      value: "edit",
                      onClick: () => console.log("Edit clicked"),
                    },
                    {
                      label: "Delete",
                      value: "delete",
                      onClick: () => console.log("Delete clicked"),
                    },
                  ]}
                  placeholder="Action menu"
                />
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Hide Selection Indicator
            </h2>

            <p className="text-gray-300 mb-4">
              Disable the check icon for a cleaner or menu-like appearance.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Select
  options={sampleOptions}
  showCheckIcon={false}
  placeholder="No check icon"
/>`}
              previewContent={
                <Select
                  options={sampleOptions}
                  showCheckIcon={false}
                  placeholder="No check icon"
                />
              }
            />
          </section>

          {/* Rich Content Support */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Rich Content Support
            </h2>
            <p className="text-gray-300 mb-4">
              Add icons to options for better visual hierarchy and user
              experience. Icons can be any React element or string.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`import { useState } from 'react';
import { Select } from '@neuctra/ui';

function IconExample() {
  const [assignee, setAssignee] = useState('');

  const userOptions = [
    {
      label: 'John Doe',
      value: 'john',
      icon: <User size={16} />,
      description: 'Senior Developer'
    },
    {
      label: 'Jane Smith',
      value: 'jane',
      icon: <User size={16} />,
      description: 'Product Manager'
    }
  ];

  return (
    <Select
      options={userOptions}
      value={assignee}
      onValueChange={setAssignee}
      searchable
      showDescription
      placeholder="Choose assignee"
    />
  );
}`}
              previewContent={
                <Select
                  options={userOptions}
                  showDescription
                  searchable
                  value={iconValue}
                  onValueChange={setIconValue}
                  placeholder="Choose assignee"
                />
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Size Variants
            </h2>
            <p className="text-gray-300 mb-4">
              Choose from three size variants: <code>sm</code>, <code>md</code>{" "}
              (default), and <code>lg</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`import { Select } from '@neuctra/ui';

function SizeExample() {
  return (
    <div className="space-y-4">
      <Select
        options={sampleOptions}
        size="sm"
        placeholder="Small size"
      />
      <Select
        options={sampleOptions}
        size="md"
        placeholder="Medium size (default)"
      />
      <Select
        options={sampleOptions}
        size="lg"
        placeholder="Large size"
      />
    </div>
  );
}`}
              previewContent={
                <div className="space-y-4">
                  <Select
                    options={sampleOptions}
                    size="sm"
                    placeholder="Small size"
                  />
                  <Select
                    options={sampleOptions}
                    size="md"
                    placeholder="Medium size (default)"
                  />
                  <Select
                    options={sampleOptions}
                    size="lg"
                    placeholder="Large size"
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
                    <td className="p-3">Name used for form handling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">value</td>
                    <td className="p-3">string | string[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controlled value of the select.</td>
                  </tr>

                  <tr>
                    <td className="p-3">defaultValue</td>
                    <td className="p-3">string | string[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Initial value for uncontrolled mode.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onValueChange</td>
                    <td className="p-3">(value, name?) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback when selection changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">SelectOption[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">List of selectable options.</td>
                  </tr>

                  <tr>
                    <td className="p-3">placeholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Select..."</td>
                    <td className="p-3">Text shown when no value selected.</td>
                  </tr>

                  <tr>
                    <td className="p-3">showDescription</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Shows description text under each option.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">showCheckIcon</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">
                      Controls visibility of the check icon for selected
                      options.
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
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string | boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Error state or message.</td>
                  </tr>

                  <tr>
                    <td className="p-3">success</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Applies success styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Helper or validation message.</td>
                  </tr>

                  <tr>
                    <td className="p-3">multiple</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enables multi-select mode.</td>
                  </tr>

                  {/* Icons */}
                  <tr>
                    <td className="p-3">labelIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon shown with label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">prefixIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon inside trigger (left side).</td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">ChevronDown</td>
                    <td className="p-3">Icon for dropdown arrow.</td>
                  </tr>

                  {/* Behavior */}
                  <tr>
                    <td className="p-3">searchable</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enables search input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">searchPlaceholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"Search..."</td>
                    <td className="p-3">Placeholder for search field.</td>
                  </tr>

                  <tr>
                    <td className="p-3">searchClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for the search input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">searchStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for the search input.</td>
                  </tr>

                  {/* Variants */}
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">Controls trigger and item sizing.</td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root container classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">containerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Additional classes for the root container.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for the label element.</td>
                  </tr>

                  <tr>
                    <td className="p-3">triggerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Trigger button classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Dropdown container classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Option item classes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Classes for prefix and dropdown icons.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">helperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for helper or error text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">valueClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Selected value text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemIconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for option icons.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemIconStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for option icons.</td>
                  </tr>

                  <tr>
                    <td className="p-3">checkIconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Classes for the selected check icon.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">checkIconStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles for the selected check icon.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">triggerStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for trigger.</td>
                  </tr>

                  <tr>
                    <td className="p-3">dropdownStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for dropdown.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for items.</td>
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
              {/* Wrong value type */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<Select value={123} />"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Value must be string or string[] — never number or object.
                  </p>
                </div>
              </div>

              {/* Wrong options format */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Select options={[ "Apple", "Banana" ]} />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Options must be objects with label and value keys.
                  </p>
                </div>
              </div>

              {/* uncontrolled vs controlled confusion */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Select value="a" defaultValue="b" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Do not mix controlled (value) and uncontrolled
                    (defaultValue).
                  </p>
                </div>
              </div>

              {/* multiple misuse */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Select multiple value="single" />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    When multiple is true, value must be an array of strings.
                  </p>
                </div>
              </div>

              {/* correct usage */}
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Select options={[{label:"A", value:"a"}]} />'}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Always pass structured options with label and value.
                  </p>
                </div>
              </div>

              {/* performance mistake */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"options.filter(...).map(...) inside render"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Large option lists without memoization can cause lag.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Pro Tips</h2>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Use controlled components for forms
                  </span>
                  <p className="text-gray-300 mt-1">
                    Always use controlled Select components in forms for better
                    validation and state management. This ensures form data is
                    always in sync and validation works correctly.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Pro tip: Controlled form integration
const [formData, setFormData] = useState({ category: '', priority: 'medium' });

<Select
  value={formData.category}
  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
  // Form validation and submission will work reliably
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Leverage rich content options
                  </span>
                  <p className="text-gray-300 mt-1">
                    Use icons, descriptions, and custom styling to make your
                    selects more informative and visually appealing. This
                    improves user experience and reduces cognitive load.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// ✅ Pro tip: Rich content for better UX
const userOptions = [
  {
    label: 'John Doe',
    value: 'john',
    icon: <User size={16} />,
    description: 'Senior Developer'
  },
  {
    label: 'Jane Smith',
    value: 'jane',
    icon: <User size={16} />,
    description: 'Product Manager'
  }
];

<Select
  options={userOptions}
  showDescription
  // Users can quickly identify options with visual cues
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Optimize performance with large datasets
                  </span>
                  <p className="text-gray-300 mt-1">
                    For selects with many options, consider virtualization or
                    search functionality. Use the built-in search feature or
                    implement custom filtering for better performance.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// Pro tip: Search for large option lists
<Select
  options={largeOptionArray} // 100+ options
  searchable // Built-in search functionality
  searchPlaceholder="Type to search..."
  // Users can quickly find options without scrolling through everything
/>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Use size variants strategically
                  </span>
                  <p className="text-gray-300 mt-1">
                    Choose appropriate sizes based on context. Use 'sm' for
                    compact spaces, 'lg' for important selections, and 'md'
                    (default) for most cases.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// Pro tip: Size variants for different contexts
// Compact forms or filters
<Select size="sm" options={filterOptions} />

// Main form fields
<Select size="md" options={mainOptions} />

// Important selections or mobile
<Select size="lg" options={importantOptions} />`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Combine with other form components
                  </span>
                  <p className="text-gray-300 mt-1">
                    Select works great with other Neuctra UI components. Use
                    consistent theming and spacing for cohesive form designs.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// Pro tip: Consistent form design
import { Select, Input, Button } from '@neuctra/ui';

<div className="space-y-4 max-w-md">
  <Input label="Name" placeholder="Enter your name" />
  <Select
    label="Category"
    options={categoryOptions}
  />
  <Button type="submit">Submit</Button>
</div>`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb
                  size={18}
                  className="text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-yellow-400">
                    Handle loading and disabled states
                  </span>
                  <p className="text-gray-300 mt-1">
                    Provide appropriate feedback during loading states and
                    disable selects when actions are unavailable. This improves
                    perceived performance and prevents user confusion.
                  </p>
                  <CodeBlock
                    language="tsx"
                    code={`// Pro tip: Loading and disabled states
const [loading, setLoading] = useState(true);
const [options, setOptions] = useState([]);

useEffect(() => {
  fetchOptions().then(setOptions).finally(() => setLoading(false));
}, []);

<Select
  options={options}
  disabled={loading}
  placeholder={loading ? "Loading options..." : "Select an option"}
  // Users understand the current state
/>`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default SelectDocs;
