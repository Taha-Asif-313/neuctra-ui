"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, FolderOpen, Pencil, Copy, Share2, Link2, Mail, Download, Trash2, FileText, ClipboardPaste, ShieldCheck, UserMinus } from "lucide-react";
import { ContextMenu, Card, CardBody, Avatar, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const contextMenuFaq = buildComponentFaq("ContextMenu");

function MemberRowsDemo() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { id: 2, name: "Leo Park", email: "leo@acme.com", role: "Editor" },
    { id: 3, name: "Sara Ali", email: "sara@acme.com", role: "Viewer" },
  ]);
  const [open, setOpen] = useState(false);
  const setRole = (id, role) =>
    setMembers((list) => list.map((m) => (m.id === id ? { ...m, role } : m)));
  return (
    <Card className="w-full max-w-lg">
      <CardBody className="space-y-1 p-2">
        {members.map((member) => (
          <ContextMenu
            key={member.id}
            className="block"
            onOpenChange={setOpen}
            items={[
              {
                label: "Change role",
                icon: <ShieldCheck />,
                submenu: ["Admin", "Editor", "Viewer"].map((role) => ({
                  label: role,
                  onClick: () => setRole(member.id, role),
                })),
              },
              { label: "Copy email", icon: <Copy /> },
              { separator: true },
              {
                label: "Remove from team",
                icon: <UserMinus />,
                danger: true,
                onClick: () => setMembers((list) => list.filter((m) => m.id !== member.id)),
              },
            ]}
          >
            <div
              tabIndex={0}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar size="sm" fallback={member.name.split(" ").map((p) => p[0]).join("")} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">{member.email}</p>
              </div>
              <Badge text={member.role} variant="soft" size="sm" />
            </div>
          </ContextMenu>
        ))}
        <p className="px-3 pt-2 text-xs text-muted-foreground">
          Right-click a member. Menu open: {String(open)}
        </p>
      </CardBody>
    </Card>
  );
}

const ContextMenuDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ContextMenu Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A menu that opens at the pointer on right-click, or at the focused element with the keyboard context-menu key or Shift+F10. It supports icons, shortcut hints, separators, danger and disabled rows, and one level of flyout submenus, and stays inside the viewport.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="ContextMenu-import">
          <h2
            id="ContextMenu-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { ContextMenu } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="ContextMenu-example-0">
          <h2
            id="ContextMenu-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wrap any area and pass items. Use &#123; separator: true &#125; for dividers, submenu for a flyout, danger for destructive rows and disabled for unavailable ones.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ContextMenu
  ariaLabel="File actions"
  className="w-full max-w-sm"
  items={[
    { label: "Open", icon: <FolderOpen />, shortcut: "Enter" },
    { label: "Rename", icon: <Pencil />, shortcut: "F2" },
    { label: "Duplicate", icon: <Copy />, shortcut: "Ctrl D" },
    { separator: true },
    {
      label: "Share",
      icon: <Share2 />,
      submenu: [
        { label: "Copy link", icon: <Link2 /> },
        { label: "Email to team", icon: <Mail /> },
      ],
    },
    { label: "Download", icon: <Download />, disabled: true },
    { separator: true },
    { label: "Move to trash", icon: <Trash2 />, danger: true, shortcut: "Del" },
  ]}
>
  <button
    type="button"
    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border bg-card p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <FileText size={20} className="shrink-0 text-muted-foreground" />
    <span className="min-w-0">
      <span className="block truncate text-sm font-medium text-foreground">Q3-board-deck.pdf</span>
      <span className="block text-xs text-muted-foreground">Right-click or press Shift+F10</span>
    </span>
  </button>
</ContextMenu>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ContextMenu
                  ariaLabel="File actions"
                  className="w-full max-w-sm"
                  items={[
                    { label: "Open", icon: <FolderOpen />, shortcut: "Enter" },
                    { label: "Rename", icon: <Pencil />, shortcut: "F2" },
                    { label: "Duplicate", icon: <Copy />, shortcut: "Ctrl D" },
                    { separator: true },
                    {
                      label: "Share",
                      icon: <Share2 />,
                      submenu: [
                        { label: "Copy link", icon: <Link2 /> },
                        { label: "Email to team", icon: <Mail /> },
                      ],
                    },
                    { label: "Download", icon: <Download />, disabled: true },
                    { separator: true },
                    { label: "Move to trash", icon: <Trash2 />, danger: true, shortcut: "Del" },
                  ]}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border bg-card p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <FileText size={20} className="shrink-0 text-muted-foreground" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">Q3-board-deck.pdf</span>
                      <span className="block text-xs text-muted-foreground">Right-click or press Shift+F10</span>
                    </span>
                  </button>
                </ContextMenu>
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="ContextMenu-example-1">
          <h2
            id="ContextMenu-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size switches the row density between sm and md (default).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ContextMenu
  size="sm"
  items={[
    { label: "Copy", icon: <Copy />, shortcut: "Ctrl C" },
    { label: "Paste", icon: <ClipboardPaste />, shortcut: "Ctrl V" },
    { label: "Select all", shortcut: "Ctrl A" },
  ]}
>
  <div className="flex h-24 w-56 items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted-foreground">
    size="sm"
  </div>
</ContextMenu>
<ContextMenu
  size="md"
  items={[
    { label: "Copy", icon: <Copy />, shortcut: "Ctrl C" },
    { label: "Paste", icon: <ClipboardPaste />, shortcut: "Ctrl V" },
    { label: "Select all", shortcut: "Ctrl A" },
  ]}
>
  <div className="flex h-24 w-56 items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted-foreground">
    size="md"
  </div>
</ContextMenu>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ContextMenu
                  size="sm"
                  items={[
                    { label: "Copy", icon: <Copy />, shortcut: "Ctrl C" },
                    { label: "Paste", icon: <ClipboardPaste />, shortcut: "Ctrl V" },
                    { label: "Select all", shortcut: "Ctrl A" },
                  ]}
                >
                  <div className="flex h-24 w-56 items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted-foreground">
                    size="sm"
                  </div>
                </ContextMenu>
                <ContextMenu
                  size="md"
                  items={[
                    { label: "Copy", icon: <Copy />, shortcut: "Ctrl C" },
                    { label: "Paste", icon: <ClipboardPaste />, shortcut: "Ctrl V" },
                    { label: "Select all", shortcut: "Ctrl A" },
                  ]}
                >
                  <div className="flex h-24 w-56 items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted-foreground">
                    size="md"
                  </div>
                </ContextMenu>
              </div>
            }
          />
        </section>

        {/* Example: Rows in a Team List */}
        <section aria-labelledby="ContextMenu-example-2">
          <h2
            id="ContextMenu-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Rows in a Team List
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A context menu per row, with a role submenu and a remove action that update state. onOpenChange reports when the menu opens or closes; className="block" lets the wrapper fill the row.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function MemberRowsDemo() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { id: 2, name: "Leo Park", email: "leo@acme.com", role: "Editor" },
    { id: 3, name: "Sara Ali", email: "sara@acme.com", role: "Viewer" },
  ]);
  const [open, setOpen] = useState(false);
  const setRole = (id, role) =>
    setMembers((list) => list.map((m) => (m.id === id ? { ...m, role } : m)));
  return (
    <Card className="w-full max-w-lg">
      <CardBody className="space-y-1 p-2">
        {members.map((member) => (
          <ContextMenu
            key={member.id}
            className="block"
            onOpenChange={setOpen}
            items={[
              {
                label: "Change role",
                icon: <ShieldCheck />,
                submenu: ["Admin", "Editor", "Viewer"].map((role) => ({
                  label: role,
                  onClick: () => setRole(member.id, role),
                })),
              },
              { label: "Copy email", icon: <Copy /> },
              { separator: true },
              {
                label: "Remove from team",
                icon: <UserMinus />,
                danger: true,
                onClick: () => setMembers((list) => list.filter((m) => m.id !== member.id)),
              },
            ]}
          >
            <div
              tabIndex={0}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar size="sm" fallback={member.name.split(" ").map((p) => p[0]).join("")} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">{member.email}</p>
              </div>
              <Badge text={member.role} variant="soft" size="sm" />
            </div>
          </ContextMenu>
        ))}
        <p className="px-3 pt-2 text-xs text-muted-foreground">
          Right-click a member. Menu open: {String(open)}
        </p>
      </CardBody>
    </Card>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <MemberRowsDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="ContextMenu-props">
          <h2
            id="ContextMenu-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the ContextMenu components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            ContextMenu
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
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Area that opens the menu (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ContextMenuItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Menu rows (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ariaLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Context menu"</td>
                  <td className="p-3">Accessible name of the menu.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"md"</td>
                  <td className="p-3">Row density.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Lets the browser's native context menu show instead.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Fired whenever the menu opens or closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the wrapper around children.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menuClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the floating menu panel and submenu panels.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    menuStyle
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the menu panel, merged with its position.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every menu row.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    separatorClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every separator line.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    submenuClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles submenu flyout panels only.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ...rest
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    HTMLAttributes&lt;HTMLDivElement&gt;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Other attributes are spread on the wrapper, including onContextMenu.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            ContextMenuItem
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
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Visible row label.</td>
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
                  <td className="p-3">Trailing shortcut hint rendered as a keycap.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onClick
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs when the row is activated; the menu then closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    danger
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Styles the row as destructive.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Makes the row non-interactive and skips it in navigation.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    separator
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Renders a divider line instead of a row.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    submenu
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ContextMenuItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Nested rows shown in a flyout (one level deep).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="ContextMenu-a11y">
          <h2
            id="ContextMenu-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The panel is role="menu" with rows as role="menuitem"; rows with a submenu set aria-haspopup and aria-expanded.</li>
            <li>The keyboard context-menu key and Shift+F10 open the menu and move focus into it (anchored to the focused element when the browser reports no pointer position), so focusable content inside the trigger area is reachable without a mouse.</li>
            <li>Arrow Up and Down move between enabled rows and wrap, Home and End jump to the ends, Enter or Space activates, Arrow Right opens a submenu and Arrow Left or Escape closes it.</li>
            <li>Escape or Tab closes the menu and returns focus to where it was. Clicking outside, scrolling or resizing also closes it.</li>
            <li>Rows show a visible focus ring, and the open animation is reduced to a fade with reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={contextMenuFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default ContextMenuDocs;
