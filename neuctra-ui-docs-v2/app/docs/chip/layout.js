import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Chip Component — React Removable Tags | Neuctra UI";
const DESCRIPTION =
  "React chip component for tags and filters. Solid, soft and outline variants, four colors, three sizes, icons and removable state — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react chip component, removable tag react, filter chip ui, tailwind chip, tag component react, neuctra ui chip",
  path: "/docs/chip",
});

const chipFaq = buildComponentFaq("Chip", {
  variants: ["solid", "soft", "outline"],
  sizes: ["sm", "md", "lg"],
});

export default function ChipLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Chip", path: "/docs/chip" },
          ]),
          techArticleSchema({
            name: "Chip",
            description: DESCRIPTION,
            path: "/docs/chip",
          }),
          faqSchema(chipFaq),
        ]}
      />
      {children}
    </>
  );
}
