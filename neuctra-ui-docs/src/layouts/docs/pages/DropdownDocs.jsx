"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../components/CodePreviewBlock";
import { Dropdown } from "@neuctra/ui";
import Metadata from "../../../MetaData";
import CodeBlock from "../components/CodeBlock";
import { Edit, Trash2, Copy, Eye, Check, X } from "lucide-react";
import DocsFooter from "../components/DocsFooter";

const DropdownDocs = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <>
      <Metadata
        title="React Dropdown Component - Action Menu with Icons & Controls | Neuctra UI"
        description="Build flexible dropdown menus in React with Neuctra UI. Supports icons, separators, controlled state, alignment, danger actions, and fully customizable styling for modern action menus."
        keywords="react dropdown, dropdown menu component, action menu react, ui dropdown tailwind, customizable dropdown, react menu component, context menu react, neuctra ui dropdown, dropdown with icons, controlled dropdown"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-foreground">
              Dropdown Component
            </h1>

            <p className="text-sm leading-relaxed text-foreground">
              The <span className="text-primary font-semibold">Dropdown</span>{" "}
              component is a flexible, fully customizable action menu built for
              modern applications. It supports icons, separators, danger states,
              controlled/uncontrolled behavior, and theme-aware styling.
            </p>

            <p className="text-sm text-foreground mt-3 leading-relaxed">
              Use <code>items</code> to define menu actions,{" "}
              <code>trigger</code> for the toggle element, and{" "}
              <code>align</code> + <code>width</code> for layout control.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Dropdown } from "@neuctra/ui";`} />
          </section>

          {/* Item Structure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Dropdown Item Structure
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Each entry in <code>items</code> can render a clickable menu item
              or a separator. Items are rendered as buttons, so use{" "}
              <code>onClick</code> for actions and navigation behavior.
            </p>
            <CodeBlock
              language="tsx"
              code={`type DropdownItem = {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
  separator?: boolean;
  className?: string;
  style?: React.CSSProperties;
};`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple dropdown menu. The component supports icons,
              separators, danger states, and flexible positioning.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { Dropdown } from '@neuctra/ui';

function BasicExample() {
  const items = [
    { label: "Edit", onClick: () => console.log('Edit clicked') },
    { label: "Copy", onClick: () => console.log('Copy clicked') },
    { separator: true },
    { label: "Delete", danger: true, onClick: () => console.log('Delete clicked') }
  ];

  return (
    <Dropdown
      trigger={<button>Open Menu</button>}
      items={items}
    />
  );
}`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Dropdown
  trigger={<button>Open</button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", danger: true, onClick: () => {} },
  ]}
/>`}
              previewContent={
                <div className="w-full flex items-center justify-center">
                  <Dropdown
                    trigger={<button className="text-sm">Open Dropdown</button>}
                    items={[
                      {
                        label: "Edit",
                        icon: <Edit size={16} />,
                        onClick: () => alert("Edit clicked"),
                      },
                      {
                        label: "Copy",
                        icon: <Copy size={16} />,
                        onClick: () => alert("Copy clicked"),
                      },
                      { separator: true },
                      {
                        label: "Preview",
                        icon: <Eye size={16} />,
                        onClick: () => alert("Preview clicked"),
                      },
                      { separator: true },
                      {
                        label: "Delete",
                        icon: <Trash2 size={16} />,
                        danger: true,
                        onClick: () => alert("Delete clicked"),
                      },
                    ]}
                  />
                </div>
              }
            />
          </section>

          {/* Menu Item Options */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Menu Item Options
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Each item supports icons, labels, click handlers, disabled state,
              separators, danger styling, and per-item styling.
            </p>

            <CodeBlock
              language="jsx"
              code={`const items = [
  {
    label: "Edit",
    icon: <Edit size={16} />,
    onClick: handleEdit,
  },
  {
    label: "Duplicate",
    icon: <Copy size={16} />,
    onClick: handleDuplicate,
  },
  { separator: true },
  {
    label: "Delete",
    icon: <Trash2 size={16} />,
    danger: true,
    onClick: handleDelete,
  },
  {
    label: "Disabled",
    disabled: true,
  },
];`}
            />

            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-foreground">
              <li>
                <code>label</code>: menu item text or React node.
              </li>
              <li>
                <code>icon</code>: optional icon before the label.
              </li>
              <li>
                <code>onClick</code>: action when the item is selected.
              </li>
              <li>
                <code>href</code>: available in the item type, but the current
                renderer uses buttons; use <code>onClick</code> for navigation.
              </li>
              <li>
                <code>danger</code>: highlights destructive actions.
              </li>
              <li>
                <code>disabled</code>: disables the item and prevents clicks.
              </li>
              <li>
                <code>separator</code>: renders a divider line between sections.
              </li>
              <li>
                <code>className</code> and <code>style</code>: customize item
                styling.
              </li>
            </ul>
          </section>

          {/* Controlled Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Controlled Dropdown
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Use <code>open</code> and <code>onOpenChange</code> when you need
              explicit visibility control or want to sync the menu state with
              other UI.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`const [open, setOpen] = useState(false);

<Dropdown
  trigger={<button>Open menu</button>}
  open={open}
  onOpenChange={setOpen}
  items={items}
/>`}
              previewContent={
                <div className="w-full flex flex-col items-center gap-4">
                  <Dropdown
                    trigger={
                      <button className="text-sm">Controlled Menu</button>
                    }
                    open={controlledOpen}
                    onOpenChange={setControlledOpen}
                    items={[
                      {
                        label: "Save",
                        onClick: () => alert("Save clicked"),
                      },
                      {
                        label: "Publish",
                        onClick: () => alert("Publish clicked"),
                      },
                      { separator: true },
                      {
                        label: "Remove",
                        danger: true,
                        onClick: () => alert("Remove clicked"),
                      },
                    ]}
                  />

                  <button
                    onClick={() => setControlledOpen((value) => !value)}
                    className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 transition"
                  >
                    Toggle controlled dropdown
                  </button>
                </div>
              }
            />
          </section>

          {/* Alignment & Width */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Alignment & Width
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Use <code>align</code> to anchor the menu left or right, and
              <code>width</code> to control the panel width.
            </p>

            <CodeBlock
              language="jsx"
              code={`<Dropdown
  trigger={<button>Right aligned</button>}
  align="right"
  width={240}
  items={items}
/>

<Dropdown
  trigger={<button>Left aligned</button>}
  align="left"
  width={260}
  items={items}
/>`}
            />
          </section>

          {/* Close Behavior */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Close Behavior
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              By default the dropdown closes when an item is clicked. Use{" "}
              <code>closeOnClick={false}</code> to keep the menu open.
            </p>

            <CodeBlock
              language="jsx"
              code={`<Dropdown
  trigger={<button>Keep open</button>}
  closeOnClick={false}
  items={items}
/>`}
            />
          </section>

          {/* Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Styling
            </h2>
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Use wrapper, menu, and item class props for shared styling. Use
              <code> className</code> or <code>style</code> on an individual
              item when only one action needs custom styling.
            </p>

            <CodeBlock
              language="jsx"
              code={`<Dropdown
  trigger={<button>Styled menu</button>}
  width={260}
  className="inline-flex"
  menuClassName="rounded-xl"
  itemClassName="font-medium"
  menuStyle={{ padding: 4 }}
  items={[
    { label: "Edit", icon: <Edit size={16} /> },
    {
      label: "Custom item",
      className: "text-primary",
      style: { letterSpacing: 0 },
    },
  ]}
/>`}
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Props Table
            </h2>

            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-accent text-foreground">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border text-foreground">
                  <tr>
                    <td className="p-3">trigger</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Element that toggles dropdown.</td>
                  </tr>

                  <tr>
                    <td className="p-3">items</td>
                    <td className="p-3">DropdownItem[]</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Array of action items or separator entries.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">open</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controlled open state.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onOpenChange</td>
                    <td className="p-3">(open: boolean) =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when state changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">align</td>
                    <td className="p-3">"left" | "right"</td>
                    <td className="p-3">"right"</td>
                    <td className="p-3">Menu alignment.</td>
                  </tr>

                  <tr>
                    <td className="p-3">width</td>
                    <td className="p-3">number</td>
                    <td className="p-3">220</td>
                    <td className="p-3">Dropdown menu width in pixels.</td>
                  </tr>

                  <tr>
                    <td className="p-3">closeOnClick</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">
                      Close dropdown when item is clicked.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Wrapper styling for the trigger container.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">menuClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Dropdown container styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">itemClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Item styling for every menu entry.</td>
                  </tr>

                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for the wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">menuStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles for the dropdown menu panel.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-foreground">
              <div className="flex items-start gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"<Dropdown items={{}} />"}</code>
                  <p className="text-xs mt-1">
                    items must be an array, not an object
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{"<Dropdown trigger='Open' />"}</code>
                  <p className="text-xs mt-1">
                    A string is allowed, but a button-like element gives users a
                    clearer interactive target.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-destructive">
                <X size={16} />
                <div>
                  <code>{'{ label: "Docs", href: "/docs" }'}</code>
                  <p className="text-xs mt-1">
                    Items render as buttons, so use <code>onClick</code> for
                    navigation behavior.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{'<Dropdown align="left" />'}</code>
                  <p className="text-xs mt-1">
                    Use align prop for positioning instead of hacks
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Pro Tips
            </h2>

            <ul className="list-disc list-inside text-foreground space-y-2 text-sm">
              <li>
                Use <code>separator</code> to visually group actions.
              </li>
              <li>
                Use <code>danger</code> for destructive actions like delete.
              </li>
              <li>
                Combine Dropdown with your <code>Button</code> component for
                consistent UI.
              </li>
              <li>
                Use controlled mode (<code>open</code>) for advanced flows.
              </li>
              <li>Keep item labels short and action-focused.</li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default DropdownDocs;
