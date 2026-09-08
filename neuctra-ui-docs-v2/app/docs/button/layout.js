import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Button Component — React UI for SaaS Dashboards | Neuctra UI";
const DESCRIPTION =
  "Build modern, accessible React button components for SaaS apps with Neuctra UI. Supports variants, sizes, loading states, icons, and full-width layouts for dashboards and forms.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react button component, saas ui buttons, tailwind button react, dashboard ui button, authentication button react, loading button ui, icon button react, responsive button component, neuctra ui button",
  path: "/docs/button",
});

const buttonFaq = buildComponentFaq("Button", {
  variants: [
    "default",
    "outline",
    "ghost",
    "secondary",
    "destructive",
    "success",
    "warning",
    "info",
  ],
  sizes: ["xs", "sm", "md", "lg", "xl"],
});

export default function ButtonLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Button", path: "/docs/button" },
          ]),
          techArticleSchema({
            name: "Button",
            description: DESCRIPTION,
            path: "/docs/button",
          }),
          faqSchema(buttonFaq),
        ]}
      />
      {children}
    </>
  );
}
