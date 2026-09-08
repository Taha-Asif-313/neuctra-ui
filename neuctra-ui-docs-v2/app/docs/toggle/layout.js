import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Toggle & ToggleGroup — React Segmented Controls | Neuctra UI";
const DESCRIPTION =
  "React toggle button and segmented toggle group with single and multiple selection, icons, sizes and aria-pressed semantics — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react toggle button, segmented control react, toggle group ui, toolbar buttons react, view switcher component, neuctra ui toggle",
  path: "/docs/toggle",
});

const toggleGroupFaq = buildComponentFaq("ToggleGroup", {
  sizes: ["sm", "md", "lg"],
});

export default function ToggleLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Toggle Group", path: "/docs/toggle" },
          ]),
          techArticleSchema({
            name: "ToggleGroup",
            description: DESCRIPTION,
            path: "/docs/toggle",
          }),
          faqSchema(toggleGroupFaq),
        ]}
      />
      {children}
    </>
  );
}
