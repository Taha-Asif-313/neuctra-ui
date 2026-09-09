import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Pagination Component — React Page Navigation | Neuctra UI";
const DESCRIPTION =
  "Accessible React pagination with smart ellipsis, sibling count control, three sizes and full keyboard support — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react pagination component, page navigation ui, tailwind pagination, table pagination react, neuctra ui pagination",
  path: "/docs/pagination",
});

const paginationFaq = buildComponentFaq("Pagination", {
  sizes: ["sm", "md", "lg"],
});

export default function PaginationLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Pagination", path: "/docs/pagination" },
          ]),
          techArticleSchema({
            name: "Pagination",
            description: DESCRIPTION,
            path: "/docs/pagination",
          }),
          faqSchema(paginationFaq),
        ]}
      />
      {children}
    </>
  );
}
