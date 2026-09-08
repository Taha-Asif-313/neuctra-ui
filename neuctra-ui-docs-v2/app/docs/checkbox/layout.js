import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Checkbox Component — React Form Controls & Multi-Select UI | Neuctra UI";
const DESCRIPTION =
  "Build accessible and flexible React checkbox components with Neuctra UI. Supports single and group modes, multi-select, custom rendering, keyboard navigation, and full styling control.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react checkbox component, form checkbox ui, multi select checkbox react, group checkbox component, controlled checkbox react, form controls ui library, accessible checkbox react, neuctra ui checkbox",
  path: "/docs/checkbox",
});

const checkboxFaq = buildComponentFaq("Checkbox");

export default function CheckboxLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Checkbox", path: "/docs/checkbox" },
          ]),
          techArticleSchema({
            name: "Checkbox",
            description: DESCRIPTION,
            path: "/docs/checkbox",
          }),
          faqSchema(checkboxFaq),
        ]}
      />
      {children}
    </>
  );
}
