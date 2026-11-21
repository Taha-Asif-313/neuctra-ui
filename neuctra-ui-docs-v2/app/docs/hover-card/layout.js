import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Hover Card - React Hover Preview Component | Neuctra UI";
const DESCRIPTION =
  "A React hover card that opens a delayed preview panel on hover or focus, with configurable side, delays and viewport-clamped positioning.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react hover card, hover preview react, popover on hover tailwind, accessible hover card component, neuctra ui hover card",
  path: "/docs/hover-card",
});

const hoverCardFaq = buildComponentFaq("HoverCard");

export default function HoverCardLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Hover Card", path: "/docs/hover-card" },
          ]),
          techArticleSchema({
            name: "HoverCard",
            description: DESCRIPTION,
            path: "/docs/hover-card",
          }),
          faqSchema(hoverCardFaq),
        ]}
      />
      {children}
    </>
  );
}
