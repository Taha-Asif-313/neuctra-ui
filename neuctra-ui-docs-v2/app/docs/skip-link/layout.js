import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Skip Link Component - React Keyboard Accessibility | Neuctra UI";
const DESCRIPTION =
  "Accessible React skip link that stays visually hidden until focused, then jumps keyboard focus to the main content landmark.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react skip link, skip to content react, keyboard accessibility react, screen reader navigation, wcag skip link, accessible main landmark, neuctra ui skip link",
  path: "/docs/skip-link",
});

const skipLinkFaq = buildComponentFaq("SkipLink");

export default function SkipLinkLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Skip Link", path: "/docs/skip-link" },
          ]),
          techArticleSchema({
            name: "Skip Link",
            description: DESCRIPTION,
            path: "/docs/skip-link",
          }),
          faqSchema(skipLinkFaq),
        ]}
      />
      {children}
    </>
  );
}
