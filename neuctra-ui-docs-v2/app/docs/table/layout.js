import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Table Component — React Data Tables for SaaS Dashboards | Neuctra UI";
const DESCRIPTION =
  "Highly customizable React Table component for SaaS and admin dashboards. Supports responsive layouts, striped rows, hover states, dense mode, and full control over headers, rows, and cells with Tailwind CSS styling.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react table component, saas dashboard table, tailwind data table, responsive table react, admin dashboard table ui, neuctra ui table, customizable table component, react data grid alternative, table head body row cell react, dark mode table ui, structured data table component",
  path: "/docs/table",
});

const tableFaq = buildComponentFaq("Table");

export default function TableLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Table", path: "/docs/table" },
          ]),
          techArticleSchema({
            name: "Table",
            description: DESCRIPTION,
            path: "/docs/table",
          }),
          faqSchema(tableFaq),
        ]}
      />
      {children}
    </>
  );
}
