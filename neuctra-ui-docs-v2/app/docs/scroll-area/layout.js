import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Scroll Area - React Custom Scroll Container | Neuctra UI";
const DESCRIPTION =
  "A theme-aware scroll container with constrained dimensions, configurable axes, keyboard scrolling and subtly styled scrollbars using semantic Tailwind tokens.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react scroll area, custom scrollbar react, scroll container tailwind, overflow component react, neuctra ui scroll area",
  path: "/docs/scroll-area",
});

const scrollAreaFaq = buildComponentFaq("ScrollArea", { sizes: ["sm", "md"] });

export default function ScrollAreaLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Scroll Area", path: "/docs/scroll-area" },
          ]),
          techArticleSchema({
            name: "ScrollArea",
            description: DESCRIPTION,
            path: "/docs/scroll-area",
          }),
          faqSchema(scrollAreaFaq),
        ]}
      />
      {children}
    </>
  );
}
