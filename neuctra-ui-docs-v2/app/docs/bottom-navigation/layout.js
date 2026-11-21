import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Bottom Navigation - React Mobile Tab Bar | Neuctra UI";
const DESCRIPTION =
  "A bottom navigation bar for mobile layouts with icons, labels, badges, active-page state and safe-area padding. Pin it to the viewport, a container, or keep it in flow.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react bottom navigation, mobile tab bar react, bottom nav component tailwind, badge navigation react, neuctra ui bottom navigation",
  path: "/docs/bottom-navigation",
});

const bottomNavigationFaq = buildComponentFaq("BottomNavigation");

export default function BottomNavigationLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Bottom Navigation", path: "/docs/bottom-navigation" },
          ]),
          techArticleSchema({
            name: "BottomNavigation",
            description: DESCRIPTION,
            path: "/docs/bottom-navigation",
          }),
          faqSchema(bottomNavigationFaq),
        ]}
      />
      {children}
    </>
  );
}
