import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "React Accordion Component - Expandable & Customizable | Neuctra UI";
const DESCRIPTION =
  "Build responsive and accessible React accordion components with Neuctra UI. Support for multiple open panels, custom icons, animations, styling overrides, and TypeScript.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react accordion, accordion component react, expandable content, collapsible panel, faq accordion, react ui components, typescript accordion, customizable accordion, neuctra ui",
  path: "/docs/accordion",
});

const accordionFaq = buildComponentFaq("Accordion");

export default function AccordionLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Accordion", path: "/docs/accordion" },
          ]),
          techArticleSchema({
            name: "Accordion",
            description: DESCRIPTION,
            path: "/docs/accordion",
          }),
          faqSchema(accordionFaq),
        ]}
      />
      {children}
    </>
  );
}
