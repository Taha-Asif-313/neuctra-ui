import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Popover Component — React Click-Triggered Panel | Neuctra UI";
const DESCRIPTION =
  "React popover component with rich content, twelve placement combinations, outside-click and Escape dismissal, controlled and uncontrolled modes.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react popover component, click popup panel, tailwind popover, floating panel react, neuctra ui popover",
  path: "/docs/popover",
});

const popoverFaq = buildComponentFaq("Popover");

export default function PopoverLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Popover", path: "/docs/popover" },
          ]),
          techArticleSchema({
            name: "Popover",
            description: DESCRIPTION,
            path: "/docs/popover",
          }),
          faqSchema(popoverFaq),
        ]}
      />
      {children}
    </>
  );
}
