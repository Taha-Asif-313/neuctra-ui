import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Code Block - React Code Snippet Component | Neuctra UI";
const DESCRIPTION =
  "A dependency-free React code block with lightweight token styling, line numbers, highlighted lines, a copy button, tabs, line wrapping and filename headers.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react code block, code snippet component react, syntax styling tailwind, copyable code block, neuctra ui code block",
  path: "/docs/code-block",
});

const codeBlockFaq = buildComponentFaq("CodeBlock", { sizes: ["sm", "md"] });

export default function CodeBlockLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Code Block", path: "/docs/code-block" },
          ]),
          techArticleSchema({
            name: "CodeBlock",
            description: DESCRIPTION,
            path: "/docs/code-block",
          }),
          faqSchema(codeBlockFaq),
        ]}
      />
      {children}
    </>
  );
}
