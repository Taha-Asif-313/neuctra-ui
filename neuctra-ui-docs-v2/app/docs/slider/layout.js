import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Slider Component — React Range Input | Neuctra UI";
const DESCRIPTION =
  "React slider component built on the native range input: labels, live value, custom formatting, tick marks and three sizes with full keyboard support.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react slider component, range input react, tailwind slider, volume slider ui, react range slider, neuctra ui slider",
  path: "/docs/slider",
});

const sliderFaq = buildComponentFaq("Slider", {
  sizes: ["sm", "md", "lg"],
});

export default function SliderLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Slider", path: "/docs/slider" },
          ]),
          techArticleSchema({
            name: "Slider",
            description: DESCRIPTION,
            path: "/docs/slider",
          }),
          faqSchema(sliderFaq),
        ]}
      />
      {children}
    </>
  );
}
