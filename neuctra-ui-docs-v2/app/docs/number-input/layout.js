import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "NumberInput Component — React Numeric Stepper | Neuctra UI";
const DESCRIPTION =
  "React number input with increment/decrement steppers, min/max clamping, arrow-key support, decimal input and spinbutton semantics — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react number input, numeric stepper component, quantity input react, tailwind number input, spinbutton react, neuctra ui number input",
  path: "/docs/number-input",
});

const numberInputFaq = buildComponentFaq("NumberInput", {
  sizes: ["sm", "md", "lg"],
});

export default function NumberInputLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Number Input", path: "/docs/number-input" },
          ]),
          techArticleSchema({
            name: "NumberInput",
            description: DESCRIPTION,
            path: "/docs/number-input",
          }),
          faqSchema(numberInputFaq),
        ]}
      />
      {children}
    </>
  );
}
