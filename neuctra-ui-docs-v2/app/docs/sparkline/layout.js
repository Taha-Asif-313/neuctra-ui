import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Sparkline - React SVG Trend Chart | Neuctra UI";
const DESCRIPTION =
  "A lightweight React sparkline: a pure SVG trend chart with semantic tone colors, optional area fill, configurable stroke width and an accessible label.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react sparkline, svg sparkline react, tiny trend chart component, tailwind sparkline, neuctra ui sparkline",
  path: "/docs/sparkline",
});

const sparklineFaq = buildComponentFaq("Sparkline");

export default function SparklineLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Sparkline", path: "/docs/sparkline" },
          ]),
          techArticleSchema({
            name: "Sparkline",
            description: DESCRIPTION,
            path: "/docs/sparkline",
          }),
          faqSchema(sparklineFaq),
        ]}
      />
      {children}
    </>
  );
}
