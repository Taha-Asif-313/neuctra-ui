import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Divider Component — React Separator | Neuctra UI";
const DESCRIPTION =
  "React divider component for separating content. Horizontal and vertical orientation, optional centered label, dashed style and spacing scales — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react divider component, separator react, horizontal rule react, tailwind divider, neuctra ui divider",
  path: "/docs/divider",
});

const dividerFaq = buildComponentFaq("Divider");

export default function DividerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Divider", path: "/docs/divider" },
          ]),
          techArticleSchema({
            name: "Divider",
            description: DESCRIPTION,
            path: "/docs/divider",
          }),
          faqSchema(dividerFaq),
        ]}
      />
      {children}
    </>
  );
}
