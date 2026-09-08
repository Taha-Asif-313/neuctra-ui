import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "TagInput Component — React Tags Field | Neuctra UI";
const DESCRIPTION =
  "React tag input with Enter/comma commit, Backspace removal, duplicate filtering, max-tag limits, validation hook and error states — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react tag input, tags field component, multi value input react, keywords input ui, tailwind tag input, neuctra ui tag input",
  path: "/docs/tag-input",
});

const tagInputFaq = buildComponentFaq("TagInput", {
  sizes: ["sm", "md", "lg"],
});

export default function TagInputLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Tag Input", path: "/docs/tag-input" },
          ]),
          techArticleSchema({
            name: "TagInput",
            description: DESCRIPTION,
            path: "/docs/tag-input",
          }),
          faqSchema(tagInputFaq),
        ]}
      />
      {children}
    </>
  );
}
