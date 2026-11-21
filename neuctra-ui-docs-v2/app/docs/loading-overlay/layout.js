import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Loading Overlay Component - React Region Loading Scrim | Neuctra UI";
const DESCRIPTION =
  "React loading overlay that covers a region with an accessible busy scrim, spinner, and label while its children stay mounted.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react loading overlay, react loading scrim, aria busy region, loading spinner overlay, section loading state react, Tailwind loading overlay, neuctra ui loading overlay",
  path: "/docs/loading-overlay",
});

const loadingOverlayFaq = buildComponentFaq("LoadingOverlay");

export default function LoadingOverlayLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Loading Overlay", path: "/docs/loading-overlay" },
          ]),
          techArticleSchema({
            name: "Loading Overlay",
            description: DESCRIPTION,
            path: "/docs/loading-overlay",
          }),
          faqSchema(loadingOverlayFaq),
        ]}
      />
      {children}
    </>
  );
}
