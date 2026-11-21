import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Menubar Component - Accessible React Application Menu | Neuctra UI";
const DESCRIPTION =
  "Build an accessible application menubar with roving focus, arrow-key navigation, submenus, shortcuts, and Escape or outside-click dismissal.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react menubar, accessible application menu, roving focus menubar, react submenu component, keyboard navigation menu, tailwind menubar, neuctra ui",
  path: "/docs/menubar",
});

const menubarFaq = buildComponentFaq("Menubar");

export default function MenubarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Menubar", path: "/docs/menubar" },
          ]),
          techArticleSchema({
            name: "Menubar",
            description: DESCRIPTION,
            path: "/docs/menubar",
          }),
          faqSchema(menubarFaq),
        ]}
      />
      {children}
    </>
  );
}
