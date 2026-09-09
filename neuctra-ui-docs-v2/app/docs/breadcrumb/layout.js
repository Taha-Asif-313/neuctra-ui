import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Breadcrumb Component — React Navigation Trail | Neuctra UI";
const DESCRIPTION =
  "Accessible React breadcrumb navigation with icons, custom separators, SPA click handlers and automatic ellipsis collapsing for deep paths — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react breadcrumb component, breadcrumb navigation ui, tailwind breadcrumbs, navigation trail react, neuctra ui breadcrumb",
  path: "/docs/breadcrumb",
});

const breadcrumbFaq = buildComponentFaq("Breadcrumb", { sizes: ["sm", "md"] });

export default function BreadcrumbLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Breadcrumb", path: "/docs/breadcrumb" },
          ]),
          techArticleSchema({
            name: "Breadcrumb",
            description: DESCRIPTION,
            path: "/docs/breadcrumb",
          }),
          faqSchema(breadcrumbFaq),
        ]}
      />
      {children}
    </>
  );
}
