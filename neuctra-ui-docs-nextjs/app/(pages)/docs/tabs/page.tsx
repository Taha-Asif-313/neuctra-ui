"use client";

import React from "react";
import { LeftTabs, TopTabs, RightTabs } from "@neuctra/ui"; // Adjust import path as needed
import { Calendar, Mail, Settings, User } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const TabsDocs: React.FC = () => {
  // Define columns for the props table
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Data for Tabs component props
  const data = [
    {
      prop: "tabs",
      type: "TabItem[]",
      default: "—",
      description: "Array of tab objects containing label and content",
    },
    {
      prop: "defaultActive",
      type: "number",
      default: "0",
      description: "Index of the initially active tab",
    },
    {
      prop: "tabPosition",
      type: `"left" | "top" | "right"`,
      default: `"top"`,
      description: "Position of tabs relative to content",
    },
    {
      prop: "activeTabClassName",
      type: "string",
      default: `""`,
      description: "Additional class for active tab button",
    },
    {
      prop: "inactiveTabClassName",
      type: "string",
      default: `""`,
      description: "Additional class for inactive tab buttons",
    },
    {
      prop: "tabContainerClassName",
      type: "string",
      default: `""`,
      description: "Additional class for tabs container",
    },
    {
      prop: "contentContainerClassName",
      type: "string",
      default: `""`,
      description: "Additional class for content container",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional class for root container",
    },
    {
      prop: "activeTabStyle",
      type: "CSSProperties",
      default: "undefined",
      description: "Inline styles for active tab",
    },
    {
      prop: "inactiveTabStyle",
      type: "CSSProperties",
      default: "undefined",
      description: "Inline styles for inactive tabs",
    },
    {
      prop: "tabContainerStyle",
      type: "CSSProperties",
      default: "undefined",
      description: "Inline styles for tabs container",
    },
    {
      prop: "contentContainerStyle",
      type: "CSSProperties",
      default: "undefined",
      description: "Inline styles for content container",
    },
    {
      prop: "style",
      type: "CSSProperties",
      default: "undefined",
      description: "Inline styles for root container",
    },
    {
      prop: "tabsWidth",
      type: "string | number",
      default: `"240px"`,
      description: "Width of tabs container in vertical layouts",
    },
    {
      prop: "tabGap",
      type: "number",
      default: "8",
      description: "Gap between tabs in pixels",
    },
    {
      prop: "tabPadding",
      type: "string",
      default: `"12px 16px"`,
      description: "Padding for tab buttons",
    },
    {
      prop: "tabBorderRadius",
      type: "number",
      default: "8",
      description: "Border radius for tab buttons in pixels",
    },
    {
      prop: "primaryColor",
      type: "string",
      default: `"#2563eb"`,
      description: "Primary color used for active tab",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"#374151"`,
      description: "Text color for inactive tabs",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#ffffff"`,
      description: "Background color for tabs container",
    },
    {
      prop: "hoverTextColor",
      type: "string",
      default: `"#1e40af"`,
      description: "Text color on hover",
    },
    {
      prop: "disabledColor",
      type: "string",
      default: `"#d1d5db"`,
      description: "Color for disabled tabs",
    },
    {
      prop: "responsiveBreakpoint",
      type: "number",
      default: "768",
      description: "Viewport width in pixels when mobile layout activates",
    },
    {
      prop: "showDrawerLabel",
      type: "string",
      default: `"Select Tab"`,
      description: "Label for mobile drawer button",
    },
    {
      prop: "drawerIcon",
      type: "React.ReactNode",
      default: `"☰"`,
      description: "Icon for mobile drawer button",
    },
    {
      prop: "transitionDuration",
      type: "number",
      default: "200",
      description: "Animation duration in milliseconds",
    },
    {
      prop: "onTabChange",
      type: "(index: number) => void",
      default: "undefined",
      description: "Callback when active tab changes",
    },
    {
      prop: "role",
      type: "string",
      default: `"tablist"`,
      description: "ARIA role for tabs container",
    },
    {
      prop: "ariaOrientation",
      type: `"horizontal" | "vertical"`,
      default: `"horizontal"`,
      description: "ARIA orientation for tabs",
    },
  ];

  // TabItem interface documentation
  const tabItemColumns = [
    { key: "property", label: "Property", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "required", label: "Required", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const tabItemData = [
    {
      property: "label",
      type: "React.ReactNode",
      required: "Yes",
      description: "Content to display as tab label",
    },
    {
      property: "content",
      type: "React.ReactNode",
      required: "Yes",
      description: "Content to display when tab is active",
    },
    {
      property: "icon",
      type: "React.ReactNode",
      required: "No",
      description: "Optional icon to display with tab label",
    },
    {
      property: "disabled",
      type: "boolean",
      required: "No",
      description: "Whether the tab is disabled",
    },
    {
      property: "ariaLabel",
      type: "string",
      required: "No",
      description: "ARIA label for accessibility",
    },
  ];

  const sampleTabs = [
    {
      label: "Profile",
      content: <div className="p-4">Profile content goes here</div>,
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Messages",
      content: <div className="p-4">Messages content goes here</div>,
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "Settings",
      content: <div className="p-4">Settings content goes here</div>,
      icon: <Settings className="w-4 h-4" />,
      disabled: true,
    },
    {
      label: "Calendar",
      content: <div className="p-4">Calendar content goes here</div>,
      icon: <Calendar className="w-4 h-4" />,
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Tabs</span> Component Documentation
      </h1>

      {/* Import Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { LeftTabs, TopTabs, RightTabs } from "@neuctra/ui";`}
        />
        <p className="mt-2 text-gray-300">
          Or import the complete Tabs object:
        </p>
        <CodeBlock
          language="javascript"
          code={`import { Tabs } from "@neuctra/ui";\n// Usage: <Tabs.Left />, <Tabs.Top />, <Tabs.Right />`}
        />
      </section>

      {/* Live Demo with Code */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Examples</h2>

        <h3 className="text-xl font-semibold mb-3 mt-6">Top Tabs</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<TopTabs 
  contentContainerStyle={{ backgroundColor: "#111111" }}
  backgroundColor="transparent"
  textColor="#fff"
  tabs={[
    { label: "Profile", content: <div>Profile content</div> },
    { label: "Messages", content: <div>Messages content</div> },
    { label: "Settings", content: <div>Settings content</div> }
  ]}
/>`}
          previewContent={
            <div className="w-full h-48">
              <TopTabs
                contentContainerStyle={{ backgroundColor: "#111111" }}
                backgroundColor="transparent"
                textColor="#fff"
                tabs={[
                  {
                    label: "Profile",
                    icon: <User />,
                    content: <div className="p-4">Profile content</div>,
                  },
                  {
                    label: "Messages",
                    icon: <Mail />,
                    content: <div className="p-4">Messages content</div>,
                  },
                  {
                    label: "Settings",
                    icon: <Settings />,
                    content: <div className="p-4">Settings content</div>,
                  },
                ]}
              />
            </div>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Left Tabs</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<LeftTabs 
  tabs={sampleTabs}
  primaryColor="#7c3aed"
  tabBorderRadius={6}
  responsiveBreakpoint={1024}
  contentContainerStyle={{ backgroundColor: "#111111" }}
  backgroundColor="transparent"
  textColor="#fff"
/>`}
          previewContent={
            <div className="w-full h-64">
              <LeftTabs
                tabs={sampleTabs}
                contentContainerStyle={{ backgroundColor: "#111111" }}
                backgroundColor="transparent"
                textColor="#fff"
              />
            </div>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Right Tabs</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<RightTabs 
  tabs={sampleTabs}
  tabsWidth="200px"
  showDrawerLabel="Menu"
  drawerIcon={<Settings className="w-4 h-4" />}
/>`}
          previewContent={
            <div className="w-full h-64">
              <RightTabs
                tabs={sampleTabs}
                tabsWidth="200px"
                showDrawerLabel="Menu"
                drawerIcon={<Settings className="w-4 h-4" />}
                contentContainerStyle={{ backgroundColor: "#111111" }}
                backgroundColor="transparent"
                textColor="#fff"
              />
            </div>
          }
        />
      </section>

      {/* Component Description */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Component Overview</h2>
        <p className="text-gray-300 leading-relaxed">
          The <code>Tabs</code> component provides a flexible and accessible way
          to organize content into multiple panels that can be toggled via tab
          buttons. It supports three layout variants: top (default), left, and
          right positioned tabs. The component is fully responsive and
          automatically switches to a mobile-friendly drawer layout on smaller
          screens.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          Key features include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2 ml-4">
          <li>Multiple layout options (top, left, right)</li>
          <li>Fully responsive with mobile drawer fallback</li>
          <li>
            Comprehensive accessibility support (ARIA attributes, keyboard
            navigation)
          </li>
          <li>Customizable colors, spacing, and styling</li>
          <li>Support for icons in tabs</li>
          <li>Disabled tab state</li>
          <li>Callback for tab change events</li>
          <li>Animated transitions</li>
        </ul>
      </section>

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Component Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200 border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                {columns.map(({ label, key }) => (
                  <th key={key} className="px-3 py-2 border border-primary">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ prop, type, default: def, description }) => (
                <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                  <td className="border border-primary px-3 py-2 font-mono">
                    {prop}
                  </td>
                  <td className="border border-primary px-3 py-2 font-mono">
                    {type}
                  </td>
                  <td className="border border-primary px-3 py-2 font-mono">
                    {def}
                  </td>
                  <td className="border border-primary px-3 py-2">
                    {description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TabItem Interface */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">TabItem Interface</h2>
        <p className="text-gray-300 mb-4">
          The <code>tabs</code> prop accepts an array of objects following the{" "}
          <code>TabItem</code> interface:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200 border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                {tabItemColumns.map(({ label, key }) => (
                  <th key={key} className="px-3 py-2 border border-primary">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabItemData.map(({ property, type, required, description }) => (
                <tr key={property} className="even:bg-zinc-800 odd:bg-zinc-900">
                  <td className="border border-primary px-3 py-2 font-mono">
                    {property}
                  </td>
                  <td className="border border-primary px-3 py-2 font-mono">
                    {type}
                  </td>
                  <td className="border border-primary px-3 py-2">
                    {required}
                  </td>
                  <td className="border border-primary px-3 py-2">
                    {description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Advanced Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Advanced Usage Examples</h2>

        <h3 className="text-xl font-semibold mb-3">Custom Styled Tabs</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<TopTabs
  tabs={sampleTabs}
  primaryColor="#db2777"
  textColor="#4b5563"
  backgroundColor="#f9fafb"
  hoverTextColor="#db2777"
  tabBorderRadius={20}
  tabPadding="16px 24px"
  activeTabStyle={{
    boxShadow: "0 4px 14px rgba(219, 39, 119, 0.25)"
  }}
/>`}
          previewContent={
            <div className="w-full h-48">
              <TopTabs
                tabs={sampleTabs}
                primaryColor="#db2777"
                textColor="#4b5563"
                backgroundColor="#f9fafb"
                hoverTextColor="#db2777"
                tabBorderRadius={20}
                tabPadding="16px 24px"
                contentContainerStyle={{ color: "#000000" }}
                activeTabStyle={{
                  boxShadow: "0 4px 14px rgba(219, 39, 119, 0.25)",
                }}
              />
            </div>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">
          With Class Name Overrides
        </h3>
        <CodePreviewBlock
          language="javascript"
          code={`<LeftTabs
  tabs={sampleTabs}
  tabContainerClassName="bg-gray-100 p-2 rounded-lg"
  contentContainerClassName="bg-white shadow-inner"
  activeTabClassName="font-bold"
  inactiveTabClassName="opacity-80 hover:opacity-100"
/>`}
          previewContent={
            <div className="w-full h-64">
              <LeftTabs
                tabs={sampleTabs}
                tabContainerClassName="bg-gray-100 p-2 rounded-lg"
                contentContainerClassName="bg-white shadow-inner"
                activeTabClassName="font-bold"
                inactiveTabClassName="opacity-80 hover:opacity-100"
                contentContainerStyle={{ color: "#000000" }}
              />
            </div>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">With Tab Change Callback</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<TopTabs
  tabs={sampleTabs}
  onTabChange={(index) => console.log('Tab changed to index:', index)}
/>`}
          previewContent={
            <div className="w-full h-48">
              <TopTabs
                tabs={sampleTabs}
                contentContainerStyle={{ color: "#000000" }}
                onTabChange={(index) =>
                  console.log("Tab changed to index:", index)
                }
              />
            </div>
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Custom Mobile Drawer</h3>
        <CodePreviewBlock
          language="javascript"
          code={`<RightTabs
  tabs={sampleTabs}
  showDrawerLabel="Navigation"
  drawerIcon={<User className="w-4 h-4" />}
  responsiveBreakpoint={1024}
/>`}
          previewContent={
            <div className="w-full h-64">
              <RightTabs
                tabs={sampleTabs}
                contentContainerStyle={{ color: "#000000" }}
                showDrawerLabel="Navigation"
                drawerIcon={<User className="w-4 h-4" />}
                responsiveBreakpoint={1024}
              />
            </div>
          }
        />
      </section>

      {/* Accessibility Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <p className="text-gray-300 mb-4">
          The Tabs component implements proper ARIA attributes and keyboard
          navigation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>
            <code>role="tablist"</code> on the tabs container
          </li>
          <li>
            <code>role="tab"</code> on each tab button
          </li>
          <li>
            <code>role="tabpanel"</code> on the content container
          </li>
          <li>
            <code>aria-selected</code> to indicate active tab
          </li>
          <li>
            <code>aria-controls</code> and <code>aria-labelledby</code> for
            proper association
          </li>
          <li>Keyboard navigation with arrow keys and Home/End</li>
          <li>Focus management when switching tabs</li>
        </ul>
      </section>

      {/* Responsive Behavior Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Responsive Behavior</h2>
        <p className="text-gray-300 mb-4">
          The component automatically switches to a mobile-friendly drawer
          layout when the viewport width is less than the specified{" "}
          <code>responsiveBreakpoint</code> (default: 768px).
        </p>
        <p className="text-gray-300">
          In mobile view for vertical tabs (left/right), a dropdown button
          appears that opens a drawer with all available tabs. The drawer can be
          customized with the <code>showDrawerLabel</code>
          and <code>drawerIcon</code> props.
        </p>
      </section>

      {/* Animation Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Animations</h2>
        <p className="text-gray-300 mb-2">
          The component includes smooth animations for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Tab hover states (200ms ease transition)</li>
          <li>Mobile drawer opening/closing (slide down animation)</li>
          <li>Active tab indicator</li>
        </ul>
        <div className="mt-4">
          <CodeBlock
            language="css"
            code={`/* Example of the mobile drawer animation */
@keyframes react-tabs-slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}`}
          />
        </div>
      </section>
    </div>
  );
};

export default TabsDocs;
