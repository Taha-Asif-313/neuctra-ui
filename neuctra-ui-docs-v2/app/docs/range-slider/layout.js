import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Range Slider - React Dual Thumb Slider | Neuctra UI";
const DESCRIPTION =
  "A React range slider built from two native range inputs, with a highlighted track, format callback, marks and accessible handle labels.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react range slider, dual thumb slider react, min max range input, tailwind range slider, neuctra ui range slider",
  path: "/docs/range-slider",
});

const rangeSliderFaq = buildComponentFaq("RangeSlider", {
  sizes: ["sm", "md", "lg"],
});

export default function RangeSliderLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Range Slider", path: "/docs/range-slider" },
          ]),
          techArticleSchema({
            name: "RangeSlider",
            description: DESCRIPTION,
            path: "/docs/range-slider",
          }),
          faqSchema(rangeSliderFaq),
        ]}
      />
      {children}
    </>
  );
}
