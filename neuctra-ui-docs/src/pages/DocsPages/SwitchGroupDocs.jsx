"use client";
import React, { useState } from "react";
import { SwitchGroup } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const SwitchGroupDocs = () => {
  const [enabledFeatures, setEnabledFeatures] = useState(["notifications"]);
  const [disabledSwitches] = useState(["dark-mode"]);

  return (
    <>
      <Metadata
        title="Switch Component — Neuctra UI"
        description="Learn how to use the SwitchGroup component in Neuctra UI — a flexible and accessible toggle group for managing feature settings, preferences, and on/off states in React applications."
        keywords="Neuctra UI SwitchGroup, React toggle group, switch component, feature toggles, UI switches, Neuctra UI components, form controls, Tailwind CSS UI, accessibility, React settings"
        image="https://ui.neuctra.com/og/switchgroup-docs-preview.png"
        ogTitle="Switch Component — Neuctra UI"
        ogDescription="Create customizable toggle switch groups for settings and preferences using Neuctra UI’s SwitchGroup component — elegant, responsive, and built for modern React apps."
        twitterTitle="Switch Component | Neuctra UI"
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
              The{" "}
              <span className="text-primary font-semibold">SwitchGroup</span>{" "}
              component provides a simple and customizable way to render
              multiple toggle switches. Ideal for feature controls, preferences,
              and on/off states in forms or dashboards.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">SwitchGroup</code> to create a
              list of toggles that can be independently turned on or off.
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
                    selectedValues={enabledFeatures}
                    onChange={setEnabledFeatures}
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
              Add <code className="text-primary">disabled</code> to make the
              entire group non-interactive.
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Validation & Error States
            </h2>
            <p className="text-gray-300 mb-3">
              Use the <code className="text-primary">error</code> prop to
              display form validation messages.
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
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Styling & Customization
            </h2>
            <p className="text-gray-300 mb-3">
              Modify switch appearance using{" "}
              <code className="text-primary">iconSize</code>,{" "}
              <code className="text-primary">iconCheckedBgColor</code>,{" "}
              <code className="text-primary">switchBgColor</code>, and{" "}
              <code className="text-primary">textColor</code>.
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

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default SwitchGroupDocs;
