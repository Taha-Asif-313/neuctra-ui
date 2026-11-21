import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Tree View - React Hierarchical Navigation | Neuctra UI";
const DESCRIPTION =
  "Accessible tree navigation with expand and collapse, single selection, disabled nodes, custom icons, guide lines, type-ahead and roving keyboard focus.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react tree view, tree component react, hierarchical navigation, expandable tree react, accessible treeview, neuctra ui tree",
  path: "/docs/tree-view",
});

const treeViewFaq = buildComponentFaq("TreeView", { sizes: ["sm", "md"] });

export default function TreeViewLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Tree View", path: "/docs/tree-view" },
          ]),
          techArticleSchema({
            name: "TreeView",
            description: DESCRIPTION,
            path: "/docs/tree-view",
          }),
          faqSchema(treeViewFaq),
        ]}
      />
      {children}
    </>
  );
}
