import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Spinner Component — React Loading Indicator | Neuctra UI";
const DESCRIPTION =
  "Accessible React spinner component with five sizes, theme-aware colors and a screen-reader label — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react spinner component, loading indicator react, tailwind spinner, loader ui component, neuctra ui spinner",
  path: "/docs/spinner",
});

const spinnerFaq = buildComponentFaq("Spinner", {
  sizes: ["xs", "sm", "md", "lg", "xl"],
});

export default function SpinnerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Spinner", path: "/docs/spinner" },
          ]),
          techArticleSchema({
            name: "Spinner",
            description: DESCRIPTION,
            path: "/docs/spinner",
          }),
          faqSchema(spinnerFaq),
        ]}
      />
      {children}
    </>
  );
}
