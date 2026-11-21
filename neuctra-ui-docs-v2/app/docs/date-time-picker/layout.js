import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Date Time Picker - React Date and Time Field | Neuctra UI";
const DESCRIPTION =
  "Select a date and time in one dependency-free control: month calendar, bounded date range, configurable minute step and plain Date values.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react datetime picker, date and time picker react, calendar time select, tailwind datetime input, neuctra ui date time picker",
  path: "/docs/date-time-picker",
});

const dateTimePickerFaq = buildComponentFaq("DateTimePicker", {
  sizes: ["xs", "sm", "md", "lg"],
});

export default function DateTimePickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Date Time Picker", path: "/docs/date-time-picker" },
          ]),
          techArticleSchema({
            name: "DateTimePicker",
            description: DESCRIPTION,
            path: "/docs/date-time-picker",
          }),
          faqSchema(dateTimePickerFaq),
        ]}
      />
      {children}
    </>
  );
}
