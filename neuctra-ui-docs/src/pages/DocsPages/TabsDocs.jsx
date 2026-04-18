"use client";
import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import { LayoutPanelTop, Settings, Star, Lock } from "lucide-react";
import CodeBlock from "../../components/Docs/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Shared demo tabs (used across previews)                            */
/* ------------------------------------------------------------------ */

const DemoTabs = ({
  variant,
  position,
  primaryColor,
  hoverColor,
  activeColor,
  bordered,
  defaultActive,
  mobileVariant,
  fullWidth,
}) => (
  <Tabs
    variant={variant}
    position={position}
    textColor="#fff"
    primaryColor={primaryColor}
    hoverColor={hoverColor}
    activeColor={activeColor}
    bordered={bordered}
    defaultActive={defaultActive}
    mobileVariant={mobileVariant}
    fullWidth={fullWidth}
  >
    <TabList>
      <Tab index={0} icon={<LayoutPanelTop size={16} />}>
        Overview
      </Tab>
      <Tab index={1} icon={<Settings size={16} />}>
        Settings
      </Tab>
      <Tab index={2} icon={<Star size={16} />}>
        Favorites
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel index={0}>
        <div className="p-6">Overview content</div>
      </TabPanel>
      <TabPanel index={1}>
        <div className="p-6">Settings content</div>
      </TabPanel>
      <TabPanel index={2}>
        <div className="p-6">Favorites content</div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const TabsDocs = () => {
  return (
    <>
      <Metadata title="Tabs — Neuctra UI" />

      <div className="min-h-screen">
        <div className="space-y-12">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-white mb-3">
              Tabs Component
            </h1>
            <p className="text-gray-400 max-w-3xl">
              A composable, fully customizable tab system built from individual
              sub-components — <code className="text-primary">Tabs</code>,{" "}
              <code className="text-primary">TabList</code>,{" "}
              <code className="text-primary">Tab</code>,{" "}
              <code className="text-primary">TabPanels</code>, and{" "}
              <code className="text-primary">TabPanel</code>. Supports variants,
              vertical layouts, theming, keyboard navigation, and four
              responsive mobile modes.
            </p>
          </header>

          <CodeBlock
            code={`import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@neuctra/ui";`}
          />

          {/* ── Basic Usage ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Basic Usage
            </h2>
            <CodePreviewBlock
              language="tsx"
              code={`import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@neuctra/ui";

<Tabs>
  <TabList>
    <Tab index={0}>Overview</Tab>
    <Tab index={1}>Settings</Tab>
    <Tab index={2}>Favorites</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index={0}><div className="p-6">Overview content</div></TabPanel>
    <TabPanel index={1}><div className="p-6">Settings content</div></TabPanel>
    <TabPanel index={2}><div className="p-6">Favorites content</div></TabPanel>
  </TabPanels>
</Tabs>`}
              previewContent={<DemoTabs />}
            />
          </section>

          {/* ── Props Tables ─────────────────────────────────────────────── */}
          {/* Props Table — Tabs */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Tabs Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">defaultActive</td>
                    <td className="p-3">number</td>
                    <td className="p-3">0</td>
                    <td className="p-3">Initial active tab index</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">position</td>
                    <td className="p-3">"top" | "bottom" | "left" | "right"</td>
                    <td className="p-3">"top"</td>
                    <td className="p-3">Tabs layout position</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">variant</td>
                    <td className="p-3">
                      "solid" | "outline" | "underline" | "pill"
                    </td>
                    <td className="p-3">"solid"</td>
                    <td className="p-3">Visual style of tabs</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">fullWidth</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Makes tabs stretch full width</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">radius</td>
                    <td className="p-3">number</td>
                    <td className="p-3">8</td>
                    <td className="p-3">Border radius of tabs</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">transitionDuration</td>
                    <td className="p-3">number</td>
                    <td className="p-3">200</td>
                    <td className="p-3">Animation duration in ms</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">bordered</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Adds outer border wrapper</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">tabCount</td>
                    <td className="p-3">number</td>
                    <td className="p-3">auto</td>
                    <td className="p-3">Manually define tab count</td>
                  </tr>

                  {/* 🎨 Responsive */}
                  <tr>
                    <td className="p-3 font-mono">mobileBreakpoint</td>
                    <td className="p-3">number</td>
                    <td className="p-3">768</td>
                    <td className="p-3">Breakpoint for mobile behavior</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">mobileVariant</td>
                    <td className="p-3">
                      "drawer" | "scroll" | "stack" | "collapse"
                    </td>
                    <td className="p-3">"scroll"</td>
                    <td className="p-3">Mobile layout behavior</td>
                  </tr>

                  {/* 🎨 Colors */}
                  <tr>
                    <td className="p-3 font-mono">primaryColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#2563eb"</td>
                    <td className="p-3">Active tab color theme</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">activeColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#ffffff"</td>
                    <td className="p-3">Active text color</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#374151"</td>
                    <td className="p-3">Default tab text color</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">hoverColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#1d4ed8"</td>
                    <td className="p-3">Hover state color</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">borderColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#e5e7eb"</td>
                    <td className="p-3">Outline/underline border color</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">disabledColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#9ca3af"</td>
                    <td className="p-3">Disabled tab color</td>
                  </tr>

                  {/* 📦 Events */}
                  <tr>
                    <td className="p-3 font-mono">onTabChange</td>
                    <td className="p-3"> (index: number) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when tab changes</td>
                  </tr>

                  {/* 🎨 Styling */}
                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root wrapper class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Root inline styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <CodeBlock code={`<TabList gap={8} drawerLabel="Select tab" />`} />

          {/* Props Table — TabList */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              TabList Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">gap</td>
                    <td className="p-3">number</td>
                    <td className="p-3">8</td>
                    <td className="p-3">Spacing between tabs</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">drawerLabel</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">"Select tab"</td>
                    <td className="p-3">
                      Label shown in mobile drawer trigger
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Wrapper class styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for TabList</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <CodeBlock
            code={`<Tab icon={<Icon />} disabled={false}>Tab 1</Tab>`}
          />

          {/* Props Table — Tab */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Tab Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Tab label content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disable tab interaction</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">ariaLabel</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Accessibility label</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">index</td>
                    <td className="p-3">number</td>
                    <td className="p-3">auto</td>
                    <td className="p-3">Manual tab index override</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Tab button styling</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">activeStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style when tab is active</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">inactiveStyle</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Style when tab is inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <CodeBlock
            code={`<TabPanels>
  <TabPanel index={0}>Content</TabPanel>
</TabPanels>`}
          />

          {/* Props Table — TabPanels */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              TabPanels Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Wrapper for multiple TabPanel components
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom class for panels container</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for panels wrapper</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <CodeBlock
            code={`<TabPanel index={0} keepMounted>
  Content
</TabPanel>`}
          />

          {/* Props Table — TabPanel */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              TabPanel Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Panel content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">index</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Tab index it belongs to</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">keepMounted</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Keep in DOM when inactive</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Panel wrapper class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">React.CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles</td>
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
