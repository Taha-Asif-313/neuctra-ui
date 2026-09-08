import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Skeleton Component — React Loading Placeholders | Neuctra UI";
const DESCRIPTION =
  "React skeleton loading component with text, circular and rectangular variants, multi-line paragraphs and reduced-motion support — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react skeleton loader, loading placeholder react, shimmer ui, skeleton screen component, tailwind skeleton, neuctra ui skeleton",
  path: "/docs/skeleton",
});

const skeletonFaq = buildComponentFaq("Skeleton", {
  variants: ["text", "circular", "rectangular"],
});

export default function SkeletonLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Skeleton", path: "/docs/skeleton" },
          ]),
          techArticleSchema({
            name: "Skeleton",
            description: DESCRIPTION,
            path: "/docs/skeleton",
          }),
          faqSchema(skeletonFaq),
        ]}
      />
      {children}
    </>
  );
}
