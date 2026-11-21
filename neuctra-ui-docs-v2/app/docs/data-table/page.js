"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { DataTable, Badge, Button, Avatar } from "@neuctra/ui";

const dataTableFaq = buildComponentFaq("DataTable", {
  sizes: ["sm", "md", "lg"],
});

const dataTableProps = [
  ["columns", "DataTableColumn[]", "-", "Column definitions, rendered in order (required)."],
  ["data", "T[]", "-", "Rows to display (required)."],
  ["getRowId", "(row: T, index: number) => string", "-", "Stable row id. Defaults to the row's id field, then its index."],
  ["sortable", "boolean", "false", "Enables sorting for every column whose sortable is not false."],
  ["sort", "DataTableSort | null", "-", "Controlled sort state. null means unsorted."],
  ["defaultSort", "DataTableSort | null", "null", "Initial sort state in uncontrolled mode."],
  ["onSort", "(sort: DataTableSort) => void", "-", "Fired with the next sort when a header is clicked."],
  ["manualSort", "boolean", "false", "Skips client side sorting when the server already sorted data."],
  ["selectable", "boolean", "false", "Adds a leading checkbox column with a select all header."],
  ["selectedIds", "string[]", "-", "Controlled selected row ids."],
  ["defaultSelectedIds", "string[]", "[]", "Initial selection in uncontrolled mode."],
  ["onSelectedIdsChange", "(ids: string[]) => void", "-", "Fired with the full selection whenever it changes."],
  ["pagination", "{ page, totalPages, onPageChange }", "-", "Shows a page footer with the Pagination component."],
  ["loading", "boolean", "false", "Replaces the body with skeleton rows."],
  ["loadingRows", "number", "5", "Number of skeleton rows while loading."],
  ["emptyState", "ReactNode", '"No data available"', "Content shown when data is empty."],
  ["onRowClick", "(row: T, index: number) => void", "-", "Makes rows focusable and activatable by click, Enter or Space."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Cell padding and text size."],
  ["striped", "boolean", "false", "Tints every other body row."],
  ["stickyHeader", "boolean", "false", "Keeps the header visible while scrolling. Combine with maxHeight."],
  ["maxHeight", "string | number", "-", "Maximum height of the scroll area; numbers are pixels."],
  ["caption", "string", "-", "Visually hidden table caption for screen readers."],
  ["getRowLabel", "(row: T, index: number) => string", "-", 'Accessible label for each row checkbox. Defaults to "Select row N".'],
  ["className", "string", "-", "Additional classes for the root card."],
  ["tableClassName", "string", "-", "Additional classes for the table element."],
  ["headerClassName", "string", "-", "Additional classes for the thead element."],
  ["headerCellClassName", "string", "-", "Additional classes for every header cell."],
  ["rowClassName", "string | (row: T, index: number) => string | undefined", "-", "Additional classes for body rows, static or per row."],
  ["cellClassName", "string", "-", "Additional classes for every body cell."],
  ["emptyClassName", "string", "-", "Additional classes for the empty state cell."],
  ["footerClassName", "string", "-", "Additional classes for the pagination footer."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute for the root."],
];

const columnProps = [
  ["key", "string", "-", "Row field to read and the column id (required)."],
  ["header", "ReactNode", "-", "Header content (required)."],
  ["cell", "(row, rowIndex) => ReactNode", "-", "Custom cell renderer. Defaults to the value at key."],
  ["sortable", "boolean", "-", "true sorts this column even without the table's sortable; false opts out."],
  ["width", "string | number", "-", "Column width; numbers are pixels."],
  ["minWidth", "string | number", "-", "Minimum column width; numbers are pixels. Keeps the column readable while the table scrolls on narrow screens."],
  ["wrap", "boolean", "false", "Lets cell text wrap. By default cells stay on one line and the table scrolls horizontally inside its card."],
  ["align", '"left" | "center" | "right"', '"left"', "Header and cell alignment. Right aligned cells use tabular numbers."],
  ["className", "string", "-", "Extra classes for this column's header and body cells."],
];

const invoices = [
  { id: "INV-2041", customer: "Northwind Traders", amount: 4200, status: "Paid", due: "2026-11-02" },
  { id: "INV-2042", customer: "Globex Corp", amount: 1280.5, status: "Overdue", due: "2026-10-18" },
  { id: "INV-2043", customer: "Initech", amount: 860, status: "Pending", due: "2026-11-30" },
  { id: "INV-2044", customer: "Umbrella Health", amount: 12950, status: "Paid", due: "2026-10-25" },
  { id: "INV-2045", customer: "Stark Logistics", amount: 3120, status: "Pending", due: "2026-12-05" },
];

const currency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const invoiceColumns = [
  { key: "id", header: "Invoice", cell: (row) => <span className="font-medium">{row.id}</span> },
  { key: "customer", header: "Customer" },
  { key: "due", header: "Due date" },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge size="sm" variant={row.status === "Paid" ? "soft" : "outline"} text={row.status} />,
  },
  { key: "amount", header: "Amount", align: "right", cell: (row) => currency(row.amount) },
];

const members = [
  { id: "u1", name: "Maya Chen", email: "maya@acme.io", role: "Owner", seen: "Just now" },
  { id: "u2", name: "Diego Ramos", email: "diego@acme.io", role: "Admin", seen: "2 hours ago" },
  { id: "u3", name: "Priya Natarajan", email: "priya@acme.io", role: "Editor", seen: "Yesterday" },
  { id: "u4", name: "Tom Becker", email: "tom@acme.io", role: "Viewer", seen: "5 days ago" },
];

function MembersTable() {
  const [selected, setSelected] = useState(["u3"]);
  return (
    <div className="w-full min-w-0 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{selected.length} of {members.length} selected</p>
        <Button size="xs" variant="outline" disabled={!selected.length} onClick={() => setSelected([])}>
          Clear selection
        </Button>
      </div>
      <DataTable
        caption="Workspace members"
        selectable
        getRowLabel={(row) => `Select ${row.name}`}
        selectedIds={selected}
        onSelectedIdsChange={setSelected}
        data={members}
        columns={[
          {
            key: "name",
            header: "Member",
            cell: (row) => (
              <div className="flex items-center gap-3">
                <Avatar size="sm" alt={row.name} />
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{row.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{row.email}</p>
                </div>
              </div>
            ),
          },
          { key: "role", header: "Role" },
          { key: "seen", header: "Last active", cell: (row) => <span className="text-muted-foreground">{row.seen}</span> },
        ]}
      />
    </div>
  );
}

function PaginatedOrders() {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const rows = invoices.slice((page - 1) * pageSize, page * pageSize);
  return (
    <DataTable
      className="w-full"
      size="sm"
      striped
      data={rows}
      columns={invoiceColumns}
      onRowClick={(row) => alert(`Open ${row.id}`)}
      pagination={{
        page,
        totalPages: Math.ceil(invoices.length / pageSize),
        onPageChange: setPage,
      }}
    />
  );
}

function LoadingToggle() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full min-w-0 space-y-3">
      <div className="flex gap-2">
        <Button size="xs" variant="outline" onClick={() => setLoading((v) => !v)}>
          {loading ? "Show empty state" : "Show loading"}
        </Button>
      </div>
      <DataTable
        loading={loading}
        loadingRows={3}
        data={[]}
        columns={invoiceColumns}
        emptyState={
          <div className="space-y-2">
            <p className="font-medium text-foreground">No invoices yet</p>
            <p className="text-secondary">Invoices you send will appear here.</p>
            <Button size="xs">Create invoice</Button>
          </div>
        }
      />
    </div>
  );
}

const DataTableDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            DataTable Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency free React data table built on semantic table
            markup. DataTable handles sortable headers, row selection with
            select all, skeleton loading, empty states, sticky headers,
            density sizes and optional pagination.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="DataTable-import">
          <h2
            id="DataTable-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { DataTable } from "@neuctra/ui";`} />
        </section>

        {/* Example: Sorting */}
        <section aria-labelledby="DataTable-example-0">
          <h2
            id="DataTable-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sortable Invoices
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            sortable turns every header into a sort button. Strings sort
            naturally, numbers numerically, and empty values sink to the end.
            Use align="right" for money.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const currency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

<DataTable
  sortable
  defaultSort={{ key: "due", direction: "asc" }}
  data={invoices}
  columns={[
    { key: "id", header: "Invoice", cell: (row) => <span className="font-medium">{row.id}</span> },
    { key: "customer", header: "Customer" },
    { key: "due", header: "Due date" },
    {
      key: "status",
      header: "Status",
      cell: (row) => <Badge size="sm" variant={row.status === "Paid" ? "soft" : "outline"} text={row.status} />,
    },
    { key: "amount", header: "Amount", align: "right", cell: (row) => currency(row.amount) },
  ]}
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <DataTable
                  sortable
                  defaultSort={{ key: "due", direction: "asc" }}
                  data={invoices}
                  columns={invoiceColumns}
                />
              </div>
            }
          />
        </section>

        {/* Example: Selection */}
        <section aria-labelledby="DataTable-example-1">
          <h2
            id="DataTable-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Controlled Selection
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            selectable adds checkboxes. The header checkbox shows a mixed
            state when some rows are selected, and only toggles the visible
            rows so selections on other pages survive.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [selected, setSelected] = useState(["u3"]);

<DataTable
  caption="Workspace members"
  selectable
  getRowLabel={(row) => \`Select \${row.name}\`}
  selectedIds={selected}
  onSelectedIdsChange={setSelected}
  data={members}
  columns={[
    {
      key: "name",
      header: "Member",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" alt={row.name} />
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role" },
    { key: "seen", header: "Last active", cell: (row) => <span className="text-muted-foreground">{row.seen}</span> },
  ]}
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <MembersTable />
              </div>
            }
          />
        </section>

        {/* Example: Pagination + size */}
        <section aria-labelledby="DataTable-example-2">
          <h2
            id="DataTable-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Pagination, Density and Row Clicks
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass pagination to render a footer. size="sm" and striped fit
            dense dashboards, and onRowClick makes each row a keyboard
            reachable target.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [page, setPage] = useState(1);
const pageSize = 3;
const rows = invoices.slice((page - 1) * pageSize, page * pageSize);

<DataTable
  size="sm"
  striped
  data={rows}
  columns={invoiceColumns}
  onRowClick={(row) => alert(\`Open \${row.id}\`)}
  pagination={{
    page,
    totalPages: Math.ceil(invoices.length / pageSize),
    onPageChange: setPage,
  }}
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <PaginatedOrders />
              </div>
            }
          />
        </section>

        {/* Example: Loading + empty */}
        <section aria-labelledby="DataTable-example-3">
          <h2
            id="DataTable-example-3"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Loading and Empty States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            loading swaps the body for skeleton rows and sets aria-busy.
            emptyState accepts any node, including a call to action.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [loading, setLoading] = useState(true);

<Button size="xs" variant="outline" onClick={() => setLoading((v) => !v)}>
  {loading ? "Show empty state" : "Show loading"}
</Button>
<DataTable
  loading={loading}
  loadingRows={3}
  data={[]}
  columns={invoiceColumns}
  emptyState={
    <div className="space-y-2">
      <p className="font-medium text-foreground">No invoices yet</p>
      <p className="text-secondary">Invoices you send will appear here.</p>
      <Button size="xs">Create invoice</Button>
    </div>
  }
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <LoadingToggle />
              </div>
            }
          />
        </section>

        {/* Example: Sticky header */}
        <section aria-labelledby="DataTable-example-4">
          <h2
            id="DataTable-example-4"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sticky Header
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            stickyHeader with maxHeight keeps column labels visible while a
            long table scrolls inside its card.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<DataTable
  stickyHeader
  maxHeight={220}
  data={[...invoices, ...invoices.map((row) => ({ ...row, id: row.id + "-B" }))]}
  columns={invoiceColumns}
/>`}
            previewContent={
              <div className="w-full min-w-0 py-4">
                <DataTable
                  stickyHeader
                  maxHeight={220}
                  data={[
                    ...invoices,
                    ...invoices.map((row) => ({ ...row, id: row.id + "-B" })),
                  ]}
                  columns={invoiceColumns}
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="DataTable-props">
          <h2
            id="DataTable-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the DataTable component.
          </p>

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
                {dataTableProps.map(([name, type, def, desc]) => (
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

          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">
            DataTableColumn
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
                {columnProps.map(([name, type, def, desc]) => (
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
        </section>

        {/* Accessibility */}
        <section aria-labelledby="DataTable-a11y">
          <h2
            id="DataTable-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Uses real table, thead, th scope="col" and td elements, with an
              optional visually hidden caption.
            </li>
            <li>
              Sortable headers are buttons; the th exposes aria-sort as
              ascending, descending or none.
            </li>
            <li>
              Selection uses the Neuctra Checkbox. The select all checkbox
              reports aria-checked="mixed" for a partial selection, each row
              checkbox has its own label (getRowLabel), and selected rows set
              aria-selected. Clicking a checkbox never triggers onRowClick.
            </li>
            <li>
              With onRowClick, rows are focusable and activate with Enter or
              Space; keys pressed inside nested controls are ignored.
            </li>
            <li>
              Cells stay on one line and wide tables scroll horizontally
              inside their own container, so content never squeezes.
            </li>
            <li>
              While loading, the table sets aria-busy and skeleton rows are
              hidden from assistive technology.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={dataTableFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default DataTableDocs;
