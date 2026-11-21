"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { FilterBar, Badge } from "@neuctra/ui";

const filterBarFaq = buildComponentFaq("FilterBar", {
  variants: ["card", "plain"],
  sizes: ["sm", "md"],
});

const filterBarProps = [
  ["fields", "FilterDefinition[]", "-", 'Fields offered by the "Add filter" menu (required).'],
  ["filters", "ActiveFilter[]", "-", "Currently applied filters (required)."],
  ["onChange", "(filters: ActiveFilter[]) => void", "-", "Fired with the complete filter list on every change (required)."],
  ["onClear", "() => void", "-", "Fired by the Clear button. onChange([]) is used when omitted."],
  ["onSaveView", "(filters: ActiveFilter[]) => void", "-", "Shows a Save view button, fired with the current filters."],
  ["size", '"sm" | "md"', '"sm"', "Height and text size of chips and buttons."],
  ["variant", '"card" | "plain"', '"card"', "Bordered card wrapper, or chips and buttons only."],
  ["disabled", "boolean", "false", "Disables every control in the bar."],
  ["addLabel", "ReactNode", '"Add filter"', "Label of the add button."],
  ["clearLabel", "ReactNode", '"Clear"', "Label of the clear button."],
  ["saveViewLabel", "ReactNode", '"Save view"', "Label of the save view button."],
  ["emptyLabel", "ReactNode", '"No active filters"', "Shown when no filters are applied. Pass null to hide it."],
  ["className", "string", "-", "Additional classes for the root."],
  ["filterClassName", "string", "-", "Additional classes for each active filter chip."],
  ["addButtonClassName", "string", "-", "Additional classes for the add filter button."],
  ["panelClassName", "string", "-", "Additional classes for the floating editor and add menu panels."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute."],
];

const definitionProps = [
  ["key", "string", "-", "Unique field key (required)."],
  ["label", "string", "-", "Human readable field label (required)."],
  ["type", '"text" | "select" | "multi-select" | "date"', '"text"', "Editor shown in the filter panel."],
  ["options", "FilterOption[]", "-", "{ value, label } choices for select and multi-select fields."],
  ["placeholder", "string", "-", "Placeholder for text and date fields."],
];

const activeFilterProps = [
  ["key", "string", "-", "Key matching a FilterDefinition (required)."],
  ["value", "string | string[]", "-", 'Current value. An empty string or array means "Any" (required).'],
  ["label", "string", "-", "Overrides the field label in the chip."],
];

const issueFields = [
  {
    key: "status",
    label: "Status",
    type: "multi-select",
    options: [
      { value: "todo", label: "Todo" },
      { value: "in_progress", label: "In progress" },
      { value: "review", label: "In review" },
      { value: "done", label: "Done" },
    ],
  },
  {
    key: "assignee",
    label: "Assignee",
    type: "select",
    options: [
      { value: "maya", label: "Maya Chen" },
      { value: "diego", label: "Diego Ramos" },
      { value: "priya", label: "Priya Natarajan" },
    ],
  },
  { key: "label", label: "Label", type: "text", placeholder: "e.g. billing" },
  { key: "due", label: "Due before", type: "date" },
];

const issues = [
  { id: "ENG-412", title: "Retry failed webhook deliveries", status: "in_progress", assignee: "maya" },
  { id: "ENG-418", title: "Invoice PDF misses VAT line", status: "todo", assignee: "diego" },
  { id: "ENG-421", title: "Add SSO audit log export", status: "review", assignee: "priya" },
  { id: "ENG-399", title: "Rate limit public search API", status: "done", assignee: "maya" },
];

function IssueFilters() {
  const [filters, setFilters] = useState([
    { key: "status", value: ["todo", "in_progress"] },
  ]);
  const [saved, setSaved] = useState(null);

  const visible = issues.filter((issue) =>
    filters.every((filter) => {
      const values = Array.isArray(filter.value) ? filter.value : filter.value ? [filter.value] : [];
      if (!values.length) return true;
      if (filter.key === "status") return values.includes(issue.status);
      if (filter.key === "assignee") return values.includes(issue.assignee);
      return true;
    }),
  );

  return (
    <div className="w-full space-y-3">
      <FilterBar
        fields={issueFields}
        filters={filters}
        onChange={setFilters}
        onSaveView={(current) => setSaved(current.length)}
      />
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {visible.map((issue) => (
          <li key={issue.id} className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className="w-16 shrink-0 text-xs text-muted-foreground">{issue.id}</span>
            <span className="min-w-0 flex-1 truncate text-foreground">{issue.title}</span>
            <Badge size="sm" variant="outline" text={issue.status.replace("_", " ")} />
          </li>
        ))}
        {!visible.length && (
          <li className="px-4 py-6 text-center text-sm text-muted-foreground">
            No issues match these filters.
          </li>
        )}
      </ul>
      {saved !== null && (
        <p className="text-xs text-muted-foreground">Saved a view with {saved} filters.</p>
      )}
    </div>
  );
}

function EmptyFilters() {
  const [filters, setFilters] = useState([]);
  return (
    <FilterBar
      className="w-full"
      variant="plain"
      size="md"
      fields={issueFields}
      filters={filters}
      onChange={setFilters}
    />
  );
}

function TableHeader({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
      {children}
    </div>
  );
}

function PropsTable({ rows }) {
  return (
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
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FilterBarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            FilterBar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Build issue trackers, CRMs and admin lists with a compact filter
            bar. Each active filter is a chip that opens an editor panel for
            text, date, select or multi-select values, with clear and save
            view actions.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="FilterBar-import">
          <h2
            id="FilterBar-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { FilterBar } from "@neuctra/ui";`} />
        </section>

        {/* Example: Issue tracker */}
        <section aria-labelledby="FilterBar-example-0">
          <h2
            id="FilterBar-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Issue Tracker Filters
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            FilterBar is controlled: keep filters in state and apply them to
            your data. Click a chip to edit its value; new filters open their
            editor right away.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const fields = [
  {
    key: "status",
    label: "Status",
    type: "multi-select",
    options: [
      { value: "todo", label: "Todo" },
      { value: "in_progress", label: "In progress" },
      { value: "review", label: "In review" },
      { value: "done", label: "Done" },
    ],
  },
  {
    key: "assignee",
    label: "Assignee",
    type: "select",
    options: [
      { value: "maya", label: "Maya Chen" },
      { value: "diego", label: "Diego Ramos" },
      { value: "priya", label: "Priya Natarajan" },
    ],
  },
  { key: "label", label: "Label", type: "text", placeholder: "e.g. billing" },
  { key: "due", label: "Due before", type: "date" },
];

const [filters, setFilters] = useState([
  { key: "status", value: ["todo", "in_progress"] },
]);

<FilterBar
  fields={fields}
  filters={filters}
  onChange={setFilters}
  onSaveView={(current) => saveView(current)}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <IssueFilters />
              </div>
            }
          />
        </section>

        {/* Example: Plain + md */}
        <section aria-labelledby="FilterBar-example-1">
          <h2
            id="FilterBar-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Plain Variant and Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            variant="plain" drops the card so the bar can sit in a page
            toolbar. size accepts sm (default) or md.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [filters, setFilters] = useState([]);

<FilterBar
  variant="plain"
  size="md"
  fields={fields}
  filters={filters}
  onChange={setFilters}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <EmptyFilters />
              </div>
            }
          />
        </section>

        {/* Example: Disabled */}
        <section aria-labelledby="FilterBar-example-2">
          <h2
            id="FilterBar-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Disabled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            disabled locks every chip and button, for example while results
            are loading.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<FilterBar
  disabled
  fields={fields}
  filters={[{ key: "assignee", value: "priya" }]}
  onChange={() => {}}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FilterBar
                  className="w-full"
                  disabled
                  fields={issueFields}
                  filters={[{ key: "assignee", value: "priya" }]}
                  onChange={() => {}}
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="FilterBar-props">
          <h2
            id="FilterBar-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the FilterBar component.
          </p>
          <PropsTable rows={filterBarProps} />
          <TableHeader title="FilterDefinition">
            <PropsTable rows={definitionProps} />
          </TableHeader>
          <TableHeader title="ActiveFilter">
            <PropsTable rows={activeFilterProps} />
          </TableHeader>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="FilterBar-a11y">
          <h2
            id="FilterBar-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The bar is a group labelled "Filters". Each chip trigger
              exposes aria-haspopup, aria-expanded and a name such as
              "Status: Todo, In progress. Edit filter".
            </li>
            <li>
              Opening a panel moves focus to its input or selected option.
              Arrow Up, Arrow Down, Home and End move between options.
            </li>
            <li>
              Select options use role="menuitemradio" with aria-checked.
              Multi-select options are a labelled group of Neuctra Checkbox
              inputs, toggled with Space. Text editors use the Neuctra Input,
              named by the panel heading.
            </li>
            <li>
              Escape closes the panel and returns focus to its chip; Enter
              applies a text or date value.
            </li>
            <li>
              Every remove button has a label like "Remove Status filter".
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={filterBarFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default FilterBarDocs;
