import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Error Boundary Component - React Error Fallback UI | Neuctra UI";
const DESCRIPTION =
  "React error boundary that catches render errors, shows a themed fallback with retry, supports custom fallback rendering, and resets on key changes.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react error boundary, react error fallback, component error handling react, custom error ui react, reset error boundary, Tailwind error state, neuctra ui error boundary",
  path: "/docs/error-boundary",
});

const errorBoundaryFaq = buildComponentFaq("ErrorBoundary");

export default function ErrorBoundaryLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Error Boundary", path: "/docs/error-boundary" },
          ]),
          techArticleSchema({
            name: "Error Boundary",
            description: DESCRIPTION,
            path: "/docs/error-boundary",
          }),
          faqSchema(errorBoundaryFaq),
        ]}
      />
      {children}
    </>
  );
}
