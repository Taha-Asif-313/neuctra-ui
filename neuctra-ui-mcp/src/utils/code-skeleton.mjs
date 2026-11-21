// Generates a conservative JSX starting skeleton from the components returned
// by design-from-prompt. It is intentionally a scaffold, not a production page.

const titleFromLayout = (layoutId) => String(layoutId ?? "Screen")
  .split(/[^a-zA-Z0-9]+/)
  .filter(Boolean)
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join("") + "Page";

export function buildCodeSkeleton({
  request,
  layout,
  components = [],
  contract,
  framework = "auto",
  projectContext = {},
} = {}) {
  const names = new Set(components.map((component) => component.name));
  const importByComponent = new Map();
  for (const component of components) {
    const statement = component.import
      ?? (component.importFrom ? `import { ${component.name} } from '${component.importFrom}';` : null);
    if (statement) importByComponent.set(component.name, statement);
  }

  const imports = [`import React from "react";`];
  const ensureImport = (name) => {
    const statement = importByComponent.get(name);
    if (statement && !imports.includes(statement)) imports.push(statement);
  };

  const componentTag = (name, props = "", children = "") => {
    if (!names.has(name)) {
      return `{/* ${name} was not returned; call get-neuctra-ui-component before adding it. */}`;
    }
    ensureImport(name);
    return children
      ? `<${name}${props}>${children}</${name}>`
      : `<${name}${props} />`;
  };

  const primaryAction = projectContext.primaryAction ?? "Primary action";
  let shell;
  if (names.has("Container")) {
    ensureImport("Container");
    shell = `<Container>\n__BODY__\n</Container>`;
  } else {
    shell = `<main>\n__BODY__\n</main>`;
  }

  const primaryButton = componentTag("Button", " onClick={() => setDeleteOpen(true)}", primaryAction);

  const statCard = names.has("Stat")
    ? componentTag("Stat", " label={stat.label} value={stat.value} trend={stat.trend} ")
    : componentTag("Card", "", componentTag("CardBody", "", "{stat.label}: {stat.value}"));

  const tableHead = componentTag("THead", "", componentTag("TRow", "", [
    componentTag("TH", "", "Record"),
    componentTag("TH", "", "Status"),
    componentTag("TH", "", "Actions"),
  ].join("")));

  const tableBody = componentTag("TBody", "", `{records.map((record) => (${componentTag("TRow", "", [
    componentTag("TD", "", "{record.name}"),
    componentTag("TD", "", "{record.status}"),
    componentTag("TD", "", "{/* row actions */}"),
  ].join(""))}))}`);

  const table = componentTag("Table", " striped hoverable", `${tableHead}${tableBody}`);
  const emptyState = names.has("EmptyState")
    ? componentTag("EmptyState", " title=\"No records\" description=\"Try a different filter.\" ")
    : "null /* EmptyState was not returned; call get-neuctra-ui-component before adding it. */";
  const pagination = componentTag("Pagination", " page={page} totalPages={totalPages} onPageChange={setPage} ");

  const modal = componentTag("Modal", " isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} ", [
    componentTag("ModalHeader", "", "Delete record?"),
    componentTag("ModalBody", "", "This action cannot be undone."),
    componentTag("ModalFooter", "", componentTag("Button", " variant=\"destructive\" onClick={() => setDeleteOpen(false)}", "Delete")),
  ].join(""));

  const filterInput = componentTag("Input", " label=\"Search records\" name=\"search\" placeholder=\"Search\" ");
  const filterSelect = componentTag("Select", " label=\"Status\" name=\"status\" placeholder=\"All statuses\" ");

  const dashboardBody = `
        <header className="flex items-center justify-between gap-4">
          <div>
            ${componentTag("Breadcrumb", " items={breadcrumbItems} ")}
            <h1>Analytics dashboard</h1>
            <p>Review key metrics, filter records, and manage exceptions.</p>
          </div>
          ${primaryButton}
        </header>

        <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id}>${statCard}</div>
          ))}
        </section>

        <section aria-label="Filters" className="flex gap-3">
          ${filterInput}
          ${filterSelect}
        </section>

        <section aria-label="Records">
          {isLoading ? (
            <p>Loading records…</p>
          ) : error ? (
            <p role="alert">{error}</p>
          ) : records.length ? (
            ${table}
          ) : (
            ${emptyState}
          )}
        </section>

        ${pagination}
        ${modal}`.trim();

  const formBody = `
        <header>
          <h1>Create record</h1>
          <p>Complete the required fields and submit.</p>
        </header>

        <form onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4">
            ${componentTag("Input", " label=\"Name\" name=\"name\" required ")}
            ${componentTag("Textarea", " label=\"Description\" name=\"description\" ")}
            ${componentTag("Button", " type=\"submit\" ", "Save")}
          </div>
        </form>`.trim();

  const docsBody = `
        <header>
          ${componentTag("Breadcrumb", " items={breadcrumbItems} ")}
          <h1>Documentation</h1>
        </header>

        ${componentTag("Tabs", " defaultActive={0} ", `${componentTag("TabList", "", componentTag("Tab", "", "Overview"))}${componentTag("TabPanels", "", componentTag("Card", "", componentTag("CardBody", "", "Documentation content")))}`)}`.trim();

  const defaultBody = `
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1>Requested screen</h1>
            <p>Adapt this scaffold to the exact user task.</p>
          </div>
          ${primaryButton}
        </header>

        ${componentTag("Card", "", componentTag("CardBody", "", "{/* Main content */}"))}`.trim();

  const layoutId = layout?.id ?? "custom";
  const body = layoutId === "dashboard" || layoutId === "analytics-dashboard" || layoutId === "data-table"
    ? dashboardBody
    : String(layoutId).includes("form") || layoutId === "checkout"
      ? formBody
      : layoutId === "documentation" || layoutId === "docs"
        ? docsBody
        : defaultBody;

  const filledShell = shell.replace("__BODY__", body);
  const gapComments = (contract?.neuctraGaps ?? [])
    .map((gap) => `// GAP: ${gap.need} — ${gap.recommendation}`)
    .join("\n");

  return [
    "// Starting skeleton generated by neuctra-ui-design-from-prompt.",
    "// Adapt state, data fetching, and access control to the real app.",
    `// Policy: ${contract?.sourcePolicy ?? "neuctra-first"} | Layout: ${layoutId} | Framework: ${framework}`,
    gapComments,
    "",
    ...imports,
    "",
    `export default function ${titleFromLayout(layoutId)}() {`,
    "  const [isDeleteOpen, setDeleteOpen] = React.useState(false);",
    "  const [records] = React.useState([]);",
    "  const [isLoading] = React.useState(false);",
    "  const [error] = React.useState(null);",
    "  const [page, setPage] = React.useState(1);",
    "  const totalPages = 1;",
    "  const stats = [{ id: 'one', label: 'Metric', value: '0', trend: 'flat' }];",
    "  const breadcrumbItems = [];",
    "",
    "  return (",
    `    ${filledShell.split("\n").join("\n    ")}`,
    "  );",
    "}",
    "",
    `// Brief request: ${request ?? ""}`,
  ].filter((line, index, all) => !(line === "" && all[index - 1] === "")).join("\n");
}
