import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Card Component — React Content Container | Neuctra UI";
const DESCRIPTION =
  "Composable React card component with header, body and footer sections. Supports outline, elevated and ghost variants, hover states and padding scales — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react card component, tailwind card ui, card container react, dashboard card component, neuctra ui card",
  path: "/docs/card",
});

const cardFaq = buildComponentFaq("Card", {
  variants: ["default", "outline", "elevated", "ghost"],
});

export default function CardLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Card", path: "/docs/card" },
          ]),
          techArticleSchema({
            name: "Card",
            description: DESCRIPTION,
            path: "/docs/card",
          }),
          faqSchema(cardFaq),
        ]}
      />
      {children}
    </>
  );
}
