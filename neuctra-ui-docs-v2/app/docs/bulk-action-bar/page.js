"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Archive, Download, Tag, Trash2 } from "lucide-react";
import { BulkActionBar, DataTable, Button } from "@neuctra/ui";

const bulkActionBarFaq = buildComponentFaq("BulkActionBar", {
  sizes: ["sm", "md"],
});

const bulkActionBarProps = [
  ["count", "number", "-", "Number of selected items. The bar animates out at 0 (required)."],
  ["actions", "BulkAction[]", "-", "Actions available for the selection (required)."],
  ["onClear", "() => void", "-", "Clears the selection, from the clear button or Escape (required)."],
  ["selectedLabel", "ReactNode", '"selected"', 'Text after the count, e.g. "files selected".'],
  ["total", "number", "-", 'Total selectable items. Shows "3 of 24 selected".'],
  ["onSelectAll", "() => void", "-", 'Shows a "Select all" link while count is below total.'],
  ["position", '"fixed" | "inline"', '"fixed"', "Float at the bottom of the viewport, or render in place."],
  ["size", '"sm" | "md"', '"md"', "Height of the bar and its buttons."],
  ["ariaLabel", "string", '"Bulk actions"', "Accessible label for the toolbar."],
  ["clearLabel", "string", '"Clear selection"', "Accessible label for the clear button."],
  ["className", "string", "-", "Additional classes for the toolbar."],
  ["countClassName", "string", "-", "Additional classes for the count text."],
  ["actionClassName", "string", "-", "Additional classes for every action button."],
  ["clearButtonClassName", "string", "-", "Additional classes for the clear button."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute for the toolbar."],
];

const actionProps = [
  ["id", "string", "-", "Unique id used as the React key (required)."],
  ["label", "ReactNode", "-", "Visible action label (required)."],
  ["icon", "ReactNode", "-", "Leading icon."],
  ["onClick", "() => void", "-", "Fired when the action is pressed (required)."],
  ["disabled", "boolean", "-", "Disables this action."],
  ["loading", "boolean", "-", "Shows a spinner and blocks the action."],
  ["destructive", "boolean", "-", "Styles the action as destructive."],
];

const files = [
  { id: "f1", name: "Q3 board deck.pdf", owner: "Maya Chen", size: "4.2 MB" },
  { id: "f2", name: "Brand guidelines v4.fig", owner: "Diego Ramos", size: "18.7 MB" },
  { id: "f3", name: "Customer interviews.docx", owner: "Priya Natarajan", size: "860 KB" },
  { id: "f4", name: "Pricing model.xlsx", owner: "Tom Becker", size: "1.1 MB" },
];

function InlineFiles() {
  const [selected, setSelected] = useState(["f1", "f3"]);
  const [archiving, setArchiving] = useState(false);

  const archive = () => {
    setArchiving(true);
    setTimeout(() => {
      setArchiving(false);
      setSelected([]);
    }, 900);
  };

  return (
    <div className="w-full min-w-0 space-y-3">
      <BulkActionBar
        position="inline"
        count={selected.length}
        total={files.length}
        onSelectAll={() => setSelected(files.map((file) => file.id))}
        selectedLabel="files selected"
        onClear={() => setSelected([])}
        actions={[
          { id: "download", label: "Download", icon: <Download />, onClick: () => {} },
          { id: "archive", label: "Archive", icon: <Archive />, loading: archiving, onClick: archive },
          { id: "delete", label: "Delete", icon: <Trash2 />, destructive: true, onClick: () => setSelected([]) },
        ]}
      />
      <DataTable
        selectable
        getRowLabel={(file) => `Select ${file.name}`}
        selectedIds={selected}
        onSelectedIdsChange={setSelected}
        data={files}
        columns={[
          { key: "name", header: "Name" },
          { key: "owner", header: "Owner" },
          { key: "size", header: "Size", align: "right" },
        ]}
      />
    </div>
  );
}

function FloatingBar() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" onClick={() => setCount(12)}>
        Select 12 contacts
      </Button>
      <Button size="sm" variant="outline" disabled={!count} onClick={() => setCount(0)}>
        Clear
      </Button>
      <BulkActionBar
        count={count}
        selectedLabel="contacts selected"
        onClear={() => setCount(0)}
        actions={[
          { id: "tag", label: "Add tag", icon: <Tag />, onClick: () => {} },
          { id: "export", label: "Export CSV", icon: <Download />, onClick: () => {} },
        ]}
      />
    </div>
  );
}

const BulkActionBarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            BulkActionBar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A selection toolbar that appears when rows are selected. It shows
            the count, a select all shortcut, actions with loading and
            destructive styles, and a clear button. Float it over the page or
            render it inline above a table.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="BulkActionBar-import">
          <h2
            id="BulkActionBar-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { BulkActionBar } from "@neuctra/ui";`} />
        </section>

        {/* Example: Inline */}
        <section aria-labelledby="BulkActionBar-example-0">
          <h2
            id="BulkActionBar-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Inline with a DataTable
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            position="inline" renders the bar in place. Pair total with
            onSelectAll for a select all shortcut, and use loading while an
            action runs.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [selected, setSelected] = useState(["f1", "f3"]);
const [archiving, setArchiving] = useState(false);

<BulkActionBar
  position="inline"
  count={selected.length}
  total={files.length}
  onSelectAll={() => setSelected(files.map((file) => file.id))}
  selectedLabel="files selected"
  onClear={() => setSelected([])}
  actions={[
    { id: "download", label: "Download", icon: <Download />, onClick: download },
    { id: "archive", label: "Archive", icon: <Archive />, loading: archiving, onClick: archive },
    { id: "delete", label: "Delete", icon: <Trash2 />, destructive: true, onClick: remove },
  ]}
/>
<DataTable
  selectable
  getRowLabel={(file) => \`Select \${file.name}\`}
  selectedIds={selected}
  onSelectedIdsChange={setSelected}
  data={files}
  columns={[
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
    { key: "size", header: "Size", align: "right" },
  ]}
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <InlineFiles />
              </div>
            }
          />
        </section>

        {/* Example: Floating */}
        <section aria-labelledby="BulkActionBar-example-1">
          <h2
            id="BulkActionBar-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Floating Bar
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The default position="fixed" floats the bar at the bottom of the
            viewport and slides it in when count becomes positive. Press the
            button to try it.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [count, setCount] = useState(0);

<Button size="sm" onClick={() => setCount(12)}>Select 12 contacts</Button>
<BulkActionBar
  count={count}
  selectedLabel="contacts selected"
  onClear={() => setCount(0)}
  actions={[
    { id: "tag", label: "Add tag", icon: <Tag />, onClick: addTag },
    { id: "export", label: "Export CSV", icon: <Download />, onClick: exportCsv },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FloatingBar />
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="BulkActionBar-example-2">
          <h2
            id="BulkActionBar-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes and Disabled Actions
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size="sm" fits dense tables. Disable actions that do not apply
            to the current selection.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<BulkActionBar
  position="inline"
  size="sm"
  count={3}
  onClear={() => {}}
  actions={[
    { id: "merge", label: "Merge", onClick: () => {}, disabled: true },
    { id: "assign", label: "Assign", onClick: () => {} },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <BulkActionBar
                  position="inline"
                  size="sm"
                  count={3}
                  onClear={() => {}}
                  className="w-fit"
                  actions={[
                    { id: "merge", label: "Merge", onClick: () => {}, disabled: true },
                    { id: "assign", label: "Assign", onClick: () => {} },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="BulkActionBar-props">
          <h2
            id="BulkActionBar-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the BulkActionBar component.
          </p>

          {[
            ["BulkActionBar", bulkActionBarProps],
            ["BulkAction", actionProps],
          ].map(([title, rows], tableIndex) => (
            <div key={title} className={tableIndex ? "mt-8" : undefined}>
              {tableIndex > 0 && (
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {title}
                </h3>
              )}
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
                    {rows.map(([name, type, def, desc]) => (
                      <tr key={name}>
                        <td className="p-3 font-medium text-primary whitespace-nowrap">
                          {name}
                        </td>
                        <td className="p-3 font-mono text-xs text-gray-300">
                          {type}
                        </td>
                        <td className="p-3 text-gray-400 whitespace-nowrap">
                          {def}
                        </td>
                        <td className="p-3">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        {/* Accessibility */}
        <section aria-labelledby="BulkActionBar-a11y">
          <h2
            id="BulkActionBar-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Rendered as role="toolbar" with an accessible label. Arrow
              Left, Arrow Right, Home and End move focus between its buttons.
            </li>
            <li>
              The selection count is a polite live region, so changes are
              announced without moving focus.
            </li>
            <li>Escape inside the toolbar clears the selection.</li>
            <li>
              Loading actions set aria-busy and are disabled until done; the
              icon only clear button has an aria-label.
            </li>
            <li>
              On narrow screens the actions move to their own line under the
              count; the DOM and focus order stay the same.
            </li>
            <li>The enter and exit animation respects reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={bulkActionBarFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default BulkActionBarDocs;
