import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Color Picker - React HEX and RGB Input | Neuctra UI";
const DESCRIPTION =
  "A dependency-free color picker with HEX and RGB text entry, channel inputs, optional alpha, format toggling and preset swatches.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react color picker, hex rgb input react, color swatches component, alpha color picker tailwind, neuctra ui color picker",
  path: "/docs/color-picker",
});

const colorPickerFaq = buildComponentFaq("ColorPicker");

export default function ColorPickerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Color Picker", path: "/docs/color-picker" },
          ]),
          techArticleSchema({
            name: "ColorPicker",
            description: DESCRIPTION,
            path: "/docs/color-picker",
          }),
          faqSchema(colorPickerFaq),
        ]}
      />
      {children}
    </>
  );
}
