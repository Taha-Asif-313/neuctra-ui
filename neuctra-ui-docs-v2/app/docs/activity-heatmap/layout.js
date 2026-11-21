import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Activity Heatmap Component - React Contribution Grid | Neuctra UI";
const DESCRIPTION =
  "Render a compact activity or contribution heatmap with semantic color tokens, intensity levels, clickable days, and an optional week window.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react activity heatmap, contribution graph react, github style heatmap, react calendar heatmap, activity grid component, tailwind heatmap, neuctra ui",
  path: "/docs/activity-heatmap",
});

const activityHeatmapFaq = buildComponentFaq("ActivityHeatmap", {
  sizes: ["sm", "md", "lg"],
});

export default function ActivityHeatmapLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Activity Heatmap", path: "/docs/activity-heatmap" },
          ]),
          techArticleSchema({
            name: "ActivityHeatmap",
            description: DESCRIPTION,
            path: "/docs/activity-heatmap",
          }),
          faqSchema(activityHeatmapFaq),
        ]}
      />
      {children}
    </>
  );
}
