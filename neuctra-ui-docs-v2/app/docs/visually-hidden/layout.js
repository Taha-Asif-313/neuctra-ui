import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Visually Hidden Component - React sr-only Primitive | Neuctra UI";
const DESCRIPTION =
  "Hide content visually while keeping it available to screen readers with a polymorphic, accessible sr-only primitive for labels, hints and live announcements.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react visually hidden, sr-only component, screen reader only text, accessible hidden label react, visually hidden primitive, neuctra ui",
  path: "/docs/visually-hidden",
});

const visuallyHiddenFaq = buildComponentFaq("VisuallyHidden");

export default function VisuallyHiddenLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Visually Hidden", path: "/docs/visually-hidden" },
          ]),
          techArticleSchema({
            name: "VisuallyHidden",
            description: DESCRIPTION,
            path: "/docs/visually-hidden",
          }),
          faqSchema(visuallyHiddenFaq),
        ]}
      />
      {children}
    </>
  );
}
