import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Tooltip Component — React Hover Hints | Neuctra UI";
const DESCRIPTION =
  "Accessible React tooltip shown on hover and keyboard focus. Four positions, show delay, Escape dismissal and WCAG-friendly behavior — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react tooltip component, hover hint ui, accessible tooltip react, tailwind tooltip, neuctra ui tooltip",
  path: "/docs/tooltip",
});

const tooltipFaq = buildComponentFaq("Tooltip");

export default function TooltipLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Tooltip", path: "/docs/tooltip" },
          ]),
          techArticleSchema({
            name: "Tooltip",
            description: DESCRIPTION,
            path: "/docs/tooltip",
          }),
          faqSchema(tooltipFaq),
        ]}
      />
      {children}
    </>
  );
}
