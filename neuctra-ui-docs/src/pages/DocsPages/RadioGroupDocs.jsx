"use client";
import React, { useState } from "react";
import { RadioGroup } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const RadioGroupDocs = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedPlan, setSelectedPlan] = useState("basic");

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            RadioGroup Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">RadioGroup</span>{" "}
            component provides an accessible and customizable way to create
            single-selection radio lists. It’s perfect for choosing themes,
            options, or subscription tiers in your app.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>
          <p className="text-gray-300 mb-3">
            Use <code className="text-primary">RadioGroup</code> to allow users
            to select one option from a list.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<RadioGroup
  name="theme"
  options={[
    { label: "Light Mode", value: "light" },
    { label: "Dark Mode", value: "dark" },
    { label: "System", value: "system" },
  ]}
  selectedValue="light"
  onChange={(value) => console.log(value)}
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <RadioGroup
                  name="theme"
                  options={[
                    { label: "Light Mode", value: "light" },
                    { label: "Dark Mode", value: "dark" },
                    { label: "System", value: "system" },
                  ]}
                  selectedValue={selectedTheme}
                  onChange={setSelectedTheme}
                />
              </div>
            }
          />
        </section>

        {/* Disabled Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Disabled Options
          </h2>
          <p className="text-gray-300 mb-3">
            Add <code className="text-primary">disabled</code> to prevent
            interaction with the entire group.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<RadioGroup
  name="plan"
  options={[
    { label: "Basic", value: "basic" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise" },
  ]}
  selectedValue="basic"
  disabled
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <RadioGroup
                  name="plan"
                  options={[
                    { label: "Basic", value: "basic" },
                    { label: "Pro", value: "pro" },
                    { label: "Enterprise", value: "enterprise" },
                  ]}
                  selectedValue={selectedPlan}
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
            You can display validation feedback using the{" "}
            <code className="text-primary">error</code> prop.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<RadioGroup
  name="subscription"
  options={[
    { label: "Free", value: "free" },
    { label: "Premium", value: "premium" },
  ]}
  error="Please select a plan before continuing."
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <RadioGroup
                  name="subscription"
                  options={[
                    { label: "Free", value: "free" },
                    { label: "Premium", value: "premium" },
                  ]}
                  error="Please select a plan before continuing."
                />
              </div>
            }
          />
        </section>

        {/* Customization Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Styling & Customization
          </h2>
          <p className="text-gray-300 mb-3">
            Adjust size, colors, and layout using props such as{" "}
            <code className="text-primary">iconSize</code>,{" "}
            <code className="text-primary">iconCheckedBgColor</code>, and{" "}
            <code className="text-primary">textColor</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<RadioGroup
  name="accent"
  options={[
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Red", value: "red" },
  ]}
  selectedValue="green"
  iconSize={24}
  iconCheckedBgColor="#22c55e"
  textColor="#e2e8f0"
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <RadioGroup
                  name="accent"
                  options={[
                    { label: "Blue", value: "blue" },
                    { label: "Green", value: "green" },
                    { label: "Red", value: "red" },
                  ]}
                  selectedValue="green"
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

export default RadioGroupDocs;
