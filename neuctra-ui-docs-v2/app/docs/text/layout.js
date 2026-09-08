import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Text Component — Neuctra UI";
const DESCRIPTION =
  "Learn how to use the Text component in Neuctra UI — a modern polymorphic typography component with semantic rendering, text styling utilities, and Tailwind CSS support.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Neuctra UI Text, React typography component, polymorphic component React, Tailwind typography, truncate text UI",
  path: "/docs/text",
});

const textFaq = buildComponentFaq("Text");

export default function TextLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Text", path: "/docs/text" },
          ]),
          techArticleSchema({
            name: "Text",
            description: DESCRIPTION,
            path: "/docs/text",
          }),
          faqSchema(textFaq),
        ]}
      />
      {children}
    </>
  );
}
