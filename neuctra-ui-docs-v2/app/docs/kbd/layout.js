import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Kbd Component — React Keyboard Shortcut Keys | Neuctra UI";
const DESCRIPTION =
  "React kbd component for rendering keyboard shortcuts and key combinations with a native <kbd> element, styled with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react kbd component, keyboard shortcut ui, key combination react, shortcut keys component, neuctra ui kbd",
  path: "/docs/kbd",
});

const kbdFaq = buildComponentFaq("Kbd", {
  sizes: ["sm", "md"],
});

export default function KbdLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Kbd", path: "/docs/kbd" },
          ]),
          techArticleSchema({
            name: "Kbd",
            description: DESCRIPTION,
            path: "/docs/kbd",
          }),
          faqSchema(kbdFaq),
        ]}
      />
      {children}
    </>
  );
}
