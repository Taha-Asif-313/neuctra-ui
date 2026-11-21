import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Filter Bar - React Filter Component | Neuctra UI";
const DESCRIPTION =
  "A compact React filter bar for building search UIs: field definitions, removable chips, select and multi-select controls, clear and save-view actions.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react filter bar, filter chips react, tailwind filter component, multi select filter ui, neuctra ui filter bar",
  path: "/docs/filter-bar",
});

const filterBarFaq = buildComponentFaq("FilterBar", {
  variants: ["card", "plain"],
  sizes: ["sm", "md"],
});

export default function FilterBarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Filter Bar", path: "/docs/filter-bar" },
          ]),
          techArticleSchema({
            name: "FilterBar",
            description: DESCRIPTION,
            path: "/docs/filter-bar",
          }),
          faqSchema(filterBarFaq),
        ]}
      />
      {children}
    </>
  );
}
