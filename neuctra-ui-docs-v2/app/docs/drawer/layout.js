import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "React Drawer Component - Sliding Sidebar & Headless UI Panel | Neuctra UI";
const DESCRIPTION =
  "Build modern sliding drawer panels in React with Neuctra UI. Supports controlled and headless modes, multiple positions, overlay control, animations, and fully customizable layouts for sidebars, menus, and mobile sheets.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react drawer, drawer component react, sidebar drawer, sliding panel ui, headless drawer react, modal drawer, offcanvas menu react, react ui components, neuctra ui drawer, mobile bottom sheet, customizable drawer component",
  path: "/docs/drawer",
});

const drawerFaq = buildComponentFaq("Drawer");

export default function DrawerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Drawer", path: "/docs/drawer" },
          ]),
          techArticleSchema({
            name: "Drawer",
            description: DESCRIPTION,
            path: "/docs/drawer",
          }),
          faqSchema(drawerFaq),
        ]}
      />
      {children}
    </>
  );
}
