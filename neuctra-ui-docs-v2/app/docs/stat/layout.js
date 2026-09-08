import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Stat Component — React KPI & Metric Cards | Neuctra UI";
const DESCRIPTION =
  "React stat component for dashboards: KPI value, label, icon, trend indicator with up/down arrows and helper text — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react stat component, kpi card react, metric card dashboard, trend indicator ui, dashboard stats react, neuctra ui stat",
  path: "/docs/stat",
});

const statFaq = buildComponentFaq("Stat");

export default function StatLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Stat", path: "/docs/stat" },
          ]),
          techArticleSchema({
            name: "Stat",
            description: DESCRIPTION,
            path: "/docs/stat",
          }),
          faqSchema(statFaq),
        ]}
      />
      {children}
    </>
  );
}
