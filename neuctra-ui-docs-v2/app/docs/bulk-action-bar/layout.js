import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Bulk Action Bar - React Selection Toolbar | Neuctra UI";
const DESCRIPTION =
  "A floating React bulk action bar that appears when rows are selected, showing the count, custom actions and a clear-selection button.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react bulk actions, selection toolbar react, floating action bar tailwind, table bulk actions component, neuctra ui bulk action bar",
  path: "/docs/bulk-action-bar",
});

const bulkActionBarFaq = buildComponentFaq("BulkActionBar", {
  sizes: ["sm", "md"],
});

export default function BulkActionBarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Bulk Action Bar", path: "/docs/bulk-action-bar" },
          ]),
          techArticleSchema({
            name: "BulkActionBar",
            description: DESCRIPTION,
            path: "/docs/bulk-action-bar",
          }),
          faqSchema(bulkActionBarFaq),
        ]}
      />
      {children}
    </>
  );
}
