import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Lightbox Component - Accessible React Image Viewer | Neuctra UI";
const DESCRIPTION =
  "An accessible React lightbox with keyboard navigation, zoom, scroll locking, focus trapping, and a thumbnail strip. Build a responsive image gallery with Neuctra UI.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react lightbox component, accessible image viewer, react image gallery, keyboard image navigation, zoomable lightbox, tailwind lightbox, neuctra ui lightbox",
  path: "/docs/lightbox",
});

const lightboxFaq = buildComponentFaq("Lightbox");

export default function LightboxLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Lightbox", path: "/docs/lightbox" },
          ]),
          techArticleSchema({
            name: "Lightbox",
            description: DESCRIPTION,
            path: "/docs/lightbox",
          }),
          faqSchema(lightboxFaq),
        ]}
      />
      {children}
    </>
  );
}
