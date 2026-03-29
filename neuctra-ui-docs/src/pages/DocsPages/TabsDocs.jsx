"use client";
import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";
import { LayoutPanelTop, Settings, Star, Lock } from "lucide-react";

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
    <TabList  >
      <Tab  index={0} icon={<LayoutPanelTop size={16} />}>Overview</Tab>
      <Tab index={1} icon={<Settings size={16} />}>Settings</Tab>
      <Tab index={2} icon={<Star size={16} />}>Favorites</Tab>
    </TabList>
    <TabPanels>
      <TabPanel index={0}><div className="p-6">Overview content</div></TabPanel>
      <TabPanel index={1}><div className="p-6">Settings content</div></TabPanel>
      <TabPanel index={2}><div className="p-6">Favorites content</div></TabPanel>
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

      <div className="bg-zinc-950 text-gray-200 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-12">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-bold text-white mb-3">Tabs Component</h1>
            <p className="text-gray-400 max-w-3xl">
              A composable, fully customizable tab system built from individual
              sub-components — <code className="text-primary">Tabs</code>,{" "}
              <code className="text-primary">TabList</code>,{" "}
              <code className="text-primary">Tab</code>,{" "}
              <code className="text-primary">TabPanels</code>, and{" "}
              <code className="text-primary">TabPanel</code>. Supports variants,
              vertical layouts, theming, keyboard navigation, and four responsive
              mobile modes.
            </p>
          </header>

          {/* ── Basic Usage ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Basic Usage</h2>
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

          {/* ── Variants ────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">Variants</h2>
            <p className="text-gray-400 mb-4">
              Four visual styles: <code className="text-primary">solid</code> (default),{" "}
              <code className="text-primary">outline</code>,{" "}
              <code className="text-primary">underline</code>, and{" "}
              <code className="text-primary">pill</code>.
            </p>

            <div className="space-y-6">
              {(["solid", "outline", "underline", "pill"]).map((v) => (
                <CodePreviewBlock
                  key={v}
                  language="tsx"
                  code={`<Tabs variant="${v}">
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
                  previewContent={<DemoTabs variant={v} />}
                />
              ))}
            </div>
          </section>

          {/* ── Position ────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">Position</h2>
            <p className="text-gray-400 mb-4">
              Tabs can be placed on any side:{" "}
              <code className="text-primary">top</code> (default),{" "}
              <code className="text-primary">bottom</code>,{" "}
              <code className="text-primary">left</code>, or{" "}
              <code className="text-primary">right</code>. On mobile, left/right
              automatically collapse to a top row.
            </p>

            <div className="space-y-6">
              {(["bottom", "left", "right"]).map((p) => (
                <CodePreviewBlock
                  key={p}
                  language="tsx"
                  code={`<Tabs position="${p}">
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
                  previewContent={
                    <div className="h-[220px]">
                      <DemoTabs position={p} />
                    </div>
                  }
                />
              ))}
            </div>
          </section>

          {/* ── Icons & Disabled ────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Icons & Disabled Tabs</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Tabs>
  <TabList>
    <Tab index={0} icon={<LayoutPanelTop size={16} />}>Overview</Tab>
    <Tab index={1} icon={<Settings size={16} />}>Settings</Tab>
    <Tab index={2} icon={<Lock size={16} />} disabled>Locked</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index={0}><div className="p-6">Overview content</div></TabPanel>
    <TabPanel index={1}><div className="p-6">Settings content</div></TabPanel>
    <TabPanel index={2}><div className="p-6">You can't get here</div></TabPanel>
  </TabPanels>
</Tabs>`}
              previewContent={
                <Tabs>
                  <TabList>
                    <Tab index={0} icon={<LayoutPanelTop size={16} />}>Overview</Tab>
                    <Tab index={1} icon={<Settings size={16} />}>Settings</Tab>
                    <Tab index={2} icon={<Lock size={16} />} disabled>Locked</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel index={0}><div className="p-6">Overview content</div></TabPanel>
                    <TabPanel index={1}><div className="p-6">Settings content</div></TabPanel>
                    <TabPanel index={2}><div className="p-6">You can't get here</div></TabPanel>
                  </TabPanels>
                </Tabs>
              }
            />
          </section>

          {/* ── Theming ─────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Theming</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Tabs
  primaryColor="#22c55e"
  hoverColor="#16a34a"
  activeColor="#fff"
  bordered
>
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
              previewContent={
                <DemoTabs primaryColor="#22c55e" hoverColor="#16a34a" activeColor="#fff" bordered />
              }
            />
          </section>

          {/* ── Full Width ──────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Full Width</h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Tabs fullWidth>
  <TabList>
    <Tab index={0}>Overview</Tab>
    <Tab index={1}>Settings</Tab>
    <Tab index={2}>Favorites</Tab>
  </TabList>
  ...
</Tabs>`}
              previewContent={<DemoTabs fullWidth />}
            />
          </section>

          {/* ── Default Active & Callback ────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Default Active & Callback
            </h2>
            <CodePreviewBlock
              language="tsx"
              code={`<Tabs defaultActive={1} onTabChange={(i) => console.log("Active tab:", i)}>
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
              previewContent={
                <DemoTabs defaultActive={1} />
              }
            />
          </section>

          {/* ── keepMounted ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">Keep Panels Mounted</h2>
            <p className="text-gray-400 mb-4">
              By default, inactive <code className="text-primary">TabPanel</code>s are
              removed from the DOM. Pass <code className="text-primary">keepMounted</code>{" "}
              to preserve them — useful for forms or editors that shouldn't reset on tab switch.
            </p>
            <CodePreviewBlock
              language="tsx"
              code={`<TabPanel index={1} keepMounted>
  <input placeholder="This input persists across tab switches" />
</TabPanel>`}
              previewContent={
                <Tabs>
                  <TabList>
                    <Tab index={0}>Form A</Tab>
                    <Tab index={1}>Form B (keepMounted)</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel index={0}>
                      <div className="p-6">
                        <input className="border rounded px-3 py-2 text-sm text-gray-800 w-full" placeholder="Resets when you leave" />
                      </div>
                    </TabPanel>
                    <TabPanel index={1} keepMounted>
                      <div className="p-6">
                        <input className="border rounded px-3 py-2 text-sm text-gray-800 w-full" placeholder="Type here, switch tabs, come back — value stays" />
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              }
            />
          </section>

          {/* ── Responsive ──────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Responsive Mobile Modes
            </h2>
            <p className="text-gray-400 mb-4">
              Control how <code className="text-primary">TabList</code> behaves on
              small screens via the <code className="text-primary">mobileVariant</code> prop.
              Resize your browser to see the effect.
            </p>

            <div className="space-y-6">
              <CodePreviewBlock
                language="tsx"
                code={`// "scroll" (default) — horizontal scrollable strip with snap
<Tabs mobileVariant="scroll" mobileBreakpoint={768}>
  ...
</Tabs>`}
                previewContent={<DemoTabs mobileVariant="scroll" />}
              />

              <CodePreviewBlock
                language="tsx"
                code={`// "drawer" — collapses into an animated dropdown
<Tabs mobileVariant="drawer" mobileBreakpoint={768}>
  <TabList drawerLabel="Select section">
    ...
  </TabList>
  ...
</Tabs>`}
                previewContent={<DemoTabs mobileVariant="drawer" />}
              />

              <CodePreviewBlock
                language="tsx"
                code={`// "stack" — forced full-width vertical column
<Tabs mobileVariant="stack" mobileBreakpoint={768}>
  ...
</Tabs>`}
                previewContent={<DemoTabs mobileVariant="stack" />}
              />

              <CodePreviewBlock
                language="tsx"
                code={`// "collapse" — left/right sidebar positions fold to top row
<Tabs position="left" mobileVariant="collapse" mobileBreakpoint={768}>
  ...
</Tabs>`}
                previewContent={<DemoTabs position="left" mobileVariant="collapse" />}
              />
            </div>
          </section>

          {/* ── Props Tables ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Props</h2>

            {/* <Tabs> */}
            <h3 className="text-lg font-semibold text-white mb-3">&lt;Tabs&gt;</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Default</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ["defaultActive", "number", "0", "Initially active tab index"],
                    ["variant", "solid | outline | underline | pill", "solid", "Visual style of tab buttons"],
                    ["position", "top | bottom | left | right", "top", "Side the TabList appears on"],
                    ["fullWidth", "boolean", "false", "Tabs share equal width across the list"],
                    ["radius", "number", "8", "Border radius in px"],
                    ["transitionDuration", "number", "200", "Animation speed in ms"],
                    ["bordered", "boolean", "false", "Adds a border around the whole component"],
                    ["mobileBreakpoint", "number", "768", "Viewport width (px) that triggers mobile mode"],
                    ["mobileVariant", "scroll | drawer | stack | collapse", "scroll", "How TabList behaves on mobile"],
                    ["primaryColor", "string", "#2563eb", "Active tab & accent color"],
                    ["activeColor", "string", "#ffffff", "Text color of the active tab"],
                    ["textColor", "string", "#374151", "Default tab text color"],
                    ["hoverColor", "string", "#1d4ed8", "Tab text/bg color on hover"],
                    ["borderColor", "string", "#e5e7eb", "Color used for borders and dividers"],
                    ["disabledColor", "string", "#9ca3af", "Text color for disabled tabs"],
                    ["backgroundColor", "string", "transparent", "Background of the root wrapper"],
                    ["onTabChange", "(index: number) => void", "—", "Fired whenever the active tab changes"],
                    ["tabCount", "number", "auto", "Override auto-counted tab total (for keyboard nav)"],
                    ["className", "string", "—", "Extra classes on the root wrapper"],
                    ["style", "CSSProperties", "—", "Inline styles on the root wrapper"],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td className="px-4 py-2 text-primary font-mono">{prop}</td>
                      <td className="px-4 py-2 text-gray-400">{type}</td>
                      <td className="px-4 py-2 text-gray-500">{def}</td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <TabList> */}
            <h3 className="text-lg font-semibold text-white mb-3">&lt;TabList&gt;</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Default</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ["gap", "number", "8", "Spacing between Tab buttons in px"],
                    ["drawerLabel", "ReactNode", "\"Select tab\"", "Fallback label shown in the drawer trigger"],
                    ["drawerIcon", "ReactNode", "chevron svg", "Custom icon for the drawer toggle"],
                    ["className", "string", "—", "Extra classes"],
                    ["style", "CSSProperties", "—", "Inline styles"],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td className="px-4 py-2 text-primary font-mono">{prop}</td>
                      <td className="px-4 py-2 text-gray-400">{type}</td>
                      <td className="px-4 py-2 text-gray-500">{def}</td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <Tab> */}
            <h3 className="text-lg font-semibold text-white mb-3">&lt;Tab&gt;</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Default</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ["index", "number", "auto (DOM position)", "Tab's index — must match its TabPanel"],
                    ["icon", "ReactNode", "—", "Icon rendered before the label"],
                    ["disabled", "boolean", "false", "Prevents activation and dims the tab"],
                    ["ariaLabel", "string", "—", "Accessible label override"],
                    ["activeStyle", "CSSProperties", "—", "Extra inline styles when this tab is active"],
                    ["inactiveStyle", "CSSProperties", "—", "Extra inline styles when this tab is inactive"],
                    ["className", "string", "—", "Extra classes"],
                    ["style", "CSSProperties", "—", "Inline styles (merged last)"],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td className="px-4 py-2 text-primary font-mono">{prop}</td>
                      <td className="px-4 py-2 text-gray-400">{type}</td>
                      <td className="px-4 py-2 text-gray-500">{def}</td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <TabPanel> */}
            <h3 className="text-lg font-semibold text-white mb-3">&lt;TabPanel&gt;</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-zinc-800">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Prop</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Default</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ["index", "number", "—", "Required. Must match the corresponding Tab's index"],
                    ["keepMounted", "boolean", "false", "Keep panel in DOM when inactive (good for forms)"],
                    ["className", "string", "—", "Extra classes"],
                    ["style", "CSSProperties", "—", "Inline styles"],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td className="px-4 py-2 text-primary font-mono">{prop}</td>
                      <td className="px-4 py-2 text-gray-400">{type}</td>
                      <td className="px-4 py-2 text-gray-500">{def}</td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
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