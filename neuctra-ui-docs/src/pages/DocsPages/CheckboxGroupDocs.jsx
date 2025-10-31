"use client";
import React, { useState } from "react";
import { CheckboxGroup } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const CheckboxGroupDocs = () => {
  const [selectedHobbies, setSelectedHobbies] = useState(["reading"]);
  const [selectedTools, setSelectedTools] = useState(["vscode"]);

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            CheckboxGroup Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">CheckboxGroup</span>{" "}
            component allows users to select multiple options from a list.
            It’s ideal for use cases like choosing preferences, skills, or
            filters in forms. Fully customizable and accessible.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
          <p className="text-gray-300 mb-3">
            Use <code className="text-primary">CheckboxGroup</code> to let users
            select multiple values.
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
            Add <code className="text-primary">disabled</code> to prevent user
            interaction with the entire group.
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
            Display feedback by passing an <code className="text-primary">error</code> message when
            the user misses a required selection.
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
            You can customize the appearance with props such as{" "}
            <code className="text-primary">iconSize</code>,{" "}
            <code className="text-primary">iconCheckedBgColor</code>, and{" "}
            <code className="text-primary">textColor</code>. You can also pass
            a custom icon component using{" "}
            <code className="text-primary">customIcon</code>.
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
  );
};

export default CheckboxGroupDocs;
