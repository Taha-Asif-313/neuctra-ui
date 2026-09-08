import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "CopyButton Component — React Copy to Clipboard | Neuctra UI";
const DESCRIPTION =
  "React copy-to-clipboard button with success feedback, secure-context fallback, sizes and label support — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react copy button, copy to clipboard component, clipboard react, copy code button, neuctra ui copy button",
  path: "/docs/copy-button",
});

const copyButtonFaq = buildComponentFaq("CopyButton", {
  sizes: ["sm", "md", "lg"],
});

export default function CopyButtonLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Copy Button", path: "/docs/copy-button" },
          ]),
          techArticleSchema({
            name: "CopyButton",
            description: DESCRIPTION,
            path: "/docs/copy-button",
          }),
          faqSchema(copyButtonFaq),
        ]}
      />
      {children}
    </>
  );
}
