"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Search, LayoutDashboard, FolderKanban, CreditCard, Plus, UserPlus, Download, Globe, Smartphone, Code2, Send, Copy, CheckCircle2 } from "lucide-react";
import { CommandPalette, Button, Kbd } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const commandPaletteFaq = buildComponentFaq("CommandPalette");

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" iconBefore={<Search size={16} />} onClick={() => setOpen(true)}>
        Search commands
        <Kbd size="sm" className="ml-2">Ctrl K</Kbd>
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        hotkey="k"
        placeholder="Search pages, projects and actions..."
        groups={[
          {
            heading: "Navigation",
            items: [
              { id: "dashboard", label: "Go to dashboard", icon: <LayoutDashboard />, shortcut: "G D" },
              { id: "projects", label: "Go to projects", icon: <FolderKanban />, shortcut: "G P" },
              { id: "billing", label: "Billing and invoices", icon: <CreditCard />, keywords: ["payment", "plan"] },
            ],
          },
          {
            heading: "Actions",
            items: [
              { id: "new-project", label: "Create project", icon: <Plus />, shortcut: "N" },
              { id: "invite", label: "Invite teammate", icon: <UserPlus />, description: "Send an email invite" },
              { id: "export", label: "Export workspace data", icon: <Download />, disabled: true },
            ],
          },
        ]}
      />
    </>
  );
}

function RecentCommandsDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("Nothing yet");
  const projects = [
    { id: "p-web", label: "Marketing website", icon: <Globe />, onSelect: () => setLast("Marketing website") },
    { id: "p-app", label: "Mobile app redesign", icon: <Smartphone />, onSelect: () => setLast("Mobile app redesign") },
    { id: "p-api", label: "Public API v2", icon: <Code2 />, onSelect: () => setLast("Public API v2") },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => setOpen(true)}>Open project</Button>
      <span className="text-sm text-muted-foreground">Last opened: {last}</span>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        placeholder="Find a project..."
        recentItems={[projects[1]]}
        recentHeading="Recently viewed"
        emptyMessage="No projects match your search."
        groups={[{ heading: "All projects", items: projects }]}
      />
    </div>
  );
}

function QuickActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Quick actions
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        searchable={false}
        ariaLabel="Quick actions"
        panelClassName="max-w-sm"
        groups={[
          {
            heading: "Invoice INV-2048",
            items: [
              { id: "send", label: "Send reminder", icon: <Send />, shortcut: "R" },
              { id: "duplicate", label: "Duplicate invoice", icon: <Copy />, shortcut: "D" },
              { id: "paid", label: "Mark as paid", icon: <CheckCircle2 />, shortcut: "P" },
            ],
          },
        ]}
      />
    </>
  );
}

const CommandPaletteDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            CommandPalette Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A searchable, keyboard-driven command menu in a modal overlay. Commands are grouped, filtered by label, description and keywords, navigated with the arrow keys and run with Enter. An optional Cmd or Ctrl hotkey toggles it from anywhere.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="CommandPalette-import">
          <h2
            id="CommandPalette-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { CommandPalette } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="CommandPalette-example-0">
          <h2
            id="CommandPalette-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass grouped commands and control open state. hotkey="k" also toggles the palette with Cmd+K or Ctrl+K. Disabled commands are skipped by the arrow keys, and keywords match without being shown.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" iconBefore={<Search size={16} />} onClick={() => setOpen(true)}>
        Search commands
        <Kbd size="sm" className="ml-2">Ctrl K</Kbd>
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        hotkey="k"
        placeholder="Search pages, projects and actions..."
        groups={[
          {
            heading: "Navigation",
            items: [
              { id: "dashboard", label: "Go to dashboard", icon: <LayoutDashboard />, shortcut: "G D" },
              { id: "projects", label: "Go to projects", icon: <FolderKanban />, shortcut: "G P" },
              { id: "billing", label: "Billing and invoices", icon: <CreditCard />, keywords: ["payment", "plan"] },
            ],
          },
          {
            heading: "Actions",
            items: [
              { id: "new-project", label: "Create project", icon: <Plus />, shortcut: "N" },
              { id: "invite", label: "Invite teammate", icon: <UserPlus />, description: "Send an email invite" },
              { id: "export", label: "Export workspace data", icon: <Download />, disabled: true },
            ],
          },
        ]}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <CommandPaletteDemo />
              </div>
            }
          />
        </section>

        {/* Example: Recent Items and Empty State */}
        <section aria-labelledby="CommandPalette-example-1">
          <h2
            id="CommandPalette-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Recent Items and Empty State
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            recentItems adds a group at the top while the search is empty. The same item can appear in both groups. Each item's onSelect runs before the palette closes; emptyMessage replaces the no-results text.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function RecentCommandsDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("Nothing yet");
  const projects = [
    { id: "p-web", label: "Marketing website", icon: <Globe />, onSelect: () => setLast("Marketing website") },
    { id: "p-app", label: "Mobile app redesign", icon: <Smartphone />, onSelect: () => setLast("Mobile app redesign") },
    { id: "p-api", label: "Public API v2", icon: <Code2 />, onSelect: () => setLast("Public API v2") },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => setOpen(true)}>Open project</Button>
      <span className="text-sm text-muted-foreground">Last opened: {last}</span>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        placeholder="Find a project..."
        recentItems={[projects[1]]}
        recentHeading="Recently viewed"
        emptyMessage="No projects match your search."
        groups={[{ heading: "All projects", items: projects }]}
      />
    </div>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <RecentCommandsDemo />
              </div>
            }
          />
        </section>

        {/* Example: Without Search */}
        <section aria-labelledby="CommandPalette-example-2">
          <h2
            id="CommandPalette-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Without Search
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set searchable=&#123;false&#125; for a short, fixed list of actions. The list itself takes focus and the arrow keys still work. panelClassName narrows the panel.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function QuickActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Quick actions
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        searchable={false}
        ariaLabel="Quick actions"
        panelClassName="max-w-sm"
        groups={[
          {
            heading: "Invoice INV-2048",
            items: [
              { id: "send", label: "Send reminder", icon: <Send />, shortcut: "R" },
              { id: "duplicate", label: "Duplicate invoice", icon: <Copy />, shortcut: "D" },
              { id: "paid", label: "Mark as paid", icon: <CheckCircle2 />, shortcut: "P" },
            ],
          },
        ]}
      />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <QuickActionsDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="CommandPalette-props">
          <h2
            id="CommandPalette-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the CommandPalette components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            CommandPalette
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
                    groups
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CommandPaletteGroup[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Grouped commands shown in the list (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled open state.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultOpen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Initial open state in uncontrolled mode.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called whenever the open state changes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    placeholder
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Type a command or search..."</td>
                  <td className="p-3">Placeholder and accessible name of the search input.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    searchable
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Shows the search input and filters commands.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    emptyMessage
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"No results found."</td>
                  <td className="p-3">Heading of the empty state shown when nothing matches; the current query is echoed below it.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    recentItems
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CommandPaletteItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Items shown in a top group while the search is empty.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    recentHeading
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Recent"</td>
                  <td className="p-3">Heading of the recent-items group.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    hotkey
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Letter that toggles the palette with Cmd or Ctrl, for example "k".</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ariaLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Command palette"</td>
                  <td className="p-3">Accessible name of the dialog.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the fixed overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the fixed overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    panelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the floating panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inputWrapperClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the search input row.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inputClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the search input.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    listClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the scrollable results list.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    groupHeadingClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles every group heading.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every command row.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    emptyClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the EmptyState shown when nothing matches.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            CommandPaletteGroup
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
                    heading
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Heading shown above the group (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CommandPaletteItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Commands in this group (required).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            CommandPaletteItem
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
                  <td className="p-3">Stable id used for keys and aria-activedescendant (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Visible label, matched by the search (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Secondary line under the label, also matched by the search.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    keywords
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Extra search terms that match without being shown.</td>
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
                  <td className="p-3">Keyboard hint rendered as a keycap.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onSelect
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs when the command is chosen; the palette then closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Makes the command non-interactive and skips it in navigation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="CommandPalette-a11y">
          <h2
            id="CommandPalette-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The panel is a modal dialog. The search input is a combobox (aria-controls, aria-autocomplete="list") pointing at a listbox of options.</li>
            <li>Focus stays in the search input; the highlighted option is exposed with aria-activedescendant and aria-selected, and kept scrolled into view.</li>
            <li>Arrow Up and Down move between enabled commands and wrap, Home and End jump to the ends, Enter runs the highlighted command and Escape closes.</li>
            <li>Each group is a role="group" labelled by its heading. The empty state is announced as a status message.</li>
            <li>Focus is trapped while open and returns to the trigger on close. Page scroll is locked.</li>
            <li>Animations are reduced to a fade when the user prefers reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={commandPaletteFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default CommandPaletteDocs;
