import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Date Range Picker - React Date Range Component | Neuctra UI";
const DESCRIPTION =
  "A dependency-free React date range picker with one or two month grids, quick presets, min/max dates and locale-aware formatting.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react date range picker, date range component react, dual month calendar, tailwind datepicker range, neuctra ui date range",
  path: "/docs/date-range-picker",
});

const dateRangePickerFaq = buildComponentFaq("DateRangePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

export default function DateRangePickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Date Range Picker", path: "/docs/date-range-picker" },
          ]),
          techArticleSchema({
            name: "DateRangePicker",
            description: DESCRIPTION,
            path: "/docs/date-range-picker",
          }),
          faqSchema(dateRangePickerFaq),
        ]}
      />
      {children}
    </>
  );
}
