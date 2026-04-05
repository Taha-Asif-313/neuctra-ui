"use client";

import React, { useState } from "react";
import { SwitchGroup } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";

const SwitchGroupDocs = () => {
  const [enabledFeatures, setEnabledFeatures] = useState(["notifications"]);
  const [disabledSwitches] = useState(["dark-mode"]);

  return (
    <>
      <Metadata
        title="SwitchGroup Component — Neuctra UI"
        description="Learn how to use the SwitchGroup component in Neuctra UI — a flexible and accessible toggle group for managing feature settings, preferences, and on/off states in React applications."
        keywords="Neuctra UI SwitchGroup, React toggle group, switch component, feature toggles, UI switches, Neuctra UI components, form controls, Tailwind CSS UI, accessibility, React settings"
        image="https://ui.neuctra.com/og/switchgroup-docs-preview.png"
        ogTitle="SwitchGroup Component — Neuctra UI"
        ogDescription="Create customizable toggle switch groups for settings and preferences using Neuctra UI’s SwitchGroup component — elegant, responsive, and built for modern React apps."
        twitterTitle="SwitchGroup Component | Neuctra UI"
        twitterDescription="Discover how to implement beautiful and accessible toggle switch groups in React using Neuctra UI’s SwitchGroup component — perfect for settings, forms, and dashboards."
        canonical="https://ui.neuctra.com/docs/switch"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              SwitchGroup Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">SwitchGroup</span> component lets you render multiple toggle switches for features, settings, or preferences. Fully accessible, keyboard-friendly, and highly customizable.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">SwitchGroup</code> to create toggles that users can turn on or off independently.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<SwitchGroup
  name="features"
  options={[
    { label: "Email Notifications", value: "notifications" },
    { label: "Auto Updates", value: "auto-updates" },
    { label: "Dark Mode", value: "dark-mode" },
  ]}
  selectedValues={["notifications"]}
  onChange={(values) => console.log(values)}
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <SwitchGroup
                    name="features"
                    options={[
                      { label: "Email Notifications", value: "notifications" },
                      { label: "Auto Updates", value: "auto-updates" },
                      { label: "Dark Mode", value: "dark-mode" },
                    ]}
                    textColor="#fff"
                    selectedValues={enabledFeatures}
                    onChange={setEnabledFeatures}
                  />
                </div>
              }
            />
          </section>

          {/* Disabled Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Disabled State</h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">disabled</code> to make the group non-interactive.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<SwitchGroup
  name="preferences"
  options={[
    { label: "Dark Mode", value: "dark-mode" },
    { label: "Compact Layout", value: "compact" },
  ]}
  selectedValues={["dark-mode"]}
  disabled
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <SwitchGroup
                    name="preferences"
                    options={[
                      { label: "Dark Mode", value: "dark-mode" },
                      { label: "Compact Layout", value: "compact" },
                    ]}
                    selectedValues={disabledSwitches}
                    disabled
                  />
                </div>
              }
            />
          </section>

          {/* Error Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Validation & Error States</h2>
            <p className="text-gray-300 mb-3">
              Display validation messages using the <code className="text-primary">error</code> prop.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<SwitchGroup
  name="permissions"
  options={[
    { label: "Location Access", value: "location" },
    { label: "Camera Access", value: "camera" },
  ]}
  error="You must enable at least one permission."
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <SwitchGroup
                    name="permissions"
                    options={[
                      { label: "Location Access", value: "location" },
                      { label: "Camera Access", value: "camera" },
                    ]}
                    error="You must enable at least one permission."
                  />
                </div>
              }
            />
          </section>

          {/* Customization Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Styling & Customization</h2>
            <p className="text-gray-300 mb-3">
              Customize appearance with <code className="text-primary">iconSize</code>, <code className="text-primary">iconCheckedBgColor</code>, <code className="text-primary">switchBgColor</code>, and <code className="text-primary">textColor</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<SwitchGroup
  name="themes"
  options={[
    { label: "Ocean", value: "ocean" },
    { label: "Forest", value: "forest" },
    { label: "Desert", value: "desert" },
  ]}
  selectedValues={["forest"]}
  iconSize={24}
  iconCheckedBgColor="#10b981"
  switchBgColor="#4b5563"
  textColor="#e2e8f0"
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <SwitchGroup
                    name="themes"
                    options={[
                      { label: "Ocean", value: "ocean" },
                      { label: "Forest", value: "forest" },
                      { label: "Desert", value: "desert" },
                    ]}
                    selectedValues={["forest"]}
                    iconSize={24}
                    iconCheckedBgColor="#10b981"
                    switchBgColor="#4b5563"
                    textColor="#e2e8f0"
                  />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Props Table</h2>
            <p className="text-gray-400 mb-3">
              All available props for the SwitchGroup component.
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
                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Name attribute for the group.</td>
                  </tr>
                  <tr>
                    <td className="p-3">options</td>
                    <td className="p-3">Array&lt;{`{ label: string; value: string }`}&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Switch options with labels and values.</td>
                  </tr>
                  <tr>
                    <td className="p-3">selectedValues</td>
                    <td className="p-3">string[]</td>
                    <td className="p-3">[]</td>
                    <td className="p-3">Currently selected switches.</td>
                  </tr>
                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(values: string[]) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Callback fired on change.</td>
                  </tr>
                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disable all switches.</td>
                  </tr>
                  <tr>
                    <td className="p-3">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Make switches read-only.</td>
                  </tr>
                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Mark switches as required.</td>
                  </tr>
                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Validation or error message.</td>
                  </tr>
                  <tr>
                    <td className="p-3">iconSize</td>
                    <td className="p-3">number</td>
                    <td className="p-3">20</td>
                    <td className="p-3">Size of the switch toggle.</td>
                  </tr>
                  <tr>
                    <td className="p-3">iconCheckedBgColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#2563eb"</td>
                    <td className="p-3">Background color of the toggle when checked.</td>
                  </tr>
                  <tr>
                    <td className="p-3">switchBgColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#d1d5db"</td>
                    <td className="p-3">Background color of the switch when unchecked.</td>
                  </tr>
                  <tr>
                    <td className="p-3">textColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#374151"</td>
                    <td className="p-3">Color of the option label text.</td>
                  </tr>
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom CSS or Tailwind classes.</td>
                  </tr>
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline style overrides.</td>
                  </tr>
                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for each label.</td>
                  </tr>
                  <tr>
                    <td className="p-3">errorStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for error message.</td>
                  </tr>
                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Adjust switch styles for dark mode.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default SwitchGroupDocs;