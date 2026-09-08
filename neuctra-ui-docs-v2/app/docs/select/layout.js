import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Select Component — React Dropdown for SaaS Dashboards | Neuctra UI";
const DESCRIPTION =
  "Powerful React Select component for SaaS applications with Tailwind CSS support. Includes single & multi-select, searchable dropdowns, rich option rendering, icons, validation states, and full keyboard accessibility.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react select component, tailwind select dropdown, saas ui select, multi select react, searchable dropdown react, neuctra ui select, form select component, react dropdown menu, accessible select component, ui library select input, dashboard form components, react form controls",
  path: "/docs/select",
});

const selectFaq = buildComponentFaq("Select", {
  sizes: ["sm", "md", "lg"],
});

export default function SelectLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Select", path: "/docs/select" },
          ]),
          techArticleSchema({
            name: "Select",
            description: DESCRIPTION,
            path: "/docs/select",
          }),
          faqSchema(selectFaq),
        ]}
      />
      {children}
    </>
  );
}
