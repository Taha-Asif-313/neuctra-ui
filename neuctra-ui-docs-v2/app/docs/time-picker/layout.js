import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "TimePicker Component — React Time Selection | Neuctra UI";
const DESCRIPTION =
  "Dependency-free React time picker: an Input-style trigger opening a scrollable list of time options, configurable step/hour range, clearable trigger and popover behavior, built the same way as DatePicker.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react time picker, time input ui, tailwind timepicker, time selection component react, neuctra ui time picker",
  path: "/docs/time-picker",
});

const timePickerFaq = buildComponentFaq("TimePicker", {
  sizes: ["sm", "md", "lg"],
});

export default function TimePickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Time Picker", path: "/docs/time-picker" },
          ]),
          techArticleSchema({
            name: "TimePicker",
            description: DESCRIPTION,
            path: "/docs/time-picker",
          }),
          faqSchema(timePickerFaq),
        ]}
      />
      {children}
    </>
  );
}
