import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Setting Row Component - React Preferences Layout | Neuctra UI";
const DESCRIPTION =
  "Lay out settings pages with a labeled row, helper description, and a right-aligned control. Built with semantic label associations and Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react setting row, preferences page layout, react settings ui, label control row, accessible settings component, tailwind setting row, neuctra ui",
  path: "/docs/setting-row",
});

const settingRowFaq = buildComponentFaq("SettingRow", {
  sizes: ["sm", "md", "lg"],
});

export default function SettingRowLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Setting Row", path: "/docs/setting-row" },
          ]),
          techArticleSchema({
            name: "SettingRow",
            description: DESCRIPTION,
            path: "/docs/setting-row",
          }),
          faqSchema(settingRowFaq),
        ]}
      />
      {children}
    </>
  );
}
