import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "EmptyState Component — React No-Data Placeholder | Neuctra UI";
const DESCRIPTION =
  "React empty state component with icon, title, description and call-to-action slot for no-results and empty-list screens — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react empty state component, no data placeholder, no results ui, empty list component, tailwind empty state, neuctra ui",
  path: "/docs/empty-state",
});

const emptyStateFaq = buildComponentFaq("EmptyState", {
  sizes: ["sm", "md", "lg"],
});

export default function EmptyStateLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Empty State", path: "/docs/empty-state" },
          ]),
          techArticleSchema({
            name: "EmptyState",
            description: DESCRIPTION,
            path: "/docs/empty-state",
          }),
          faqSchema(emptyStateFaq),
        ]}
      />
      {children}
    </>
  );
}
