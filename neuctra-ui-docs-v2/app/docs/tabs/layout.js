import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Tabs Component — Flexible Navigation System for React | Neuctra UI";
const DESCRIPTION =
  "Explore the Neuctra UI Tabs component for React. A fully accessible, responsive tab system with multiple variants, keyboard navigation, mobile support, and advanced customization for modern UI dashboards and apps.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react tabs component, tabs ui library, tab navigation react, flexible tabs system, responsive tabs component, headless tabs react, dashboard tabs ui, mobile tabs react, underline tabs, pill tabs, neuctra ui tabs",
  path: "/docs/tabs",
});

const tabsFaq = buildComponentFaq("Tabs", {
  variants: ["solid", "outline", "underline", "pill"],
});

export default function TabsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Tabs", path: "/docs/tabs" },
          ]),
          techArticleSchema({
            name: "Tabs",
            description: DESCRIPTION,
            path: "/docs/tabs",
          }),
          faqSchema(tabsFaq),
        ]}
      />
      {children}
    </>
  );
}
