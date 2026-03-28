"use client";

import React, { useState } from "react";
import { CheckboxGroup } from "@neuctra/ui"; // adjust path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const CheckboxGroupDocs = () => {
  const [selectedHobbies, setSelectedHobbies] = useState(["reading"]);
  const [selectedTools, setSelectedTools] = useState(["vscode"]);

  return (
    <>
      <Metadata
        title="Checkbox Component — Neuctra UI"
        description="Learn how to use the CheckboxGroup component in Neuctra UI. A customizable, accessible, and theme-aware multiple selection component for modern React apps."
        keywords="Neuctra UI CheckboxGroup, React CheckboxGroup, Checkbox group component, multiple selection, custom checkbox, Tailwind checkbox, form UI, accessible checkbox, Neuctra components"
        image="https://ui.neuctra.com/og/checkboxgroup-docs-preview.png"
        ogTitle="Checkbox Component — Neuctra UI"
        ogDescription="Easily create multiple selection groups in your React projects using the CheckboxGroup component from Neuctra UI. Fully customizable and accessible."
        twitterTitle="Checkbox Component | Neuctra UI"
        twitterDescription="Build elegant, customizable checkbox groups with Neuctra UI. Explore examples, states, and styling for modern React applications."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              CheckboxGroup Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">CheckboxGroup</span>{" "}
              component allows users to select multiple options from a list. Perfect for preferences, filters, skills, and more. Fully accessible, keyboard-friendly, and customizable.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              Select multiple values easily with <code className="text-primary">CheckboxGroup</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<CheckboxGroup
  name="hobbies"
  options={[
    { label: "Reading", value: "reading" },
    { label: "Traveling", value: "traveling" },
    { label: "Gaming", value: "gaming" },
  ]}
  selectedValues={["reading"]}
  onChange={(values) => console.log(values)}
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <CheckboxGroup
                    name="hobbies"
                    options={[
                      { label: "Reading", value: "reading" },
                      { label: "Traveling", value: "traveling" },
                      { label: "Gaming", value: "gaming" },
                    ]}
                    textColor="#e2e8f0"
                    selectedValues={selectedHobbies}
                    onChange={setSelectedHobbies}
                  />
                </div>
              }
            />
          </section>

          {/* Disabled Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Disabled State
            </h2>
            <p className="text-gray-300 mb-3">
              Disable interaction using the <code className="text-primary">disabled</code> prop.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<CheckboxGroup
  name="tools"
  options={[
    { label: "VS Code", value: "vscode" },
    { label: "Figma", value: "figma" },
    { label: "Notion", value: "notion" },
  ]}
  selectedValues={["vscode"]}
  disabled
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <CheckboxGroup
                    name="tools"
                    options={[
                      { label: "VS Code", value: "vscode" },
                      { label: "Figma", value: "figma" },
                      { label: "Notion", value: "notion" },
                    ]}
                    textColor="#e2e8f0"
                    selectedValues={selectedTools}
                    disabled
                  />
                </div>
              }
            />
          </section>

          {/* Error Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Validation & Error States
            </h2>
            <p className="text-gray-300 mb-3">
              Show error messages using the <code className="text-primary">error</code> prop.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<CheckboxGroup
  name="skills"
  options={[
    { label: "React", value: "react" },
    { label: "Next.js", value: "next" },
    { label: "Tailwind", value: "tailwind" },
  ]}
  error="Please select at least one skill."
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <CheckboxGroup
                    name="skills"
                    options={[
                      { label: "React", value: "react" },
                      { label: "Next.js", value: "next" },
                      { label: "Tailwind", value: "tailwind" },
                    ]}
                    textColor="#e2e8f0"
                    error="Please select at least one skill."
                  />
                </div>
              }
            />
          </section>

          {/* Customization Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Customization
            </h2>
            <p className="text-gray-300 mb-3">
              Customize size, colors, and even the icon with <code className="text-primary">iconSize</code>, <code className="text-primary">iconCheckedBgColor</code>, <code className="text-primary">textColor</code>, or <code className="text-primary">customIcon</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<CheckboxGroup
  name="themes"
  options={[
    { label: "Ocean", value: "ocean" },
    { label: "Forest", value: "forest" },
    { label: "Desert", value: "desert" },
  ]}
  selectedValues={["forest"]}
  iconSize={24}
  iconCheckedBgColor="#22c55e"
  textColor="#e2e8f0"
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <CheckboxGroup
                    name="themes"
                    options={[
                      { label: "Ocean", value: "ocean" },
                      { label: "Forest", value: "forest" },
                      { label: "Desert", value: "desert" },
                    ]}
                    selectedValues={["forest"]}
                    iconSize={24}
                    iconCheckedBgColor="#22c55e"
                    textColor="#e2e8f0"
                  />
                </div>
              }
            />
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default CheckboxGroupDocs;