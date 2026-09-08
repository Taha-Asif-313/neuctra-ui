import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Textarea Component — Neuctra UI";
const DESCRIPTION =
  "Modern auto-resizing textarea component with chat-style behavior, keyboard interactions, and full customization.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Neuctra UI Textarea, React textarea auto resize, chat input textarea, Tailwind textarea, UI component",
  path: "/docs/textarea",
});

const textareaFaq = buildComponentFaq("Textarea");

export default function TextareaLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Textarea", path: "/docs/textarea" },
          ]),
          techArticleSchema({
            name: "Textarea",
            description: DESCRIPTION,
            path: "/docs/textarea",
          }),
          faqSchema(textareaFaq),
        ]}
      />
      {children}
    </>
  );
}
