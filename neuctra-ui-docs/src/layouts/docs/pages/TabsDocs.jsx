"use client";
import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@neuctra/ui";
import CodePreviewBlock from "../components/CodePreviewBlock";
import DocsFooter from "../components/DocsFooter";
import Metadata from "../../../MetaData";
import { LayoutPanelTop, Settings, Star, Check, X } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Shared demo tabs (used across previews)                            */
/* ------------------------------------------------------------------ */

const DemoTabs = ({
  variant,
  position,
  bordered,
  defaultActive,
  mobileVariant,
  fullWidth,
}) => (
  <Tabs
    variant={variant}
    position={position}
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
      <Metadata
        title="Tabs Component — Flexible Navigation System for React | Neuctra UI"
        description="Explore the Neuctra UI Tabs component for React. A fully accessible, responsive tab system with multiple variants, keyboard navigation, mobile support, and advanced customization for modern UI dashboards and apps."
        keywords="react tabs component, tabs ui library, tab navigation react, flexible tabs system, responsive tabs component, headless tabs react, dashboard tabs ui, mobile tabs react, underline tabs, pill tabs, neuctra ui tabs"
      />

      <div className="min-h-screen">
        <div className="space-y-12">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Tabs Component
            </h1>

            <p className="text-sm leading-relaxed">
              The <span className="text-primary font-semibold">Tabs</span>{" "}
              component is a flexible, fully responsive UI primitive built with
              TypeScript. It supports multiple layouts, visual variants,
              keyboard navigation, and mobile-aware behaviors — making it ideal
              for dashboards, settings panels, and structured content
              navigation.
            </p>

            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Use <code>variant</code> and <code>position</code> to control
              layout and styling, <code>mobileVariant</code> for responsive
              behavior, and <code>TabList</code> + <code>TabPanels</code> for
              structured composition. Customize appearance with semantic theme
              classes, CSS variables, <code>className</code>, and layout props
              like <code>radius</code>.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              code={`import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple tab system. The component provides flexible
              tab navigation with multiple layouts and responsive behavior.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@neuctra/ui';

function BasicExample() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>Overview</Tab>
        <Tab index={1}>Settings</Tab>
        <Tab index={2}>Profile</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>
          <div className="p-6">Overview content</div>
        </TabPanel>
        <TabPanel index={1}>
          <div className="p-6">Settings content</div>
        </TabPanel>
        <TabPanel index={2}>
          <div className="p-6">Profile content</div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}`}
            />
          </section>

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
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">TabList and TabPanels composition</td>
                  </tr>

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
                    <td className="p-3">"var(--primary)"</td>
                    <td className="p-3">
                      Context color token for custom tab extensions
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">activeColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"#ffffff"</td>
                    <td className="p-3">
                      Context color token for custom tab extensions
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">textColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">""</td>
                    <td className="p-3">
                      Context color token for custom tab extensions
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">hoverColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">"var(--primary)"</td>
                    <td className="p-3">
                      Context color token for custom tab extensions
                    </td>
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

                  <tr>
                    <td className="p-3 font-mono">backgroundColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Available in the type for custom integrations
                    </td>
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

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              {/* Missing TabPanel index */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<TabPanel>Content</TabPanel>"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Each TabPanel must have a matching <code>index</code>
                  </p>
                </div>
              </div>

              {/* Mismatched count */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>
                    {"<TabList><Tab /> x3</TabList> + <TabPanel /> x2"}
                  </code>
                  <p className="text-gray-400 text-xs mt-1">
                    Number of Tabs and TabPanels should match
                  </p>
                </div>
              </div>

              {/* Manual index misuse */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<Tab index={5} />"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Avoid manually setting index unless necessary — auto
                    indexing is handled internally
                  </p>
                </div>
              </div>

              {/* Wrong nesting */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<TabPanel outside <Tabs> />"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    All components must be inside <code>&lt;Tabs&gt;</code>{" "}
                    provider
                  </p>
                </div>
              </div>

              {/* Disabled misuse */}
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{"<Tab disabled /> + expecting click"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Disabled tabs do not trigger <code>setActive</code>
                  </p>
                </div>
              </div>

              {/* Correct usage */}
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{"<Tabs><TabList /><TabPanels /></Tabs>"}</code>
                  <p className="text-gray-400 text-xs mt-1">
                    Always follow the correct structure hierarchy
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <div className="text-gray-300 space-y-3">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Use <code>variant="underline"</code> for clean
                  navigation-style tabs, and <code>pill</code> for dashboards.
                </li>

                <li>
                  Combine <code>position="left"</code> with{" "}
                  <code>fullWidth</code> for sidebar layouts.
                </li>

                <li>
                  Use <code>mobileVariant="drawer"</code> for better UX on small
                  screens.
                </li>

                <li>
                  Prefer <code>keepMounted</code> when tab content has expensive
                  re-renders.
                </li>

                <li>
                  Use <code>onTabChange</code> to sync tabs with routing or
                  state (e.g. query params).
                </li>

                <li>
                  Add <code>icon</code> in <code>&lt;Tab&gt;</code> for better
                  visual scanning.
                </li>

                <li>
                  Use <code>fullWidth</code> for equal tab sizing in forms or
                  mobile layouts.
                </li>

                <li>
                  Customize with CSS variables (<code>--primary</code>,{" "}
                  <code>--accent</code>) instead of inline styles.
                </li>

                <li>
                  Avoid heavy content inside tabs unless using{" "}
                  <code>keepMounted</code>.
                </li>

                <li>
                  Keyboard navigation is built-in — ensure focus styles are
                  visible for accessibility.
                </li>
              </ul>
            </div>
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default TabsDocs;
