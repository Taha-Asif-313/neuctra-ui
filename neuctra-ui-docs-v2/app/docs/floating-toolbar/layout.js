import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Floating Toolbar Component - React Context Action Bar | Neuctra UI";
const DESCRIPTION =
  "A React floating toolbar of icon actions with roving keyboard focus, toggle and danger states, sizes, and either fixed viewport positioning or inline placement.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react floating toolbar, context action bar, portal toolbar react, icon toolbar component, floating action buttons, tailwind toolbar, neuctra ui",
  path: "/docs/floating-toolbar",
});

const floatingToolbarFaq = buildComponentFaq("FloatingToolbar");

export default function FloatingToolbarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Floating Toolbar", path: "/docs/floating-toolbar" },
          ]),
          techArticleSchema({
            name: "FloatingToolbar",
            description: DESCRIPTION,
            path: "/docs/floating-toolbar",
          }),
          faqSchema(floatingToolbarFaq),
        ]}
      />
      {children}
    </>
  );
}
