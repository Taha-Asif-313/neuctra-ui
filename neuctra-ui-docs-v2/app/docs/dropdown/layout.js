import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "React Dropdown Component - Action Menu with Icons & Controls | Neuctra UI";
const DESCRIPTION =
  "Build flexible dropdown menus in React with Neuctra UI. Supports icons, separators, controlled state, alignment, danger actions, and fully customizable styling for modern action menus.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react dropdown, dropdown menu component, action menu react, ui dropdown tailwind, customizable dropdown, react menu component, context menu react, neuctra ui dropdown, dropdown with icons, controlled dropdown",
  path: "/docs/dropdown",
});

const dropdownFaq = buildComponentFaq("Dropdown");

export default function DropdownLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Dropdown", path: "/docs/dropdown" },
          ]),
          techArticleSchema({
            name: "Dropdown",
            description: DESCRIPTION,
            path: "/docs/dropdown",
          }),
          faqSchema(dropdownFaq),
        ]}
      />
      {children}
    </>
  );
}
