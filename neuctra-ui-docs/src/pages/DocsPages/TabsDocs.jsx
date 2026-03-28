"use client";
import React from "react";
import { Tabs } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import { LayoutPanelTop, Settings, Star } from "lucide-react";

const TabsDocs = () => {
  const tabs = [
    {
      label: "Overview",
      icon: <LayoutPanelTop size={16} />,
      content: <div className="p-6">Overview content</div>,
    },
    {
      label: "Settings",
      icon: <Settings size={16} />,
      content: <div className="p-6">Settings content</div>,
    },
    {
      label: "Favorites",
      icon: <Star size={16} />,
      content: <div className="p-6">Favorites content</div>,
    },
  ];

  return (
    <>
      <Metadata title="Tabs — Neuctra UI" />

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-12">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-white mb-3">
              Tabs Component
            </h1>
            <p className="text-gray-400 max-w-3xl">
              A fully customizable tab system with support for variants,
              vertical layouts, theming, keyboard navigation, and a built-in
              mobile drawer mode.
            </p>
          </header>

          {/* Basic */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={[
    { label: "Overview", content: <div>Overview</div> },
    { label: "Settings", content: <div>Settings</div> },
  ]}
/>`}
              previewContent={<Tabs tabs={tabs} />}
            />
          </section>

          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Variants
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={tabs}
  variant="underline"
/>`}
              previewContent={<Tabs tabs={tabs} variant="underline" />}
            />
          </section>

          {/* Position */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Position (Vertical Tabs)
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={tabs}
  position="left"
/>`}
              previewContent={
                <div className="h-[250px]">
                  <Tabs tabs={tabs} position="left" />
                </div>
              }
            />
          </section>

          {/* Theming */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Theming
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={tabs}
  primaryColor="#22c55e"
  hoverColor="#16a34a"
  activeColor="#fff"
  bordered
/>`}
              previewContent={
                <Tabs
                  tabs={tabs}
                  primaryColor="#22c55e"
                  hoverColor="#16a34a"
                  activeColor="#fff"
                  bordered
                />
              }
            />
          </section>

          {/* Controlled Behavior */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Default Active & Callback
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={tabs}
  defaultActive={1}
  onTabChange={(i) => console.log(i)}
/>`}
              previewContent={
                <Tabs
                  tabs={tabs}
                  defaultActive={1}
                  onTabChange={(i) => console.log(i)}
                />
              }
            />
          </section>

          {/* Responsive */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Mobile Drawer Mode
            </h2>
            <p className="text-gray-400 mb-4">
              On small screens, Tabs automatically convert into a dropdown
              drawer for better usability.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  tabs={tabs}
  responsiveBreakpoint={768}
  showDrawerLabel="Select Tab"
/>`}
              previewContent={<Tabs tabs={tabs} />}
            />
          </section>

          {/* Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">

                  <tr>
                    <td className="px-4 py-2 text-primary">tabs</td>
                    <td className="px-4 py-2">TabItem[]</td>
                    <td className="px-4 py-2">List of tab objects</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">defaultActive</td>
                    <td className="px-4 py-2">number</td>
                    <td className="px-4 py-2">Initial active tab index</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">variant</td>
                    <td className="px-4 py-2">
                      solid | outline | underline
                    </td>
                    <td className="px-4 py-2">Visual style</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">position</td>
                    <td className="px-4 py-2">
                      top | left | right
                    </td>
                    <td className="px-4 py-2">Tab placement</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">primaryColor</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Active tab color</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">hoverColor</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Hover color</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">gap</td>
                    <td className="px-4 py-2">number</td>
                    <td className="px-4 py-2">Spacing between tabs</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">radius</td>
                    <td className="px-4 py-2">number</td>
                    <td className="px-4 py-2">Border radius</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">responsiveBreakpoint</td>
                    <td className="px-4 py-2">number</td>
                    <td className="px-4 py-2">Switch to drawer mode</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 text-primary">onTabChange</td>
                    <td className="px-4 py-2">(index) ={'>'} void</td>
                    <td className="px-4 py-2">Tab change callback</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default TabsDocs;