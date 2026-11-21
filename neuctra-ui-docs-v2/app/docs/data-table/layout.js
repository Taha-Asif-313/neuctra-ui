import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Data Table - React Table Component | Neuctra UI";
const DESCRIPTION =
  "A dependency-free React data table with sortable headers, row selection, loading placeholders, empty states and optional pagination.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react data table, sortable table react, selectable table rows, tailwind table component, neuctra ui data table",
  path: "/docs/data-table",
});

const dataTableFaq = buildComponentFaq("DataTable", {
  sizes: ["sm", "md", "lg"],
});

export default function DataTableLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Data Table", path: "/docs/data-table" },
          ]),
          techArticleSchema({
            name: "DataTable",
            description: DESCRIPTION,
            path: "/docs/data-table",
          }),
          faqSchema(dataTableFaq),
        ]}
      />
      {children}
    </>
  );
}
