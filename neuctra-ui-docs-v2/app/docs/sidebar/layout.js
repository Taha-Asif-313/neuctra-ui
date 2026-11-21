import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Sidebar Component - React Navigation with Collapsible Sections | Neuctra UI";
const DESCRIPTION =
  "React sidebar navigation with grouped sections, active item styling, badges, optional collapsing, and header and footer slots for dashboard layouts.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react sidebar, react sidebar navigation, collapsible sidebar react, dashboard nav react, sidebar sections react, navigation badges, neuctra ui sidebar",
  path: "/docs/sidebar",
});

const sidebarFaq = buildComponentFaq("Sidebar");

export default function SidebarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Sidebar", path: "/docs/sidebar" },
          ]),
          techArticleSchema({
            name: "Sidebar",
            description: DESCRIPTION,
            path: "/docs/sidebar",
          }),
          faqSchema(sidebarFaq),
        ]}
      />
      {children}
    </>
  );
}
