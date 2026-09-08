import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Callout Component — React Inline Alert Banner | Neuctra UI";
const DESCRIPTION =
  "Static React alert banner for inline messages: info, success, warning, error and neutral types, soft and outline variants, dismissible with custom icons. Unlike toasts, callouts live in the page flow.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react alert banner, inline alert component, callout ui, notification banner react, tailwind alert, neuctra ui callout",
  path: "/docs/callout",
});

const calloutFaq = buildComponentFaq("Callout", {
  variants: ["soft", "outline"],
});

export default function CalloutLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Callout", path: "/docs/callout" },
          ]),
          techArticleSchema({
            name: "Callout",
            description: DESCRIPTION,
            path: "/docs/callout",
          }),
          faqSchema(calloutFaq),
        ]}
      />
      {children}
    </>
  );
}
