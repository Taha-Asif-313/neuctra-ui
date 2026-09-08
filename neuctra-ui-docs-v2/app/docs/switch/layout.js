import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Switch Component — React Toggle UI for SaaS Applications | Neuctra UI";
const DESCRIPTION =
  "Flexible React Switch component for SaaS dashboards and forms. Supports single toggle and group multi-select modes, with full TypeScript support, keyboard accessibility, validation states, and Tailwind-based styling.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react switch component, toggle switch react, saas ui switch, tailwind switch component, multi switch group react, form toggle component, neuctra ui switch, accessible switch react, settings toggle ui, permissions switch react, dashboard toggle component, ui library switch",
  path: "/docs/switch",
});

const switchFaq = buildComponentFaq("Switch");

export default function SwitchLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Switch", path: "/docs/switch" },
          ]),
          techArticleSchema({
            name: "Switch",
            description: DESCRIPTION,
            path: "/docs/switch",
          }),
          faqSchema(switchFaq),
        ]}
      />
      {children}
    </>
  );
}
