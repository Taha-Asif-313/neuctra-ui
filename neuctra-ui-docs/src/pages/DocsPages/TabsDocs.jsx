"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Tabs } from "@neuctra/ui";
import { LayoutPanelTop, Star, Settings, Info } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const TabsDocs = () => {
  const sampleTabs = [
    {
      label: (
        <>
          <LayoutPanelTop size={16} /> Overview
        </>
      ),
      content: <p className="p-10">This is the overview tab content.</p>,
    },
    {
      label: (
        <>
          <Settings size={16} /> Settings
        </>
      ),
      content: <p className="p-10">Here you can manage your settings.</p>,
    },
    {
      label: (
        <>
          <Star size={16} /> Favorites
        </>
      ),
      content: <p className="p-10">Your starred items will appear here.</p>,
    },
    {
      label: (
        <>
          <Info size={16} /> About
        </>
      ),
      content: <p className="p-10">Learn more about this component.</p>,
      disabled: true,
    },
  ];

  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Tabs Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Tabs</span>{" "}
            component offers a modern, accessible, and fully customizable tab
            interface. It supports multiple variants, responsive drawers, and
            smooth transitions — perfect for dashboards, admin panels, and
            modular UIs.
          </p>
        </header>

        {/* Example Preview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>

          <CodePreviewBlock
            filename="Tabs.tsx"
            language="jsx"
            code={`<Tabs
  tabs={[
    { label: "Overview", content: <p>This is the overview tab.</p> },
    { label: "Settings", content: <p>Manage your preferences here.</p> },
    { label: "Favorites", content: <p>Starred items appear here.</p> },
  ]}
/>`}
            previewContent={
              <Tabs
                textColor="#fff"
                primaryColor="var(--primary)"
                hoverColor="var(--primary)"
                tabs={sampleTabs}
              />
            }
          />
        </section>

        {/* Variants & Position */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Variants & Position
          </h2>
          <p className="text-gray-300 mb-3">
            Switch between <code className="text-primary">solid</code>,{" "}
            <code className="text-primary">outline</code>, and{" "}
            <code className="text-primary">underline</code> variants. You can
            also change the tab alignment using the{" "}
            <code className="text-primary">position</code> prop.
          </p>

          <CodePreviewBlock
            filename="TabsVariants.tsx"
            language="jsx"
            code={`<Tabs
  tabs={[
    { label: "Left", content: <p>Tabs on the left side.</p> },
    { label: "Right", content: <p>Tabs on the right side.</p> },
  ]}
  variant="underline"
  position="left"
/>`}
            previewContent={
              <Tabs
                tabs={[
                  {
                    label: "Left",
                    content: <p className="p-10">Tabs on the left side.</p>,
                  },
                  {
                    label: "Right",
                    content: <p className="p-10">Tabs on the right side.</p>,
                  },
                ]}
                position="left"
                variant="underline"
                textColor="#fff"
                primaryColor="var(--primary)"
                hoverColor="var(--primary)"
              />
            }
          />
        </section>

        {/* Custom Theming */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Theming
          </h2>
          <p className="text-gray-300 mb-3">
            The <span className="text-primary font-semibold">Tabs</span>{" "}
            component can be themed to match your brand colors using props like{" "}
            <code className="text-primary">primaryColor</code>,{" "}
            <code className="text-primary">backgroundColor</code>, and{" "}
            <code className="text-primary">hoverColor</code>.
          </p>

          <CodePreviewBlock
            filename="TabsTheme.tsx"
            language="jsx"
            code={`<Tabs
  tabs={[
    { label: "Design", content: <p>UI customization tools</p> },
    { label: "Code", content: <p>Developer utilities</p> },
  ]}
  variant="outline"
  primaryColor="#00c214"
  backgroundColor="#0a0a0a"
  textColor="#fff"
  hoverColor="#00e05c"
  bordered
/>`}
            previewContent={
              <Tabs
                tabs={[
                  { label: "Design", content: <p>UI customization tools</p> },
                  { label: "Code", content: <p>Developer utilities</p> },
                ]}
                variant="outline"
                primaryColor="#00c214"
                backgroundColor="#0a0a0a"
                textColor="#fff"
                hoverColor="#00e05c"
                bordered
              />
            }
          />
        </section>

       <DocsFooter/>
      </div>
    </div>
  );
};

export default TabsDocs;
