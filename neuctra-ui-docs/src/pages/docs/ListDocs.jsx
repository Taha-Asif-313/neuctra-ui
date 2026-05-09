"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/docs/CodePreviewBlock";
import CodeBlock from "../../components/docs/CodeBlock";
import { List } from "@neuctra/ui";
import {
  Bell,
  Check,
  CreditCard,
  FileText,
  Folder,
  Home,
  LogOut,
  MoreHorizontal,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import DocsFooter from "../../components/docs/DocsFooter";

const basicItems = [
  { text: "First item" },
  { text: "Second item" },
  {
    text: "Third item",
    subItems: [{ text: "Nested A" }, { text: "Nested B" }],
  },
];

const navItems = [
  {
    id: "home",
    text: "Dashboard",
    description: "Overview and activity",
    icon: <Home size={16} />,
    href: "/dashboard",
    active: true,
    trailing: <span className="text-xs">⌘1</span>,
  },
  {
    id: "team",
    text: "Team",
    description: "Members and roles",
    icon: <Users size={16} />,
    trailing: <span className="text-xs text-foreground">12</span>,

  },
  {
    id: "settings",
    text: "Settings",
    icon: <Settings size={16} />,
    href: "/settings",
  },
];

const menuItems = [
  { text: "New file", icon: <FileText size={15} />, shortcut: "N" },
  { text: "New folder", icon: <Folder size={15} />, shortcut: "F" },
  { separator: true },
  {
    text: "Billing",
    icon: <CreditCard size={15} />,
    trailing: <span className="text-xs text-primary">Pro</span>,
  },
  {
    text: "Security",
    icon: <Shield size={15} />,
    trailing: <MoreHorizontal size={15} />,
  },
  { separator: true },
  { text: "Sign out", icon: <LogOut size={15} />, danger: true },
];

const propRows = [
  ["title", "ReactNode", "-", "Optional heading above the list."],
  ["titleIcon", "ReactNode", "-", "Icon rendered before the title."],
  ["description", "ReactNode", "-", "Supporting text under the title."],
  [
    "items",
    "ListItemType[]",
    "-",
    "Main data source for rows and nested rows.",
  ],
  [
    "type",
    '"unordered" | "ordered" | "inline"',
    '"unordered"',
    "Controls list layout.",
  ],
  [
    "variant",
    '"default" | "nav" | "menu" | "card" | "ghost"',
    '"default"',
    "Changes row styling for content lists, navs, menus, and cards.",
  ],
  ["size", '"sm" | "md" | "lg"', '"md"', "Controls row text scale."],
  [
    "density",
    '"compact" | "normal" | "comfortable"',
    '"normal"',
    "Controls row padding.",
  ],
  [
    "nestedMode",
    '"always" | "collapse"',
    '"collapse"',
    "Controls whether nested items are always visible or collapsible.",
  ],
  [
    "bulletVariant",
    '"dot" | "line" | "number" | "none"',
    '"dot"',
    "Custom marker style when showBullets is enabled.",
  ],
  ["showTree", "boolean", "false", "Shows hierarchy connector lines."],
  [
    "showBullets",
    "boolean",
    "false",
    "Shows custom markers when rows have no icon.",
  ],
  ["showDividers", "boolean", "false", "Adds borders between rows."],
  ["interactive", "boolean", "true", "Enables clickable row behavior."],
  ["fullWidth", "boolean", "true", "Makes the root fill available width."],
  ["disabled", "boolean", "false", "Disables all list items."],
  ["activeItemId", "string | number", "-", "Controlled active item id."],
  [
    "defaultActiveItemId",
    "string | number",
    "-",
    "Initial active item id for uncontrolled usage.",
  ],
  [
    "onActiveChange",
    "(id, item) => void",
    "-",
    "Called when a selectable item is activated.",
  ],
  [
    "expandedIds",
    "Array<string | number>",
    "-",
    "Controlled expanded submenu ids.",
  ],
  [
    "defaultExpandedIds",
    "Array<string | number>",
    "[]",
    "Initial expanded submenu ids for uncontrolled usage.",
  ],
  [
    "onExpandedChange",
    "(ids) => void",
    "-",
    "Called when collapsible submenu state changes.",
  ],
  ["role", "string", "-", "Role applied to the ul/ol element."],
  ["ariaLabel", "string", "-", "Accessible label for the list element."],
  [
    "emptyState",
    "ReactNode",
    '"No items to show."',
    "Rendered when items are empty.",
  ],
  [
    "linkComponent",
    "ElementType",
    '"a"',
    "Custom link component for routers such as Link.",
  ],
  [
    "renderItem",
    "(params) => ReactNode",
    "-",
    "Full custom row renderer with active, expanded, toggle, and select helpers.",
  ],
];

const itemRows = [
  ["id", "string | number", "-", "Stable id for active and expanded state."],
  ["text", "ReactNode", "-", "Primary row label. Legacy-friendly alias."],
  ["label", "ReactNode", "-", "Primary row label alternative."],
  ["description", "ReactNode", "-", "Secondary text under the label."],
  ["icon", "ReactNode", "-", "Leading icon."],
  ["leading", "ReactNode", "-", "Leading custom content. Falls back to icon."],
  ["trailing", "ReactNode", "-", "Trailing custom content."],
  ["badge", "ReactNode", "-", "Small badge beside the row label."],
  ["shortcut", "ReactNode", "-", "Keyboard shortcut hint."],
  ["href", "string", "-", "Renders the item as a link."],
  [
    "target",
    "HTMLAttributeAnchorTarget",
    "-",
    "Anchor target, such as _blank.",
  ],
  ["rel", "string", "auto", "Anchor rel. _blank defaults to noreferrer."],
  ["download", "boolean | string", "-", "Anchor download attribute."],
  ["onClick", "(event, item) => void", "-", "Click handler for the row."],
  ["subItems", "ListItemType[]", "-", "Nested children."],
  ["items", "ListItemType[]", "-", "Nested children alias."],
  ["expanded", "boolean", "-", "Per-item controlled expanded state."],
  ["defaultExpanded", "boolean", "-", "Initial expanded state for the item."],
  [
    "collapsible",
    "boolean",
    "true in collapse mode",
    "Controls the submenu chevron behavior.",
  ],
  ["active", "boolean", "false", "Marks the item active."],
  ["disabled", "boolean", "false", "Disables the item."],
  ["danger", "boolean", "false", "Applies destructive styling."],
  ["separator", "boolean", "false", "Renders a divider row."],
  ["hidden", "boolean", "false", "Excludes the item from rendering."],
  ["title", "string", "-", "Native title attribute."],
  ["ariaLabel", "string", "-", "Accessible label for the row."],
  ["role", "string", "-", "Role applied to the li element."],
  [
    "className / style",
    "string / CSSProperties",
    "-",
    "Per-item wrapper customization.",
  ],
  [
    "contentClassName / contentStyle",
    "string / CSSProperties",
    "-",
    "Per-item clickable/content row customization.",
  ],
];

const styleRows = [
  ["className", "style", "Root wrapper."],
  ["headerClassName", "headerStyle", "Title and description wrapper."],
  ["listClassName", "listStyle", "ul/ol element."],
  ["itemClassName", "itemStyle", "li wrapper."],
  [
    "itemContentClassName",
    "itemContentStyle",
    "Clickable row/content wrapper.",
  ],
  ["titleClassName", "titleStyle", "List heading."],
  ["descriptionClassName", "descriptionStyle", "List heading description."],
  ["bulletClassName", "bulletStyle", "Custom bullet marker."],
  ["textClassName", "textStyle", "Item label text."],
  ["iconClassName", "iconStyle", "Title and item icons."],
  ["badgeClassName", "badgeStyle", "Item badge."],
  ["shortcutClassName", "shortcutStyle", "Shortcut kbd element."],
  ["trailingClassName", "trailingStyle", "Trailing item content."],
  ["subListClassName", "subListStyle", "Nested ul element."],
  ["separatorClassName", "separatorStyle", "Separator row."],
];

const PropTable = ({
  rows,
  columns = ["Prop", "Type", "Default", "Description"],
}) => (
  <div className="border border-zinc-800 rounded-xl overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-zinc-900 text-gray-200">
        <tr>
          {columns.map((column) => (
            <th key={column} className="text-left p-3">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800 text-gray-300">
        {rows.map((row) => (
          <tr key={row.join("-")}>
            {row.map((cell, index) => (
              <td key={`${row[0]}-${index}`} className="p-3">
                {index === 0 ? <code>{cell}</code> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ListDocs = () => {
  return (
    <>
      <Metadata
        title="List Component - Neuctra UI"
        description="Flexible List component for content lists, nav drawers, submenus, dropdown menus, icon lists, and nested tree lists."
        keywords="React List component, navigation list, menu list, nested list, tree list, icon list, Neuctra UI"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              List Component
            </h1>

            <p className="text-sm leading-relaxed text-gray-200">
              The <span className="text-primary font-semibold">List</span>{" "}
              component is a flexible UI primitive for simple lists, icon lists,
              drawer navigation, dropdown menus, nested submenus, and tree-style
              structures. Items can render as static content, buttons, or links,
              with optional leading and trailing content.
            </p>

            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Use <code>variant</code>, <code>density</code>, and{" "}
              <code>size</code> for visual tone, <code>href</code> or{" "}
              <code>onClick</code> for actions, and <code>subItems</code> with{" "}
              <code>defaultExpandedIds</code> for submenu-style navigation.
              Bullets are off by default so lists drop cleanly into drawers,
              sidebars, and menus.
            </p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { List } from "@neuctra/ui";`} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a normal content list. Static rows render as content,
              while rows with links, clicks, or children become interactive.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { List } from "@neuctra/ui";

function BasicExample() {
  const items = [
    { text: "First item" },
    { text: "Second item" },
    {
      text: "Third item",
      subItems: [
        { text: "Nested A" },
        { text: "Nested B" }
      ]
    }
  ];

  return <List items={items} />;
}`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  items={[
    { text: "First item" },
    { text: "Second item" },
    {
      text: "Third item",
      subItems: [
        { text: "Nested A" },
        { text: "Nested B" }
      ]
    }
  ]}
/>`}
              previewContent={<List items={basicItems} />}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Navigation Drawer
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  title="Workspace"
  description="Drawer friendly navigation"
  variant="nav"
  density="comfortable"
  defaultExpandedIds={["team"]}
  items={[
    {
      id: "home",
      text: "Dashboard",
      description: "Overview and activity",
      icon: <Home size={16} />,
      href: "/dashboard",
      active: true,
      trailing: "⌘1",
    },
    {
      id: "team",
      text: "Team",
      icon: <Users size={16} />,
      trailing: "12",
    },
  ]}
/>`}
              previewContent={
                <div className="max-w-sm">
                  <List
                    title="Workspace"
                    description="Drawer friendly navigation"
                    variant="nav"
                    density="comfortable"
                    defaultExpandedIds={["team"]}
                    items={navItems}
                  />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Dropdown Menu List
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  variant="menu"
  density="compact"
  items={[
    { text: "New file", icon: <FileText size={15} />, shortcut: "N" },
    { text: "New folder", icon: <Folder size={15} />, shortcut: "F" },
    { separator: true },
    { text: "Billing", icon: <CreditCard size={15} />, trailing: "Pro" },
    { text: "Security", icon: <Shield size={15} />, trailing: <MoreHorizontal size={15} /> },
    { separator: true },
    { text: "Sign out", icon: <LogOut size={15} />, danger: true },
  ]}
/>`}
              previewContent={
                <div className="max-w-xs">
                  <List variant="menu" density="compact" items={menuItems} />
                </div>
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              List Types And Markers
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<List
  title="Inline Navigation"
  type="inline"
  variant="ghost"
  items={[
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Inline Navigation"
                    type="inline"
                    variant="ghost"
                    items={[
                      { text: "Home", href: "/" },
                      { text: "About", href: "/about" },
                      { text: "Contact", href: "/contact" },
                    ]}
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<List
  title="Setup Steps"
  showBullets
  bulletVariant="number"
  items={[
    { text: "Install dependencies" },
    { text: "Configure project" },
    { text: "Run application" },
  ]}
/>`}
                previewContent={
                  <List
                    title="Setup Steps"
                    showBullets
                    bulletVariant="number"
                    items={[
                      { text: "Install dependencies" },
                      { text: "Configure project" },
                      { text: "Run application" },
                    ]}
                  />
                }
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Cards And Icon Lists
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  variant="card"
  size="lg"
  density="comfortable"
  items={[
    {
      text: "Notifications",
      description: "User alerts and product updates",
      icon: <Bell size={18} />,
      trailing: "Live",
    },
    {
      text: "Security",
      description: "Audit logs, permissions, and sessions",
      icon: <Shield size={18} />,
      trailing: <MoreHorizontal size={16} />,
    },
  ]}
/>`}
              previewContent={
                <List
                  variant="card"
                  size="lg"
                  density="comfortable"
                  items={[
                    {
                      text: "Notifications",
                      description: "User alerts and product updates",
                      icon: <Bell size={18} />,
                      trailing: (
                        <span className="text-xs text-primary">Live</span>
                      ),
                    },
                    {
                      text: "Security",
                      description: "Audit logs, permissions, and sessions",
                      icon: <Shield size={18} />,
                      trailing: <MoreHorizontal size={16} />,
                    },
                  ]}
                />
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Tree View
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<List
  showTree
  nestedMode="always"
  items={[
    {
      text: "Project",
      subItems: [
        { text: "src" },
        { text: "package.json" },
      ],
    },
  ]}
/>`}
              previewContent={
                <List items={basicItems} showTree nestedMode="always" />
              }
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Item Structure
            </h2>

            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              Each item supports static content, link rows, button rows,
              separators, metadata, and nested submenus.
            </p>

            <CodeBlock
              language="tsx"
              code={`type ListItemType = {
  id?: string | number;
  text?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  badge?: ReactNode;
  shortcut?: ReactNode;

  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: (event, item) => void;

  subItems?: ListItemType[];
  items?: ListItemType[];
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  hidden?: boolean;
};`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              List Props
            </h2>
            <PropTable rows={propRows} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ListItemType Props
            </h2>
            <PropTable rows={itemRows} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Styling Hooks
            </h2>
            <PropTable
              columns={["Class Prop", "Style Prop", "Target"]}
              rows={styleRows}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<List primaryColor="#f00" />'}</code>
                  <p className="text-xs text-gray-400">
                    This prop does not exist. Use semantic theme classes or the
                    class/style hooks.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{"{ text: 'Team', subItems: [...] }"}</code>
                  <p className="text-xs text-gray-400">
                    In collapse mode, nested items start collapsed unless you
                    use <code>defaultExpanded</code>,{" "}
                    <code>defaultExpandedIds</code>, or{" "}
                    <code>nestedMode="always"</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>
                    {'<List variant="nav" defaultExpandedIds={["team"]} />'}
                  </code>
                  <p className="text-xs text-gray-400">
                    Use stable item ids for active and expanded navigation
                    state.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Use <code>variant="nav"</code> inside drawers and sidebars.
              </li>
              <li>
                Use <code>variant="menu"</code> with{" "}
                <code>density="compact"</code> for dropdown menus.
              </li>
              <li>
                Prefer stable <code>id</code> values when using active or
                expanded state.
              </li>
              <li>
                Pass a router <code>Link</code> through{" "}
                <code>linkComponent</code> when using client-side navigation.
              </li>
              <li>
                Use <code>renderItem</code> only when class and item props are
                not enough.
              </li>
            </ul>
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ListDocs;
