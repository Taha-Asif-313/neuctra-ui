import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Time Range Picker - React Start and End Time | Neuctra UI";
const DESCRIPTION =
  "Pick a validated start and end time with two native selects, configurable minute steps, optional bounds and clear inline validation.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react time range picker, start end time select, time range component react, business hours picker, neuctra ui time range",
  path: "/docs/time-range-picker",
});

const timeRangeFaq = buildComponentFaq("TimeRangePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

export default function TimeRangePickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Time Range Picker", path: "/docs/time-range-picker" },
          ]),
          techArticleSchema({
            name: "TimeRangePicker",
            description: DESCRIPTION,
            path: "/docs/time-range-picker",
          }),
          faqSchema(timeRangeFaq),
        ]}
      />
      {children}
    </>
  );
}
