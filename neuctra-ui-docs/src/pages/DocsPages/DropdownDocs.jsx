"use client";

import React, { useState } from "react";
import { Dropdown } from "@neuctra/ui"; // adjust path if needed
import { User, Mail, Globe, Shield, Briefcase, GraduationCap } from "lucide-react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const DropdownDocs = () => {
  const [selectedBasic, setSelectedBasic] = useState("frontend");
  const [selectedControlled, setSelectedControlled] = useState("active");
  const [selectedLabelIcon, setSelectedLabelIcon] = useState("");
  const [selectedPrefixIcon, setSelectedPrefixIcon] = useState("");
  const [selectedOptionsIcon, setSelectedOptionsIcon] = useState("work");
  const [selectedRequired, setSelectedRequired] = useState("");
  const [selectedError, setSelectedError] = useState("");
  const [selectedSuccess, setSelectedSuccess] = useState("approved");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("light-1");

  return (
    <>
      <Metadata
        title="Dropdown Component — Neuctra UI"
        description="Learn how to use Neuctra UI Dropdown with controlled and uncontrolled patterns, validation states, variants, icons, and class overrides."
        keywords="Neuctra UI Dropdown tutorial, React dropdown docs, controlled dropdown, uncontrolled dropdown, Tailwind dropdown component, React select UI"
        image="https://ui.neuctra.com/og/dropdown-docs-preview.png"
        ogTitle="Dropdown Component — Neuctra UI"
        ogDescription="Step-by-step Dropdown docs for Neuctra UI: props, examples, validation, themes, and customization."
        twitterTitle="Dropdown Component | Neuctra UI"
        twitterDescription="Use Dropdown in React with Neuctra UI: API guide, examples, and customization patterns."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10 relative z-0">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Dropdown Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Dropdown</span>{" "}
              component is a fully customizable single-select input for React
              apps. It supports controlled and uncontrolled patterns, helper and
              validation states, icon slots, theme variants, and class-level
              style overrides.
            </p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Quick Start
            </h2>
            <p className="text-gray-300 mb-3">
              Start with label, options, selected value, and an{" "}
              <code className="text-primary">onChange</code> handler.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Select Role"
  name="role"
  options={[
    { label: "Frontend Engineer", value: "frontend" },
    { label: "Backend Engineer", value: "backend" },
    { label: "Designer", value: "design" },
  ]}
  value={selectedBasic}
  onChange={(name, value) => {
    console.log(name, value); // role, frontend/backend/design
    setSelectedBasic(value);
  }}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Select Role"
                    name="role"
                    options={[
                      { label: "Frontend Engineer", value: "frontend" },
                      { label: "Backend Engineer", value: "backend" },
                      { label: "Designer", value: "design" },
                    ]}
                    value={selectedBasic}
                    onChange={(name, value) => {
                      console.log(name, value);
                      setSelectedBasic(value);
                    }}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Controlled vs Uncontrolled
            </h2>

            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">value</code> for controlled
              mode, or <code className="text-primary">defaultValue</code> to
              initialize uncontrolled mode.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`// Controlled
<Dropdown
  label="Account Status"
  value={selectedControlled}
  onChange={(name, val) => setSelectedControlled(val)}
  options={[
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
  ]}
/>

// Uncontrolled
<Dropdown
  label="Plan"
  defaultValue="pro"
  options={[
    { label: "Starter", value: "starter" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise" },
  ]}
/>`}
              previewContent={
                <div className="space-y-4">
                  <Dropdown
                    label="Account Status"
                    value={selectedControlled}
                    onChange={(name, val) => setSelectedControlled(val)}
                    options={[
                      { label: "Active", value: "active" },
                      { label: "Suspended", value: "suspended" },
                    ]}
                  />
                  <Dropdown
                    label="Plan"
                    defaultValue="pro"
                    options={[
                      { label: "Starter", value: "starter" },
                      { label: "Pro", value: "pro" },
                      { label: "Enterprise", value: "enterprise" },
                    ]}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              With Label Icon
            </h2>
            <p className="text-gray-300 mb-3">
              Add an icon to the label using the{" "}
              <code className="text-primary">labelIcon</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Select User"
  labelIcon={User}
  placeholder="Choose a user"
  options={[
    { label: "John Doe", value: "john" },
    { label: "Jane Smith", value: "jane" },
  ]}
  value={selectedLabelIcon}
  onChange={(name, value) => setSelectedLabelIcon(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Select User"
                    labelIcon={User}
                    placeholder="Choose a user"
                    options={[
                      { label: "John Doe", value: "john" },
                      { label: "Jane Smith", value: "jane" },
                    ]}
                    value={selectedLabelIcon}
                    onChange={(name, value) => setSelectedLabelIcon(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              With Prefix Icon
            </h2>
            <p className="text-gray-300 mb-3">
              Add an icon inside the dropdown trigger using the{" "}
              <code className="text-primary">prefixIcon</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Select User"
  prefixIcon={User}
  placeholder="Choose a user"
  options={[
    { label: "John Doe", value: "john" },
    { label: "Jane Smith", value: "jane" },
  ]}
  value={selectedPrefixIcon}
  onChange={(name, value) => setSelectedPrefixIcon(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Select User"
                    prefixIcon={User}
                    placeholder="Choose a user"
                    options={[
                      { label: "John Doe", value: "john" },
                      { label: "Jane Smith", value: "jane" },
                    ]}
                    value={selectedPrefixIcon}
                    onChange={(name, value) => setSelectedPrefixIcon(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Required</h2>
            <p className="text-gray-300 mb-3">
              Mark the dropdown as required with the{" "}
              <code className="text-primary">required</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Required Field"
  required
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ]}
  value={selectedRequired}
  onChange={(name, value) => setSelectedRequired(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Required Field"
                    required
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                    ]}
                    value={selectedRequired}
                    onChange={(name, value) => setSelectedRequired(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Error and Success States
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">error</code> or{" "}
              <code className="text-primary">success</code> props to indicate
              validation states.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="With Error"
  error="This field is required"
  options={[
    { label: "Valid", value: "valid" },
    { label: "Invalid", value: "invalid" },
  ]}
  value={selectedError}
  onChange={(name, value) => setSelectedError(value)}
/>

<Dropdown
  label="With Success"
  success
  helperText="Looks good!"
  options={[
    { label: "Approved", value: "approved" },
    { label: "Verified", value: "verified" },
  ]}
  value={selectedSuccess}
  onChange={(name, value) => setSelectedSuccess(value)}
/>`}
              previewContent={
                <div className="relative z-10 space-y-4">
                  <Dropdown
                    label="With Error"
                    error="This field is required"
                    options={[
                      { label: "Valid", value: "valid" },
                      { label: "Invalid", value: "invalid" },
                    ]}
                    value={selectedError}
                    onChange={(name, value) => setSelectedError(value)}
                  />
                  <Dropdown
                    label="With Success"
                    success
                    helperText="Looks good!"
                    options={[
                      { label: "Approved", value: "approved" },
                      { label: "Verified", value: "verified" },
                    ]}
                    value={selectedSuccess}
                    onChange={(name, value) => setSelectedSuccess(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Helper Text
            </h2>
            <p className="text-gray-300 mb-3">
              Provide additional information with{" "}
              <code className="text-primary">helperText</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Select Option"
  helperText="Choose the best option for you"
  options={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ]}
  value={selectedHelper}
  onChange={(name, value) => setSelectedHelper(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Select Option"
                    helperText="Choose the best option for you"
                    options={[
                      { label: "Option A", value: "a" },
                      { label: "Option B", value: "b" },
                    ]}
                    value={selectedHelper}
                    onChange={(name, value) => setSelectedHelper(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Options with Icons
            </h2>
            <p className="text-gray-300 mb-3">
              Each option can have its own icon using the{" "}
              <code className="text-primary">icon</code> property in options.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Select Category"
  options={[
    { label: "Work", value: "work", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Study", value: "study", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Security", value: "security", icon: <Shield className="w-4 h-4" /> },
  ]}
  value={selectedOptionsIcon}
  onChange={(name, value) => setSelectedOptionsIcon(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Select Category"
                    options={[
                      {
                        label: "Work",
                        value: "work",
                        icon: <Briefcase className="w-4 h-4" />,
                      },
                      {
                        label: "Study",
                        value: "study",
                        icon: <GraduationCap className="w-4 h-4" />,
                      },
                      {
                        label: "Security",
                        value: "security",
                        icon: <Shield className="w-4 h-4" />,
                      },
                    ]}
                    value={selectedOptionsIcon}
                    onChange={(name, value) => setSelectedOptionsIcon(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Disabled</h2>
            <p className="text-gray-300 mb-3">
              Disable the dropdown with the{" "}
              <code className="text-primary">disabled</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Disabled Dropdown"
  disabled
  options={[
    { label: "Can't select", value: "nope" },
  ]}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Disabled Dropdown"
                    disabled
                    options={[
                      { label: "Can't select", value: "nope" },
                    ]}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Class Names
            </h2>
            <p className="text-gray-300 mb-3">
              Override default styles with custom class names like{" "}
              <code className="text-primary">containerClassName</code>,{" "}
              <code className="text-primary">triggerClassName</code>, etc.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Custom Styled"
  containerClassName="max-w-sm"
  triggerClassName="border-2 border-blue-500"
  dropdownClassName="border-blue-500"
  options={[
    { label: "Custom", value: "custom" },
    { label: "Style", value: "style" },
  ]}
  value="custom"
  onChange={(name, value) => console.log(value)}
/>`}
              previewContent={
                <div className="relative z-10">
                  <Dropdown
                    label="Custom Styled"
                    containerClassName="max-w-sm"
                    triggerClassName="border-2 border-blue-500"
                    dropdownClassName="border-blue-500 text-black"
                   primaryColor="255 0 0"
                    options={[
                      { label: "Custom", value: "custom" },
                      { label: "Style", value: "style" },
                    ]}
                   
                    value="custom"
                    onChange={(name, value) => console.log(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Variant
            </h2>
            <p className="text-gray-300 mb-3">
              Choose between <code className="text-primary">dark</code> and{" "}
              <code className="text-primary">light</code> themes using the{" "}
              <code className="text-primary">variant</code> prop.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  label="Light Theme"
  variant="light"
  options={[
    { label: "Option 1", value: "light-1" },
    { label: "Option 2", value: "light-2" },
  ]}
  value={selectedVariant}
  onChange={(name, value) => setSelectedVariant(value)}
/>`}
              previewContent={
                <div className="relative z-10 p-4 bg-white rounded-lg">
                  <Dropdown
                    label="Light Theme"
                    variant="light"
                    options={[
                      { label: "Option 1", value: "light-1" },
                      { label: "Option 2", value: "light-2" },
                    ]}
                    value={selectedVariant}
                    onChange={(name, value) => setSelectedVariant(value)}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Full API Reference
            </h2>
            <p className="text-gray-300 mb-4">
              These are the public props currently supported by{" "}
              <code className="text-primary">Dropdown</code>.
            </p>
            <CodePreviewBlock
              language="tsx"
              code={`type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type DropdownProps = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (name: string, value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  success?: boolean;
  helperText?: string;
  labelIcon?: React.ElementType;
  prefixIcon?: React.ElementType;
  variant?: "dark" | "light";
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  className?: string;
};`}
              previewContent={
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-300 space-y-2">
                  <p>
                    <span className="text-white font-medium">onChange:</span>{" "}
                    receives both <code className="text-primary">name</code>{" "}
                    and selected <code className="text-primary">value</code>.
                  </p>
                  <p>
                    <span className="text-white font-medium">value:</span>{" "}
                    controlled mode (managed by parent state).
                  </p>
                  <p>
                    <span className="text-white font-medium">
                      defaultValue:
                    </span>{" "}
                    uncontrolled initial selection.
                  </p>
                  <p>
                    <span className="text-white font-medium">variant:</span>{" "}
                    supports <code className="text-primary">dark</code> and{" "}
                    <code className="text-primary">light</code>.
                  </p>
                </div>
              }
            />
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default DropdownDocs;
