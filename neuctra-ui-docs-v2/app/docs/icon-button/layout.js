import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Icon Button Component — React UI for SaaS Dashboards | Neuctra UI";
const DESCRIPTION =
  "Build accessible, icon-only React buttons for SaaS apps with Neuctra UI. Supports variants, sizes, and full icon customization for toolbars, cards, and dashboards.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react icon button component, saas ui icon button, tailwind icon button react, dashboard ui icon button, icon only button react, accessible icon button, neuctra ui icon button",
  path: "/docs/icon-button",
});

const iconButtonFaq = buildComponentFaq("IconButton", {
  variants: [
    "default",
    "soft",
    "outline",
    "ghost",
    "secondary",
    "destructive",
    "success",
    "warning",
    "info",
    "link",
  ],
  sizes: ["xs", "sm", "md", "lg", "xl"],
});

export default function IconButtonLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Icon Button", path: "/docs/icon-button" },
          ]),
          techArticleSchema({
            name: "IconButton",
            description: DESCRIPTION,
            path: "/docs/icon-button",
          }),
          faqSchema(iconButtonFaq),
        ]}
      />
      {children}
    </>
  );
}
