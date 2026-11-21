"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, FileCode, FileText, Folder, Lock, Image as ImageIcon } from "lucide-react";
import { TreeView, Button, Card, CardBody } from "@neuctra/ui";

const treeViewFaq = buildComponentFaq("TreeView", { sizes: ["sm", "md"] });

const projectTree = [
  {
    id: "src",
    label: "src",
    icon: <Folder />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <Folder />,
        children: [
          { id: "button", label: "Button.tsx", icon: <FileCode /> },
          { id: "card", label: "Card.tsx", icon: <FileCode /> },
        ],
      },
      { id: "index", label: "index.ts", icon: <FileCode /> },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: <Folder />,
    children: [{ id: "logo", label: "logo.svg", icon: <ImageIcon /> }],
  },
  { id: "readme", label: "README.md", icon: <FileText /> },
  { id: "env", label: ".env.production", icon: <Lock />, disabled: true },
];

const docsTree = [
  {
    id: "guides",
    label: "Guides",
    children: [
      { id: "quickstart", label: "Quickstart" },
      { id: "auth", label: "Authentication" },
      {
        id: "webhooks",
        label: "Webhooks",
        children: [
          { id: "events", label: "Event types" },
          { id: "retries", label: "Retries" },
        ],
      },
    ],
  },
  {
    id: "api",
    label: "API reference",
    children: [
      { id: "customers", label: "Customers" },
      { id: "invoices", label: "Invoices" },
    ],
  },
];

const labels = {
  button: "Button.tsx",
  card: "Card.tsx",
  index: "index.ts",
  logo: "logo.svg",
  readme: "README.md",
};

function FileExplorerDemo() {
  const [selected, setSelected] = useState("button");
  const [expanded, setExpanded] = useState(["src", "components"]);
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <TreeView
        nodes={projectTree}
        ariaLabel="Project files"
        expandedIds={expanded}
        onExpandedIdsChange={setExpanded}
        selectedId={selected}
        onSelectedChange={setSelected}
        showGuides
        className="self-start"
      />
      <Card className="min-w-0 self-start">
        <CardBody className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Open file</p>
            <p className="truncate text-sm font-medium text-foreground">{labels[selected] ?? "Folder selected"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="xs" variant="outline" onClick={() => setExpanded(["src", "components", "public"])}>
              Expand all
            </Button>
            <Button size="xs" variant="ghost" onClick={() => setExpanded([])}>
              Collapse all
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const PROPS = [
  ["nodes", "TreeNode[]", "-", "Root nodes of the tree (required)."],
  ["expandedIds", "string[]", "-", "Controlled list of expanded node ids."],
  ["defaultExpandedIds", "string[]", "[]", "Initially expanded ids in uncontrolled mode."],
  ["onExpandedIdsChange", "(ids: string[]) => void", "-", "Called with the next expanded id array."],
  ["selectedId", "string | null", "-", "Controlled selected node id; null for no selection."],
  ["defaultSelectedId", "string | null", "null", "Initially selected id in uncontrolled mode."],
  ["onSelectedChange", "(id: string | null) => void", "-", "Called with the newly selected id."],
  ["selectable", "boolean", "true", "Allows row selection. When false, activating a parent toggles it."],
  ["size", '"sm" | "md"', '"md"', "Row density and text scale."],
  ["showGuides", "boolean", "false", "Draws vertical guide lines for nested levels."],
  ["emptyText", "ReactNode", '"No items."', "Text shown when nodes is empty."],
  ["ariaLabel", "string", '"Tree view"', "Accessible label for the tree."],
  ["className", "string", "-", "Styles the tree container."],
  ["style", "CSSProperties", "-", "Inline styles for the tree container."],
  ["itemClassName", "string", "-", "Styles every row."],
  ["selectedItemClassName", "string", "-", "Styles the selected row, applied after itemClassName."],
  ["iconClassName", "string", "-", "Styles node icon wrappers."],
  ["labelClassName", "string", "-", "Styles node labels."],
  ["chevronClassName", "string", "-", "Styles the expand chevron."],
];

const NODE_PROPS = [
  ["id", "string", "-", "Stable, unique key used for expansion and selection (required)."],
  ["label", "ReactNode", "-", "Visible node label (required). String labels power type-ahead."],
  ["children", "TreeNode[]", "-", "Nested child nodes."],
  ["icon", "ReactNode", "-", "Optional leading icon."],
  ["disabled", "boolean", "false", "Prevents selecting, expanding and focusing the node."],
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

const TreeViewDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TreeView Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible tree navigation with expand and collapse, single
            selection, disabled nodes, custom icons, guide lines, type-ahead
            and roving keyboard focus.
          </p>
        </header>

        <section aria-labelledby="TreeView-import">
          <h2 id="TreeView-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { TreeView } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="TreeView-example-0">
          <h2 id="TreeView-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Nest nodes through children. Uncontrolled trees start from
            defaultExpandedIds and defaultSelectedId. Disabled nodes are
            skipped by the keyboard.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const projectTree = [
  {
    id: "src",
    label: "src",
    icon: <Folder />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <Folder />,
        children: [
          { id: "button", label: "Button.tsx", icon: <FileCode /> },
          { id: "card", label: "Card.tsx", icon: <FileCode /> },
        ],
      },
      { id: "index", label: "index.ts", icon: <FileCode /> },
    ],
  },
  { id: "public", label: "public", icon: <Folder />, children: [{ id: "logo", label: "logo.svg", icon: <Image /> }] },
  { id: "readme", label: "README.md", icon: <FileText /> },
  { id: "env", label: ".env.production", icon: <Lock />, disabled: true },
];

<TreeView
  nodes={projectTree}
  ariaLabel="Project files"
  defaultExpandedIds={["src"]}
  defaultSelectedId="index"
  className="max-w-xs"
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <TreeView
                  nodes={projectTree}
                  ariaLabel="Project files"
                  defaultExpandedIds={["src"]}
                  defaultSelectedId="index"
                  className="max-w-xs"
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TreeView-example-1">
          <h2 id="TreeView-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size="sm" packs rows tighter for dense sidebars; md is the default.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
  <div className="min-w-0 space-y-2">
    <p className="text-xs font-medium text-muted-foreground">size="sm"</p>
    <TreeView nodes={docsTree} size="sm" defaultExpandedIds={["guides"]} ariaLabel="Docs, small" />
  </div>
  <div className="min-w-0 space-y-2">
    <p className="text-xs font-medium text-muted-foreground">size="md"</p>
    <TreeView nodes={docsTree} size="md" defaultExpandedIds={["guides"]} ariaLabel="Docs, medium" />
  </div>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="min-w-0 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">size="sm"</p>
                    <TreeView nodes={docsTree} size="sm" defaultExpandedIds={["guides"]} ariaLabel="Docs, small" />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">size="md"</p>
                    <TreeView nodes={docsTree} size="md" defaultExpandedIds={["guides"]} ariaLabel="Docs, medium" />
                  </div>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="TreeView-example-2">
          <h2 id="TreeView-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled File Explorer
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Control both expandedIds and selectedId to sync the tree with an
            editor, and add Expand all and Collapse all actions. showGuides
            draws indentation lines.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [selected, setSelected] = useState("button");
const [expanded, setExpanded] = useState(["src", "components"]);

<div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
  <TreeView
    nodes={projectTree}
    ariaLabel="Project files"
    expandedIds={expanded}
    onExpandedIdsChange={setExpanded}
    selectedId={selected}
    onSelectedChange={setSelected}
    showGuides
    className="self-start"
  />
  <Card className="min-w-0 self-start">
    <CardBody className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Open file</p>
        <p className="truncate text-sm font-medium text-foreground">{labels[selected] ?? "Folder selected"}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="outline" onClick={() => setExpanded(["src", "components", "public"])}>
          Expand all
        </Button>
        <Button size="xs" variant="ghost" onClick={() => setExpanded([])}>
          Collapse all
        </Button>
      </div>
    </CardBody>
  </Card>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FileExplorerDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TreeView-example-3">
          <h2 id="TreeView-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Navigation Only and Empty State
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            With selectable=false, clicking or pressing Enter on a parent
            toggles it instead of selecting. emptyText customises the message
            for an empty tree.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
  <TreeView nodes={docsTree} selectable={false} ariaLabel="Documentation" className="self-start" />
  <TreeView nodes={[]} emptyText="No folders yet. Create one to get started." ariaLabel="Folders" className="self-start" />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
                  <TreeView nodes={docsTree} selectable={false} ariaLabel="Documentation" className="self-start" />
                  <TreeView nodes={[]} emptyText="No folders yet. Create one to get started." ariaLabel="Folders" className="self-start" />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="TreeView-props">
          <h2 id="TreeView-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TreeView component. Other HTML
            attributes are forwarded to the tree container.
          </p>
          <PropsTable rows={PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">TreeNode</h3>
          <PropsTable rows={NODE_PROPS} />
        </section>

        <section aria-labelledby="TreeView-a11y">
          <h2 id="TreeView-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Follows the WAI-ARIA tree pattern: role="tree" with focusable role="treeitem" rows carrying aria-level, aria-setsize, aria-posinset, aria-expanded and aria-selected.</li>
            <li>Roving tabindex: only one row is in the Tab order, and focus falls back to a visible row when its node collapses away.</li>
            <li>Arrow Up and Down move between rows, Right expands or enters a parent, Left collapses or moves to the parent, Home and End jump to the ends.</li>
            <li>Enter and Space select, * expands all siblings, and typing a letter jumps to the next matching label.</li>
            <li>Disabled nodes are announced with aria-disabled and skipped by keyboard navigation.</li>
          </ul>
        </section>

        <ComponentFaq qa={treeViewFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default TreeViewDocs;
