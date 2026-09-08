import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "List Component — Flexible UI Lists, Navigation & Tree Views | Neuctra UI";
const DESCRIPTION =
  "Explore the Neuctra UI List component for building flexible content lists, navigation menus, dropdown menus, icon lists, and nested tree structures. Supports React, TypeScript, and advanced features like collapsible submenus, active states, and custom renderers.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "React List component, UI list library, navigation list React, menu component, tree view React, nested list UI, dropdown menu component, icon list React, sidebar navigation list, flexible list component, Neuctra UI List",
  path: "/docs/list",
});

const listFaq = buildComponentFaq("List", {
  variants: ["default", "nav", "menu", "card", "ghost"],
  sizes: ["sm", "md", "lg"],
});

export default function ListLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "List", path: "/docs/list" },
          ]),
          techArticleSchema({
            name: "List",
            description: DESCRIPTION,
            path: "/docs/list",
          }),
          faqSchema(listFaq),
        ]}
      />
      {children}
    </>
  );
}
