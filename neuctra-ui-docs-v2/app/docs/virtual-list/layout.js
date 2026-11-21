import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Virtual List - React Windowed List | Neuctra UI";
const DESCRIPTION =
  "Render thousands of rows smoothly with a dependency-free virtualized list: fixed or estimated row sizes, overscan, custom keys and a render prop.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react virtual list, windowed list react, virtualized rows, react list performance, tailwind virtual scroll, neuctra ui virtual list",
  path: "/docs/virtual-list",
});

const virtualListFaq = buildComponentFaq("VirtualList", {
  variants: ["fixed row height", "estimated row height"],
});

export default function VirtualListLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Virtual List", path: "/docs/virtual-list" },
          ]),
          techArticleSchema({
            name: "VirtualList",
            description: DESCRIPTION,
            path: "/docs/virtual-list",
          }),
          faqSchema(virtualListFaq),
        ]}
      />
      {children}
    </>
  );
}
