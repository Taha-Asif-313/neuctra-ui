import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "DatePicker & Calendar — React Date Selection | Neuctra UI";
const DESCRIPTION =
  "Dependency-free React date picker with an inline calendar: min/max ranges, disabled dates, localized month grid, clearable trigger and popover behavior.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react date picker, calendar component react, date input ui, tailwind datepicker, month calendar react, neuctra ui date picker",
  path: "/docs/date-picker",
});

const datePickerFaq = buildComponentFaq("DatePicker", {
  sizes: ["sm", "md", "lg"],
});

export default function DatePickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Date Picker", path: "/docs/date-picker" },
          ]),
          techArticleSchema({
            name: "DatePicker",
            description: DESCRIPTION,
            path: "/docs/date-picker",
          }),
          faqSchema(datePickerFaq),
        ]}
      />
      {children}
    </>
  );
}
