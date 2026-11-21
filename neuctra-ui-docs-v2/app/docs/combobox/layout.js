import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Combobox - React Searchable Select | Neuctra UI";
const DESCRIPTION =
  "A React combobox with keyboard navigation, async option loading, multi-select, creatable values and optional grouping.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react combobox, searchable select react, async select component, creatable combobox, tailwind combobox neuctra ui",
  path: "/docs/combobox",
});

const comboboxFaq = buildComponentFaq("Combobox", {
  sizes: ["xs", "sm", "md", "lg"],
});

export default function ComboboxLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Combobox", path: "/docs/combobox" },
          ]),
          techArticleSchema({
            name: "Combobox",
            description: DESCRIPTION,
            path: "/docs/combobox",
          }),
          faqSchema(comboboxFaq),
        ]}
      />
      {children}
    </>
  );
}
