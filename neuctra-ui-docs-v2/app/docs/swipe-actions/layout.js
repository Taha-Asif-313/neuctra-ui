import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Swipe Actions - React Reveal on Swipe | Neuctra UI";
const DESCRIPTION =
  "Reveal contextual actions with pointer-driven left and right swipes, a configurable threshold and keyboard-reachable action buttons.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react swipe actions, swipe to reveal react, list item actions tailwind, touch actions component, neuctra ui swipe actions",
  path: "/docs/swipe-actions",
});

const swipeActionsFaq = buildComponentFaq("SwipeActions", {
  variants: ["left rail", "right rail", "destructive action"],
});

export default function SwipeActionsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Swipe Actions", path: "/docs/swipe-actions" },
          ]),
          techArticleSchema({
            name: "SwipeActions",
            description: DESCRIPTION,
            path: "/docs/swipe-actions",
          }),
          faqSchema(swipeActionsFaq),
        ]}
      />
      {children}
    </>
  );
}
