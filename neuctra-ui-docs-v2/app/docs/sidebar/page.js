"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import {
  Accessibility,
  Archive,
  CreditCard,
  FileText,
  Inbox,
  Send,
  Settings,
  Star,
  Users,
  LayoutDashboard,
  FolderKanban,
} from "lucide-react";
import { Sidebar, Avatar, Button } from "@neuctra/ui";

const sidebarFaq = buildComponentFaq("Sidebar");

const mailSections = [
  {
    title: "Mail",
    items: [
      { id: "inbox", label: "Inbox", icon: <Inbox />, badge: 12 },
      { id: "starred", label: "Starred", icon: <Star /> },
      { id: "sent", label: "Sent", icon: <Send /> },
      { id: "drafts", label: "Drafts", icon: <FileText />, badge: 2 },
      { id: "archive", label: "Archive", icon: <Archive /> },
    ],
  },
];

const workspaceSections = [
  {
    title: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
      { id: "projects", label: "Projects", icon: <FolderKanban />, badge: 8 },
      { id: "members", label: "Members", icon: <Users /> },
    ],
  },
  {
    title: "Admin",
    items: [
      { id: "billing", label: "Billing", icon: <CreditCard />, disabled: true },
      { id: "settings", label: "Settings", icon: <Settings /> },
    ],
  },
];

const UserFooter = () => (
  <div className="flex items-center gap-2">
    <Avatar size="sm" fallback="MK" alt="Maya Khan" />
    <div className="min-w-0">
      <p className="truncate text-sm font-medium text-foreground">Maya Khan</p>
      <p className="truncate text-xs text-muted-foreground">maya@acme.io</p>
    </div>
  </div>
);

function MailSidebarDemo() {
  const [active, setActive] = useState("inbox");
  return (
    <div className="h-96 overflow-hidden rounded-xl border border-border">
      <Sidebar
        sections={mailSections}
        activeId={active}
        onSelect={setActive}
        ariaLabel="Mailboxes"
        header={<span className="text-sm font-semibold text-foreground">Acme Mail</span>}
        className="border-r-0"
      />
    </div>
  );
}

function CollapsibleSidebarDemo() {
  const [active, setActive] = useState("projects");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="space-y-3">
      <Button size="sm" variant="outline" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "Expand from outside" : "Collapse from outside"}
      </Button>
      <div className="h-96 overflow-hidden rounded-xl border border-border">
        <Sidebar
          sections={workspaceSections}
          activeId={active}
          onSelect={setActive}
          collapsible
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={<span className="text-sm font-semibold text-foreground">Northwind</span>}
          footer={collapsed ? <Avatar size="sm" fallback="MK" alt="Maya Khan" /> : <UserFooter />}
          className="border-r-0"
        />
      </div>
    </div>
  );
}

const PROPS = [
  ["sections", "SidebarSection[]", "-", "Grouped navigation entries (required)."],
  ["activeId", "string", "-", "Id of the currently active item."],
  ["onSelect", "(id: string) => void", "-", "Called with the id of a selected item."],
  ["collapsible", "boolean", "false", "Shows a collapse toggle in the top bar."],
  ["collapsed", "boolean", "-", "Controlled collapsed state."],
  ["defaultCollapsed", "boolean", "false", "Initial collapsed state in uncontrolled mode."],
  ["onCollapsedChange", "(collapsed: boolean) => void", "-", "Called whenever the collapsed state changes."],
  ["header", "ReactNode", "-", "Brand or workspace content at the top; hidden while collapsed."],
  ["footer", "ReactNode", "-", "Content pinned to the bottom of the sidebar."],
  ["ariaLabel", "string", '"Sidebar"', "Accessible name for the navigation landmark."],
  ["className", "string", "-", "Styles the nav root (default w-64, w-16 when collapsed)."],
  ["headerClassName", "string", "-", "Styles the top bar holding header and the toggle."],
  ["contentClassName", "string", "-", "Styles the scrollable list area."],
  ["sectionClassName", "string", "-", "Styles each section wrapper."],
  ["sectionTitleClassName", "string", "-", "Styles each section heading."],
  ["itemClassName", "string", "-", "Styles every item link or button."],
  ["activeItemClassName", "string", "-", "Styles the active item, applied after itemClassName."],
  ["iconClassName", "string", "-", "Styles item icon wrappers."],
  ["badgeClassName", "string", "-", "Styles item badges."],
  ["toggleClassName", "string", "-", "Styles the collapse toggle button."],
  ["footerClassName", "string", "-", "Styles the footer area."],
  ["style", "CSSProperties", "-", "Inline styles for the nav root."],
];

const ITEM_PROPS = [
  ["id", "string", "-", "Stable id reported through onSelect (required)."],
  ["label", "ReactNode", "-", "Visible item label (required). Kept for screen readers when collapsed."],
  ["icon", "ReactNode", "-", "Optional leading icon."],
  ["badge", "ReactNode", "-", "Optional trailing badge. Strings and numbers render as a Badge; other nodes render as-is."],
  ["href", "string", "-", "Renders the item as a link instead of a button."],
  ["onSelect", "(id: string) => void", "-", "Called before the root onSelect."],
  ["disabled", "boolean", "false", "Renders the item as non-interactive."],
];

const SECTION_PROPS = [
  ["title", "string", "-", "Optional heading above the items."],
  ["items", "SidebarItem[]", "-", "Items in this section (required)."],
];

const PropsTable = ({ rows }) => (
  <div className="border border-zinc-800 rounded-xl overflow-x-auto">
    <table className="w-full min-w-[640px] text-sm">
      <thead className="bg-zinc-900 text-gray-200">
        <tr>
          <th scope="col" className="text-left p-3">Prop</th>
          <th scope="col" className="text-left p-3">Type</th>
          <th scope="col" className="text-left p-3">Default</th>
          <th scope="col" className="text-left p-3">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800 text-gray-300">
        {rows.map(([name, type, def, description]) => (
          <tr key={name}>
            <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
            <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
            <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
            <td className="p-3">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SidebarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Sidebar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React sidebar navigation with grouped sections, active item
            styling, badges, optional collapsing, and header and footer slots
            for dashboard layouts.
          </p>
        </header>

        <section aria-labelledby="Sidebar-import">
          <h2 id="Sidebar-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { Sidebar } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="Sidebar-example-0">
          <h2 id="Sidebar-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass sections of items and track the active id. Items with a badge
            show a count on the right.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [active, setActive] = useState("inbox");

const sections = [
  {
    title: "Mail",
    items: [
      { id: "inbox", label: "Inbox", icon: <Inbox />, badge: 12 },
      { id: "starred", label: "Starred", icon: <Star /> },
      { id: "sent", label: "Sent", icon: <Send /> },
      { id: "drafts", label: "Drafts", icon: <FileText />, badge: 2 },
      { id: "archive", label: "Archive", icon: <Archive /> },
    ],
  },
];

<div className="h-96 overflow-hidden rounded-xl border border-border">
  <Sidebar
    sections={sections}
    activeId={active}
    onSelect={setActive}
    ariaLabel="Mailboxes"
    header={<span className="text-sm font-semibold text-foreground">Acme Mail</span>}
    className="border-r-0"
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <MailSidebarDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sidebar-example-1">
          <h2 id="Sidebar-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Collapsible and Controlled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            collapsible adds a toggle that shrinks the sidebar to an icon
            rail. Control it with collapsed and onCollapsedChange to sync it
            with your own buttons or saved preferences. Collapsed items keep
            their label for screen readers and show it as a tooltip.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [active, setActive] = useState("projects");
const [collapsed, setCollapsed] = useState(false);

<Button size="sm" variant="outline" onClick={() => setCollapsed(!collapsed)}>
  {collapsed ? "Expand from outside" : "Collapse from outside"}
</Button>

<div className="h-96 overflow-hidden rounded-xl border border-border">
  <Sidebar
    sections={sections}
    activeId={active}
    onSelect={setActive}
    collapsible
    collapsed={collapsed}
    onCollapsedChange={setCollapsed}
    header={<span className="text-sm font-semibold text-foreground">Northwind</span>}
    footer={collapsed ? <Avatar size="sm" fallback="MK" alt="Maya Khan" /> : <UserFooter />}
    className="border-r-0"
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <CollapsibleSidebarDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sidebar-example-2">
          <h2 id="Sidebar-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Links and Disabled Items
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Items with href render as links with aria-current="page" when
            active. Disabled items are dimmed and cannot be activated.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="h-96 overflow-hidden rounded-xl border border-border">
  <Sidebar
    activeId="settings"
    className="border-r-0"
    sections={[
      {
        title: "Workspace",
        items: [
          { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, href: "#dashboard" },
          { id: "members", label: "Members", icon: <Users />, href: "#members" },
        ],
      },
      {
        title: "Admin",
        items: [
          { id: "billing", label: "Billing", icon: <CreditCard />, href: "#billing", disabled: true },
          { id: "settings", label: "Settings", icon: <Settings />, href: "#settings" },
        ],
      },
    ]}
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="h-96 overflow-hidden rounded-xl border border-border">
                  <Sidebar
                    activeId="settings"
                    className="border-r-0"
                    sections={[
                      {
                        title: "Workspace",
                        items: [
                          { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, href: "#dashboard" },
                          { id: "members", label: "Members", icon: <Users />, href: "#members" },
                        ],
                      },
                      {
                        title: "Admin",
                        items: [
                          { id: "billing", label: "Billing", icon: <CreditCard />, href: "#billing", disabled: true },
                          { id: "settings", label: "Settings", icon: <Settings />, href: "#settings" },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sidebar-props">
          <h2 id="Sidebar-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Sidebar component. Other HTML
            attributes are forwarded to the nav element.
          </p>
          <PropsTable rows={PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">SidebarSection</h3>
          <PropsTable rows={SECTION_PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">SidebarItem</h3>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section aria-labelledby="Sidebar-a11y">
          <h2 id="Sidebar-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Renders a nav landmark named by ariaLabel, with each section as a list.</li>
            <li>The active item gets aria-current="page".</li>
            <li>The collapse toggle has aria-expanded, aria-controls and a label that switches between Expand and Collapse.</li>
            <li>When collapsed, item labels and section titles stay in the DOM as screen-reader text, so icon-only rows keep an accessible name. Hovering or focusing a collapsed row shows its label in a Tooltip.</li>
            <li>Every item shows a visible inset focus ring and is reachable with Tab; disabled buttons are skipped.</li>
          </ul>
        </section>

        <ComponentFaq qa={sidebarFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default SidebarDocs;
