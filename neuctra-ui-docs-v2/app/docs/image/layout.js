import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "React Image Component - Responsive Images with Overlay & Fallback | Neuctra UI";
const DESCRIPTION =
  "Build modern responsive image components in React with Neuctra UI. Supports lazy loading, overlays, aspect ratio control, fallback UI, click interactions, shadows, and full styling customization.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react image component, responsive image ui, image component react, lazy loading images, image overlay react, fallback image ui, ui image component, neuctra ui image, tailwind image component, customizable image component",
  path: "/docs/image",
});

const imageFaq = buildComponentFaq("Image");

export default function ImageLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Image", path: "/docs/image" },
          ]),
          techArticleSchema({
            name: "Image",
            description: DESCRIPTION,
            path: "/docs/image",
          }),
          faqSchema(imageFaq),
        ]}
      />
      {children}
    </>
  );
}
