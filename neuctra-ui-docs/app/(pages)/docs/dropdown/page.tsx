"use client";

import React, { useState } from "react";
import { Dropdown, Table } from "@neuctra/ui";
import { User, Mail, Settings, ChevronDown, Check, X } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const DropdownDocs: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [multiSelectedValues, setMultiSelectedValues] = useState<string[]>([]);

  const options = [
    { label: "Profile", value: "profile", icon: <User size={16} /> },
    { label: "Messages", value: "messages", icon: <Mail size={16} /> },
    { label: "Settings", value: "settings", icon: <Settings size={16} /> },
    { label: "Logout", value: "logout", disabled: true },
  ];

  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "options", type: "Option[]", default: "—", description: "Array of options to display in the dropdown" },
    { prop: "value", type: "string", default: "—", description: "Controlled selected value (single select)" },
    { prop: "defaultValue", type: "string", default: "—", description: "Initial selected value (single select)" },
    { prop: "onChange", type: "(value: string) => void", default: "—", description: "Callback when selection changes" },
    { prop: "placeholder", type: "string", default: `"Select an option"`, description: "Placeholder text when no option is selected" },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables the dropdown" },
    { prop: "searchable", type: "boolean", default: "false", description: "Enables search functionality" },
    { prop: "multiSelect", type: "boolean", default: "false", description: "Allows multiple selections" },
    { prop: "clearable", type: "boolean", default: "false", description: "Shows clear button when an option is selected" },
    { prop: "virtualized", type: "boolean", default: "false", description: "Enables virtualization for large option lists" },
    { prop: "optionHeight", type: "number", default: "36", description: "Height of each option in pixels (for virtualization)" },
    { prop: "visibleOptions", type: "number", default: "5", description: "Number of visible options (for virtualization)" },
    
    // Styling props
    { prop: "width", type: "string", default: `"100%"`, description: "Width of the dropdown control" },
    { prop: "height", type: "string", default: `"auto"`, description: "Height of the dropdown control" },
    { prop: "borderColor", type: "string", default: `"#d1d5db"`, description: "Border color of the control" },
    { prop: "focusBorderColor", type: "string", default: `"#2563eb"`, description: "Border color when focused" },
    { prop: "errorBorderColor", type: "string", default: `"#dc2626"`, description: "Border color in error state" },
    { prop: "backgroundColor", type: "string", default: `"#ffffff"`, description: "Background color of the control" },
    { prop: "textColor", type: "string", default: `"#111827"`, description: "Text color" },
    { prop: "placeholderColor", type: "string", default: `"#9ca3af"`, description: "Placeholder text color" },
    { prop: "hoverColor", type: "string", default: `"#f3f4f6"`, description: "Background color on hover" },
    { prop: "selectedColor", type: "string", default: `"#eff6ff"`, description: "Background color of selected option" },
    { prop: "disabledColor", type: "string", default: `"#f3f4f6"`, description: "Background color when disabled" },
    { prop: "padding", type: "string", default: `"0.5rem 0.75rem"`, description: "Padding of the control" },
    { prop: "margin", type: "string", default: `"0"`, description: "Margin around the control" },
    { prop: "borderRadius", type: "string", default: `"0.375rem"`, description: "Border radius" },
    { prop: "boxShadow", type: "string", default: `"0 1px 2px 0 rgba(0, 0, 0, 0.05)"`, description: "Box shadow" },
    { prop: "optionPadding", type: "string", default: `"0.5rem 0.75rem"`, description: "Padding of each option" },
    { prop: "optionGap", type: "string", default: `"0.5rem"`, description: "Gap between option elements" },
    { prop: "transitionDuration", type: "string", default: `"200ms"`, description: "Transition duration for animations" },
    { prop: "dropdownMaxHeight", type: "string", default: `"300px"`, description: "Maximum height of dropdown menu" },
    { prop: "dropdownMinWidth", type: "string", default: `"100%"`, description: "Minimum width of dropdown menu" },
    
    // Icons
    { prop: "iconPrefix", type: "React.ReactNode", default: "—", description: "Icon to display before the selected value" },
    { prop: "iconSuffix", type: "React.ReactNode", default: "—", description: "Icon to display after the selected value" },
    { prop: "clearIcon", type: "React.ReactNode", default: `"×"`, description: "Icon for the clear button" },
    { prop: "dropdownIcon", type: "React.ReactNode", default: `"▼"`, description: "Icon for the dropdown toggle" },
    { prop: "checkIcon", type: "React.ReactNode", default: `"✓"`, description: "Icon for selected options in multi-select" },
    
    // Accessibility
    { prop: "ariaLabel", type: "string", default: "—", description: "ARIA label for accessibility" },
    { prop: "ariaLabelledby", type: "string", default: "—", description: "ARIA labelledby for accessibility" },
    { prop: "ariaDescribedby", type: "string", default: "—", description: "ARIA describedby for accessibility" },
    
    // Callbacks
    { prop: "onFocus", type: "() => void", default: "—", description: "Callback when dropdown receives focus" },
    { prop: "onBlur", type: "() => void", default: "—", description: "Callback when dropdown loses focus" },
    { prop: "onOpen", type: "() => void", default: "—", description: "Callback when dropdown opens" },
    { prop: "onClose", type: "() => void", default: "—", description: "Callback when dropdown closes" },
  ];

  const optionColumns = [
    { key: "property", label: "Property", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "required", label: "Required", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const optionData = [
    { property: "label", type: "string", required: "Yes", description: "Display text for the option" },
    { property: "value", type: "string", required: "Yes", description: "Unique value for the option" },
    { property: "icon", type: "React.ReactNode", required: "No", description: "Icon to display with the option" },
    { property: "disabled", type: "boolean", required: "No", description: "Whether the option is disabled" },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Dropdown</span> Component Documentation
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Dropdown } from "@neuctra/ui";`}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Examples</h2>
        
        <h3 className="text-xl font-semibold mb-3">Simple Dropdown</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={[
    { label: "Profile", value: "profile" },
    { label: "Messages", value: "messages" },
    { label: "Settings", value: "settings" }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>`}
          previewContent={
            <Dropdown
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select an option"
              textColor="black"
              selectedColor="#000"
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">With Icons</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
  iconPrefix={<User size={16} />}
  clearIcon={<X size={16} />}
  dropdownIcon={<ChevronDown size={16} />}
  checkIcon={<Check size={16} />}
/>`}
          previewContent={
            <Dropdown
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select an option"
              iconPrefix={<User size={16} />}
              clearIcon={<X size={16} />}
              dropdownIcon={<ChevronDown size={16} />}
              checkIcon={<Check size={16} />}
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Multi-Select</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={options}
  value={multiSelectedValues.join(",")}
  onChange={(value) => setMultiSelectedValues(value ? value.split(",") : [])}
  placeholder="Select options"
  multiSelect
  clearable
/>`}
          previewContent={
            <Dropdown
              options={options}
              value={multiSelectedValues.join(",")}
              onChange={(value) => setMultiSelectedValues(value ? value.split(",") : [])}
              placeholder="Select options"
              multiSelect
              clearable
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Searchable</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Search fruits..."
  searchable
/>`}
          previewContent={
            <Dropdown
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Cherry", value: "cherry" },
                { label: "Date", value: "date" },
                { label: "Elderberry", value: "elderberry" },
              ]}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Search fruits..."
              searchable
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Virtualized (for large lists)</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={Array.from({ length: 1000 }, (_, i) => ({
    label: \`Option \${i + 1}\`,
    value: \`option-\${i + 1}\`
  }))}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select from 1000 options..."
  virtualized
  optionHeight={40}
  visibleOptions={8}
/>`}
          previewContent={
            <Dropdown
              options={Array.from({ length: 1000 }, (_, i) => ({
                label: `Option ${i + 1}`,
                value: `option-${i + 1}`
              }))}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select from 1000 options..."
              virtualized
              optionHeight={40}
              visibleOptions={8}
            />
          }
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse mb-8">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">{prop}</td>
                <td className="border border-primary px-3 py-2 font-mono">{type}</td>
                <td className="border border-primary px-3 py-2 font-mono">{def}</td>
                <td className="border border-primary px-3 py-2">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-3">Option Interface</h3>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {optionColumns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {optionData.map(({ property, type, required, description }) => (
              <tr key={property} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">{property}</td>
                <td className="border border-primary px-3 py-2 font-mono">{type}</td>
                <td className="border border-primary px-3 py-2">{required}</td>
                <td className="border border-primary px-3 py-2">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Advanced Customization</h2>
        
        <h3 className="text-xl font-semibold mb-3">Custom Styling</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Custom styled dropdown"
  width="300px"
  borderColor="#9ca3af"
  focusBorderColor="#7c3aed"
  backgroundColor="#f9fafb"
  textColor="#1f2937"
  hoverColor="#e9d5ff"
  selectedColor="#ddd6fe"
  borderRadius="12px"
  boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  optionPadding="12px 16px"
  transitionDuration="300ms"
/>`}
          previewContent={
            <Dropdown
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Custom styled dropdown"
              width="300px"
              borderColor="#9ca3af"
              focusBorderColor="#7c3aed"
              backgroundColor="#f9fafb"
              textColor="#1f2937"
              hoverColor="#e9d5ff"
              selectedColor="#ddd6fe"
              borderRadius="12px"
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              optionPadding="12px 16px"
              transitionDuration="300ms"
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">With Custom Classes</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="With custom classes"
  className="custom-dropdown"
  dropdownClassName="custom-dropdown-menu"
  optionClassName="custom-dropdown-option"
  inputClassName="custom-dropdown-input"
/>`}
          previewContent={
            <Dropdown
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="With custom classes"
              className="custom-dropdown"
              dropdownClassName="custom-dropdown-menu"
              optionClassName="custom-dropdown-option"
              inputClassName="custom-dropdown-input"
              
            />
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Proper ARIA attributes (role, aria-haspopup, aria-expanded, etc.)</li>
          <li>Keyboard navigation (Arrow keys, Enter, Escape, Tab)</li>
          <li>Focus management</li>
          <li>Screen reader support</li>
          <li>Customizable ARIA labels</li>
          <li>Disabled state handling</li>
          <li>Proper contrast ratios for text and background colors</li>
        </ul>
      </section>
    </div>
  );
};

export default DropdownDocs;