import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Badge Component — React Notification & Label UI | Neuctra UI";
const DESCRIPTION =
  "Build flexible badge components with Neuctra UI. Supports notification dots, counts, icons, variants, sizes, and interactive states for modern UI indicators.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react badge component, notification badge ui, count badge react, icon badge, status badge ui, dot indicator react, ui badge component, neuctra ui badge",
  path: "/docs/badge",
});

const badgeFaq = buildComponentFaq("Badge", {
  variants: ["solid", "outline", "soft"],
  sizes: ["sm", "md", "lg"],
});

export default function BadgeLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Badge", path: "/docs/badge" },
          ]),
          techArticleSchema({
            name: "Badge",
            description: DESCRIPTION,
            path: "/docs/badge",
          }),
          faqSchema(badgeFaq),
        ]}
      />
      {children}
    </>
  );
}
