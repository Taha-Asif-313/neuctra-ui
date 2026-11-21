"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, FilePlus, FolderOpen, Download, Trash2, Undo2, Redo2, Search, Settings, Users, CreditCard, Receipt } from "lucide-react";
import { Menubar, Button } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const menubarFaq = buildComponentFaq("Menubar");

function EditorMenubarDemo() {
  const [lastAction, setLastAction] = useState("None");
  const run = (label) => () => setLastAction(label);
  return (
    <div className="space-y-3">
      <Menubar
        ariaLabel="Document editor"
        menus={[
          {
            id: "file",
            label: "File",
            items: [
              { label: "New document", icon: <FilePlus />, shortcut: "Ctrl N", onSelect: run("New document") },
              { label: "Open...", icon: <FolderOpen />, shortcut: "Ctrl O", onSelect: run("Open") },
              {
                label: "Export as",
                icon: <Download />,
                submenu: [
                  { label: "PDF", onSelect: run("Export PDF") },
                  { label: "Word (.docx)", onSelect: run("Export Word") },
                  { label: "Markdown", onSelect: run("Export Markdown") },
                ],
              },
              { label: "Move to trash", icon: <Trash2 />, danger: true, separatorBefore: true, onSelect: run("Move to trash") },
            ],
          },
          {
            id: "edit",
            label: "Edit",
            items: [
              { label: "Undo", icon: <Undo2 />, shortcut: "Ctrl Z", onSelect: run("Undo") },
              { label: "Redo", icon: <Redo2 />, shortcut: "Ctrl Y", disabled: true },
              { label: "Find and replace", icon: <Search />, shortcut: "Ctrl H", separatorBefore: true, onSelect: run("Find and replace") },
            ],
          },
          {
            id: "view",
            label: "View",
            items: [
              { label: "Show outline", onSelect: run("Show outline") },
              { label: "Full screen", shortcut: "F11", onSelect: run("Full screen") },
            ],
          },
        ]}
      />
      <p className="text-xs text-muted-foreground">Last action: {lastAction}</p>
    </div>
  );
}

function ControlledMenubarDemo() {
  const [active, setActive] = useState(null);
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Menubar
        orientation="vertical"
        activeMenuId={active}
        onActiveMenuChange={setActive}
        menus={[
          {
            id: "workspace",
            label: "Workspace",
            items: [
              { label: "Settings", icon: <Settings /> },
              { label: "Members", icon: <Users /> },
            ],
          },
          {
            id: "billing",
            label: "Billing",
            items: [
              { label: "Plans", icon: <CreditCard /> },
              { label: "Invoices", icon: <Receipt /> },
            ],
          },
        ]}
      />
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Open menu: {active ?? "none"}</p>
        <Button size="xs" variant="outline" onClick={() => setActive("billing")}>
          Open Billing
        </Button>
      </div>
    </div>
  );
}

const MenubarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Menubar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A desktop-style application menubar, like File, Edit and View in an editor. It has a single tab stop with arrow-key navigation between menus, opens menus from the keyboard or pointer, supports shortcuts, separators, danger and disabled items and flyout submenus, and closes on Escape or outside click.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Menubar-import">
          <h2
            id="Menubar-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Menubar } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Menubar-example-0">
          <h2
            id="Menubar-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass menus with items. Once a menu is open, hovering or pressing Arrow Left and Right switches menus. separatorBefore draws a divider and submenu adds a flyout.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function EditorMenubarDemo() {
  const [lastAction, setLastAction] = useState("None");
  const run = (label) => () => setLastAction(label);
  return (
    <div className="space-y-3">
      <Menubar
        ariaLabel="Document editor"
        menus={[
          {
            id: "file",
            label: "File",
            items: [
              { label: "New document", icon: <FilePlus />, shortcut: "Ctrl N", onSelect: run("New document") },
              { label: "Open...", icon: <FolderOpen />, shortcut: "Ctrl O", onSelect: run("Open") },
              {
                label: "Export as",
                icon: <Download />,
                submenu: [
                  { label: "PDF", onSelect: run("Export PDF") },
                  { label: "Word (.docx)", onSelect: run("Export Word") },
                  { label: "Markdown", onSelect: run("Export Markdown") },
                ],
              },
              { label: "Move to trash", icon: <Trash2 />, danger: true, separatorBefore: true, onSelect: run("Move to trash") },
            ],
          },
          {
            id: "edit",
            label: "Edit",
            items: [
              { label: "Undo", icon: <Undo2 />, shortcut: "Ctrl Z", onSelect: run("Undo") },
              { label: "Redo", icon: <Redo2 />, shortcut: "Ctrl Y", disabled: true },
              { label: "Find and replace", icon: <Search />, shortcut: "Ctrl H", separatorBefore: true, onSelect: run("Find and replace") },
            ],
          },
          {
            id: "view",
            label: "View",
            items: [
              { label: "Show outline", onSelect: run("Show outline") },
              { label: "Full screen", shortcut: "F11", onSelect: run("Full screen") },
            ],
          },
        ]}
      />
      <p className="text-xs text-muted-foreground">Last action: {lastAction}</p>
    </div>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <EditorMenubarDemo />
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="Menubar-example-1">
          <h2
            id="Menubar-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size switches trigger and row density between sm and md (default).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Menubar
  size="sm"
  menus={[
    { id: "file", label: "File", items: [{ label: "Save", shortcut: "Ctrl S" }] },
    { id: "edit", label: "Edit", items: [{ label: "Copy", shortcut: "Ctrl C" }] },
  ]}
/>
<Menubar
  size="md"
  menus={[
    { id: "file", label: "File", items: [{ label: "Save", shortcut: "Ctrl S" }] },
    { id: "edit", label: "Edit", items: [{ label: "Copy", shortcut: "Ctrl C" }] },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Menubar
                  size="sm"
                  menus={[
                    { id: "file", label: "File", items: [{ label: "Save", shortcut: "Ctrl S" }] },
                    { id: "edit", label: "Edit", items: [{ label: "Copy", shortcut: "Ctrl C" }] },
                  ]}
                />
                <Menubar
                  size="md"
                  menus={[
                    { id: "file", label: "File", items: [{ label: "Save", shortcut: "Ctrl S" }] },
                    { id: "edit", label: "Edit", items: [{ label: "Copy", shortcut: "Ctrl C" }] },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Vertical and Controlled */}
        <section aria-labelledby="Menubar-example-2">
          <h2
            id="Menubar-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Vertical and Controlled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            orientation="vertical" stacks triggers and opens menus to the side. activeMenuId with onActiveMenuChange controls which menu is open.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function ControlledMenubarDemo() {
  const [active, setActive] = useState(null);
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Menubar
        orientation="vertical"
        activeMenuId={active}
        onActiveMenuChange={setActive}
        menus={[
          {
            id: "workspace",
            label: "Workspace",
            items: [
              { label: "Settings", icon: <Settings /> },
              { label: "Members", icon: <Users /> },
            ],
          },
          {
            id: "billing",
            label: "Billing",
            items: [
              { label: "Plans", icon: <CreditCard /> },
              { label: "Invoices", icon: <Receipt /> },
            ],
          },
        ]}
      />
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Open menu: {active ?? "none"}</p>
        <Button size="xs" variant="outline" onClick={() => setActive("billing")}>
          Open Billing
        </Button>
      </div>
    </div>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledMenubarDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Menubar-props">
          <h2
            id="Menubar-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Menubar components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            Menubar
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menus
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    MenubarMenuData[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Menus rendered in order along the bar (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    activeMenuId
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string | null
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled id of the open menu; null for none.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultActiveMenuId
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string | null
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">null</td>
                  <td className="p-3">Initially open menu in uncontrolled mode.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onActiveMenuChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (id: string | null) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Fired whenever a menu opens, switches or closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    orientation
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "horizontal" | "vertical"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"horizontal"</td>
                  <td className="p-3">Layout direction and arrow-key axis.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"md"</td>
                  <td className="p-3">Trigger and row density.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ariaLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Accessible name of the menubar.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the menubar root.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the menubar root.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    triggerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every top-level trigger.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menuClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every dropdown panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every item row.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            MenubarMenu
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menu
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    MenubarMenuData
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Menu data: id, label and items (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    active
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Whether the panel is visible.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onActivate
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called when the trigger is pressed.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onHover
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called when the trigger is hovered.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onClose
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called after a selection to close the panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    orientation
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "horizontal" | "vertical"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"horizontal"</td>
                  <td className="p-3">Layout direction used for panel placement.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"md"</td>
                  <td className="p-3">Trigger and row density.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    autoFocusFirstItem
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Focuses the first item when the panel opens.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    triggerTabIndex
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Tab index of the trigger, used for roving focus.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the menu wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the menu wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    triggerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the trigger button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menuClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the dropdown panel and submenu panels.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every item row.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            MenubarMenuData
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    id
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Stable id used for active-menu state (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Top-level label shown in the bar (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    MenubarItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Items shown when the menu is open (required).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            MenubarItem
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Visible item label (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    id
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Stable identifier for the item.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Optional leading icon.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    shortcut
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Keyboard shortcut hint shown on the right.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Disables the item and skips it in navigation.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    danger
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Styles the item as destructive.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    separatorBefore
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Draws a divider above the item.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onSelect
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs when the item is chosen; the menu then closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    submenu
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    MenubarItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Nested items shown in a flyout (one level deep).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Menubar-a11y">
          <h2
            id="Menubar-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The root is role="menubar" with aria-orientation. Triggers are menuitems with aria-haspopup, aria-expanded and aria-controls; panels are role="menu".</li>
            <li>Only one trigger is in the tab order. Arrow Left and Right (Up and Down when vertical) move between triggers, Home and End jump to the ends.</li>
            <li>Arrow Down, Enter or Space opens a menu and focuses its first item. Inside a menu, Arrow Up and Down move between enabled items, Arrow Right opens a submenu and Arrow Left closes it.</li>
            <li>With a menu open, Arrow Left and Right move to the neighbouring menu and keep it open.</li>
            <li>Escape closes the open menu and returns focus to its trigger; Tab closes it too. Clicking outside closes it.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={menubarFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default MenubarDocs;
