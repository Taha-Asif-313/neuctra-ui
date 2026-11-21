import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Table Of Contents - React Sticky Anchor Nav | Neuctra UI";
const DESCRIPTION =
  "A lightweight sticky table of contents with built-in scroll spy, indentation by heading level and smooth, offset-aware scrolling that also moves keyboard focus.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react table of contents, sticky anchor navigation, active heading react, on this page component, tailwind toc, neuctra ui table of contents",
  path: "/docs/table-of-contents",
});

const tocFaq = buildComponentFaq("TableOfContents", { sizes: ["sm", "md"] });

export default function TableOfContentsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Table Of Contents", path: "/docs/table-of-contents" },
          ]),
          techArticleSchema({
            name: "TableOfContents",
            description: DESCRIPTION,
            path: "/docs/table-of-contents",
          }),
          faqSchema(tocFaq),
        ]}
      />
      {children}
    </>
  );
}
