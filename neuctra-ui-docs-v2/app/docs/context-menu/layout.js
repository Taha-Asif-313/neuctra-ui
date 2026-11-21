import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Context Menu Component - React Right-Click Menus | Neuctra UI";
const DESCRIPTION =
  "React context menu anchored to the pointer with keyboard navigation, shortcut hints, separators, danger actions, and nested submenus.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react context menu, react right click menu, pointer positioned menu, keyboard navigable menu react, nested submenu react, shortcut hints ui, neuctra ui context menu",
  path: "/docs/context-menu",
});

const contextMenuFaq = buildComponentFaq("ContextMenu");

export default function ContextMenuLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Context Menu", path: "/docs/context-menu" },
          ]),
          techArticleSchema({
            name: "Context Menu",
            description: DESCRIPTION,
            path: "/docs/context-menu",
          }),
          faqSchema(contextMenuFaq),
        ]}
      />
      {children}
    </>
  );
}
